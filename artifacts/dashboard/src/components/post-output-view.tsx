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
} from "lucide-react";

const WHITE_LOGO = "https://lottie.host/7e9f0f76-045f-4084-9d34-b576660d1848/vgHf4GtXbQ.png";
const BLUE_LOGO  = "https://lottie.host/30ce7548-9cdd-4e66-a656-6f3ffc24ea1f/7Qw5Z1Ef6B.png";

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

  const downloadAsJPEG = async () => {
    if (!exportRef.current) return;
    setExporting("jpeg");
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(exportRef.current, {
        scale: 2,
        backgroundColor: "#4682B4",
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = `31stFile_Day3_${post.articleDate.replace(/\s/g, "_")}.jpeg`;
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
        backgroundColor: "#4682B4",
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`31stFile_Day3_${post.articleDate.replace(/\s/g, "_")}.pdf`);
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

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[#0B1120]">

      {/* ── Sticky top bar ── */}
      <div className="flex-none flex items-center justify-between gap-2 px-4 py-3 border-b border-white/8 bg-[#0F172A]/80 backdrop-blur-sm">
        <button
          onClick={onBack}
          data-testid="button-back-to-feed"
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={downloadAsJPEG}
            disabled={exporting !== null}
            data-testid="button-download-jpeg"
            className="flex items-center gap-1.5 text-xs font-medium bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 px-3 py-2 rounded-lg transition-colors disabled:opacity-40"
          >
            {exporting === "jpeg"
              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
              : <ImageIcon className="w-3.5 h-3.5" />}
            <span>JPEG</span>
          </button>

          <button
            onClick={downloadAsPDF}
            disabled={exporting !== null}
            data-testid="button-download-pdf"
            className="flex items-center gap-1.5 text-xs font-medium bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 px-3 py-2 rounded-lg transition-colors disabled:opacity-40"
          >
            {exporting === "pdf"
              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
              : <Download className="w-3.5 h-3.5" />}
            <span>PDF</span>
          </button>
        </div>
      </div>

      {/* ── Reader scroll area ── */}
      <div className="flex-1 overflow-y-auto">
        <article className="max-w-2xl mx-auto px-5 pt-8 pb-16">

          {/* Meta pills */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-[11px] font-bold tracking-widest uppercase text-sky-400 bg-sky-400/10 border border-sky-400/20 px-2.5 py-1 rounded-full">
              Day 3 Update
            </span>
            <span className="text-[11px] font-mono text-slate-500 bg-white/4 border border-white/8 px-2.5 py-1 rounded-full">
              {post.articleDate}
            </span>
            <span className="text-[11px] font-mono text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2.5 py-1 rounded-full">
              {post.articleCategory}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[22px] sm:text-[28px] font-semibold text-white leading-[1.3] tracking-tight mb-6" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            {post.title}
          </h1>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-sky-500/40 via-blue-500/20 to-transparent mb-8" />

          {/* Summary of Facts */}
          <section className="mb-8">
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500 mb-3">
              Summary of Facts
            </p>
            <p className="text-[16px] text-slate-300 leading-[1.8] whitespace-pre-line">
              {post.summaryOfFacts}
            </p>
          </section>

          {/* Key Takeaways */}
          <section className="mb-8">
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-amber-500/80 mb-4">
              Key Takeaways
            </p>
            <div className="space-y-4">
              {post.keyTakeaways.map((point, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[11px] font-bold text-amber-400 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-[15px] text-slate-300 leading-[1.75] m-0">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Firm Perspective */}
          <section className="mb-8">
            <div className="rounded-xl border border-white/8 bg-white/[0.03] overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-3 border-b border-white/6 bg-white/[0.02]">
                <div className="w-1 h-4 rounded-full bg-blue-500 shrink-0" />
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-blue-400 m-0">
                  Firm Perspective
                </p>
              </div>
              <div className="px-5 py-5">
                <p className="text-[15px] text-slate-200 leading-[1.8] whitespace-pre-line m-0 font-medium">
                  {post.firmPerspective}
                </p>
              </div>
            </div>
          </section>

          {/* Source link */}
          <a
            href={post.articleUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors mb-10"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Read original source
          </a>

          {/* Divider */}
          <div className="h-px bg-white/8 mb-8" />

          {/* Post to Socials section */}
          <section>
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500 mb-3 flex items-center gap-1.5">
              <Share2 className="w-3 h-3" />
              Push to Socials
            </p>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 bg-white/4 border border-white/10 rounded-lg px-3 focus-within:ring-1 focus-within:ring-primary/50 transition-shadow">
                <Link2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <input
                  type="url"
                  placeholder="Paste Make.com or Zapier webhook URL…"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  data-testid="input-webhook-url"
                  className="flex-1 bg-transparent border-none text-sm py-3 focus:outline-none text-slate-300 placeholder:text-slate-600"
                />
              </div>
              <button
                onClick={postToSocials}
                disabled={pushing || !webhookUrl.trim()}
                data-testid="button-post-socials"
                className="flex items-center gap-1.5 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                {pushing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : pushed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{pushed ? "Sent!" : "Post"}</span>
              </button>
            </div>
            {pushed && (
              <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Successfully pushed to your scheduling queue
              </p>
            )}
          </section>

          {/* Branding footer */}
          <div className="mt-12 pt-6 border-t border-white/6 flex items-center justify-between">
            <p className="text-xs text-slate-600 font-mono">31stFile.com</p>
            <p className="text-xs text-slate-600">Regulatory Intelligence // IND</p>
          </div>

        </article>
      </div>

      {/* ── Off-screen export card (captured for JPEG / PDF) ── */}
      <div
        style={{
          position: "absolute",
          left: -9999,
          top: 0,
          width: 720,
          pointerEvents: "none",
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        <div ref={exportRef} style={{ backgroundColor: "#4682B4", padding: "28px 20px", fontFamily: "'Inter', sans-serif" }}>
          <div style={{
            maxWidth: 680,
            margin: "0 auto",
            background: "linear-gradient(145deg, #1E293B 0%, #0F172A 100%)",
            borderRadius: 16,
            padding: "36px 28px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 48px rgba(0,0,0,0.25)",
          }}>
            <img src={WHITE_LOGO} alt="31st File" crossOrigin="anonymous"
              style={{ height: 36, marginBottom: 24, objectFit: "contain" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 12px", color: "#7DD3FC", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", marginBottom: 14, textTransform: "uppercase" }}>
              <span>Day 3 Update</span>
              <span style={{ color: "#334155" }}>|</span>
              <span style={{ color: "#94A3B8" }}>{post.articleDate}</span>
              <span style={{ color: "#334155" }}>|</span>
              <span style={{ color: "#60A5FA" }}>{post.articleCategory}</span>
            </div>

            <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 28, fontWeight: 600, margin: "0 0 28px 0", color: "#FFFFFF", lineHeight: 1.3 }}>
              {post.title}
            </h1>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "24px", marginBottom: 16 }}>
              <h3 style={{ margin: "0 0 12px 0", fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.12em" }}>Summary of Facts</h3>
              <p style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.8, margin: 0, whiteSpace: "pre-line" }}>{post.summaryOfFacts}</p>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "24px", marginBottom: 16 }}>
              <h3 style={{ margin: "0 0 16px 0", fontSize: 11, fontWeight: 700, color: "#FCD34D", textTransform: "uppercase", letterSpacing: "0.12em" }}>Key Takeaways</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {post.keyTakeaways.map((point, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ minWidth: 26, height: 26, background: "#1E293B", border: "1px solid #334155", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", color: "#FCD34D", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                    <p style={{ color: "#CBD5E1", margin: 0, fontSize: 14, lineHeight: 1.7 }}>{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderLeft: "4px solid #2563EB", borderRadius: 10, padding: "24px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <img src={BLUE_LOGO} alt="31st File" crossOrigin="anonymous" style={{ height: 22, objectFit: "contain" }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                <h3 style={{ margin: 0, color: "#1E40AF", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Firm Perspective</h3>
              </div>
              <p style={{ color: "#334155", fontSize: 14, fontWeight: 500, lineHeight: 1.8, margin: 0, whiteSpace: "pre-line" }}>{post.firmPerspective}</p>
            </div>

            <div style={{ marginTop: 32, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
              <h4 style={{ color: "#F8FAFC", fontSize: 16, margin: "0 0 6px 0", fontFamily: "Georgia, serif" }}>Simplify Your Compliance Journey</h4>
              <p style={{ color: "#94A3B8", fontSize: 12, margin: "0 0 20px 0" }}>Join leading founders receiving curated regulatory insights.</p>
              <div style={{ display: "inline-block", background: "#FFFFFF", color: "#0F172A", padding: "10px 24px", borderRadius: 8, fontWeight: 700, fontSize: 13, marginBottom: 24 }}>
                Subscribe to Regulatory Briefs
              </div>
              <div style={{ background: "rgba(15,23,42,0.5)", borderRadius: 10, padding: "16px 20px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 20px" }}>
                  <span style={{ color: "#7DD3FC", fontSize: 12, fontWeight: 600 }}>Source Article</span>
                  <span style={{ color: "#334155" }}>•</span>
                  <span style={{ color: "#7DD3FC", fontSize: 12, fontWeight: 500 }}>31stFile.com</span>
                  <span style={{ color: "#334155" }}>•</span>
                  <span style={{ color: "#7DD3FC", fontSize: 12, fontWeight: 500 }}>LinkedIn</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
