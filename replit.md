# 31stFile Intelligence Dashboard

An enterprise-grade automated content curation pipeline that ingests live tax and regulatory updates from TaxGuru RSS feeds and displays them in a React dashboard, allowing users to queue articles for AI summarization.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/dashboard run dev` — run the React frontend
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- RSS parsing: `rss-parser` (Node.js, runs in Express)
- Frontend: React + Vite + TanStack Query + Tailwind CSS + shadcn/ui

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API contracts)
- `lib/api-client-react/src/generated/` — generated React Query hooks (do not edit)
- `lib/api-zod/src/generated/` — generated Zod schemas (do not edit)
- `artifacts/api-server/src/routes/articles.ts` — RSS feed fetching + articles endpoints
- `artifacts/dashboard/src/` — React frontend

## Architecture decisions

- Python Flask replaced with Node.js/Express so all code lives in the same pnpm monorepo
- `rss-parser` fetches all 5 TaxGuru RSS feeds in parallel (`Promise.allSettled`) with graceful per-feed error handling
- Staging queue is client-side React state only — no persistence required for this phase
- OpenAPI-first contract: spec gates codegen which gates the typed React Query hooks

## Product

- **Date-filtered article feed**: pick a date, click "Gather Data" to pull live articles from TaxGuru across 5 categories (News, Notification, Income Tax, GST, Company Law)
- **Category summary chips**: at-a-glance breakdown of article counts per category
- **Staging queue**: mark any article for writing queue, then process all staged summaries together
- **Direct article access**: every card links directly to the original TaxGuru article

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- RSS feeds from TaxGuru are live internet requests — response times vary (2–10s is normal for all 5 feeds)
- If TaxGuru blocks requests, the backend returns 500; the frontend shows an error state
- After any OpenAPI spec change, always run codegen before using updated types

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
