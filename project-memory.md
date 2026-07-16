# Project Memory: fe-legal-ai-os (Legal AI OS)

## 1. Identity

- **Folder**: `fe-legal-ai-os` (package.json `name` is still the generic template name `tanstack_start_ts` — never renamed)
- **Product name**: **Legal AI OS** — "The AI Operating System for Legal" / "Legal Edition"
- **Parent brand**: **Industry AI OS** — a suite of vertical AI products. Sibling verticals live as neighboring folders in this workspace: `fe-construction-ai-os`, `fe-industory-ai-os`, `wired-fe-accounting-ai-os`, plus `backend-industory-ai-os`. There is **one shared backend across verticals** — confirmed by the user directly ("this whole project we've the one backend and multiple frontend"). `fe-legal-ai-os` itself is not wired to it yet (see §6), but `wired-fe-accounting-ai-os` is, and its UI is being used as the primary design reference to bring legal's frontend up to par.
- **Product pitch**: Automate contract review, legal research, compliance monitoring and document intelligence — AI does the repetitive work, lawyers stay in control via mandatory human approval steps.
- **Built with Lovable**: confirmed via `.lovable/project.json` (template `tanstack_start_ts_current`), `AGENTS.md` Lovable-sync warning block, `@lovable.dev/vite-tanstack-config` dependency, and Lovable SSR error-reporting utilities in `src/lib/`.
- **Git remote**: `https://github.com/riaanshah76/legal-ai-os.git` — a personal/client account, not a Solulab org repo. Branch `main`.
- **No root README.md** — only `AGENTS.md` (Lovable sync warning) and `src/routes/README.md` (internal file-based-routing convention notes).

## 2. Tech Stack

- **Framework**: TanStack Start (`@tanstack/react-start` ^1.168.26) + TanStack Router (file-based routing, `src/routeTree.gen.ts` auto-generated — never hand-edit)
- **React 19.2.0**, TypeScript ^5.8.3 (strict mode)
- **UI**: shadcn/ui ("new-york" style, slate base) on Radix UI primitives + Tailwind CSS v4 (CSS-native `@theme` tokens in `src/styles.css`, OKLCH colors, red/black/grey/white brand palette) + `tw-animate-css`, `lucide-react` icons, `recharts` for charts, `framer-motion` for animation
- **Data/forms libs present but mostly unused**: `@tanstack/react-query` (QueryClient wired in `router.tsx`/`__root.tsx` but zero `useQuery`/`useMutation` calls anywhere), `react-hook-form` + `zod` (no schemas defined; forms are still plain controlled/uncontrolled inputs, including the rebuilt login form)
- **Build**: Vite 8 via TanStack Start's plugin, Nitro server output targeting **Cloudflare** (per `.gitignore` wrangler entries and vite config comments)
- **Package manager**: Bun primarily (`bun.lock`, `bunfig.toml`), though a stray `package-lock.json` also exists (dual lockfiles — worth cleaning up eventually)
- **Lint/format**: ESLint 9 flat config + Prettier 3.7.3 (100 col width, double quotes, semicolons, trailing commas everywhere, LF line endings). The whole repo had CRLF line endings at one point causing ~8,500 lint errors — fixed repo-wide with `prettier --write .`; keep it that way (don't let an editor reintroduce CRLF).
- **No test framework** of any kind is set up.

## 3. Folder Structure

```
fe-legal-ai-os/
├── AGENTS.md, .lovable/project.json, components.json, vite.config.ts, tsconfig.json
├── bun.lock, bunfig.toml, package-lock.json, eslint.config.js, .prettierrc
├── project-memory.md   # this file
├── public/            # BACKGROUND_DARK/LIGHT.png (hero photo), LOGO_DARK/LIGHT, favicon
└── src/
    ├── server.ts, start.ts, router.tsx, routeTree.gen.ts, styles.css
    ├── components/
    │   ├── app/        # AppLayout.tsx, Sidebar.tsx, TopBar.tsx
    │   ├── brand/       # Brand.tsx (BrandMark/BrandLockup), logos.tsx (16 integration SVGs)
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

## 4. Feature Areas (current state — several pages were substantially rebuilt this session)

**Public/marketing:**

- **Landing page (`/`)** — heavily reworked. Hero keeps the two-column layout (copy + floating "Contract Review" dashboard card) but now uses `BACKGROUND_LIGHT.png`/`BACKGROUND_DARK.png` as a full-bleed photographic backdrop with a carefully tuned overlay (see §8 — text legibility required real care here). Section order: Hero → Why Us → How It Works (static flow) → **Example Workflows** (new — accordion list pulling real entries from `legal-data.ts`'s `workflows`, reusing the exact stage/status color scheme from `workflows.tsx`) → **About Preview** (new — on-page "Built by lawyers" section + stats card, distinct from the standalone `/about` route) → Integrations (logos now in white rounded-square badges, 6-col grid) → **Copilot Library** (rebuilt — clicking a card now opens a `CopilotModal` with trigger/actions/value-props and an animated line-by-line "Live run" trace, plus category filter chips; previously these were plain `<Link>` cards) → **Platform Capabilities** (new — 6-block "every copilot runs on the same core" grid) → CTA (simplified, full-bleed, no boxed card) → Footer (wider first column via `BrandLockup`, uppercase column headers, mono tagline in the bottom bar).
- **`/login`** — rebuilt from a full split-screen layout into a **centered modal-card** with a Log in / Sign up tab switcher, over a dimmed/blurred backdrop (the old brand-pane testimonial content, now atmospheric rather than a form column). Client-side validation (email format, password length) mirrors a real auth flow, but submission is still mocked: `setTimeout` → navigate to `/dashboard`. No real auth exists.
- **`/about`** — unchanged this session: mission/vision + 4 pillars (AI Engine, Connector Layer, Human Approval Layer, Security & Trust).
- **`/book-demo`** — unchanged this session: client-only scheduling form.

**Authenticated app shell** (Sidebar + TopBar via `AppLayout`):

1. **Dashboard** — unchanged this session: KPIs, contract throughput/mix charts, recent contracts, approval queue, AI activity feed, compliance score, risk alerts.
2. **AI Assistant** — unchanged: chat UI with canned/suggested prompts (no real LLM call).
3. **Document Intelligence** — rebuilt into a full 3-pane workspace matching the accounting reference's structure: document browser (search + type filters) → viewer with Extracted Fields, an **Analysis Matrix** card (clause mapping / regulatory control mapping / citation verification / workstream progress, depending on doc type — the legal analog to the reference's "GL Coding" table), AI Summary, Extracted Risks, Action Items, Related Documents → an "Ask AI About This Document" panel. **The Ask AI panel now defaults to closed** (was open by default; fixed per user request). 5 document types across 6 real documents (contract, NDA, compliance filing, court filing, due-diligence memo).
4. **Workflows** — unchanged this session: durable workflow tracker (Trigger → Extract → Match → Validate → Approve → Output), connector tags, inline accordion expand.
5. **Approvals** — unchanged: human approval queue (Approve/Comment/Reject) + audit timeline.
6. **Knowledge Base** — rebuilt from static "collection" cards into a searchable **article library**: 5 categories (Contract Playbooks, Clause Library, Compliance & Regulatory, Litigation & Case Law, Corporate & M&A), 8 full articles with sections/bullets, and a full article-reader view with a related-articles rail.
7. **Connectors** — unchanged: integration grid (M365, Google Drive, SharePoint, Dropbox, Slack, Salesforce, DocuSign, Adobe, Notion, Jira, Teams, Outlook).
8. **Analytics** — rebuilt from a 6-chart `recharts` grid into a "Platform activity" layout: 6 KPI tiles, an 8-week dual-bar activity trend (plain divs, no chart library), workflow breakdown progress bars, an approvals split-bar with rate, and a recent-activity audit log.
9. **Settings** — rebuilt from a tabbed placeholder UI into a single-page "Workspace settings": identity card (Sarah Miller / General Counsel) + Profile / Tenant / LLM Providers / API Keys sections. Tenant/Providers/API-Keys intentionally show the same honest "not available yet" empty states as the wired accounting app, since that reflects a real shared-backend gap, not a fabricated one.

**Copilot pages** (routes exist under `/copilots/*` but hidden from sidebar via `SHOW_COPILOTS = false` in `Sidebar.tsx`; still linked from the landing page and its new Copilot Library modals):

- Contract Review, Legal Research, Compliance, Due Diligence ("Project Meridian" deal room), NDA Review, Policy Review, Risk Assessment.

## 5. Data Model (all mock, in `src/lib/legal-data.ts`)

No formal TS interfaces/Zod schemas — plain inferred-type object literals:

- `contracts`: id, name, company, type, value, status (pending/approved/rejected), risk (low/medium/high), confidence, date, clauses
- `clauses`: name, status (ok/warn/missing), note
- `cases`: cite, court, tag, snippet
- `approvals`: id, subject, requester, type, urgency, waiting
- `activities`: time, text, tag
- `monthlySeries` / `contractMix`: chart series data
- `workflows`: id, name, copilot, status, waitingFor, decision, lastUpdated, connectors[], flow[] — **now also consumed directly by the landing page's "Example Workflows" section**, not just the in-app `/workflows` page
- `regulations`: code, region, score, findings

Additional module-local mock data now lives in `documents.tsx` (6 rich document records), `knowledge.tsx` (8 articles), `analytics.tsx` (KPIs/trend/recent-activity), and `index.tsx` (9 copilot records with trigger/actions/value/trace for the modal).

## 6. API / Auth / Backend Reality Check

- **No backend integration at all**: no fetch/axios calls, no `.env`, no API client, no `services/`/`api/` dir. Everything is hardcoded mock data or `setTimeout`-based fake async.
- **No real authentication**: `/login` (now a modal-card) still just does client validation → `setTimeout` → navigate to `/dashboard`. No token storage, no auth context, **no protected routes** — any authenticated page is reachable directly by URL.
- TopBar hardcodes logged-in user "Sarah Miller — General Counsel"; logout/sign-out navigates back to `/login`.
- The Settings page's Tenant/LLM Providers/API Keys "not available yet" states are a deliberate, honest choice — they mirror gaps that are real in the *shared* backend (per `wired-fe-accounting-ai-os`), not placeholder laziness.

**Bottom line**: this is a click-through UI prototype/demo, not a functioning full-stack app. Any real backend/auth work here is a from-scratch wire-up to the shared backend, not a bug fix.

## 7. Design reference: `wired-fe-accounting-ai-os`

Most of this session's work was "take the UI from the accounting vertical, adapt content/data to legal, keep legal's own red/black/grey theme tokens" — repeated across Documents, Knowledge, Analytics, Settings, and most of the landing page. Established pattern to follow for any future page alignment:

1. Read the equivalent page/section in `wired-fe-accounting-ai-os/src/routes/*.tsx` (its landing page is one giant `index.tsx`; app pages are `app.<name>.tsx`).
2. Port **structure and interaction**, not literal content — accounting's copy/data is finance-specific and must be rewritten for legal, ideally reusing entities already established in `legal-data.ts` (Acme Corp, Northwind LLP, Tailspin Toys, Project Meridian, Sarah Miller, etc.) for continuity across pages.
3. Translate design tokens, don't import them: the accounting repo uses `surface`/`surface-2`/`brand-gradient`/hardcoded hex accents and a teal brand color; none of those exist here. Map them to legal's actual tokens: `bg-card`/`bg-muted` for surfaces, `bg-primary`/`shadow-glow` for the brand gradient, `text-success`/`text-warning`/`text-destructive`/`text-chart-2` for accent variety — never introduce a new hardcoded color.
4. The accounting reference sometimes fetches real data over the network (e.g. `IntegrationLogo` hits the Clearbit CDN) or calls a real backend (`useSession`/`useTenant`/`api.*`, seen in its Settings and Auth modal). Legal has neither — replicate the *visual* result using local assets/mock state, never add a live network dependency.

## 8. Working Notes / Gotchas

- Don't rename/rewrite git history on `main` here — Lovable's editor mirrors this branch and expects forward-only commits (per `AGENTS.md`).
- `bunfig.toml` has a 24h supply-chain release-age guard on new package versions, with an explicit allowlist for `@lovable.dev/*` — get user confirmation before adding more exclusions.
- `routeTree.gen.ts` is auto-generated by the TanStack router plugin; never hand-edit it.
- Dual lockfiles (`bun.lock` + `package-lock.json`) exist — Bun is the intended package manager; the npm lockfile is likely stray.
- `react-query`, `react-hook-form`, and `zod` are installed but unused — don't assume data-fetching or form-validation patterns exist yet; they'd need to be built.
- **`text-gradient` utility (`styles.css`) is theme-aware via a `--gradient-text` CSS var** — dark mode is white→gray, light mode is dark→gray (added because the original hardcoded white gradient was unreadable in light mode). `text-gradient-primary` (red) never had this problem since red is dark enough in both themes. If adding new heading styles, check both themes before shipping.
- **Hero background overlay (`index.tsx`) took several iterations to get right** — lessons learned: (1) a black-tinted wash needs a much lower opacity than a white one to look equally "muted" (black absorbs, white just brightens) — tune light/dark independently with `dark:` variants, don't share one opacity value; (2) the source photos have bold baked-in graphics positioned left-of-center, exactly where hero text sits — a uniform or top-to-bottom overlay lets that content visually collide with the text; a left-to-right gradient (opaque behind the text column, fading out toward the decorative right side) is the fix; (3) don't try to "reveal" the photo — keep it as muted ambient texture, the real floating dashboard card is the actual visual focal point.
- **Stage/status color conventions**: `workflows.tsx` defines the canonical `STAGES` (trigger/extract/match/validate/approve/output → color dot) and `STATUS` (running/awaiting/completed/failed → badge classes) mappings. The landing page's "Example Workflows" section duplicates these constants intentionally (kept local rather than extracted to a shared file, to minimize footprint) — keep them in sync if either changes.
- **Integration logos need a light background** to read correctly — `logos.tsx`'s SVGs assume a dark card background; several use a `fill="#fff"` shape as their whole mark (works fine on dark, invisible on light/white). `GitHubLogo` was fixed with a dark background rect; check any *new* logo added to that file the same way before using it inside a white badge.
- **Killing dev servers**: never run a blanket `taskkill /F /IM node.exe` — it kills every Node process on the machine, including the user's own long-running dev server on port 8080. Always resolve the specific PID for the port you started (`netstat -ano | grep :<port>`) before killing it.

## 9. Recent Direction (historical git log, as of 2026-07-15 — predates this session's UI work)

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

None of this session's changes (§4, §7, §8) are reflected in the git log above — check `git log`/`git status` directly for what's actually committed vs. still working-tree changes before assuming this file matches repo history.
