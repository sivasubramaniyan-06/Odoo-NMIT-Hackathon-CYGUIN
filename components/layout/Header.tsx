"use client";

import { usePathname, useRouter } from "next/navigation";
import { Bell, Search, Menu, User, LogOut, ShieldAlert, ChevronRight, Settings } from "lucide-react";
import { useUIStore, useAuthStore } from "@/store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

interface BreadcrumbSegment {
  label: string;
  href?: string;
}

function getBreadcrumbs(pathname: string): BreadcrumbSegment[] {
  const parts = pathname.split("/").filter(Boolean);
  const crumbs: BreadcrumbSegment[] = [];

  const portalLabel: Record<string, string> = {
    admin: "HR Admin",
    employee: "Employee Portal",
  };

  const moduleLabels: Record<string, string> = {
    dashboard: "Dashboard",
    employees: "Employees",
    attendance: "Attendance",
    leave: "Leave",
    payroll: "Payroll",
    recruitment: "Recruitment",
    performance: "Performance",
    training: "Training",
    assets: "Assets",
    settings: "Settings",
    profile: "Profile",
    organization: "Organization",
    reports: "Reports & Analytics",
    documents: "Documents",
    notifications: "Notifications",
    announcements: "Announcements",
    calendar: "Calendar",
    tasks: "My Tasks",
    help: "Help Center",
  };

  if (parts[0] && portalLabel[parts[0]]) {
    crumbs.push({ label: portalLabel[parts[0]], href: `/${parts[0]}/dashboard` });
  }
  if (parts[1] && moduleLabels[parts[1]]) {
    crumbs.push({ label: moduleLabels[parts[1]] });
  }
  if (parts[2]) {
    crumbs.push({ label: `#${parts[2]}` });
  }

  return crumbs;
}

function getHeaderTitle(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "Overview";

  const isEmployee = parts[0] === "employee";
  const moduleName = parts[1] || "dashboard";

  const titles: Record<string, string> = {
    dashboard: isEmployee ? "My Dashboard" : "Executive Dashboard",
    employees: "Employee Directory",
    attendance: isEmployee ? "My Attendance" : "Attendance Management",
    leave: isEmployee ? "Leave Portal" : "Leave Management",
    payroll: isEmployee ? "My Payslips" : "Payroll Management",
    recruitment: "Recruitment & ATS",
    performance: isEmployee ? "My Performance" : "Performance Management",
    training: isEmployee ? "My Learning" : "Learning Management",
    assets: "Asset Management",
    settings: "System Settings",
    profile: isEmployee ? "My Profile" : "Admin Profile",
    organization: "Organization",
    reports: "Reports & Analytics",
    documents: "My Documents",
    notifications: "Notifications",
    announcements: "Announcements",
    calendar: "Company Calendar",
    tasks: "My Tasks",
    help: "Help Center",
  };

  return titles[moduleName] || "HRMS Portal";
}

const mockNotifications = [
  { id: 1, icon: ShieldAlert, color: "text-primary", title: "Leave Request Approved", desc: "Your sick leave for Aug 25 has been approved.", time: "5m ago", unread: true },
  { id: 2, icon: User, color: "text-secondary", title: "New Course Assigned", desc: "You have been enrolled in Code of Conduct training.", time: "2h ago", unread: true },
  { id: 3, icon: Bell, color: "text-amber-500", title: "Payslip Available", desc: "Your July 2026 payslip is ready to view.", time: "Yesterday", unread: false },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const title = getHeaderTitle(pathname);
  const breadcrumbs = getBreadcrumbs(pathname);
  const { setSidebarOpen } = useUIStore();
  const { setAuthUser } = useAuthStore();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  const handleLogout = () => {
    setAuthUser(null);
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-card/95 backdrop-blur-sm px-4 md:px-6 shadow-sm">
      {/* Left: Hamburger + Title + Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-1.5 hover:bg-slate-100 text-slate-500 md:hidden cursor-pointer shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex flex-col min-w-0">
          <h1 className="text-sm font-bold tracking-tight text-foreground sm:text-base truncate">{title}</h1>
          {breadcrumbs.length > 1 && (
            <nav className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5" aria-label="breadcrumb">
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="h-2.5 w-2.5" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-primary transition-colors font-medium">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-slate-500">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* Right: Search, Notifications, Profile */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Global Search */}
        <div className="relative hidden w-56 lg:block">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="search"
            placeholder="Search... (⌘K)"
            className="w-full rounded-lg border border-border bg-slate-50 py-2 pl-8 pr-3 text-xs outline-none placeholder:text-slate-400 focus:bg-card focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsProfileOpen(false); }}
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 h-3.5 w-3.5 rounded-full bg-primary text-[8px] font-bold text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
              <div className="absolute right-0 top-10 w-80 rounded-xl border border-border bg-card p-0 shadow-xl z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <span className="text-sm font-bold text-slate-700">Notifications</span>
                  <span className="text-[10px] text-primary hover:underline cursor-pointer font-semibold">Mark all read</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                  {mockNotifications.map((n) => {
                    const NIcon = n.icon;
                    return (
                      <div key={n.id} className={cn("flex gap-3 p-3 hover:bg-slate-50 cursor-pointer transition-colors", n.unread && "bg-purple-50/30")}>
                        <div className={cn("rounded-lg p-1.5 shrink-0 mt-0.5", n.unread ? "bg-purple-100" : "bg-slate-100")}>
                          <NIcon className={cn("h-3.5 w-3.5", n.color)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-700">{n.title}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{n.desc}</p>
                          <p className="text-[9px] text-slate-400 mt-1 font-medium">{n.time}</p>
                        </div>
                        {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-border p-2">
                  <Link
                    href={pathname.startsWith("/employee") ? "/employee/notifications" : "/admin/dashboard"}
                    onClick={() => setIsNotificationsOpen(false)}
                    className="block text-center text-xs text-primary font-semibold hover:underline py-1"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationsOpen(false); }}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="Open user menu"
          >
            <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-xs font-bold shadow-sm">
              AR
            </div>
            <span className="hidden sm:block text-xs font-semibold text-slate-700">Alex Rivera</span>
          </button>

          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
              <div className="absolute right-0 top-10 w-52 rounded-xl border border-border bg-card shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-slate-50/50">
                  <p className="text-xs font-bold text-slate-800">Alex Rivera</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">alex.rivera@company.com</p>
                </div>
                <div className="p-1.5 space-y-0.5">
                  <Link
                    href={pathname.startsWith("/employee") ? "/employee/profile" : "/admin/profile"}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                  >
                    <User className="h-3.5 w-3.5" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    href={pathname.startsWith("/employee") ? "/employee/settings" : "/admin/settings"}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                  >
                    <Settings className="h-3.5 w-3.5" />
                    <span>Settings</span>
                  </Link>
                  <div className="border-t border-border my-1" />
                  <button
                    onClick={() => { setIsProfileOpen(false); handleLogout(); }}
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
