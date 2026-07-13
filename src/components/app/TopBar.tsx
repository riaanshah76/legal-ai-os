import { Bell, Search, Sun, Moon, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

export function TopBar({ title }: { title?: string }) {
  const [dark, setDark] = useState(true);
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="h-full px-6 flex items-center gap-4">
        {title && <h1 className="text-sm font-semibold hidden md:block">{title}</h1>}
        <div className="flex-1 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input placeholder="Search contracts, cases, clauses…"
              className="w-full h-9 pl-9 pr-14 rounded-lg bg-muted/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20" />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] px-1.5 py-0.5 rounded border border-border bg-background text-muted-foreground">⌘K</kbd>
          </div>
        </div>
        <button onClick={() => setDark(!dark)} className="h-9 w-9 grid place-items-center rounded-lg hover:bg-accent/50 text-muted-foreground">
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <button className="relative h-9 w-9 grid place-items-center rounded-lg hover:bg-accent/50 text-muted-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>
        <Link to="/settings" className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-accent/50">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-chart-5 grid place-items-center text-[11px] font-bold text-primary-foreground">SM</div>
          <div className="hidden md:block text-left leading-tight">
            <div className="text-xs font-medium">Sarah Miller</div>
            <div className="text-[10px] text-muted-foreground">General Counsel</div>
          </div>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </Link>
      </div>
    </header>
  );
}
