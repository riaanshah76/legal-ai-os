import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/AppLayout";
import { Sparkles, Send, Plus, Paperclip } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/assistant")({
  head: () => ({ meta: [{ title: "AI Assistant · Legal AI OS" }] }),
  component: Assistant,
});

const prompts = ["Review this NDA", "Summarize a contract", "Explain a clause", "Find legal risks", "Generate a contract"];

function Assistant() {
  const [msgs, setMsgs] = useState([
    { r: "assistant", t: "Hi Sarah — I'm your Legal Copilot. I can review contracts, cite case law, or draft policy language. What are we working on?" },
  ]);
  const [input, setInput] = useState("");
  const send = () => {
    if (!input.trim()) return;
    setMsgs([...msgs, { r: "user", t: input }, { r: "assistant", t: "Analyzing… Based on your playbook and the last 12 comparable MSAs, I recommend counter-proposing a 2× liability cap with a mutual carve-out for gross negligence. Cite: Ashford Holdings (Del. Ch. 2025)." }]);
    setInput("");
  };
  return (
    <AppLayout title="AI Assistant">
      <PageHeader title="AI Assistant" description="Ask anything about your contracts, cases or policies."/>
      <div className="glass rounded-2xl flex flex-col h-[calc(100vh-16rem)]">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {msgs.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.r === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`h-8 w-8 shrink-0 rounded-lg grid place-items-center ${m.r === "assistant" ? "bg-primary/15" : "bg-muted"}`}>
                {m.r === "assistant" ? <Sparkles className="h-4 w-4 text-primary"/> : <span className="text-xs font-medium">SM</span>}
              </div>
              <div className={`max-w-2xl rounded-2xl p-4 text-sm ${m.r === "assistant" ? "bg-card border border-border" : "bg-primary/10 border border-primary/20"}`}>{m.t}</div>
            </div>
          ))}
        </div>
        <div className="border-t border-border p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {prompts.map(p => (
              <button key={p} onClick={() => setInput(p)} className="text-xs px-3 py-1.5 rounded-full glass hover:border-primary/30">{p}</button>
            ))}
          </div>
          <div className="relative">
            <button className="absolute left-3 top-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-md hover:bg-accent"><Paperclip className="h-4 w-4 text-muted-foreground"/></button>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
              placeholder="Message Legal Copilot…" className="w-full h-12 pl-12 pr-14 rounded-xl bg-muted/40 border border-border text-sm focus:outline-none focus:border-primary/40"/>
            <button onClick={send} className="absolute right-2 top-2 h-8 w-8 rounded-lg bg-primary text-primary-foreground grid place-items-center"><Send className="h-4 w-4"/></button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
