import type { ArticlesSummary } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, string> = {
  "Financial News": "💼",
  "Case Laws":      "⚖️",
  "Govt Updates":   "🏛️",
  "CA Compliances": "📋",
};

const CATEGORY_COLORS: Record<string, { active: string; dot: string }> = {
  "Financial News": { active: "border-sky-500/60 bg-sky-500/20 text-sky-200 shadow-sky-500/20",         dot: "bg-sky-400"     },
  "Case Laws":      { active: "border-amber-500/60 bg-amber-500/20 text-amber-200 shadow-amber-500/20",     dot: "bg-amber-400"   },
  "Govt Updates":   { active: "border-purple-500/60 bg-purple-500/20 text-purple-200 shadow-purple-500/20",  dot: "bg-purple-400"  },
  "CA Compliances": { active: "border-emerald-500/60 bg-emerald-500/20 text-emerald-200 shadow-emerald-500/20", dot: "bg-emerald-400" },
  // Backward compatibility
  "Income Tax":     { active: "border-emerald-500/60 bg-emerald-500/20 text-emerald-200", dot: "bg-emerald-400" },
  "GST":            { active: "border-emerald-500/60 bg-emerald-500/20 text-emerald-200", dot: "bg-emerald-400" },
  "Company Law":    { active: "border-amber-500/60 bg-amber-500/20 text-amber-200",     dot: "bg-amber-400"   },
  "Notification":   { active: "border-purple-500/60 bg-purple-500/20 text-purple-200",  dot: "bg-purple-400"  },
  "News":           { active: "border-sky-500/60 bg-sky-500/20 text-sky-200",          dot: "bg-sky-400"     },
};

const DEFAULT_COLORS = { active: "border-primary/60 bg-primary/20 text-primary", dot: "bg-primary" };

interface CategoryFilterProps {
  summary: ArticlesSummary;
  active: string | null;
  onChange: (category: string | null) => void;
}

export default function CategoryFilter({ summary, active, onChange }: CategoryFilterProps) {
  if (summary.total === 0) return null;

  const inactiveBase = "border-border/60 bg-card text-muted-foreground hover:text-foreground hover:border-border hover:bg-card/80";

  return (
    <div
      className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth touch-pan-x"
      style={{ WebkitOverflowScrolling: "touch" }}
      role="group"
      aria-label="Filter by category"
    >
      {/* All pill */}
      <button
        onClick={() => onChange(null)}
        aria-pressed={active === null}
        className={cn(
          "shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-semibold transition-all duration-150 active:scale-95 touch-manipulation min-h-[38px]",
          active === null
            ? "border-primary/60 bg-primary/20 text-primary shadow-sm shadow-primary/20"
            : inactiveBase
        )}
      >
        <span>🌐</span>
        <span>All</span>
        <span className={cn(
          "font-mono text-[10px] px-1.5 py-0.5 rounded-full font-bold",
          active === null ? "bg-primary/30 text-primary" : "bg-muted text-muted-foreground"
        )}>
          {summary.total}
        </span>
      </button>

      {/* Separator */}
      <div className="shrink-0 w-px h-5 bg-border/60 mx-0.5" />

      {/* Per-category pills */}
      {summary.byCategory.map((cat) => {
        const colors = CATEGORY_COLORS[cat.category] ?? DEFAULT_COLORS;
        const icon = CATEGORY_ICONS[cat.category] ?? "📄";
        const isActive = active === cat.category;
        return (
          <button
            key={cat.category}
            onClick={() => onChange(isActive ? null : cat.category)}
            aria-pressed={isActive}
            className={cn(
              "shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-semibold transition-all duration-150 active:scale-95 touch-manipulation min-h-[38px]",
              isActive ? `${colors.active} shadow-sm` : inactiveBase
            )}
          >
            <span>{icon}</span>
            <span className="whitespace-nowrap">{cat.category}</span>
            <span className={cn(
              "font-mono text-[10px] px-1.5 py-0.5 rounded-full font-bold",
              isActive ? "bg-white/20 text-inherit" : "bg-muted text-muted-foreground"
            )}>
              {cat.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
