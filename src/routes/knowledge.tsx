import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app/AppLayout";
import {
  ArrowLeft,
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  Clock,
  FileText,
  Gavel,
  Lock,
  Scale,
  ScrollText,
  Search,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/knowledge")({
  head: () => ({ meta: [{ title: "Knowledge Base · Legal AI OS" }] }),
  component: Knowledge,
});

/* ─────────────────────────  Knowledge base (legal)  ───────────────────────── */

type Category =
  | "Contract Playbooks"
  | "Clause Library"
  | "Compliance & Regulatory"
  | "Litigation & Case Law"
  | "Corporate & M&A";

const CATEGORIES: Category[] = [
  "Contract Playbooks",
  "Clause Library",
  "Compliance & Regulatory",
  "Litigation & Case Law",
  "Corporate & M&A",
];

type Section = { heading: string; body: string; bullets?: string[] };

type Article = {
  id: string;
  title: string;
  category: Category;
  icon: LucideIcon;
  excerpt: string;
  readMin: number;
  updated: string;
  tags: string[];
  sections: Section[];
};

const ARTICLES: Article[] = [
  {
    id: "msa-playbook",
    title: "MSA Playbook: reviewing a master services agreement",
    category: "Contract Playbooks",
    icon: ClipboardCheck,
    excerpt:
      "How Contract Review Copilot benchmarks an incoming MSA against the standard playbook before it reaches counsel — and what happens when a clause deviates.",
    readMin: 4,
    updated: "Jul 08, 2026",
    tags: ["MSA", "playbook", "clause review"],
    sections: [
      {
        heading: "What the playbook checks",
        body: "Every incoming MSA is compared clause-by-clause against the firm's standard playbook: confidentiality, termination, payment terms, liability, indemnification, and governing law.",
      },
      {
        heading: "When a clause deviates",
        body: "Deviations are grouped by severity with a plain-language explanation and the pre-approved fallback position.",
        bullets: [
          "Liability cap below 2× annual fees — propose the standard fallback",
          "Missing arbitration clause — insert standard AAA arbitration language",
          "Non-standard governing law — flag for jurisdictional review",
        ],
      },
      {
        heading: "Routing to counsel",
        body: "If a deviation falls outside the pre-approved fallback range, the contract is routed to the assigned attorney with the specific clause and recommended position highlighted.",
      },
    ],
  },
  {
    id: "nda-triage",
    title: "NDA Auto-Triage: how NDAs get fast-tracked",
    category: "Contract Playbooks",
    icon: Lock,
    excerpt:
      "The checks Copilot runs on an incoming NDA before it's routed for auto-approval or escalated to counsel.",
    readMin: 3,
    updated: "Jun 22, 2026",
    tags: ["NDA", "triage", "automation"],
    sections: [
      {
        heading: "Standard terms checked",
        body: "Copilot extracts the disclosing and receiving parties, confidentiality period, mutuality, governing law, and return-of-materials terms, then compares each to the standard mutual NDA template.",
      },
      {
        heading: "Confidence thresholds for auto-approval",
        body: "An NDA is eligible for auto-approval when every extracted field matches the standard template within tolerance and overall extraction confidence exceeds 95%.",
        bullets: [
          "Confidentiality period within 3–5 years of the standard term",
          "No non-compete or exclusivity language detected",
          "Governing law matches an approved jurisdiction",
        ],
      },
      {
        heading: "Escalation triggers",
        body: "Any non-mutual obligation, non-standard remedy language, or a confidentiality period beyond 5 years routes the NDA to counsel instead of auto-approval.",
      },
    ],
  },
  {
    id: "liability-cap",
    title: "Limitation of liability: standard language & fallback positions",
    category: "Clause Library",
    icon: ScrollText,
    excerpt:
      "The firm's standard liability cap language, common counterparty pushback, and the fallback positions counsel is pre-authorized to accept.",
    readMin: 5,
    updated: "Jul 01, 2026",
    tags: ["liability", "clause library", "fallback"],
    sections: [
      {
        heading: "Standard position",
        body: "The firm's opening position caps aggregate liability at 2× fees paid in the preceding 12 months, with carve-outs for confidentiality breaches, indemnification obligations, and gross negligence.",
      },
      {
        heading: "Common pushback & fallback ladder",
        body: "Counterparties most often push back on the cap multiple or the carve-out scope. Counsel is pre-authorized to move down this ladder without further escalation.",
        bullets: [
          "2× fees (standard) → 1.5× fees → 1× fees (floor)",
          "Mutual cap if the counterparty requests reciprocity",
          "Uncapped only for confidentiality and IP infringement carve-outs",
        ],
      },
      {
        heading: "When to escalate",
        body: "Any request to cap below 1× fees, or to remove the confidentiality/IP carve-outs entirely, must be escalated to the General Counsel.",
      },
    ],
  },
  {
    id: "governing-law-arbitration",
    title: "Governing law & arbitration: when to require it",
    category: "Clause Library",
    icon: Gavel,
    excerpt:
      "How Copilot flags missing arbitration language and which governing-law jurisdictions require special handling.",
    readMin: 4,
    updated: "Jul 02, 2026",
    tags: ["arbitration", "governing law", "SOP"],
    sections: [
      {
        heading: "Default position",
        body: "The standard playbook specifies Delaware governing law with disputes resolved by binding arbitration under AAA Commercial Rules, seated in Wilmington.",
      },
      {
        heading: "Jurisdictions needing special review",
        body: "Contracts naming an EU member state or the UK as governing law trigger an automatic cross-check against GDPR data-transfer obligations before the clause is approved.",
        bullets: [
          "EU / UK governing law — check for a parallel GDPR transfer mechanism",
          "Counterparty's home jurisdiction as governing law — requires local counsel sign-off",
          "No arbitration clause present — insert standard language before routing for signature",
        ],
      },
      {
        heading: "Sign-off",
        body: "Once the governing law and dispute-resolution clauses match an approved configuration, the contract clears this check automatically; anything else routes to counsel.",
      },
    ],
  },
  {
    id: "gdpr-dpa",
    title: "GDPR sub-processor requirements for DPAs",
    category: "Compliance & Regulatory",
    icon: ShieldCheck,
    excerpt:
      "What Article 28 requires before a Data Processing Addendum can be countersigned, and how Copilot checks for it.",
    readMin: 5,
    updated: "Jul 07, 2026",
    tags: ["GDPR", "DPA", "compliance"],
    sections: [
      {
        heading: "What creates the obligation",
        body: "Under GDPR Article 28, any processor engaging a sub-processor must disclose that sub-processor to the controller and flow down equivalent data-protection obligations.",
      },
      {
        heading: "What Copilot checks",
        body: "Compliance Copilot verifies that every required exhibit is attached to the executed DPA before it clears for countersignature.",
        bullets: [
          "Current sub-processor list attached as an exhibit",
          "Standard Contractual Clauses attached, not merely referenced",
          "Breach notification window of 72 hours or less",
        ],
      },
      {
        heading: "Review before countersignature",
        body: "A DPA missing any of the required exhibits is flagged high-risk and routed to the Data Protection Officer before the addendum is countersigned.",
      },
    ],
  },
  {
    id: "soc2-criteria",
    title: "SOC 2 Type II: what the gap analysis covers",
    category: "Compliance & Regulatory",
    icon: FileText,
    excerpt:
      "The trust services criteria behind a SOC 2 report, in plain language, and how findings get triaged.",
    readMin: 5,
    updated: "Jul 12, 2026",
    tags: ["SOC 2", "audit", "compliance"],
    sections: [
      {
        heading: "The trust services criteria",
        body: "A SOC 2 Type II report tests controls against five trust services criteria over an audit period, not just at a point in time.",
        bullets: [
          "Security — protection against unauthorized access",
          "Availability — systems are operational as committed",
          "Processing integrity — systems process data completely and accurately",
          "Confidentiality — information designated confidential is protected",
          "Privacy — personal information is handled per the stated policy",
        ],
      },
      {
        heading: "How findings get triaged",
        body: "Each failed control is scored by severity. Compliance Copilot groups findings by root cause so remediation owners can address systemic issues rather than one-off exceptions.",
      },
      {
        heading: "Remediation before the audit window closes",
        body: "Findings tied to control cadence (like access review frequency) are prioritized ahead of the next audit period to avoid a repeat exception.",
      },
    ],
  },
  {
    id: "mae-clauses",
    title: "Material Adverse Effect clauses: what Delaware courts require",
    category: "Litigation & Case Law",
    icon: Scale,
    excerpt:
      "How Delaware Chancery has interpreted MAE clauses in recent M&A disputes, and what that means for drafting.",
    readMin: 6,
    updated: "Jul 09, 2026",
    tags: ["MAE clause", "M&A", "Delaware"],
    sections: [
      {
        heading: "The durational-significance standard",
        body: "Delaware Chancery requires a buyer invoking a Material Adverse Effect clause to show an impact that is not just substantial but durationally significant — measured in years, not quarters.",
      },
      {
        heading: "Key precedent",
        body: "In Ashford Holdings LLC v. Blackrock Ventures, the court refused to enforce an MAE clause where the buyer failed to demonstrate a durationally significant impact on the target's earnings, reinforcing the high bar set by prior Delaware decisions.",
      },
      {
        heading: "Drafting implications",
        body: "Buyers seeking a lower bar should negotiate specific, enumerated triggering events rather than relying on the general MAE definition, which courts continue to construe narrowly in the buyer's disfavor.",
      },
    ],
  },
  {
    id: "dd-red-flags",
    title: "Due diligence red flags: what deal teams should never skip",
    category: "Corporate & M&A",
    icon: ClipboardList,
    excerpt:
      "The recurring red flags Copilot surfaces across data rooms — unassigned IP, change-of-control triggers, and undisclosed litigation.",
    readMin: 4,
    updated: "Jul 13, 2026",
    tags: ["due diligence", "M&A", "red flags"],
    sections: [
      {
        heading: "The three most common red flag categories",
        body: "Across deal rooms, the same three issue categories surface most often and each can materially affect valuation or close timing.",
        bullets: [
          "Unassigned IP — invention agreements never executed by key engineers",
          "Change-of-control triggers — material contracts that terminate or reprice on close",
          "Undisclosed litigation — matters present in the data room but omitted from the reps and warranties",
        ],
      },
      {
        heading: "How Copilot cross-references workstreams",
        body: "Due Diligence Copilot links findings across the Corporate, Contracts, Employment, IP, and Litigation workstreams so a single issue — like a departed engineer's invention assignment — surfaces everywhere it matters.",
      },
      {
        heading: "When to pause a signing",
        body: "Any high-severity red flag affecting IP ownership or an undisclosed litigation matter should pause signing until the deal team and outside counsel confirm a resolution path.",
      },
    ],
  },
];

/* ─────────────────────────  Page  ───────────────────────── */

function Knowledge() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      const matchesCat = category === "all" || a.category === category;
      const matchesQ =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQ;
    });
  }, [query, category]);

  const open = openId ? (ARTICLES.find((a) => a.id === openId) ?? null) : null;

  return (
    <AppLayout title="Knowledge Base">
      {open ? (
        <ArticleReader
          article={open}
          related={ARTICLES.filter((a) => a.category === open.category && a.id !== open.id).slice(
            0,
            3,
          )}
          onBack={() => setOpenId(null)}
          onOpen={setOpenId}
        />
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              Knowledge Base
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-gradient md:text-3xl">
              Legal knowledge base
            </h1>
            <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
              Playbooks, clause language, and how-to guides for contracts, compliance, and
              litigation workflows — searchable and cited by every copilot.
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search playbooks, clauses, and memos…"
              className="w-full rounded-lg border border-border bg-muted/40 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-1.5">
            <Chip label="All" active={category === "all"} onClick={() => setCategory("all")} />
            {CATEGORIES.map((c) => (
              <Chip key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
            ))}
          </div>

          {/* Results */}
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-muted text-muted-foreground">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">No articles found</p>
                <p className="mt-1 text-sm text-muted-foreground">Nothing matches "{query}".</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((a) => (
                <ArticleCard key={a.id} article={a} onOpen={() => setOpenId(a.id)} />
              ))}
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

function ArticleCard({ article, onOpen }: { article: Article; onOpen: () => void }) {
  const Icon = article.icon;
  return (
    <button
      onClick={onOpen}
      className="group flex h-full flex-col glass rounded-2xl p-5 text-left transition hover:-translate-y-0.5 hover:border-primary/40"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
          <Icon className="h-4 w-4" />
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {article.category}
        </span>
      </div>
      <h3 className="text-[15px] font-semibold leading-snug text-foreground">{article.title}</h3>
      <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{article.excerpt}</p>
      <div className="mt-4 flex items-center gap-3 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> {article.readMin} min read
        </span>
        <span>Updated {article.updated}</span>
      </div>
    </button>
  );
}

/* ─────────────────────────  Article reader  ───────────────────────── */

function ArticleReader({
  article,
  related,
  onBack,
  onOpen,
}: {
  article: Article;
  related: Article[];
  onBack: () => void;
  onOpen: (id: string) => void;
}) {
  const Icon = article.icon;
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to knowledge base
      </button>

      {/* Article header */}
      <div>
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
          <Icon className="h-3.5 w-3.5" />
          {article.category}
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-gradient md:text-3xl">
          {article.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {article.readMin} min read
          </span>
          <span>Updated {article.updated}</span>
          <div className="flex flex-wrap gap-1.5">
            {article.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <article className="glass space-y-6 rounded-2xl p-6">
        {article.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-sm font-semibold text-foreground">{s.heading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">{s.body}</p>
            {s.bullets && (
              <ul className="mt-3 space-y-1.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-foreground/90">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Related in {article.category}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {related.map((r) => {
              const RIcon = r.icon;
              return (
                <button
                  key={r.id}
                  onClick={() => onOpen(r.id)}
                  className="rounded-xl border border-border bg-muted/20 p-4 text-left transition hover:-translate-y-0.5 hover:border-primary/40"
                >
                  <RIcon className="h-4 w-4 text-primary" />
                  <div className="mt-2 text-sm font-medium leading-snug text-foreground">
                    {r.title}
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{r.readMin} min read</div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
