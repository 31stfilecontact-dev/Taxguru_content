import { useState } from "react";
import { format } from "date-fns";
import { Loader2, Search, Database, RefreshCw, AlertCircle } from "lucide-react";
import { useGetArticles, useGetArticlesSummary, getGetArticlesQueryKey, getGetArticlesSummaryQueryKey } from "@workspace/api-client-react";
import type { Article, GeneratedPost } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import ArticleCard from "@/components/article-card";
import QueueSidebar from "@/components/queue-sidebar";
import CategoryChips from "@/components/category-chips";
import PostOutputView from "@/components/post-output-view";

type View = "feed" | "generating" | "output";

export default function Dashboard() {
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [stagedArticles, setStagedArticles] = useState<Article[]>([]);
  const [view, setView] = useState<View>("feed");
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null);
  const { toast } = useToast();

  const { data: articles, isLoading, refetch, isFetching } = useGetArticles(
    { date },
    { query: { enabled: false, queryKey: getGetArticlesQueryKey({ date }) } }
  );

  const { data: summary, refetch: refetchSummary, isFetching: isFetchingSummary } = useGetArticlesSummary(
    { date },
    { query: { enabled: false, queryKey: getGetArticlesSummaryQueryKey({ date }) } }
  );

  const handleGatherData = () => {
    if (!date) {
      toast({
        title: "Date required",
        description: "Please select a date to gather data.",
        variant: "destructive",
      });
      return;
    }
    refetch();
    refetchSummary();
  };

  const handleAddToQueue = (article: Article) => {
    if (stagedArticles.some((a) => a.id === article.id)) {
      toast({
        title: "Already in queue",
        description: "This article is already staged.",
      });
      return;
    }
    setStagedArticles((prev) => [...prev, article]);
  };

  const handleRemoveFromQueue = (id: string) => {
    setStagedArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const handlePostGenerated = (post: GeneratedPost) => {
    setGeneratedPost(post);
    setView("output");
  };

  const isLoadingData = isLoading || isFetching || isFetchingSummary;

  if (view === "output" && generatedPost) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-background text-foreground font-sans">
        <PostOutputView
          post={generatedPost}
          onBack={() => setView("feed")}
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground font-sans">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full border-r border-border overflow-hidden">
        {/* Header / Command Bar */}
        <header className="flex-none h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-md">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-tight">31stFile Intelligence</h1>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Regulatory Pipeline // IND</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-background border border-border rounded-md px-3 py-1.5 focus-within:ring-1 focus-within:ring-primary/50 transition-shadow">
              <label htmlFor="date-picker" className="text-xs font-mono text-muted-foreground mr-3 uppercase tracking-wider">
                Target Date
              </label>
              <input
                id="date-picker"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                data-testid="input-date"
                className="bg-transparent border-none text-sm font-mono focus:outline-none focus:ring-0 w-[130px]"
              />
            </div>
            <button
              onClick={handleGatherData}
              disabled={isLoadingData}
              data-testid="button-gather-data"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingData ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              Gather Data
            </button>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {summary && !isLoadingData && <CategoryChips summary={summary} />}

          {!articles && !isLoadingData && (
            <div className="h-[400px] flex flex-col items-center justify-center text-center border border-dashed border-border rounded-lg bg-card/30">
              <Search className="w-10 h-10 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-foreground mb-1">Pipeline Idle</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Select a target date and click Gather Data to pull live regulatory updates from TaxGuru RSS feeds.
              </p>
            </div>
          )}

          {isLoadingData && (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-card border border-border rounded-lg p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="h-5 w-24 bg-muted rounded"></div>
                    <div className="h-4 w-32 bg-muted rounded"></div>
                  </div>
                  <div className="h-6 w-3/4 bg-muted rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-muted rounded"></div>
                    <div className="h-4 w-2/3 bg-muted rounded"></div>
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

          {articles && !isLoadingData && articles.length > 0 && (
            <div className="space-y-4">
              {articles.map((article) => (
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

      {/* Sidebar Staging Queue */}
      <QueueSidebar
        articles={stagedArticles}
        onRemove={handleRemoveFromQueue}
        onPostGenerated={handlePostGenerated}
      />
    </div>
  );
}
