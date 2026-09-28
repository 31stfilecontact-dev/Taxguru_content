# 31stFile Intelligence Hub & LinkedIn Studio

A financial services intelligence platform that automatically aggregates, categorizes, and formats real-time regulatory and financial updates across India. Designed to educate readers, empower Chartered Accountants and finance professionals, and generate publication-ready LinkedIn updates with one click.

---

## 🌟 Key Features

### 1. Multi-Source Ingestion Across 4 Target Categories
- 💼 **Financial & Business News**: LiveMint, Economic Times Banking/Finance, TaxGuru News.
- ⚖️ **Case Laws Updates**: ITAT, High Court, Supreme Court, and NCLT rulings, tribunal judgments, and penalty deletions.
- 🏛️ **Government News & Updates**: CBDT, CBIC, MCA, SEBI Master Circulars, and RBI/FEMA regulations.
- 📋 **CA Compliances & Professional Updates**: GST procedural updates, Income Tax audit guidelines, Corporate Law filings, and ICAI announcements.

### 2. Dual-Mode LinkedIn Post Studio
- **Zero-Setup Mode**: Generates structured, publication-ready LinkedIn posts immediately without requiring any API key or subscription.
- **AI-Enhanced Mode**: Connect your free Google AI Studio `GEMINI_API_KEY` for rich contextual synthesis and custom editorial perspectives.
- **1-Click Copy**: Formatted specifically for LinkedIn readability with clean spacing, Unicode bullets, advisory actionables, and hashtag clusters (`#31stFile #CharteredAccountant #TaxUpdate`).
- **Visual Export**: Download generated updates as high-resolution JPEG graphics or PDF summary briefs.

### 3. Real-Time Search & Interactive Dashboard
- Keyword search filter across article titles, excerpts, and source tags.
- Date-filtered feed (India Standard Time).
- Staging queue allowing batch review of important circulars and rulings.

---

## 🚀 Quick Start (Local Run)

### Prerequisites
- Node.js >= 20
- pnpm >= 9 (`npm install -g pnpm`)

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run Verification Test
Verify all live feeds and LinkedIn generator logic:
```bash
pnpm run test:feeds
```

### 3. Start Development Servers
In terminal 1 (API Server on port 8080):
```bash
pnpm --filter @workspace/api-server run dev
```

In terminal 2 (React Dashboard):
```bash
pnpm --filter @workspace/dashboard run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ☁️ 100% Free Hosting Deployment (Vercel)

The repository includes a ready-to-deploy `vercel.json` configuration that unites the React frontend and Serverless API into a single, zero-maintenance free deployment.

### Deploy Steps:
1. Push your code to your GitHub repository:
   ```bash
   git push origin Taxguru
   ```
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository (`Taxguru_content`).
4. Vercel automatically detects the configuration:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `artifacts/dashboard/dist/public`
5. *(Optional)* Add Environment Variables in Vercel Project Settings:
   - `GEMINI_API_KEY`: Your free Gemini API key from [Google AI Studio](https://aistudio.google.com). *(Optional — app works with built-in rule-based studio if not provided)*.
   - `DATABASE_URL`: Your connection string from [Neon](https://neon.tech) or [Supabase](https://supabase.com) free Postgres tier. *(Optional — article aggregation and post generation do not require a database)*.
6. Click **Deploy**. Your app is live at `https://your-project.vercel.app` completely free!

---

## 🛠️ Project Architecture

```
31stfile-content/
├── api/
│   └── index.ts                 # Vercel Serverless Function entry point
├── artifacts/
│   ├── api-server/              # Express 5 API server with RSS aggregation engine
│   │   └── src/routes/
│   │       ├── articles.ts      # Multi-source ingestion & 4-category classification
│   │       └── gemini/          # Dual-Mode LinkedIn editorial post generator
│   └── dashboard/               # React + Vite + Tailwind CSS + shadcn/ui frontend
│       └── src/
│           ├── components/      # ArticleCard, CategoryFilter, PostOutputView, QueueSidebar
│           └── pages/dashboard  # Main intelligence feed & keyword search
├── lib/
│   ├── api-spec/                # OpenAPI specification & Orval codegen
│   ├── api-client-react/        # Auto-generated React Query hooks
│   ├── api-zod/                 # Auto-generated Zod validation schemas
│   ├── db/                      # Drizzle ORM schemas (Postgres / Neon / Supabase)
│   └── integrations-gemini-ai/  # Google Gemini AI SDK client
├── scripts/
│   └── src/test-feeds-e2e.ts    # End-to-end programmatic verification suite
├── vercel.json                  # Vercel deployment & serverless routing config
└── package.json                 # Monorepo workspaces & build scripts
```

---

## 🧪 Verification Commands

| Command | Purpose |
|---|---|
| `pnpm run test:feeds` | Verifies live RSS feeds across all 4 categories and tests post generation |
| `pnpm run typecheck` | Full TypeScript type check across all monorepo packages |
| `pnpm run build` | Full production build of frontend and backend bundles |
