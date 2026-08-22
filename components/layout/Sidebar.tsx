"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon, X, ArrowLeftRight } from "lucide-react";
import { useUIStore } from "@/store";
import { cn } from "@/lib/utils";

export interface MenuItem {
  title: string;
  href: string;
  icon?: LucideIcon;
}

interface SidebarProps {
  role: "admin" | "employee";
  items: MenuItem[];
}

export default function Sidebar({ role, items }: SidebarProps) {
  const pathname = usePathname();
  const { isSidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <>
      {/* Mobile Overlay backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform duration-300 md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <Link href={`/${role}/dashboard`} className="flex items-center gap-2.5 font-bold text-foreground">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-sm shadow-sm">
              HR
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight leading-none">HRMS SaaS</span>
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">
                Enterprise
              </span>
            </div>
          </Link>

          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 hover:bg-muted text-muted-foreground md:hidden cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Area */}
        <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)} // Auto-close drawer on mobile link click
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold tracking-wide transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {Icon && (
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform",
                      isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"
                    )}
                  />
                )}
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer: Portal Switcher & Account */}
        <div className="border-t border-border p-4 space-y-3">
          {/* Quick Portal Switcher */}
          <Link
            href={role === "admin" ? "/employee/dashboard" : "/admin/dashboard"}
            className="flex items-center justify-center gap-2 w-full rounded-lg border border-dashed border-border py-2 text-xs font-semibold text-slate-600 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <ArrowLeftRight className="h-3.5 w-3.5" />
            <span>Switch to {role === "admin" ? "Employee" : "Admin"}</span>
          </Link>

          {/* User Badge */}
          <div className="flex items-center gap-3 rounded-lg p-2 bg-slate-50/50 border border-slate-100">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10 flex items-center justify-center text-primary text-xs font-bold border border-primary/15">
              US
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold text-slate-700 truncate leading-none">Alex Rivera</span>
              <span className="text-[9px] text-muted-foreground font-semibold capitalize mt-1 tracking-wider uppercase">
                {role} account
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
