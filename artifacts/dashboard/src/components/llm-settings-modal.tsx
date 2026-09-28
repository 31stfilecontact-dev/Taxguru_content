import { useState, useEffect } from "react";
import {
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Loader2,
  X,
  ExternalLink,
  Sparkles,
  RotateCcw,
  Cpu,
  Server,
  Zap,
} from "lucide-react";

interface ProviderMeta {
  id: string;
  name: string;
  defaultModel: string;
  availableModels: string[];
  keyPlaceholder: string;
  keyUrl: string;
  freeTier: boolean;
  requiresBaseUrl?: boolean;
  description: string;
}

interface LlmStatus {
  isConfigured: boolean;
  provider: string | null;
  providerName: string | null;
  model: string | null;
  baseUrl: string | null;
  maskedKey: string;
  availableProviders: ProviderMeta[];
}

interface LlmSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyUpdated?: () => void;
}

export default function LlmSettingsModal({
  isOpen,
  onClose,
  onKeyUpdated,
}: LlmSettingsModalProps) {
  const [status, setStatus] = useState<LlmStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(false);

  // Authentication state
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [verifyingAuth, setVerifyingAuth] = useState(false);

  // Multi-provider form state
  const [selectedProvider, setSelectedProvider] = useState<string>("gemini");
  const [selectedModel, setSelectedModel] = useState<string>("gemini-2.0-flash");
  const [customModel, setCustomModel] = useState<string>("");
  const [apiKey, setApiKey] = useState("");
  const [baseUrl, setBaseUrl] = useState("http://localhost:11434/v1");
  const [showKey, setShowKey] = useState(false);

  const [savingConfig, setSavingConfig] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState("");
  const [saveError, setSaveError] = useState("");

  const fetchStatus = async () => {
    setLoadingStatus(true);
    try {
      const res = await fetch("/api/settings/llm-status");
      if (res.ok) {
        const data: LlmStatus = await res.json();
        setStatus(data);
        if (data.provider) {
          setSelectedProvider(data.provider);
          if (data.model) setSelectedModel(data.model);
          if (data.baseUrl) setBaseUrl(data.baseUrl);
        }
      }
    } catch {
      // offline / quiet fail
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
      setSaveSuccess("");
      setSaveError("");
      setAuthError("");
    }
  }, [isOpen]);

  // When provider changes, update model defaults
  const handleProviderChange = (provId: string) => {
    setSelectedProvider(provId);
    setSaveError("");
    setSaveSuccess("");
    const prov = status?.availableProviders.find((p) => p.id === provId);
    if (prov) {
      setSelectedModel(prov.defaultModel);
      setCustomModel("");
      if (prov.requiresBaseUrl && !baseUrl) {
        setBaseUrl("http://localhost:11434/v1");
      }
    }
  };

  if (!isOpen) return null;

  const currentProviderMeta = status?.availableProviders.find(
    (p) => p.id === selectedProvider
  ) || {
    id: selectedProvider,
    name: selectedProvider,
    defaultModel: "gemini-2.0-flash",
    availableModels: ["gemini-2.0-flash"],
    keyPlaceholder: "Enter API key…",
    keyUrl: "https://aistudio.google.com/app/apikey",
    freeTier: false,
    description: "",
  };

  const handleVerifyPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!password.trim()) {
      setAuthError("Please enter your admin passcode.");
      return;
    }

    setVerifyingAuth(true);
    try {
      const res = await fetch("/api/settings/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setAuthError("");
      } else {
        setAuthError(data.error || "Incorrect passcode. Please try again.");
      }
    } catch {
      setAuthError("Failed to verify passcode. Check server connection.");
    } finally {
      setVerifyingAuth(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError("");
    setSaveSuccess("");

    const isCustom = selectedProvider === "custom";
    if (!isCustom && !apiKey.trim()) {
      setSaveError(`Please enter a valid API key for ${currentProviderMeta.name}.`);
      return;
    }

    const effectiveModel = customModel.trim() || selectedModel;

    setSavingConfig(true);
    try {
      const res = await fetch("/api/settings/llm-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: password.trim(),
          provider: selectedProvider,
          apiKey: apiKey.trim(),
          model: effectiveModel,
          baseUrl: isCustom ? baseUrl.trim() : undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSaveSuccess(data.message || "Provider configuration tested & verified!");
        setApiKey("");
        await fetchStatus();
        onKeyUpdated?.();
      } else {
        setSaveError(data.error || "Failed to validate provider configuration.");
      }
    } catch {
      setSaveError("Network error while connecting to verification service.");
    } finally {
      setSavingConfig(false);
    }
  };

  const handleResetToZeroKey = async () => {
    if (!confirm("Revert to zero-key intelligent rule-based studio? No API keys will be used.")) {
      return;
    }
    setSavingConfig(true);
    setSaveError("");
    setSaveSuccess("");
    try {
      const res = await fetch("/api/settings/llm-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: password.trim(),
          provider: "gemini",
          apiKey: "",
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSaveSuccess("Reverted to Zero-Key Intelligent Studio.");
        setApiKey("");
        await fetchStatus();
        onKeyUpdated?.();
      } else {
        setSaveError(data.error || "Failed to reset.");
      }
    } catch {
      setSaveError("Network error resetting configuration.");
    } finally {
      setSavingConfig(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white">
                Universal LLM Studio Settings
              </h2>
              <p className="text-xs text-slate-400">
                Connect any AI model: Gemini, Groq, OpenAI, DeepSeek, Claude, or Ollama
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors touch-manipulation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Active Engine Card */}
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Current Active Engine
              </span>
              {loadingStatus ? (
                <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin" />
              ) : status?.isConfigured ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {status.providerName || status.provider} Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-0.5 rounded-full">
                  <Sparkles className="w-3.5 h-3.5" />
                  Rule-Based Engine (Zero-Key Mode)
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {status?.isConfigured
                ? `Using ${status.providerName} with model "${status.model}". Full analytical insights are active.`
                : "Zero-cost fallback mode. Built-in compliance heuristic engine automatically extracts takeaways."}
            </p>

            {status?.isConfigured && status.maskedKey && (
              <div className="flex items-center justify-between text-xs font-mono bg-slate-900/80 border border-white/10 px-3 py-1.5 rounded-lg text-slate-300 mt-2">
                <span className="text-slate-500">Key:</span>
                <span>{status.maskedKey}</span>
              </div>
            )}
          </div>

          {/* Section 1: Locked Passcode Gate */}
          {!isAuthenticated ? (
            <form onSubmit={handleVerifyPassword} className="space-y-4">
              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
                <div className="flex items-center gap-2 mb-1.5 text-amber-400 font-semibold text-xs sm:text-sm">
                  <Lock className="w-4 h-4" />
                  Admin Passcode Required
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter your admin passcode to configure LLM providers. (Default:{" "}
                  <code className="text-amber-300 font-mono">admin31</code>).
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Passcode
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setAuthError("");
                  }}
                  placeholder="Enter admin passcode…"
                  autoFocus
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                />
              </div>

              {authError && (
                <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={verifyingAuth}
                className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 active:scale-[0.98] text-white py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all disabled:opacity-50 min-h-[42px] touch-manipulation"
              >
                {verifyingAuth ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Unlock className="w-4 h-4" />
                )}
                <span>Unlock Multi-Provider Settings</span>
              </button>
            </form>
          ) : (
            /* Section 2: Universal Multi-Provider Configuration Form */
            <form onSubmit={handleSaveConfig} className="space-y-4">
              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  Admin Authorized
                </span>
                <button
                  type="button"
                  onClick={() => setIsAuthenticated(false)}
                  className="text-[11px] underline hover:text-emerald-300"
                >
                  Lock
                </button>
              </div>

              {/* Provider Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Select AI Provider
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(status?.availableProviders || []).map((prov) => {
                    const isSelected = selectedProvider === prov.id;
                    return (
                      <button
                        key={prov.id}
                        type="button"
                        onClick={() => handleProviderChange(prov.id)}
                        className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all touch-manipulation ${
                          isSelected
                            ? "bg-sky-500/15 border-sky-500/50 text-white shadow-sm ring-1 ring-sky-500/30"
                            : "bg-slate-900/60 border-white/8 hover:border-white/20 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="text-xs font-semibold text-white truncate">
                            {prov.name.split(" ")[0]}
                          </span>
                          {prov.freeTier && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-1.5 py-0.2 rounded">
                              Free
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 truncate w-full">
                          {prov.defaultModel}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  {currentProviderMeta.description}
                </p>
              </div>

              {/* Model Selection */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Model
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={selectedModel}
                    onChange={(e) => {
                      setSelectedModel(e.target.value);
                      setCustomModel("");
                    }}
                    className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                  >
                    {currentProviderMeta.availableModels.map((m) => (
                      <option key={m} value={m} className="bg-slate-900 text-white">
                        {m}
                      </option>
                    ))}
                    <option value="custom" className="bg-slate-900 text-white">
                      Custom model name…
                    </option>
                  </select>

                  {selectedModel === "custom" && (
                    <input
                      type="text"
                      placeholder="e.g. meta-llama/llama-3-8b"
                      value={customModel}
                      onChange={(e) => setCustomModel(e.target.value)}
                      className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                    />
                  )}
                </div>
              </div>

              {/* Base URL (for Custom / Ollama) */}
              {currentProviderMeta.requiresBaseUrl && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Ollama / Server Base URL
                  </label>
                  <div className="relative">
                    <Server className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="url"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                      placeholder="http://localhost:11434/v1"
                      className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    For local Ollama, ensure CORS allows requests or run <code>ollama serve</code>.
                  </p>
                </div>
              )}

              {/* API Key Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    API Key {currentProviderMeta.requiresBaseUrl && "(Optional for local Ollama)"}
                  </label>
                  {currentProviderMeta.keyUrl && (
                    <a
                      href={currentProviderMeta.keyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300"
                    >
                      <span>Get {currentProviderMeta.name.split(" ")[0]} Key</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="relative">
                  <input
                    type={showKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                      setSaveError("");
                      setSaveSuccess("");
                    }}
                    placeholder={currentProviderMeta.keyPlaceholder}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {saveSuccess && (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{saveSuccess}</span>
                </div>
              )}

              {saveError && (
                <div className="flex items-start gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="break-all">{saveError}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  disabled={savingConfig}
                  className="flex-1 flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 active:scale-[0.98] text-white py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all disabled:opacity-50 min-h-[42px] touch-manipulation"
                >
                  {savingConfig ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Zap className="w-4 h-4" />
                  )}
                  <span>Test & Activate Provider</span>
                </button>

                {status?.isConfigured && (
                  <button
                    type="button"
                    onClick={handleResetToZeroKey}
                    disabled={savingConfig}
                    title="Clear configuration and switch to zero-key rule-based mode"
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2.5 rounded-xl transition-all min-h-[42px] touch-manipulation"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Zero-Key Fallback</span>
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Footer note */}
          <div className="pt-2 border-t border-white/6 text-[11px] text-slate-400 leading-relaxed">
            💡 <strong>Universal Compatibility:</strong> 31st File supports any LLM. For free usage, choose <strong>Google Gemini</strong> (15 req/min free) or <strong>Groq</strong> (super-fast Llama 3.3 free tier), or run <strong>Ollama</strong> locally for 100% offline free intelligence.
          </div>
        </div>
      </div>
    </div>
  );
}
