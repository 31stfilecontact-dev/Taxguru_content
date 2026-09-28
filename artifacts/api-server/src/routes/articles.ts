import { Router } from "express";
import Parser from "rss-parser";
import { GetArticlesQueryParams, GetArticlesSummaryQueryParams } from "@workspace/api-zod";
import { logger } from "../lib/logger";

const router = Router();
const parser = new Parser({
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
    Accept: "application/rss+xml, application/xml, text/xml, */*",
  },
  timeout: 10000,
});

export type CoreCategory = "Financial News" | "Case Laws" | "Govt Updates" | "CA Compliances";

interface FeedDefinition {
  name: string;
  url: string;
  defaultCategory: CoreCategory;
  source: string;
}

const FEED_DEFINITIONS: FeedDefinition[] = [
  // 1. Financial & Business News
  {
    name: "LiveMint News",
    url: "https://www.livemint.com/rss/news",
    defaultCategory: "Financial News",
    source: "LiveMint",
  },
  {
    name: "Economic Times Banking & Finance",
    url: "https://economictimes.indiatimes.com/industry/banking/finance/rssfeeds/13358311.cms",
    defaultCategory: "Financial News",
    source: "Economic Times",
  },
  {
    name: "TaxGuru Business & Finance News",
    url: "https://taxguru.in/type/news/feed/",
    defaultCategory: "Financial News",
    source: "TaxGuru",
  },

  // 2. Govt News & Updates
  {
    name: "TaxGuru Official Notifications",
    url: "https://taxguru.in/type/notification/feed/",
    defaultCategory: "Govt Updates",
    source: "CBDT/CBIC/MCA",
  },
  {
    name: "RBI & FEMA Updates",
    url: "https://taxguru.in/category/rbi/feed/",
    defaultCategory: "Govt Updates",
    source: "RBI/FEMA",
  },
  {
    name: "SEBI Master Circulars & Orders",
    url: "https://taxguru.in/category/sebi/feed/",
    defaultCategory: "Govt Updates",
    source: "SEBI",
  },

  // 3. Case Laws & 4. CA Compliances
  {
    name: "Income Tax & ITAT Updates",
    url: "https://taxguru.in/category/income-tax/feed/",
    defaultCategory: "CA Compliances",
    source: "Income Tax",
  },
  {
    name: "GST Law & Procedures",
    url: "https://taxguru.in/category/goods-and-service-tax/feed/",
    defaultCategory: "CA Compliances",
    source: "GST Council",
  },
  {
    name: "Corporate Law & MCA",
    url: "https://taxguru.in/category/company-law/feed/",
    defaultCategory: "CA Compliances",
    source: "MCA/Corporate Law",
  },
  {
    name: "Chartered Accountant Updates",
    url: "https://taxguru.in/category/chartered-accountant/feed/",
    defaultCategory: "CA Compliances",
    source: "ICAI/CA",
  },
];

const PUBLICATION_TIME_ZONE = "Asia/Kolkata";

const CASE_LAW_KEYWORDS = [
  "itat", "high court", "supreme court", "nclt", "nclat", "cestat", "tribunal",
  "hc", "sc", "vs", "versus", "judgment", "ruling", "quashes", "penalty",
  "deletes", "disallow", "appeal", "bench", "order", "court", "held", "writ petition"
];

function isCaseLaw(title: string): boolean {
  const lower = title.toLowerCase();
  return CASE_LAW_KEYWORDS.some((kw) => lower.includes(kw));
}

function classifyArticle(title: string, defaultCategory: CoreCategory): CoreCategory {
  if (defaultCategory === "Financial News") return "Financial News";
  if (defaultCategory === "Govt Updates") return "Govt Updates";
  if (isCaseLaw(title)) return "Case Laws";
  return "CA Compliances";
}

function cleanHtml(raw: string): string {
  return raw
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function getDateParts(date: Date): Record<string, string> {
  return Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: PUBLICATION_TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .formatToParts(date)
      .filter(({ type }) => type !== "literal")
      .map(({ type, value }) => [type, value]),
  );
}

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    timeZone: PUBLICATION_TIME_ZONE,
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

function getPublicationDate(entry: Parser.Item): { isoDate: string; displayDate: string; timestamp: number } | null {
  const rawDate = entry.isoDate ?? entry.pubDate;
  if (!rawDate) return null;

  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) return null;

  const parts = getDateParts(date);
  return {
    isoDate: `${parts.year}-${parts.month}-${parts.day}`,
    displayDate: formatDisplayDate(date),
    timestamp: date.getTime(),
  };
}

export interface HubArticle {
  id: string;
  title: string;
  url: string;
  date: string;
  category: string;
  source: string;
  excerpt: string;
  publishedAt: number;
  isoDate: string;
}

// In-memory cache for 5 minutes
let cachedArticles: HubArticle[] = [];
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

export async function fetchAllArticles(targetDate?: string): Promise<HubArticle[]> {
  const now = Date.now();
  if (cachedArticles.length > 0 && now - cacheTimestamp < CACHE_TTL_MS) {
    if (targetDate) {
      return cachedArticles.filter((a) => a.isoDate === targetDate);
    }
    return cachedArticles;
  }

  const articles: HubArticle[] = [];
  const seenUrls = new Set<string>();
  let articleId = 1;

  const feedResults = await Promise.allSettled(
    FEED_DEFINITIONS.map(async (feedDef) => {
      const feed = await parser.parseURL(feedDef.url);
      return { feedDef, items: feed.items || [] };
    }),
  );

  for (const result of feedResults) {
    if (result.status !== "fulfilled") continue;
    const { feedDef, items } = result.value;

    for (const item of items) {
      const link = (item.link || item.guid || "").trim();
      if (!link || seenUrls.has(link)) continue;
      seenUrls.add(link);

      const pubDate = getPublicationDate(item);
      if (!pubDate) continue;

      const rawSummary = item.contentSnippet || item.content || item.summary || "";
      const cleaned = cleanHtml(rawSummary);
      const excerpt = cleaned.length > 200 ? cleaned.slice(0, 197) + "..." : cleaned;

      const title = cleanHtml(item.title || "Untitled Regulatory Update");
      const category = classifyArticle(title, feedDef.defaultCategory);

      articles.push({
        id: `31f_${articleId++}`,
        title,
        url: link,
        date: pubDate.displayDate,
        category,
        source: feedDef.source,
        excerpt: excerpt || "No preview available for this update. Click to view full notice.",
        publishedAt: pubDate.timestamp,
        isoDate: pubDate.isoDate,
      });
    }
  }

  articles.sort((a, b) => b.publishedAt - a.publishedAt);
  cachedArticles = articles;
  cacheTimestamp = Date.now();

  if (targetDate) {
    return articles.filter((a) => a.isoDate === targetDate);
  }
  return articles;
}

router.get("/articles", async (req, res): Promise<void> => {
  const parseResult = GetArticlesQueryParams.safeParse(req.query);
  if (!parseResult.success) {
    res.status(400).json({ error: "Invalid publication date. Use YYYY-MM-DD." });
    return;
  }
  const targetDate = parseResult.data.date;

  try {
    const articles = await fetchAllArticles(targetDate);
    // Format response matching Article schema
    res.json(
      articles.map(({ publishedAt: _p, isoDate: _i, ...rest }) => rest),
    );
  } catch (err) {
    logger.error({ err }, "Failed to fetch multi-source RSS feeds");
    res.status(500).json({ error: "Failed to fetch feeds" });
  }
});

router.get("/articles/summary", async (req, res): Promise<void> => {
  const parseResult = GetArticlesSummaryQueryParams.safeParse(req.query);
  if (!parseResult.success) {
    res.status(400).json({ error: "Invalid publication date. Use YYYY-MM-DD." });
    return;
  }
  const targetDate = parseResult.data.date;

  try {
    const articles = await fetchAllArticles(targetDate);

    // Initial counts for all 4 primary categories
    const counts: Record<string, number> = {
      "Financial News": 0,
      "Case Laws": 0,
      "Govt Updates": 0,
      "CA Compliances": 0,
    };

    for (const article of articles) {
      counts[article.category] = (counts[article.category] || 0) + 1;
    }

    const byCategory = Object.entries(counts).map(([category, count]) => ({
      category,
      count,
    }));

    res.json({
      total: articles.length,
      byCategory,
    });
  } catch (err) {
    logger.error({ err }, "Failed to fetch RSS feeds for summary");
    res.status(500).json({ error: "Failed to fetch feeds" });
  }
});

export default router;
