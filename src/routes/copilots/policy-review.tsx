import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/AppLayout";
import { ClipboardList, FileText, Sparkles, GitCompare } from "lucide-react";

export const Route = createFileRoute("/copilots/policy-review")({
  head: () => ({ meta: [{ title: "Policy Review Copilot · Legal AI OS" }] }),
  component: PolicyReview,
});

const policies = [
  { name: "Vendor Onboarding Policy", version: "v3.2", updated: "Jun 2026", drift: 4 },
  { name: "Acceptable Use Policy", version: "v5.1", updated: "May 2026", drift: 1 },
  { name: "Data Retention & Deletion", version: "v2.4", updated: "Apr 2026", drift: 7 },
  { name: "Incident Response Plan", version: "v4.0", updated: "Mar 2026", drift: 2 },
  { name: "Anti-Bribery & Corruption", version: "v1.8", updated: "Feb 2026", drift: 0 },
  { name: "Remote Work Policy", version: "v2.1", updated: "Jan 2026", drift: 3 },
];

function PolicyReview() {
  return (
    <AppLayout title="Policy Review Copilot">
      <PageHeader title="Policy Review Copilot" description="Draft, benchmark and monitor internal policies against evolving regulation."/>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold flex items-center gap-2"><ClipboardList className="h-4 w-4 text-primary"/>Policy Library</div>
            <button className="text-xs text-primary hover:underline">+ New policy</button>
          </div>
          <div className="space-y-2">
            {policies.map(p => (
              <div key={p.name} className="flex items-center gap-4 rounded-xl border border-border p-4 hover:border-primary/30">
                <div className="h-9 w-9 rounded-lg bg-primary/15 grid place-items-center"><FileText className="h-4 w-4 text-primary"/></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-[11px] text-muted-foreground">{p.version} · Updated {p.updated}</div>
                </div>
                <span className={`text-[11px] px-2 py-1 rounded-full ${p.drift === 0 ? "bg-success/15 text-success" : p.drift > 5 ? "bg-danger/15 text-danger" : "bg-warning/15 text-warning"}`}>
                  {p.drift === 0 ? "aligned" : `${p.drift} drift`}
                </span>
                <button className="text-xs text-primary">Review →</button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass rounded-2xl p-6">
            <div className="text-sm font-semibold flex items-center gap-2 mb-3"><Sparkles className="h-4 w-4 text-primary"/>AI Suggestions</div>
            <ul className="text-sm space-y-3">
              <li className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                <div className="text-xs font-semibold text-primary">Data Retention v2.4</div>
                <div className="text-xs text-muted-foreground mt-1">Add EU GDPR 5-year retention exception for audit records per new EDPB guidance.</div>
              </li>
              <li className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                <div className="text-xs font-semibold text-primary">Vendor Onboarding v3.2</div>
                <div className="text-xs text-muted-foreground mt-1">Insert AI supplier questionnaire (EU AI Act Art. 25).</div>
              </li>
            </ul>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="text-sm font-semibold flex items-center gap-2 mb-3"><GitCompare className="h-4 w-4 text-primary"/>Benchmark</div>
            <div className="text-xs text-muted-foreground mb-3">Peer alignment (FTSE 100 legal)</div>
            <div className="space-y-2 text-xs">
              {[
                { l: "Data policies", v: 92 },
                { l: "HR & employment", v: 88 },
                { l: "Anti-corruption", v: 96 },
                { l: "AI governance", v: 71 },
              ].map(b => (
                <div key={b.l}>
                  <div className="flex justify-between"><span>{b.l}</span><span className="text-muted-foreground">{b.v}%</span></div>
                  <div className="h-1.5 bg-muted rounded-full mt-1"><div className="h-full rounded-full bg-primary" style={{width:`${b.v}%`}}/></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
