import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/AppLayout";
import { approvals } from "@/lib/legal-data";
import { Check, X, MessageSquare, Clock } from "lucide-react";

export const Route = createFileRoute("/approvals")({
  head: () => ({ meta: [{ title: "Approvals · Legal AI OS" }] }),
  component: Approvals,
});

function Approvals() {
  return (
    <AppLayout title="Approvals">
      <PageHeader
        title="Approval Queue"
        description="Every material AI action routes here for human approval, with full audit trail."
      />
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-3">
          {approvals.map((a) => (
            <div key={a.id} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider">
                    {a.type} · {a.id}
                  </div>
                  <div className="text-lg font-semibold mt-0.5">{a.subject}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Requested by {a.requester} · waiting {a.waiting}
                  </div>
                </div>
                <span
                  className={`shrink-0 text-[11px] px-2 py-1 rounded-full ${a.urgency === "high" ? "bg-danger/15 text-danger" : a.urgency === "medium" ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground"}`}
                >
                  {a.urgency}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 inline-flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Approve
                </button>
                <button className="h-9 px-4 rounded-lg border border-warning/40 text-warning text-sm inline-flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Comment
                </button>
                <button className="h-9 px-4 rounded-lg border border-border text-sm inline-flex items-center gap-2">
                  <X className="h-4 w-4" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="glass rounded-2xl p-6">
          <div className="text-sm font-semibold flex items-center gap-2 mb-4">
            <Clock className="h-4 w-4 text-primary" />
            Timeline
          </div>
          <ol className="relative border-l border-border ml-2 space-y-4 text-sm">
            {[
              { t: "2m ago", a: "S. Miller approved NDA — Tailspin Toys" },
              { t: "18m ago", a: "R. Kimura commented on DPA — Contoso" },
              { t: "1h ago", a: "L. Chen submitted MSA — Acme for review" },
              { t: "3h ago", a: "AI flagged 3 non-standard clauses" },
              { t: "Yesterday", a: "Batch of 12 NDAs auto-approved" },
            ].map((e, i) => (
              <li key={i} className="pl-4">
                <div className="absolute -left-1.5 h-3 w-3 rounded-full bg-primary" />
                <div className="text-xs text-muted-foreground">{e.t}</div>
                <div>{e.a}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </AppLayout>
  );
}
