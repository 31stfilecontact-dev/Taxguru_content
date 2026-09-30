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
} from "lucide-react";

const HEADER_LOGO = "/logo-header.png";
const WATERMARK_LOGO = "/logo-watermark-blue.png";

interface NewsArticleViewProps {
  post: GeneratedPost;
  onBack: () => void;
}

export default function NewsArticleView({ post, onBack }: NewsArticleViewProps) {
  const exportRef = useRef<HTMLDivElement>(null);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [exporting, setExporting] = useState<"jpeg" | "pdf" | null>(null);
  const [pushing, setPushing] = useState(false);
  const [pushed, setPushed] = useState(false);
  const [copied, setCopied] = useState(false);

  const headline = post.headline || post.title;
  const summary = post.summary || post.summaryOfFacts || "";
  const whyItMatters = post.whyItMatters;

  const getLinkedInFormattedText = () => {
    if (post.linkedInPost) return post.linkedInPost;
    const categoryTag = (post.articleCategory || "FinancialNews").replace(/[^a-zA-Z0-9]/g, "");
    const tags =
      post.hashtags && post.hashtags.length > 0
        ? post.hashtags.join(" ")
        : `#31stFile #${categoryTag} #FinancialNews #BusinessUpdate #IndianEconomy`;

    return `📰 Financial & Business Intelligence: ${headline}

${summary}

${whyItMatters ? `💡 Why It Matters:\n${whyItMatters}\n\n` : ""}🔗 Direct Reference: ${post.articleUrl}

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
      link.download = `31stFile_News_${post.articleDate.replace(/\s/g, "_")}.jpeg`;
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
      pdf.save(`31stFile_News_${post.articleDate.replace(/\s/g, "_")}.pdf`);
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

      {/* ── Reader scroll area ── */}
      <div className="flex-1 overflow-y-auto pb-24 sm:pb-16 relative p-3 sm:p-6 flex flex-col items-center">
        {/* Main News Card Container */}
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative text-slate-900 mb-8">
          {/* Solid Navy Blue Header */}
          <div className="bg-[#0F172A] px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between border-b border-slate-800">
            <img
              src={HEADER_LOGO}
              alt="31st File"
              className="h-8 sm:h-9 object-contain filter drop-shadow-sm"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                News Desk
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

              {/* News Summary Paragraph (3-5 sentences, no bullets) */}
              <section className="mb-6 bg-slate-50 border border-slate-200/90 rounded-xl p-4 sm:p-5">
                <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed whitespace-pre-line font-normal">
                  {summary}
                </p>
              </section>

              {/* Why it matters (single muted line above footer) */}
              {whyItMatters && (
                <section className="mb-6 rounded-xl border border-sky-200 bg-sky-50/60 p-4 sm:p-5 border-l-4 border-l-sky-600">
                  <p className="text-xs sm:text-sm text-slate-700 m-0">
                    <strong className="text-sky-950 font-bold mr-1.5 uppercase text-[11px] tracking-wider block sm:inline">
                      Why it matters:
                    </strong>
                    {whyItMatters}
                  </p>
                </section>
              )}

              {/* Source link */}
              <div className="mb-2">
                <a
                  href={post.articleUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors py-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Read source article</span>
                </a>
              </div>
            </article>
          </div>
        </div>

        {/* ── Auxiliary Studio Panels (Below Card) ── */}
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
                  color: "#34D399",
                  backgroundColor: "rgba(52, 211, 153, 0.12)",
                  border: "1px solid rgba(52, 211, 153, 0.3)",
                  padding: "4px 12px",
                  borderRadius: 9999,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                NEWS DESK
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

              <div
                style={{
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: 10,
                  padding: "16px 18px",
                  marginBottom: 14,
                }}
              >
                <p
                  style={{
                    color: "#334155",
                    fontSize: 13.5,
                    lineHeight: 1.75,
                    margin: 0,
                    whiteSpace: "pre-line",
                  }}
                >
                  {summary}
                </p>
              </div>

              {whyItMatters && (
                <div
                  style={{
                    backgroundColor: "#F0F9FF",
                    border: "1px solid #BAE6FD",
                    borderLeft: "4px solid #0284C7",
                    borderRadius: 8,
                    padding: "12px 14px",
                    marginBottom: 16,
                  }}
                >
                  <p
                    style={{
                      color: "#0369A1",
                      fontSize: 12,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    <strong style={{ color: "#0C4A6E", fontWeight: 700, textTransform: "uppercase", fontSize: 10, letterSpacing: "0.05em", marginRight: 6 }}>Why it matters:</strong>
                    {whyItMatters}
                  </p>
                </div>
              )}

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
