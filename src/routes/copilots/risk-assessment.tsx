import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/AppLayout";
import { AlertOctagon } from "lucide-react";
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from "recharts";

export const Route = createFileRoute("/copilots/risk-assessment")({
  head: () => ({ meta: [{ title: "Risk Assessment Copilot · Legal AI OS" }] }),
  component: Risk,
});

const radar = [
  { k: "Contractual", v: 78 },
  { k: "Regulatory", v: 88 },
  { k: "IP", v: 72 },
  { k: "Litigation", v: 91 },
  { k: "Employment", v: 84 },
  { k: "Data / Privacy", v: 76 },
];

const portfolio = [
  { name: "MSA — Acme Corp", exposure: "$4.2M", risk: 78, level: "high" },
  { name: "DPA — Contoso Ltd", exposure: "$1.1M", risk: 82, level: "high" },
  { name: "SaaS — Northwind", exposure: "$860K", risk: 34, level: "low" },
  { name: "License — Adventure Works", exposure: "$2.6M", risk: 61, level: "medium" },
  { name: "Vendor — Fabrikam", exposure: "$310K", risk: 41, level: "medium" },
];

function Risk() {
  return (
    <AppLayout title="Risk Assessment Copilot">
      <PageHeader title="Risk Assessment Copilot" description="Portfolio-wide legal risk scoring across contracts, regulation and litigation."/>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="glass rounded-2xl p-6">
          <div className="text-sm font-semibold mb-2">Risk Profile</div>
          <div className="h-64">
            <ResponsiveContainer>
              <RadarChart data={radar}>
                <PolarGrid stroke="#23252D"/>
                <PolarAngleAxis dataKey="k" tick={{ fill: "#9CA3AF", fontSize: 11 }}/>
                <PolarRadiusAxis stroke="#23252D" tick={false}/>
                <Radar dataKey="v" stroke="#45E0D1" fill="#45E0D1" fillOpacity={0.35}/>
                <Tooltip contentStyle={{ background: "#111318", border: "1px solid #23252D", borderRadius: 12 }}/>
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <div className="text-sm font-semibold mb-4 flex items-center gap-2"><AlertOctagon className="h-4 w-4 text-warning"/>Portfolio Exposure</div>
          <div className="space-y-2">
            {portfolio.map(p => (
              <div key={p.name} className="grid grid-cols-12 items-center gap-3 rounded-xl border border-border p-4">
                <div className="col-span-5">
                  <div className="text-sm font-medium truncate">{p.name}</div>
                  <div className="text-[11px] text-muted-foreground">Exposure {p.exposure}</div>
                </div>
                <div className="col-span-5">
                  <div className="h-2 bg-muted rounded-full">
                    <div className={`h-full rounded-full ${p.level === "high" ? "bg-danger" : p.level === "medium" ? "bg-warning" : "bg-success"}`} style={{width:`${p.risk}%`}}/>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <span className={`text-[11px] px-2 py-0.5 rounded-full ${p.level === "high" ? "bg-danger/15 text-danger" : p.level === "medium" ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}`}>{p.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="text-sm font-semibold mb-3">Mitigation Backlog</div>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>• Insert 2× liability cap into 4 MSAs at renewal</li>
          <li>• Complete GDPR sub-processor list for 2 vendors</li>
          <li>• Standardize non-compete duration across sales team</li>
          <li>• Add arbitration clause to 6 outstanding contracts</li>
        </ul>
      </div>
    </AppLayout>
  );
}
