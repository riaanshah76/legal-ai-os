import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/AppLayout";
import { motion } from "framer-motion";
import {
  ScrollText,
  CheckSquare,
  Cable,
  FileCheck2,
  Clock,
  Bot,
  ArrowUpRight,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Calendar,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { activities, approvals, contracts, contractMix, monthlySeries } from "@/lib/legal-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · Legal AI OS" }] }),
  component: Dashboard,
});

const COLORS = ["#45E0D1", "#22C55E", "#F59E0B", "#EF4444", "#A78BFA"];

const kpis = [
  { l: "Active Workflows", v: "24", d: "+3 today", i: ScrollText },
  { l: "Pending Approvals", v: "8", d: "2 urgent", i: CheckSquare, warn: true },
  { l: "Connected Systems", v: "16", d: "All healthy", i: Cable },
  { l: "Contracts Processed", v: "1,284", d: "+184 this month", i: FileCheck2 },
  { l: "Avg Review Time", v: "6m 42s", d: "-38% vs. Q1", i: Clock },
  { l: "AI Conversations", v: "3,921", d: "+12% WoW", i: Bot },
];

function Dashboard() {
  return (
    <AppLayout title="Dashboard">
      <PageHeader
        title="Welcome back, Sarah"
        description="Here's what's happening across your legal operations today."
        actions={
          <>
            <Link
              to="/assistant"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-lg glass text-sm hover:bg-accent/60"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              Ask AI
            </Link>
            <Link
              to="/approvals"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 shadow-glow"
            >
              <CheckSquare className="h-4 w-4" />
              Review Queue
            </Link>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {kpis.map((k, i) => (
          <motion.div
            key={k.l}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-5 hover:border-primary/25 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div
                className={`h-9 w-9 rounded-lg grid place-items-center ${k.warn ? "bg-warning/15" : "bg-primary/15"}`}
              >
                <k.i className={`h-4 w-4 ${k.warn ? "text-warning" : "text-primary"}`} />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-4 text-2xl font-semibold">{k.v}</div>
            <div className="text-xs text-muted-foreground">{k.l}</div>
            <div className="mt-1 text-[11px] text-primary/80">{k.d}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold">Contract Throughput</div>
              <div className="text-xs text-muted-foreground">
                Contracts reviewed · last 7 months
              </div>
            </div>
            <div className="flex gap-2 text-[11px]">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded bg-primary" />
                Contracts
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded bg-success" />
                Reviews
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={monthlySeries}>
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#45E0D1" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#45E0D1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#23252D" vertical={false} />
                <XAxis dataKey="m" stroke="#6B7280" fontSize={11} />
                <YAxis stroke="#6B7280" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: "#111318",
                    border: "1px solid #23252D",
                    borderRadius: 12,
                  }}
                />
                <Area dataKey="contracts" stroke="#45E0D1" fill="url(#g1)" strokeWidth={2} />
                <Area dataKey="reviews" stroke="#22C55E" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="text-sm font-semibold">Contract Mix</div>
          <div className="text-xs text-muted-foreground">By document type</div>
          <div className="h-52 mt-2">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={contractMix}
                  innerRadius={45}
                  outerRadius={75}
                  dataKey="value"
                  paddingAngle={3}
                  stroke="none"
                >
                  {contractMix.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#111318",
                    border: "1px solid #23252D",
                    borderRadius: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 text-xs">
            {contractMix.map((c, i) => (
              <div key={c.name} className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded" style={{ background: COLORS[i] }} />
                  {c.name}
                </span>
                <span className="text-muted-foreground">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold">Recent Contracts</div>
            <Link to="/copilots/contract-review" className="text-xs text-primary hover:underline">
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-[11px] uppercase text-muted-foreground border-b border-border">
                <tr>
                  <th className="text-left py-2 font-medium">Contract</th>
                  <th className="text-left font-medium">Type</th>
                  <th className="text-left font-medium">Risk</th>
                  <th className="text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {contracts.slice(0, 5).map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-border/50 last:border-0 hover:bg-accent/20"
                  >
                    <td className="py-3">
                      <div className="font-medium truncate max-w-xs">{c.name}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {c.id} · {c.date}
                      </div>
                    </td>
                    <td className="text-xs">{c.type}</td>
                    <td>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full ${c.risk === "high" ? "bg-danger/15 text-danger" : c.risk === "medium" ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}`}
                      >
                        {c.risk}
                      </span>
                    </td>
                    <td className="text-right">
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full ${c.status === "approved" ? "bg-success/15 text-success" : c.status === "rejected" ? "bg-danger/15 text-danger" : "bg-primary/15 text-primary"}`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold">Approval Queue</div>
            <Link to="/approvals" className="text-xs text-primary hover:underline">
              Open →
            </Link>
          </div>
          <div className="space-y-3">
            {approvals.slice(0, 4).map((a) => (
              <div
                key={a.id}
                className="rounded-xl border border-border p-3 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium truncate">{a.subject}</div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${a.urgency === "high" ? "bg-danger/15 text-danger" : a.urgency === "medium" ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground"}`}
                  >
                    {a.urgency}
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  {a.requester} · waiting {a.waiting}
                </div>
                <div className="mt-2 flex gap-2">
                  <button className="flex-1 h-7 rounded-md bg-primary/15 text-primary text-[11px] font-medium hover:bg-primary/25">
                    Approve
                  </button>
                  <button className="flex-1 h-7 rounded-md border border-border text-[11px] hover:bg-accent">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              Recent AI Activity
            </div>
            <span className="text-[11px] text-muted-foreground">live</span>
          </div>
          <ul className="space-y-3">
            {activities.map((a, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <div className="min-w-0">
                  <div className="truncate">{a.text}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {a.time} · {a.tag}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" />
              Compliance Score
            </div>
            <Link to="/copilots/compliance" className="text-xs text-primary hover:underline">
              Details →
            </Link>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <div className="text-5xl font-semibold text-gradient-primary">94</div>
            <div className="text-sm text-success mb-1.5 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +3 pts
            </div>
          </div>
          <div className="h-32">
            <ResponsiveContainer>
              <BarChart data={monthlySeries}>
                <XAxis dataKey="m" hide />
                <Tooltip
                  contentStyle={{
                    background: "#111318",
                    border: "1px solid #23252D",
                    borderRadius: 12,
                  }}
                />
                <Bar dataKey="reviews" fill="#45E0D1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Risk Alerts
            </div>
            <span className="text-[11px] text-warning">3 open</span>
          </div>
          <div className="space-y-2 text-sm">
            {[
              { t: "Missing arbitration clause", d: "MSA — Acme Corp", sev: "warn" },
              { t: "Liability cap below policy", d: "SaaS — Contoso", sev: "warn" },
              { t: "Sub-processor list outdated", d: "DPA — Northwind", sev: "danger" },
            ].map((r, i) => (
              <div
                key={i}
                className={`rounded-lg border p-3 ${r.sev === "danger" ? "border-danger/30 bg-danger/5" : "border-warning/30 bg-warning/5"}`}
              >
                <div className="font-medium">{r.t}</div>
                <div className="text-[11px] text-muted-foreground">{r.d}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-xs font-medium mb-2 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Upcoming Reviews
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>Tomorrow — MSA renewal (Fabrikam)</li>
              <li>Jul 15 — Vendor DPA batch (7)</li>
              <li>Jul 20 — Quarterly compliance audit</li>
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
