import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/AppLayout";
import { contracts, clauses } from "@/lib/legal-data";
import { useState } from "react";
import { Search, Filter, Check, AlertTriangle, X, Sparkles, Send, Download, FileText, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/copilots/contract-review")({
  head: () => ({ meta: [{ title: "Contract Review Copilot · Legal AI OS" }] }),
  component: ContractReview,
});

function ContractReview() {
  const [selected, setSelected] = useState(contracts[0]);
  const [filter, setFilter] = useState<string>("all");
  const filtered = contracts.filter(c => filter === "all" || c.status === filter);

  return (
    <AppLayout title="Contract Review Copilot">
      <PageHeader title="Contract Review Copilot" description="Extract clauses, flag risk and route for human approval." />

      <div className="grid grid-cols-12 gap-4 min-h-[calc(100vh-14rem)]">
        {/* LEFT: list */}
        <div className="col-span-12 lg:col-span-3 glass rounded-2xl p-4 flex flex-col">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <input placeholder="Search contracts…" className="w-full h-9 pl-9 pr-3 rounded-lg bg-muted/40 border border-border text-sm focus:outline-none focus:border-primary/40"/>
          </div>
          <div className="flex gap-1.5 mb-3 text-[11px]">
            {["all","pending","approved","rejected"].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-2.5 py-1 rounded-md capitalize ${filter===f ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-accent"}`}>{f}</button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto space-y-1.5">
            {filtered.map(c => (
              <button key={c.id} onClick={() => setSelected(c)} className={`w-full text-left p-3 rounded-lg border transition-colors ${selected.id === c.id ? "border-primary/40 bg-primary/5" : "border-border hover:bg-accent/30"}`}>
                <div className="text-sm font-medium truncate">{c.name}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1.5">
                  <span>{c.id}</span> · <span>{c.type}</span>
                  <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full ${c.risk === "high" ? "bg-danger/15 text-danger" : c.risk === "medium" ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}`}>{c.risk}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CENTER: contract */}
        <motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="col-span-12 lg:col-span-6 glass rounded-2xl p-6 flex flex-col">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xs text-primary uppercase tracking-widest">{selected.type}</div>
                <h2 className="text-xl font-semibold truncate">{selected.name}</h2>
              </div>
              <span className={`shrink-0 text-[11px] px-2 py-1 rounded-full ${selected.status === "approved" ? "bg-success/15 text-success" : selected.status === "rejected" ? "bg-danger/15 text-danger" : "bg-primary/15 text-primary"}`}>{selected.status}</span>
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4 text-xs">
              <Meta l="Company" v={selected.company}/>
              <Meta l="Date" v={selected.date}/>
              <Meta l="Value" v={selected.value}/>
              <Meta l="AI Confidence" v={`${selected.confidence}%`}/>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4 flex-1 min-h-0">
            <div className="rounded-xl border border-border p-4 overflow-y-auto">
              <div className="text-xs font-semibold uppercase text-muted-foreground mb-3 flex items-center gap-1.5"><FileText className="h-3.5 w-3.5"/>Clauses</div>
              <ul className="space-y-2 text-sm">
                {clauses.map(c => (
                  <li key={c.name} className="flex items-start gap-2 p-2 rounded-lg hover:bg-accent/30">
                    {c.status === "ok" ? <Check className="h-4 w-4 text-success mt-0.5"/> : c.status === "warn" ? <AlertTriangle className="h-4 w-4 text-warning mt-0.5"/> : <X className="h-4 w-4 text-danger mt-0.5"/>}
                    <div>
                      <div className={`font-medium ${c.status === "missing" ? "text-danger" : c.status === "warn" ? "text-warning" : ""}`}>{c.name}</div>
                      <div className="text-[11px] text-muted-foreground">{c.note}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border p-4 overflow-y-auto">
              <div className="text-xs font-semibold uppercase text-muted-foreground mb-3">Extracted Text</div>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p><span className="text-foreground font-medium">1. Confidentiality.</span> Each party agrees to hold Confidential Information in strict confidence for a period of five (5) years from the date of disclosure…</p>
                <p><span className="text-foreground font-medium">2. Term and Termination.</span> This Agreement shall commence on the Effective Date and continue for an initial term of twenty-four (24) months, renewing thereafter for successive twelve-month periods…</p>
                <p><span className="text-warning font-medium">7. Limitation of Liability.</span> Aggregate liability shall not exceed <span className="bg-warning/20 px-1 rounded">the fees paid in the twelve (12) months preceding the claim</span> — playbook recommends 2×.</p>
                <p><span className="text-danger font-medium">[MISSING]</span> No dispute resolution / arbitration clause detected. Suggested insertion at §14.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <button className="flex-1 h-11 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 inline-flex items-center justify-center gap-2 shadow-glow"><Check className="h-4 w-4"/>Approve</button>
            <button className="flex-1 h-11 rounded-lg border border-warning/40 text-warning text-sm font-medium hover:bg-warning/10">Request Changes</button>
            <button className="h-11 px-4 rounded-lg border border-border text-sm hover:bg-accent inline-flex items-center gap-2"><X className="h-4 w-4"/>Reject</button>
            <button className="h-11 px-3 rounded-lg border border-border hover:bg-accent"><Download className="h-4 w-4"/></button>
          </div>
        </motion.div>

        {/* RIGHT: AI */}
        <div className="col-span-12 lg:col-span-3 glass rounded-2xl p-4 flex flex-col">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <div className="h-8 w-8 rounded-lg bg-primary/15 grid place-items-center"><Sparkles className="h-4 w-4 text-primary"/></div>
            <div>
              <div className="text-sm font-semibold">AI Assistant</div>
              <div className="text-[10px] text-muted-foreground">Context: {selected.id}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5 my-3">
            {["Summarize","Find Risks","Compare Template","Suggest Changes"].map(a => (
              <button key={a} className="text-[11px] p-2 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5">{a}</button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 text-sm">
            <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
              <div className="text-[10px] text-primary uppercase tracking-wider mb-1">AI Summary</div>
              <p className="text-xs text-muted-foreground leading-relaxed">Standard MSA with three deviations from playbook: (1) liability cap at 1× fees vs. required 2×, (2) missing arbitration clause, (3) DPA sub-processor list not attached.</p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3">
              <div className="text-[10px] text-muted-foreground mb-1">You</div>
              <p className="text-xs">What's the negotiation position on §7?</p>
            </div>
            <div className="rounded-lg bg-card border border-border p-3">
              <div className="text-[10px] text-primary mb-1">Copilot</div>
              <p className="text-xs text-muted-foreground leading-relaxed">Historically Acme has accepted 1.5× on 3 of 4 prior MSAs. Recommend counter at 2× with a mutual carve-out for gross negligence.</p>
            </div>
          </div>
          <div className="mt-3 relative">
            <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <input placeholder="Ask about this contract…" className="w-full h-10 pl-9 pr-10 rounded-lg bg-muted/40 border border-border text-sm focus:outline-none focus:border-primary/40"/>
            <button className="absolute right-1.5 top-1.5 h-7 w-7 rounded-md bg-primary text-primary-foreground grid place-items-center"><Send className="h-3.5 w-3.5"/></button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function Meta({ l, v }: { l: string; v: string }) {
  return (
    <div className="rounded-lg bg-muted/30 border border-border p-2.5">
      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{l}</div>
      <div className="text-sm font-medium mt-0.5 truncate">{v}</div>
    </div>
  );
}
