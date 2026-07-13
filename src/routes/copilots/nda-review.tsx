import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/AppLayout";
import { FileCheck2, Check, Zap, Upload } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/copilots/nda-review")({
  head: () => ({ meta: [{ title: "NDA Review Copilot · Legal AI OS" }] }),
  component: NDA,
});

const queue = [
  { id: "N-441", name: "Mutual NDA — Tailspin Toys", state: "auto-approved", conf: 99, risk: "low" },
  { id: "N-440", name: "One-way NDA — Litware Inc.", state: "auto-approved", conf: 98, risk: "low" },
  { id: "N-439", name: "Mutual NDA — Wingtip Partners", state: "needs review", conf: 84, risk: "medium" },
  { id: "N-438", name: "One-way NDA — Adventure Works", state: "auto-approved", conf: 97, risk: "low" },
  { id: "N-437", name: "Mutual NDA — Contoso Ltd", state: "needs review", conf: 79, risk: "high" },
  { id: "N-436", name: "Employee NDA — J. Rodriguez", state: "auto-approved", conf: 99, risk: "low" },
];

function NDA() {
  return (
    <AppLayout title="NDA Review Copilot">
      <PageHeader title="NDA Review Copilot" description="Auto-triage and negotiate NDAs at scale. Only edge cases reach your desk."
        actions={<button className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium inline-flex items-center gap-2 shadow-glow"><Upload className="h-4 w-4"/>Upload NDAs</button>}/>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { l: "Processed today", v: "48", i: FileCheck2 },
          { l: "Auto-approved", v: "42", i: Check, color: "success" },
          { l: "Needs review", v: "6", i: Zap, color: "warning" },
          { l: "Avg time", v: "42s", i: FileCheck2 },
        ].map(k => (
          <div key={k.l} className="glass rounded-2xl p-5">
            <div className={`h-9 w-9 rounded-lg grid place-items-center ${k.color === "success" ? "bg-success/15" : k.color === "warning" ? "bg-warning/15" : "bg-primary/15"}`}>
              <k.i className={`h-4 w-4 ${k.color === "success" ? "text-success" : k.color === "warning" ? "text-warning" : "text-primary"}`}/>
            </div>
            <div className="mt-4 text-2xl font-semibold">{k.v}</div>
            <div className="text-xs text-muted-foreground">{k.l}</div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="text-sm font-semibold mb-4">Batch Queue</div>
        <div className="space-y-2">
          {queue.map((n, i) => (
            <motion.div key={n.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
              className="flex items-center gap-4 rounded-xl border border-border p-4 hover:border-primary/30">
              <div className={`h-9 w-9 rounded-lg grid place-items-center ${n.state === "auto-approved" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                {n.state === "auto-approved" ? <Check className="h-4 w-4"/> : <Zap className="h-4 w-4"/>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{n.name}</div>
                <div className="text-[11px] text-muted-foreground">{n.id} · confidence {n.conf}%</div>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${n.risk === "high" ? "bg-danger/15 text-danger" : n.risk === "medium" ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}`}>{n.risk}</span>
              <Link to="/copilots/contract-review" className="text-xs text-primary hover:underline">Open →</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
