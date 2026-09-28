import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "node:path";

let currentApiKey =
  process.env.GEMINI_API_KEY || process.env.AI_INTEGRATIONS_GEMINI_API_KEY || "";
const baseUrl = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL;

const CONFIG_FILE = path.resolve(process.cwd(), ".llm_config.json");

try {
  if (fs.existsSync(CONFIG_FILE)) {
    const raw = fs.readFileSync(CONFIG_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (parsed.apiKey) {
      currentApiKey = parsed.apiKey;
    }
  }
} catch {
  // ignore
}

let aiInstance: GoogleGenAI | null = currentApiKey
  ? new GoogleGenAI({
      apiKey: currentApiKey,
      ...(baseUrl ? { httpOptions: { apiVersion: "", baseUrl } } : {}),
    })
  : null;

export function updateApiKey(newKey: string): void {
  currentApiKey = newKey.trim();
  aiInstance = currentApiKey
    ? new GoogleGenAI({
        apiKey: currentApiKey,
        ...(baseUrl ? { httpOptions: { apiVersion: "", baseUrl } } : {}),
      })
    : null;

  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({ apiKey: currentApiKey }, null, 2), "utf-8");
  } catch {
    // ignore
  }
}

export function getApiKey(): string {
  return currentApiKey;
}

export function getMaskedApiKey(): string {
  if (!currentApiKey) return "";
  if (currentApiKey.length <= 8) return "••••••••";
  return currentApiKey.slice(0, 4) + "••••••••" + currentApiKey.slice(-4);
}

export function isAiAvailable(): boolean {
  return Boolean(currentApiKey && aiInstance);
}

export function getClientForApiKey(overrideKey?: string): GoogleGenAI | null {
  if (overrideKey && overrideKey.trim()) {
    return new GoogleGenAI({
      apiKey: overrideKey.trim(),
      ...(baseUrl ? { httpOptions: { apiVersion: "", baseUrl } } : {}),
    });
  }
  return aiInstance;
}

export const ai = new Proxy({} as GoogleGenAI, {
  get(_target, prop) {
    if (!aiInstance) return undefined;
    return (aiInstance as any)[prop];
  },
});
