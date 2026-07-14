import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/AppLayout";
import { BookOpen, Search, Star } from "lucide-react";

export const Route = createFileRoute("/knowledge")({
  head: () => ({ meta: [{ title: "Knowledge Base · Legal AI OS" }] }),
  component: Knowledge,
});

const collections = [
  { name: "Playbooks", count: 24, d: "MSA, NDA, DPA, License playbooks" },
  { name: "Clause Library", count: 412, d: "Approved fallback language by category" },
  { name: "Templates", count: 68, d: "MSA, SOW, NDA, employment templates" },
  { name: "Case Memos", count: 137, d: "Internal legal memoranda" },
  { name: "Regulatory Guides", count: 42, d: "GDPR · CCPA · HIPAA · SOC 2" },
  { name: "Precedent Deals", count: 89, d: "Prior transactions searchable by term" },
];

function Knowledge() {
  return (
    <AppLayout title="Knowledge Base">
      <PageHeader
        title="Knowledge Base"
        description="Your institutional legal knowledge — searchable and cited by every copilot."
      />
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          placeholder="Search playbooks, clauses, memos…"
          className="w-full h-14 pl-12 pr-4 rounded-xl bg-muted/40 border border-border text-base focus:outline-none focus:border-primary/40"
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((c) => (
          <div
            key={c.name}
            className="glass rounded-2xl p-6 hover:border-primary/30 hover:-translate-y-1 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="h-11 w-11 rounded-xl bg-primary/15 grid place-items-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <Star className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-4 text-lg font-semibold">{c.name}</div>
            <div className="text-xs text-muted-foreground mt-1">{c.d}</div>
            <div className="mt-3 text-xs text-primary">{c.count} items →</div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
