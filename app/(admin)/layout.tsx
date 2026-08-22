"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MenuSection } from "@/components/layout/Sidebar";
import {
  LayoutDashboard, Users, CalendarCheck, CalendarOff, CreditCard,
  Briefcase, TrendingUp, GraduationCap, Laptop, Settings, User,
  Building2, BarChart3,
} from "lucide-react";

const adminSidebarSections: MenuSection[] = [
  {
    label: "Core",
    items: [
      { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { title: "Employees", href: "/admin/employees", icon: Users },
      { title: "Organization", href: "/admin/organization", icon: Building2 },
    ],
  },
  {
    label: "Workforce",
    items: [
      { title: "Attendance", href: "/admin/attendance", icon: CalendarCheck },
      { title: "Leave", href: "/admin/leave", icon: CalendarOff, badge: 5 },
      { title: "Payroll", href: "/admin/payroll", icon: CreditCard },
      { title: "Assets", href: "/admin/assets", icon: Laptop },
    ],
  },
  {
    label: "Talent",
    items: [
      { title: "Recruitment", href: "/admin/recruitment", icon: Briefcase, badge: 3 },
      { title: "Performance", href: "/admin/performance", icon: TrendingUp },
      { title: "Training", href: "/admin/training", icon: GraduationCap },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Reports", href: "/admin/reports", icon: BarChart3 },
      { title: "Settings", href: "/admin/settings", icon: Settings },
      { title: "Profile", href: "/admin/profile", icon: User },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="admin" sidebarSections={adminSidebarSections}>
      {children}
    </DashboardLayout>
  );
}
