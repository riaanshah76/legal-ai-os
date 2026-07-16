import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Circle,
  ClipboardCheck,
  ClipboardList,
  Download,
  FileStack,
  Gavel,
  Lock,
  Printer,
  ScanLine,
  ScrollText,
  Search,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Table2,
  Upload,
  User,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/app/AppLayout";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/documents")({
  head: () => ({ meta: [{ title: "Document Intelligence · Legal AI OS" }] }),
  component: Documents,
});

/* ─────────────────────────  Dummy data (legal)  ───────────────────────── */

type DocType = "contract" | "nda" | "compliance-filing" | "court-filing" | "due-diligence-memo";
type Tone = "good" | "warn" | "bad" | "neutral";

interface Field {
  label: string;
  value: string;
  confidence: number; // 0-100
}
interface MatrixRow {
  primary: string;
  secondary?: string;
  status?: string;
  statusTone?: Tone;
  note?: string;
}
interface AnalysisMatrix {
  title: string;
  hint: string;
  headers: [string, string, string];
  rows: MatrixRow[];
}
interface DocRisk {
  severity: "low" | "medium" | "high";
  text: string;
}
interface DocActionItem {
  text: string;
  owner: string;
  due: string;
  done: boolean;
}
interface DocumentItem {
  id: string;
  type: DocType;
  title: string;
  party: string;
  category: string;
  status: string;
  statusTone: Tone;
  date: string;
  author: string;
  pages: number;
  sizeKb: number;
  amount: string;
  confidence: number; // overall extraction confidence 0-100
  tags: string[];
  previewLines: string[];
  fields: Field[];
  matrix?: AnalysisMatrix;
  aiSummary: { text: string; bullets: string[] };
  risks: DocRisk[];
  actionItems: DocActionItem[];
  relatedIds: string[];
}

const docTypeMeta: Record<DocType, { label: string; plural: string }> = {
  contract: { label: "Contract", plural: "Contracts" },
  nda: { label: "NDA", plural: "NDAs" },
  "compliance-filing": { label: "Compliance Filing", plural: "Compliance" },
  "court-filing": { label: "Court Filing", plural: "Court Filings" },
  "due-diligence-memo": { label: "Due Diligence Memo", plural: "Due Diligence" },
};

const docTypeIcon: Record<DocType, LucideIcon> = {
  contract: ScrollText,
  nda: Lock,
  "compliance-filing": ShieldCheck,
  "court-filing": Gavel,
  "due-diligence-memo": ClipboardList,
};

const docTypeColor: Record<DocType, string> = {
  contract: "text-primary",
  nda: "text-chart-2",
  "compliance-filing": "text-success",
  "court-filing": "text-warning",
  "due-diligence-memo": "text-muted-foreground",
};

const severityTone: Record<DocRisk["severity"], Tone> = {
  low: "good",
  medium: "warn",
  high: "bad",
};

const documents: DocumentItem[] = [
  {
    id: "msa-acme",
    type: "contract",
    title: "MSA #C-2039 — Acme Corp",
    party: "Acme Corp",
    category: "Contracts",
    status: "Needs Approval",
    statusTone: "warn",
    date: "Jul 08, 2026",
    author: "L. Chen",
    pages: 18,
    sizeKb: 940,
    amount: "$2.4M",
    confidence: 94,
    tags: ["MSA", "C-2039", "redline"],
    previewLines: [
      "MASTER SERVICES AGREEMENT",
      "Acme Corp · Contract C-2039",
      "Effective Date: Jul 08, 2026 · Term: 24 months",
      "Governing Law: State of Delaware",
      "PAYMENT TERMS",
      "Net-45, quarterly true-up — $2,400,000.00 total contract value",
      "LIABILITY",
      "Cap at 1× annual fees",
    ],
    fields: [
      { label: "Party A", value: "Acme Corp", confidence: 99 },
      { label: "Party B", value: "Northwind LLP", confidence: 98 },
      { label: "Effective date", value: "Jul 08, 2026", confidence: 98 },
      { label: "Term", value: "24 months", confidence: 97 },
      { label: "Renewal", value: "Auto, 12-month", confidence: 92 },
      { label: "Contract value", value: "$2,400,000.00", confidence: 99 },
      { label: "Payment terms", value: "Net-45", confidence: 96 },
      { label: "Liability cap", value: "1× annual fees", confidence: 94 },
      { label: "Termination notice", value: "60 days", confidence: 95 },
      { label: "Governing law", value: "Delaware", confidence: 99 },
    ],
    matrix: {
      title: "Clause Mapping",
      hint: "Benchmarked against the standard MSA playbook",
      headers: ["Clause", "Status", "Note"],
      rows: [
        {
          primary: "Confidentiality",
          status: "OK",
          statusTone: "good",
          note: "Standard 5-year survival",
        },
        {
          primary: "Termination for Convenience",
          status: "OK",
          statusTone: "good",
          note: "60-day notice, mutual",
        },
        {
          primary: "Payment Terms",
          status: "OK",
          statusTone: "good",
          note: "Net-45, quarterly true-up",
        },
        {
          primary: "Limitation of Liability",
          status: "Review",
          statusTone: "warn",
          note: "Cap at 1× annual fees — recommend 2×",
        },
        {
          primary: "Indemnification",
          status: "OK",
          statusTone: "good",
          note: "Mutual, IP carve-out",
        },
        {
          primary: "Arbitration",
          status: "Missing",
          statusTone: "bad",
          note: "No arbitration clause detected",
        },
      ],
    },
    aiSummary: {
      text: "This **MSA** with Acme Corp commits **$2.4M** over a 24-month term under Net-45 payment terms. Copilot benchmarked every clause against the standard playbook and flagged two deviations for counsel review.",
      bullets: [
        "10 of 12 tracked clauses match the standard MSA playbook exactly.",
        "Liability cap is set at 1× annual fees versus the 2× playbook default.",
        "No arbitration clause was found — disputes currently default to litigation.",
      ],
    },
    risks: [
      {
        severity: "medium",
        text: "Liability cap of 1× annual fees is below the 2× playbook standard.",
      },
      {
        severity: "low",
        text: "No arbitration clause — consider adding for faster dispute resolution.",
      },
    ],
    actionItems: [
      {
        text: "Negotiate liability cap up to 2× annual fees.",
        owner: "L. Chen",
        due: "Jul 12",
        done: false,
      },
      {
        text: "Add standard arbitration clause before signature.",
        owner: "Contract Copilot",
        due: "Jul 12",
        done: false,
      },
      {
        text: "Route to General Counsel for final approval.",
        owner: "L. Chen",
        due: "Jul 14",
        done: false,
      },
    ],
    relatedIds: ["dpa-contoso", "nda-tailspin"],
  },
  {
    id: "nda-tailspin",
    type: "nda",
    title: "NDA — Tailspin Toys",
    party: "Tailspin Toys",
    category: "NDA",
    status: "Auto-Approved",
    statusTone: "good",
    date: "Jul 06, 2026",
    author: "S. Patel",
    pages: 4,
    sizeKb: 210,
    amount: "—",
    confidence: 99,
    tags: ["NDA", "mutual", "auto-approved"],
    previewLines: [
      "MUTUAL NON-DISCLOSURE AGREEMENT",
      "Tailspin Toys · Northwind LLP",
      "Effective Date: Jul 06, 2026",
      "Confidentiality Period: 5 years",
      "GOVERNING LAW",
      "State of Delaware",
      "REMEDIES",
      "Injunctive relief without bond",
    ],
    fields: [
      { label: "Disclosing party", value: "Tailspin Toys", confidence: 99 },
      { label: "Receiving party", value: "Northwind LLP", confidence: 99 },
      { label: "Effective date", value: "Jul 06, 2026", confidence: 98 },
      { label: "Confidentiality period", value: "5 years", confidence: 96 },
      { label: "Governing law", value: "Delaware", confidence: 99 },
      { label: "Return of materials", value: "30 days post-term", confidence: 93 },
      { label: "Mutual", value: "Yes", confidence: 99 },
    ],
    matrix: {
      title: "Clause Mapping",
      hint: "Compared against the standard mutual NDA template",
      headers: ["Clause", "Status", "Note"],
      rows: [
        {
          primary: "Confidentiality Scope",
          status: "OK",
          statusTone: "good",
          note: "Matches standard definition",
        },
        {
          primary: "Term",
          status: "Review",
          statusTone: "warn",
          note: "5 years vs. 3-year standard",
        },
        {
          primary: "Return of Materials",
          status: "OK",
          statusTone: "good",
          note: "30-day standard window",
        },
        {
          primary: "Governing Law",
          status: "OK",
          statusTone: "good",
          note: "Delaware, as standard",
        },
      ],
    },
    aiSummary: {
      text: "A **mutual NDA** with Tailspin Toys matching the standard template on 3 of 4 tracked clauses. Copilot auto-approved it after classifying the deviation as low risk.",
      bullets: [
        "Confidentiality scope and remedies language match the standard template verbatim.",
        "Confidentiality period of 5 years exceeds the 3-year standard but is within policy tolerance.",
        "No non-compete or exclusivity language was detected.",
      ],
    },
    risks: [
      {
        severity: "low",
        text: "Confidentiality period of 5 years is longer than the 3-year standard term.",
      },
    ],
    actionItems: [
      {
        text: "File signed NDA in the contract repository.",
        owner: "S. Patel",
        due: "Jul 07",
        done: true,
      },
      {
        text: "Notify requester of auto-approval.",
        owner: "NDA Copilot",
        due: "Jul 06",
        done: true,
      },
    ],
    relatedIds: ["msa-acme"],
  },
  {
    id: "dpa-contoso",
    type: "compliance-filing",
    title: "Data Processing Addendum — Contoso Ltd",
    party: "Contoso Ltd",
    category: "Data Protection",
    status: "High Risk Flagged",
    statusTone: "bad",
    date: "Jul 07, 2026",
    author: "R. Kimura",
    pages: 12,
    sizeKb: 560,
    amount: "—",
    confidence: 87,
    tags: ["GDPR", "DPA", "sub-processor"],
    previewLines: [
      "DATA PROCESSING ADDENDUM",
      "Contoso Ltd · Controller-Processor",
      "Cross-border Transfer Mechanism: Standard Contractual Clauses",
      "BREACH NOTIFICATION",
      "72-hour notification window",
      "SUB-PROCESSORS",
      "List not attached to executed copy",
    ],
    fields: [
      { label: "Controller", value: "Northwind LLP", confidence: 96 },
      { label: "Processor", value: "Contoso Ltd", confidence: 97 },
      { label: "Effective date", value: "Jul 07, 2026", confidence: 95 },
      { label: "Governing law", value: "Ireland / GDPR", confidence: 91 },
      { label: "Transfer mechanism", value: "Standard Contractual Clauses", confidence: 88 },
      { label: "Breach notification", value: "72 hours", confidence: 94 },
      { label: "Sub-processor list", value: "Not attached", confidence: 62 },
    ],
    matrix: {
      title: "Regulatory Control Mapping",
      hint: "Checked against GDPR processor obligations",
      headers: ["Control", "Status", "Note"],
      rows: [
        {
          primary: "Art. 28 — Processor Obligations",
          status: "Gap",
          statusTone: "bad",
          note: "Sub-processor list missing",
        },
        {
          primary: "Art. 32 — Security of Processing",
          status: "OK",
          statusTone: "good",
          note: "Encryption at rest and in transit",
        },
        {
          primary: "Art. 44 — Cross-Border Transfers",
          status: "Review",
          statusTone: "warn",
          note: "SCCs referenced, not attached",
        },
        {
          primary: "Breach Notification",
          status: "OK",
          statusTone: "good",
          note: "72-hour window matches Art. 33",
        },
      ],
    },
    aiSummary: {
      text: "This **DPA** with Contoso Ltd is missing the required GDPR sub-processor list, putting Art. 28 processor obligations at **high risk** of non-compliance. Copilot paused it before countersignature.",
      bullets: [
        "Sub-processor list required under Art. 28(2) is not attached to the executed copy.",
        "Standard Contractual Clauses are referenced by title but not attached as an exhibit.",
        "Breach notification and security provisions otherwise meet GDPR requirements.",
      ],
    },
    risks: [
      {
        severity: "high",
        text: "Missing sub-processor list is a gap under GDPR Art. 28(2) processor obligations.",
      },
      {
        severity: "medium",
        text: "Standard Contractual Clauses are referenced but not attached as an exhibit.",
      },
    ],
    actionItems: [
      {
        text: "Obtain and attach the current sub-processor list.",
        owner: "R. Kimura",
        due: "Jul 11",
        done: false,
      },
      { text: "Attach signed SCCs as an exhibit.", owner: "R. Kimura", due: "Jul 11", done: false },
      {
        text: "Escalate to Data Protection Officer before countersignature.",
        owner: "DPO",
        due: "Jul 11",
        done: false,
      },
    ],
    relatedIds: ["soc2-filing", "msa-acme"],
  },
  {
    id: "brief-ashford",
    type: "court-filing",
    title: "Motion Brief — Ashford Holdings v. Blackrock Ventures",
    party: "Del. Ch.",
    category: "Litigation",
    status: "Filed",
    statusTone: "good",
    date: "Jul 09, 2026",
    author: "R. Kimura",
    pages: 24,
    sizeKb: 1120,
    amount: "Claim: $40M",
    confidence: 92,
    tags: ["M&A", "MAE clause", "Del. Ch."],
    previewLines: [
      "MOTION TO DISMISS",
      "Ashford Holdings LLC v. Blackrock Ventures",
      "Delaware Court of Chancery · C.A. No. 2026-0447",
      "ARGUMENT",
      "Buyer's Material Adverse Effect claim fails to plead durationally",
      "significant impact on target's earnings under controlling precedent.",
      "RELIEF REQUESTED",
      "Dismissal with prejudice",
    ],
    fields: [
      { label: "Case No.", value: "C.A. No. 2026-0447", confidence: 99 },
      { label: "Court", value: "Delaware Court of Chancery", confidence: 99 },
      { label: "Filing type", value: "Motion to Dismiss", confidence: 97 },
      { label: "Filed by", value: "R. Kimura", confidence: 96 },
      { label: "Response due", value: "Jul 23, 2026", confidence: 95 },
      { label: "Claim amount", value: "$40,000,000.00", confidence: 90 },
      { label: "Cited cases", value: "3", confidence: 92 },
    ],
    matrix: {
      title: "Citation Verification",
      hint: "Cross-checked against the case law database",
      headers: ["Citation", "Court", "Status"],
      rows: [
        {
          primary: "Delaware Chancery: Ashford Holdings LLC v. Blackrock Ventures",
          secondary: "Del. Ch. 2025",
          status: "Verified",
          statusTone: "good",
        },
        {
          primary: "Smith v. Jones, 592 U.S. 214 (2024)",
          secondary: "U.S. Supreme Court",
          status: "Verified",
          statusTone: "good",
        },
        {
          primary: "In re Meridian Data Corp., 88 F.4th 1123 (9th Cir. 2024)",
          secondary: "9th Circuit",
          status: "Review",
          statusTone: "warn",
        },
      ],
    },
    aiSummary: {
      text: "This **motion to dismiss** argues that Blackrock's Material Adverse Effect claim fails Delaware's durational-significance standard. Copilot verified the primary citations and flagged one for a currency check.",
      bullets: [
        "Ashford Holdings precedent directly supports the durational-significance argument.",
        "Two of three cited cases were verified as current good law.",
        "Response brief from opposing counsel is due Jul 23, 2026.",
      ],
    },
    risks: [
      {
        severity: "medium",
        text: "In re Meridian Data Corp. citation needs a currency check before final filing.",
      },
      { severity: "low", text: "Reply brief window is 14 days — calendar the response deadline." },
    ],
    actionItems: [
      {
        text: "Shepardize the Meridian Data Corp. citation.",
        owner: "Research Copilot",
        due: "Jul 10",
        done: false,
      },
      {
        text: "Brief senior partner ahead of the response deadline.",
        owner: "R. Kimura",
        due: "Jul 18",
        done: false,
      },
    ],
    relatedIds: ["dd-meridian"],
  },
  {
    id: "dd-meridian",
    type: "due-diligence-memo",
    title: "Due Diligence Memo — Project Meridian",
    party: "Project Meridian",
    category: "M&A / Due Diligence",
    status: "In Review",
    statusTone: "warn",
    date: "Jul 13, 2026",
    author: "Deal Team",
    pages: 56,
    sizeKb: 3400,
    amount: "Deal value: $180M",
    confidence: 95,
    tags: ["Project Meridian", "red flags", "workstreams"],
    previewLines: [
      "DUE DILIGENCE — RED FLAG REPORT",
      "Project Meridian · Deal value $180,000,000.00",
      "218 documents ingested across 8 workstreams",
      "RED FLAGS",
      "2 unassigned IP invention agreements",
      "5 material contracts with change-of-control triggers",
      "1 pending employment litigation matter",
    ],
    fields: [
      { label: "Target", value: "Project Meridian", confidence: 96 },
      { label: "Deal value", value: "$180,000,000.00", confidence: 94 },
      { label: "Documents reviewed", value: "218", confidence: 99 },
      { label: "Red flags", value: "3", confidence: 97 },
      { label: "Workstreams complete", value: "5 of 8", confidence: 93 },
      { label: "Target close date", value: "Aug 15, 2026", confidence: 88 },
    ],
    matrix: {
      title: "Workstream Progress",
      hint: "Deal-room review status by workstream",
      headers: ["Workstream", "Lead", "Status"],
      rows: [
        { primary: "Corporate", secondary: "D. Alvarez", status: "Complete", statusTone: "good" },
        {
          primary: "Material Contracts",
          secondary: "L. Chen",
          status: "Complete",
          statusTone: "good",
        },
        { primary: "Employment", secondary: "M. Okoye", status: "Flagged", statusTone: "bad" },
        {
          primary: "Intellectual Property",
          secondary: "R. Kimura",
          status: "Flagged",
          statusTone: "bad",
        },
        {
          primary: "Data & Privacy",
          secondary: "S. Patel",
          status: "Complete",
          statusTone: "good",
        },
        { primary: "Litigation", secondary: "R. Kimura", status: "In Review", statusTone: "warn" },
      ],
    },
    aiSummary: {
      text: "Copilot ingested **218 documents** across the Project Meridian data room and surfaced **3 red flags** spanning IP, contracts, and employment. Deal value is **$180M** with a target close of Aug 15, 2026.",
      bullets: [
        "Two engineers' invention assignments were never executed — an IP ownership gap.",
        "Five material contracts contain change-of-control clauses that could trigger on close.",
        "One pending employment litigation matter was found in the data room but not disclosed in the reps.",
      ],
    },
    risks: [
      {
        severity: "high",
        text: "Unassigned IP invention agreements for 2 engineers create ownership uncertainty.",
      },
      {
        severity: "medium",
        text: "5 material contracts carry change-of-control triggers that could disrupt post-close continuity.",
      },
    ],
    actionItems: [
      {
        text: "Obtain signed IP assignments before signing.",
        owner: "R. Kimura",
        due: "Jul 20",
        done: false,
      },
      {
        text: "Renegotiate change-of-control triggers with key counterparties.",
        owner: "L. Chen",
        due: "Jul 22",
        done: false,
      },
      {
        text: "Schedule employment litigation exposure call with deal team.",
        owner: "M. Okoye",
        due: "Jul 16",
        done: false,
      },
    ],
    relatedIds: ["brief-ashford", "soc2-filing"],
  },
  {
    id: "soc2-filing",
    type: "compliance-filing",
    title: "SOC 2 Type II Gap Analysis — Q3",
    party: "Northwind LLP",
    category: "Compliance",
    status: "Approved",
    statusTone: "good",
    date: "Jul 12, 2026",
    author: "Compliance",
    pages: 31,
    sizeKb: 1780,
    amount: "Findings: 14",
    confidence: 91,
    tags: ["SOC 2", "gap analysis", "Q3"],
    previewLines: [
      "SOC 2 TYPE II — GAP ANALYSIS",
      "Reporting Period: Q3 2026",
      "Controls Tested: 62 · Controls Passed: 58",
      "FINDINGS",
      "14 findings, 2 relate to access review cadence",
      "REMEDIATION",
      "Plan due before Q4 audit window",
    ],
    fields: [
      { label: "Framework", value: "SOC 2 Type II", confidence: 99 },
      { label: "Period", value: "Q3 2026", confidence: 98 },
      { label: "Controls tested", value: "62", confidence: 97 },
      { label: "Controls passed", value: "58", confidence: 97 },
      { label: "Findings", value: "14", confidence: 96 },
      { label: "Auditor", value: "Third-party CPA firm", confidence: 90 },
    ],
    matrix: {
      title: "Framework Coverage",
      hint: "Score and open findings by compliance framework",
      headers: ["Framework", "Score", "Findings"],
      rows: [
        { primary: "GDPR", secondary: "EU", status: "96%", statusTone: "good" },
        { primary: "CCPA / CPRA", secondary: "California", status: "94%", statusTone: "good" },
        { primary: "SOC 2 Type II", secondary: "US", status: "91%", statusTone: "warn" },
        { primary: "HIPAA", secondary: "US", status: "88%", statusTone: "warn" },
        { primary: "ISO 27001", secondary: "Global", status: "93%", statusTone: "good" },
      ],
    },
    aiSummary: {
      text: "The **Q3 SOC 2 Type II** gap analysis passed 58 of 62 tested controls. Copilot grouped the 14 findings by severity — most are minor, with 2 tied to access review cadence.",
      bullets: [
        "58 of 62 controls (93.5%) passed testing with no exceptions.",
        "2 findings relate to quarterly access review cadence, not access itself.",
        "No critical or high-severity control failures were identified this quarter.",
      ],
    },
    risks: [
      {
        severity: "low",
        text: "14 minor findings identified, none rated critical or high severity.",
      },
      {
        severity: "medium",
        text: "2 findings tie to access review cadence falling behind the quarterly schedule.",
      },
    ],
    actionItems: [
      {
        text: "Remediate access review cadence finding before Q4.",
        owner: "Compliance",
        due: "Sep 30",
        done: false,
      },
      {
        text: "Publish final report to the Knowledge Base.",
        owner: "Compliance Copilot",
        due: "Jul 14",
        done: true,
      },
    ],
    relatedIds: ["dpa-contoso"],
  },
];

function getDocumentsByIds(ids: string[]): DocumentItem[] {
  return ids
    .map((id) => documents.find((d) => d.id === id))
    .filter((d): d is DocumentItem => Boolean(d));
}

/* ─────────────────────────  Shared helpers  ───────────────────────── */

const PANEL = "glass rounded-2xl overflow-hidden";

function toneBadgeCls(tone: Tone) {
  switch (tone) {
    case "good":
      return "bg-success/10 border-success/30 text-success";
    case "warn":
      return "bg-warning/10 border-warning/30 text-warning";
    case "bad":
      return "bg-destructive/10 border-destructive/30 text-destructive";
    default:
      return "bg-muted border-border text-foreground";
  }
}

function confColor(c: number) {
  return c >= 90 ? "text-success" : c >= 75 ? "text-warning" : "text-destructive";
}
function confBar(c: number) {
  return c >= 90 ? "bg-success" : c >= 75 ? "bg-warning" : "bg-destructive";
}

function SectionHeader({
  icon: Icon,
  title,
  hint,
  right,
}: {
  icon: LucideIcon;
  title: string;
  hint?: string;
  right?: React.ReactNode;
}) {
  return (
    <header className="flex items-center justify-between border-b border-border px-5 py-4">
      <div className="flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-md border border-border bg-muted/50">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
        </div>
      </div>
      {right}
    </header>
  );
}

function ConfidenceRing({ value, size = 44 }: { value: number; size?: number }) {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - value / 100);
  const stroke =
    value >= 90 ? "stroke-success" : value >= 75 ? "stroke-warning" : "stroke-destructive";
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className="stroke-muted"
          strokeWidth={3}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className={cn(stroke, "transition-all")}
          strokeWidth={3}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={off}
          strokeLinecap="round"
        />
      </svg>
      <span className={cn("absolute text-[11px] font-semibold tabular-nums", confColor(value))}>
        {value}
      </span>
    </div>
  );
}

/* ─────────────────────────  Page  ───────────────────────── */

function Documents() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | DocType>("all");
  const [selectedId, setSelectedId] = useState<string>(documents[0].id);
  const [aiOpen, setAiOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = documents;
    if (typeFilter !== "all") list = list.filter((d) => d.type === typeFilter);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.party.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [query, typeFilter]);

  const selected = documents.find((d) => d.id === selectedId) ?? filtered[0] ?? documents[0];

  const totalDocs = documents.length;
  const needApproval = documents.filter(
    (d) => d.status.includes("Approval") || d.status.includes("Review"),
  ).length;
  const avgConf = Math.round(documents.reduce((s, d) => s + d.confidence, 0) / documents.length);

  return (
    <AppLayout title="Document Intelligence">
      <div className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Document Intelligence
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl text-gradient">
              Document workspace
            </h1>
            <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
              AI reads contracts, NDAs, filings, and due diligence memos — extracting clauses,
              risks, and obligations with a confidence score on every field.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-9 inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 text-xs font-medium transition hover:border-primary/50 hover:text-primary">
              <Upload className="h-3.5 w-3.5" />
              Upload document
            </button>
            <button
              onClick={() => setAiOpen((o) => !o)}
              aria-pressed={aiOpen}
              className={cn(
                "inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-xs font-semibold transition",
                aiOpen
                  ? "bg-primary text-primary-foreground shadow-glow hover:opacity-90"
                  : "border border-border bg-card text-foreground hover:border-primary/50 hover:text-primary",
              )}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {aiOpen ? "Hide AI Copilot" : "Ask AI Copilot"}
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <MiniKpi icon={FileStack} label="Indexed" value={String(totalDocs)} />
          <MiniKpi
            icon={ClipboardCheck}
            label="Need review"
            value={String(needApproval)}
            tone="text-warning"
          />
          <MiniKpi
            icon={ScanLine}
            label="Avg. confidence"
            value={`${avgConf}%`}
            tone={confColor(avgConf)}
          />
          <MiniKpi icon={CheckCircle2} label="Auto-classified" value="96%" tone="text-success" />
        </div>

        {/* Workspace — responsive grid: fixed rail · fluid center · dockable AI panel */}
        <div
          className={cn(
            "grid grid-cols-1 items-start gap-6 lg:gap-8",
            aiOpen
              ? "lg:grid-cols-[272px_minmax(0,1fr)_360px]"
              : "lg:grid-cols-[272px_minmax(0,1fr)]",
          )}
        >
          {/* Left rail — document list */}
          <div className="lg:sticky lg:top-6">
            <DocumentBrowser
              query={query}
              setQuery={setQuery}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              documentsList={filtered}
              selectedId={selected.id}
              onSelect={setSelectedId}
            />
          </div>

          {/* Center — the document (primary focus) */}
          <div className="min-w-0 space-y-6">
            <DocumentViewer doc={selected} />
            <ExtractedFieldsCard doc={selected} />
            {selected.matrix && <AnalysisMatrixCard doc={selected} />}
            <AiSummaryCard doc={selected} />
            <ExtractedRisksCard doc={selected} />
            <ActionItemsCard doc={selected} />
            <RelatedDocumentsCard doc={selected} onSelect={setSelectedId} />
          </div>

          {/* Right — dockable AI copilot */}
          {aiOpen && (
            <div className="min-w-0 lg:sticky lg:top-6">
              <AskAiPanel doc={selected} onClose={() => setAiOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

function MiniKpi({
  icon: Icon,
  label,
  value,
  tone = "text-foreground",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <div className={cn(PANEL, "flex items-center gap-3 p-3")}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <div className="truncate text-[11px] uppercase tracking-wide text-muted-foreground">
          {label}
        </div>
        <div className={cn("text-lg font-semibold tabular-nums", tone)}>{value}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────  Left: Smart Search + Browser  ───────────────────────── */

function DocumentBrowser({
  query,
  setQuery,
  typeFilter,
  setTypeFilter,
  documentsList,
  selectedId,
  onSelect,
}: {
  query: string;
  setQuery: (v: string) => void;
  typeFilter: "all" | DocType;
  setTypeFilter: (v: "all" | DocType) => void;
  documentsList: DocumentItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const types: DocType[] = [
    "contract",
    "nda",
    "compliance-filing",
    "court-filing",
    "due-diligence-memo",
  ];

  return (
    <section className={cn(PANEL, "flex max-h-[calc(100vh-7rem)] flex-col")}>
      <div className="space-y-3 border-b border-border p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Smart search — party, type, tag…"
            className="h-9 w-full rounded-md border border-border bg-muted/40 pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <FilterChip active={typeFilter === "all"} onClick={() => setTypeFilter("all")}>
            All
          </FilterChip>
          {types.map((t) => (
            <FilterChip key={t} active={typeFilter === t} onClick={() => setTypeFilter(t)}>
              {docTypeMeta[t].plural}
            </FilterChip>
          ))}
        </div>
        <div className="text-[11px] text-muted-foreground">
          {documentsList.length} result{documentsList.length === 1 ? "" : "s"}
        </div>
      </div>
      <ul className="flex-1 divide-y divide-border overflow-y-auto">
        {documentsList.map((d) => {
          const Icon = docTypeIcon[d.type];
          const active = d.id === selectedId;
          return (
            <li key={d.id}>
              <button
                onClick={() => onSelect(d.id)}
                className={cn(
                  "flex w-full gap-3 border-l-2 px-4 py-3 text-left transition-colors",
                  active
                    ? "border-l-primary bg-accent/40"
                    : "border-l-transparent hover:bg-accent/20",
                )}
              >
                <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", docTypeColor[d.type])} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{d.title}</div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="truncate">{d.party}</span>
                    <span>·</span>
                    <span className="font-mono">{d.amount}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span
                      className={cn(
                        "inline-block rounded border px-1.5 py-0.5 text-[9px] uppercase tracking-wider",
                        toneBadgeCls(d.statusTone),
                      )}
                    >
                      {d.status}
                    </span>
                    <span
                      className={cn(
                        "text-[9px] font-semibold tabular-nums",
                        confColor(d.confidence),
                      )}
                    >
                      {d.confidence}%
                    </span>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
        {documentsList.length === 0 && (
          <li className="px-4 py-10 text-center text-sm text-muted-foreground">
            No documents match this search.
          </li>
        )}
      </ul>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:bg-accent/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

/* ─────────────────────────  Center: Document Viewer  ───────────────────────── */

function DocumentViewer({ doc }: { doc: DocumentItem }) {
  const Icon = docTypeIcon[doc.type];
  return (
    <section className={PANEL}>
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-muted/50">
            <Icon className={cn("h-5 w-5", docTypeColor[doc.type])} />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-semibold leading-snug">{doc.title}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" /> {doc.party}
              </span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" /> {doc.author}
              </span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {doc.date}
              </span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1">
                <FileStack className="h-3 w-3" /> {doc.pages}pg · {(doc.sizeKb / 1024).toFixed(1)}MB
              </span>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex items-center gap-2">
            <ConfidenceRing value={doc.confidence} />
            <div className="hidden sm:block">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Extraction
              </div>
              <div className={cn("text-xs font-semibold", confColor(doc.confidence))}>
                confidence
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {[Download, Printer, Share2].map((Btn, i) => (
              <button
                key={i}
                className="grid h-8 w-8 place-items-center rounded-md border border-border text-muted-foreground transition hover:bg-accent/40 hover:text-foreground"
              >
                <Btn className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="bg-muted/20 p-6">
        <TextPreview doc={doc} />
      </div>

      <div className="flex flex-wrap items-center gap-1.5 border-t border-border px-5 py-2.5">
        <span
          className={cn(
            "rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider",
            toneBadgeCls(doc.statusTone),
          )}
        >
          {doc.status}
        </span>
        {doc.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

function TextPreview({ doc }: { doc: DocumentItem }) {
  return (
    <div className="min-h-[240px] w-full rounded-md border border-border bg-card p-8 shadow-elegant">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {docTypeMeta[doc.type].label} · {doc.id.toUpperCase()}
        </div>
        <div className="font-mono text-sm font-semibold text-primary">{doc.amount}</div>
      </div>
      <div className="space-y-3">
        {doc.previewLines.map((line, i) => {
          const isHeading = line === line.toUpperCase() && line.length < 40;
          return (
            <p
              key={i}
              className={
                isHeading
                  ? "pt-2 text-xs font-semibold tracking-wider text-primary"
                  : "text-sm leading-relaxed text-foreground/90"
              }
            >
              {line}
            </p>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────  Extracted Fields  ───────────────────────── */

function ExtractedFieldsCard({ doc }: { doc: DocumentItem }) {
  const low = doc.fields.filter((f) => f.confidence < 80).length;
  return (
    <section className={PANEL}>
      <SectionHeader
        icon={ScanLine}
        title="Extracted Fields"
        hint={`${doc.fields.length} fields · ${low} need review`}
        right={
          <span className="rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            OCR + AI
          </span>
        }
      />
      <div className="grid grid-cols-1 gap-x-8 gap-y-4 p-5 sm:grid-cols-2 xl:grid-cols-3">
        {doc.fields.map((f) => (
          <div key={f.label} className="min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {f.label}
              </span>
              <span
                className={cn("text-[10px] font-semibold tabular-nums", confColor(f.confidence))}
              >
                {f.confidence}%
              </span>
            </div>
            <div className="mt-0.5 truncate text-sm font-medium text-foreground">{f.value}</div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full rounded-full", confBar(f.confidence))}
                style={{ width: `${f.confidence}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────  Analysis Matrix (clause / control / citation / workstream)  ───────────────────────── */

function AnalysisMatrixCard({ doc }: { doc: DocumentItem }) {
  const matrix = doc.matrix;
  if (!matrix) return null;
  return (
    <section className={PANEL}>
      <SectionHeader icon={Table2} title={matrix.title} hint={matrix.hint} />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-2 font-medium">{matrix.headers[0]}</th>
              <th className="px-5 py-2 font-medium">{matrix.headers[1]}</th>
              <th className="px-5 py-2 font-medium">{matrix.headers[2]}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {matrix.rows.map((r, i) => (
              <tr key={i}>
                <td className="px-5 py-2.5">
                  <div className="font-medium">{r.primary}</div>
                  {r.secondary && (
                    <div className="text-xs text-muted-foreground">{r.secondary}</div>
                  )}
                </td>
                <td className="px-5 py-2.5">
                  {r.status && (
                    <span
                      className={cn(
                        "inline-block rounded border px-1.5 py-0.5 text-[10px] uppercase tracking-wider",
                        toneBadgeCls(r.statusTone ?? "neutral"),
                      )}
                    >
                      {r.status}
                    </span>
                  )}
                </td>
                <td className="px-5 py-2.5 text-xs text-muted-foreground">{r.note ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ─────────────────────────  AI Summary  ───────────────────────── */

function renderBold(text: string) {
  return text.split(/(\*\*.+?\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function AiSummaryCard({ doc }: { doc: DocumentItem }) {
  return (
    <section className={PANEL}>
      <SectionHeader
        icon={Sparkles}
        title="AI Summary"
        hint="Synthesized directly from this document"
      />
      <div className="p-5">
        <p className="text-sm leading-relaxed">{renderBold(doc.aiSummary.text)}</p>
        <ul className="mt-3 space-y-1.5">
          {doc.aiSummary.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-xs leading-relaxed text-foreground/90">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────────────  Extracted Risks  ───────────────────────── */

function ExtractedRisksCard({ doc }: { doc: DocumentItem }) {
  return (
    <section className={PANEL}>
      <SectionHeader
        icon={AlertTriangle}
        title="Extracted Risks"
        hint={`${doc.risks.length} risk signal(s) found by Copilot`}
      />
      <ul className="divide-y divide-border">
        {doc.risks.map((r, i) => (
          <li key={i} className="flex items-start gap-3 px-5 py-3">
            <span
              className={cn(
                "mt-0.5 shrink-0 rounded border px-1.5 py-0.5 text-[9px] uppercase tracking-wider",
                toneBadgeCls(severityTone[r.severity]),
              )}
            >
              {r.severity}
            </span>
            <p className="text-xs leading-relaxed text-foreground/90">{r.text}</p>
          </li>
        ))}
        {doc.risks.length === 0 && (
          <li className="px-5 py-6 text-center text-xs text-muted-foreground">
            No risks were extracted from this document.
          </li>
        )}
      </ul>
    </section>
  );
}

/* ─────────────────────────  Action Items  ───────────────────────── */

function ActionItemsCard({ doc }: { doc: DocumentItem }) {
  const [done, setDone] = useState<Set<number>>(
    () => new Set(doc.actionItems.map((a, i) => (a.done ? i : -1)).filter((i) => i >= 0)),
  );

  return (
    <section className={PANEL}>
      <SectionHeader
        icon={CheckCircle2}
        title="Action Items"
        hint="Tracked to closure by Copilot"
      />
      <ul className="divide-y divide-border">
        {doc.actionItems.map((a, i) => {
          const isDone = done.has(i);
          return (
            <li key={i} className="flex items-start gap-3 px-5 py-3">
              <button
                onClick={() =>
                  setDone((s) => {
                    const next = new Set(s);
                    if (next.has(i)) next.delete(i);
                    else next.add(i);
                    return next;
                  })
                }
                className="mt-0.5 shrink-0"
                aria-label={isDone ? "Mark as not done" : "Mark as done"}
              >
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                )}
              </button>
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "text-sm",
                    isDone ? "text-muted-foreground line-through" : "text-foreground/90",
                  )}
                >
                  {a.text}
                </p>
                <div className="mt-0.5 text-[11px] text-muted-foreground">
                  {a.owner} · Due {a.due}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ─────────────────────────  Related Documents  ───────────────────────── */

function RelatedDocumentsCard({
  doc,
  onSelect,
}: {
  doc: DocumentItem;
  onSelect: (id: string) => void;
}) {
  const related = getDocumentsByIds(doc.relatedIds);
  return (
    <section className={PANEL}>
      <SectionHeader
        icon={FileStack}
        title="Related Documents"
        hint="Linked by party and category"
      />
      <div className="grid grid-cols-1 gap-2.5 p-4 md:grid-cols-3">
        {related.map((r) => {
          const Icon = docTypeIcon[r.type];
          return (
            <button
              key={r.id}
              onClick={() => onSelect(r.id)}
              className="rounded-lg border border-border bg-muted/20 p-3 text-left transition hover:-translate-y-0.5 hover:border-primary/40"
            >
              <Icon className={cn("h-4 w-4", docTypeColor[r.type])} />
              <div className="mt-2 line-clamp-2 text-xs font-medium leading-snug">{r.title}</div>
              <div className="mt-1 truncate text-[10px] text-muted-foreground">{r.party}</div>
            </button>
          );
        })}
        {related.length === 0 && (
          <div className="col-span-full py-4 text-center text-sm text-muted-foreground">
            No related documents found for this item.
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────  Right: Ask AI About This Document  ───────────────────────── */

interface AssistantMsg {
  role: "user" | "assistant";
  text: string;
}

function AskAiPanel({ doc, onClose }: { doc: DocumentItem; onClose?: () => void }) {
  const [messages, setMessages] = useState<AssistantMsg[]>([]);
  const [input, setInput] = useState("");

  const reply = (q: string): string => {
    const p = q.toLowerCase();
    if (p.includes("risk"))
      return doc.risks.length
        ? `${doc.risks.length} risk(s) found: ${doc.risks.map((r) => r.text).join(" ")}`
        : "No risks were extracted from this document.";
    if (p.includes("action") || p.includes("todo") || p.includes("next"))
      return `${doc.actionItems.length} action item(s): ${doc.actionItems
        .map((a) => `${a.text} (owner: ${a.owner}, due ${a.due})`)
        .join(" ")}`;
    if (
      p.includes("clause") ||
      p.includes("mapping") ||
      p.includes("control") ||
      p.includes("workstream")
    )
      return doc.matrix
        ? `${doc.matrix.title}: ${doc.matrix.rows
            .map(
              (r) =>
                `${r.primary}${r.status ? ` (${r.status})` : ""}${r.note ? ` — ${r.note}` : ""}`,
            )
            .join("; ")}.`
        : "No structured analysis was generated for this document type.";
    if (p.includes("amount") || p.includes("value") || p.includes("how much"))
      return `The recorded value on this ${docTypeMeta[doc.type].label.toLowerCase()} is ${doc.amount}.`;
    if (p.includes("confidence") || p.includes("sure") || p.includes("accurate"))
      return `Overall extraction confidence is ${doc.confidence}%. Lowest-confidence field: ${
        doc.fields.reduce((a, b) => (b.confidence < a.confidence ? b : a)).label
      }.`;
    if (p.includes("summary") || p.includes("about") || p.includes("what is"))
      return doc.aiSummary.text.replace(/\*\*/g, "");
    if (p.includes("related") || p.includes("similar"))
      return `Related documents: ${
        getDocumentsByIds(doc.relatedIds)
          .map((r) => r.title)
          .join(", ") || "none found"
      }.`;
    if (p.includes("status"))
      return `This document is currently "${doc.status}", last touched ${doc.date} by ${doc.author}.`;
    return doc.aiSummary.text.replace(/\*\*/g, "");
  };

  const send = (text?: string) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }, { role: "assistant", text: reply(q) }]);
    setInput("");
  };

  const suggestions = [
    "Summarize this",
    "Any risks?",
    "Show the clause mapping",
    "How confident are you?",
  ];

  return (
    <section className={cn(PANEL, "flex max-h-[calc(100vh-7rem)] flex-col")}>
      <SectionHeader
        icon={Sparkles}
        title="Ask AI About This Document"
        hint={doc.title}
        right={
          onClose ? (
            <button
              onClick={onClose}
              aria-label="Close AI Copilot"
              className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition hover:bg-accent/40 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          ) : undefined
        }
      />
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-xs leading-relaxed text-muted-foreground">
              Ask Copilot anything about{" "}
              <span className="font-medium text-foreground">{doc.title}</span> — try one of these:
            </p>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="flex w-full items-center justify-between rounded-md border border-border px-3 py-2 text-left text-xs transition-colors hover:border-primary/40 hover:bg-accent/20"
              >
                {s}
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              </button>
            ))}
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[90%] rounded-lg px-3 py-2 text-xs leading-relaxed",
                m.role === "user"
                  ? "rounded-tr-sm bg-primary text-primary-foreground"
                  : "rounded-tl-sm border border-border bg-muted/40",
              )}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="flex items-center gap-2 border-t border-border p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about this document…"
          className="h-9 flex-1 rounded-md border border-border bg-muted/40 px-3 text-xs outline-none transition placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground shadow-glow transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </section>
  );
}
