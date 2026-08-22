"use client";

import React from "react";
import Sidebar, { MenuItem } from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  role: "admin" | "employee";
  sidebarItems: MenuItem[];
  children: React.ReactNode;
}

export default function DashboardLayout({
  role,
  sidebarItems,
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar Placeholder */}
      <Sidebar role={role} items={sidebarItems} />

      {/* Main Panel container (offset by sidebar width 64) */}
      <div className="flex flex-col min-h-screen md:pl-64">
        {/* Header Placeholder */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
