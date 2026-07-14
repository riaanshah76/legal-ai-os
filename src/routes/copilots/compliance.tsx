import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/AppLayout";
import { regulations } from "@/lib/legal-data";
import { ShieldCheck, AlertTriangle, TrendingUp, FileText } from "lucide-react";
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

export const Route = createFileRoute("/copilots/compliance")({
  head: () => ({ meta: [{ title: "Compliance Copilot · Legal AI OS" }] }),
  component: Compliance,
});

const heatmap = Array.from({ length: 7 * 12 }, (_, i) => ({
  x: i % 12,
  y: Math.floor(i / 12),
  v: Math.random() < 0.15 ? "high" : Math.random() < 0.35 ? "med" : "low",
}));

const violations = [
  { code: "GDPR Art. 28", d: "Sub-processor list not published for 2 vendors", sev: "high" },
  { code: "SOC 2 CC6.1", d: "Quarterly access review overdue (14 days)", sev: "medium" },
  { code: "HIPAA §164.312", d: "Encryption at rest not verified for 1 backup path", sev: "medium" },
  { code: "CCPA §1798.130", d: "Data-subject request SLA breached on 3 requests", sev: "low" },
];

function Compliance() {
  return (
    <AppLayout title="Compliance Copilot">
      <PageHeader
        title="Compliance Copilot"
        description="Continuous monitoring across GDPR, CCPA, SOC 2, HIPAA and ISO 27001."
      />

      <div className="grid lg:grid-cols-4 gap-4 mb-6">
        <div className="glass rounded-2xl p-6 lg:col-span-1">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            Compliance Score
          </div>
          <div className="h-40 -mt-2">
            <ResponsiveContainer>
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                data={[{ v: 94 }]}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar
                  dataKey="v"
                  fill="#45E0D1"
                  cornerRadius={12}
                  background={{ fill: "#23252D" }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center -mt-24 mb-16">
            <div className="text-4xl font-semibold text-gradient-primary">94</div>
            <div className="text-xs text-success flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +3 this quarter
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 lg:col-span-3">
          <div className="text-sm font-semibold mb-4">Framework Coverage</div>
          <div className="grid md:grid-cols-3 gap-3">
            {regulations.map((r) => (
              <div
                key={r.code}
                className="rounded-xl border border-border p-4 hover:border-primary/30"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{r.code}</div>
                  <span className="text-xs text-muted-foreground">{r.region}</span>
                </div>
                <div className="mt-3 flex items-end gap-2">
                  <div className="text-2xl font-semibold text-primary">{r.score}</div>
                  <div className="text-[11px] text-muted-foreground mb-1">/100</div>
                </div>
                <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-success"
                    style={{ width: `${r.score}%` }}
                  />
                </div>
                <div className="text-[11px] text-muted-foreground mt-2">
                  {r.findings} open findings
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Open Violations
            </div>
            <span className="text-xs text-muted-foreground">{violations.length} findings</span>
          </div>
          <div className="space-y-2">
            {violations.map((v) => (
              <div
                key={v.code}
                className={`rounded-lg border p-4 flex items-start gap-3 ${v.sev === "high" ? "border-danger/30 bg-danger/5" : v.sev === "medium" ? "border-warning/30 bg-warning/5" : "border-border"}`}
              >
                <div
                  className={`mt-1 h-2 w-2 rounded-full ${v.sev === "high" ? "bg-danger" : v.sev === "medium" ? "bg-warning" : "bg-muted-foreground"}`}
                />
                <div className="flex-1">
                  <div className="text-sm font-medium">{v.code}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{v.d}</div>
                </div>
                <button className="text-xs text-primary hover:underline">Remediate →</button>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="text-sm font-semibold mb-2 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Risk Heatmap
            </div>
            <div className="text-[10px] text-muted-foreground mb-2">12 weeks × 7 controls</div>
            <div className="grid grid-cols-12 gap-1">
              {heatmap.map((c, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded ${c.v === "high" ? "bg-danger/70" : c.v === "med" ? "bg-warning/60" : "bg-primary/25"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="text-sm font-semibold flex items-center gap-2 mb-4">
            <FileText className="h-4 w-4 text-primary" />
            Recent Audits
          </div>
          <ul className="space-y-3 text-sm">
            {[
              { d: "SOC 2 Type II Renewal", when: "Passed · Jun 2026", ok: true },
              { d: "GDPR Annual Review", when: "Passed · May 2026", ok: true },
              { d: "HIPAA Risk Assessment", when: "3 findings · Apr 2026", ok: false },
              { d: "ISO 27001 Surveillance", when: "Passed · Mar 2026", ok: true },
              { d: "Vendor Security Review Q1", when: "12 vendors · Mar 2026", ok: true },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className={`h-2 w-2 rounded-full mt-2 ${a.ok ? "bg-success" : "bg-warning"}`}
                />
                <div>
                  <div className="font-medium">{a.d}</div>
                  <div className="text-[11px] text-muted-foreground">{a.when}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}
