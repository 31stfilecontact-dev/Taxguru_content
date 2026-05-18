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

function cleanHtml(raw: string): string {
  return raw.replace(/<[^>]+>/g, "").trim();
}

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
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
  const articles: Article[] = [];
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
      let postDateStr: string;
      let displayDate: string;

      if (entry.pubDate) {
        const dt = new Date(entry.pubDate);
        postDateStr = dt.toISOString().split("T")[0];
        displayDate = formatDisplayDate(dt);
      } else {
        const now = new Date();
        postDateStr = now.toISOString().split("T")[0];
        displayDate = formatDisplayDate(now);
      }

      if (targetDate && postDateStr !== targetDate) continue;

      const rawSummary = entry.contentSnippet || entry.content || entry.summary || "";
      const fullSummary = cleanHtml(rawSummary);
      const excerpt =
        fullSummary.length > 180 ? fullSummary.slice(0, 180) + "..." : fullSummary;

      articles.push({
        id: `31f_${articleId}`,
        title: entry.title || "Untitled",
        url: entry.link || "",
        date: displayDate,
        category,
        excerpt,
      });
      articleId++;
    }
  }

  return articles;
}

router.get("/articles", async (req, res) => {
  const parseResult = GetArticlesQueryParams.safeParse(req.query);
  const targetDate = parseResult.success ? parseResult.data.date : undefined;

  try {
    const articles = await fetchAllArticles(targetDate);
    res.json(articles);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch RSS feeds");
    res.status(500).json({ error: "Failed to fetch feeds" });
  }
});

router.get("/articles/summary", async (req, res) => {
  const parseResult = GetArticlesSummaryQueryParams.safeParse(req.query);
  const targetDate = parseResult.success ? parseResult.data.date : undefined;

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
