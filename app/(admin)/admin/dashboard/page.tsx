"use client";

import React, { useState } from "react";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AreaChartWrapper, BarChartWrapper, PieChartWrapper } from "@/components/ui/Charts";
import { SkeletonKPI } from "@/components/ui/Skeleton";
import {
  Users, CalendarCheck, CalendarOff, CreditCard, Briefcase,
  TrendingUp, Clock, CheckCircle, XCircle, ArrowRight, Plus,
  UserPlus, Download, Activity,
} from "lucide-react";
import Link from "next/link";

const headcountData = [
  { month: "Mar", total: 142, new: 8, resigned: 2 },
  { month: "Apr", total: 148, new: 9, resigned: 3 },
  { month: "May", total: 153, new: 7, resigned: 2 },
  { month: "Jun", total: 158, new: 8, resigned: 3 },
  { month: "Jul", total: 163, new: 6, resigned: 1 },
  { month: "Aug", total: 167, new: 5, resigned: 1 },
];

const deptData = [
  { name: "Engineering", count: 54 },
  { name: "Design", count: 18 },
  { name: "Sales", count: 32 },
  { name: "Marketing", count: 21 },
  { name: "HR", count: 12 },
  { name: "Finance", count: 16 },
  { name: "Operations", count: 14 },
];

const leaveTypeData = [
  { name: "Annual", value: 42, color: "#6b21a8" },
  { name: "Sick", value: 18, color: "#4f46e5" },
  { name: "Unpaid", value: 6, color: "#e2e8f0" },
];

const pendingLeaves = [
  { id: "1", name: "Maria Santos", type: "Annual Leave", dates: "Sep 1–7 (7 days)", dept: "Engineering" },
  { id: "2", name: "James Liu", type: "Sick Leave", dates: "Aug 25 (1 day)", dept: "Design" },
  { id: "3", name: "Priya Mehta", type: "Annual Leave", dates: "Sep 10–12 (3 days)", dept: "Sales" },
];

const recentActivities = [
  { icon: UserPlus, color: "bg-emerald-100 text-emerald-600", text: "Sarah Kim joined Engineering team", time: "Today 9:30 AM" },
  { icon: CheckCircle, color: "bg-blue-100 text-blue-600", text: "Performance review cycle Q3 opened", time: "Today 8:00 AM" },
  { icon: CreditCard, color: "bg-purple-100 text-purple-600", text: "August payroll processed — $412,850", time: "Yesterday" },
  { icon: Briefcase, color: "bg-amber-100 text-amber-600", text: "3 new candidates shortlisted for Senior Dev", time: "Yesterday" },
  { icon: XCircle, color: "bg-rose-100 text-rose-600", text: "Leave denied: Mark Lee — conflicting schedule", time: "Aug 20" },
];

const topPerformers = [
  { name: "Jordan Kim", role: "Lead Engineer", score: 4.9, dept: "Engineering" },
  { name: "Ana Patel", role: "Product Designer", score: 4.8, dept: "Design" },
  { name: "Chen Wei", role: "Sales Director", score: 4.7, dept: "Sales" },
];

export default function AdminDashboardPage() {
  const [loading] = useState(false);

  if (loading) return <div className="p-6"><SkeletonKPI /></div>;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Good morning, Alex 👋</h1>
          <p className="text-xs text-slate-500 mt-1">
            Here's what's happening at Acme Corp — {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1.5 cursor-pointer">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
          <Link href="/admin/employees">
            <Button size="sm" className="flex items-center gap-1.5 cursor-pointer">
              <Plus className="h-4 w-4" />
              <span>Add Employee</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard title="Total Employees" value="167" icon={Users} trend={{ value: 2.4, label: "+4 this month" }} iconBg="bg-purple-50" iconColor="text-primary" />
        <StatCard title="Attendance Rate" value="96.2%" icon={CalendarCheck} trend={{ value: 0.8 }} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard title="Pending Leaves" value="5" icon={CalendarOff} trend={{ value: -12, label: "vs last week" }} iconBg="bg-amber-50" iconColor="text-amber-600" />
        <StatCard title="Open Positions" value="12" icon={Briefcase} trend={{ value: 20 }} iconBg="bg-indigo-50" iconColor="text-secondary" />
        <StatCard title="Payroll (Aug)" value="$412K" icon={CreditCard} trend={{ value: 1.1 }} iconBg="bg-sky-50" iconColor="text-sky-600" />
        <StatCard title="Avg Performance" value="4.4 / 5" icon={TrendingUp} trend={{ value: 3.2 }} iconBg="bg-pink-50" iconColor="text-pink-600" />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Headcount Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Headcount Trend</CardTitle>
            <CardDescription>Monthly employee growth — New hires vs. resignations</CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChartWrapper
              data={headcountData}
              xKey="month"
              areas={[
                { key: "total", color: "#6b21a8", label: "Total" },
                { key: "new", color: "#4f46e5", label: "New Hires" },
              ]}
              height={200}
            />
          </CardContent>
        </Card>

        {/* Leave Type Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Leave Distribution</CardTitle>
            <CardDescription>Active leave requests by type</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChartWrapper
              data={leaveTypeData}
              height={180}
            />
            <div className="space-y-1.5 mt-3">
              {leaveTypeData.map((d) => (
                <div key={d.name} className="flex justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                    {d.name}
                  </span>
                  <span className="font-semibold text-slate-700">{d.value} days</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Department Distribution</CardTitle>
          <CardDescription>Employee headcount across all departments</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChartWrapper
            data={deptData}
            xKey="name"
            bars={[{ key: "count", color: "#6b21a8", label: "Employees" }]}
            height={200}
          />
        </CardContent>
      </Card>

      {/* Bottom Row: Pending Leaves + Activities + Top Performers */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pending Leave Approvals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Leave requests awaiting your review</CardDescription>
            </div>
            <Badge variant="warning">{pendingLeaves.length} pending</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingLeaves.map((leave) => (
              <div key={leave.id} className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-colors">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{leave.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{leave.type} · {leave.dept}</p>
                  <p className="text-[10px] text-primary font-semibold mt-1">{leave.dates}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button className="p-1 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors cursor-pointer">
                    <CheckCircle className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-1 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer">
                    <XCircle className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
            <Link href="/admin/leave">
              <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1.5 mt-1 cursor-pointer">
                <span>View all requests</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest HR events and system updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((act, i) => {
                const Icon = act.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`rounded-lg p-1.5 shrink-0 ${act.color}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-700 font-medium leading-snug">{act.text}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{act.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Highest rated employees this quarter</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topPerformers.map((emp, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="relative shrink-0">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                    {emp.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-400 text-white text-[9px] font-bold flex items-center justify-center">
                    #{i + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800">{emp.name}</p>
                  <p className="text-[10px] text-slate-500">{emp.role}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-primary">{emp.score}</p>
                  <p className="text-[9px] text-slate-400">/ 5.0</p>
                </div>
              </div>
            ))}
            <Link href="/admin/performance">
              <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1.5 cursor-pointer">
                <Activity className="h-3.5 w-3.5" />
                <span>View All Reviews</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
