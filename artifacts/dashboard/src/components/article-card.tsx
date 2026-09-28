import type { Article } from "@workspace/api-client-react";
import { ExternalLink, Plus, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  onAddToQueue: () => void;
  isInQueue: boolean;
}

const categoryColors: Record<string, string> = {
  "Financial News": "bg-sky-500/10 text-sky-400 border-sky-500/25",
  "Case Laws":      "bg-amber-500/10 text-amber-400 border-amber-500/25",
  "Govt Updates":   "bg-purple-500/10 text-purple-400 border-purple-500/25",
  "CA Compliances": "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  // Legacy backward compatibility
  "Income Tax":     "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  "GST":            "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  "Company Law":    "bg-amber-500/10 text-amber-400 border-amber-500/25",
  "Notification":   "bg-purple-500/10 text-purple-400 border-purple-500/25",
  "News":           "bg-sky-500/10 text-sky-400 border-sky-500/25",
};

export default function ArticleCard({ article, onAddToQueue, isInQueue }: ArticleCardProps) {
  const colorClass = categoryColors[article.category] ?? "bg-slate-500/10 text-slate-400 border-slate-500/25";

  return (
    <div
      data-testid={`card-article-${article.id}`}
      className={cn(
        "group bg-card border rounded-xl p-4 sm:p-5 transition-all duration-200 shadow-sm flex flex-col gap-3 touch-manipulation",
        isInQueue
          ? "border-primary/50 bg-primary/[0.02] ring-1 ring-primary/20"
          : "border-card-border hover:border-primary/40 active:scale-[0.99]"
      )}
    >
      {/* Top row: category badge + source + date */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge
            variant="outline"
            className={cn("font-mono text-[10px] uppercase px-2 py-0.5 rounded-md font-semibold tracking-wide shrink-0", colorClass)}
          >
            {article.category}
          </Badge>
          {article.source && (
            <span className="font-mono text-[10px] bg-secondary/80 text-foreground/80 border border-border px-2 py-0.5 rounded-md shrink-0 font-medium">
              {article.source}
            </span>
          )}
        </div>
        <span className="text-[11px] font-mono text-muted-foreground ml-auto shrink-0">
          {article.date}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
        {article.excerpt}
      </p>

      {/* Action row with mobile-friendly touch targets (min-h-[44px]) */}
      <div className="flex items-center justify-between gap-2 mt-1 pt-3 border-t border-border/50">
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          data-testid={`link-article-${article.id}`}
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground active:text-primary transition-colors py-2 px-1 min-h-[40px]"
        >
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          <span>Open Article</span>
        </a>

        <button
          onClick={onAddToQueue}
          disabled={isInQueue}
          data-testid={`button-stage-${article.id}`}
          className={cn(
            "flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-lg transition-all active:scale-95 min-h-[40px] touch-manipulation",
            isInQueue
              ? "bg-primary/20 text-primary cursor-default border border-primary/30"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/90 active:bg-secondary/70 border border-border shadow-sm"
          )}
        >
          {isInQueue ? (
            <>
              <Check className="w-4 h-4 text-primary" />
              <span>Staged in Queue</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Stage for Post</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
