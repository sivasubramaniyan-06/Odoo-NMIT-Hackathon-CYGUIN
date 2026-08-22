"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MenuItem } from "@/components/layout/Sidebar";
import {
  LayoutDashboard,
  User,
  CalendarCheck,
  CalendarOff,
  CreditCard,
  GraduationCap,
  FileText,
  Bell,
} from "lucide-react";

const employeeSidebarItems: MenuItem[] = [
  { title: "Dashboard", href: "/employee/dashboard", icon: LayoutDashboard },
  { title: "Profile", href: "/employee/profile", icon: User },
  { title: "Attendance", href: "/employee/attendance", icon: CalendarCheck },
  { title: "Leave", href: "/employee/leave", icon: CalendarOff },
  { title: "Payroll", href: "/employee/payroll", icon: CreditCard },
  { title: "Training", href: "/employee/training", icon: GraduationCap },
  { title: "Documents", href: "/employee/documents", icon: FileText },
  { title: "Notifications", href: "/employee/notifications", icon: Bell },
];

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="employee" sidebarItems={employeeSidebarItems}>
      {children}
    </DashboardLayout>
  );
}
