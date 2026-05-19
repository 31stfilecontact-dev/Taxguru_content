import type { ArticlesSummary } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, { active: string; dot: string }> = {
  "Income Tax":   { active: "border-blue-500/60 bg-blue-500/15 text-blue-300",    dot: "bg-blue-400"    },
  "GST":          { active: "border-emerald-500/60 bg-emerald-500/15 text-emerald-300", dot: "bg-emerald-400" },
  "Company Law":  { active: "border-amber-500/60 bg-amber-500/15 text-amber-300",  dot: "bg-amber-400"   },
  "Notification": { active: "border-purple-500/60 bg-purple-500/15 text-purple-300", dot: "bg-purple-400" },
  "News":         { active: "border-slate-400/60 bg-slate-400/15 text-slate-300",  dot: "bg-slate-400"   },
};

const DEFAULT_COLORS = { active: "border-primary/60 bg-primary/15 text-primary", dot: "bg-primary" };

interface CategoryFilterProps {
  summary: ArticlesSummary;
  active: string | null;
  onChange: (category: string | null) => void;
}

export default function CategoryFilter({ summary, active, onChange }: CategoryFilterProps) {
  if (summary.total === 0) return null;

  const inactiveBase = "border-border/50 bg-card text-muted-foreground hover:text-foreground hover:border-border hover:bg-card/80";

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar" role="group" aria-label="Filter by category">
      {/* All pill */}
      <button
        onClick={() => onChange(null)}
        aria-pressed={active === null}
        className={cn(
          "shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-150 active:scale-95",
          active === null
            ? "border-primary/60 bg-primary/15 text-primary shadow-sm shadow-primary/10"
            : inactiveBase
        )}
      >
        All
        <span className={cn(
          "font-mono text-[10px] px-1.5 py-0.5 rounded-sm",
          active === null ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
        )}>
          {summary.total}
        </span>
      </button>

      {/* Separator */}
      <div className="shrink-0 w-px h-4 bg-border/60" />

      {/* Per-category pills */}
      {summary.byCategory.map((cat) => {
        const colors = CATEGORY_COLORS[cat.category] ?? DEFAULT_COLORS;
        const isActive = active === cat.category;
        return (
          <button
            key={cat.category}
            onClick={() => onChange(isActive ? null : cat.category)}
            aria-pressed={isActive}
            className={cn(
              "shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-150 active:scale-95",
              isActive ? `${colors.active} shadow-sm` : inactiveBase
            )}
          >
            <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", isActive ? colors.dot : "bg-muted-foreground/40")} />
            {cat.category}
            <span className={cn(
              "font-mono text-[10px] px-1.5 py-0.5 rounded-sm",
              isActive ? "bg-white/10 text-inherit" : "bg-muted text-muted-foreground"
            )}>
              {cat.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
