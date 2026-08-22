"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MenuSection } from "@/components/layout/Sidebar";
import {
  LayoutDashboard, User, CalendarCheck, CalendarOff, CreditCard,
  GraduationCap, FileText, Bell, TrendingUp, Megaphone, CalendarDays,
  CheckSquare, HelpCircle, Settings,
} from "lucide-react";

const employeeSidebarSections: MenuSection[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", href: "/employee/dashboard", icon: LayoutDashboard },
      { title: "Announcements", href: "/employee/announcements", icon: Megaphone, badge: 2 },
      { title: "Calendar", href: "/employee/calendar", icon: CalendarDays },
      { title: "My Tasks", href: "/employee/tasks", icon: CheckSquare },
    ],
  },
  {
    label: "My HR",
    items: [
      { title: "Attendance", href: "/employee/attendance", icon: CalendarCheck },
      { title: "Leave", href: "/employee/leave", icon: CalendarOff },
      { title: "Payslips", href: "/employee/payroll", icon: CreditCard },
    ],
  },
  {
    label: "Growth",
    items: [
      { title: "Training", href: "/employee/training", icon: GraduationCap },
      { title: "Performance", href: "/employee/performance", icon: TrendingUp },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "My Profile", href: "/employee/profile", icon: User },
      { title: "Documents", href: "/employee/documents", icon: FileText },
      { title: "Notifications", href: "/employee/notifications", icon: Bell, badge: 3 },
      { title: "Settings", href: "/employee/settings", icon: Settings },
      { title: "Help Center", href: "/employee/help", icon: HelpCircle },
    ],
  },
];

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="employee" sidebarSections={employeeSidebarSections}>
      {children}
    </DashboardLayout>
  );
}
