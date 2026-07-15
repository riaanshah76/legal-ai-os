# Project Memory: fe-legal-ai-os (Legal AI OS)

## 1. Identity

- **Folder**: `fe-legal-ai-os` (package.json `name` is still the generic template name `tanstack_start_ts` — never renamed)
- **Product name**: **Legal AI OS** — "The AI Operating System for Legal" / "Legal Edition"
- **Parent brand**: **Industry AI OS** — a suite of vertical AI products. Sibling verticals live as neighboring folders in this workspace: `fe-construction-ai-os`, `fe-industory-ai-os`, `wired-fe-accounting-ai-os`. Commit `3c49d2b "Aligned UI with Accounting OS"` shows design work is deliberately kept consistent across verticals.
- **Product pitch**: Automate contract review, legal research, compliance monitoring and document intelligence — AI does the repetitive work, lawyers stay in control via mandatory human approval steps.
- **Built with Lovable**: confirmed via `.lovable/project.json` (template `tanstack_start_ts_current`), `AGENTS.md` Lovable-sync warning block, `@lovable.dev/vite-tanstack-config` dependency, and Lovable SSR error-reporting utilities in `src/lib/`.
- **Git remote**: `https://github.com/riaanshah76/legal-ai-os.git` — a personal/client account, not a Solulab org repo. Branch `main`, 24 commits total as of 2026-07-15.
- **No root README.md** — only `AGENTS.md` (Lovable sync warning) and `src/routes/README.md` (internal file-based-routing convention notes).

## 2. Tech Stack

- **Framework**: TanStack Start (`@tanstack/react-start` ^1.168.26) + TanStack Router (file-based routing, `src/routeTree.gen.ts` auto-generated — never hand-edit)
- **React 19.2.0**, TypeScript ^5.8.3 (strict mode)
- **UI**: shadcn/ui ("new-york" style, slate base) on Radix UI primitives + Tailwind CSS v4 (CSS-native `@theme` tokens in `src/styles.css`, OKLCH colors, red/black/grey/white brand palette) + `tw-animate-css`, `lucide-react` icons, `recharts` for charts, `framer-motion` for animation
- **Data/forms libs present but unused**: `@tanstack/react-query` (QueryClient wired in `router.tsx`/`__root.tsx` but zero `useQuery`/`useMutation` calls anywhere), `react-hook-form` + `zod` (no schemas actually defined, no forms wired to it — all forms are plain uncontrolled inputs)
- **Build**: Vite 8 via TanStack Start's plugin, Nitro server output targeting **Cloudflare** (per `.gitignore` wrangler entries and vite config comments)
- **Package manager**: Bun primarily (`bun.lock`, `bunfig.toml`), though a stray `package-lock.json` also exists (dual lockfiles — worth cleaning up eventually)
- **Lint/format**: ESLint 9 flat config + Prettier 3.7.3 (100 col width, double quotes, semicolons, trailing commas everywhere)
- **No test framework** of any kind is set up.

## 3. Folder Structure

```
fe-legal-ai-os/
├── AGENTS.md, .lovable/project.json, components.json, vite.config.ts, tsconfig.json
├── bun.lock, bunfig.toml, package-lock.json, eslint.config.js, .prettierrc
├── public/            # BACKGROUND_DARK/LIGHT.png, LOGO_DARK/LIGHT, favicon
└── src/
    ├── server.ts, start.ts, router.tsx, routeTree.gen.ts, styles.css
    ├── components/
    │   ├── app/        # AppLayout.tsx, Sidebar.tsx, TopBar.tsx
    │   ├── brand/       # Brand.tsx, logos.tsx (16 integration SVGs)
    │   ├── theme/       # ThemeProvider.tsx (light/dark, localStorage)
    │   └── ui/          # ~45 shadcn/ui primitives
    ├── hooks/           # use-mobile.tsx
    ├── lib/
    │   ├── legal-data.ts   # centralized mock dataset — the entire "backend"
    │   ├── utils.ts         # cn() helper
    │   └── error-capture.ts / error-page.ts / lovable-error-reporting.ts
    └── routes/           # file-based pages
        ├── __root.tsx, index.tsx, login.tsx, about.tsx, book-demo.tsx
        ├── dashboard.tsx, documents.tsx, workflows.tsx, approvals.tsx,
        │   assistant.tsx, knowledge.tsx, connectors.tsx, analytics.tsx, settings.tsx
        └── copilots/     # contract-review, legal-research, compliance, due-diligence,
                           # nda-review, policy-review, risk-assessment
```

No `services/`, `api/`, or `types/` directories exist — this is a pure front-end prototype.

## 4. Feature Areas

**Public/marketing**: landing page (`/`), `/login` (mock, no real auth), `/about`, `/book-demo` (client-only form).

**Authenticated app shell** (Sidebar + TopBar via `AppLayout`):

1. **Dashboard** — KPIs, contract throughput/mix charts, recent contracts, approval queue, AI activity feed, compliance score, risk alerts
2. **AI Assistant** — chat UI with canned/suggested prompts (no real LLM call)
3. **Document Intelligence** — upload UI, OCR/confidence display, extracted clauses, AI suggestions
4. **Workflows** — durable workflow tracker (Trigger → Extract → Match → Validate → Approve → Output), connector tags
5. **Approvals** — human approval queue (Approve/Comment/Reject) + audit timeline
6. **Knowledge Base** — Playbooks, Clause Library, Templates, Case Memos, Regulatory Guides, Precedent Deals
7. **Connectors** — integration grid (M365, Google Drive, SharePoint, Dropbox, Slack, Salesforce, DocuSign, Adobe, Notion, Jira, Teams, Outlook)
8. **Analytics** — 6 charts (contracts reviewed, risk trend, compliance trend, AI accuracy, review time, approval latency)
9. **Settings** — Profile tab is real; Organization/Theme/Notifications/API Keys/Security/Billing are placeholders

**Copilot pages** (routes exist under `/copilots/*` but hidden from sidebar via `SHOW_COPILOTS = false` in `Sidebar.tsx`; still linked from landing page):

- Contract Review, Legal Research, Compliance, Due Diligence ("Project Meridian" deal room), NDA Review, Policy Review, Risk Assessment

## 5. Data Model (all mock, in `src/lib/legal-data.ts`)

No formal TS interfaces/Zod schemas — plain inferred-type object literals:

- `contracts`: id, name, company, type, value, status (pending/approved/rejected), risk (low/medium/high), confidence, date, clauses
- `clauses`: name, status (ok/warn/missing), note
- `cases`: cite, court, tag, snippet
- `approvals`: id, subject, requester, type, urgency, waiting
- `activities`: time, text, tag
- `monthlySeries` / `contractMix`: chart series data
- `workflows`: id, name, copilot, status, waitingFor, decision, lastUpdated, connectors[], flow[]
- `regulations`: code, region, score, findings
- Page-local extras (not centralized): NDA `queue`, `policies`, risk `portfolio`/`radar`, compliance `violations`/`heatmap`, due-diligence red-flags/workstreams

## 6. API / Auth / Backend Reality Check

- **No backend integration at all**: no fetch/axios calls, no `.env`, no API client, no `services/`/`api/` dir. Everything is hardcoded mock data or `setTimeout`-based fake async.
- **No real authentication**: `/login` prefills a demo user (`sarah@lawfirm.com`), submit just does `setTimeout` → navigate to `/dashboard`. No token storage, no auth context, **no protected routes** — any authenticated page is reachable directly by URL.
- TopBar hardcodes logged-in user "Sarah Miller — General Counsel"; logout just navigates back to `/login`.
- Marketing copy mentions SSO/SAML as a security feature — this is aspirational copy only, not implemented.

**Bottom line**: this is a click-through UI prototype/demo, not a functioning full-stack app. Any real backend/auth work here is a from-scratch build, not a wire-up.

## 7. Recent Direction (git log, newest first, as of 2026-07-15)

1. `9d17549` FIX: light-dark-mode & logo changes
2. `683ed0b` Updated theme to red/black/grey
3. `b39a9aa` Changes
4. `3c49d2b` Aligned UI with Accounting OS
5. `6327585`–`67a5d2c` — six generic "Changes" commits
6. `497a905` FIX: copilot-section-with-workflow
7. `579c06f` FIX: prettier issue
8. `73966b5` FIX: login-and-option-changes
9. `c9a3850` Built full Legal AI OS app (foundational commit)
10. earlier: scaffolding commits (`91f8f7b`, `7ccc398`, `f9fb59f`, `32f54c7`, `b191436`)

Recent work is pure visual/theme polish (red/black/grey palette, light/dark mode, logos, aligning to the Accounting OS sibling's design system) — not new features or backend wiring.

## 8. Working Notes / Gotchas

- Don't rename/rewrite git history on `main` here — Lovable's editor mirrors this branch and expects forward-only commits (per `AGENTS.md`).
- `bunfig.toml` has a 24h supply-chain release-age guard on new package versions, with an explicit allowlist for `@lovable.dev/*` — get user confirmation before adding more exclusions.
- `routeTree.gen.ts` is auto-generated by the TanStack router plugin; never hand-edit it.
- Dual lockfiles (`bun.lock` + `package-lock.json`) exist — Bun is the intended package manager; the npm lockfile is likely stray.
- `react-query`, `react-hook-form`, and `zod` are installed but unused — don't assume data-fetching or form-validation patterns exist yet; they'd need to be built.
