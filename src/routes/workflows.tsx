import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/AppLayout";
import {
  Upload,
  BrainCircuit,
  Sparkles,
  AlertOctagon,
  Users,
  Bell,
  ArrowRight,
  Plus,
} from "lucide-react";

export const Route = createFileRoute("/workflows")({
  head: () => ({ meta: [{ title: "Workflows · Legal AI OS" }] }),
  component: Workflows,
});

const nodes = [
  { i: Upload, l: "Upload", d: "SharePoint watcher" },
  { i: BrainCircuit, l: "OCR", d: "Extract & classify" },
  { i: Sparkles, l: "AI Analysis", d: "Clause + risk scoring" },
  { i: AlertOctagon, l: "Risk Rules", d: "Playbook check" },
  { i: Users, l: "Human Review", d: "Route by contract type" },
  { i: Bell, l: "Notify", d: "Slack + email" },
];

function Workflows() {
  return (
    <AppLayout title="Workflows">
      <PageHeader
        title="Workflow Builder"
        description="Compose end-to-end legal automations with human approval built in."
        actions={
          <button className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium inline-flex items-center gap-2 shadow-glow">
            <Plus className="h-4 w-4" />
            New Workflow
          </button>
        }
      />

      <div className="glass rounded-2xl p-8 overflow-x-auto">
        <div className="flex items-stretch gap-3 min-w-max">
          {nodes.map((n, i) => (
            <div key={n.l} className="flex items-center gap-3">
              <div className="w-48 rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-colors cursor-grab">
                <div className="h-9 w-9 rounded-lg bg-primary/15 grid place-items-center">
                  <n.i className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-3 text-sm font-semibold">{n.l}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{n.d}</div>
              </div>
              {i < nodes.length - 1 && <ArrowRight className="h-4 w-4 text-primary shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <div className="glass rounded-2xl p-6">
          <div className="text-sm font-semibold mb-3">Active Workflows</div>
          <ul className="space-y-2 text-sm">
            {[
              { n: "Vendor Contract Intake", runs: "184 runs · 98% success" },
              { n: "NDA Auto-Triage", runs: "421 runs · 99% success" },
              { n: "DPA Monthly Review", runs: "28 runs · 100% success" },
              { n: "Employment Offer QA", runs: "56 runs · 96% success" },
            ].map((w) => (
              <li key={w.n} className="flex justify-between rounded-lg border border-border p-3">
                <div>
                  <div className="font-medium">{w.n}</div>
                  <div className="text-[11px] text-muted-foreground">{w.runs}</div>
                </div>
                <span className="text-[11px] text-success">running</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-2xl p-6">
          <div className="text-sm font-semibold mb-3">Node Library</div>
          <div className="grid grid-cols-2 gap-2">
            {nodes.map((n) => (
              <div
                key={n.l}
                className="rounded-lg border border-border p-3 flex items-center gap-2 hover:border-primary/30 cursor-grab"
              >
                <n.i className="h-4 w-4 text-primary" />
                <span className="text-xs">{n.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
