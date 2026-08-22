"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MenuItem } from "@/components/layout/Sidebar";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarOff,
  CreditCard,
  Briefcase,
  TrendingUp,
  GraduationCap,
  Laptop,
  Settings,
  User,
} from "lucide-react";

const adminSidebarItems: MenuItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Employees", href: "/admin/employees", icon: Users },
  { title: "Attendance", href: "/admin/attendance", icon: CalendarCheck },
  { title: "Leave", href: "/admin/leave", icon: CalendarOff },
  { title: "Payroll", href: "/admin/payroll", icon: CreditCard },
  { title: "Recruitment", href: "/admin/recruitment", icon: Briefcase },
  { title: "Performance", href: "/admin/performance", icon: TrendingUp },
  { title: "Training", href: "/admin/training", icon: GraduationCap },
  { title: "Assets", href: "/admin/assets", icon: Laptop },
  { title: "Settings", href: "/admin/settings", icon: Settings },
  { title: "Profile", href: "/admin/profile", icon: User },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="admin" sidebarItems={adminSidebarItems}>
      {children}
    </DashboardLayout>
  );
}
