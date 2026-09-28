import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, isDbAvailable } from "@workspace/db";
import { conversations, messages } from "@workspace/db/schema";
import {
  ai,
  isAiAvailable,
  getClientForApiKey,
  isUniversalAiAvailable,
  generateContentUniversal,
} from "@workspace/integrations-gemini-ai";
import {
  CreateGeminiConversationBody,
  SendGeminiMessageBody,
  SummarizeArticlesBody,
  GeneratePostBody,
} from "@workspace/api-zod";

const router = Router();

function generateRuleBasedPost(
  article: { title: string; category: string; date: string; excerpt: string; url: string },
  firmInsight?: string,
) {
  const cleanTitle = article.title
    .replace(/^(News|Income Tax|GST|Company Law|CA, CS, CMA|Custom Duty|SEBI|Fema \/ RBI)\s*\|\s*/i, "")
    .trim();

  const hook = cleanTitle.length > 70 ? cleanTitle.slice(0, 67) + "..." : cleanTitle;

  const summaryOfFacts =
    article.excerpt && article.excerpt.length > 30
      ? article.excerpt
      : `Important development in ${article.category}: ${cleanTitle}. Officially published on ${article.date}.`;

  const keyTakeaways = [
    `Immediate assessment recommended for ongoing ${article.category} transactions.`,
    `Verify documentation compliance with the latest statutory guidelines.`,
    `Consult your tax advisor to update financial year reporting standards.`,
  ];

  const firmPerspective = firmInsight?.trim()
    ? firmInsight.trim()
    : `At 31st File, we recommend businesses proactively analyze this update. Timely compliance safeguards your business against statutory scrutiny and unexpected penalties.`;

  const categoryTag = article.category.replace(/[^a-zA-Z0-9]/g, "");
  const hashtags = [
    "#31stFile",
    `#${categoryTag || "TaxCompliance"}`,
    "#CharteredAccountant",
    "#TaxUpdate",
    "#ComplianceAlert",
    "#IndianEconomy",
  ];

  const linkedInPost = `🚨 Regulatory Alert: ${hook}

📌 Summary of Facts:
${summaryOfFacts}

🔍 Key Takeaways:
${keyTakeaways.map((t) => `• ${t}`).join("\n")}

💡 31st File Advisory Perspective:
${firmPerspective}

🔗 Direct Reference: ${article.url}

${hashtags.join(" ")}`;

  return {
    title: hook,
    summaryOfFacts,
    keyTakeaways,
    firmPerspective,
    articleCategory: article.category,
    articleDate: article.date,
    articleUrl: article.url,
    hashtags,
    linkedInPost,
  };
}

router.get("/gemini/conversations", async (_req, res) => {
  if (!isDbAvailable || !db) {
    res.json([]);
    return;
  }
  try {
    const result = await db
      .select()
      .from(conversations)
      .orderBy(conversations.createdAt);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
});

router.post("/gemini/conversations", async (req, res) => {
  if (!isDbAvailable || !db) {
    res.status(503).json({ error: "Database not configured for persistent conversations." });
    return;
  }
  const parsed = CreateGeminiConversationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  const [conversation] = await db
    .insert(conversations)
    .values({ title: parsed.data.title })
    .returning();
  res.status(201).json(conversation);
});

router.get("/gemini/conversations/:id", async (req, res) => {
  if (!isDbAvailable || !db) {
    res.status(404).json({ error: "Database not configured" });
    return;
  }
  const id = parseInt(req.params.id, 10);
  const [conversation] = await db
    .select()
    .from(conversations)
    .where(eq(conversations.id, id));
  if (!conversation) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  const msgs = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, id))
    .orderBy(messages.createdAt);
  res.json({ ...conversation, messages: msgs });
});

router.delete("/gemini/conversations/:id", async (req, res) => {
  if (!isDbAvailable || !db) {
    res.status(404).json({ error: "Database not configured" });
    return;
  }
  const id = parseInt(req.params.id, 10);
  const [existing] = await db
    .select()
    .from(conversations)
    .where(eq(conversations.id, id));
  if (!existing) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  await db.delete(messages).where(eq(messages.conversationId, id));
  await db.delete(conversations).where(eq(conversations.id, id));
  res.status(204).send();
});

router.get("/gemini/conversations/:id/messages", async (req, res) => {
  if (!isDbAvailable || !db) {
    res.json([]);
    return;
  }
  const id = parseInt(req.params.id, 10);
  const msgs = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, id))
    .orderBy(messages.createdAt);
  res.json(msgs);
});

router.post("/gemini/conversations/:id/messages", async (req, res) => {
  if (!isDbAvailable || !db) {
    res.status(503).json({ error: "Database not configured" });
    return;
  }
  if (!isAiAvailable() || !ai) {
    res.status(503).json({ error: "Gemini API key not configured" });
    return;
  }

  const id = parseInt(req.params.id, 10);
  const parsed = SendGeminiMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const [conversation] = await db
    .select()
    .from(conversations)
    .where(eq(conversations.id, id));
  if (!conversation) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }

  await db.insert(messages).values({
    conversationId: id,
    role: "user",
    content: parsed.data.content,
  });

  const allMessages = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, id))
    .orderBy(messages.createdAt);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let fullResponse = "";

  try {
    const stream = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: allMessages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      config: { maxOutputTokens: 8192 },
    });

    for await (const chunk of stream) {
      const text = chunk.text;
      if (text) {
        fullResponse += text;
        res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
      }
    }

    await db.insert(messages).values({
      conversationId: id,
      role: "assistant",
      content: fullResponse,
    });
  } catch (err) {
    req.log?.error({ err }, "Gemini streaming failed");
    res.write(`data: ${JSON.stringify({ error: "AI response failed" })}\n\n`);
  }

  res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  res.end();
});

router.post("/gemini/generate-post", async (req, res) => {
  const parsed = GeneratePostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { article, firmInsight } = parsed.data;
  const headerKey = (req.headers["x-gemini-api-key"] as string)?.trim() || (req.headers["x-llm-api-key"] as string)?.trim();
  const hasAi = isUniversalAiAvailable() || Boolean(headerKey);

  // Dual Mode: If AI is available (Gemini, OpenAI, Groq, DeepSeek, Anthropic, Custom), attempt generation
  if (hasAi) {
    const firmPerspectiveInstruction = firmInsight?.trim()
      ? `For the firmPerspective field, use EXACTLY this text verbatim: "${firmInsight}"`
      : `For the firmPerspective field, write 2 short paragraphs of 31st File's expert perspective on how this regulatory change impacts corporate taxation, statutory audits, or financial reporting for Indian founders and businesses. Speak directly to the reader.`;

    const prompt = `You are a senior regulatory and tax intelligence analyst at 31st File, India.
Analyze this regulatory/financial update and return ONLY a valid JSON object — no markdown fences, no formatting outside JSON.

Article Title: ${article.title}
Category: ${article.category}
Date: ${article.date}
Excerpt: ${article.excerpt}

${firmPerspectiveInstruction}

Return a JSON object with exactly these fields:
{
  "title": "A punchy editorial headline, max 8 words, distinct from the source title",
  "summaryOfFacts": "One concise paragraph (max 3 sentences) covering the core facts",
  "keyTakeaways": [
    "One short punchy sentence under 14 words",
    "One short punchy sentence under 14 words",
    "One short punchy sentence under 14 words"
  ],
  "firmPerspective": "as instructed above",
  "hashtags": ["#31stFile", "#TaxUpdate", "#CharteredAccountant"]
}

Tone: Professional, direct to business owners and finance leaders. No filler words.`;

    try {
      const text = await generateContentUniversal(prompt, {
        jsonMode: true,
        ...(headerKey
          ? {
              configOverride: {
                provider: "gemini",
                apiKey: headerKey,
                model: "gemini-2.0-flash",
              },
            }
          : {}),
      });

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const postData = JSON.parse(jsonMatch ? jsonMatch[0] : text);

      const categoryTag = article.category.replace(/[^a-zA-Z0-9]/g, "");
      const hashtags = Array.isArray(postData.hashtags) && postData.hashtags.length > 0
        ? postData.hashtags
        : ["#31stFile", `#${categoryTag}`, "#CharteredAccountant", "#TaxUpdate"];

      const linkedInPost = `🚨 Regulatory Alert: ${postData.title}

📌 Summary of Facts:
${postData.summaryOfFacts}

🔍 Key Takeaways:
${postData.keyTakeaways.map((t: string) => `• ${t}`).join("\n")}

💡 31st File Advisory Perspective:
${postData.firmPerspective}

🔗 Direct Reference: ${article.url}

${hashtags.join(" ")}`;

      res.json({
        title: postData.title,
        summaryOfFacts: postData.summaryOfFacts,
        keyTakeaways: postData.keyTakeaways,
        firmPerspective: postData.firmPerspective,
        articleCategory: article.category,
        articleDate: article.date,
        articleUrl: article.url,
        hashtags,
        linkedInPost,
      });
      return;
    } catch (err) {
      req.log?.warn?.({ err }, "Gemini generation failed; falling back to rule-based studio");
    }
  }

  // Fallback: Intelligent Rule-based Studio (Zero API Key required)
  const fallbackPost = generateRuleBasedPost(article, firmInsight);
  res.json(fallbackPost);
});

router.post("/gemini/summarize", async (req, res) => {
  const parsed = SummarizeArticlesBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const articles = parsed.data.articles;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const headerKey = (req.headers["x-gemini-api-key"] as string)?.trim() || (req.headers["x-llm-api-key"] as string)?.trim();
  const hasAi = isUniversalAiAvailable() || Boolean(headerKey);

  if (!hasAi) {
    // Zero-config rule-based stream
    for (const article of articles) {
      const summary = `• Regulatory update in ${article.category}: ${article.title.slice(0, 100)}\n• Date: ${article.date}\n• Immediate review advised for compliance implications.`;
      res.write(`data: ${JSON.stringify({ id: article.id, summary })}\n\n`);
    }
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
    return;
  }

  try {
    for (const article of articles) {
      const prompt = `You are a concise regulatory intelligence analyst for Indian tax professionals.
Summarize the following tax/regulatory article in 3 crisp bullet points.
Focus on: what changed, who is affected, and what action may be needed.
Start each bullet with "•".

Title: ${article.title}
Category: ${article.category}
Date: ${article.date}
Excerpt: ${article.excerpt}`;

      try {
        const text = await generateContentUniversal(prompt, {
          ...(headerKey
            ? { configOverride: { provider: "gemini", apiKey: headerKey, model: "gemini-2.0-flash" } }
            : {}),
        });
        res.write(`data: ${JSON.stringify({ id: article.id, summary: text })}\n\n`);
      } catch {
        const fallbackSummary = `• Regulatory update in ${article.category}: ${article.title.slice(0, 100)}\n• Date: ${article.date}\n• Immediate review advised for compliance implications.`;
        res.write(`data: ${JSON.stringify({ id: article.id, summary: fallbackSummary })}\n\n`);
      }
    }
  } catch (err) {
    req.log?.error({ err }, "Batch summarization failed");
  }

  res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  res.end();
});

export default router;
