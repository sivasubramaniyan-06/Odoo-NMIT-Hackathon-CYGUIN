"use client";

import React from "react";
import Sidebar, { MenuSection } from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  role: "admin" | "employee";
  sidebarSections: MenuSection[];
  children: React.ReactNode;
}

export default function DashboardLayout({
  role,
  sidebarSections,
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar role={role} sections={sidebarSections} />

      {/* Main Panel container (offset by sidebar width 64) */}
      <div className="flex flex-col min-h-screen md:pl-64">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
