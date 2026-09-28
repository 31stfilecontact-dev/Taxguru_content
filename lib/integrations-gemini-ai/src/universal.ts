import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "node:path";

export type LLMProviderId =
  | "gemini"
  | "openai"
  | "groq"
  | "deepseek"
  | "anthropic"
  | "openrouter"
  | "custom";

export interface LLMConfig {
  provider: LLMProviderId;
  apiKey: string;
  model: string;
  baseUrl?: string;
}

export interface ProviderMeta {
  id: LLMProviderId;
  name: string;
  defaultModel: string;
  availableModels: string[];
  keyPlaceholder: string;
  keyUrl: string;
  freeTier: boolean;
  requiresBaseUrl?: boolean;
  description: string;
}

export const PROVIDERS: Record<LLMProviderId, ProviderMeta> = {
  gemini: {
    id: "gemini",
    name: "Google Gemini",
    defaultModel: "gemini-2.0-flash",
    availableModels: ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"],
    keyPlaceholder: "AIzaSy...",
    keyUrl: "https://aistudio.google.com/app/apikey",
    freeTier: true,
    description: "Google AI Studio free tier (15 requests/min, zero cost)",
  },
  groq: {
    id: "groq",
    name: "Groq (Ultra-Fast Llama)",
    defaultModel: "llama-3.3-70b-versatile",
    availableModels: [
      "llama-3.3-70b-versatile",
      "llama-3.1-8b-instant",
      "mixtral-8x7b-32768",
    ],
    keyPlaceholder: "gsk_...",
    keyUrl: "https://console.groq.com/keys",
    freeTier: true,
    description: "Extremely fast Llama 3.3 inference with free monthly tier",
  },
  openai: {
    id: "openai",
    name: "OpenAI",
    defaultModel: "gpt-4o-mini",
    availableModels: ["gpt-4o-mini", "gpt-4o", "o3-mini"],
    keyPlaceholder: "sk-proj-...",
    keyUrl: "https://platform.openai.com/api-keys",
    freeTier: false,
    description: "Industry-standard OpenAI GPT-4o models",
  },
  deepseek: {
    id: "deepseek",
    name: "DeepSeek",
    defaultModel: "deepseek-chat",
    availableModels: ["deepseek-chat", "deepseek-reasoner"],
    keyPlaceholder: "sk-...",
    keyUrl: "https://platform.deepseek.com/api_keys",
    freeTier: false,
    description: "DeepSeek-V3 / DeepSeek-R1 at ultra-low token cost",
  },
  anthropic: {
    id: "anthropic",
    name: "Anthropic Claude",
    defaultModel: "claude-3-5-haiku-20241022",
    availableModels: [
      "claude-3-5-haiku-20241022",
      "claude-3-5-sonnet-20241022",
    ],
    keyPlaceholder: "sk-ant-...",
    keyUrl: "https://console.anthropic.com/settings/keys",
    freeTier: false,
    description: "Claude 3.5 models with superior analytical reasoning",
  },
  openrouter: {
    id: "openrouter",
    name: "OpenRouter (100+ Models)",
    defaultModel: "meta-llama/llama-3.3-70b-instruct",
    availableModels: [
      "meta-llama/llama-3.3-70b-instruct",
      "google/gemini-2.0-flash-001",
      "anthropic/claude-3.5-haiku",
      "deepseek/deepseek-chat",
    ],
    keyPlaceholder: "sk-or-v1-...",
    keyUrl: "https://openrouter.ai/keys",
    freeTier: false,
    description: "Single API key gateway to 100+ open and proprietary models",
  },
  custom: {
    id: "custom",
    name: "Custom / Local (Ollama, LM Studio, vLLM)",
    defaultModel: "llama3.2",
    availableModels: ["llama3.2", "mistral", "phi3", "qwen2.5"],
    keyPlaceholder: "Optional or ollama",
    keyUrl: "https://ollama.com",
    freeTier: true,
    requiresBaseUrl: true,
    description: "Run 100% free and offline on your own machine",
  },
};

const CONFIG_FILE = path.resolve(process.cwd(), ".llm_config.json");

let activeConfig: LLMConfig | null = null;

// Initialize on startup
try {
  if (fs.existsSync(CONFIG_FILE)) {
    const raw = fs.readFileSync(CONFIG_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (parsed.apiKey || parsed.provider === "custom") {
      activeConfig = {
        provider: parsed.provider || "gemini",
        apiKey: parsed.apiKey || "",
        model: parsed.model || PROVIDERS[parsed.provider as LLMProviderId]?.defaultModel || "gemini-2.0-flash",
        baseUrl: parsed.baseUrl || "",
      };
    }
  } else if (process.env.GEMINI_API_KEY) {
    activeConfig = {
      provider: "gemini",
      apiKey: process.env.GEMINI_API_KEY,
      model: "gemini-2.0-flash",
    };
  }
} catch {
  // ignore
}

export function getActiveConfig(): LLMConfig | null {
  return activeConfig;
}

export function isUniversalAiAvailable(): boolean {
  if (!activeConfig) return false;
  if (activeConfig.provider === "custom") {
    return Boolean(activeConfig.baseUrl);
  }
  return Boolean(activeConfig.apiKey);
}

export function getMaskedKey(key: string): string {
  if (!key) return "";
  if (key.length <= 8) return "••••••••";
  return key.slice(0, 4) + "••••••••" + key.slice(-4);
}

export function updateUniversalConfig(config: LLMConfig | null): void {
  activeConfig = config;
  try {
    if (config) {
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
    } else {
      if (fs.existsSync(CONFIG_FILE)) {
        fs.unlinkSync(CONFIG_FILE);
      }
    }
  } catch {
    // ignore
  }
}

/**
 * Universal text/json generation supporting all major LLMs
 */
export async function generateContentUniversal(
  prompt: string,
  options: {
    systemPrompt?: string;
    jsonMode?: boolean;
    configOverride?: LLMConfig;
  } = {}
): Promise<string> {
  const config = options.configOverride || activeConfig;
  if (!config) {
    throw new Error("No active LLM provider configured");
  }

  const { systemPrompt, jsonMode = false } = options;

  switch (config.provider) {
    case "gemini": {
      const client = new GoogleGenAI({ apiKey: config.apiKey });
      const response = await client.models.generateContent({
        model: config.model || "gemini-2.0-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          systemInstruction: systemPrompt,
          maxOutputTokens: 8192,
          responseMimeType: jsonMode ? "application/json" : undefined,
        },
      });
      return response.text ?? "";
    }

    case "anthropic": {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": config.apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: config.model || "claude-3-5-haiku-20241022",
          max_tokens: 4096,
          system: systemPrompt,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3,
        }),
      });

      const data = (await res.json()) as any;
      if (!res.ok) {
        throw new Error(data?.error?.message || `Anthropic HTTP ${res.status}`);
      }
      return data.content?.[0]?.text ?? "";
    }

    case "openai":
    case "groq":
    case "deepseek":
    case "openrouter":
    case "custom": {
      let endpoint = "";
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (config.apiKey) {
        headers["Authorization"] = `Bearer ${config.apiKey}`;
      }

      if (config.provider === "openai") {
        endpoint = "https://api.openai.com/v1/chat/completions";
      } else if (config.provider === "groq") {
        endpoint = "https://api.groq.com/openai/v1/chat/completions";
      } else if (config.provider === "deepseek") {
        endpoint = "https://api.deepseek.com/chat/completions";
      } else if (config.provider === "openrouter") {
        endpoint = "https://openrouter.ai/api/v1/chat/completions";
        headers["HTTP-Referer"] = "https://31stfile.com";
        headers["X-Title"] = "31st File Content Hub";
      } else if (config.provider === "custom") {
        const base = (config.baseUrl || "http://localhost:11434/v1").replace(/\/+$/, "");
        endpoint = `${base}/chat/completions`;
      }

      const body: Record<string, any> = {
        model: config.model,
        messages: [
          ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
      };

      if (jsonMode && config.provider !== "custom") {
        body.response_format = { type: "json_object" };
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const data = (await res.json()) as any;
      if (!res.ok) {
        const msg = data?.error?.message || data?.message || `HTTP ${res.status}`;
        throw new Error(`${config.provider.toUpperCase()} Error: ${msg}`);
      }

      return data.choices?.[0]?.message?.content ?? "";
    }

    default:
      throw new Error(`Unsupported provider: ${(config as any).provider}`);
  }
}

/**
 * Fast test call to verify API key, model and endpoint before saving
 */
export async function testUniversalConfig(config: LLMConfig): Promise<void> {
  await generateContentUniversal("Respond with: OK", {
    configOverride: config,
  });
}
