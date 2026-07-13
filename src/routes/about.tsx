import { createFileRoute, Link } from "@tanstack/react-router";
import { Gavel, BrainCircuit, Cable, Users, Shield, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About · Legal AI OS" }] }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 backdrop-blur-xl bg-background/70 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary/15 border border-primary/30 grid place-items-center"><Gavel className="h-4 w-4 text-primary"/></div>
            <span className="text-sm font-semibold">Industry AI OS</span>
          </Link>
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"><ArrowLeft className="h-3.5 w-3.5"/>Back home</Link>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-xs uppercase tracking-[0.2em] text-primary/80">About</div>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-gradient">Software that thinks like a lawyer — and never signs without one.</h1>
        <div className="mt-10 space-y-10">
          <Section title="Our Mission" body="Free legal teams from repetitive work so they can focus on judgment, strategy and advocacy. AI does the reading. Lawyers do the deciding."/>
          <Section title="Our Vision" body="Every regulated industry deserves an operating system that unifies AI, workflow and human approval. Legal is where we begin."/>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { i: BrainCircuit, t: "AI Engine", d: "Fine-tuned legal LLMs with retrieval over your playbooks, clauses, precedents and case law." },
              { i: Cable, t: "Connector Layer", d: "40+ integrations — Microsoft 365, Google Workspace, DocuSign, Salesforce, Jira and more." },
              { i: Users, t: "Human Approval Layer", d: "Every material action routes to the right lawyer with a full audit trail. AI proposes, humans dispose." },
              { i: Shield, t: "Security & Trust", d: "Private-tenant deployments, SSO/SAML, KMS-encrypted, SOC 2 Type II · ISO 27001 · GDPR · HIPAA." },
            ].map(f => (
              <div key={f.t} className="glass rounded-2xl p-6">
                <div className="h-10 w-10 rounded-xl bg-primary/15 grid place-items-center"><f.i className="h-4 w-4 text-primary"/></div>
                <div className="mt-3 text-lg font-semibold">{f.t}</div>
                <div className="text-sm text-muted-foreground mt-1">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-primary/80">{title}</div>
      <p className="mt-2 text-xl text-foreground/90 leading-relaxed">{body}</p>
    </div>
  );
}
