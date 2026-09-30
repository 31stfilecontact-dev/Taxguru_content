import { useRef, useState } from "react";
import type { GeneratedPost } from "@workspace/api-client-react";
import {
  ArrowLeft,
  Download,
  Image as ImageIcon,
  Share2,
  Loader2,
  Link2,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  Users,
  CheckSquare,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  Sparkles,
} from "lucide-react";

const HEADER_LOGO = "/logo-header.png";
const WATERMARK_LOGO = "/logo-watermark-blue.png";

interface RegularUpdateViewProps {
  post: GeneratedPost;
  onBack: () => void;
}

export default function RegularUpdateView({ post, onBack }: RegularUpdateViewProps) {
  const exportRef = useRef<HTMLDivElement>(null);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [exporting, setExporting] = useState<"jpeg" | "pdf" | null>(null);
  const [pushing, setPushing] = useState(false);
  const [pushed, setPushed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "graphic" | "text">("preview");

  const headline = post.headline || post.title;
  const whatChanged = post.whatChanged || post.summaryOfFacts || "";
  const effectiveDate = post.effectiveDate || post.articleDate;
  const appliesTo = post.appliesTo || `Entities subject to ${post.articleCategory}`;
  const actionRequired = post.actionRequired || "Review statutory filing requirements and update compliance records.";

  const getLinkedInFormattedText = () => {
    if (post.linkedInPost) return post.linkedInPost;
    const categoryTag = (post.articleCategory || "RegulatoryUpdate").replace(/[^a-zA-Z0-9]/g, "");
    const tags =
      post.hashtags && post.hashtags.length > 0
        ? post.hashtags.join(" ")
        : `#31stFile #${categoryTag} #ComplianceAlert #RegulatoryUpdate #TaxUpdate`;

    return `⚡ Statutory Compliance Update: ${headline}

📌 What Changed:
${whatChanged}

🗓️ Effective Date: ${effectiveDate}
🎯 Applies To: ${appliesTo}

📋 Action Required:
${actionRequired}

🔗 Official Circular / Notification: ${post.articleUrl}

${tags}`;
  };

  const copyForLinkedIn = async () => {
    const text = getLinkedInFormattedText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const downloadAsJPEG = async () => {
    if (!exportRef.current) return;
    setExporting("jpeg");
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(exportRef.current, {
        scale: 2,
        backgroundColor: "#FFFFFF",
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `31stFile_Update_${post.articleDate.replace(/\s/g, "_")}.jpeg`;
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();
    } finally {
      setExporting(null);
    }
  };

  const downloadAsPDF = async () => {
    if (!exportRef.current) return;
    setExporting("pdf");
    try {
      const { default: html2canvas } = await import("html2canvas");
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(exportRef.current, {
        scale: 2,
        backgroundColor: "#FFFFFF",
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`31stFile_Update_${post.articleDate.replace(/\s/g, "_")}.pdf`);
    } finally {
      setExporting(null);
    }
  };

  const postToSocials = async () => {
    if (!webhookUrl.trim()) return;
    setPushing(true);
    try {
      await fetch(webhookUrl.trim(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      setPushed(true);
      setTimeout(() => setPushed(false), 3000);
    } catch {
      alert("Error pushing to socials. Check your webhook URL.");
    } finally {
      setPushing(false);
    }
  };

  const linkedInText = getLinkedInFormattedText();

  const renderGraphicCard = (isEmbedded = false) => (
    <div
      data-testid="card-update-preview"
      className={`w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative text-slate-900 ${
        isEmbedded ? "mb-0" : "mb-8"
      }`}
    >
      {/* Solid Navy Blue Header */}
      <div className="bg-[#0F172A] px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between border-b border-slate-800">
        <img
          src={HEADER_LOGO}
          alt="31st File"
          className="h-8 sm:h-9 object-contain filter drop-shadow-sm"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase text-amber-300 bg-amber-950/80 border border-amber-500/30 px-2.5 py-1 rounded-full">
            Compliance Alert
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full hidden sm:inline">
            {post.articleDate}
          </span>
        </div>
      </div>

      {/* White Card Body with Blue Watermark */}
      <div className="p-5 sm:p-8 relative bg-white">
        {/* Centered subtle background watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.07] select-none z-0"
        >
          <img
            src={WATERMARK_LOGO}
            alt=""
            className="w-72 sm:w-96 max-w-[80vw] object-contain"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        </div>

        <article className="relative z-10">
          {/* Category pill & mobile date */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
              {post.articleCategory}
            </span>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full sm:hidden">
              {post.articleDate}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-xl sm:text-2xl md:text-[26px] font-bold text-slate-900 leading-snug tracking-tight mb-5"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {headline}
          </h1>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-blue-600/30 via-slate-300 to-transparent mb-6" />

          {/* What Changed paragraph */}
          <section className="mb-5 bg-slate-50 border border-slate-200/90 rounded-xl p-4 sm:p-5">
            <p className="text-[11px] font-bold tracking-wider uppercase text-slate-600 mb-2">
              What Changed
            </p>
            <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed whitespace-pre-line m-0">
              {whatChanged}
            </p>
          </section>

          {/* Two-Column Compact Row: Effective Date | Applies To */}
          <section className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                  Effective Date
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5 block">
                  {effectiveDate}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <Users className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                  Applies To
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5 block">
                  {appliesTo}
                </span>
              </div>
            </div>
          </section>

          {/* Action Required: Distinctive note box */}
          <section className="mb-6 rounded-xl border border-blue-200 bg-blue-50/60 p-4 sm:p-5 border-l-4 border-l-blue-600">
            <div className="flex items-center gap-1.5 mb-1.5">
              <CheckSquare className="w-4 h-4 text-blue-700" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-950">
                Action Required
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed m-0 font-medium">
              {actionRequired}
            </p>
          </section>

          {/* Source link */}
          <div className="mb-2">
            <a
              href={post.articleUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors py-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Read official notification / circular</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[#0B1120] relative">
      {/* ── Sticky top bar ── */}
      <div className="flex-none flex items-center justify-between gap-1.5 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/8 bg-[#0F172A]/90 backdrop-blur-md z-10">
        <button
          onClick={onBack}
          data-testid="button-back-to-feed"
          className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-300 hover:text-white active:scale-95 transition-all p-1.5 rounded-lg hover:bg-white/5 touch-manipulation"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden xs:inline">Feed</span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={copyForLinkedIn}
            data-testid="button-copy-linkedin"
            className="flex items-center gap-1.5 text-xs font-semibold bg-sky-600 hover:bg-sky-500 active:scale-95 text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg transition-all shadow-sm touch-manipulation min-h-[36px]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span className="text-[11px] sm:text-xs">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px] sm:text-xs">Copy for LinkedIn</span>
              </>
            )}
          </button>

          <button
            onClick={downloadAsJPEG}
            disabled={exporting !== null}
            data-testid="button-download-jpeg"
            title="Download as JPEG graphic"
            className="flex items-center gap-1 text-xs font-medium bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors disabled:opacity-40 min-h-[36px] touch-manipulation"
          >
            {exporting === "jpeg" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <ImageIcon className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">JPEG</span>
          </button>

          <button
            onClick={downloadAsPDF}
            disabled={exporting !== null}
            data-testid="button-download-pdf"
            title="Download as PDF brief"
            className="flex items-center gap-1 text-xs font-medium bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors disabled:opacity-40 min-h-[36px] touch-manipulation"
          >
            {exporting === "pdf" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">PDF</span>
          </button>
        </div>
      </div>

      {/* ── Subheader Tab Switcher ── */}
      <div className="flex-none px-3 sm:px-6 py-2.5 border-b border-white/8 bg-[#0F172A]/80 backdrop-blur-md flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-white/10 rounded-xl">
          <button
            onClick={() => setActiveTab("preview")}
            data-testid="tab-linkedin-preview"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "preview"
                ? "bg-sky-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>LinkedIn Post Preview</span>
          </button>
          <button
            onClick={() => setActiveTab("graphic")}
            data-testid="tab-graphic-preview"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "graphic"
                ? "bg-sky-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Visual Graphic Asset</span>
          </button>
          <button
            onClick={() => setActiveTab("text")}
            data-testid="tab-text-preview"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "text"
                ? "bg-sky-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Text Copy & Webhook</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-slate-400 hidden sm:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Statutory Compliance Desk</span>
        </div>
      </div>

      {/* ── Main Scroll Area ── */}
      <div className="flex-1 overflow-y-auto pb-24 sm:pb-16 relative p-3 sm:p-6 flex flex-col items-center">
        {/* TAB 1: Real-life LinkedIn Feed Mockup Preview */}
        {activeTab === "preview" && (
          <div className="w-full max-w-2xl space-y-4">
            {/* Quick banner */}
            <div className="w-full bg-sky-950/40 border border-sky-500/30 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs text-sky-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Simulated LinkedIn feed preview with live copy and attached graphic.</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyForLinkedIn}
                  className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-2.5 py-1 rounded-md text-[11px] transition-all flex items-center gap-1 shadow-sm"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copied!" : "Copy Post"}</span>
                </button>
                <button
                  onClick={downloadAsJPEG}
                  disabled={exporting !== null}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium px-2.5 py-1 rounded-md text-[11px] transition-all flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Download JPEG</span>
                </button>
              </div>
            </div>

            {/* LinkedIn Mockup Card */}
            <div className="w-full bg-[#1E293B] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl">
              {/* LinkedIn Post Author Header */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#0F172A] border-2 border-sky-500/30 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
                    <img src={HEADER_LOGO} alt="31st File" className="w-9 h-9 object-contain" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-sm text-white hover:text-sky-400 cursor-pointer">31st File</span>
                      <span className="text-slate-400 text-xs">• 1st</span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">Tax, Regulatory & Financial Intelligence // IND</p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                      <span>Just now</span>
                      <span>•</span>
                      <span title="Public">🌐</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-full hidden xs:inline">
                    LinkedIn Feed Preview
                  </span>
                </div>
              </div>

              {/* Post Text Content */}
              <div className="p-4 sm:p-5 font-sans text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed border-b border-slate-800/80">
                {linkedInText}
              </div>

              {/* Attached Visual Graphic Preview (Embedded in LinkedIn post) */}
              <div className="p-3 sm:p-5 bg-slate-950/60 border-b border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>Attached Graphic Asset</span>
                  <span className="text-sky-400">1080 × 1350 High-Res</span>
                </div>
                {renderGraphicCard(true)}
              </div>

              {/* LinkedIn Interaction Bar */}
              <div className="px-4 py-3 bg-[#0F172A] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 select-none">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-1.5 hover:text-sky-400 cursor-pointer transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="hidden xs:inline">Like</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-sky-400 cursor-pointer transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span className="hidden xs:inline">Comment</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-sky-400 cursor-pointer transition-colors">
                    <Repeat2 className="w-4 h-4" />
                    <span className="hidden xs:inline">Repost</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-sky-400 cursor-pointer transition-colors">
                    <Send className="w-4 h-4" />
                    <span className="hidden xs:inline">Send</span>
                  </div>
                </div>
                <button
                  onClick={copyForLinkedIn}
                  className="flex items-center gap-1.5 text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white px-3 py-1.5 rounded-lg transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Post"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Standalone Visual Graphic Card */}
        {activeTab === "graphic" && (
          <div className="w-full max-w-2xl flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3 px-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                Standalone Compliance Graphic Asset
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={downloadAsJPEG}
                  disabled={exporting !== null}
                  className="text-xs bg-sky-600 hover:bg-sky-500 text-white font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download JPEG</span>
                </button>
                <button
                  onClick={downloadAsPDF}
                  disabled={exporting !== null}
                  className="text-xs bg-white/10 hover:bg-white/20 text-white font-medium px-3 py-1.5 rounded-lg transition-all flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
            {renderGraphicCard(false)}
          </div>
        )}

        {/* TAB 3: Text Copy & Webhook */}
        {activeTab === "text" && (
          <div className="w-full max-w-2xl space-y-6">
            {/* ── LinkedIn Studio Box ── */}
            <section className="mb-8 bg-slate-900/90 border border-sky-500/30 rounded-xl p-4 sm:p-5 shadow-lg">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-sky-500/20 text-sky-300 text-[11px] px-2 py-0.5 rounded font-mono font-bold">
                    LinkedIn Studio
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {linkedInText.length} chars
                  </span>
                </div>
                <button
                  onClick={copyForLinkedIn}
                  className="flex items-center gap-1.5 text-xs font-semibold bg-sky-600 hover:bg-sky-500 active:scale-95 text-white px-3 py-1.5 rounded-md transition-all touch-manipulation"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Post"}</span>
                </button>
              </div>

              <div className="bg-slate-950/70 border border-white/10 rounded-lg p-3 sm:p-4 font-sans text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed max-h-60 sm:max-h-72 overflow-y-auto">
                {linkedInText}
              </div>

              {post.hashtags && post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {post.hashtags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] sm:text-[11px] font-mono text-sky-400/80 bg-sky-400/10 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {/* Webhook Automation section */}
            <section className="mb-6">
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                <Share2 className="w-3 h-3" />
                Webhook Automation
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center gap-2 bg-white/4 border border-white/10 rounded-lg px-3 focus-within:ring-1 focus-within:ring-primary/50 transition-shadow">
                  <Link2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <input
                    type="url"
                    placeholder="https://hook.eu1.make.com/..."
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full bg-transparent border-none py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                  />
                </div>
                <button
                  onClick={postToSocials}
                  disabled={!webhookUrl.trim() || pushing}
                  className="flex items-center justify-center gap-1.5 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-lg text-xs font-semibold transition-all disabled:opacity-50 min-h-[38px] touch-manipulation"
                >
                  {pushing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <ExternalLink className="w-3.5 h-3.5" />
                  )}
                  <span>{pushed ? "Sent!" : "Push Webhook"}</span>
                </button>
              </div>
              {pushed && (
                <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Successfully pushed to your scheduling webhook
                </p>
              )}
            </section>

            {/* Branding footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono">31stFile.com</span>
              <span>Financial Hub // IND</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Off-screen export card (captured for JPEG / PDF) ── */}
      <div
        style={{
          position: "absolute",
          left: -9999,
          top: 0,
          width: 680,
          pointerEvents: "none",
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        <div
          ref={exportRef}
          style={{
            width: 680,
            boxSizing: "border-box",
            backgroundColor: "#FFFFFF",
            color: "#0F172A",
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            overflow: "hidden",
            borderRadius: 16,
            border: "1px solid #CBD5E1",
          }}
        >
          {/* Navy Blue Header */}
          <div
            style={{
              backgroundColor: "#0F172A",
              padding: "20px 28px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #1E293B",
            }}
          >
            <img
              src={HEADER_LOGO}
              alt="31st File"
              style={{ height: 38, objectFit: "contain", display: "block" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  fontSize: 10,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "#FBBF24",
                  backgroundColor: "rgba(251, 191, 36, 0.12)",
                  border: "1px solid rgba(251, 191, 36, 0.3)",
                  padding: "4px 12px",
                  borderRadius: 9999,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                COMPLIANCE ALERT
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "#94A3B8",
                  fontFamily: "monospace",
                }}
              >
                {post.articleDate}
              </span>
            </div>
          </div>

          {/* White Body with Watermark */}
          <div
            style={{
              padding: "28px 30px",
              position: "relative",
              backgroundColor: "#FFFFFF",
            }}
          >
            {/* Watermark Logo */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0.08,
                pointerEvents: "none",
                userSelect: "none",
                width: 380,
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

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "6px 10px",
                  color: "#0284C7",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  marginBottom: 12,
                  textTransform: "uppercase",
                }}
              >
                <span>31stFile Intelligence</span>
                <span style={{ color: "#CBD5E1" }}>|</span>
                <span style={{ color: "#64748B" }}>{post.articleDate}</span>
                <span style={{ color: "#CBD5E1" }}>|</span>
                <span style={{ color: "#0369A1" }}>{post.articleCategory}</span>
              </div>

              <h1
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  margin: "0 0 16px 0",
                  color: "#0F172A",
                  lineHeight: 1.35,
                }}
              >
                {headline}
              </h1>

              {/* What Changed */}
              <div
                style={{
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: 10,
                  padding: "16px 18px",
                  marginBottom: 14,
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#475569", textTransform: "uppercase", marginBottom: 6 }}>
                  What Changed
                </div>
                <p
                  style={{
                    color: "#334155",
                    fontSize: 13.5,
                    lineHeight: 1.7,
                    margin: 0,
                    whiteSpace: "pre-line",
                  }}
                >
                  {whatChanged}
                </p>
              </div>

              {/* 2-Column Compact Row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    borderRadius: 8,
                    padding: "10px 14px",
                  }}
                >
                  <span style={{ fontSize: 9, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748B", fontWeight: 700, display: "block" }}>
                    Effective Date
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#0F172A", marginTop: 2, display: "block" }}>
                    {effectiveDate}
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    borderRadius: 8,
                    padding: "10px 14px",
                  }}
                >
                  <span style={{ fontSize: 9, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748B", fontWeight: 700, display: "block" }}>
                    Applies To
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#0F172A", marginTop: 2, display: "block" }}>
                    {appliesTo}
                  </span>
                </div>
              </div>

              {/* Action Required: Thin left border note */}
              <div
                style={{
                  borderLeft: "4px solid #2563EB",
                  backgroundColor: "#EFF6FF",
                  borderRadius: "0 8px 8px 0",
                  borderTop: "1px solid #DBEAFE",
                  borderRight: "1px solid #DBEAFE",
                  borderBottom: "1px solid #DBEAFE",
                  padding: "12px 14px",
                  marginBottom: 16,
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1E40AF", marginBottom: 4 }}>
                  Action Required
                </div>
                <p style={{ color: "#1E293B", fontSize: 12.5, lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                  {actionRequired}
                </p>
              </div>

              {/* Footer action links */}
              <div
                style={{
                  marginTop: 18,
                  paddingTop: 14,
                  borderTop: "1px solid #E2E8F0",
                  textAlign: "center",
                }}
              >
                <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8, padding: "10px 14px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "4px 16px" }}>
                    <span style={{ color: "#0284C7", fontSize: 11, fontWeight: 600 }}>Source Article</span>
                    <span style={{ color: "#CBD5E1" }}>•</span>
                    <span style={{ color: "#0284C7", fontSize: 11, fontWeight: 500 }}>31stFile.com</span>
                    <span style={{ color: "#CBD5E1" }}>•</span>
                    <span style={{ color: "#0284C7", fontSize: 11, fontWeight: 500 }}>LinkedIn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
