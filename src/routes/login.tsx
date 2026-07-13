import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Gavel, Mail, Lock, ArrowRight } from "lucide-react";
import { MicrosoftLogo, GoogleDriveLogo } from "@/components/brand/logos";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in · Legal AI OS" }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"login"|"signup">("login");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => nav({ to: "/dashboard" }), 700);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background text-foreground">
      {/* Left brand pane */}
      <div className="hidden lg:flex relative flex-col justify-between p-10 border-r border-border overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <Link to="/" className="relative flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-primary/20 border border-primary/30 grid place-items-center shadow-glow">
            <Gavel className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold">Industry AI OS</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Legal Edition</div>
          </div>
        </Link>
        <div className="relative max-w-md">
          <h2 className="text-4xl font-semibold tracking-tight text-gradient leading-tight">
            "We closed our quarter with 3× more contracts reviewed — with the same team."
          </h2>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-chart-5" />
            <div>
              <div className="text-sm font-medium">Amelia Zhou</div>
              <div className="text-xs text-muted-foreground">General Counsel, Northwind Health</div>
            </div>
          </div>
        </div>
        <div className="relative text-xs text-muted-foreground">SOC 2 Type II · ISO 27001 · GDPR</div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="w-full max-w-md glass-strong rounded-2xl p-8 shadow-elegant">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "login" ? "Sign in to your Legal AI workspace" : "Start your 14-day enterprise trial"}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2">
            <button className="h-11 rounded-lg glass hover:bg-accent/60 flex items-center justify-center gap-2 text-sm">
              <GoogleDriveLogo className="h-4 w-4" /> Google
            </button>
            <button className="h-11 rounded-lg glass hover:bg-accent/60 flex items-center justify-center gap-2 text-sm">
              <MicrosoftLogo className="h-4 w-4" /> Microsoft
            </button>
          </div>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" /> or continue with email <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={submit} className="space-y-3">
            {mode === "signup" && (
              <input placeholder="Full name" className="w-full h-11 px-3 rounded-lg bg-muted/40 border border-border text-sm focus:outline-none focus:border-primary/40" />
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="email" required defaultValue="sarah@lawfirm.com" placeholder="you@company.com"
                className="w-full h-11 pl-9 pr-3 rounded-lg bg-muted/40 border border-border text-sm focus:outline-none focus:border-primary/40" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="password" required defaultValue="••••••••"
                className="w-full h-11 pl-9 pr-3 rounded-lg bg-muted/40 border border-border text-sm focus:outline-none focus:border-primary/40" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <label className="inline-flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" defaultChecked className="accent-primary" /> Remember me
              </label>
              <a href="#" className="text-primary hover:underline">Forgot password?</a>
            </div>
            <button disabled={loading} className="w-full h-11 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 shadow-glow inline-flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? "Signing you in…" : (<>{mode === "login" ? "Sign in" : "Create account"} <ArrowRight className="h-4 w-4" /></>)}
            </button>
          </form>

          <div className="mt-5 text-center text-xs text-muted-foreground">
            {mode === "login" ? "New here?" : "Already have an account?"}{" "}
            <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-primary hover:underline">
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
