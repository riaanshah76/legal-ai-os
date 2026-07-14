import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Bot,
  FileSearch,
  Workflow,
  CheckSquare,
  BookOpen,
  Plug,
  BarChart3,
  Settings,
  Sparkles,
  ShieldCheck,
  ScrollText,
  Scale,
  FileCheck2,
  ClipboardList,
  Gavel,
  Building2,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";

const primary = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/assistant", label: "AI Assistant", icon: Bot },
  { to: "/documents", label: "Document Intelligence", icon: FileSearch },
  { to: "/workflows", label: "Workflows", icon: Workflow },
  { to: "/approvals", label: "Approvals", icon: CheckSquare },
  { to: "/knowledge", label: "Knowledge", icon: BookOpen },
  { to: "/connectors", label: "Connectors", icon: Plug },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

const copilots = [
  { to: "/copilots/contract-review", label: "Contract Review", icon: ScrollText },
  { to: "/copilots/legal-research", label: "Legal Research", icon: Scale },
  { to: "/copilots/compliance", label: "Compliance", icon: ShieldCheck },
  { to: "/copilots/nda-review", label: "NDA Review", icon: FileCheck2 },
  { to: "/copilots/policy-review", label: "Policy Review", icon: ClipboardList },
  { to: "/copilots/due-diligence", label: "Due Diligence", icon: Building2 },
  { to: "/copilots/risk-assessment", label: "Risk Assessment", icon: AlertTriangle },
];

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border bg-sidebar/60 backdrop-blur-xl h-screen sticky top-0">
      <Link to="/dashboard" className="flex items-center gap-2 px-5 h-16 border-b border-border">
        <div className="h-8 w-8 rounded-lg bg-primary/20 border border-primary/30 grid place-items-center shadow-glow">
          <Gavel className="h-4 w-4 text-primary" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold">Legal AI OS</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Enterprise
          </div>
        </div>
      </Link>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <div className="px-2 pb-2 text-[10px] uppercase tracking-wider text-muted-foreground">
            Platform
          </div>
          <div className="space-y-1">
            {primary.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    active
                      ? "text-foreground bg-accent/60"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-lg border border-primary/30 bg-primary/5"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <div className="px-2 pb-2 text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-primary" /> Copilots
          </div>
          <div className="space-y-1">
            {copilots.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    active
                      ? "text-foreground bg-accent/60 border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      <div className="px-3 py-4 border-t border-border">
        <div className="glass rounded-xl p-3">
          <div className="flex items-center gap-2 text-xs">
            <div className="h-2 w-2 rounded-full bg-success pulse-glow" />
            <span className="text-muted-foreground">All systems operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
