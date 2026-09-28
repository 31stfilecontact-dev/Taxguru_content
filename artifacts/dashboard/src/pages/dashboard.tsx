import { useState } from "react";
import { format } from "date-fns";
import { Loader2, Search, Database, RefreshCw, AlertCircle, ListChecks, X, KeyRound } from "lucide-react";
import { useGetArticles, useGetArticlesSummary, getGetArticlesQueryKey, getGetArticlesSummaryQueryKey } from "@workspace/api-client-react";
import type { Article, GeneratedPost } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import ArticleCard from "@/components/article-card";
import QueueSidebar from "@/components/queue-sidebar";
import CategoryFilter from "@/components/category-filter";
import PostOutputView from "@/components/post-output-view";
import LlmSettingsModal from "@/components/llm-settings-modal";

type View = "feed" | "output";

export default function Dashboard() {
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [stagedArticles, setStagedArticles] = useState<Article[]>([]);
  const [view, setView] = useState<View>("feed");
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null);
  const [mobileQueueOpen, setMobileQueueOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
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
    ? articles.filter((a) => {
        const matchesCategory = activeCategory ? a.category === activeCategory : true;
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch = q
          ? a.title.toLowerCase().includes(q) ||
            a.excerpt.toLowerCase().includes(q) ||
            (a.source && a.source.toLowerCase().includes(q))
          : true;
        return matchesCategory && matchesSearch;
      })
    : undefined;

  const handleGatherData = () => {
    if (!date) {
      toast({ title: "Date required", description: "Please select a date.", variant: "destructive" });
      return;
    }
    setActiveCategory(null);
    setSearchQuery("");
    refetch();
    refetchSummary();
  };

  const handleAddToQueue = (article: Article) => {
    if (stagedArticles.some((a) => a.id === article.id)) {
      toast({ title: "Already staged", description: "This article is already in your LinkedIn queue." });
      return;
    }
    setStagedArticles((prev) => [...prev, article]);
    toast({ title: "Staged for Post", description: "Added to LinkedIn studio queue." });
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
      <div className="flex h-[100dvh] w-full overflow-hidden bg-background text-foreground font-sans">
        <PostOutputView post={generatedPost} onBack={() => setView("feed")} />
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-background text-foreground font-sans relative">
      {/* ── Main content ── */}
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden md:border-r md:border-border">

        {/* Responsive Header */}
        <header className="flex-none border-b border-border bg-card px-3 sm:px-6 py-2.5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
          {/* Brand Row */}
          <div className="flex items-center justify-between min-w-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="bg-primary/20 p-2 rounded-lg shrink-0">
                <Database className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h1 className="font-bold text-sm sm:text-base md:text-lg leading-tight tracking-tight truncate">
                  31stFile Intelligence
                </h1>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider truncate">
                  Financial Hub // News · Case Laws · Govt · CA
                </p>
              </div>
            </div>

            {/* Mobile buttons in header: Settings + Queue */}
            <div className="sm:hidden flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setSettingsOpen(true)}
                aria-label="LLM API Settings"
                title="LLM API Settings"
                data-testid="button-open-settings-mobile"
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-slate-300 hover:text-white transition-colors touch-manipulation active:scale-95"
              >
                <KeyRound className="w-3.5 h-3.5 text-sky-400" />
              </button>
              <button
                onClick={() => setMobileQueueOpen(true)}
                className="flex items-center gap-1.5 bg-secondary hover:bg-secondary/80 border border-border px-2.5 py-1.5 rounded-lg text-xs font-medium touch-manipulation active:scale-95"
              >
                <ListChecks className="w-3.5 h-3.5 text-primary" />
                <span>Queue</span>
                <span className="bg-primary/20 text-primary font-mono font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                  {stagedArticles.length}
                </span>
              </button>
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setSettingsOpen(true)}
              data-testid="button-open-settings"
              title="LLM Studio Settings (Gemini API Key)"
              className="hidden sm:flex items-center gap-1.5 bg-secondary hover:bg-secondary/80 border border-border px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white transition-all min-h-[38px] touch-manipulation active:scale-95"
            >
              <KeyRound className="w-4 h-4 text-sky-400" />
              <span className="hidden lg:inline">LLM Key</span>
            </button>

            <div className="flex items-center flex-1 sm:flex-none bg-background border border-border rounded-lg px-2.5 py-1.5 focus-within:ring-1 focus-within:ring-primary/50 transition-shadow">
              <label htmlFor="date-picker" className="text-[10px] font-mono text-muted-foreground mr-2 uppercase tracking-wider hidden xs:block">
                Date
              </label>
              <input
                id="date-picker"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                data-testid="input-date"
                aria-label="Publication date"
                title="Filter by publication date"
                className="bg-transparent border-none text-xs sm:text-sm font-mono focus:outline-none focus:ring-0 w-full sm:w-[130px]"
              />
            </div>
            <button
              onClick={handleGatherData}
              disabled={isLoadingData}
              data-testid="button-gather-data"
              className="flex items-center justify-center gap-1.5 bg-primary hover:bg-primary/90 active:scale-95 text-primary-foreground px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-sm min-h-[38px] touch-manipulation"
            >
              {isLoadingData ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              <span>Gather Data</span>
            </button>
          </div>
        </header>

        {/* Feed container */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-6 space-y-3.5 sm:space-y-4 pb-24 md:pb-6">
          {summary && !isLoadingData && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-1 border-b border-border/40">
              <CategoryFilter
                summary={summary}
                active={activeCategory}
                onChange={setActiveCategory}
              />
              {/* Responsive Search Box */}
              <div className="relative flex items-center w-full sm:w-64 shrink-0">
                <Search className="absolute left-2.5 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search articles & sources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-card border border-border rounded-lg pl-8 pr-7 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground/60 min-h-[36px]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 text-muted-foreground hover:text-foreground p-1 touch-manipulation"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {!articles && !isLoadingData && (
            <div className="h-[320px] sm:h-[360px] flex flex-col items-center justify-center text-center border border-dashed border-border/70 rounded-xl bg-card/30 px-4 sm:px-6">
              <Search className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground mb-3 opacity-40" />
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                Content Hub Ready
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-sm">
                Tap <strong>Gather Data</strong> to ingest live multi-source feeds across Financial News, Case Laws, Govt Updates, and CA Compliances.
              </p>
            </div>
          )}

          {isLoadingData && (
            <div className="space-y-3 sm:space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-card border border-border rounded-xl p-4 sm:p-5 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div className="h-4 w-24 bg-muted rounded" />
                    <div className="h-3.5 w-24 bg-muted rounded" />
                  </div>
                  <div className="h-5 w-4/5 bg-muted rounded" />
                  <div className="space-y-1.5">
                    <div className="h-3.5 w-full bg-muted rounded" />
                    <div className="h-3.5 w-2/3 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {articles && !isLoadingData && articles.length === 0 && (
            <div className="h-[200px] flex flex-col items-center justify-center text-center border border-border rounded-xl bg-card/30 p-4">
              <AlertCircle className="w-8 h-8 text-muted-foreground mb-2 opacity-60" />
              <p className="text-xs sm:text-sm text-muted-foreground">No updates found for this date.</p>
            </div>
          )}

          {filteredArticles && !isLoadingData && articles && articles.length > 0 && filteredArticles.length === 0 && (
            <div className="h-[180px] flex flex-col items-center justify-center text-center border border-border rounded-xl bg-card/30 p-4 gap-2">
              <AlertCircle className="w-6 h-6 text-muted-foreground opacity-60" />
              <p className="text-xs sm:text-sm text-muted-foreground">
                No matching articles found{activeCategory ? ` in ${activeCategory}` : ""}{searchQuery ? ` matching "${searchQuery}"` : ""}.
              </p>
              <button
                onClick={() => {
                  setActiveCategory(null);
                  setSearchQuery("");
                }}
                className="text-xs text-primary font-medium hover:underline p-1"
              >
                Clear all filters
              </button>
            </div>
          )}

          {filteredArticles && !isLoadingData && filteredArticles.length > 0 && (
            <div className="space-y-3 sm:space-y-4">
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

      {/* ── Desktop Queue Sidebar ── */}
      <aside className="hidden md:flex flex-col w-80 lg:w-96 h-full shrink-0 bg-card">
        <QueueSidebar
          articles={stagedArticles}
          onRemove={handleRemoveFromQueue}
          onPostGenerated={handlePostGenerated}
        />
      </aside>

      {/* ── Mobile Floating Queue Button (Sticky pill with count & gradient) ── */}
      <div className="md:hidden fixed bottom-4 right-4 z-30">
        <button
          onClick={() => setMobileQueueOpen(true)}
          data-testid="button-open-queue-mobile"
          className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-600 text-white px-4 py-3 rounded-full shadow-xl shadow-sky-950/40 font-semibold text-xs tracking-wide hover:brightness-110 active:scale-95 transition-all touch-manipulation min-h-[46px]"
        >
          <ListChecks className="w-4 h-4 text-sky-200" />
          <span>Queue</span>
          <span className="bg-white/20 text-white font-mono font-bold text-[11px] px-2 py-0.5 rounded-full">
            {stagedArticles.length}
          </span>
        </button>
      </div>

      {/* ── Mobile Queue Slide-up Drawer ── */}
      {mobileQueueOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileQueueOpen(false);
          }}
          className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="w-full h-[88dvh] max-h-[88dvh] bg-card rounded-t-2xl overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300 border-t border-border relative">
            {/* Visual handle */}
            <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto my-2 shrink-0" />
            <div className="flex-1 overflow-hidden flex flex-col">
              <QueueSidebar
                articles={stagedArticles}
                onRemove={handleRemoveFromQueue}
                onPostGenerated={handlePostGenerated}
                isMobile
                onClose={() => setMobileQueueOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Password-Protected LLM API Key Settings Modal ── */}
      <LlmSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
