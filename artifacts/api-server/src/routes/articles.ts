import { Router } from "express";
import Parser from "rss-parser";
import { GetArticlesQueryParams, GetArticlesSummaryQueryParams } from "@workspace/api-zod";

const router = Router();
const parser = new Parser();

const TARGET_FEEDS: Record<string, string> = {
  News: "https://taxguru.in/type/news/feed/",
  Notification: "https://taxguru.in/type/notification/feed/",
  "Income Tax": "https://taxguru.in/category/income-tax/feed/",
  GST: "https://taxguru.in/category/goods-and-service-tax/feed/",
  "Company Law": "https://taxguru.in/category/company-law/feed/",
};

const PUBLICATION_TIME_ZONE = "Asia/Kolkata";

function cleanHtml(raw: string): string {
  return raw.replace(/<[^>]+>/g, "").trim();
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

type Article = {
  id: string;
  title: string;
  url: string;
  date: string;
  category: string;
  excerpt: string;
};

async function fetchAllArticles(targetDate?: string): Promise<Article[]> {
  const articles: Array<Article & { publishedAt: number }> = [];
  let articleId = 1;

  const feedResults = await Promise.allSettled(
    Object.entries(TARGET_FEEDS).map(async ([category, url]) => {
      const feed = await parser.parseURL(url);
      return { category, entries: feed.items };
    }),
  );

  for (const result of feedResults) {
    if (result.status !== "fulfilled") continue;
    const { category, entries } = result.value;

    for (const entry of entries) {
      const publicationDate = getPublicationDate(entry);
      if (!publicationDate) continue;

      if (targetDate && publicationDate.isoDate !== targetDate) continue;

      const rawSummary = entry.contentSnippet || entry.content || entry.summary || "";
      const fullSummary = cleanHtml(rawSummary);
      const excerpt =
        fullSummary.length > 180 ? fullSummary.slice(0, 180) + "..." : fullSummary;

      articles.push({
        id: `31f_${articleId}`,
        title: entry.title || "Untitled",
        url: entry.link || "",
        date: publicationDate.displayDate,
        category,
        excerpt,
        publishedAt: publicationDate.timestamp,
      });
      articleId++;
    }
  }

  return articles
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .map(({ publishedAt: _publishedAt, ...article }) => article);
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
    res.json(articles);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch RSS feeds");
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

    const counts: Record<string, number> = {};
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
    req.log.error({ err }, "Failed to fetch RSS feeds for summary");
    res.status(500).json({ error: "Failed to fetch feeds" });
  }
});

export default router;
