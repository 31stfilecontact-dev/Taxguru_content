import { useRef, useState } from "react";
import type { GeneratedPost } from "@workspace/api-client-react";
import {
  ArrowLeft,
  Download,
  Image as ImageIcon,
  Share2,
  Loader2,
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
      alert("Please enter your Make.com or Zapier webhook URL first.");
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
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Top control bar */}
      <div className="flex-none border-b border-border bg-card px-6 py-3 flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          data-testid="button-back-to-feed"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Feed
        </button>

        <div className="flex items-center gap-3">
          {/* Webhook URL input */}
          <input
            type="url"
            placeholder="Make.com / Zapier webhook URL"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            data-testid="input-webhook-url"
            className="hidden sm:block text-xs bg-background border border-border rounded-md px-3 py-1.5 w-72 focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
          />

          <button
            onClick={downloadAsJPEG}
            disabled={exporting !== null}
            data-testid="button-download-jpeg"
            className="flex items-center gap-2 text-sm bg-card border border-border hover:bg-muted text-foreground px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
          >
            {exporting === "jpeg" ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
            JPEG
          </button>

          <button
            onClick={downloadAsPDF}
            disabled={exporting !== null}
            data-testid="button-download-pdf"
            className="flex items-center gap-2 text-sm bg-card border border-border hover:bg-muted text-foreground px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
          >
            {exporting === "pdf" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            PDF
          </button>

          <button
            onClick={postToSocials}
            disabled={pushing}
            data-testid="button-post-socials"
            className="flex items-center gap-2 text-sm bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-1.5 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            {pushing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
            Post to Socials
          </button>
        </div>
      </div>

      {/* Scrollable preview area */}
      <div className="flex-1 overflow-y-auto bg-slate-700 p-8">
        {/* The printable card */}
        <div ref={postRef} style={{ backgroundColor: "#4682B4", padding: "40px 24px", fontFamily: "'Inter', sans-serif" }}>
          <div style={{
            maxWidth: 680,
            margin: "0 auto",
            background: "linear-gradient(145deg, #1E293B 0%, #0F172A 100%)",
            borderRadius: 20,
            padding: "48px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 48px rgba(0,0,0,0.25)",
          }}>

            {/* Logo */}
            <img
              src={WHITE_LOGO}
              alt="31st File"
              crossOrigin="anonymous"
              style={{ height: 44, marginBottom: 32, objectFit: "contain" }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />

            {/* Label row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#7DD3FC",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.15em",
              marginBottom: 16,
              textTransform: "uppercase",
            }}>
              Day 3 Update
              <span style={{ color: "#334155" }}>|</span>
              <span style={{ color: "#94A3B8", letterSpacing: "0.05em" }}>{post.articleDate}</span>
              <span style={{ color: "#334155" }}>|</span>
              <span style={{ color: "#60A5FA", letterSpacing: "0.05em" }}>{post.articleCategory}</span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 34,
              fontWeight: 600,
              margin: "0 0 36px 0",
              color: "#FFFFFF",
              lineHeight: 1.25,
            }}>
              {post.title}
            </h1>

            {/* Summary of Facts */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              padding: "32px",
              marginBottom: 20,
            }}>
              <h3 style={{ margin: "0 0 14px 0", fontSize: 13, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Summary of Facts
              </h3>
              <p style={{ color: "#CBD5E1", fontSize: 15, lineHeight: 1.8, margin: 0, whiteSpace: "pre-line" }}>
                {post.summaryOfFacts}
              </p>
            </div>

            {/* Key Takeaways */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              padding: "32px",
              marginBottom: 20,
            }}>
              <h3 style={{ margin: "0 0 20px 0", fontSize: 13, fontWeight: 700, color: "#FCD34D", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Key Takeaways
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {post.keyTakeaways.map((point, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span style={{
                      minWidth: 28,
                      height: 28,
                      background: "#1E293B",
                      border: "1px solid #334155",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FCD34D",
                      fontSize: 12,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}>
                      {i + 1}
                    </span>
                    <p style={{ color: "#CBD5E1", margin: 0, fontSize: 15, lineHeight: 1.7 }}>{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Firm Perspective */}
            <div style={{
              backgroundColor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderLeft: "5px solid #2563EB",
              borderRadius: 12,
              padding: "32px",
              marginBottom: 20,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <img
                  src={BLUE_LOGO}
                  alt="31st File"
                  crossOrigin="anonymous"
                  style={{ height: 24, objectFit: "contain" }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <h3 style={{ margin: 0, color: "#1E40AF", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Firm Perspective
                </h3>
              </div>
              <p style={{ color: "#334155", fontSize: 15, fontWeight: 500, lineHeight: 1.8, margin: 0, whiteSpace: "pre-line" }}>
                {post.firmPerspective}
              </p>
            </div>

            {/* CTA / Footer */}
            <div style={{
              marginTop: 40,
              paddingTop: 36,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              textAlign: "center",
            }}>
              <h4 style={{ color: "#F8FAFC", fontSize: 18, margin: "0 0 8px 0", fontFamily: "Georgia, serif" }}>
                Simplify Your Compliance Journey
              </h4>
              <p style={{ color: "#94A3B8", fontSize: 13, margin: "0 0 24px 0" }}>
                Join leading founders receiving curated regulatory insights directly to their inbox.
              </p>

              <div style={{
                display: "inline-block",
                background: "#FFFFFF",
                color: "#0F172A",
                padding: "12px 28px",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 28,
              }}>
                Subscribe to Regulatory Briefs
              </div>

              <div style={{
                background: "rgba(15,23,42,0.5)",
                borderRadius: 12,
                padding: "20px 24px",
              }}>
                <p style={{ color: "#CBD5E1", fontSize: 13, margin: "0 0 12px 0" }}>
                  Continue the conversation and explore our advisory services:
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
                  <a href={post.articleUrl} target="_blank" rel="noreferrer" style={{ color: "#7DD3FC", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                    Source Article
                  </a>
                  <span style={{ color: "#334155" }}>•</span>
                  <span style={{ color: "#7DD3FC", fontSize: 13, fontWeight: 500 }}>31stFile.com</span>
                  <span style={{ color: "#334155" }}>•</span>
                  <span style={{ color: "#7DD3FC", fontSize: 13, fontWeight: 500 }}>LinkedIn</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
