import { useRef, useState } from "react";
import type { GeneratedPost } from "@workspace/api-client-react";
import {
  ArrowLeft,
  Download,
  Image as ImageIcon,
  Share2,
  Loader2,
  Link2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const WHITE_LOGO = "https://lottie.host/7e9f0f76-045f-4084-9d34-b576660d1848/vgHf4GtXbQ.png";
const BLUE_LOGO  = "https://lottie.host/30ce7548-9cdd-4e66-a656-6f3ffc24ea1f/7Qw5Z1Ef6B.png";

interface PostOutputViewProps {
  post: GeneratedPost;
  onBack: () => void;
}

export default function PostOutputView({ post, onBack }: PostOutputViewProps) {
  const postRef = useRef<HTMLDivElement>(null);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [showWebhook, setShowWebhook] = useState(false);
  const [exporting, setExporting] = useState<"jpeg" | "pdf" | null>(null);
  const [pushing, setPushing] = useState(false);

  const downloadAsJPEG = async () => {
    if (!postRef.current) return;
    setExporting("jpeg");
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(postRef.current, {
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
    if (!postRef.current) return;
    setExporting("pdf");
    try {
      const { default: html2canvas } = await import("html2canvas");
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(postRef.current, {
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
    if (!webhookUrl.trim()) {
      setShowWebhook(true);
      return;
    }
    setPushing(true);
    try {
      await fetch(webhookUrl.trim(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      alert("Post successfully sent to scheduling queue!");
    } catch {
      alert("Error pushing to socials. Check your webhook URL.");
    } finally {
      setPushing(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-background">

      {/* ── Top bar ── */}
      <div className="flex-none border-b border-border bg-card">
        {/* Row 1: back + action buttons */}
        <div className="flex items-center justify-between gap-2 px-4 py-2.5">
          <button
            onClick={onBack}
            data-testid="button-back-to-feed"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Feed</span>
            <span className="sm:hidden">Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={downloadAsJPEG}
              disabled={exporting !== null}
              data-testid="button-download-jpeg"
              className="flex items-center gap-1.5 text-sm bg-card border border-border hover:bg-muted text-foreground px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
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
              className="flex items-center gap-1.5 text-sm bg-card border border-border hover:bg-muted text-foreground px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
            >
              {exporting === "pdf"
                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                : <Download className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">PDF</span>
            </button>

            <button
              onClick={postToSocials}
              disabled={pushing}
              data-testid="button-post-socials"
              className="flex items-center gap-1.5 text-sm bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-md font-medium transition-colors disabled:opacity-50"
            >
              {pushing
                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Post to Socials</span>
              <span className="sm:hidden">Share</span>
            </button>

            {/* Webhook toggle button */}
            <button
              onClick={() => setShowWebhook((v) => !v)}
              data-testid="button-toggle-webhook"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground border border-border rounded-md px-2 py-1.5 transition-colors"
              title="Configure webhook"
            >
              <Link2 className="w-3.5 h-3.5" />
              {showWebhook ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Row 2: Webhook URL (collapsible) */}
        {showWebhook && (
          <div className="px-4 pb-3 flex items-center gap-2 border-t border-border/50 pt-2.5 animate-in slide-in-from-top-1 duration-150">
            <Link2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <input
              type="url"
              placeholder="Paste your Make.com or Zapier webhook URL here..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              data-testid="input-webhook-url"
              className="flex-1 text-xs bg-background border border-border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground/60"
            />
          </div>
        )}
      </div>

      {/* ── Post preview ── */}
      <div className="flex-1 overflow-y-auto bg-slate-700 px-3 py-6 sm:p-8">
        <div ref={postRef} style={{ backgroundColor: "#4682B4", padding: "24px 16px", fontFamily: "'Inter', sans-serif" }}>
          <div style={{
            maxWidth: 680,
            margin: "0 auto",
            background: "linear-gradient(145deg, #1E293B 0%, #0F172A 100%)",
            borderRadius: 16,
            padding: "32px 24px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 48px rgba(0,0,0,0.25)",
          }}>

            {/* Logo */}
            <img
              src={WHITE_LOGO}
              alt="31st File"
              crossOrigin="anonymous"
              style={{ height: 36, marginBottom: 24, objectFit: "contain" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />

            {/* Label row */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "8px 12px",
              color: "#7DD3FC",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              marginBottom: 14,
              textTransform: "uppercase",
            }}>
              <span>Day 3 Update</span>
              <span style={{ color: "#334155" }}>|</span>
              <span style={{ color: "#94A3B8" }}>{post.articleDate}</span>
              <span style={{ color: "#334155" }}>|</span>
              <span style={{ color: "#60A5FA" }}>{post.articleCategory}</span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(22px, 4vw, 32px)",
              fontWeight: 600,
              margin: "0 0 28px 0",
              color: "#FFFFFF",
              lineHeight: 1.3,
            }}>
              {post.title}
            </h1>

            {/* Summary of Facts */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "24px", marginBottom: 16 }}>
              <h3 style={{ margin: "0 0 12px 0", fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Summary of Facts
              </h3>
              <p style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.8, margin: 0, whiteSpace: "pre-line" }}>
                {post.summaryOfFacts}
              </p>
            </div>

            {/* Key Takeaways */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "24px", marginBottom: 16 }}>
              <h3 style={{ margin: "0 0 16px 0", fontSize: 11, fontWeight: 700, color: "#FCD34D", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Key Takeaways
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {post.keyTakeaways.map((point, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{
                      minWidth: 26, height: 26,
                      background: "#1E293B", border: "1px solid #334155", borderRadius: 7,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#FCD34D", fontSize: 11, fontWeight: 700, flexShrink: 0,
                    }}>
                      {i + 1}
                    </span>
                    <p style={{ color: "#CBD5E1", margin: 0, fontSize: 14, lineHeight: 1.7 }}>{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Firm Perspective */}
            <div style={{
              backgroundColor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderLeft: "4px solid #2563EB",
              borderRadius: 10,
              padding: "24px",
              marginBottom: 16,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <img
                  src={BLUE_LOGO}
                  alt="31st File"
                  crossOrigin="anonymous"
                  style={{ height: 22, objectFit: "contain" }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                <h3 style={{ margin: 0, color: "#1E40AF", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Firm Perspective
                </h3>
              </div>
              <p style={{ color: "#334155", fontSize: 14, fontWeight: 500, lineHeight: 1.8, margin: 0, whiteSpace: "pre-line" }}>
                {post.firmPerspective}
              </p>
            </div>

            {/* CTA footer */}
            <div style={{ marginTop: 32, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
              <h4 style={{ color: "#F8FAFC", fontSize: 16, margin: "0 0 6px 0", fontFamily: "Georgia, serif" }}>
                Simplify Your Compliance Journey
              </h4>
              <p style={{ color: "#94A3B8", fontSize: 12, margin: "0 0 20px 0" }}>
                Join leading founders receiving curated regulatory insights.
              </p>
              <div style={{
                display: "inline-block", background: "#FFFFFF", color: "#0F172A",
                padding: "10px 24px", borderRadius: 8, fontWeight: 700, fontSize: 13, marginBottom: 24,
              }}>
                Subscribe to Regulatory Briefs
              </div>
              <div style={{ background: "rgba(15,23,42,0.5)", borderRadius: 10, padding: "16px 20px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 20px" }}>
                  <a href={post.articleUrl} target="_blank" rel="noreferrer" style={{ color: "#7DD3FC", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
                    Source Article
                  </a>
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
