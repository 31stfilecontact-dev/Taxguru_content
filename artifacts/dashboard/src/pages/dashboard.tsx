import { useState } from "react";
import { format } from "date-fns";
import { Loader2, Search, Database, RefreshCw, AlertCircle, ListChecks } from "lucide-react";
import { useGetArticles, useGetArticlesSummary, getGetArticlesQueryKey, getGetArticlesSummaryQueryKey } from "@workspace/api-client-react";
import type { Article, GeneratedPost } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import ArticleCard from "@/components/article-card";
import QueueSidebar from "@/components/queue-sidebar";
import CategoryFilter from "@/components/category-filter";
import PostOutputView from "@/components/post-output-view";

type View = "feed" | "output";

export default function Dashboard() {
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [stagedArticles, setStagedArticles] = useState<Article[]>([]);
  const [view, setView] = useState<View>("feed");
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null);
  const [mobileQueueOpen, setMobileQueueOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: articles, isLoading, refetch, isFetching } = useGetArticles(
    { date },
    { query: { enabled: false, queryKey: getGetArticlesQueryKey({ date }) } }
  );

  const { data: summary, refetch: refetchSummary, isFetching: isFetchingSummary } = useGetArticlesSummary(
    { date },
    { query: { enabled: false, queryKey: getGetArticlesSummaryQueryKey({ date }) } }
  );

  const filteredArticles = articles
    ? activeCategory
      ? articles.filter((a) => a.category === activeCategory)
      : articles
    : undefined;

  const handleGatherData = () => {
    if (!date) {
      toast({ title: "Date required", description: "Please select a date.", variant: "destructive" });
      return;
    }
    setActiveCategory(null);
    refetch();
    refetchSummary();
  };

  const handleAddToQueue = (article: Article) => {
    if (stagedArticles.some((a) => a.id === article.id)) {
      toast({ title: "Already staged", description: "This article is already in the queue." });
      return;
    }
    setStagedArticles((prev) => [...prev, article]);
    toast({ title: "Staged", description: "Article added to the writing queue." });
  };

  const handleRemoveFromQueue = (id: string) => {
    setStagedArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const handlePostGenerated = (post: GeneratedPost) => {
    setGeneratedPost(post);
    setMobileQueueOpen(false);
    setView("output");
  };

  const isLoadingData = isLoading || isFetching || isFetchingSummary;

  if (view === "output" && generatedPost) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-background text-foreground font-sans">
        <PostOutputView post={generatedPost} onBack={() => setView("feed")} />
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-background text-foreground font-sans relative">
      {/* ── Main content ── */}
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden md:border-r md:border-border">

        {/* Header */}
        <header className="flex-none border-b border-border bg-card px-4 md:px-6 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="bg-primary/20 p-2 rounded-md shrink-0">
              <Database className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-base md:text-lg leading-tight tracking-tight truncate">31stFile Intelligence</h1>
              <p className="text-[10px] md:text-xs text-muted-foreground font-mono uppercase tracking-wider">Regulatory Pipeline // IND</p>
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center flex-1 sm:flex-none bg-background border border-border rounded-md px-2 sm:px-3 py-1.5 focus-within:ring-1 focus-within:ring-primary/50 transition-shadow">
              <label htmlFor="date-picker" className="text-[10px] font-mono text-muted-foreground mr-2 uppercase tracking-wider hidden sm:block">
                Date
              </label>
              <input
                id="date-picker"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                data-testid="input-date"
                className="bg-transparent border-none text-sm font-mono focus:outline-none focus:ring-0 w-full sm:w-[130px]"
              />
            </div>
            <button
              onClick={handleGatherData}
              disabled={isLoadingData}
              data-testid="button-gather-data"
              className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoadingData ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              <span className="hidden sm:inline">Gather Data</span>
              <span className="sm:hidden">Gather</span>
            </button>
          </div>
        </header>

        {/* Feed */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 pb-24 md:pb-6">
          {summary && !isLoadingData && (
            <CategoryFilter
              summary={summary}
              active={activeCategory}
              onChange={setActiveCategory}
            />
          )}

          {!articles && !isLoadingData && (
            <div className="h-[360px] flex flex-col items-center justify-center text-center border border-dashed border-border rounded-lg bg-card/30 px-6">
              <Search className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground mb-3 opacity-50" />
              <h3 className="text-base md:text-lg font-medium text-foreground mb-1">Pipeline Idle</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Select a target date and tap Gather to pull live regulatory updates from TaxGuru.
              </p>
            </div>
          )}

          {isLoadingData && (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-card border border-border rounded-lg p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="h-5 w-20 bg-muted rounded" />
                    <div className="h-4 w-28 bg-muted rounded" />
                  </div>
                  <div className="h-6 w-3/4 bg-muted rounded" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-4 w-2/3 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {articles && !isLoadingData && articles.length === 0 && (
            <div className="h-[200px] flex flex-col items-center justify-center text-center border border-border rounded-lg bg-card/30">
              <AlertCircle className="w-8 h-8 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">No regulatory updates found for this date.</p>
            </div>
          )}

          {filteredArticles && !isLoadingData && articles && articles.length > 0 && filteredArticles.length === 0 && (
            <div className="h-[180px] flex flex-col items-center justify-center text-center border border-border rounded-lg bg-card/30 gap-2">
              <AlertCircle className="w-7 h-7 text-muted-foreground opacity-60" />
              <p className="text-sm text-muted-foreground">No articles in <span className="text-foreground font-medium">{activeCategory}</span> for this date.</p>
              <button onClick={() => setActiveCategory(null)} className="text-xs text-primary hover:underline">
                Clear filter
              </button>
            </div>
          )}

          {filteredArticles && !isLoadingData && filteredArticles.length > 0 && (
            <div className="space-y-3 md:space-y-4">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onAddToQueue={() => handleAddToQueue(article)}
                  isInQueue={stagedArticles.some(a => a.id === article.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── Desktop sidebar (md+) ── */}
      <div className="hidden md:flex w-80 shrink-0">
        <QueueSidebar
          articles={stagedArticles}
          onRemove={handleRemoveFromQueue}
          onPostGenerated={handlePostGenerated}
          isMobile={false}
        />
      </div>

      {/* ── Mobile: floating queue button ── */}
      <button
        onClick={() => setMobileQueueOpen(true)}
        data-testid="button-mobile-queue"
        className="md:hidden fixed bottom-5 right-4 z-40 flex items-center gap-2 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/30 px-4 py-3 font-semibold text-sm active:scale-95 transition-transform"
      >
        <ListChecks className="w-4 h-4" />
        Queue
        {stagedArticles.length > 0 && (
          <span className="bg-primary-foreground text-primary text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 -mr-1">
            {stagedArticles.length}
          </span>
        )}
      </button>

      {/* ── Mobile bottom sheet ── */}
      {mobileQueueOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileQueueOpen(false)}
          />
          {/* Sheet */}
          <div className="relative z-10 bg-sidebar rounded-t-2xl max-h-[90dvh] flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
            </div>
            <QueueSidebar
              articles={stagedArticles}
              onRemove={handleRemoveFromQueue}
              onPostGenerated={handlePostGenerated}
              isMobile={true}
              onClose={() => setMobileQueueOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
