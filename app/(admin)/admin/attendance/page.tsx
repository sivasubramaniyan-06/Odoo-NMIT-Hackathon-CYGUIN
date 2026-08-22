"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import {
  Clock,
  UserCheck,
  UserX,
  AlertTriangle,
  Search,
  SlidersHorizontal,
  Download,
} from "lucide-react";

// Mock daily clock logs
const attendanceLogs = [
  { id: "1", name: "Courtney Henry", role: "Software Engineer", timeIn: "08:52 AM", timeOut: "05:30 PM", hours: "8.6h", status: "PRESENT", method: "Web App" },
  { id: "2", name: "Devon Webb", role: "UI Designer", timeIn: "09:12 AM", timeOut: "06:00 PM", hours: "8.8h", status: "LATE", method: "Mobile App" },
  { id: "3", name: "Theresa Webb", role: "Product Manager", timeIn: "08:45 AM", timeOut: "05:15 PM", hours: "8.5h", status: "PRESENT", method: "Web App" },
  { id: "4", name: "Darlene Robertson", role: "QA Engineer", timeIn: "---", timeOut: "---", hours: "0h", status: "ABSENT", method: "---" },
  { id: "5", name: "Floyd Miles", role: "HR Specialist", timeIn: "09:05 AM", timeOut: "05:00 PM", hours: "7.9h", status: "LATE", method: "Web App" },
  { id: "6", name: "Bessie Cooper", role: "Account Executive", timeIn: "08:58 AM", timeOut: "05:40 PM", hours: "8.7h", status: "PRESENT", method: "Web App" },
];

export default function AdminAttendancePage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLogs = attendanceLogs.filter((log) => {
    const matchesSearch = log.name.toLowerCase().includes(search.toLowerCase()) || log.role.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Attendance Logs
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor daily employee log times, locations, and schedules.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2 cursor-pointer">
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <UserCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Present Today</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">1,348</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">94.6% presence rate</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Late Arrivals</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">42</h3>
            <p className="text-[10px] text-amber-600 font-semibold mt-1">Checked in after 09:00 AM</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <UserX className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Absent Staff</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">14</h3>
            <p className="text-[10px] text-rose-600 font-semibold mt-1">8 pre-approved leaves</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-secondary rounded-xl">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Missing Check-outs</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">8</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">From yesterday's shift</p>
          </div>
        </Card>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between bg-card p-4 rounded-xl border border-border">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search employee or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-slate-50/50 py-2.5 pl-9 pr-3 text-xs focus:bg-card focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-border bg-card py-2.5 px-3 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none shadow-sm cursor-pointer"
          >
            <option value="all">All Logs</option>
            <option value="PRESENT">Present</option>
            <option value="LATE">Late</option>
            <option value="ABSENT">Absent</option>
          </select>
          <Button variant="outline" size="icon" className="h-9 w-9 cursor-pointer">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full text-sm border-collapse text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-border text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
              <th className="p-4">Employee</th>
              <th className="p-4">Clock In</th>
              <th className="p-4">Clock Out</th>
              <th className="p-4">Hours Logged</th>
              <th className="p-4">Method</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/40">
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-700">{log.name}</span>
                    <span className="text-[10px] text-slate-400">{log.role}</span>
                  </div>
                </td>
                <td className="p-4 text-slate-600 text-xs font-medium">{log.timeIn}</td>
                <td className="p-4 text-slate-600 text-xs font-medium">{log.timeOut}</td>
                <td className="p-4 text-slate-600 text-xs font-medium">{log.hours}</td>
                <td className="p-4 text-slate-400 text-xs">{log.method}</td>
                <td className="p-4">
                  <Badge variant={log.status === "PRESENT" ? "success" : log.status === "LATE" ? "warning" : "danger"}>
                    {log.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
