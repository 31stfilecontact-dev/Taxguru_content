import { useState, useRef } from "react";
import type { Article } from "@workspace/api-client-react";
import { X, Send, FileText, Loader2, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SummaryResult {
  article: Article;
  summary: string;
  status: "pending" | "streaming" | "done" | "error";
}

interface QueueSidebarProps {
  articles: Article[];
  onRemove: (id: string) => void;
}

export default function QueueSidebar({ articles, onRemove }: QueueSidebarProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [summaries, setSummaries] = useState<SummaryResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const handleProcess = async () => {
    if (articles.length === 0) return;

    setIsProcessing(true);
    setShowResults(true);
    setSummaries(articles.map((a) => ({ article: a, summary: "", status: "pending" })));
    setExpandedId(null);

    abortRef.current = new AbortController();

    try {
      const response = await fetch("/api/gemini/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articles }),
        signal: abortRef.current.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to connect to summarization service");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (!raw) continue;

          let event: Record<string, unknown>;
          try {
            event = JSON.parse(raw);
          } catch {
            continue;
          }

          if (event.done) break;

          // { type: "processing", index, item } — starting an item
          if (event.type === "processing" && typeof event.index === "number") {
            setSummaries((prev) => {
              const next = [...prev];
              if (next[event.index as number]) {
                next[event.index as number] = {
                  ...next[event.index as number],
                  status: "streaming",
                };
              }
              return next;
            });
            setExpandedId(articles[event.index as number]?.id ?? null);
          }

          // { type: "progress", index, result } — item done successfully
          if (event.type === "progress" && typeof event.index === "number" && typeof event.result === "string") {
            setSummaries((prev) => {
              const next = [...prev];
              if (next[event.index as number]) {
                next[event.index as number] = {
                  ...next[event.index as number],
                  summary: event.result as string,
                  status: "done",
                };
              }
              return next;
            });
          }

          // { type: "progress", index, error } — item failed
          if (event.type === "progress" && typeof event.index === "number" && event.error) {
            setSummaries((prev) => {
              const next = [...prev];
              if (next[event.index as number]) {
                next[event.index as number] = {
                  ...next[event.index as number],
                  summary: "Failed to generate summary for this article.",
                  status: "error",
                };
              }
              return next;
            });
          }

          // { type: "complete" } — all done
          if (event.type === "complete") {
            setSummaries((prev) =>
              prev.map((s) => (s.status === "streaming" ? { ...s, status: "done" } : s))
            );
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setSummaries((prev) =>
          prev.map((s) => ({
            ...s,
            summary: s.summary || "Error connecting to AI service.",
            status: "error",
          }))
        );
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    abortRef.current?.abort();
    setSummaries([]);
    setShowResults(false);
    setExpandedId(null);
  };

  return (
    <aside className="w-80 flex flex-col h-full bg-sidebar border-l border-sidebar-border">
      <div className="flex-none p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-semibold text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Staging Queue
          </h2>
          <div className="flex items-center gap-2">
            {showResults && (
              <button
                onClick={handleReset}
                data-testid="button-reset-queue"
                className="text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                Reset
              </button>
            )}
            <Badge variant="secondary" className="bg-primary/20 text-primary font-mono text-xs rounded-sm">
              {articles.length} items
            </Badge>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Articles marked for AI summarization</p>
      </div>

      {!showResults ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {articles.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <div className="w-12 h-12 border-2 border-dashed border-muted rounded-full flex items-center justify-center mb-3">
                <PlusIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">Queue is empty</p>
            </div>
          ) : (
            articles.map((article) => (
              <div
                key={article.id}
                data-testid={`card-queue-${article.id}`}
                className="bg-card border border-border rounded-md p-3 relative group animate-in slide-in-from-right-4 fade-in duration-200"
              >
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
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {summaries.map((s) => (
            <div
              key={s.article.id}
              data-testid={`card-summary-${s.article.id}`}
              className="bg-card border border-border rounded-md overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(expandedId === s.article.id ? null : s.article.id)}
                className="w-full p-3 text-left flex items-start justify-between gap-2 hover:bg-muted/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                      {s.article.category}
                    </span>
                    {s.status === "streaming" && (
                      <Loader2 className="w-3 h-3 text-primary animate-spin" />
                    )}
                    {s.status === "pending" && (
                      <span className="text-[10px] text-muted-foreground font-mono">queued</span>
                    )}
                    {s.status === "done" && (
                      <span className="text-[10px] text-emerald-500 font-mono">ready</span>
                    )}
                    {s.status === "error" && (
                      <span className="text-[10px] text-destructive font-mono">error</span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-foreground line-clamp-2 leading-tight">
                    {s.article.title}
                  </p>
                </div>
                <span className="flex-none text-muted-foreground mt-0.5">
                  {expandedId === s.article.id ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </span>
              </button>

              {expandedId === s.article.id && (
                <div className="px-3 pb-3 border-t border-border/50 pt-3 animate-in fade-in duration-150">
                  {s.status === "pending" && (
                    <p className="text-xs text-muted-foreground italic">Queued for processing...</p>
                  )}
                  {s.status === "streaming" && (
                    <div className="flex items-center gap-2 text-xs text-primary">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Generating summary...
                    </div>
                  )}
                  {(s.status === "done" || s.status === "error") && s.summary && (
                    <div className="space-y-2">
                      <p className="text-xs text-foreground/90 leading-relaxed whitespace-pre-wrap">
                        {s.summary}
                      </p>
                      <a
                        href={s.article.url}
                        target="_blank"
                        rel="noreferrer"
                        data-testid={`link-article-${s.article.id}`}
                        className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline font-mono mt-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Open source article
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex-none p-4 border-t border-sidebar-border bg-sidebar">
        {!showResults ? (
          <button
            onClick={handleProcess}
            disabled={articles.length === 0 || isProcessing}
            data-testid="button-process-summaries"
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Process Staged Summaries
          </button>
        ) : (
          <button
            onClick={handleReset}
            data-testid="button-back-to-queue"
            className="w-full flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 text-muted-foreground py-2.5 rounded-md text-sm font-medium transition-colors"
          >
            Back to Queue
          </button>
        )}
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
