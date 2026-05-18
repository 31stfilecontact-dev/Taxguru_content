import type { ArticlesSummary } from "@workspace/api-client-react";

interface CategoryChipsProps {
  summary: ArticlesSummary;
}

export default function CategoryChips({ summary }: CategoryChipsProps) {
  if (summary.total === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pb-2">
      <div className="px-3 py-1 bg-secondary rounded-full border border-border flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Scraped</span>
        <span className="text-xs font-mono font-bold text-foreground">{summary.total}</span>
      </div>
      
      <div className="w-px h-4 bg-border mx-2"></div>
      
      {summary.byCategory.map((cat) => (
        <div key={cat.category} className="px-3 py-1 bg-card rounded-full border border-border flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">{cat.category}</span>
          <span className="text-xs font-mono font-bold text-primary">{cat.count}</span>
        </div>
      ))}
    </div>
  );
}
