"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface Tab {
  label: string;
  value: string;
  badge?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-xl bg-slate-100/80 p-1 border border-slate-200/60",
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={activeTab === tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all cursor-pointer",
            activeTab === tab.value
              ? "bg-card text-foreground shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          {tab.label}
          {tab.badge !== undefined && tab.badge > 0 && (
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[9px] font-bold",
                activeTab === tab.value
                  ? "bg-primary text-white"
                  : "bg-slate-200 text-slate-600"
              )}
            >
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
