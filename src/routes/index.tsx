import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Gavel, Sparkles, ShieldCheck, Zap, ArrowRight, Check, AlertTriangle,
  ScrollText, Scale, FileCheck2, Building2, ClipboardList, AlertOctagon,
  FileText, Users, Lock, Cable, BrainCircuit, Workflow, ChevronRight, Circle,
} from "lucide-react";
import {
  MicrosoftLogo, GoogleDriveLogo, SharePointLogo, DropboxLogo, SlackLogo,
  SalesforceLogo, DocuSignLogo, AdobeLogo, NotionLogo, JiraLogo, TeamsLogo,
  OutlookLogo, GitHubLogo, GmailLogo, OneDriveLogo, BoxLogo,
} from "@/components/brand/logos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Legal AI OS — The AI Operating System for Legal" },
      { name: "description", content: "Enterprise AI for contract review, legal research, compliance and due diligence. AI works, lawyers approve." },
    ],
  }),
  component: Landing,
});

const nav = [
  { href: "#why", label: "Why Us" },
  { href: "#copilots", label: "Copilots" },
  { href: "#integrations", label: "Services" },
  { href: "/about", label: "About" },
  { href: "#pricing", label: "Pricing" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary/15 border border-primary/30 grid place-items-center shadow-glow">
              <Gavel className="h-4 w-4 text-primary" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Industry AI OS</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-[0.14em]">Legal Edition</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-foreground transition-colors">{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden sm:inline-flex items-center px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg">
              Login
            </Link>
            <Link to="/book-demo" className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 shadow-glow">
              Book Demo <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
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
              Automate contract review, legal research, compliance monitoring and document intelligence.
              AI performs the repetitive work while lawyers remain in complete control through human approval.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book-demo" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 shadow-glow">
                Book Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#copilots" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl glass text-sm font-medium hover:bg-accent/60">
                See Copilots
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Human Approval Required","Enterprise Security","Microsoft 365","SharePoint","Google Drive"].map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground">
                  <Check className="h-3 w-3 text-primary" /> {c}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Floating Dashboard */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative">
            <div className="absolute -inset-6 bg-gradient-to-tr from-primary/15 via-transparent to-chart-5/10 blur-3xl" />
            <div className="relative glass-strong rounded-2xl p-5 shadow-elegant animate-float">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-primary/20 grid place-items-center"><ScrollText className="h-3.5 w-3.5 text-primary" /></div>
                  <div>
                    <div className="text-sm font-semibold">Contract Review</div>
                    <div className="text-[10px] text-muted-foreground">MSA — Acme Corp · 42 clauses</div>
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
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.l}</div>
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
                      {c.ok ? <Check className="h-4 w-4 text-success" /> : <AlertTriangle className="h-4 w-4 text-warning" />}
                      <span className={c.ok ? "text-foreground" : "text-warning"}>{c.t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Approve Contract</button>
                <button className="h-10 px-4 rounded-lg border border-border text-sm hover:bg-accent">Review</button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-primary/80">Why Legal Teams Choose Us</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-gradient">
            An operating system, not another point tool.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { i: ScrollText, t: "AI Contract Review", d: "Extract clauses, flag risk and benchmark against your playbook in seconds." },
            { i: ShieldCheck, t: "Compliance Ready", d: "SOC 2 · ISO 27001 · GDPR · HIPAA — monitored continuously." },
            { i: Lock, t: "Enterprise Security", d: "Private tenants, SSO/SAML, KMS-encrypted at rest and in transit." },
            { i: Scale, t: "Legal Research", d: "Cite-checked answers grounded in case law and statutes." },
            { i: Users, t: "Human Approval", d: "Every material action routes through the right lawyer, with audit trail." },
            { i: Cable, t: "Fast Integrations", d: "Microsoft 365, Google Drive, SharePoint, DocuSign and 40+ more." },
          ].map((c, i) => (
            <motion.div key={c.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative glass rounded-2xl p-6 hover:border-primary/30 transition-all hover:-translate-y-1">
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
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-gradient">From document to signed contract.</h2>
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
                <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="h-16 w-16 rounded-2xl glass grid place-items-center border-primary/20">
                  <s.i className="h-6 w-6 text-primary" />
                </motion.div>
                <div className="mt-3 text-sm font-medium">{s.l}</div>
                {i < arr.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px -translate-x-1/2">
                    <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="h-px bg-gradient-to-r from-primary/40 to-transparent origin-left" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section id="integrations" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-primary/80">Integrations</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-gradient">Works with your entire stack.</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { L: MicrosoftLogo, n: "Microsoft 365" }, { L: GoogleDriveLogo, n: "Google Drive" },
            { L: SharePointLogo, n: "SharePoint" }, { L: DropboxLogo, n: "Dropbox" },
            { L: SlackLogo, n: "Slack" }, { L: SalesforceLogo, n: "Salesforce" },
            { L: DocuSignLogo, n: "DocuSign" }, { L: AdobeLogo, n: "Adobe" },
            { L: NotionLogo, n: "Notion" }, { L: JiraLogo, n: "Jira" },
            { L: TeamsLogo, n: "Teams" }, { L: OutlookLogo, n: "Outlook" },
            { L: GitHubLogo, n: "GitHub" }, { L: GmailLogo, n: "Gmail" },
            { L: OneDriveLogo, n: "OneDrive" }, { L: BoxLogo, n: "Box" },
          ].map(({ L, n }) => (
            <div key={n} className="group glass rounded-2xl p-4 flex flex-col items-center gap-2 hover:border-primary/30 hover:-translate-y-1 transition-all">
              <L className="h-8 w-8 group-hover:scale-110 transition-transform" />
              <div className="text-[11px] text-muted-foreground truncate w-full text-center">{n}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COPILOTS */}
      <section id="copilots" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-primary/80">Legal Copilot Library</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-gradient">A copilot for every legal workflow.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { to: "/copilots/contract-review", i: ScrollText, t: "Contract Review", d: "Clause extraction, playbook comparison, risk scoring." },
            { to: "/copilots/legal-research", i: Scale, t: "Legal Research", d: "Case law and statute search with cited AI summaries." },
            { to: "/copilots/compliance", i: ShieldCheck, t: "Compliance", d: "GDPR · CCPA · SOC 2 · HIPAA monitoring." },
            { to: "/copilots/due-diligence", i: Building2, t: "Due Diligence", d: "Data-room ingestion and red-flag reports." },
            { to: "/copilots/nda-review", i: FileCheck2, t: "NDA Review", d: "Auto-triage and negotiate NDAs at scale." },
            { to: "/copilots/policy-review", i: ClipboardList, t: "Policy Review", d: "Draft and benchmark internal policies." },
            { to: "/copilots/contract-review", i: Users, t: "Employment Agreements", d: "Offer letters, PIIA, severance." },
            { to: "/copilots/risk-assessment", i: AlertOctagon, t: "Risk Assessment", d: "Portfolio-wide risk heatmaps." },
            { to: "/documents", i: FileText, t: "Document Generator", d: "Template library with variables and clause bank." },
          ].map((c) => (
            <Link key={c.t} to={c.to} className="group glass rounded-2xl p-6 hover:border-primary/30 hover:-translate-y-1 transition-all flex flex-col">
              <div className="flex items-center justify-between">
                <div className="h-11 w-11 rounded-xl bg-primary/15 border border-primary/25 grid place-items-center group-hover:shadow-glow">
                  <c.i className="h-5 w-5 text-primary" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{c.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* PRICING TEASER / CTA */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24">
        <div className="glass-strong rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-chart-5/5" />
          <div className="relative">
            <Zap className="h-8 w-8 text-primary mx-auto" />
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-gradient">Ready to see it in action?</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              A 30-minute tailored demo on your own contracts — under strict NDA.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/book-demo" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-glow hover:opacity-90">
                Book Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/dashboard" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl glass text-sm font-medium hover:bg-accent/60">
                Try Live Prototype
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 grid place-items-center">
                <Gavel className="h-4 w-4 text-primary" />
              </div>
              <div className="font-semibold">Industry AI OS</div>
            </div>
            <p className="mt-3 text-muted-foreground">The AI Operating System for Legal Teams.</p>
          </div>
          <div>
            <div className="font-medium mb-3">Product</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/copilots/contract-review">Copilots</Link></li>
              <li><Link to="/connectors">Integrations</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-medium mb-3">Company</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/book-demo">Book Demo</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-medium mb-3">Trust</div>
            <ul className="space-y-2 text-muted-foreground">
              <li>SOC 2 Type II</li>
              <li>ISO 27001</li>
              <li>GDPR · HIPAA</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
          © 2026 Industry AI OS · Legal Edition. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
