import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Gavel, Calendar, Check, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/book-demo")({
  head: () => ({ meta: [{ title: "Book a Demo · Legal AI OS" }] }),
  component: Demo,
});

const slots = ["Mon 9:00","Mon 14:00","Tue 10:30","Tue 15:00","Wed 11:00","Wed 16:00","Thu 9:30","Thu 13:00","Fri 10:00","Fri 15:30"];

function Demo() {
  const [done, setDone] = useState(false);
  const [slot, setSlot] = useState<string>();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 backdrop-blur-xl bg-background/70 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary/15 border border-primary/30 grid place-items-center"><Gavel className="h-4 w-4 text-primary"/></div>
            <span className="text-sm font-semibold">Industry AI OS</span>
          </Link>
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"><ArrowLeft className="h-3.5 w-3.5"/>Back</Link>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {done ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-strong rounded-3xl p-12 text-center">
            <div className="h-16 w-16 mx-auto rounded-full bg-success/15 grid place-items-center mb-4"><Check className="h-8 w-8 text-success"/></div>
            <h1 className="text-3xl font-semibold text-gradient">You're booked in.</h1>
            <p className="mt-2 text-muted-foreground">We'll send a calendar invite with the meeting link. Check your inbox in a few minutes.</p>
            <Link to="/dashboard" className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium shadow-glow">Try the live prototype</Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-gradient">Book your Legal AI OS demo</h1>
              <p className="mt-3 text-muted-foreground">A 30-minute walk-through on your own contracts, under strict NDA.</p>
              <div className="mt-8 glass rounded-2xl p-6">
                <div className="text-sm font-semibold flex items-center gap-2 mb-3"><Calendar className="h-4 w-4 text-primary"/>Pick a time this week</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {slots.map(s => (
                    <button key={s} onClick={() => setSlot(s)} className={`h-11 rounded-lg text-sm border transition-colors ${slot===s ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40"}`}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
            <form onSubmit={(e)=>{e.preventDefault(); setDone(true);}} className="glass-strong rounded-2xl p-6 space-y-3">
              {[
                { l: "Full name", d: "Sarah Miller" },
                { l: "Work email", d: "sarah@lawfirm.com" },
                { l: "Phone", d: "+1 415 555 0123" },
                { l: "Company", d: "Miller & Chen LLP" },
                { l: "Country", d: "United States" },
              ].map(f => (
                <label key={f.l} className="block">
                  <span className="text-xs text-muted-foreground">{f.l}</span>
                  <input required defaultValue={f.d} className="mt-1 w-full h-11 px-3 rounded-lg bg-muted/40 border border-border text-sm focus:outline-none focus:border-primary/40"/>
                </label>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <label className="block"><span className="text-xs text-muted-foreground">Team size</span>
                  <select className="mt-1 w-full h-11 px-3 rounded-lg bg-muted/40 border border-border text-sm">
                    <option>1–10</option><option>11–50</option><option>51–200</option><option>200+</option>
                  </select>
                </label>
                <label className="block"><span className="text-xs text-muted-foreground">Primary use case</span>
                  <select className="mt-1 w-full h-11 px-3 rounded-lg bg-muted/40 border border-border text-sm">
                    <option>Contract review</option><option>Compliance</option><option>Due diligence</option><option>Legal research</option>
                  </select>
                </label>
              </div>
              <label className="block"><span className="text-xs text-muted-foreground">Anything specific to demo?</span>
                <textarea rows={3} defaultValue="Focus on MSA review against our playbook and Salesforce integration." className="mt-1 w-full px-3 py-2 rounded-lg bg-muted/40 border border-border text-sm focus:outline-none focus:border-primary/40"/>
              </label>
              <button className="w-full h-11 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-glow hover:opacity-90">Confirm demo</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
