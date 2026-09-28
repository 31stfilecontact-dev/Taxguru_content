import { Router } from "express";
import {
  PROVIDERS,
  getActiveConfig,
  isUniversalAiAvailable,
  getMaskedKey,
  updateUniversalConfig,
  testUniversalConfig,
  type LLMProviderId,
  type LLMConfig,
} from "@workspace/integrations-gemini-ai";

const router = Router();

const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin31";

router.get("/settings/llm-status", (_req, res) => {
  const active = getActiveConfig();
  const isConfigured = isUniversalAiAvailable();

  res.json({
    isConfigured,
    provider: active?.provider || null,
    providerName: active?.provider ? PROVIDERS[active.provider]?.name : null,
    model: active?.model || null,
    baseUrl: active?.baseUrl || null,
    maskedKey: active?.apiKey ? getMaskedKey(active.apiKey) : "",
    availableProviders: Object.values(PROVIDERS),
  });
});

router.post("/settings/verify-password", (req, res) => {
  const { password } = req.body || {};
  if (!password || String(password).trim() !== DEFAULT_ADMIN_PASSWORD) {
    res.status(401).json({ error: "Invalid admin password. Please try again." });
    return;
  }
  res.json({ success: true, message: "Authenticated successfully." });
});

router.post("/settings/llm-config", async (req, res) => {
  const { password, provider, apiKey, model, baseUrl } = req.body || {};

  if (!password || String(password).trim() !== DEFAULT_ADMIN_PASSWORD) {
    res.status(401).json({ error: "Unauthorized: Invalid admin password." });
    return;
  }

  const cleanProvider = (provider as LLMProviderId) || "gemini";
  const cleanKey = String(apiKey || "").trim();
  const cleanModel = String(model || "").trim() || PROVIDERS[cleanProvider]?.defaultModel || "gemini-2.0-flash";
  const cleanBaseUrl = String(baseUrl || "").trim();

  // If blank key and not custom, reset to zero-key mode
  if (!cleanKey && cleanProvider !== "custom") {
    updateUniversalConfig(null);
    res.json({
      success: true,
      message: "API key cleared. System reset to Zero-Key Rule-Based mode.",
      isConfigured: false,
      maskedKey: "",
      provider: null,
      providerName: null,
      model: null,
    });
    return;
  }

  const newConfig: LLMConfig = {
    provider: cleanProvider,
    apiKey: cleanKey,
    model: cleanModel,
    baseUrl: cleanBaseUrl,
  };

  // Test the configuration with live test call
  try {
    await testUniversalConfig(newConfig);
  } catch (err: any) {
    const errorMsg = err.message || "Failed to connect to LLM provider";
    res.status(400).json({
      error: `Provider verification failed: ${errorMsg}`,
    });
    return;
  }

  // Config verified! Persist and activate
  updateUniversalConfig(newConfig);

  res.json({
    success: true,
    message: `${PROVIDERS[cleanProvider]?.name || cleanProvider} (${cleanModel}) verified and activated!`,
    isConfigured: true,
    provider: cleanProvider,
    providerName: PROVIDERS[cleanProvider]?.name,
    model: cleanModel,
    maskedKey: getMaskedKey(cleanKey),
  });
});

// Legacy backward compatibility endpoint for single-key Gemini updates
router.post("/settings/llm-key", async (req, res) => {
  const { password, apiKey } = req.body || {};

  if (!password || String(password).trim() !== DEFAULT_ADMIN_PASSWORD) {
    res.status(401).json({ error: "Unauthorized: Invalid admin password." });
    return;
  }

  const cleanKey = String(apiKey || "").trim();
  if (!cleanKey) {
    updateUniversalConfig(null);
    res.json({
      success: true,
      message: "API key cleared. System reset to Zero-Key Rule-Based mode.",
      isConfigured: false,
      maskedKey: "",
    });
    return;
  }

  const newConfig: LLMConfig = {
    provider: "gemini",
    apiKey: cleanKey,
    model: "gemini-2.0-flash",
  };

  try {
    await testUniversalConfig(newConfig);
  } catch (err: any) {
    res.status(400).json({
      error: `API Key verification failed: ${err.message || "Invalid Gemini API Key"}`,
    });
    return;
  }

  updateUniversalConfig(newConfig);

  res.json({
    success: true,
    message: "Gemini API key successfully verified and updated!",
    isConfigured: true,
    maskedKey: getMaskedKey(cleanKey),
  });
});

export default router;
