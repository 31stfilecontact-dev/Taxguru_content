import { useState, useMemo } from "react";
import type { Article, GeneratedPost } from "@workspace/api-client-react";
import { X, Zap, FileText, Loader2, Pencil, ChevronDown, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QueueSidebarProps {
  articles: Article[];
  onRemove: (id: string) => void;
  onPostGenerated: (post: GeneratedPost) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

export type PostFormat = "analysis" | "news" | "update";

function getSuggestedFormat(article?: Article): PostFormat {
  if (!article) return "analysis";
  const cat = (article.category || "").toLowerCase();
  const src = (article.source || "").toLowerCase();
  if (cat.includes("case law") || cat.includes("judiciary") || src.includes("court") || src.includes("itat")) {
    return "analysis";
  }
  if (
    cat.includes("govt") ||
    cat.includes("notification") ||
    cat.includes("compliance") ||
    src.includes("notification") ||
    src.includes("cbdt") ||
    src.includes("cbic") ||
    src.includes("mca")
  ) {
    return "update";
  }
  if (
    cat.includes("financial") ||
    cat.includes("news") ||
    src.includes("news") ||
    src.includes("livemint") ||
    src.includes("economic times")
  ) {
    return "news";
  }
  return "analysis";
}

export default function QueueSidebar({
  articles,
  onRemove,
  onPostGenerated,
  isMobile = false,
  onClose,
}: QueueSidebarProps) {
  const [selectedFormat, setSelectedFormat] = useState<PostFormat | null>(null);
  const [lastArticleId, setLastArticleId] = useState<string | null>(null);
  const [firmInsight, setFirmInsight] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const topArticle = articles[0];
  const topArticleId = topArticle?.id || null;

  // Auto pre-select format based on category whenever top article changes, unless manually set for this article
  const currentFormat: PostFormat = useMemo(() => {
    if (selectedFormat && lastArticleId === topArticleId) {
      return selectedFormat;
    }
    return getSuggestedFormat(topArticle);
  }, [selectedFormat, lastArticleId, topArticleId, topArticle]);

  const handleSelectFormat = (fmt: PostFormat) => {
    setSelectedFormat(fmt);
    setLastArticleId(topArticleId);
  };

  const handleGenerate = async () => {
    if (articles.length === 0) return;
    setIsGenerating(true);
    setError(null);

    try {
      const res = await fetch("/api/gemini/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          article: articles[0],
          firmInsight: firmInsight.trim() || undefined,
          postFormat: currentFormat,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error((data as { error?: string }).error ?? "Generation failed");
      }

      const post: GeneratedPost = await res.json();
      onPostGenerated(post);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <aside className="w-full h-full flex flex-col bg-sidebar border-sidebar-border overflow-hidden md:border-l">
      {/* Header */}
      <div className="flex-none px-4 py-3.5 border-b border-sidebar-border bg-card/60 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/15 p-1.5 rounded-md">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-semibold text-sm">Post Queue</h2>
                <Badge variant="secondary" className="bg-primary/20 text-primary font-mono text-xs rounded-full px-2">
                  {articles.length}
                </Badge>
              </div>
              <p className="text-[10px] text-muted-foreground">
                {articles.length > 0 ? "Top article will be transformed into LinkedIn post" : "Add articles to stage for publishing"}
              </p>
            </div>
          </div>
          {isMobile && onClose && (
            <button
              onClick={onClose}
              data-testid="button-close-queue"
              className="p-1.5 rounded-full bg-secondary/80 text-muted-foreground hover:text-foreground active:scale-95 transition-all"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Article list */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 min-h-0">
        {articles.length === 0 ? (
          <div className="h-full min-h-[160px] flex flex-col items-center justify-center text-center p-6 border border-dashed border-border/60 rounded-xl my-auto">
            <div className="w-10 h-10 border border-muted-foreground/30 rounded-full flex items-center justify-center mb-2.5 bg-muted/20">
              <Sparkles className="w-4 h-4 text-muted-foreground/60" />
            </div>
            <p className="text-xs font-medium text-foreground mb-1">Queue is empty</p>
            <p className="text-[11px] text-muted-foreground max-w-[200px]">
              Tap &quot;Stage for Post&quot; on any article from the feed to curate it here.
            </p>
          </div>
        ) : (
          articles.map((article, idx) => (
            <div
              key={article.id}
              data-testid={`card-queue-${article.id}`}
              className={`bg-card border rounded-lg p-3 relative group transition-all ${
                idx === 0
                  ? "border-sky-500/50 bg-sky-500/[0.04] ring-1 ring-sky-500/20"
                  : "border-border hover:border-border/80"
              }`}
            >
              {idx === 0 && (
                <span className="absolute -top-2 left-2 text-[9px] font-mono bg-sky-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-bold shadow-sm">
                  Active
                </span>
              )}
              <button
                onClick={() => onRemove(article.id)}
                data-testid={`button-remove-${article.id}`}
                className="absolute top-2 right-2 p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 active:scale-90 rounded-md transition-all touch-manipulation"
                title="Remove from queue"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="pr-7">
                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                  <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider font-semibold">
                    {article.category}
                  </span>
                  {article.source && (
                    <span className="text-[9px] font-mono bg-muted text-muted-foreground px-1.5 py-0.2 rounded">
                      {article.source}
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-medium text-foreground line-clamp-2 leading-snug">
                  {article.title}
                </h4>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Firm insight + generate button */}
      <div className="flex-none p-3.5 border-t border-sidebar-border bg-card/40 space-y-2.5">
        {/* Post Format Selector */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold text-slate-300">
              Post Format
            </label>
            <span className="text-[9px] font-mono text-sky-400 bg-sky-950/80 border border-sky-800/60 px-1.5 py-0.2 rounded">
              Auto: {currentFormat === "analysis" ? "Case Law / Analysis" : currentFormat === "news" ? "News" : "Update"}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1 p-1 bg-secondary/80 rounded-lg border border-border">
            <button
              type="button"
              onClick={() => handleSelectFormat("analysis")}
              data-testid="format-select-analysis"
              className={`py-1.5 px-2 rounded-md text-[11px] font-medium transition-all ${
                currentFormat === "analysis"
                  ? "bg-sky-600 text-white shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Analysis
            </button>
            <button
              type="button"
              onClick={() => handleSelectFormat("news")}
              data-testid="format-select-news"
              className={`py-1.5 px-2 rounded-md text-[11px] font-medium transition-all ${
                currentFormat === "news"
                  ? "bg-emerald-600 text-white shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              News
            </button>
            <button
              type="button"
              onClick={() => handleSelectFormat("update")}
              data-testid="format-select-update"
              className={`py-1.5 px-2 rounded-md text-[11px] font-medium transition-all ${
                currentFormat === "update"
                  ? "bg-amber-600 text-white shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Update
            </button>
          </div>
        </div>

        {/* Firm insight (specific to Analysis format) */}
        {currentFormat === "analysis" && (
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-sky-400">
              <Pencil className="w-3.5 h-3.5" />
              <span>Custom Advisory Perspective (Optional)</span>
            </label>
            <textarea
              placeholder="Add custom CA perspective, audit notes, or firm angle..."
              value={firmInsight}
              onChange={(e) => setFirmInsight(e.target.value)}
              data-testid="textarea-firm-insight"
              rows={isMobile ? 2 : 3}
              className="w-full text-xs bg-background border border-border rounded-lg p-2.5 resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground/60 transition-shadow"
            />
          </div>
        )}

        {error && <p className="text-xs text-destructive font-medium">{error}</p>}

        <button
          onClick={handleGenerate}
          disabled={articles.length === 0 || isGenerating}
          data-testid="button-generate-post"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 active:scale-[0.98] text-white py-3 px-4 rounded-xl text-sm font-semibold transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation min-h-[46px]"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Synthesizing Post...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Generate LinkedIn Post</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
