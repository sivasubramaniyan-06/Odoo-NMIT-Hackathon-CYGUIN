"use client";

import { usePathname, useRouter } from "next/navigation";
import { Bell, Search, Menu, User, LogOut, ShieldAlert } from "lucide-react";
import { useUIStore, useAuthStore } from "@/store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

// Route title mapping helper
function getHeaderTitle(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "Overview";

  const isEmployee = parts[0] === "employee";
  const moduleName = parts[1] || "dashboard";

  const titles: Record<string, string> = {
    dashboard: "Overview Dashboard",
    employees: "Employee Directory & Org Chart",
    attendance: isEmployee ? "My Attendance Check-In" : "Attendance Records",
    leave: isEmployee ? "Leave Requests & Balances" : "Leave Approval Manager",
    payroll: isEmployee ? "My Payroll & Payslips" : "Payroll System",
    recruitment: "Recruitment & ATS Board",
    performance: isEmployee ? "My Performance Goals" : "Employee Performance Reviews",
    training: isEmployee ? "Assigned Courses & Lessons" : "L&D Course Management",
    assets: "Hardware Asset Management",
    settings: "System settings",
    profile: isEmployee ? "My Employee Profile" : "HR Administrator Profile",
    documents: "My Secured Documents",
    notifications: "My Notifications History",
  };

  return titles[moduleName] || "HRMS Portal";
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const title = getHeaderTitle(pathname);
  const { setSidebarOpen } = useUIStore();
  const { setAuthUser } = useAuthStore();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleLogout = () => {
    setAuthUser(null);
    const isEmployee = pathname.startsWith("/employee");
    router.push(isEmployee ? "/login" : "/login"); // standard redirects
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-card px-6 shadow-xs">
      {/* Left side: Hamburger (mobile only) & Dynamic Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-1.5 hover:bg-slate-100 text-slate-500 md:hidden cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex flex-col">
          <h2 className="text-sm font-bold tracking-tight text-foreground sm:text-base md:text-lg">
            {title}
          </h2>
        </div>
      </div>

      {/* Right side: Global Search, Notification Indicator, Profile drop trigger */}
      <div className="flex items-center gap-3">
        {/* Global Search box */}
        <div className="relative hidden w-60 lg:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="search"
            placeholder="Quick search (⌘K)..."
            className="w-full rounded-lg border border-border bg-slate-50/50 py-2 pl-9 pr-3 text-xs outline-none placeholder:text-slate-400 focus:bg-card focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
        </div>

        {/* Notifications Icon with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
          </button>

          {isNotificationsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-border bg-card p-4 shadow-xl z-50">
                <div className="flex items-center justify-between border-b pb-2 mb-2">
                  <span className="text-xs font-bold text-slate-700">Notifications</span>
                  <span className="text-[10px] text-primary hover:underline cursor-pointer">Mark all read</span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  <div className="flex gap-2.5 p-2 hover:bg-slate-50 rounded-lg text-xs cursor-pointer">
                    <ShieldAlert className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-700">Leave Request Approved</p>
                      <p className="text-slate-500 mt-0.5 text-[10px]">Your Sick Leave for August 25 has been approved.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 p-2 hover:bg-slate-50 rounded-lg text-xs cursor-pointer">
                    <User className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-700">New Onboarding Course</p>
                      <p className="text-slate-500 mt-0.5 text-[10px]">You have been enrolled in Code of Conduct training.</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Account avatar dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="Open user menu"
          >
            <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-xs font-bold shadow-sm">
              AR
            </div>
          </button>

          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
              <div className="absolute right-0 mt-2 w-52 rounded-xl border border-border bg-card p-2 shadow-xl z-50">
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-xs font-bold text-slate-700">Alex Rivera</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">alex.rivera@company.com</p>
                </div>
                <div className="p-1 space-y-0.5">
                  <Link
                    href={pathname.startsWith("/employee") ? "/employee/profile" : "/admin/profile"}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                  >
                    <User className="h-3.5 w-3.5" />
                    <span>My Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-2 rounded-lg w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
