import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/AppLayout";
import { Building2, FileText, AlertOctagon, CheckCircle2, Folder } from "lucide-react";

export const Route = createFileRoute("/copilots/due-diligence")({
  head: () => ({ meta: [{ title: "Due Diligence Copilot · Legal AI OS" }] }),
  component: DD,
});

function DD() {
  return (
    <AppLayout title="Due Diligence Copilot">
      <PageHeader
        title="Due Diligence Copilot"
        description="Ingest data rooms, generate red-flag reports and track diligence workstreams."
      />

      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-primary/15 grid place-items-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-lg font-semibold">Project Meridian</div>
              <div className="text-xs text-muted-foreground">
                Target: Meridian Data Corp · Buyer: Ashford Holdings · $184M
              </div>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-primary/15 text-primary text-xs">
            In diligence · Day 12/30
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3 mt-6">
          {[
            { l: "Documents", v: "218", i: FileText },
            { l: "Reviewed", v: "184", i: CheckCircle2, c: "success" },
            { l: "Red Flags", v: "7", i: AlertOctagon, c: "danger" },
            { l: "Workstreams", v: "12", i: Folder },
          ].map((k) => (
            <div key={k.l} className="rounded-xl border border-border p-4">
              <div
                className={`h-8 w-8 rounded-lg grid place-items-center ${k.c === "success" ? "bg-success/15" : k.c === "danger" ? "bg-danger/15" : "bg-primary/15"}`}
              >
                <k.i
                  className={`h-4 w-4 ${k.c === "success" ? "text-success" : k.c === "danger" ? "text-danger" : "text-primary"}`}
                />
              </div>
              <div className="mt-3 text-2xl font-semibold">{k.v}</div>
              <div className="text-xs text-muted-foreground">{k.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <div className="text-sm font-semibold mb-4">Red-Flag Report</div>
          <div className="space-y-3 text-sm">
            {[
              {
                sev: "high",
                t: "Change-of-control triggers in top 3 customer contracts",
                d: "MSAs with Northwind, Litware and Contoso allow termination on acquisition.",
              },
              {
                sev: "high",
                t: "Unresolved IP assignment for founding engineer",
                d: "No PIIA on file for CTO — potential ownership dispute on core codebase.",
              },
              {
                sev: "medium",
                t: "12 open GDPR data-subject requests overdue",
                d: "Aggregate exposure up to €48K in supervisory-authority fines.",
              },
              {
                sev: "medium",
                t: "Related-party lease with founder's entity",
                d: "Above-market rent; requires board reset post-close.",
              },
              {
                sev: "low",
                t: "Non-compete duration inconsistent across 8 sales reps",
                d: "Range from 6 to 24 months — enforceability risk in CA hires.",
              },
            ].map((r, i) => (
              <div
                key={i}
                className={`rounded-xl border p-4 ${r.sev === "high" ? "border-danger/30 bg-danger/5" : r.sev === "medium" ? "border-warning/30 bg-warning/5" : "border-border"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">{r.t}</div>
                  <span
                    className={`text-[10px] uppercase px-2 py-0.5 rounded-full ${r.sev === "high" ? "bg-danger/20 text-danger" : r.sev === "medium" ? "bg-warning/20 text-warning" : "bg-muted text-muted-foreground"}`}
                  >
                    {r.sev}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{r.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="text-sm font-semibold mb-4">Workstreams</div>
          <ul className="space-y-3 text-sm">
            {[
              { l: "Corporate & Governance", p: 96 },
              { l: "Material Contracts", p: 78 },
              { l: "Employment & Benefits", p: 64 },
              { l: "IP & Technology", p: 82 },
              { l: "Data & Privacy", p: 71 },
              { l: "Litigation", p: 100 },
              { l: "Tax", p: 45 },
              { l: "Real Estate", p: 90 },
            ].map((w) => (
              <li key={w.l}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{w.l}</span>
                  <span className="text-muted-foreground">{w.p}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-success"
                    style={{ width: `${w.p}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}
