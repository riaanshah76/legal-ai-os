import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/AppLayout";
import { monthlySeries } from "@/lib/legal-data";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics · Legal AI OS" }] }),
  component: Analytics,
});

const chartCard = (title: string, sub: string, children: React.ReactNode) => (
  <div className="glass rounded-2xl p-6">
    <div className="text-sm font-semibold">{title}</div>
    <div className="text-xs text-muted-foreground mb-3">{sub}</div>
    <div className="h-56">{children}</div>
  </div>
);

const tooltip = {
  contentStyle: { background: "#111318", border: "1px solid #23252D", borderRadius: 12 },
};

function Analytics() {
  return (
    <AppLayout title="Analytics">
      <PageHeader
        title="Legal Analytics"
        description="Throughput, risk trends, compliance and AI accuracy across your legal ops."
      />
      <div className="grid lg:grid-cols-2 gap-4">
        {chartCard(
          "Contracts Reviewed",
          "Monthly volume",
          <ResponsiveContainer>
            <AreaChart data={monthlySeries}>
              <defs>
                <linearGradient id="a1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#45E0D1" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#45E0D1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#23252D" vertical={false} />
              <XAxis dataKey="m" stroke="#6B7280" fontSize={11} />
              <YAxis stroke="#6B7280" fontSize={11} />
              <Tooltip {...tooltip} />
              <Area dataKey="contracts" stroke="#45E0D1" fill="url(#a1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>,
        )}
        {chartCard(
          "Risk Trend",
          "Flagged clauses per 100 contracts",
          <ResponsiveContainer>
            <LineChart data={monthlySeries}>
              <CartesianGrid stroke="#23252D" vertical={false} />
              <XAxis dataKey="m" stroke="#6B7280" fontSize={11} />
              <YAxis stroke="#6B7280" fontSize={11} />
              <Tooltip {...tooltip} />
              <Line dataKey="risk" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>,
        )}
        {chartCard(
          "Compliance Trend",
          "Score across frameworks",
          <ResponsiveContainer>
            <LineChart data={monthlySeries.map((m) => ({ ...m, score: 82 + m.reviews / 12 }))}>
              <CartesianGrid stroke="#23252D" vertical={false} />
              <XAxis dataKey="m" stroke="#6B7280" fontSize={11} />
              <YAxis stroke="#6B7280" fontSize={11} domain={[80, 100]} />
              <Tooltip {...tooltip} />
              <Line dataKey="score" stroke="#22C55E" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>,
        )}
        {chartCard(
          "AI Accuracy",
          "Clause extraction confidence %",
          <ResponsiveContainer>
            <BarChart data={monthlySeries.map((m) => ({ ...m, acc: 88 + (m.reviews % 12) }))}>
              <CartesianGrid stroke="#23252D" vertical={false} />
              <XAxis dataKey="m" stroke="#6B7280" fontSize={11} />
              <YAxis stroke="#6B7280" fontSize={11} domain={[80, 100]} />
              <Tooltip {...tooltip} />
              <Bar dataKey="acc" fill="#45E0D1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>,
        )}
        {chartCard(
          "Avg Review Time",
          "Minutes per contract",
          <ResponsiveContainer>
            <AreaChart data={monthlySeries.map((m) => ({ ...m, t: 24 - m.reviews / 12 }))}>
              <defs>
                <linearGradient id="a2" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#A78BFA" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#A78BFA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#23252D" vertical={false} />
              <XAxis dataKey="m" stroke="#6B7280" fontSize={11} />
              <YAxis stroke="#6B7280" fontSize={11} />
              <Tooltip {...tooltip} />
              <Area dataKey="t" stroke="#A78BFA" fill="url(#a2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>,
        )}
        {chartCard(
          "Approval Latency",
          "Hours until approval",
          <ResponsiveContainer>
            <BarChart data={monthlySeries.map((m) => ({ ...m, h: 12 - m.reviews / 22 }))}>
              <CartesianGrid stroke="#23252D" vertical={false} />
              <XAxis dataKey="m" stroke="#6B7280" fontSize={11} />
              <YAxis stroke="#6B7280" fontSize={11} />
              <Tooltip {...tooltip} />
              <Bar dataKey="h" fill="#22C55E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>,
        )}
      </div>
    </AppLayout>
  );
}
