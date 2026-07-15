import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/app/AppLayout";
import { Building2, Cpu, KeyRound, LogOut, UserCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · Legal AI OS" }] }),
  component: Settings,
});

const me = {
  name: "Sarah Miller",
  email: "sarah@lawfirm.com",
  userId: "usr_4471ae2b9c",
  roles: ["owner", "general counsel"],
};

function initials(text: string) {
  const parts = text
    .replace(/@.*/, "")
    .split(/[.\s_-]+/)
    .filter(Boolean);
  return (parts[0]?.[0] ?? "U") + (parts[1]?.[0] ?? "");
}

function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass rounded-2xl p-5">
      <div className="mb-4 flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 py-2.5 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border px-6 py-10 text-center">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-muted text-muted-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function Settings() {
  const nav = useNavigate();

  return (
    <AppLayout title="Settings">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Settings
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-gradient md:text-3xl">
            Workspace settings
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Your profile, tenant, and provider configuration.
          </p>
        </div>

        {/* Identity card */}
        <div className="glass flex items-center gap-4 rounded-2xl p-5">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-lg font-semibold uppercase text-primary-foreground shadow-glow">
            {initials(me.name)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-base font-semibold text-foreground">{me.name}</div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {me.roles.map((r) => (
                <span
                  key={r}
                  className="rounded-full border border-primary/25 bg-primary/5 px-2 py-0.5 text-[11px] font-medium capitalize text-primary"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => nav({ to: "/login" })}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:border-destructive/50 hover:text-destructive"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>

        <div className="grid gap-5">
          <Section
            icon={UserCircle}
            title="Profile"
            description="How you're identified in this workspace."
          >
            <Row label="Email" value={me.email} />
            <Row label="Roles" value={me.roles.join(", ")} />
            <Row label="User ID" value={<span className="font-mono text-xs">{me.userId}</span>} />
          </Section>

          <Section
            icon={Building2}
            title="Tenant"
            description="The organization this workspace belongs to."
          >
            <p className="text-sm text-muted-foreground">Could not load tenant details.</p>
          </Section>

          <Section icon={Cpu} title="LLM Providers" description="Model and provider configuration.">
            <EmptyState
              icon={Cpu}
              title="Provider configuration not available yet"
              description="Per-tenant model + provider settings need a backend endpoint. Models are currently configured centrally via the shared Industry AI OS gateway."
            />
          </Section>

          <Section
            icon={KeyRound}
            title="API Keys"
            description="Programmatic access to the platform."
          >
            <EmptyState
              icon={KeyRound}
              title="No API-key management yet"
              description="Programmatic API keys will appear here once the backend exposes a keys endpoint."
            />
          </Section>
        </div>
      </div>
    </AppLayout>
  );
}
