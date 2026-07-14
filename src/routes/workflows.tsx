import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/AppLayout";
import { workflows } from "@/lib/legal-data";
import { useState } from "react";
import {
  ChevronDown,
  Loader2,
  ClipboardCheck,
  CheckCircle2,
  Workflow as WorkflowIcon,
  Plug,
} from "lucide-react";

export const Route = createFileRoute("/workflows")({
  head: () => ({ meta: [{ title: "Workflows · Legal AI OS" }] }),
  component: Workflows,
});

const STATUS: Record<string, { label: string; badge: string }> = {
  running: { label: "Running", badge: "bg-primary/15 text-primary" },
  awaiting: { label: "Awaiting Approval", badge: "bg-warning/15 text-warning" },
  completed: { label: "Completed", badge: "bg-success/15 text-success" },
  failed: { label: "Failed", badge: "bg-danger/15 text-danger" },
};

const STAGES: Record<string, { label: string; dot: string }> = {
  trigger: { label: "Trigger", dot: "bg-warning" },
  extract: { label: "Extract", dot: "bg-blue-400" },
  match: { label: "Match", dot: "bg-cyan-400" },
  validate: { label: "Validate", dot: "bg-violet-400" },
  approve: { label: "Approve", dot: "bg-purple-400" },
  output: { label: "Output", dot: "bg-success" },
};

const stats = [
  {
    key: "running",
    label: "Running",
    icon: Loader2,
    tone: "text-primary",
    count: workflows.filter((w) => w.status === "running").length,
  },
  {
    key: "awaiting",
    label: "Awaiting Approval",
    icon: ClipboardCheck,
    tone: "text-warning",
    count: workflows.filter((w) => w.status === "awaiting").length,
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircle2,
    tone: "text-success",
    count: workflows.filter((w) => w.status === "completed").length,
  },
  {
    key: "total",
    label: "Total",
    icon: WorkflowIcon,
    tone: "text-foreground",
    count: workflows.length,
  },
];

function Workflows() {
  const [expanded, setExpanded] = useState<string | null>(workflows[0]?.id ?? null);

  return (
    <AppLayout title="Workflows">
      <div className="text-xs font-medium text-primary uppercase tracking-wider flex items-center gap-1.5 mb-2">
        <WorkflowIcon className="h-3.5 w-3.5" />
        Workflows
      </div>
      <PageHeader
        title="Running workflows"
        description="Every durable workflow running across your organization — click one to see its flow and the systems it connects."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.key} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
              {s.label}
              <s.icon className={`h-4 w-4 ${s.tone}`} />
            </div>
            <div className={`mt-2 text-3xl font-semibold ${s.tone}`}>{s.count}</div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.6fr_1fr_1.2fr_0.8fr_1fr] gap-4 px-5 py-3 text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border">
          <div>Workflow</div>
          <div>Status</div>
          <div>Waiting For</div>
          <div>Decision</div>
          <div>Last Updated</div>
        </div>

        {workflows.map((w) => {
          const isOpen = expanded === w.id;
          const status = STATUS[w.status];
          return (
            <div key={w.id} className="border-b border-border last:border-b-0">
              <button
                onClick={() => setExpanded(isOpen ? null : w.id)}
                className="w-full grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1.2fr_0.8fr_1fr] gap-2 md:gap-4 items-center px-5 py-4 text-left hover:bg-accent/30 transition-colors"
              >
                <div className="col-span-2 md:col-span-1 flex items-center gap-2">
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-0" : "-rotate-90"}`}
                  />
                  <div>
                    <div className="text-sm font-semibold">{w.name}</div>
                    <div className="text-[11px] text-muted-foreground">{w.id}</div>
                  </div>
                </div>
                <div>
                  <span
                    className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${status.badge}`}
                  >
                    {status.label}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">{w.waitingFor}</div>
                <div className="text-sm">{w.decision}</div>
                <div className="text-xs text-muted-foreground">{w.lastUpdated}</div>
              </button>

              {isOpen && (
                <div className="px-5 pb-6 pt-1">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
                    Flow
                  </div>
                  <div className="flex items-stretch gap-2 overflow-x-auto pb-2">
                    {w.flow.map((step, i) => {
                      const stage = STAGES[step.stage];
                      return (
                        <div key={step.n} className="flex items-center gap-2 shrink-0">
                          <div className="w-44 rounded-xl border border-border bg-card p-3">
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
                            <div
                              className={`mt-2 text-[10px] uppercase tracking-wider text-muted-foreground`}
                            >
                              {stage.label}
                            </div>
                          </div>
                          {i < w.flow.length - 1 && <div className="h-px w-4 bg-border shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-5 mb-3">
                    Connectors
                  </div>
                  <div className="flex flex-wrap gap-2">
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

                  <div className="flex flex-wrap items-center gap-4 mt-5 pt-4 border-t border-border/60 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {Object.values(STAGES).map((s) => (
                      <span key={s.label} className="inline-flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                        {s.label}
                      </span>
                    ))}
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-warning" />
                      Connector
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
