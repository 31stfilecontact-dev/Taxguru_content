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
const WATERMARK_LOGO = "/logo-watermark.png";

interface PostOutputViewProps {
  post: GeneratedPost;
  onBack: () => void;
}

export default function PostOutputView({ post, onBack }: PostOutputViewProps) {
  const exportRef = useRef<HTMLDivElement>(null);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [exporting, setExporting] = useState<"jpeg" | "pdf" | null>(null);
  const [pushing, setPushing] = useState(false);
  const [pushed, setPushed] = useState(false);
  const [copied, setCopied] = useState(false);

  const getLinkedInFormattedText = () => {
    if (post.linkedInPost) return post.linkedInPost;
    const categoryTag = (post.articleCategory || "TaxCompliance").replace(/[^a-zA-Z0-9]/g, "");
    const tags = post.hashtags && post.hashtags.length > 0
      ? post.hashtags.join(" ")
      : `#31stFile #${categoryTag} #CharteredAccountant #TaxUpdate #ComplianceAlert #Finance`;

    return `🚨 Regulatory Update: ${post.title}

📌 Summary of Facts:
${post.summaryOfFacts}

🔍 Key Takeaways:
${post.keyTakeaways.map((t) => `• ${t}`).join("\n")}

💡 31st File Advisory Perspective:
${post.firmPerspective}

🔗 Direct Reference: ${post.articleUrl}

${tags}`;
  };

  const copyForLinkedIn = async () => {
    const text = getLinkedInFormattedText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
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
        backgroundColor: "#0B1120",
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = `31stFile_Update_${post.articleDate.replace(/\s/g, "_")}.jpeg`;
      link.href = canvas.toDataURL("image/jpeg", 0.92);
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
        backgroundColor: "#0B1120",
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.92);
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

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[#0B1120] relative">

      {/* ── Sticky top bar (Mobile optimized) ── */}
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
          {/* Quick Copy for LinkedIn */}
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
            {exporting === "jpeg"
              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
              : <ImageIcon className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">JPEG</span>
          </button>

          <button
            onClick={downloadAsPDF}
            disabled={exporting !== null}
            data-testid="button-download-pdf"
            title="Download as PDF brief"
            className="flex items-center gap-1 text-xs font-medium bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors disabled:opacity-40 min-h-[36px] touch-manipulation"
          >
            {exporting === "pdf"
              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
              : <Download className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">PDF</span>
          </button>
        </div>
      </div>

      {/* ── Reader scroll area ── */}
      <div className="flex-1 overflow-y-auto pb-24 sm:pb-16 relative">
        {/* Centered subtle background watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.06] select-none z-0"
        >
          <img
            src={WATERMARK_LOGO}
            alt=""
            className="w-72 sm:w-96 max-w-[80vw] object-contain filter drop-shadow"
          />
        </div>

        <article className="max-w-2xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7 relative z-10">

          {/* Header Brand Logo */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/6">
            <img
              src={HEADER_LOGO}
              alt="31st File"
              className="h-8 sm:h-10 object-contain filter drop-shadow-sm"
            />
            <span className="text-[10px] sm:text-[11px] font-mono text-sky-400/80 bg-sky-400/10 border border-sky-400/20 px-2.5 py-0.5 rounded-full">
              Editorial Studio
            </span>
          </div>

          {/* Meta pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-sky-400 bg-sky-400/10 border border-sky-400/20 px-2.5 py-0.5 rounded-full">
              31stFile Intelligence
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
              {post.articleDate}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2.5 py-0.5 rounded-full">
              {post.articleCategory}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-xl sm:text-2xl md:text-[28px] font-semibold text-white leading-snug tracking-tight mb-5" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            {post.title}
          </h1>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-sky-500/40 via-blue-500/20 to-transparent mb-6" />

          {/* Summary of Facts */}
          <section className="mb-6">
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400 mb-2">
              Summary of Facts
            </p>
            <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed whitespace-pre-line">
              {post.summaryOfFacts}
            </p>
          </section>

          {/* Key Takeaways */}
          <section className="mb-6">
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-amber-500/80 mb-3">
              Key Takeaways for Finance Leaders
            </p>
            <div className="space-y-3">
              {post.keyTakeaways.map((point, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="shrink-0 w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[11px] font-bold text-amber-400 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed m-0">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Firm Perspective */}
          <section className="mb-6">
            <div className="rounded-xl border border-white/8 bg-white/[0.03] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/6 bg-white/[0.02]">
                <div className="w-1 h-3.5 rounded-full bg-blue-500 shrink-0" />
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-blue-400 m-0">
                  31st File Advisory Perspective
                </p>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line m-0 font-medium">
                  {post.firmPerspective}
                </p>
              </div>
            </div>
          </section>

          {/* Source link */}
          <div className="mb-6">
            <a
              href={post.articleUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-sky-400 hover:text-sky-300 active:text-sky-200 transition-colors py-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Read original regulatory notice</span>
            </a>
          </div>

          {/* ── LinkedIn Studio Box ── */}
          <section className="mb-8 bg-slate-900/90 border border-sky-500/30 rounded-xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-sky-500/20 text-sky-300 text-[11px] px-2 py-0.5 rounded font-mono font-bold">
                  LinkedIn Studio
                </span>
                <span className="text-[11px] text-slate-400">
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
                  <span key={idx} className="text-[10px] sm:text-[11px] font-mono text-sky-400/80 bg-sky-400/10 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Post to Socials section */}
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
                  placeholder="Paste Make or Zapier webhook URL…"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  data-testid="input-webhook-url"
                  className="flex-1 bg-transparent border-none text-xs sm:text-sm py-2.5 sm:py-3 focus:outline-none text-slate-300 placeholder:text-slate-600 min-h-[42px]"
                />
              </div>
              <button
                onClick={postToSocials}
                disabled={pushing || !webhookUrl.trim()}
                data-testid="button-post-socials"
                className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold bg-primary hover:bg-primary/90 active:scale-95 text-primary-foreground px-4 py-2.5 sm:py-3 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 min-h-[42px] touch-manipulation"
              >
                {pushing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : pushed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Share2 className="w-4 h-4" />
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
          <div className="pt-6 border-t border-white/6 flex items-center justify-between">
            <p className="text-xs text-slate-500 font-mono">31stFile.com</p>
            <p className="text-xs text-slate-500">Financial Hub // IND</p>
          </div>

        </article>
      </div>

      {/* ── Mobile Sticky Bottom Action Bar ── */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-3 bg-[#0F172A]/95 border-t border-white/10 backdrop-blur-md z-20">
        <button
          onClick={copyForLinkedIn}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 active:scale-[0.98] text-white py-3 rounded-xl text-sm font-semibold shadow-lg transition-all touch-manipulation"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Copied Formatted Post!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy for LinkedIn</span>
            </>
          )}
        </button>
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
        <div ref={exportRef} style={{ backgroundColor: "#0B1120", padding: "16px 12px", fontFamily: "'Inter', sans-serif" }}>
          <div style={{
            position: "relative",
            maxWidth: 656,
            margin: "0 auto",
            background: "linear-gradient(145deg, #1E293B 0%, #0F172A 100%)",
            borderRadius: 14,
            padding: "24px 20px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 16px 32px rgba(0,0,0,0.25)",
            overflow: "hidden",
          }}>
            {/* Watermark Logo background */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0.065,
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
              />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <img src={HEADER_LOGO} alt="31st File"
                style={{ height: 38, marginBottom: 14, objectFit: "contain", display: "block" }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />

              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 10px", color: "#7DD3FC", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", marginBottom: 10, textTransform: "uppercase" }}>
                <span>31stFile Update</span>
                <span style={{ color: "#334155" }}>|</span>
                <span style={{ color: "#94A3B8" }}>{post.articleDate}</span>
                <span style={{ color: "#334155" }}>|</span>
                <span style={{ color: "#60A5FA" }}>{post.articleCategory}</span>
              </div>

              <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 22, fontWeight: 600, margin: "0 0 16px 0", color: "#FFFFFF", lineHeight: 1.3 }}>
                {post.title}
              </h1>

              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
                <h3 style={{ margin: "0 0 8px 0", fontSize: 10, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.12em" }}>Summary of Facts</h3>
                <p style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>{post.summaryOfFacts}</p>
              </div>

              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 10, fontWeight: 700, color: "#FCD34D", textTransform: "uppercase", letterSpacing: "0.12em" }}>Key Takeaways</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {post.keyTakeaways.map((point, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ minWidth: 22, height: 22, background: "#1E293B", border: "1px solid #334155", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#FCD34D", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                      <p style={{ color: "#CBD5E1", margin: 0, fontSize: 13, lineHeight: 1.6 }}>{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderLeft: "4px solid #2563EB", borderRadius: 9, padding: "14px 16px", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <img src={HEADER_LOGO} alt="31st File" style={{ height: 18, objectFit: "contain" }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                  <h3 style={{ margin: 0, color: "#1E40AF", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Firm Perspective</h3>
                </div>
                <p style={{ color: "#334155", fontSize: 13, fontWeight: 500, lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>{post.firmPerspective}</p>
              </div>

            <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
              <h4 style={{ color: "#F8FAFC", fontSize: 13, margin: "0 0 4px 0", fontFamily: "Georgia, serif" }}>Simplify Your Compliance Journey</h4>
              <p style={{ color: "#94A3B8", fontSize: 11, margin: "0 0 12px 0" }}>Join leading founders receiving curated regulatory insights.</p>
              <div style={{ display: "inline-block", background: "#FFFFFF", color: "#0F172A", padding: "7px 18px", borderRadius: 7, fontWeight: 700, fontSize: 11, marginBottom: 12 }}>
                Subscribe to Regulatory Briefs
              </div>
              <div style={{ background: "rgba(15,23,42,0.5)", borderRadius: 8, padding: "10px 14px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "4px 16px" }}>
                  <span style={{ color: "#7DD3FC", fontSize: 11, fontWeight: 600 }}>Source Article</span>
                  <span style={{ color: "#334155" }}>•</span>
                  <span style={{ color: "#7DD3FC", fontSize: 11, fontWeight: 500 }}>31stFile.com</span>
                  <span style={{ color: "#334155" }}>•</span>
                  <span style={{ color: "#7DD3FC", fontSize: 11, fontWeight: 500 }}>LinkedIn</span>
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
