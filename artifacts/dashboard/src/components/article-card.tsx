import type { Article } from "@workspace/api-client-react";
import { ExternalLink, Plus, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  onAddToQueue: () => void;
  isInQueue: boolean;
}

export default function ArticleCard({ article, onAddToQueue, isInQueue }: ArticleCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Income Tax":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "GST":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Company Law":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Notification":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "News":
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="group bg-card border border-card-border rounded-lg p-5 hover:border-primary/40 transition-all duration-200 shadow-sm flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <Badge variant="outline" className={cn("font-mono text-[10px] uppercase px-2 py-0.5 rounded-sm", getCategoryColor(article.category))}>
          {article.category}
        </Badge>
        <span className="text-xs font-mono text-muted-foreground">{article.date}</span>
      </div>
      
      <h3 className="text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
        {article.title}
      </h3>
      
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {article.excerpt}
      </p>
      
      <div className="flex items-center justify-between mt-2 pt-3 border-t border-border/50">
        <a 
          href={article.url} 
          target="_blank" 
          rel="norenoopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Open Webpage</span>
        </a>
        
        <button
          onClick={onAddToQueue}
          disabled={isInQueue}
          className={cn(
            "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-all",
            isInQueue 
              ? "bg-primary/20 text-primary cursor-default" 
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
          )}
        >
          {isInQueue ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Queued</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Mark for Writing Queue</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
