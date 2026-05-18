import { useState } from "react";
import type { Article, GeneratedPost } from "@workspace/api-client-react";
import { X, Zap, FileText, Loader2, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QueueSidebarProps {
  articles: Article[];
  onRemove: (id: string) => void;
  onPostGenerated: (post: GeneratedPost) => void;
}

export default function QueueSidebar({ articles, onRemove, onPostGenerated }: QueueSidebarProps) {
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
    <aside className="w-80 flex flex-col h-full bg-sidebar border-l border-sidebar-border">
      {/* Header */}
      <div className="flex-none p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-semibold text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Staging Queue
          </h2>
          <Badge variant="secondary" className="bg-primary/20 text-primary font-mono text-xs rounded-sm">
            {articles.length} items
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          First article in queue is used for post generation
        </p>
      </div>

      {/* Queue list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {articles.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
            <div className="w-12 h-12 border-2 border-dashed border-muted rounded-full flex items-center justify-center mb-3">
              <PlusIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Queue is empty</p>
          </div>
        ) : (
          articles.map((article, idx) => (
            <div
              key={article.id}
              data-testid={`card-queue-${article.id}`}
              className={`bg-card border rounded-md p-3 relative group animate-in slide-in-from-right-4 fade-in duration-200 ${
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
                className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-sm opacity-0 group-hover:opacity-100 transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="pr-6">
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

      {/* Firm Insight override */}
      <div className="flex-none px-4 pb-3 border-t border-sidebar-border pt-4">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-sky-400 mb-2">
          <Pencil className="w-3 h-3" />
          Custom Firm Insight (Optional)
        </label>
        <textarea
          placeholder="Override the AI perspective. Type your specific advisory message here to inject it verbatim into the post..."
          value={firmInsight}
          onChange={(e) => setFirmInsight(e.target.value)}
          data-testid="textarea-firm-insight"
          rows={4}
          className="w-full text-xs bg-background border border-border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground/60 transition-shadow"
        />

        {error && (
          <p className="text-xs text-destructive mt-2">{error}</p>
        )}

        <button
          onClick={handleGenerate}
          disabled={articles.length === 0 || isGenerating}
          data-testid="button-generate-post"
          className="mt-3 w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-md text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
