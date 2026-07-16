import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ScrollText,
  Scale,
  FileCheck2,
  Building2,
  ClipboardList,
  AlertOctagon,
  FileText,
  Users,
  Lock,
  Cable,
  BrainCircuit,
  Workflow,
  ChevronRight,
  ChevronDown,
  Plug,
  Circle,
  Sun,
  Moon,
  X,
} from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { workflows } from "@/lib/legal-data";
import { cn } from "@/lib/utils";
import {
  MicrosoftLogo,
  GoogleDriveLogo,
  SharePointLogo,
  DropboxLogo,
  SlackLogo,
  SalesforceLogo,
  DocuSignLogo,
  AdobeLogo,
  NotionLogo,
  JiraLogo,
  TeamsLogo,
  OutlookLogo,
  GitHubLogo,
  GmailLogo,
  OneDriveLogo,
  BoxLogo,
} from "@/components/brand/logos";
import { BrandLockup } from "@/components/brand/Brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Legal AI OS — The AI Operating System for Legal" },
      {
        name: "description",
        content:
          "Enterprise AI for contract review, legal research, compliance and due diligence. AI works, lawyers approve.",
      },
    ],
  }),
  component: Landing,
});

const nav = [
  { href: "#why", label: "Why Us" },
  { href: "#integrations", label: "Services" },
  { href: "/about", label: "About" },
  { href: "#copilots", label: "Copilots" },
];

// Same stage/status color scheme as the in-app /workflows page, for consistency.
const WF_STAGE: Record<string, { label: string; dot: string }> = {
  trigger: { label: "Trigger", dot: "bg-warning" },
  extract: { label: "Extract", dot: "bg-blue-400" },
  match: { label: "Match", dot: "bg-cyan-400" },
  validate: { label: "Validate", dot: "bg-violet-400" },
  approve: { label: "Approve", dot: "bg-purple-400" },
  output: { label: "Output", dot: "bg-success" },
};
const WF_STATUS_BADGE: Record<string, { label: string; badge: string }> = {
  running: { label: "Running", badge: "bg-primary/15 text-primary" },
  awaiting: { label: "Awaiting Approval", badge: "bg-warning/15 text-warning" },
  completed: { label: "Completed", badge: "bg-success/15 text-success" },
  failed: { label: "Failed", badge: "bg-danger/15 text-danger" },
};
const EXAMPLE_WORKFLOWS = workflows.slice(0, 5);

// ---------------- Copilot library (click a card to see how it runs) ----------------

type CopilotGroup = "contracts" | "research" | "compliance";

type CopilotTraceLine = { kind: "run" | "ok" | "wait" | "done"; text: string };

type Copilot = {
  to: string;
  icon: LucideIcon;
  group: CopilotGroup;
  title: string;
  goal: string;
  persona: string;
  approver: string;
  trigger: string;
  actions: string[];
  value: string[];
  runtime: string;
  trace: CopilotTraceLine[];
};

const COPILOT_GROUP_META: Record<CopilotGroup, { label: string; accent: string }> = {
  contracts: { label: "Contracts & NDAs", accent: "text-primary" },
  research: { label: "Research & Risk", accent: "text-chart-2" },
  compliance: { label: "Compliance & Policy", accent: "text-success" },
};

const COPILOT_GROUPS: { slug: CopilotGroup | "all"; label: string }[] = [
  { slug: "all", label: "All" },
  { slug: "contracts", label: "Contracts & NDAs" },
  { slug: "research", label: "Research & Risk" },
  { slug: "compliance", label: "Compliance & Policy" },
];

const COPILOTS: Copilot[] = [
  {
    to: "/copilots/contract-review",
    icon: ScrollText,
    group: "contracts",
    title: "Contract Review Copilot",
    goal: "Clause extraction, playbook comparison, risk scoring.",
    persona: "Contract Associate",
    approver: "General Counsel",
    trigger: "A contract is uploaded or received via email for review.",
    actions: [
      "Extracts every clause and key term automatically",
      "Benchmarks each clause against your playbook",
      "Flags non-standard or missing clauses (e.g. arbitration)",
      "Scores overall contract risk",
      "Writes a plain-language redline summary",
    ],
    value: [
      "No manual clause-by-clause review",
      "Non-standard terms caught before signature",
      "Faster turnaround to counterparty",
      "A clean, defensible audit trail",
    ],
    runtime: "3m 12s",
    trace: [
      { kind: "run", text: "connecting to document intake…" },
      { kind: "ok", text: "reading MSA_Acme_v3.pdf" },
      { kind: "ok", text: "42 clauses extracted" },
      { kind: "ok", text: "benchmarked against MSA playbook" },
      { kind: "ok", text: "liability cap flagged: 1× vs 2× standard" },
      { kind: "ok", text: "arbitration clause missing" },
      { kind: "wait", text: "waiting on approval (General Counsel)" },
      { kind: "ok", text: "approved by S. Miller" },
      { kind: "ok", text: "redline sent to counterparty" },
      { kind: "done", text: "done in 3m 12s" },
    ],
  },
  {
    to: "/copilots/legal-research",
    icon: Scale,
    group: "research",
    title: "Legal Research Copilot",
    goal: "Case law and statute search with cited AI summaries.",
    persona: "Litigation Associate",
    approver: "Senior Counsel",
    trigger: "An attorney submits a research question or memo request.",
    actions: [
      "Searches case law and statutes for relevant authority",
      "Ranks results by jurisdiction and relevance",
      "Summarizes each holding in plain language",
      "Cite-checks every citation before including it",
      "Drafts a memo with citations attached",
    ],
    value: [
      "Hours of research done in minutes",
      "Every citation verified, not just found",
      "Consistent memo format across the team",
      "A traceable research record",
    ],
    runtime: "1m 55s",
    trace: [
      { kind: "run", text: "searching case law database…" },
      { kind: "ok", text: "14 candidate cases found" },
      { kind: "ok", text: "ranked by jurisdiction + relevance" },
      { kind: "ok", text: "4 cases cite-checked · current good law" },
      { kind: "ok", text: "memo drafted with citations" },
      { kind: "wait", text: "waiting on approval (Senior Counsel)" },
      { kind: "ok", text: "approved · memo published" },
      { kind: "done", text: "done in 1m 55s" },
    ],
  },
  {
    to: "/copilots/compliance",
    icon: ShieldCheck,
    group: "compliance",
    title: "Compliance Copilot",
    goal: "GDPR · CCPA · SOC 2 · HIPAA monitoring.",
    persona: "Compliance Analyst",
    approver: "Compliance Officer",
    trigger: "A scheduled compliance scan runs, or a new regulation is published.",
    actions: [
      "Maps current controls against each framework",
      "Flags gaps against GDPR, CCPA, SOC 2 and HIPAA",
      "Scores compliance by framework",
      "Drafts remediation tasks for open findings",
      "Writes a plain-language gap report",
    ],
    value: [
      "Continuous monitoring, not a once-a-year audit",
      "Gaps caught before a regulator finds them",
      "A single score across every framework",
      "Audit-ready evidence on demand",
    ],
    runtime: "2m 48s",
    trace: [
      { kind: "run", text: "scanning control evidence…" },
      { kind: "ok", text: "GDPR: 96% · 2 findings" },
      { kind: "ok", text: "SOC 2 Type II: 91% · 5 findings" },
      { kind: "ok", text: "HIPAA: 88% · 6 findings" },
      { kind: "ok", text: "remediation tasks drafted" },
      { kind: "wait", text: "waiting on approval (Compliance Officer)" },
      { kind: "ok", text: "approved · report published" },
      { kind: "done", text: "done in 2m 48s" },
    ],
  },
  {
    to: "/copilots/due-diligence",
    icon: Building2,
    group: "research",
    title: "Due Diligence Copilot",
    goal: "Data-room ingestion and red-flag reports.",
    persona: "Deal Associate",
    approver: "Deal Lead",
    trigger: "A data room is opened for a new deal.",
    actions: [
      "Ingests every document in the data room",
      "Cross-references findings across workstreams",
      "Flags unassigned IP, change-of-control triggers, and undisclosed litigation",
      "Tracks workstream completion in real time",
      "Drafts the red-flag report for the deal team",
    ],
    value: [
      "218 documents reviewed in hours, not weeks",
      "Red flags surfaced across every workstream",
      "Nothing missed before signing",
      "A defensible diligence record",
    ],
    runtime: "6m 30s",
    trace: [
      { kind: "run", text: "opening data room — Project Meridian…" },
      { kind: "ok", text: "218 documents ingested" },
      { kind: "ok", text: "8 workstreams cross-referenced" },
      { kind: "ok", text: "2 unassigned IP agreements flagged" },
      { kind: "ok", text: "5 change-of-control triggers flagged" },
      { kind: "wait", text: "waiting on approval (Deal Lead)" },
      { kind: "ok", text: "approved · red-flag report published" },
      { kind: "done", text: "done in 6m 30s" },
    ],
  },
  {
    to: "/copilots/nda-review",
    icon: FileCheck2,
    group: "contracts",
    title: "NDA Review Copilot",
    goal: "Auto-triage and negotiate NDAs at scale.",
    persona: "Paralegal",
    approver: "Contract Counsel",
    trigger: "An NDA is received from a counterparty.",
    actions: [
      "Extracts parties, term, and confidentiality period",
      "Compares terms to the standard mutual NDA",
      "Auto-approves matches within tolerance",
      "Escalates non-standard terms to counsel",
      "Files the signed NDA in the repository",
    ],
    value: [
      "Most NDAs cleared without a lawyer",
      "Consistent terms across every NDA",
      "Faster deal velocity",
      "Nothing signed outside policy",
    ],
    runtime: "0m 48s",
    trace: [
      { kind: "run", text: "reading NDA — Tailspin Toys…" },
      { kind: "ok", text: "parties + term extracted" },
      { kind: "ok", text: "matched to standard mutual NDA · 3 of 4 clauses" },
      { kind: "ok", text: "confidentiality period 5yr vs 3yr standard — low risk" },
      { kind: "done", text: "auto-approved · filed in repository" },
    ],
  },
  {
    to: "/copilots/policy-review",
    icon: ClipboardList,
    group: "compliance",
    title: "Policy Review Copilot",
    goal: "Draft and benchmark internal policies.",
    persona: "Policy Analyst",
    approver: "Policy Committee",
    trigger: "A policy draft is submitted for review.",
    actions: [
      "Extracts every requirement in the draft policy",
      "Benchmarks against the current regulatory landscape",
      "Flags drift from peer-benchmark policies",
      "Suggests updated language for gaps",
      "Routes the draft for committee approval",
    ],
    value: [
      "Policies stay current with regulation",
      "Consistent language across every policy",
      "Faster policy committee cycles",
      "A documented review trail",
    ],
    runtime: "2m 05s",
    trace: [
      { kind: "run", text: "reading policy draft — Vendor Onboarding v3…" },
      { kind: "ok", text: "requirements extracted" },
      { kind: "ok", text: "benchmarked against regulations" },
      { kind: "ok", text: "2 gaps flagged vs peer benchmark" },
      { kind: "wait", text: "waiting on approval (Policy Committee)" },
      { kind: "ok", text: "rejected · returned for revision" },
      { kind: "done", text: "done in 2m 05s" },
    ],
  },
  {
    to: "/copilots/contract-review",
    icon: Users,
    group: "contracts",
    title: "Employment Agreements Copilot",
    goal: "Offer letters, PIIA, severance.",
    persona: "HR Business Partner",
    approver: "Employment Counsel",
    trigger: "HR requests an offer letter, PIIA, or severance agreement.",
    actions: [
      "Drafts from the approved template library",
      "Populates role, compensation, and start date",
      "Checks state-specific employment law requirements",
      "Flags any non-standard terms for review",
      "Routes the draft for counsel sign-off",
    ],
    value: [
      "Consistent terms across every hire",
      "State law requirements never missed",
      "Faster offer turnaround",
      "A clean record for every employment matter",
    ],
    runtime: "1m 20s",
    trace: [
      { kind: "run", text: "drafting offer letter — J. Rodriguez…" },
      { kind: "ok", text: "template populated · role + compensation" },
      { kind: "ok", text: "state law requirements checked (CA)" },
      { kind: "ok", text: "non-standard severance term flagged" },
      { kind: "wait", text: "waiting on approval (Employment Counsel)" },
      { kind: "ok", text: "rejected · returned for revision" },
      { kind: "done", text: "done in 1m 20s" },
    ],
  },
  {
    to: "/copilots/risk-assessment",
    icon: AlertOctagon,
    group: "research",
    title: "Risk Assessment Copilot",
    goal: "Portfolio-wide risk heatmaps.",
    persona: "Risk Analyst",
    approver: "Risk Committee",
    trigger: "A scheduled portfolio scan runs, or a new contract is signed.",
    actions: [
      "Scans the full contract portfolio for risk signals",
      "Benchmarks each contract against peer terms",
      "Scores risk by category — contractual, regulatory, IP, litigation",
      "Builds a portfolio-wide risk heatmap",
      "Drafts a mitigation backlog for open risks",
    ],
    value: [
      "Portfolio-wide visibility, not contract-by-contract",
      "Emerging risk caught early",
      "A prioritized mitigation backlog",
      "Board-ready risk reporting",
    ],
    runtime: "4m 10s",
    trace: [
      { kind: "run", text: "scanning contract portfolio…" },
      { kind: "ok", text: "risk signals extracted across 184 contracts" },
      { kind: "ok", text: "benchmarked against peer terms" },
      { kind: "ok", text: "heatmap built — 6 risk categories" },
      { kind: "wait", text: "waiting on approval (Risk Committee)" },
      { kind: "ok", text: "approved · dashboard updated" },
      { kind: "done", text: "done in 4m 10s" },
    ],
  },
  {
    to: "/documents",
    icon: FileText,
    group: "contracts",
    title: "Document Generator Copilot",
    goal: "Template library with variables and clause bank.",
    persona: "Paralegal",
    approver: "Reviewing Attorney",
    trigger: "A team member requests a new document from a template.",
    actions: [
      "Selects the right template from the library",
      "Populates variables from the request",
      "Pulls approved language from the clause bank",
      "Flags any variable left unresolved",
      "Routes the draft for review before sending",
    ],
    value: [
      "Consistent documents every time",
      "No blank variables slipping through",
      "Faster turnaround on routine documents",
      "Every clause pulled from approved language",
    ],
    runtime: "0m 55s",
    trace: [
      { kind: "run", text: "selecting template — Vendor Agreement…" },
      { kind: "ok", text: "variables populated from request" },
      { kind: "ok", text: "clauses pulled from approved bank" },
      { kind: "ok", text: "no unresolved variables" },
      { kind: "wait", text: "waiting on approval (Reviewing Attorney)" },
      { kind: "ok", text: "approved · draft sent" },
      { kind: "done", text: "done in 0m 55s" },
    ],
  },
];

function CopilotLibrary() {
  const [activeGroup, setActiveGroup] = useState<CopilotGroup | "all">("all");
  const [selected, setSelected] = useState<Copilot | null>(null);

  const items = useMemo(
    () => (activeGroup === "all" ? COPILOTS : COPILOTS.filter((c) => c.group === activeGroup)),
    [activeGroup],
  );

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {COPILOT_GROUPS.map((g) => (
            <button
              key={g.slug}
              onClick={() => setActiveGroup(g.slug)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                activeGroup === g.slug
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          Showing <span className="font-medium text-primary">{items.length}</span> of{" "}
          {COPILOTS.length} copilots
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((c) => {
          const meta = COPILOT_GROUP_META[c.group];
          return (
            <button
              key={c.title}
              onClick={() => setSelected(c)}
              className="group glass rounded-2xl p-6 hover:border-primary/30 hover:-translate-y-1 transition-all flex flex-col text-left"
            >
              <div className="flex items-center justify-between">
                <div className="h-11 w-11 rounded-xl bg-primary/15 border border-primary/25 grid place-items-center group-hover:shadow-glow">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <span
                className={cn("mt-4 text-[10px] font-medium uppercase tracking-wider", meta.accent)}
              >
                {meta.label}
              </span>
              <h3 className="mt-1 text-lg font-semibold">{c.title.replace(" Copilot", "")}</h3>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{c.goal}</p>
              <div className="mt-4 flex items-center justify-between border-t border-dashed border-border pt-3 text-[11px] text-muted-foreground">
                <span>{c.persona}</span>
                <span className="flex items-center gap-1 text-primary">
                  <ShieldCheck className="h-3 w-3" />
                  {c.approver}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {selected && <CopilotModal copilot={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

function CopilotModal({ copilot, onClose }: { copilot: Copilot; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const meta = COPILOT_GROUP_META[copilot.group];

  useEffect(() => {
    setStep(0);
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setStep(copilot.trace.length);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setStep(i);
      if (i >= copilot.trace.length) clearInterval(id);
    }, 340);
    return () => clearInterval(id);
  }, [copilot]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="copilot-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl glass-strong shadow-elegant"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border p-6">
          <div>
            <span className={cn("text-[10px] font-medium uppercase tracking-wider", meta.accent)}>
              {meta.label}
            </span>
            <h3 id="copilot-title" className="mt-1.5 text-2xl font-semibold tracking-tight">
              {copilot.title}
            </h3>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{copilot.goal}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-lg p-2 text-muted-foreground transition hover:bg-accent/50 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-0 md:grid-cols-[1fr_320px]">
          {/* Left: explanation */}
          <div className="space-y-6 p-6">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                <Zap className="h-3.5 w-3.5 text-primary" /> Starts when
              </div>
              <p className="text-sm text-foreground/90">{copilot.trigger}</p>
            </div>

            <div>
              <div className="mb-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                What the AI does
              </div>
              <ul className="space-y-2">
                {copilot.actions.map((a) => (
                  <li key={a} className="flex gap-2.5 text-sm text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2.5 rounded-lg border border-primary/25 bg-primary/5 px-4 py-3 text-sm text-foreground/90">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
              You stay in control — <b className="font-semibold text-primary">
                {copilot.approver}
              </b>{" "}
              approves before anything posts.
            </div>

            <div>
              <div className="mb-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                What you get
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {copilot.value.map((v) => (
                  <li key={v} className="flex gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: live run trace */}
          <div className="border-t border-border bg-muted/20 p-6 md:border-l md:border-t-0">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Live run
              </span>
              <span className="text-[11px] text-primary">{copilot.runtime}</span>
            </div>
            <div className="space-y-2 font-mono text-[12.5px] leading-relaxed">
              {copilot.trace.map((line, i) => {
                const shown = i < step;
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex items-start gap-2 transition-opacity duration-300",
                      shown ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <TraceIcon kind={line.kind} />
                    <span
                      className={cn(
                        line.kind === "wait" && "text-warning",
                        line.kind === "done" && "font-semibold text-foreground",
                        line.kind === "run" && "text-muted-foreground",
                        line.kind === "ok" && "text-foreground/80",
                      )}
                    >
                      {line.text}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Link
                to={copilot.to}
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
              >
                Open full copilot
              </Link>
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/50"
              >
                Browse more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TraceIcon({ kind }: { kind: CopilotTraceLine["kind"] }) {
  if (kind === "wait") return <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />;
  if (kind === "done") return <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />;
  if (kind === "run")
    return <span className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground">▸</span>;
  return <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />;
}

function Landing() {
  const { theme, toggle } = useTheme();
  const [openWorkflow, setOpenWorkflow] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <BrandLockup size={40} />
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-foreground transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="h-9 w-9 grid place-items-center rounded-lg hover:bg-accent/50 text-muted-foreground"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg"
            >
              Login
            </Link>
            <Link
              to="/book-demo"
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 shadow-glow"
            >
              Book Demo <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <img
            src="/BACKGROUND_LIGHT.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center opacity-55 dark:hidden"
          />
          <img
            src="/BACKGROUND_DARK.png"
            alt=""
            className="absolute inset-0 hidden h-full w-full object-cover object-center opacity-80 dark:block"
          />
          <div className="absolute inset-0 bg-background/72 dark:bg-background/38" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/15 via-transparent to-background/55 dark:to-background/35" />
          <div className="absolute inset-0 hidden dark:block dark:bg-gradient-to-r dark:from-background/70 dark:from-0% dark:via-background/35 dark:via-52% dark:to-transparent dark:to-68%" />
          <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-muted-foreground">Built for Legal Teams</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="text-primary">v3.2</span>
            </div>
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-[68px] leading-[1.02] font-semibold tracking-tight text-gradient">
              The AI Operating System <span className="text-gradient-primary">for Legal.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Automate contract review, legal research, compliance monitoring and document
              intelligence. AI performs the repetitive work while lawyers remain in complete control
              through human approval.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book-demo"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 shadow-glow"
              >
                Book Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#copilots"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl glass text-sm font-medium hover:bg-accent/60"
              >
                See Copilots
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "Human Approval Required",
                "Enterprise Security",
                "Microsoft 365",
                "SharePoint",
                "Google Drive",
              ].map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground"
                >
                  <Check className="h-3 w-3 text-primary" /> {c}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Floating Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-tr from-primary/15 via-transparent to-chart-5/10 blur-3xl" />
            <div className="relative glass-strong rounded-2xl p-5 shadow-elegant animate-float">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-primary/20 grid place-items-center">
                    <ScrollText className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Contract Review</div>
                    <div className="text-[10px] text-muted-foreground">
                      MSA — Acme Corp · 42 clauses
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-success/15 text-success text-[10px] font-medium">
                  <Circle className="h-1.5 w-1.5 fill-success" /> LIVE
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2.5">
                {[
                  { l: "Reviewed", v: "1,284" },
                  { l: "Pending", v: "8" },
                  { l: "Risk Score", v: "96%" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl bg-muted/40 border border-border p-3">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {s.l}
                    </div>
                    <div className="text-xl font-semibold mt-1">{s.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-border bg-card/60 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-medium">Clause Analysis</div>
                  <span className="text-[10px] text-muted-foreground">AI confidence 94%</span>
                </div>
                <ul className="space-y-2 text-sm">
                  {[
                    { ok: true, t: "Confidentiality" },
                    { ok: true, t: "Termination" },
                    { ok: true, t: "Payment Terms" },
                    { ok: false, t: "Missing Arbitration Clause" },
                  ].map((c) => (
                    <li key={c.t} className="flex items-center gap-2">
                      {c.ok ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-warning" />
                      )}
                      <span className={c.ok ? "text-foreground" : "text-warning"}>{c.t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
                  Approve Contract
                </button>
                <button className="h-10 px-4 rounded-lg border border-border text-sm hover:bg-accent">
                  Review
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-primary/80">
            Why Legal Teams Choose Us
          </div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-gradient">
            An operating system, not another point tool.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              i: ScrollText,
              t: "AI Contract Review",
              d: "Extract clauses, flag risk and benchmark against your playbook in seconds.",
            },
            {
              i: ShieldCheck,
              t: "Compliance Ready",
              d: "SOC 2 · ISO 27001 · GDPR · HIPAA — monitored continuously.",
            },
            {
              i: Lock,
              t: "Enterprise Security",
              d: "Private tenants, SSO/SAML, KMS-encrypted at rest and in transit.",
            },
            {
              i: Scale,
              t: "Legal Research",
              d: "Cite-checked answers grounded in case law and statutes.",
            },
            {
              i: Users,
              t: "Human Approval",
              d: "Every material action routes through the right lawyer, with audit trail.",
            },
            {
              i: Cable,
              t: "Fast Integrations",
              d: "Microsoft 365, Google Drive, SharePoint, DocuSign and 40+ more.",
            },
          ].map((c, i) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative glass rounded-2xl p-6 hover:border-primary/30 transition-all hover:-translate-y-1"
            >
              <div className="h-11 w-11 rounded-xl bg-primary/15 border border-primary/25 grid place-items-center mb-4 group-hover:shadow-glow transition-shadow">
                <c.i className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{c.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-primary/80">How It Works</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-gradient">
            From document to signed contract.
          </h2>
        </div>
        <div className="glass-strong rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { i: FileText, l: "Documents" },
              { i: BrainCircuit, l: "OCR" },
              { i: Sparkles, l: "AI" },
              { i: AlertOctagon, l: "Risk Analysis" },
              { i: Users, l: "Human Review" },
              { i: Check, l: "Approved" },
            ].map((s, i, arr) => (
              <div key={s.l} className="flex flex-col items-center text-center relative">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="h-16 w-16 rounded-2xl glass grid place-items-center border-primary/20"
                >
                  <s.i className="h-6 w-6 text-primary" />
                </motion.div>
                <div className="mt-3 text-sm font-medium">{s.l}</div>
                {i < arr.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px -translate-x-1/2">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="h-px bg-gradient-to-r from-primary/40 to-transparent origin-left"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLE WORKFLOWS */}
      <section id="workflow-examples" className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-primary/80">Workflows</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-gradient">
            Watch a workflow run end to end.
          </h2>
          <p className="mt-3 text-muted-foreground">
            The same workflows that run inside the app. Pick one to see its flow and the systems it
            connects.
          </p>
        </div>
        <div className="glass rounded-2xl overflow-hidden">
          {EXAMPLE_WORKFLOWS.map((w) => {
            const isOpen = openWorkflow === w.id;
            const status = WF_STATUS_BADGE[w.status];
            return (
              <div key={w.id} className="border-b border-border last:border-b-0">
                <button
                  onClick={() => setOpenWorkflow(isOpen ? null : w.id)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-accent/30 transition-colors"
                >
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-0" : "-rotate-90"}`}
                  />
                  <div className="h-9 w-9 rounded-lg bg-primary/15 border border-primary/25 grid place-items-center shrink-0">
                    <Workflow className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{w.name}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {w.copilot} Copilot · {w.flow.length} steps
                    </div>
                  </div>
                  <span
                    className={`text-[11px] px-2.5 py-1 rounded-full font-medium shrink-0 ${status.badge}`}
                  >
                    {status.label}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 pt-1">
                    <div className="flex items-stretch gap-2 overflow-x-auto pb-2">
                      {w.flow.map((step, i) => {
                        const stage = WF_STAGE[step.stage];
                        return (
                          <div key={step.n} className="flex items-center gap-2 shrink-0">
                            <div className="w-40 rounded-xl border border-border bg-card p-3">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`h-5 w-5 rounded-full grid place-items-center text-[10px] font-bold text-background ${stage.dot}`}
                                >
                                  {step.n}
                                </span>
                                <span className="text-sm font-medium leading-tight">
                                  {step.label}
                                </span>
                              </div>
                              <div className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                                {stage.label}
                              </div>
                            </div>
                            {i < w.flow.length - 1 && (
                              <div className="h-px w-4 bg-border shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {w.connectors.map((c) => (
                        <span
                          key={c}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-warning/40 text-warning text-xs"
                        >
                          <Plug className="h-3.5 w-3.5" />
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/workflows"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            See all workflows <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section id="about-preview" className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-xs uppercase tracking-[0.2em] text-primary/80">About Us</div>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-gradient">
              Built by lawyers, for legal teams.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl">
              Our copilots handle the repetitive work across contract review, compliance and due
              diligence, so your team can focus on judgment and advocacy. Every material action
              still routes to a human, with a full audit trail.
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                "Fine-tuned legal LLMs grounded in your playbooks and precedent",
                "40+ integrations across Microsoft 365, Google Workspace and DocuSign",
                "Every action routed to the right lawyer with a full audit trail",
                "SOC 2 Type II · ISO 27001 · GDPR · HIPAA",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-1.5 h-11 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 shadow-glow"
            >
              Read more <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <span
              aria-hidden
              className="absolute -right-3 -top-3 h-20 w-20 rounded-tr-2xl border-r-2 border-t-2 border-primary/60"
            />
            <span
              aria-hidden
              className="absolute -bottom-3 -left-3 h-20 w-20 rounded-bl-2xl border-b-2 border-l-2 border-primary/60"
            />
            <div className="relative glass-strong rounded-2xl overflow-hidden shadow-elegant">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-md bg-primary grid place-items-center">
                    <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-semibold">This month at a glance</span>
                </div>
                <span className="rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success">
                  On track
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 p-5">
                {[
                  { k: "Contracts reviewed", v: "184", s: "+9.5% MoM" },
                  { k: "Avg. review time", v: "11 min", s: "−62% vs manual" },
                  { k: "Compliance score", v: "94%", s: "+2 pts" },
                  { k: "Open risk alerts", v: "3", s: "−4 this week" },
                ].map((m) => (
                  <div key={m.k} className="rounded-xl border border-border bg-card p-3">
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {m.k}
                    </div>
                    <div className="mt-1 text-lg font-semibold tabular-nums">{m.v}</div>
                    <div className="text-[11px] font-medium text-success">{m.s}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section id="integrations" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-primary/80">Integrations</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-gradient">
            Works with your entire stack.
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { L: MicrosoftLogo, n: "Microsoft 365" },
            { L: GoogleDriveLogo, n: "Google Drive" },
            { L: SharePointLogo, n: "SharePoint" },
            { L: DropboxLogo, n: "Dropbox" },
            { L: SlackLogo, n: "Slack" },
            { L: SalesforceLogo, n: "Salesforce" },
            { L: DocuSignLogo, n: "DocuSign" },
            { L: AdobeLogo, n: "Adobe" },
            { L: NotionLogo, n: "Notion" },
            { L: JiraLogo, n: "Jira" },
            { L: TeamsLogo, n: "Teams" },
            { L: OutlookLogo, n: "Outlook" },
            { L: GitHubLogo, n: "GitHub" },
            { L: GmailLogo, n: "Gmail" },
            { L: OneDriveLogo, n: "OneDrive" },
            { L: BoxLogo, n: "Box" },
          ].map(({ L, n }) => (
            <div
              key={n}
              className="group glass rounded-2xl p-5 flex flex-col items-center gap-3 hover:border-primary/30 hover:-translate-y-1 transition-all"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-white ring-1 ring-black/5 overflow-hidden group-hover:scale-110 transition-transform">
                <L className="h-9 w-9" />
              </span>
              <div className="text-sm text-muted-foreground truncate w-full text-center">{n}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COPILOTS */}
      <section id="copilots" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-primary/80">
            Legal Copilot Library
          </div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-gradient">
            A copilot for every legal workflow.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every copilot starts on a trigger, handles the busywork with AI, and stops for your
            approval before anything's final. Click any card to see how it runs.
          </p>
        </div>
        <CopilotLibrary />
      </section>

      {/* PLATFORM CAPABILITIES */}
      <section id="platform" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-primary/80">The Legal Core</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-gradient">
            Every copilot runs on the same legal operating system.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Instead of rebuilding the basics for every task, each copilot inherits the same building
            blocks — already wired together and tuned for legal work.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              i: FileText,
              t: "Document Intelligence",
              d: "Reads contracts, NDAs and filings, then extracts clauses and key terms with a confidence score on every field.",
            },
            {
              i: BrainCircuit,
              t: "AI Reasoning Engine",
              d: "Fine-tuned legal LLMs with retrieval over your playbooks, clause library, precedent and case law.",
            },
            {
              i: Workflow,
              t: "Workflow Automation",
              d: "Durable, multi-step workflows connect intake through extraction, matching, validation and output.",
            },
            {
              i: Users,
              t: "Human Approval Layer",
              d: "Every material action routes to the right lawyer with a full audit trail before it's final.",
            },
            {
              i: Cable,
              t: "Connector Layer",
              d: "40+ integrations — Microsoft 365, Google Workspace, DocuSign, Salesforce, Jira and more.",
            },
            {
              i: ShieldCheck,
              t: "Security & Trust",
              d: "Private-tenant deployments, SSO/SAML, KMS-encrypted. SOC 2 Type II · ISO 27001 · GDPR · HIPAA.",
            },
          ].map((c, i) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-2xl p-6 hover:border-primary/30 hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-11 w-11 rounded-xl bg-primary/15 border border-primary/25 grid place-items-center">
                  <c.i className="h-5 w-5 text-primary" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="text-lg font-semibold">{c.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gradient">
            Give your legal team back the review.
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-muted-foreground">
            See how contract review, compliance, and due diligence copilots run on your own
            playbooks. Book a demo and we'll walk you through it.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-5">
            <Link
              to="/book-demo"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-glow hover:opacity-90"
            >
              Book Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Try Live Prototype
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 bg-muted/10">
        <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr] text-sm">
          <div>
            <BrandLockup size={32} />
            <p className="mt-4 max-w-xs text-muted-foreground">
              The AI operating system for legal — contract review, research, compliance and due
              diligence, with a lawyer in control of every decision.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-3">Product</div>
            <ul className="space-y-2.5 text-muted-foreground">
              <li>
                <Link to="/dashboard" className="hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/copilots/contract-review"
                  className="hover:text-foreground transition-colors"
                >
                  Copilots
                </Link>
              </li>
              <li>
                <Link to="/workflows" className="hover:text-foreground transition-colors">
                  Workflows
                </Link>
              </li>
              <li>
                <Link to="/connectors" className="hover:text-foreground transition-colors">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-3">Company</div>
            <ul className="space-y-2.5 text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/book-demo" className="hover:text-foreground transition-colors">
                  Book Demo
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-foreground transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-3">Trust</div>
            <ul className="space-y-2.5 text-muted-foreground">
              <li>SOC 2 Type II</li>
              <li>ISO 27001</li>
              <li>GDPR · HIPAA</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 border-t border-border/60 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© 2026 Industry AI OS · Legal Edition. All rights reserved.</div>
          <div className="font-mono">The AI operating system for legal</div>
        </div>
      </footer>
    </div>
  );
}
