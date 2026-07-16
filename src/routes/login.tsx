import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Eye, EyeOff, Gavel, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in · Legal AI OS" }] }),
  component: Login,
});

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

const inputCls =
  "w-full rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs font-medium text-muted-foreground">{label}</div>
      {children}
      {error && <div className="mt-1 text-xs text-destructive">{error}</div>}
    </label>
  );
}

function PasswordInput({
  value,
  onChange,
  placeholder,
  autoComplete,
  inputRef,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        ref={inputRef}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputCls, "pr-10")}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition hover:text-foreground"
        aria-label={show ? "Hide password" : "Show password"}
        tabIndex={-1}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

function LoginForm({ firstFieldRef }: { firstFieldRef: React.Ref<HTMLInputElement> }) {
  const nav = useNavigate();
  const [email, setEmail] = useState("sarah@lawfirm.com");
  const [password, setPassword] = useState("demo12345");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!email) errs.email = "Email is required";
    else if (!isEmail(email)) errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setTimeout(() => nav({ to: "/dashboard" }), 700);
  };

  return (
    <form onSubmit={submit} className="space-y-3" noValidate>
      <Field label="Work email" error={errors.email}>
        <input
          ref={firstFieldRef}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
          placeholder="you@company.com"
          autoComplete="email"
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <PasswordInput
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </Field>
      <div className="flex items-center justify-end">
        <button type="button" className="text-xs text-muted-foreground hover:text-foreground">
          Forgot password?
        </button>
      </div>
      {errors.form && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {errors.form}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Log in"}
      </button>
      <div className="relative my-3">
        <div className="absolute inset-0 flex items-center">
          <div className="h-px w-full bg-border" />
        </div>
        <div className="relative text-center">
          <span className="bg-card px-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            or
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() =>
          setErrors({
            form: "SSO isn't connected in this prototype — sign in with email and password instead.",
          })
        }
        className="w-full rounded-lg border border-border bg-muted/40 py-2.5 text-sm font-medium transition hover:border-primary/40"
      >
        Continue with SSO
      </button>
    </form>
  );
}

function SignupForm({ firstFieldRef }: { firstFieldRef: React.Ref<HTMLInputElement> }) {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email) errs.email = "Email is required";
    else if (!isEmail(email)) errs.email = "Enter a valid work email";
    if (!company.trim()) errs.company = "Company is required";
    if (!password || password.length < 8) errs.password = "Password must be at least 8 characters";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setTimeout(() => nav({ to: "/dashboard" }), 700);
  };

  return (
    <form onSubmit={submit} className="space-y-3" noValidate>
      <Field label="Full name" error={errors.name}>
        <input
          ref={firstFieldRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputCls}
          placeholder="Ada Lovelace"
        />
      </Field>
      <Field label="Work email" error={errors.email}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
          placeholder="you@company.com"
          autoComplete="email"
        />
      </Field>
      <Field label="Company" error={errors.company}>
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputCls}
          placeholder="Northwind LLP"
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <PasswordInput
          value={password}
          onChange={setPassword}
          placeholder="At least 8 characters"
          autoComplete="new-password"
        />
      </Field>
      {errors.form && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {errors.form}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}

function Login() {
  const nav = useNavigate();
  const { theme, toggle } = useTheme();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const close = () => nav({ to: "/" });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    firstFieldRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, [tab]);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Dimmed backdrop — the site's own brand identity, blurred behind the auth card */}
      <div className="pointer-events-none absolute inset-0 opacity-40 blur-sm" aria-hidden>
        <div className="grid-bg absolute inset-0 opacity-30" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-chart-5/20 blur-3xl" />
        <div className="flex h-full flex-col justify-between p-10">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary/20 border border-primary/30 grid place-items-center shadow-glow">
              <Gavel className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold">Industry AI OS</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Legal Edition
              </div>
            </div>
          </div>
          <div className="max-w-md">
            <h2 className="text-4xl font-semibold tracking-tight leading-tight">
              "We closed our quarter with 3× more contracts reviewed — with the same team."
            </h2>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-chart-5" />
              <div>
                <div className="text-sm font-medium">Amelia Zhou</div>
                <div className="text-xs text-muted-foreground">
                  General Counsel, Northwind Health
                </div>
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">SOC 2 Type II · ISO 27001 · GDPR</div>
        </div>
      </div>
      <div className="absolute inset-0 bg-background/55" aria-hidden />

      <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="absolute top-6 right-6 z-20 h-9 w-9 grid place-items-center rounded-lg hover:bg-accent/50 text-muted-foreground"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      {/* Auth card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <motion.div
          ref={dialogRef}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-title"
          className="w-full max-w-md rounded-2xl glass-strong p-6 shadow-elegant"
        >
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h1 id="auth-title" className="text-lg font-semibold">
                {tab === "login" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">
                {tab === "login"
                  ? "Sign in to your Legal AI workspace."
                  : "Get access to your legal copilots."}
              </p>
            </div>
            <button
              onClick={close}
              aria-label="Close"
              className="rounded-md p-1 text-muted-foreground transition hover:bg-accent/50 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-1 rounded-lg bg-muted/40 p-1">
            <button
              onClick={() => setTab("login")}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition",
                tab === "login" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground",
              )}
            >
              Log in
            </button>
            <button
              onClick={() => setTab("signup")}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition",
                tab === "signup" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground",
              )}
            >
              Sign up
            </button>
          </div>

          {tab === "login" ? (
            <LoginForm firstFieldRef={firstFieldRef} />
          ) : (
            <SignupForm firstFieldRef={firstFieldRef} />
          )}

          <div className="mt-5 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Back to home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
