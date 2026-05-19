import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "@workspace/db";
import { conversations, messages } from "@workspace/db/schema";
import { ai } from "@workspace/integrations-gemini-ai";
import { batchProcessWithSSE } from "@workspace/integrations-gemini-ai/batch";
import {
  CreateGeminiConversationBody,
  SendGeminiMessageBody,
  SummarizeArticlesBody,
  GeneratePostBody,
} from "@workspace/api-zod";

const router = Router();

router.get("/gemini/conversations", async (req, res) => {
  const result = await db
    .select()
    .from(conversations)
    .orderBy(conversations.createdAt);
  res.json(result);
});

router.post("/gemini/conversations", async (req, res) => {
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
  const id = parseInt(req.params.id, 10);
  const msgs = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, id))
    .orderBy(messages.createdAt);
  res.json(msgs);
});

router.post("/gemini/conversations/:id/messages", async (req, res) => {
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

  const stream = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
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

  const firmPerspectiveInstruction = firmInsight?.trim()
    ? `For the firmPerspective field, use EXACTLY this text verbatim (do not alter or paraphrase it): "${firmInsight}"`
    : `For the firmPerspective field, write 2 short paragraphs of 31st File's expert perspective on how this regulatory change impacts corporate taxation, statutory audits, or financial reporting for Indian founders and businesses. Speak directly to the reader.`;

  const prompt = `You are a senior analyst at 31st File, a leading tax and compliance advisory firm in India.
Analyze this regulatory update and return ONLY a valid JSON object — no markdown, no code blocks, just raw JSON.

Article Title: ${article.title}
Category: ${article.category}
Date: ${article.date}
Excerpt: ${article.excerpt}

${firmPerspectiveInstruction}

Return a JSON object with exactly these fields:
{
  "title": "A punchy editorial headline, max 8 words, distinct from the source title",
  "summaryOfFacts": "One single concise paragraph, max 3 sentences, covering the absolute core facts",
  "keyTakeaways": [
    "One short punchy sentence under 12 words",
    "One short punchy sentence under 12 words",
    "One short punchy sentence under 12 words"
  ],
  "firmPerspective": "as instructed above"
}

CRITICAL GUARDRAILS — violating any of these is a failure:
1. TONE: Speak DIRECTLY to Indian founders and business owners (e.g. "You must ensure…", "Your business needs to…"). Do NOT write as if advising other accountants.
2. FORBIDDEN WORD: Never use the word "client" or "clients" anywhere. Use "your business", "taxpayers", "founders", or "companies" instead.
3. BREVITY: LinkedIn readers skim. Every word must earn its place. Cut all filler and preamble.
4. TAKEAWAYS: Each key takeaway must be a single punchy sentence, strictly under 12 words.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    });

    const text = response.text ?? "";

    let postData: {
      title: string;
      summaryOfFacts: string;
      keyTakeaways: string[];
      firmPerspective: string;
    };

    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      postData = JSON.parse(jsonMatch ? jsonMatch[0] : text);
    } catch {
      req.log.error({ text }, "Failed to parse Gemini JSON response");
      res.status(500).json({ error: "AI returned invalid format" });
      return;
    }

    res.json({
      title: postData.title,
      summaryOfFacts: postData.summaryOfFacts,
      keyTakeaways: postData.keyTakeaways,
      firmPerspective: postData.firmPerspective,
      articleCategory: article.category,
      articleDate: article.date,
      articleUrl: article.url,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to generate editorial post");
    res.status(500).json({ error: "Generation failed" });
  }
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

  await batchProcessWithSSE(
    articles,
    async (article) => {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are a concise regulatory intelligence analyst for Indian tax professionals.
Summarize the following tax/regulatory article in 3-4 crisp bullet points.
Focus on: what changed, who is affected, and what action may be needed.
Use plain, professional English. Start each bullet with "•". No preamble or filler.

Title: ${article.title}
Category: ${article.category}
Date: ${article.date}
Excerpt: ${article.excerpt}`,
              },
            ],
          },
        ],
        config: { maxOutputTokens: 8192 },
      });
      return response.text ?? "";
    },
    (event) => {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    },
    { retries: 5 },
  );

  res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  res.end();
});

export default router;
