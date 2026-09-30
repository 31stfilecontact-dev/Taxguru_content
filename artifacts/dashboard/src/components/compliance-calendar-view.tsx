import { useRef, useState, useMemo } from "react";
import { format, startOfWeek, endOfWeek, isWithinInterval, parseISO } from "date-fns";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Image as ImageIcon,
  Copy,
  Check,
  PlusCircle,
  Trash2,
  Calendar,
  Layers,
  Sparkles,
  Loader2,
} from "lucide-react";
import {
  useGetComplianceCalendar,
  useGetComplianceOverrides,
  useDeleteComplianceOverride,
  type ComplianceItem,
} from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import ComplianceOverrideModal from "./compliance-override-modal";

const HEADER_LOGO = "/logo-header.png";
const WATERMARK_LOGO = "/logo-watermark.png";

// Screen preview Tailwind styles
const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  GST: { bg: "bg-emerald-950/80", text: "text-emerald-300", border: "border-emerald-600/60", dot: "bg-emerald-400" },
  TDS: { bg: "bg-amber-950/80", text: "text-amber-300", border: "border-amber-600/60", dot: "bg-amber-400" },
  "Income Tax": { bg: "bg-sky-950/80", text: "text-sky-300", border: "border-sky-600/60", dot: "bg-sky-400" },
  "Advance Tax": { bg: "bg-purple-950/80", text: "text-purple-300", border: "border-purple-600/60", dot: "bg-purple-400" },
  ROC: { bg: "bg-indigo-950/80", text: "text-indigo-300", border: "border-indigo-600/60", dot: "bg-indigo-400" },
  LLP: { bg: "bg-rose-950/80", text: "text-rose-300", border: "border-rose-600/60", dot: "bg-rose-400" },
  FEMA: { bg: "bg-teal-950/80", text: "text-teal-300", border: "border-teal-600/60", dot: "bg-teal-400" },
  "PF-ESI": { bg: "bg-orange-950/80", text: "text-orange-300", border: "border-orange-600/60", dot: "bg-orange-400" },
};

const DEFAULT_CATEGORY_STYLE = {
  bg: "bg-slate-900/90",
  text: "text-slate-200",
  border: "border-slate-700",
  dot: "bg-slate-400",
};

// Pure hex/rgba colors for off-screen export (avoids Tailwind v4 oklch/color-mix parser errors in html2canvas)
const EXPORT_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  GST: { bg: "#064E3B", text: "#6EE7B7", border: "#059669", dot: "#34D399" },
  TDS: { bg: "#78350F", text: "#FCD34D", border: "#D97706", dot: "#FBBF24" },
  "Income Tax": { bg: "#0C4A6E", text: "#7DD3FC", border: "#0284C7", dot: "#38BDF8" },
  "Advance Tax": { bg: "#4C1D95", text: "#C4B5FD", border: "#7C3AED", dot: "#A78BFA" },
  ROC: { bg: "#312E81", text: "#A5B4FC", border: "#4F46E5", dot: "#818CF8" },
  LLP: { bg: "#881337", text: "#FDA4AF", border: "#E11D48", dot: "#FB7185" },
  FEMA: { bg: "#134E4A", text: "#5EEAD4", border: "#0D9488", dot: "#2DD4BF" },
  "PF-ESI": { bg: "#7C2D12", text: "#FDBA74", border: "#EA580C", dot: "#FB923C" },
};

const DEFAULT_EXPORT_COLOR = {
  bg: "#1E293B",
  text: "#E2E8F0",
  border: "#475569",
  dot: "#94A3B8",
};

interface ComplianceCalendarViewProps {
  onBack: () => void;
}

export default function ComplianceCalendarView({ onBack }: ComplianceCalendarViewProps) {
  const nowIST = useMemo(() => new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })), []);
  const [selectedYear, setSelectedYear] = useState<number>(nowIST.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(nowIST.getMonth() + 1);

  const [exporting, setExporting] = useState<"jpeg" | "pdf" | null>(null);
  const [copied, setCopied] = useState(false);
  const [overrideModalOpen, setOverrideModalOpen] = useState(false);
  const [showManageDrawer, setShowManageDrawer] = useState(false);
  const [selectedDayItems, setSelectedDayItems] = useState<{ day: number; items: ComplianceItem[] } | null>(null);

  const exportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Queries & Mutations
  const {
    data: items,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetComplianceCalendar({
    year: selectedYear,
    month: selectedMonth,
  });

  const { data: overrides, refetch: refetchOverrides } = useGetComplianceOverrides();
  const deleteOverrideMutation = useDeleteComplianceOverride();

  // Navigation
  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedYear((y) => y - 1);
      setSelectedMonth(12);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedYear((y) => y + 1);
      setSelectedMonth(1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  };

  // Month Calendar Grid calculations
  const monthDate = new Date(selectedYear, selectedMonth - 1, 1);
  const monthName = format(monthDate, "MMMM");
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const firstDayOfWeek = new Date(selectedYear, selectedMonth - 1, 1).getDay(); // 0 is Sun

  // Map items by day
  const itemsByDay = useMemo(() => {
    const map = new Map<number, ComplianceItem[]>();
    if (!items) return map;
    for (const item of items) {
      const parts = item.dueDate.split("-");
      if (parts.length === 3) {
        const itemYear = parseInt(parts[0], 10);
        const itemMonth = parseInt(parts[1], 10);
        const itemDay = parseInt(parts[2], 10);
        if (itemYear === selectedYear && itemMonth === selectedMonth) {
          const list = map.get(itemDay) || [];
          list.push(item);
          map.set(itemDay, list);
        }
      }
    }
    return map;
  }, [items, selectedYear, selectedMonth]);

  // "THIS WEEK" highlights calculation
  const thisWeekItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    const isCurrentMonthViewed =
      selectedYear === nowIST.getFullYear() && selectedMonth === nowIST.getMonth() + 1;

    const referenceDate = isCurrentMonthViewed ? nowIST : new Date(selectedYear, selectedMonth - 1, 7);
    const weekStart = startOfWeek(referenceDate, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(referenceDate, { weekStartsOn: 0 });

    return items.filter((item) => {
      try {
        const itemDate = parseISO(item.dueDate);
        return isWithinInterval(itemDate, { start: weekStart, end: weekEnd });
      } catch {
        return false;
      }
    });
  }, [items, selectedYear, selectedMonth, nowIST]);

  // Download JPEG (uses off-screen pristine 1080x1350 card with pure standard CSS)
  const downloadAsJPEG = async () => {
    if (!exportRef.current) return;
    setExporting("jpeg");
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(exportRef.current, {
        scale: 2,
        backgroundColor: "#0B1120",
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `31stFile_Compliance_Calendar_${monthName}_${selectedYear}.jpeg`;
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();
      toast({ title: "Image downloaded", description: `Saved 1080x1350 graphic for ${monthName} ${selectedYear}` });
    } catch (err) {
      console.error("Export JPEG error:", err);
      toast({
        title: "Export failed",
        description: err instanceof Error ? err.message : "Could not export image.",
        variant: "destructive",
      });
    } finally {
      setExporting(null);
    }
  };

  // Download PDF
  const downloadAsPDF = async () => {
    if (!exportRef.current) return;
    setExporting("pdf");
    try {
      const { default: html2canvas } = await import("html2canvas");
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(exportRef.current, {
        scale: 2,
        backgroundColor: "#0B1120",
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF("p", "pt", [1080, 1350]);
      pdf.addImage(imgData, "JPEG", 0, 0, 1080, 1350);
      pdf.save(`31stFile_Compliance_Calendar_${monthName}_${selectedYear}.pdf`);
      toast({ title: "PDF downloaded", description: `Saved compliance calendar document` });
    } catch (err) {
      console.error("Export PDF error:", err);
      toast({
        title: "Export failed",
        description: err instanceof Error ? err.message : "Could not export PDF.",
        variant: "destructive",
      });
    } finally {
      setExporting(null);
    }
  };

  // Copy Summary for LinkedIn
  const copySummaryForLinkedIn = async () => {
    if (!items) return;
    const header = `🗓️ 31stFile Statutory Compliance Calendar — ${monthName} ${selectedYear}\nCBDT • CBIC • MCA • RBI • EPFO/ESIC\n\n📌 Key Statutory Deadlines for the Month:\n`;
    const list = items
      .map(
        (it) =>
          `• ${it.dueDate.slice(8)} ${monthName.slice(0, 3)}: [${it.category}] ${it.title}${
            it.isExtended ? " (EXTENDED)" : ""
          }${it.conditional ? " *" : ""}`,
      )
      .join("\n");
    const footer = `\n\n* Conditional item (entity/turnover specific).\n⚠️ All dates are provisional & subject to official notifications.\n\n#31stFile #ComplianceCalendar #TaxUpdate #CharteredAccountant #GST #IncomeTax #ROC`;

    const fullText = header + list + footer;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      toast({ title: "Copied to clipboard", description: "Formatted calendar summary ready for LinkedIn." });
    } catch {
      const ta = document.createElement("textarea");
      ta.value = fullText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDeleteOverride = async (id: number) => {
    try {
      await deleteOverrideMutation.mutateAsync({ id });
      toast({ title: "Override removed" });
      refetch();
      refetchOverrides();
    } catch (err) {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] w-full overflow-hidden bg-[#070B14] text-slate-100 font-sans relative">
      {/* ── Toolbar Header ── */}
      <header className="flex-none border-b border-slate-800 bg-[#0B1120] px-3 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2.5 z-20">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBack}
            data-testid="button-back-to-feed"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline">Feed</span>
          </button>
          <div className="h-4 w-px bg-slate-800 hidden xs:block" />
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-sky-400" />
            <h1 className="font-semibold text-xs sm:text-sm tracking-tight text-white">
              Compliance Calendar
            </h1>
          </div>
        </div>

        {/* Month Selector Controls */}
        <div className="flex items-center gap-1.5 bg-[#0F172A] border border-slate-700/80 rounded-lg p-1">
          <button
            onClick={handlePrevMonth}
            aria-label="Previous Month"
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="px-2 font-mono text-xs sm:text-sm font-semibold text-sky-300 min-w-[130px] text-center flex items-center justify-center gap-1.5">
            {isLoading && <Loader2 className="w-3 h-3 animate-spin text-sky-400" />}
            {monthName} {selectedYear}
          </div>
          <button
            onClick={handleNextMonth}
            aria-label="Next Month"
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setOverrideModalOpen(true)}
            data-testid="button-add-override"
            className="flex items-center gap-1.5 text-xs font-semibold bg-sky-600 hover:bg-sky-500 active:scale-95 text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Item / Override</span>
            <span className="sm:hidden">Add</span>
          </button>

          <button
            onClick={copySummaryForLinkedIn}
            data-testid="button-copy-calendar-linkedin"
            title="Copy formatted summary for LinkedIn"
            className="flex items-center gap-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
            <span className="hidden md:inline">{copied ? "Copied!" : "Copy Post"}</span>
          </button>

          <button
            onClick={downloadAsJPEG}
            disabled={exporting !== null}
            data-testid="button-download-calendar-jpeg"
            title="Export 1080x1350 JPEG Graphic"
            className="flex items-center gap-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors disabled:opacity-40"
          >
            {exporting === "jpeg" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
            ) : (
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span className="hidden sm:inline">JPEG</span>
          </button>

          <button
            onClick={downloadAsPDF}
            disabled={exporting !== null}
            data-testid="button-download-calendar-pdf"
            title="Export PDF Document"
            className="flex items-center gap-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors disabled:opacity-40"
          >
            {exporting === "pdf" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-400" />
            ) : (
              <Download className="w-3.5 h-3.5 text-rose-400" />
            )}
            <span className="hidden sm:inline">PDF</span>
          </button>

          <button
            onClick={() => setShowManageDrawer((v) => !v)}
            data-testid="button-manage-overrides"
            title="Manage Active Overrides"
            className="flex items-center gap-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-2.5 py-1.5 sm:py-2 rounded-lg transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden lg:inline">Overrides</span>
            {overrides && overrides.length > 0 && (
              <span className="bg-sky-500/20 text-sky-300 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {overrides.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {isError && (
        <div className="bg-red-950/80 border-b border-red-800/80 px-4 py-2.5 flex items-center justify-between text-xs text-red-200 z-20">
          <span>Failed to load statutory compliance calendar: {(error as any)?.message || "API connection error"}.</span>
          <button
            onClick={() => refetch()}
            className="px-2.5 py-1 bg-red-900 hover:bg-red-800 text-white rounded text-xs font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {/* ── Responsive Screen Preview Container ── */}
      <div className="flex-1 overflow-auto p-3 sm:p-6 flex justify-center items-start bg-[#050811]">
        <div className="w-full max-w-5xl bg-[#0B1120] border border-slate-800 rounded-2xl p-4 sm:p-7 flex flex-col gap-5 shadow-2xl relative">
          {/* Subtle preview watermark logo */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.035] select-none z-0">
            <img
              src={WATERMARK_LOGO}
              alt=""
              className="w-96 max-w-[80vw] object-contain"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          </div>

          {/* ── Top Header Row ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 z-10">
            <div className="flex items-center gap-3">
              <img
                src={HEADER_LOGO}
                alt="31stFile"
                className="h-10 sm:h-12 w-auto object-contain drop-shadow"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-sky-400 uppercase font-bold">
                    31stFile Intelligence Hub
                  </span>
                  <span className="text-[9px] bg-sky-950 border border-sky-800/80 text-sky-300 px-2 py-0.5 rounded-full font-mono">
                    STATUTORY COMPLIANCE
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-0.5">
                  {monthName.toUpperCase()} {selectedYear}
                </h2>
                <p className="text-[11px] text-slate-400 font-mono tracking-wider">
                  CBDT • CBIC • MCA • RBI • EPFO • ESIC
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
              <span className="text-xs font-mono bg-[#111C35] border border-sky-500/30 text-sky-300 px-2.5 py-1 rounded-lg">
                {items ? items.length : 0} Compliance Deadlines
              </span>
              <p className="text-[10px] text-slate-400 font-mono mt-1">
                India Standard Time (IST)
              </p>
            </div>
          </div>

          {/* ── Category Color Legend ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 py-2 px-3 rounded-lg bg-[#0F172A] border border-slate-800 z-10 text-[11px]">
            <div className="flex items-center gap-2 flex-wrap">
              {Object.entries(CATEGORY_STYLES).map(([cat, st]) => (
                <div key={cat} className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-sm ${st.dot}`} />
                  <span className="font-semibold text-slate-300 text-[10px] sm:text-xs">{cat}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] sm:text-[11px] font-mono sm:pl-3 sm:border-l sm:border-slate-800">
              <span className="text-amber-400 font-bold text-sm leading-none">•</span>
              <span>Conditional (turnover / entity criteria)</span>
            </div>
          </div>

          {/* ── 7-Column Calendar Grid ── */}
          <div className="flex flex-col z-10">
            {/* Sun-Sat Header */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-1.5 text-center">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((dayName, idx) => (
                <div
                  key={dayName}
                  className={`text-[10px] sm:text-xs font-mono font-bold tracking-wider py-1 rounded ${
                    idx === 0 || idx === 6 ? "bg-slate-900/60 text-slate-400" : "bg-slate-900/90 text-sky-300"
                  }`}
                >
                  {dayName}
                </div>
              ))}
            </div>

            {/* Month Day Slots */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {Array.from({ length: 35 }).map((_, index) => {
                const dayNumber = index - firstDayOfWeek + 1;
                const isCurrentMonthDay = dayNumber >= 1 && dayNumber <= daysInMonth;
                const dayItems = isCurrentMonthDay ? itemsByDay.get(dayNumber) || [] : [];
                const firstItem = dayItems[0];
                const moreCount = dayItems.length > 1 ? dayItems.length - 1 : 0;

                const isToday =
                  isCurrentMonthDay &&
                  selectedYear === nowIST.getFullYear() &&
                  selectedMonth === nowIST.getMonth() + 1 &&
                  dayNumber === nowIST.getDate();

                if (!isCurrentMonthDay) {
                  return (
                    <div
                      key={index}
                      className="min-h-[64px] sm:min-h-[82px] rounded-lg bg-slate-900/20 border border-slate-800/30 p-1 opacity-25"
                    />
                  );
                }

                const firstItemStyle = firstItem
                  ? CATEGORY_STYLES[firstItem.category] || DEFAULT_CATEGORY_STYLE
                  : DEFAULT_CATEGORY_STYLE;

                return (
                  <div
                    key={index}
                    onClick={() => {
                      if (dayItems.length > 0) {
                        setSelectedDayItems({ day: dayNumber, items: dayItems });
                      }
                    }}
                    className={`min-h-[64px] sm:min-h-[82px] rounded-lg border p-1 sm:p-1.5 flex flex-col justify-between transition-colors relative cursor-pointer ${
                      isToday
                        ? "bg-sky-950/30 border-sky-500 shadow-sm shadow-sky-500/10"
                        : dayItems.length > 0
                        ? "bg-[#0F172A] border-slate-700 hover:border-slate-500"
                        : "bg-slate-900/40 border-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-[10px] sm:text-xs font-bold ${
                          isToday
                            ? "bg-sky-500 text-slate-950 px-1 rounded font-black"
                            : dayItems.length > 0
                            ? "text-slate-200"
                            : "text-slate-400"
                        }`}
                      >
                        {dayNumber}
                      </span>
                      {dayItems.length > 0 && <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />}
                    </div>

                    {firstItem && (
                      <div className="mt-0.5 flex-1 flex flex-col justify-between overflow-hidden">
                        <div
                          className={`p-1 rounded text-[9px] sm:text-[10px] leading-tight border ${firstItemStyle.bg} ${firstItemStyle.border} ${firstItemStyle.text} font-medium flex flex-col gap-0.5 overflow-hidden`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider font-bold truncate">
                              {firstItem.category}
                            </span>
                            {firstItem.conditional && (
                              <span className="text-amber-400 font-black text-xs leading-none">•</span>
                            )}
                          </div>
                          <span className="truncate font-semibold text-[9px] sm:text-[10px] text-white">
                            {firstItem.title}
                          </span>
                          {firstItem.isExtended && (
                            <span className="inline-block self-start font-mono text-[8px] bg-amber-500/30 text-amber-200 border border-amber-500/40 px-1 rounded">
                              EXT
                            </span>
                          )}
                        </div>

                        {moreCount > 0 && (
                          <div className="mt-0.5 text-right">
                            <span className="inline-block text-[8px] sm:text-[9px] font-mono font-bold text-sky-300 bg-sky-950 border border-sky-800 px-1 py-0.2 rounded-full">
                              +{moreCount} more
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── "THIS WEEK" Highlights Section ── */}
          <div className="rounded-xl bg-[#0F172A] border border-slate-800 p-3.5 sm:p-4 z-10">
            <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-xs tracking-wider uppercase text-slate-200">
                  THIS WEEK'S STATUTORY DEADLINES
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">High Priority Action Items</span>
            </div>

            {thisWeekItems.length === 0 ? (
              <div className="py-3 text-center text-xs text-slate-400 font-mono">
                No statutory deadlines scheduled for this week.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
                {thisWeekItems.slice(0, 6).map((item) => {
                  const st = CATEGORY_STYLES[item.category] || DEFAULT_CATEGORY_STYLE;
                  return (
                    <div
                      key={item.id}
                      className={`p-2.5 rounded-lg border ${st.bg} ${st.border} flex items-start justify-between gap-2`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${st.text}`}>
                            {item.category}
                          </span>
                          {item.isExtended && (
                            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-mono font-bold px-1 rounded">
                              EXTENDED
                            </span>
                          )}
                          {item.conditional && (
                            <span className="text-amber-400 text-xs font-black leading-none">•</span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-white leading-tight truncate">{item.title}</p>
                        {item.conditionNote && (
                          <p className="text-[10px] text-slate-300 truncate mt-0.5">{item.conditionNote}</p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono text-xs font-bold text-sky-300 bg-sky-950 px-1.5 py-0.5 rounded border border-sky-800">
                          {format(parseISO(item.dueDate), "MMM dd")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Footer Notice ── */}
          <div className="border-t border-slate-800 pt-3 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] text-slate-400 font-mono">
            <div className="max-w-[700px] leading-tight">
              <p className="text-amber-400 font-medium">
                ⚠️ All dates are provisional & subject to official notifications. Check official CBDT/CBIC/MCA gazettes for late notifications.
              </p>
              <p className="text-slate-400 mt-0.5">
                • Marked items apply conditionally based on turnover, taxpayer scheme, or entity type.
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="font-semibold text-slate-300">31stFile Intelligence</span>
              <p className="text-slate-400">linkedin.com/company/31stfile</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Day Items Modal (Clicking any calendar date) ── */}
      {selectedDayItems && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedDayItems(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in"
        >
          <div className="w-full max-w-md bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl p-5 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <h3 className="font-bold text-base text-white">
                  Deadlines on {monthName} {selectedDayItems.day}, {selectedYear}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {selectedDayItems.items.length} Statutory Item{selectedDayItems.items.length > 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={() => setSelectedDayItems(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
              {selectedDayItems.items.map((item) => {
                const st = CATEGORY_STYLES[item.category] || DEFAULT_CATEGORY_STYLE;
                return (
                  <div key={item.id} className={`p-3 rounded-xl border ${st.bg} ${st.border} space-y-1`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold uppercase ${st.text}`}>{item.category}</span>
                      {item.isExtended && (
                        <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded">
                          EXTENDED
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    {item.conditionNote && (
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong>Condition:</strong> {item.conditionNote}
                      </p>
                    )}
                    {item.note && (
                      <p className="text-xs text-sky-200/80 leading-relaxed font-mono">{item.note}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Active Overrides Drawer ── */}
      {showManageDrawer && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowManageDrawer(false);
          }}
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in"
        >
          <div className="w-full max-w-md h-full bg-[#0F172A] border-l border-slate-800 p-5 flex flex-col text-slate-100 shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <h3 className="font-bold text-base text-white">Active Date Overrides</h3>
                <p className="text-xs text-slate-400">Manual statutory modifications & standalone entries</p>
              </div>
              <button onClick={() => setShowManageDrawer(false)} className="p-1 rounded text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
              {!overrides || overrides.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs font-mono">
                  No active overrides. Recurring statutory rules apply as default.
                </div>
              ) : (
                overrides.map((ov) => (
                  <div key={ov.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 relative">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-sky-400">{ov.category}</span>
                        <h4 className="text-xs font-semibold text-white">{ov.title}</h4>
                      </div>
                      <button
                        onClick={() => handleDeleteOverride(ov.id)}
                        title="Delete override"
                        className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-[11px] font-mono text-slate-300">
                      {ov.originalDate ? (
                        <>
                          <span className="line-through text-slate-400">{ov.originalDate}</span> →{" "}
                          <span className="text-amber-300 font-bold">{ov.newDate}</span>
                        </>
                      ) : (
                        <>
                          <span>Custom Date: </span>
                          <span className="text-sky-300 font-bold">{ov.newDate}</span>
                        </>
                      )}
                    </div>

                    {ov.note && <p className="text-[11px] text-slate-400 leading-tight">{ov.note}</p>}
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => {
                setShowManageDrawer(false);
                setOverrideModalOpen(true);
              }}
              className="mt-4 w-full py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 font-semibold text-xs text-white transition-colors"
            >
              + Add New Override
            </button>
          </div>
        </div>
      )}

      {/* ── Add Override Modal ── */}
      <ComplianceOverrideModal
        isOpen={overrideModalOpen}
        onClose={() => setOverrideModalOpen(false)}
        onSuccess={() => {
          refetch();
          refetchOverrides();
        }}
      />

      {/*
        ════════════════════════════════════════════════════════════════════════
        OFF-SCREEN PRISTINE 1080x1350 NODE FOR HTML2CANVAS EXPORT
        • Fixed exactly 1080 x 1350 px (4:5 ratio)
        • NO CSS transforms / scale / zoom ancestors (eliminates html2canvas clone bugs)
        • Pure standard HEX/RGBA colors (eliminates Tailwind v4 oklch/color-mix parser crashes)
        • Image onError fallbacks and crossOrigin="anonymous"
        ════════════════════════════════════════════════════════════════════════
      */}
      <div
        style={{
          position: "absolute",
          left: -99999,
          top: 0,
          width: 1080,
          height: 1350,
          pointerEvents: "none",
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        <div
          ref={exportRef}
          style={{
            width: 1080,
            height: 1350,
            boxSizing: "border-box",
            backgroundColor: "#0B1120",
            color: "#F8FAFC",
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle background watermark logo */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 0.04,
              pointerEvents: "none",
              userSelect: "none",
              width: 540,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 0,
            }}
          >
            <img
              src={WATERMARK_LOGO}
              alt=""
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          </div>

          {/* ── Top Header Section (110px) ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #1E293B",
              paddingBottom: 20,
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <img
                src={HEADER_LOGO}
                alt="31st File"
                style={{ height: 52, objectFit: "contain", display: "block" }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: "monospace",
                      letterSpacing: "0.22em",
                      color: "#38BDF8",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    31stFile Intelligence Hub
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      backgroundColor: "#082F49",
                      border: "1px solid #075985",
                      color: "#7DD3FC",
                      padding: "2px 8px",
                      borderRadius: 9999,
                      fontFamily: "monospace",
                    }}
                  >
                    STATUTORY COMPLIANCE
                  </span>
                </div>
                <h1
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "#FFFFFF",
                    margin: "4px 0 2px 0",
                  }}
                >
                  {monthName.toUpperCase()} {selectedYear}
                </h1>
                <p
                  style={{
                    fontSize: 12,
                    color: "#94A3B8",
                    fontFamily: "monospace",
                    letterSpacing: "0.08em",
                    margin: 0,
                  }}
                >
                  CBDT • CBIC • MCA • RBI • EPFO • ESIC
                </p>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  display: "inline-block",
                  fontSize: 12,
                  fontFamily: "monospace",
                  backgroundColor: "#111C35",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  color: "#7DD3FC",
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontWeight: 600,
                }}
              >
                {items ? items.length : 0} Compliance Deadlines
              </div>
              <p
                style={{
                  fontSize: 10,
                  color: "#64748B",
                  fontFamily: "monospace",
                  margin: "4px 0 0 0",
                }}
              >
                India Standard Time (IST)
              </p>
            </div>
          </div>

          {/* ── Category Legend & Marker Key (38px) ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 14px",
              borderRadius: 8,
              backgroundColor: "#0F172A",
              border: "1px solid #1E293B",
              fontSize: 11,
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              {Object.entries(EXPORT_COLORS).map(([cat, st]) => (
                <div key={cat} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      backgroundColor: st.dot,
                      display: "inline-block",
                    }}
                  />
                  <span style={{ fontWeight: 600, color: "#CBD5E1" }}>{cat}</span>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "#94A3B8",
                fontFamily: "monospace",
                fontSize: 11,
                paddingLeft: 12,
                borderLeft: "1px solid #334155",
              }}
            >
              <span style={{ color: "#FBBF24", fontWeight: 900, fontSize: 13, lineHeight: 1 }}>•</span>
              <span>Conditional item (turnover / entity criteria)</span>
            </div>
          </div>

          {/* ── 7-Column Calendar Grid (630px) ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Header row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 6,
                textAlign: "center",
              }}
            >
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((dayName, idx) => (
                <div
                  key={dayName}
                  style={{
                    fontSize: 11,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    padding: "6px 0",
                    borderRadius: 6,
                    backgroundColor: idx === 0 || idx === 6 ? "rgba(15, 23, 42, 0.6)" : "#0F172A",
                    color: idx === 0 || idx === 6 ? "#94A3B8" : "#38BDF8",
                    border: "1px solid #1E293B",
                  }}
                >
                  {dayName}
                </div>
              ))}
            </div>

            {/* 35 Day slots */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 6,
              }}
            >
              {Array.from({ length: 35 }).map((_, index) => {
                const dayNumber = index - firstDayOfWeek + 1;
                const isCurrentMonthDay = dayNumber >= 1 && dayNumber <= daysInMonth;
                const dayItems = isCurrentMonthDay ? itemsByDay.get(dayNumber) || [] : [];
                const firstItem = dayItems[0];
                const moreCount = dayItems.length > 1 ? dayItems.length - 1 : 0;

                if (!isCurrentMonthDay) {
                  return (
                    <div
                      key={index}
                      style={{
                        height: 98,
                        borderRadius: 8,
                        backgroundColor: "rgba(15, 23, 42, 0.3)",
                        border: "1px solid rgba(30, 41, 59, 0.4)",
                        opacity: 0.3,
                      }}
                    />
                  );
                }

                const style = firstItem
                  ? EXPORT_COLORS[firstItem.category] || DEFAULT_EXPORT_COLOR
                  : DEFAULT_EXPORT_COLOR;

                return (
                  <div
                    key={index}
                    style={{
                      height: 98,
                      borderRadius: 8,
                      border: dayItems.length > 0 ? "1px solid #334155" : "1px solid #1E293B",
                      backgroundColor: dayItems.length > 0 ? "#0F172A" : "rgba(15, 23, 42, 0.5)",
                      padding: 6,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: 12,
                          fontWeight: 700,
                          color: dayItems.length > 0 ? "#F8FAFC" : "#64748B",
                        }}
                      >
                        {dayNumber}
                      </span>
                      {dayItems.length > 0 && (
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: "#38BDF8",
                            display: "inline-block",
                          }}
                        />
                      )}
                    </div>

                    {firstItem && (
                      <div
                        style={{
                          marginTop: 4,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          flex: 1,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            padding: "4px 5px",
                            borderRadius: 5,
                            backgroundColor: style.bg,
                            border: `1px solid ${style.border}`,
                            color: style.text,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "monospace",
                                fontSize: 9,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {firstItem.category}
                            </span>
                            {firstItem.conditional && (
                              <span style={{ color: "#FBBF24", fontWeight: 900, fontSize: 11, lineHeight: 1 }}>
                                •
                              </span>
                            )}
                          </div>
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 600,
                              color: "#FFFFFF",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {firstItem.title}
                          </span>
                          {firstItem.isExtended && (
                            <span
                              style={{
                                alignSelf: "flex-start",
                                fontFamily: "monospace",
                                fontSize: 8,
                                backgroundColor: "rgba(245, 158, 11, 0.25)",
                                color: "#FDE68A",
                                border: "1px solid rgba(245, 158, 11, 0.5)",
                                padding: "0 3px",
                                borderRadius: 3,
                              }}
                            >
                              EXT
                            </span>
                          )}
                        </div>

                        {moreCount > 0 && (
                          <div style={{ textAlign: "right", marginTop: 2 }}>
                            <span
                              style={{
                                display: "inline-block",
                                fontSize: 9,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                color: "#7DD3FC",
                                backgroundColor: "#082F49",
                                border: "1px solid #075985",
                                padding: "1px 5px",
                                borderRadius: 9999,
                              }}
                            >
                              +{moreCount} more
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── "THIS WEEK" Section (260px) ── */}
          <div
            style={{
              borderRadius: 10,
              backgroundColor: "#0F172A",
              border: "1px solid #1E293B",
              padding: "16px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
                paddingBottom: 8,
                borderBottom: "1px solid #1E293B",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#FBBF24", fontSize: 14 }}>⚡</span>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#F8FAFC",
                  }}
                >
                  THIS WEEK'S STATUTORY DEADLINES
                </span>
              </div>
              <span style={{ fontSize: 10, fontFamily: "monospace", color: "#64748B" }}>
                High Priority Action Items
              </span>
            </div>

            {thisWeekItems.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "16px 0",
                  fontSize: 12,
                  color: "#94A3B8",
                  fontFamily: "monospace",
                }}
              >
                No statutory deadlines scheduled for this week.
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 10,
                }}
              >
                {thisWeekItems.slice(0, 6).map((item) => {
                  const style = EXPORT_COLORS[item.category] || DEFAULT_EXPORT_COLOR;
                  return (
                    <div
                      key={item.id}
                      style={{
                        padding: "10px 12px",
                        borderRadius: 8,
                        backgroundColor: style.bg,
                        border: `1px solid ${style.border}`,
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 8,
                        boxSizing: "border-box",
                      }}
                    >
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            marginBottom: 2,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 9,
                              fontFamily: "monospace",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              color: style.text,
                            }}
                          >
                            {item.category}
                          </span>
                          {item.isExtended && (
                            <span
                              style={{
                                backgroundColor: "rgba(245, 158, 11, 0.2)",
                                color: "#FDE68A",
                                border: "1px solid rgba(245, 158, 11, 0.4)",
                                fontSize: 9,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                padding: "0 4px",
                                borderRadius: 3,
                              }}
                            >
                              EXTENDED
                            </span>
                          )}
                          {item.conditional && (
                            <span style={{ color: "#FBBF24", fontSize: 12, fontWeight: 900 }}>•</span>
                          )}
                        </div>
                        <p
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#FFFFFF",
                            margin: 0,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.title}
                        </p>
                        {item.conditionNote && (
                          <p
                            style={{
                              fontSize: 10,
                              color: "#CBD5E1",
                              margin: "2px 0 0 0",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.conditionNote}
                          </p>
                        )}
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#7DD3FC",
                            backgroundColor: "#082F49",
                            padding: "3px 6px",
                            borderRadius: 4,
                            border: "1px solid #075985",
                          }}
                        >
                          {format(parseISO(item.dueDate), "MMM dd")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Footer Notice Section (50px) ── */}
          <div
            style={{
              borderTop: "1px solid #1E293B",
              paddingTop: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 10,
              color: "#94A3B8",
              fontFamily: "monospace",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ maxWidth: 700, lineHeight: 1.4 }}>
              <p style={{ color: "#FBBF24", fontWeight: 500, margin: 0 }}>
                ⚠️ All dates are provisional & subject to official notifications. Check official CBDT/CBIC/MCA gazettes for late notifications.
              </p>
              <p style={{ color: "#64748B", margin: "2px 0 0 0" }}>
                • Marked items apply conditionally based on turnover, taxpayer scheme, or entity type.
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontWeight: 700, color: "#E2E8F0" }}>31stFile Intelligence</span>
              <p style={{ color: "#64748B", margin: "2px 0 0 0" }}>linkedin.com/company/31stfile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
