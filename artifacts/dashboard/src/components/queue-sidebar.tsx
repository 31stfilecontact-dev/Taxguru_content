import type { Article } from "@workspace/api-client-react";
import { X, Send, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QueueSidebarProps {
  articles: Article[];
  onRemove: (id: string) => void;
}

export default function QueueSidebar({ articles, onRemove }: QueueSidebarProps) {
  const handleProcess = () => {
    console.log("Processing staged summaries:", articles);
    // In a real app, this would trigger an AI summarization mutation
  };

  return (
    <aside className="w-80 flex flex-col h-full bg-sidebar border-l border-sidebar-border">
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
        <p className="text-xs text-muted-foreground">Articles marked for AI summarization</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {articles.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
            <div className="w-12 h-12 border-2 border-dashed border-muted rounded-full flex items-center justify-center mb-3">
              <Plus className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Queue is empty</p>
          </div>
        ) : (
          articles.map((article) => (
            <div 
              key={article.id} 
              className="bg-card border border-border rounded-md p-3 relative group animate-in slide-in-from-right-4 fade-in duration-200"
            >
              <button 
                onClick={() => onRemove(article.id)}
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

      <div className="flex-none p-4 border-t border-sidebar-border bg-sidebar">
        <button
          onClick={handleProcess}
          disabled={articles.length === 0}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          Process Staged Summaries
        </button>
      </div>
    </aside>
  );
}

// Dummy icon for empty state
function Plus(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
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
  )
}
