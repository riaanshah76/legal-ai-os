import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/AppLayout";
import { useState } from "react";
import { User, Building, Palette, Bell, Key, Shield, CreditCard } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · Legal AI OS" }] }),
  component: Settings,
});

const tabs = [
  { id: "profile", l: "Profile", i: User },
  { id: "org", l: "Organization", i: Building },
  { id: "theme", l: "Theme", i: Palette },
  { id: "notifications", l: "Notifications", i: Bell },
  { id: "api", l: "API Keys", i: Key },
  { id: "security", l: "Security", i: Shield },
  { id: "billing", l: "Billing", i: CreditCard },
];

function Settings() {
  const [tab, setTab] = useState("profile");
  return (
    <AppLayout title="Settings">
      <PageHeader title="Settings" description="Manage your workspace, security and billing." />
      <div className="grid lg:grid-cols-[220px_1fr] gap-4">
        <div className="glass rounded-2xl p-3">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${tab === t.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent/40"}`}
            >
              <t.i className="h-4 w-4" />
              {t.l}
            </button>
          ))}
        </div>
        <div className="glass rounded-2xl p-6 space-y-5">
          <div>
            <div className="text-lg font-semibold">{tabs.find((x) => x.id === tab)?.l}</div>
            <div className="text-xs text-muted-foreground">Update your {tab} settings below.</div>
          </div>
          {tab === "profile" && (
            <div className="grid md:grid-cols-2 gap-4">
              {["Full name", "Email", "Role", "Firm"].map((l) => (
                <label key={l} className="block text-sm">
                  <span className="text-xs text-muted-foreground">{l}</span>
                  <input
                    className="mt-1 w-full h-10 px-3 rounded-lg bg-muted/40 border border-border text-sm focus:outline-none focus:border-primary/40"
                    defaultValue={l === "Email" ? "sarah@lawfirm.com" : "Sarah Miller"}
                  />
                </label>
              ))}
            </div>
          )}
          {tab !== "profile" && (
            <div className="text-sm text-muted-foreground rounded-xl border border-border p-8 text-center">
              Configuration options for {tab} appear here.
            </div>
          )}
          <div className="flex gap-2 justify-end">
            <button className="h-10 px-4 rounded-lg border border-border text-sm">Cancel</button>
            <button className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
