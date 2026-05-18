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
