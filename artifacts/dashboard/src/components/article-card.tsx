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
  "Income Tax": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "GST":        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Company Law":"bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Notification":"bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function ArticleCard({ article, onAddToQueue, isInQueue }: ArticleCardProps) {
  const colorClass = categoryColors[article.category] ?? "bg-slate-500/10 text-slate-400 border-slate-500/20";

  return (
    <div
      data-testid={`card-article-${article.id}`}
      className="group bg-card border border-card-border rounded-lg p-4 sm:p-5 hover:border-primary/40 active:scale-[0.99] transition-all duration-200 shadow-sm flex flex-col gap-3"
    >
      {/* Top row: category badge + date */}
      <div className="flex items-start justify-between gap-2">
        <Badge
          variant="outline"
          className={cn("font-mono text-[10px] uppercase px-2 py-0.5 rounded-sm shrink-0", colorClass)}
        >
          {article.category}
        </Badge>
        <span className="text-xs font-mono text-muted-foreground text-right">{article.date}</span>
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-2">
        {article.excerpt}
      </p>

      {/* Action row */}
      <div className="flex items-center justify-between gap-3 mt-1 pt-3 border-t border-border/50">
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          data-testid={`link-article-${article.id}`}
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
        >
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          <span>Open Article</span>
        </a>

        <button
          onClick={onAddToQueue}
          disabled={isInQueue}
          data-testid={`button-stage-${article.id}`}
          className={cn(
            "flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-md transition-all active:scale-95",
            isInQueue
              ? "bg-primary/20 text-primary cursor-default"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
          )}
        >
          {isInQueue ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Staged</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Stage</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
