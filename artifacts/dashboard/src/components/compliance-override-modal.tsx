import { useState, useEffect } from "react";
import { X, Calendar, AlertTriangle, ShieldCheck, Loader2, Info } from "lucide-react";
import { useCreateComplianceOverride } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

interface ComplianceOverrideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialTitle?: string;
  initialCategory?: string;
  initialOriginalDate?: string;
  initialNewDate?: string;
  initialSourceUrl?: string;
  initialNote?: string;
}

const CATEGORIES = [
  "GST",
  "TDS",
  "Income Tax",
  "Advance Tax",
  "ROC",
  "LLP",
  "FEMA",
  "PF-ESI",
];

export default function ComplianceOverrideModal({
  isOpen,
  onClose,
  onSuccess,
  initialTitle = "",
  initialCategory = "GST",
  initialOriginalDate = "",
  initialNewDate = "",
  initialSourceUrl = "",
  initialNote = "",
}: ComplianceOverrideModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [category, setCategory] = useState(initialCategory);
  const [originalDate, setOriginalDate] = useState(initialOriginalDate);
  const [newDate, setNewDate] = useState(initialNewDate);
  const [sourceUrl, setSourceUrl] = useState(initialSourceUrl);
  const [note, setNote] = useState(initialNote);

  const { toast } = useToast();
  const createMutation = useCreateComplianceOverride();

  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
      setCategory(initialCategory || "GST");
      setOriginalDate(initialOriginalDate);
      setNewDate(initialNewDate);
      setSourceUrl(initialSourceUrl);
      setNote(initialNote);
    }
  }, [isOpen, initialTitle, initialCategory, initialOriginalDate, initialNewDate, initialSourceUrl, initialNote]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({ title: "Title required", description: "Please enter compliance title.", variant: "destructive" });
      return;
    }
    if (!newDate) {
      toast({ title: "New date required", description: "Please specify the due date.", variant: "destructive" });
      return;
    }

    try {
      await createMutation.mutateAsync({
        data: {
          title: title.trim(),
          category,
          originalDate: originalDate ? originalDate.trim() : null,
          newDate: newDate.trim(),
          note: note.trim() || undefined,
          sourceUrl: sourceUrl.trim() || undefined,
        },
      });

      toast({
        title: "Compliance entry saved",
        description: originalDate
          ? `Override created: ${title} extended to ${newDate}`
          : `Custom compliance item added on ${newDate}`,
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      toast({
        title: "Failed to save",
        description: err instanceof Error ? err.message : "Network error",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="w-full max-w-lg bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100 max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#141E33]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-semibold text-sm sm:text-base text-white">
                Add Compliance Item / Override
              </h2>
              <p className="text-[11px] text-slate-400">
                Override statutory deadlines or log client-specific filings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
          {/* Helper Callout */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-sky-950/40 border border-sky-800/50 text-sky-200 text-xs leading-relaxed">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <span>
              <strong>Note:</strong> For client-specific or foreign-parent-FY-linked items (e.g. CbCR Form 3CEAD, Form 3CEAC), enter the computed date directly.
            </span>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Compliance Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. GSTR-3B for Group 1 States or Form 3CEAD (CbCR)"
              className="w-full bg-[#182338] border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Category <span className="text-rose-400">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#182338] border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Dates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Original Due Date
              </label>
              <input
                type="date"
                value={originalDate}
                onChange={(e) => setOriginalDate(e.target.value)}
                className="w-full bg-[#182338] border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm font-mono text-white focus:outline-none focus:border-sky-500"
              />
              <span className="block text-[10px] text-slate-400 mt-1">
                Leave blank for standalone custom entries.
              </span>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                New / Effective Due Date <span className="text-rose-400">*</span>
              </label>
              <input
                type="date"
                required
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full bg-[#182338] border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm font-mono text-white focus:outline-none focus:border-sky-500"
              />
              <span className="block text-[10px] text-slate-400 mt-1">
                The actual statutory deadline to show on calendar.
              </span>
            </div>
          </div>

          {/* Notification / Note */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Notification Details / Note (Optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Extended vide Notification No. 12/2025-CT dated 18-05-2025"
              className="w-full bg-[#182338] border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Source URL */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Source Gazette / Circular URL (Internal reference only)
            </label>
            <input
              type="url"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="https://taxguru.in/... or official gazette link"
              className="w-full bg-[#182338] border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Internal reference only; never displayed on exported images or public calendars.
            </p>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 active:scale-95 text-white text-xs sm:text-sm font-semibold transition-all disabled:opacity-50"
            >
              {createMutation.isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Save Compliance Entry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
