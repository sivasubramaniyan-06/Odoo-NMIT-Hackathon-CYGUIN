"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { StatCard } from "@/components/ui/StatCard";
import { Select } from "@/components/ui/Select";
import { AreaChartWrapper, BarChartWrapper } from "@/components/ui/Charts";
import { Download, BarChart3, Users, CalendarOff, CreditCard, TrendingUp, GraduationCap } from "lucide-react";

const TABS = [
  { label: "Headcount", value: "headcount" },
  { label: "Attendance", value: "attendance" },
  { label: "Leave", value: "leave" },
  { label: "Payroll", value: "payroll" },
  { label: "Training", value: "training" },
];

const headcountData = [
  { month: "Jan", count: 140 }, { month: "Feb", count: 143 }, { month: "Mar", count: 142 },
  { month: "Apr", count: 148 }, { month: "May", count: 153 }, { month: "Jun", count: 158 },
  { month: "Jul", count: 163 }, { month: "Aug", count: 167 },
];

const deptDist = [
  { name: "Engineering", count: 54 }, { name: "Design", count: 18 }, { name: "Sales", count: 32 },
  { name: "Marketing", count: 21 }, { name: "HR", count: 12 }, { name: "Finance", count: 16 },
];

const attendanceData = [
  { month: "Mar", rate: 94.2 }, { month: "Apr", rate: 95.1 }, { month: "May", rate: 96.0 },
  { month: "Jun", rate: 95.7 }, { month: "Jul", rate: 96.8 }, { month: "Aug", rate: 96.2 },
];

const leaveData = [
  { month: "Mar", annual: 28, sick: 10, unpaid: 3 }, { month: "Apr", annual: 32, sick: 14, unpaid: 2 },
  { month: "May", annual: 35, sick: 8, unpaid: 4 }, { month: "Jun", annual: 41, sick: 12, unpaid: 5 },
  { month: "Jul", annual: 37, sick: 9, unpaid: 2 }, { month: "Aug", annual: 29, sick: 7, unpaid: 3 },
];

const payrollTrend = [
  { month: "Mar", total: 380000 }, { month: "Apr", total: 395000 },
  { month: "May", total: 405000 }, { month: "Jun", total: 408000 },
  { month: "Jul", total: 412000 }, { month: "Aug", total: 412850 },
];

const trainingData = [
  { dept: "Engineering", completion: 78 }, { dept: "Design", completion: 92 },
  { dept: "Sales", completion: 65 }, { dept: "Marketing", completion: 81 },
  { dept: "HR", completion: 95 }, { dept: "Finance", completion: 70 },
];

const YEAR_OPTIONS = [{ value: "2026", label: "2026" }, { value: "2025", label: "2025" }];
const QUARTER_OPTIONS = [{ value: "all", label: "Full Year" }, { value: "Q1", label: "Q1" }, { value: "Q2", label: "Q2" }, { value: "Q3", label: "Q3 (Current)" }];

export default function AdminReportsPage() {
  const [tab, setTab] = useState("headcount");
  const [year, setYear] = useState("2026");
  const [quarter, setQuarter] = useState("all");

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Reports & Analytics</h1>
          <p className="text-xs text-slate-500 mt-1">Comprehensive workforce insights and exportable reports</p>
        </div>
        <div className="flex items-end gap-3">
          <Select options={YEAR_OPTIONS} value={year} onChange={(e) => setYear(e.target.value)} className="w-24" />
          <Select options={QUARTER_OPTIONS} value={quarter} onChange={(e) => setQuarter(e.target.value)} className="w-36" />
          <Button variant="outline" size="sm" className="flex items-center gap-1.5 cursor-pointer h-10">
            <Download className="h-4 w-4" /><span>Export</span>
          </Button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Total Headcount" value="167" icon={Users} iconBg="bg-purple-50" iconColor="text-primary" trend={{ value: 18.3, label: "YoY growth" }} />
        <StatCard title="Attendance Rate" value="96.2%" icon={BarChart3} iconBg="bg-emerald-50" iconColor="text-emerald-600" trend={{ value: 2.0 }} />
        <StatCard title="Leave Utilization" value="72%" icon={CalendarOff} iconBg="bg-amber-50" iconColor="text-amber-600" />
        <StatCard title="Avg Payroll/Emp" value="$2,473" icon={CreditCard} iconBg="bg-sky-50" iconColor="text-sky-600" trend={{ value: 3.5 }} />
        <StatCard title="Training Completion" value="81%" icon={GraduationCap} iconBg="bg-indigo-50" iconColor="text-secondary" trend={{ value: 6.2 }} />
      </div>

      <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />

      {tab === "headcount" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Headcount Growth</CardTitle><CardDescription>Monthly employee count trend</CardDescription></CardHeader>
            <CardContent>
              <AreaChartWrapper data={headcountData} xKey="month" areas={[{ key: "count", color: "#6b21a8", label: "Employees" }]} height={220} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Department Distribution</CardTitle><CardDescription>Employees by department</CardDescription></CardHeader>
            <CardContent>
              <BarChartWrapper data={deptDist} xKey="name" bars={[{ key: "count", color: "#4f46e5", label: "Count" }]} height={220} />
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "attendance" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Attendance Rate Trend</CardTitle><CardDescription>Monthly average attendance percentage</CardDescription></CardHeader>
            <CardContent>
              <AreaChartWrapper data={attendanceData} xKey="month" areas={[{ key: "rate", color: "#10b981", label: "Rate (%)" }]} height={220} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Attendance Summary</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Perfect Attendance", count: 89, pct: 53 },
                { label: "≤ 1 Absence", count: 48, pct: 29 },
                { label: "2–5 Absences", count: 23, pct: 14 },
                { label: "5+ Absences", count: 7, pct: 4 },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-3 text-xs">
                  <span className="w-32 text-slate-500">{r.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${r.pct}%` }} />
                  </div>
                  <span className="w-10 text-right font-bold text-slate-700">{r.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "leave" && (
        <Card>
          <CardHeader><CardTitle>Leave Usage Trend</CardTitle><CardDescription>Monthly leave days by type</CardDescription></CardHeader>
          <CardContent>
            <BarChartWrapper
              data={leaveData}
              xKey="month"
              bars={[
                { key: "annual", color: "#6b21a8", label: "Annual" },
                { key: "sick", color: "#4f46e5", label: "Sick" },
                { key: "unpaid", color: "#cbd5e1", label: "Unpaid" },
              ]}
              height={280}
            />
          </CardContent>
        </Card>
      )}

      {tab === "payroll" && (
        <Card>
          <CardHeader><CardTitle>Payroll Cost Trend</CardTitle><CardDescription>Total monthly payroll disbursements</CardDescription></CardHeader>
          <CardContent>
            <AreaChartWrapper data={payrollTrend} xKey="month" areas={[{ key: "total", color: "#6b21a8", label: "Total ($)" }]} height={280} />
          </CardContent>
        </Card>
      )}

      {tab === "training" && (
        <Card>
          <CardHeader><CardTitle>Training Completion by Department</CardTitle><CardDescription>Percentage of assigned courses completed</CardDescription></CardHeader>
          <CardContent>
            <BarChartWrapper
              data={trainingData}
              xKey="dept"
              bars={[{ key: "completion", color: "#4f46e5", label: "Completion %" }]}
              height={280}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
