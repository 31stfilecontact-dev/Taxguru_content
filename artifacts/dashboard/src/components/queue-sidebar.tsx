import { useState } from "react";
import type { Article, GeneratedPost } from "@workspace/api-client-react";
import { X, Zap, FileText, Loader2, Pencil, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QueueSidebarProps {
  articles: Article[];
  onRemove: (id: string) => void;
  onPostGenerated: (post: GeneratedPost) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

export default function QueueSidebar({
  articles,
  onRemove,
  onPostGenerated,
  isMobile = false,
  onClose,
}: QueueSidebarProps) {
  const [firmInsight, setFirmInsight] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <aside className="w-full flex flex-col bg-sidebar border-sidebar-border overflow-hidden md:border-l md:h-full">
      {/* Header */}
      <div className="flex-none px-4 pt-3 pb-3 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <h2 className="font-semibold text-sm">Staging Queue</h2>
            <Badge variant="secondary" className="bg-primary/20 text-primary font-mono text-xs rounded-sm">
              {articles.length}
            </Badge>
          </div>
          {isMobile && onClose && (
            <button
              onClick={onClose}
              data-testid="button-close-queue"
              className="p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          First article is used for post generation
        </p>
      </div>

      {/* Article list */}
      <div className="overflow-y-auto p-4 space-y-3" style={{ maxHeight: isMobile ? "30vh" : undefined, flex: isMobile ? "0 0 auto" : "1 1 0" }}>
        {articles.length === 0 ? (
          <div className="py-8 flex flex-col items-center justify-center text-center opacity-50">
            <div className="w-10 h-10 border-2 border-dashed border-muted rounded-full flex items-center justify-center mb-2">
              <PlusIcon className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Queue is empty</p>
          </div>
        ) : (
          articles.map((article, idx) => (
            <div
              key={article.id}
              data-testid={`card-queue-${article.id}`}
              className={`bg-card border rounded-md p-3 relative group ${
                idx === 0 ? "border-primary/50 ring-1 ring-primary/20" : "border-border"
              }`}
            >
              {idx === 0 && (
                <span className="absolute -top-2 left-2 text-[9px] font-mono bg-primary text-primary-foreground px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                  Next
                </span>
              )}
              <button
                onClick={() => onRemove(article.id)}
                data-testid={`button-remove-${article.id}`}
                className="absolute top-2 right-2 p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-sm transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="pr-7">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">
                  {article.category}
                </span>
                <h4 className="text-xs font-medium text-foreground line-clamp-2 leading-tight">
                  {article.title}
                </h4>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Firm insight + generate button */}
      <div className="flex-none px-4 pb-5 pt-3 border-t border-sidebar-border space-y-3">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-sky-400">
          <Pencil className="w-3 h-3" />
          Custom Firm Insight (Optional)
        </label>
        <textarea
          placeholder="Override the AI perspective. Your text will be injected verbatim..."
          value={firmInsight}
          onChange={(e) => setFirmInsight(e.target.value)}
          data-testid="textarea-firm-insight"
          rows={isMobile ? 2 : 4}
          className="w-full text-xs bg-background border border-border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground/60 transition-shadow"
        />

        {error && <p className="text-xs text-destructive">{error}</p>}

        <button
          onClick={handleGenerate}
          disabled={articles.length === 0 || isGenerating}
          data-testid="button-generate-post"
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white py-3 rounded-md text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating Post...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Generate Day 3 Post
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
