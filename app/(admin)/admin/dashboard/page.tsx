"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AreaChartWrapper, PieChartWrapper } from "@/components/ui/Charts";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import {
  Users,
  CalendarDays,
  UserPlus,
  FileCheck,
  CreditCard,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
} from "lucide-react";

// Mock data for analytics
const attendanceData = [
  { name: "Mon", rate: 94 },
  { name: "Tue", rate: 96 },
  { name: "Wed", rate: 98 },
  { name: "Thu", rate: 97 },
  { name: "Fri", rate: 95 },
];

const departmentData = [
  { name: "Engineering", value: 45 },
  { name: "Product", value: 15 },
  { name: "Sales", value: 20 },
  { name: "Operations", value: 12 },
  { name: "HR", value: 8 },
];

const pendingLeaves = [
  { id: "1", name: "Dianne Russell", type: "Sick Leave", date: "Aug 24 - Aug 25 (2 days)", status: "PENDING" },
  { id: "2", name: "Guy Hawkins", type: "Annual Leave", date: "Sep 01 - Sep 07 (7 days)", status: "PENDING" },
  { id: "3", name: "Kristin Watson", type: "Paternity Leave", date: "Aug 28 - Sep 11 (14 days)", status: "PENDING" },
];

export default function AdminDashboard() {
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Welcome back, Administrator
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Here is your people operations summary for today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setIsQuickAddOpen(true)} className="flex items-center gap-2 cursor-pointer">
            <Plus className="h-4 w-4" />
            <span>Add Employee</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-primary rounded-xl">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Headcount</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">1,424</h3>
            <p className="text-[10px] text-emerald-600 font-semibold mt-1">+12% MoM growth</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-indigo-100 text-secondary rounded-xl">
            <CalendarDays className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Leaves</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">34</h3>
            <p className="text-[10px] text-amber-600 font-semibold mt-1">4 pending approvals</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-sky-100 text-sky-700 rounded-xl">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Open Positions</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">18</h3>
            <p className="text-[10px] text-indigo-600 font-semibold mt-1">42 active applicants</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Disbursed (Month)</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">$412,850</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Pay run completed Aug 20</p>
          </div>
        </Card>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
            <CardDescription>Daily attendance rate tracker (%) for the current week</CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChartWrapper data={attendanceData} dataKey="rate" strokeColor="#6b21a8" height={280} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Headcounts</CardTitle>
            <CardDescription>Distribution of active employees by business units</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <PieChartWrapper data={departmentData} height={280} />
          </CardContent>
        </Card>
      </div>

      {/* Operations Tables & Feeds */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pending approvals table */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pending Leave Requests</CardTitle>
              <CardDescription>Require review and approval from administration</CardDescription>
            </div>
            <Link href="/admin/leave" className="text-xs font-semibold text-primary hover:underline">
              View All
            </Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold text-xs uppercase">
                    <th className="pb-3">Employee</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Duration</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pendingLeaves.map((leave) => (
                    <tr key={leave.id} className="hover:bg-slate-50/50">
                      <td className="py-3.5 font-semibold text-slate-700">{leave.name}</td>
                      <td className="py-3.5 text-slate-500">{leave.type}</td>
                      <td className="py-3.5 text-slate-500">{leave.date}</td>
                      <td className="py-3.5">
                        <Badge variant="warning">{leave.status}</Badge>
                      </td>
                      <td className="py-3.5 text-right space-x-2">
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-emerald-600 hover:bg-emerald-50 rounded-lg cursor-pointer">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Recent Activities panel */}
        <Card className="space-y-6">
          <div>
            <CardHeader className="p-0 pb-3">
              <CardTitle>Recent Activity Feed</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="flex gap-3 text-xs">
                <Clock className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-700">Sarah Connor clocked in 15 mins late</p>
                  <p className="text-slate-400 mt-0.5">Today at 9:15 AM</p>
                </div>
              </div>
              <div className="flex gap-3 text-xs">
                <FileCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-700">HR Team approved Sick Leave request</p>
                  <p className="text-slate-400 mt-0.5">Yesterday at 4:32 PM</p>
                </div>
              </div>
              <div className="flex gap-3 text-xs">
                <UserPlus className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-700">New Employee onboarded (Marcus Miller)</p>
                  <p className="text-slate-400 mt-0.5">Aug 20 at 11:20 AM</p>
                </div>
              </div>
            </CardContent>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <CardTitle className="text-sm font-bold mb-3">Admin Quick Operations</CardTitle>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/admin/employees" className="flex flex-col items-center justify-center p-3 border border-slate-100 hover:border-primary/30 hover:bg-primary/5 rounded-xl transition-all text-center">
                <UserPlus className="h-5 w-5 text-primary mb-1" />
                <span className="text-[10px] font-bold text-slate-700">Add Staff</span>
              </Link>
              <Link href="/admin/payroll" className="flex flex-col items-center justify-center p-3 border border-slate-100 hover:border-primary/30 hover:bg-primary/5 rounded-xl transition-all text-center">
                <CreditCard className="h-5 w-5 text-primary mb-1" />
                <span className="text-[10px] font-bold text-slate-700">Run Payroll</span>
              </Link>
              <Link href="/admin/recruitment" className="flex flex-col items-center justify-center p-3 border border-slate-100 hover:border-primary/30 hover:bg-primary/5 rounded-xl transition-all text-center">
                <Briefcase className="h-5 w-5 text-primary mb-1" />
                <span className="text-[10px] font-bold text-slate-700">Hire Candidate</span>
              </Link>
              <Link href="/admin/settings" className="flex flex-col items-center justify-center p-3 border border-slate-100 hover:border-primary/30 hover:bg-primary/5 rounded-xl transition-all text-center">
                <TrendingUp className="h-5 w-5 text-primary mb-1" />
                <span className="text-[10px] font-bold text-slate-700">Config Shifts</span>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Add Employee Modal */}
      <Modal isOpen={isQuickAddOpen} onClose={() => setIsQuickAddOpen(false)} title="Quick Add Employee">
        <form onSubmit={(e) => { e.preventDefault(); setIsQuickAddOpen(false); }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" placeholder="John" required />
            <Input label="Last Name" placeholder="Doe" required />
          </div>
          <Input label="Email Address" type="email" placeholder="john.doe@company.com" required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Department" placeholder="Engineering" required />
            <Input label="Designation" placeholder="Senior Engineer" required />
          </div>
          <div className="flex justify-end gap-3 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => setIsQuickAddOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Profile
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
