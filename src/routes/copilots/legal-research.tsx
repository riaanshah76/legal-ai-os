import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/AppLayout";
import { cases } from "@/lib/legal-data";
import { Search, Scale, Download, Sparkles, BookOpen, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/copilots/legal-research")({
  head: () => ({ meta: [{ title: "Legal Research Copilot · Legal AI OS" }] }),
  component: LegalResearch,
});

function LegalResearch() {
  return (
    <AppLayout title="Legal Research Copilot">
      <PageHeader
        title="Legal Research Copilot"
        description="Cite-checked answers grounded in case law, statutes and regulations."
        actions={
          <button className="h-10 px-4 rounded-lg glass hover:bg-accent/60 inline-flex items-center gap-2 text-sm">
            <Download className="h-4 w-4" />
            Export PDF
          </button>
        }
      />

      <div className="glass rounded-2xl p-5 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
          <input
            defaultValue="Enforceability of force majeure clauses in SaaS agreements post-pandemic"
            className="w-full h-14 pl-12 pr-32 rounded-xl bg-muted/40 border border-border text-base focus:outline-none focus:border-primary/40"
          />
          <button className="absolute right-2 top-2 h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
            Search
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3 text-xs">
          {["Case Law", "Statutes", "Regulations", "Secondary Sources", "All Jurisdictions"].map(
            (t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md bg-muted/40 border border-border text-muted-foreground hover:border-primary/30 cursor-pointer"
              >
                {t}
              </span>
            ),
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 border-primary/20"
          >
            <div className="flex items-center gap-2 text-xs text-primary uppercase tracking-wider mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              AI Summary · 4 citations
            </div>
            <p className="text-sm leading-relaxed text-foreground">
              Post-pandemic courts require force majeure clauses to{" "}
              <strong>specifically enumerate triggering events</strong> to be enforceable in
              commercial contexts. Boilerplate "acts of God" language has been narrowly construed in
              <span className="text-primary"> Smith v. Jones (2024)</span> and{" "}
              <span className="text-primary">Meridian Data (9th Cir. 2024)</span>. For SaaS
              agreements, recommend explicit inclusion of pandemic, government-ordered shutdown, and
              critical infrastructure failure.
            </p>
            <div className="mt-4 flex gap-2 text-xs">
              <span className="px-2 py-1 rounded bg-success/15 text-success">Confidence 92%</span>
              <span className="px-2 py-1 rounded bg-primary/15 text-primary">4 sources</span>
            </div>
          </motion.div>

          {cases.map((c, i) => (
            <motion.div
              key={c.cite}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5 hover:border-primary/25 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">
                    {c.court} · <span className="text-primary">{c.tag}</span>
                  </div>
                  <h3 className="text-base font-semibold mt-1">{c.cite}</h3>
                </div>
                <button className="shrink-0 h-8 w-8 grid place-items-center rounded-lg border border-border hover:bg-accent">
                  <LinkIcon className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.snippet}</p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="glass rounded-2xl p-5">
            <div className="text-sm font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              Related Cases
            </div>
            <ul className="text-xs space-y-2 text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer">
                → Kaiser Aluminum v. Continental (S.D. Tex. 2023)
              </li>
              <li className="hover:text-foreground cursor-pointer">
                → Global Logistics v. Everest Ins. (2024)
              </li>
              <li className="hover:text-foreground cursor-pointer">
                → Restatement (Second) of Contracts §261 cmt. e
              </li>
              <li className="hover:text-foreground cursor-pointer">
                → UCC §2-615 (Excuse by Failure of Conditions)
              </li>
            </ul>
          </div>
          <div className="glass rounded-2xl p-5">
            <div className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Scale className="h-4 w-4 text-primary" />
              Statutes
            </div>
            <ul className="text-xs space-y-2 text-muted-foreground">
              <li>• UCC Article 2 §2-615</li>
              <li>• N.Y. Gen. Oblig. Law §5-1103</li>
              <li>• Cal. Civ. Code §1511</li>
              <li>• 15 U.S.C. §1 (Sherman Act)</li>
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
