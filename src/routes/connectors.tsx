import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/app/AppLayout";
import { MicrosoftLogo, GoogleDriveLogo, SharePointLogo, DropboxLogo, SlackLogo, SalesforceLogo, DocuSignLogo, AdobeLogo, NotionLogo, JiraLogo, TeamsLogo, OutlookLogo } from "@/components/brand/logos";
import { Check } from "lucide-react";

export const Route = createFileRoute("/connectors")({
  head: () => ({ meta: [{ title: "Connectors · Legal AI OS" }] }),
  component: Connectors,
});

const items = [
  { L: MicrosoftLogo, n: "Microsoft 365", d: "Word · Excel · Outlook sync", on: true },
  { L: GoogleDriveLogo, n: "Google Drive", d: "Watch folders & documents", on: true },
  { L: SharePointLogo, n: "SharePoint", d: "Contract libraries", on: true },
  { L: DropboxLogo, n: "Dropbox", d: "Team folders", on: false },
  { L: SlackLogo, n: "Slack", d: "Notifications & approvals", on: true },
  { L: SalesforceLogo, n: "Salesforce", d: "Opportunity → contract", on: true },
  { L: DocuSignLogo, n: "DocuSign", d: "e-Signature routing", on: true },
  { L: AdobeLogo, n: "Adobe Acrobat", d: "PDF form extraction", on: false },
  { L: NotionLogo, n: "Notion", d: "Knowledge base sync", on: false },
  { L: JiraLogo, n: "Jira", d: "Legal ticketing", on: true },
  { L: TeamsLogo, n: "Microsoft Teams", d: "Chat & approvals", on: true },
  { L: OutlookLogo, n: "Outlook", d: "Email intake", on: true },
];

function Connectors() {
  return (
    <AppLayout title="Connectors">
      <PageHeader title="Connectors" description="Connect Legal AI OS to the tools your team already uses."/>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(({ L, n, d, on }) => (
          <div key={n} className="glass rounded-2xl p-5 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-card border border-border grid place-items-center"><L className="h-6 w-6"/></div>
                <div>
                  <div className="text-sm font-semibold">{n}</div>
                  <div className="text-[11px] text-muted-foreground">{d}</div>
                </div>
              </div>
              {on && <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/15 text-success inline-flex items-center gap-1"><Check className="h-3 w-3"/>Connected</span>}
            </div>
            <button className={`mt-4 w-full h-9 rounded-lg text-sm font-medium ${on ? "border border-border hover:bg-accent" : "bg-primary text-primary-foreground hover:opacity-90"}`}>
              {on ? "Manage" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
