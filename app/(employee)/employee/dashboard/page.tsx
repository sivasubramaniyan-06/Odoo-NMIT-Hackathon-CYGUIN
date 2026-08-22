"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { StatCard } from "@/components/ui/StatCard";
import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";
import { createClient } from "@/src/lib/supabase/client";
import { AreaChartWrapper, BarChartWrapper } from "@/components/ui/Charts";
import {
  CalendarCheck, CalendarOff, CreditCard, TrendingUp, Clock,
  ArrowRight, Megaphone, CheckSquare, GraduationCap, Star,
  Award, BookOpen
} from "lucide-react";

const quickActions = [
  { label: "Clock In", href: "/employee/attendance", icon: CalendarCheck, color: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200" },
  { label: "Apply Leave", href: "/employee/leave", icon: CalendarOff, color: "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200" },
  { label: "View Payslip", href: "/employee/payroll", icon: CreditCard, color: "bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200" },
  { label: "My Goals", href: "/employee/performance", icon: TrendingUp, color: "bg-sky-50 text-sky-700 hover:bg-sky-100 border-sky-200" },
];

const announcements = [
  { title: "All Hands Meeting — September 3", date: "Aug 22", category: "Company", unread: true },
  { title: "Q3 Performance Review Cycle Opens", date: "Aug 20", category: "HR", unread: true },
  { title: "New WFH Policy Effective Sep 1", date: "Aug 18", category: "Policy", unread: false },
];

const myGoals = [
  { title: "Complete design tokens migration", progress: 90, due: "Sep 30" },
  { title: "Mentor 2 junior designers", progress: 100, due: "Done" },
  { title: "Achieve INP < 200ms optimization", progress: 45, due: "Oct 15" },
];

const myTasks = [
  { title: "Submit Q3 self-review form", due: "Aug 31", priority: "High" },
  { title: "Update portfolio in profile", due: "Sep 5", priority: "Low" },
];

const leaveBalances = [
  { type: "Annual", remaining: 14, total: 20, color: "text-primary" },
  { type: "Sick", remaining: 5, total: 8, color: "text-emerald-600" },
  { type: "Unpaid", remaining: 3, total: 5, color: "text-amber-600" },
];

const priorityColor: Record<string, string> = {
  High: "bg-rose-100 text-rose-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-slate-100 text-slate-600",
};

export default function EmployeeDashboardPage() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const { user, loading: authLoading } = useAuth();
  const email = user?.email || "";
  const supabase = createClient();

  const [employeeInfo, setEmployeeInfo] = useState<any>(null);
  const [goals, setGoals] = useState<any[]>(myGoals);
  const [leaves, setLeaves] = useState<any[]>(leaveBalances);
  const [loading, setLoading] = useState(true);
  const [checkedInStatus, setCheckedInStatus] = useState("Not checked in yet today");

  // Summary Metrics
  const [attendanceRate, setAttendanceRate] = useState("96.2%");
  const [remainingLeavesCount, setRemainingLeavesCount] = useState(14);
  const [pendingTasksCount, setPendingTasksCount] = useState(2);
  const [monthlySalary, setMonthlySalary] = useState("$5,200");
  const [performanceScore, setPerformanceScore] = useState("4.8");
  const [completedTrainings, setCompletedTrainings] = useState(1);

  // Charts data
  const attendanceHistory = useMemo(() => [
    { name: "Mon", rate: 95 },
    { name: "Tue", rate: 98 },
    { name: "Wed", rate: 100 },
    { name: "Thu", rate: 96 },
    { name: "Fri", rate: 97 },
  ], []);

  const workingHoursHistory = useMemo(() => [
    { name: "Mon", hours: 8.5 },
    { name: "Tue", hours: 8 },
    { name: "Wed", hours: 9 },
    { name: "Thu", hours: 7.5 },
    { name: "Fri", hours: 8 },
  ], []);

  const fetchEmployeeData = async () => {
    if (!email) {
      if (!authLoading) {
        setLoading(false);
      }
      return;
    }

    try {
      // 1. Fetch Employee record by email
      const { data: emp } = await supabase
        .from("employees")
        .select("*")
        .eq("work_email", email)
        .maybeSingle();

      if (emp) {
        setEmployeeInfo(emp);

        // Fetch Goals for this employee
        const { data: goalsList } = await supabase
          .from("goals")
          .select("*")
          .eq("employee_id", emp.id);
        if (goalsList && goalsList.length > 0) {
          setGoals(goalsList.map(g => ({
            title: g.title,
            progress: g.progress || 0,
            due: g.end_date ? new Date(g.end_date).toLocaleDateString() : "No deadline",
            status: g.status || "todo"
          })));

          const pendingCount = goalsList.filter(g => g.status !== "done" && g.status !== "Completed").length;
          setPendingTasksCount(pendingCount);

          const completedCount = goalsList.filter(g => g.status === "done" || g.status === "Completed").length;
          setCompletedTrainings(completedCount + 1); // default fallback
        }

        // Fetch Leave Requests to compute leave balance
        const { data: leavesList } = await supabase
          .from("leave_requests")
          .select("*")
          .eq("employee_id", emp.id);

        if (leavesList) {
          const usedAnnual = leavesList.filter(l => l.leave_type === "Annual" && l.status === "Approved").reduce((sum, l) => sum + (l.duration || 1), 0);
          const usedSick = leavesList.filter(l => l.leave_type === "Sick" && l.status === "Approved").reduce((sum, l) => sum + (l.duration || 1), 0);
          const usedUnpaid = leavesList.filter(l => l.leave_type === "Unpaid" && l.status === "Approved").reduce((sum, l) => sum + (l.duration || 1), 0);

          setRemainingLeavesCount(Math.max(0, 20 - usedAnnual));
          setLeaves([
            { type: "Annual", remaining: Math.max(0, 20 - usedAnnual), total: 20, color: "text-primary" },
            { type: "Sick", remaining: Math.max(0, 8 - usedSick), total: 8, color: "text-emerald-600" },
            { type: "Unpaid", remaining: Math.max(0, 5 - usedUnpaid), total: 5, color: "text-amber-600" }
          ]);
        }

        // Fetch today's clock in status
        const todayStr = new Date().toISOString().split("T")[0];
        const { data: todayLog } = await supabase
          .from("attendance_logs")
          .select("*")
          .eq("employee_id", emp.id)
          .gte("created_at", `${todayStr}T00:00:00`)
          .maybeSingle();

        if (todayLog) {
          setCheckedInStatus(`You checked in today at ${new Date(todayLog.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
        }

        // Fetch attendance rate
        const { data: attendanceLogs } = await supabase
          .from("attendance_logs")
          .select("status")
          .eq("employee_id", emp.id);
        if (attendanceLogs && attendanceLogs.length > 0) {
          const present = attendanceLogs.filter(a => a.status === "Present" || a.status === "On Time").length;
          setAttendanceRate(`${((present / attendanceLogs.length) * 100).toFixed(1)}%`);
        }

        // Fetch salary
        const { data: salary } = await supabase
          .from("employee_salary")
          .select("base_salary")
          .eq("employee_id", emp.id)
          .maybeSingle();
        if (salary) {
          setMonthlySalary(`$${Math.round(salary.base_salary || 5200)}`);
        }
      } else {
        // Fallback using auth user name if profile/employee record is not fully set up in postgres yet
        setEmployeeInfo({
          first_name: user?.user_metadata?.full_name?.split(" ")[0] || "Employee",
          last_name: user?.user_metadata?.full_name?.split(" ").slice(1).join(" ") || ""
        });
      }
    } catch (err) {
      console.error("Employee dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;

    if (!email) {
      setLoading(false);
      return;
    }

    fetchEmployeeData();

    // Subscribe to realtime updates for goals, leave requests, and attendance logs
    const channel = supabase
      .channel("employee_dashboard_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "goals" },
        () => { fetchEmployeeData(); }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "leave_requests" },
        () => { fetchEmployeeData(); }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "attendance_logs" },
        () => { fetchEmployeeData(); }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [email, authLoading]);

  if (loading) return <div className="p-6">Loading workspace...</div>;

  const displayName = employeeInfo ? `${employeeInfo.first_name || ""} ${employeeInfo.last_name || ""}`.trim() : "Employee";

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Greeting Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-secondary to-indigo-400 p-6 text-white shadow-lg">
        <div className="relative z-10">
          <h1 className="text-xl font-bold sm:text-2xl">{greeting}, {displayName} 👋</h1>
          <p className="text-sm text-white/80 mt-1">{today}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/90 font-medium">{checkedInStatus}</span>
          </div>
        </div>
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
        <div className="absolute -right-4 bottom-0 h-24 w-24 rounded-full bg-white/10" />
      </div>

      {/* Top KPI Summary Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-6">
        <StatCard title="Attendance Rate" value={attendanceRate} icon={CalendarCheck} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard title="Leaves Remaining" value={`${remainingLeavesCount} Days`} icon={CalendarOff} iconBg="bg-amber-50" iconColor="text-amber-600" />
        <StatCard title="Pending Tasks" value={String(pendingTasksCount)} icon={CheckSquare} iconBg="bg-rose-50" iconColor="text-rose-600" />
        <StatCard title="Monthly Salary" value={monthlySalary} icon={CreditCard} iconBg="bg-purple-50" iconColor="text-purple-600" />
        <StatCard title="Performance Score" value={`${performanceScore} / 5`} icon={TrendingUp} iconBg="bg-sky-50" iconColor="text-sky-600" />
        <StatCard title="Trainings Finished" value={String(completedTrainings)} icon={GraduationCap} iconBg="bg-indigo-50" iconColor="text-indigo-600" />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} href={action.href}>
              <button className={`w-full flex flex-col items-center gap-2 rounded-xl border p-4 text-xs font-bold transition-all cursor-pointer ${action.color}`}>
                <Icon className="h-5 w-5" />
                {action.label}
              </button>
            </Link>
          );
        })}
      </div>

      {/* Analytics Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold text-slate-800">Attendance History (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChartWrapper
              data={attendanceHistory}
              xKey="name"
              areas={[{ key: "rate", color: "#4f46e5", label: "Attendance Rate" }]}
              height={180}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold text-slate-800">Working Hours (Daily)</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChartWrapper
              data={workingHoursHistory}
              xKey="name"
              bars={[{ key: "hours", color: "#6b21a8", label: "Hours Worked" }]}
              height={180}
            />
          </CardContent>
        </Card>
      </div>

      {/* Middle Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Leave Balances */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm">Leave Balances</CardTitle>
            <Link href="/employee/leave"><span className="text-xs text-primary hover:underline font-semibold cursor-pointer flex items-center gap-1">Apply <ArrowRight className="h-3 w-3" /></span></Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {leaves.map((lb) => (
              <div key={lb.type}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-600">{lb.type} Leave</span>
                  <span className={`font-bold ${lb.color}`}>{lb.remaining} / {lb.total} days</span>
                </div>
                <Progress value={lb.remaining} max={lb.total} size="sm" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* My Goals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm">My Goals</CardTitle>
            <Link href="/employee/performance"><span className="text-xs text-primary hover:underline font-semibold cursor-pointer flex items-center gap-1">View all <ArrowRight className="h-3 w-3" /></span></Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.slice(0, 3).map((goal) => (
              <div key={goal.title}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-700 flex-1 pr-2 truncate">{goal.title}</span>
                  <span className={`font-bold shrink-0 ${goal.progress === 100 ? "text-emerald-600" : "text-primary"}`}>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} size="sm" variant={goal.progress === 100 ? "success" : "default"} />
                <p className="text-[10px] text-slate-400 mt-0.5">Due: {goal.due}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* My Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm">My Tasks</CardTitle>
            <Link href="/employee/tasks"><span className="text-xs text-primary hover:underline font-semibold cursor-pointer flex items-center gap-1">View all <ArrowRight className="h-3 w-3" /></span></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {goals.filter(g => g.status !== "done").slice(0, 2).map((task) => (
              <div key={task.title} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckSquare className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span className="text-[10px] text-slate-400">Due {task.due}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {task.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <Link href="/employee/tasks">
              <Button variant="outline" size="sm" className="w-full cursor-pointer">+ Add Task</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Announcements + Training */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Announcements */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm flex items-center gap-2"><Megaphone className="h-4 w-4 text-primary" />Announcements</CardTitle>
            <Link href="/employee/announcements"><span className="text-xs text-primary hover:underline font-semibold cursor-pointer">See all</span></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {announcements.map((ann, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border transition-colors cursor-pointer hover:border-primary/30 ${ann.unread ? "bg-purple-50/40 border-purple-100" : "bg-slate-50 border-slate-100"}`}>
                {ann.unread && <span className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{ann.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-[9px]">{ann.category}</Badge>
                    <span className="text-[10px] text-slate-400">{ann.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Training Progress */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm flex items-center gap-2"><GraduationCap className="h-4 w-4 text-secondary" />Active Training</CardTitle>
            <Link href="/employee/training"><span className="text-xs text-primary hover:underline font-semibold cursor-pointer">View all</span></Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Code of Conduct 2026", progress: 100, lessons: "6/6", cert: true },
              { name: "Security Awareness Training", progress: 60, lessons: "3/5", cert: false },
              { name: "Advanced React Patterns", progress: 30, lessons: "2/7", cert: false },
            ].map((course) => (
              <div key={course.name} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-700 flex items-center gap-1.5">
                    {course.name}
                    {course.cert && <Star className="h-3 w-3 text-amber-500" />}
                  </span>
                  <span className="text-slate-400 text-[10px]">{course.lessons} lessons</span>
                </div>
                <Progress value={course.progress} size="sm" variant={course.progress === 100 ? "success" : "default"} showValue />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
