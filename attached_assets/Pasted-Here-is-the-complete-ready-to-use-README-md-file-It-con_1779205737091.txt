Here is the complete, ready-to-use README.md file. It contains the fully updated App.jsx code with the strict AI constraints (no "client" wording, concise takeaways) and the tightened visual layout for a shorter, scannable image.
You can copy everything inside the block below and paste it directly into Replit to update your dashboard. Once this is running and you are happy with the generated posts, let me know and we will execute the Tier 1 hosting plan on Vercel and Render!
```markdown
# 31st File Intelligence Dashboard

An enterprise-grade automated content curation pipeline for 31st File. This dashboard ingests live tax and regulatory updates from TaxGuru RSS feeds, utilizes Gemini AI to format them into our signature "Day 3" editorial style, and allows for direct export to PDF, JPEG, and social media platforms.

## 🚀 Recent Updates
* **Strict Output Formatting:** AI is constrained to generate ultra-short, punchy takeaways (max 12 words) and speak directly to founders (strictly banning the word "client").
* **Compact Visual Layout:** Reduced CSS padding and margins to ensure the exported JPEG is shorter and highly optimized for mobile social media scrolling.
* **Manual Firm Insight Override:** Inject specific, custom advisory messages directly into the AI prompt before generation.

---

## 🛠️ Step 1: Verify Export Dependencies
Ensure you have the required export libraries installed. If you haven't yet, open your **Frontend Shell** in Replit and run:

```bash
cd frontend
npm install html2canvas jspdf

```
## 💻 Step 2: Update App.jsx
Navigate to frontend/src/App.jsx, delete the existing code, and paste the following complete application code:
```javascript
import { useState, useCallback, useRef } from "react";
import { Calendar, RefreshCw, BookmarkPlus, ExternalLink, ArrowRight, ArrowLeft, Share2, Download, Image as ImageIcon } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// --- BRAND ASSETS ---
const BLUE_LOGO  = "[https://lottie.host/30ce7548-9cdd-4e66-a656-6f3ffc24ea1f/7Qw5Z1Ef6B.png](https://lottie.host/30ce7548-9cdd-4e66-a656-6f3ffc24ea1f/7Qw5Z1Ef6B.png)";
const WHITE_LOGO = "[https://lottie.host/7e9f0f76-045f-4084-9d34-b576660d1848/vgHf4GtXbQ.png](https://lottie.host/7e9f0f76-045f-4084-9d34-b576660d1848/vgHf4GtXbQ.png)";

// --- API UTILITIES ---
async function callGemini(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const url = \`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=\${apiKey}\`;
  
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { 
      parts: [{ text: "You are a senior analyst at 31st File. Return ONLY valid JSON format. Exclude all markdown formatting." }] 
    }
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  
  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}

function parseJSON(text) {
  const rx = /\\{[\\s\\S]*\\}/;
  const match = text.match(rx);
  if (match) { try { return JSON.parse(match[0]); } catch {} }
  return null;
}

// --- MAIN DASHBOARD COMPONENT ---
export default function App() {
  const [view, setView] = useState("feed");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summaryQueue, setSummaryQueue] = useState([]); 
  const [manualInsight, setManualInsight] = useState("");
  const [generatedArticle, setGeneratedArticle] = useState(null);
  
  const postRef = useRef(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(\`http://0.0.0.0:5000/api/articles?date=\${date}\`);
      const data = await res.json();
      setArticles(data);
    } catch (e) {
      alert("Backend error: " + e.message);
    } finally {
      setLoading(false);
    }
  }, [date]);

  const markForSummary = (article) => {
    if (!summaryQueue.find(a => a.id === article.id)) {
      setSummaryQueue([...summaryQueue, article]);
    }
  };

  const removeFromQueue = (id) => {
    setSummaryQueue(summaryQueue.filter(a => a.id !== id));
  };

  const processQueue = async () => {
    if (summaryQueue.length === 0) return;
    const targetArticle = summaryQueue[0];
    setView("processing");
    
    const insightInstruction = manualInsight.trim() !== "" 
      ? \`Use this EXACT text for the firmPerspective section, do not alter it: "\${manualInsight}"\`
      : "Write 2 paragraphs of 31st File's expert perspective focusing on how this impacts corporate taxation, statutory audits, or financial reporting.";

    try {
      const prompt = \`
        Analyze this regulatory update:
        Title: \${targetArticle.title}
        Excerpt: \${targetArticle.excerpt}

        Return ONLY a JSON object:
        {
          "title": "A punchy, professional title (max 8 words)",
          "summaryOfFacts": "One single, concise paragraph (max 3 sentences) explaining the absolute core facts.",
          "keyTakeaways": [
            "One short, punchy sentence (under 12 words) for takeaway 1", 
            "One short, punchy sentence (under 12 words) for takeaway 2", 
            "One short, punchy sentence (under 12 words) for takeaway 3"
          ],
          "firmPerspective": "\${insightInstruction}"
        }
        
        CRITICAL GUARDRAILS:
        1. TONE: Speak DIRECTLY to Indian business owners and founders (e.g., "You must ensure..."). Do NOT speak as if you are advising other accountants.
        2. FORBIDDEN WORD: You MUST NOT use the word "client" or "clients" anywhere in the text. Use "your business," "taxpayers," "founders," or "companies".
        3. BREVITY: LinkedIn readers skim. Keep everything extremely concise. Cut the fluff.
      \`;

      const responseText = await callGemini(prompt);
      const parsedData = parseJSON(responseText);
      
      if (parsedData) {
        setGeneratedArticle(parsedData);
        setView("output");
      } else {
        alert("AI returned invalid format. Try again.");
        setView("feed");
      }
    } catch (e) {
      alert("Processing Failed: " + e.message);
      setView("feed");
    }
  };

  // --- EXPORT & PUBLISH FUNCTIONS ---
  const downloadAsJPEG = async () => {
    if (!postRef.current) return;
    const canvas = await html2canvas(postRef.current, { scale: 2, backgroundColor: "#4682B4" });
    const link = document.createElement("a");
    link.download = \`31stFile_Update_\${date}.jpeg\`;
    link.href = canvas.toDataURL("image/jpeg", 0.9);
    link.click();
  };

  const downloadAsPDF = async () => {
    if (!postRef.current) return;
    const canvas = await html2canvas(postRef.current, { scale: 2, backgroundColor: "#4682B4" });
    const imgData = canvas.toDataURL("image/jpeg", 0.9);
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(\`31stFile_Update_\${date}.pdf\`);
  };

  const postDirectToSocials = async () => {
    const webhookUrl = "[https://hook.us1.make.com/YOUR_WEBHOOK_ID](https://hook.us1.make.com/YOUR_WEBHOOK_ID)"; 
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(generatedArticle)
      });
      alert("Post successfully sent to scheduling queue!");
    } catch (error) {
      alert("Error pushing to socials. Check webhook configuration.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0F172A", color: "#F8FAFC", fontFamily: "'Inter', sans-serif", padding: "40px 20px" }}>
      
      {/* HEADER */}
      <div style={{ maxWidth: 1200, margin: "0 auto", marginBottom: "32px", display: "flex", justifyContent: "space-between" }}>
        <img src={WHITE_LOGO} alt="31st File" style={{ height: "40px" }} />
        {view !== "feed" && (
          <button onClick={() => setView("feed")} style={{ background: "#1E293B", border: "1px solid #334155", color: "#F8FAFC", padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}>
            <ArrowLeft size={16} style={{ display: "inline", marginRight: "8px", verticalAlign: "middle" }} /> Back to Feed
          </button>
        )}
      </div>

      {/* VIEW 1: FEED & STAGING */}
      {view === "feed" && (
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "32px" }}>
          
          <div>
            <div style={{ background: "#1E293B", padding: "20px", borderRadius: "12px", display: "flex", gap: "16px", marginBottom: "24px" }}>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ padding: "10px", borderRadius: "8px", border: "none", flex: 1, outline: "none", color: "#0F172A" }} />
              <button onClick={fetchArticles} style={{ background: "#2563EB", color: "#fff", border: "none", padding: "0 24px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>Gather Data</button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {articles.map(article => (
                <div key={article.id} style={{ background: "#1E293B", padding: "24px", borderRadius: "12px", border: "1px solid #334155" }}>
                  <h3 style={{ margin: "0 0 12px 0", color: "#F8FAFC", fontSize: "18px", lineHeight: "1.4" }}>{article.title}</h3>
                  <p style={{ color: "#94A3B8", fontSize: "14px", lineHeight: "1.6" }}>{article.excerpt}</p>
                  <button onClick={() => markForSummary(article)} style={{ marginTop: "12px", background: "#0F172A", color: "#38BDF8", border: "1px solid #334155", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>Stage for Writing</button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#1E293B", padding: "24px", borderRadius: "12px", height: "fit-content", position: "sticky", top: "40px" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>Staging Queue ({summaryQueue.length})</h2>
            {summaryQueue.map(item => (
              <div key={item.id} style={{ background: "#0F172A", padding: "12px", borderRadius: "8px", marginBottom: "12px", border: "1px solid #334155" }}>
                 <p style={{ margin: "0 0 8px 0", fontSize: "14px", lineHeight: "1.4" }}>{item.title}</p>
                 <button onClick={() => removeFromQueue(item.id)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: 0, fontWeight: "600", fontSize: "13px" }}>✕ Remove</button>
              </div>
            ))}
            
            <div style={{ marginTop: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#38BDF8", fontWeight: "bold" }}>Add Custom Firm Insight (Optional)</label>
              <textarea 
                placeholder="Override AI perspective. Type your specific advisory message here..."
                value={manualInsight}
                onChange={(e) => setManualInsight(e.target.value)}
                style={{ width: "100%", height: "100px", padding: "12px", borderRadius: "8px", background: "#0F172A", border: "1px solid #334155", color: "#F8FAFC", resize: "none", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            <button onClick={processQueue} disabled={summaryQueue.length === 0} style={{ marginTop: "16px", width: "100%", background: "#10B981", color: "#fff", border: "none", padding: "14px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
              Generate Post <ArrowRight size={16} style={{ display: "inline", marginLeft: "8px", verticalAlign: "middle" }} />
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: LOADING */}
      {view === "processing" && (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <RefreshCw size={48} color="#2563EB" style={{ animation: "spin 2s linear infinite", marginBottom: "24px" }} />
          <h2 style={{ fontSize: "24px" }}>Analyzing the regulation...</h2>
        </div>
      )}

      {/* VIEW 3: OUTPUT & EXPORT */}
      {view === "output" && generatedArticle && (
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", background: "#1E293B", padding: "16px", borderRadius: "12px", border: "1px solid #334155" }}>
             <div style={{ display: "flex", gap: "12px" }}>
               <button onClick={downloadAsJPEG} style={{ background: "#0F172A", border: "1px solid #334155", color: "#F8FAFC", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontWeight: "600" }}><ImageIcon size={16}/> JPEG</button>
               <button onClick={downloadAsPDF} style={{ background: "#0F172A", border: "1px solid #334155", color: "#F8FAFC", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontWeight: "600" }}><Download size={16}/> PDF</button>
             </div>
             <button onClick={postDirectToSocials} style={{ background: "#2563EB", border: "none", color: "#fff", padding: "8px 24px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold" }}>
                <Share2 size={16} /> Direct to Socials
             </button>
          </div>

          <div ref={postRef} style={{ background: "#4682B4", padding: "40px 20px", fontFamily: "'Inter', sans-serif" }}>
             <div style={{ maxWidth: 680, margin: "0 auto", background: "linear-gradient(145deg, #1E293B 0%, #0F172A 100%)", borderRadius: "20px", padding: "48px", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 48px rgba(0,0,0,0.25)" }}>
                
                <img src={WHITE_LOGO} alt="31st File Logo" style={{ height: "48px", marginBottom: "32px", objectFit: "contain" }} />
                
                <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#7DD3FC", fontSize: "13px", fontWeight: "600", letterSpacing: "0.15em", marginBottom: "16px", textTransform: "uppercase" }}>
                    DAY 3 UPDATE <span style={{ color: "#334155" }}>|</span> <span style={{ color: "#94A3B8", letterSpacing: "0.05em" }}>{date}</span>
                </div>
                
                <h1 style={{ fontFamily: "Georgia, serif", fontSize: "36px", fontWeight: "600", margin: "0 0 32px 0", color: "#FFFFFF", lineHeight: "1.25" }}>
                    {generatedArticle.title}
                </h1>

                {/* COMPACT SUMMARY BOX */}
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px", marginBottom: "16px" }}>
                    <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", color: "#E2E8F0" }}>Summary of Facts</h3>
                    <p style={{ color: "#CBD5E1", fontSize: "16px", lineHeight: "1.8", margin: 0 }}>{generatedArticle.summaryOfFacts}</p>
                </div>

                {/* COMPACT KEY TAKEAWAYS BOX */}
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px", marginBottom: "16px" }}>
                    <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", color: "#FCD34D" }}>Key Takeaways</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {generatedArticle.keyTakeaways.map((point, i) => (
                            <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                                <span style={{ minWidth: "28px", height: "28px", background: "#1E293B", border: "1px solid #334155", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#FCD34D", fontSize: "13px", fontWeight: "bold" }}>{i + 1}</span>
                                <p style={{ color: "#CBD5E1", margin: 0, fontSize: "16px", lineHeight: "1.6" }}>{point}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* COMPACT PERSPECTIVE ACCENT BOX */}
                <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderLeft: "5px solid #2563EB", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                        <img src={BLUE_LOGO} alt="31st File" style={{ height: "24px" }} />
                        <h3 style={{ margin: 0, color: "#1E40AF", fontSize: "16px" }}>Firm Perspective</h3>
                    </div>
                    <p style={{ color: "#334155", fontSize: "16px", fontWeight: "500", lineHeight: "1.8", margin: 0 }}>{generatedArticle.firmPerspective}</p>
                </div>

                {/* INTERACTIVE FOOTER */}
                <div style={{ marginTop: "32px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
                    <h4 style={{ color: "#F8FAFC", fontSize: "18px", margin: "0 0 8px 0", fontFamily: "Georgia, serif" }}>Simplify Your Compliance Journey</h4>
                    <p style={{ color: "#94A3B8", fontSize: "14px", margin: "0 0 24px 0" }}>Join leading founders receiving curated insights directly to their inbox.</p>
                    
                    <div style={{ display: "inline-block", background: "#FFFFFF", color: "#0F172A", padding: "14px 32px", borderRadius: "10px", fontWeight: "600", fontSize: "15px", marginBottom: "32px" }}>
                        Subscribe to Regulatory Briefs
                    </div>

                    <div style={{ background: "rgba(15,23,42,0.5)", borderRadius: "12px", padding: "24px" }}>
                        <p style={{ color: "#CBD5E1", fontSize: "14px", margin: "0 0 16px 0" }}>Continue the conversation and explore our advisory services:</p>
                        <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
                            <span style={{ color: "#7DD3FC", fontSize: "14px", fontWeight: "500" }}>Official Website</span>
                            <span style={{ color: "#334155" }}>•</span>
                            <span style={{ color: "#7DD3FC", fontSize: "14px", fontWeight: "500" }}>LinkedIn Network</span>
                        </div>
                    </div>
                </div>

             </div>
          </div>

        </div>
      )}
    </div>
  );
}

```
```

```
