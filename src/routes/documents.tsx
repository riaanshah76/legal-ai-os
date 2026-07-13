import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/AppLayout";
import { Upload, FileText, Download, Share2, Sparkles, Check } from "lucide-react";

export const Route = createFileRoute("/documents")({
  head: () => ({ meta: [{ title: "Document Intelligence · Legal AI OS" }] }),
  component: Documents,
});

function Documents() {
  return (
    <AppLayout title="Document Intelligence">
      <PageHeader title="Document Intelligence" description="Upload any document — get OCR, clause extraction and AI suggestions in seconds."/>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass rounded-2xl p-8 border-2 border-dashed border-border hover:border-primary/40 transition-colors text-center">
            <Upload className="h-8 w-8 mx-auto text-primary mb-3"/>
            <div className="font-semibold">Drop files here or click to upload</div>
            <div className="text-xs text-muted-foreground mt-1">PDF, DOCX, image — up to 200MB</div>
            <button className="mt-4 h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Choose files</button>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-primary"/><span className="text-sm font-semibold">MSA_Acme_v3.pdf</span></div>
              <div className="flex gap-2">
                <button className="h-8 w-8 grid place-items-center rounded-lg border border-border"><Download className="h-4 w-4"/></button>
                <button className="h-8 w-8 grid place-items-center rounded-lg border border-border"><Share2 className="h-4 w-4"/></button>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 aspect-[3/4] max-h-96 p-8 text-xs text-muted-foreground leading-relaxed overflow-hidden">
              <div className="text-center font-semibold text-foreground text-sm mb-4">MASTER SERVICES AGREEMENT</div>
              <p>This Master Services Agreement ("Agreement") is entered into as of July 8, 2026, by and between Acme Corporation, a Delaware corporation ("Acme"), and Northwind Health, Inc. ("Customer").</p>
              <p className="mt-2"><strong>1. Definitions.</strong> As used herein, "Services" means the professional services described in one or more Statements of Work…</p>
              <p className="mt-2"><strong>2. Term.</strong> The initial term shall commence on the Effective Date and continue for twenty-four (24) months…</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="glass rounded-2xl p-5">
            <div className="text-sm font-semibold mb-3">OCR & Extraction</div>
            <div className="text-xs text-muted-foreground">Confidence</div>
            <div className="text-3xl font-semibold text-gradient-primary my-2">98.4%</div>
            <div className="h-1.5 bg-muted rounded-full"><div className="h-full rounded-full bg-primary" style={{width:"98%"}}/></div>
            <div className="mt-4 text-xs text-muted-foreground">42 pages · 12,441 tokens · 8 tables detected</div>
          </div>
          <div className="glass rounded-2xl p-5">
            <div className="text-sm font-semibold mb-3">Extracted Clauses</div>
            <ul className="text-sm space-y-2">
              {["Confidentiality","Term & Termination","Payment","Liability","Indemnification","Governing Law"].map(c => (
                <li key={c} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-success"/>{c}</li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-2xl p-5">
            <div className="text-sm font-semibold flex items-center gap-2 mb-3"><Sparkles className="h-4 w-4 text-primary"/>AI Suggestions</div>
            <div className="text-xs text-muted-foreground">Add arbitration clause · Raise liability cap to 2× · Attach DPA sub-processor list</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
