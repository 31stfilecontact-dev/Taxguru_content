# 31stFile Intelligence Hub & LinkedIn Studio

A financial services intelligence platform that automatically aggregates, categorizes, and formats real-time regulatory and financial updates across India. Designed to educate readers, empower Chartered Accountants and finance professionals, and generate publication-ready LinkedIn updates with one click.

---

## 🌟 Key Features

### 1. Multi-Source Ingestion Across 4 Target Categories
- 💼 **Financial & Business News**: LiveMint, Economic Times Banking/Finance, TaxGuru News.
- ⚖️ **Case Laws Updates**: ITAT, High Court, Supreme Court, and NCLT rulings, tribunal judgments, and penalty deletions.
- 🏛️ **Government News & Updates**: CBDT, CBIC, MCA, SEBI Master Circulars, and RBI/FEMA regulations.
- 📋 **CA Compliances & Professional Updates**: GST procedural updates, Income Tax audit guidelines, Corporate Law filings, and ICAI announcements.

### 2. Universal Multi-Provider Post Studio
- **Universal LLM Selector**: Use **Google Gemini** (15 req/min free), **Groq** (Llama 3.3 ultra-fast free tier), **OpenAI** (GPT-4o/mini), **DeepSeek** (V3/R1), **Anthropic Claude**, **OpenRouter**, or local **Ollama** (100% free & offline).
- **Zero-Setup Fallback Mode**: Generates structured, publication-ready LinkedIn posts immediately without requiring any API key or subscription.
- **Password-Protected Settings**: Admin passcode (`admin31` or custom `ADMIN_PASSWORD`) protects LLM key configuration.
- **Custom Branding**: 31st File header logo and subtle centered background watermark on all post formats and export graphics.
- **1-Click Copy**: Formatted specifically for LinkedIn readability with clean spacing, Unicode bullets, advisory actionables, and hashtag clusters (`#31stFile #CharteredAccountant #TaxUpdate`).
- **Visual Export**: Download generated updates as high-resolution JPEG graphics or PDF summary briefs.

### 3. Mobile-First Responsive Design
- Touch-friendly 44px hit targets and active haptic feedback.
- Bottom sheet slide-up drawer for post queue management on mobile screens.
- Sticky bottom 1-tap LinkedIn copy bar.

---

## ☁️ 100% Free Hosting Deployment (Vercel)

The repository includes a ready-to-deploy `vercel.json` configuration that unites the React frontend and Serverless API into a single, zero-maintenance free deployment.

### Quick Deploy to Vercel (Recommended):

1. **GitHub Repository**:
   Your repository is already pushed and up to date on branch `Taxguru`:
   `https://github.com/31stfilecontact-dev/Taxguru_content`

2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com) (sign up with GitHub if you haven't already).
   - Click **"Add New..."** → **"Project"**.
   - Select **`31stfilecontact-dev/Taxguru_content`**.

3. **Verify Project Settings**:
   Vercel reads `vercel.json` automatically:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `artifacts/dashboard/dist/public`

4. **Environment Variables (Optional)**:
   - `ADMIN_PASSWORD`: Your admin passcode for the LLM settings modal (default: `admin31`).
   - `GEMINI_API_KEY`: *(Optional)* Pre-configure a Gemini API key.
   - *(Note: All LLM keys can also be configured dynamically from the live web UI using the password-protected settings modal!)*

5. **Deploy**:
   - Click **Deploy**.
   - In ~60 seconds, your app will be live at `https://your-project.vercel.app` with free SSL and global CDN.
   - Any future commits pushed to GitHub will automatically trigger a zero-downtime re-deployment.

---

## 🚀 Local Run

### Prerequisites
- Node.js >= 20
- pnpm >= 9 (`npm install -g pnpm`)

### 1. Start Development
```bash
# Terminal 1: API Server (port 8080)
pnpm --filter @workspace/api-server run dev

# Terminal 2: React Dashboard (port 5173)
pnpm --filter @workspace/dashboard run dev
```
Open [http://localhost:5173](http://localhost:5173).

---

## 🧪 Verification Commands

| Command | Purpose |
|---|---|
| `pnpm run test:feeds` | Verifies live RSS feeds across all 4 categories and tests post generation |
| `pnpm run typecheck` | Full TypeScript type check across all monorepo packages |
| `pnpm run build` | Full production build of frontend and backend bundles |
