"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";

// Mock personal leave history
const initialLeaves = [
  { id: "1", type: "Annual Leave", duration: "Sep 01 - Sep 07, 2026 (7 days)", reason: "Family vacation trip.", status: "PENDING" },
  { id: "2", type: "Sick Leave", duration: "Aug 12 - Aug 12, 2026 (1 day)", reason: "Dental checkup.", status: "APPROVED" },
  { id: "3", type: "Annual Leave", duration: "May 04 - May 08, 2026 (5 days)", reason: "Spring break rest.", status: "APPROVED" },
];

export default function EmployeeLeavePage() {
  const [leaves, setLeaves] = useState(initialLeaves);

  // Form states
  const [leaveType, setLeaveType] = useState("Annual Leave");
  const [startDate, setStartDate] = useState("2026-09-01");
  const [endDate, setEndDate] = useState("2026-09-07");
  const [reason, setReason] = useState("");

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return;
    const newLeave = {
      id: String(leaves.length + 1),
      type: leaveType,
      duration: `${startDate} - ${endDate} (Custom)`,
      reason,
      status: "PENDING" as const,
    };
    setLeaves([newLeave, ...leaves]);
    setReason("");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Leave Center
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Apply for leaves, view remaining time balances, and check status reviews.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-primary rounded-xl">
            <CalendarDays className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Annual Balance</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">14 / 20</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">days remaining</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-secondary rounded-xl">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sick Balance</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">5 / 8</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">days remaining</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Approved Requests</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">6</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Completed leave cycles</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <XCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Denied Requests</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">0</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Total historically denied</p>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column: Leave Application Form */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Request Leave</CardTitle>
              <CardDescription>File a new leave request for approval</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Leave Type
                  </label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="flex h-10 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm cursor-pointer"
                  >
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Unpaid Leave">Unpaid Leave</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                  <Input
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Reason for Leave
                  </label>
                  <textarea
                    className="flex min-h-[80px] w-full rounded-lg border border-border bg-card px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm"
                    placeholder="Provide a reason for the leave request..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full flex items-center justify-center gap-2 cursor-pointer">
                  <Calendar className="h-4 w-4" />
                  <span>Submit Application</span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Leave History table */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Leave Application History</CardTitle>
              <CardDescription>Status tracker for your submitted leave requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-border text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
                      <th className="p-4">Type</th>
                      <th className="p-4">Duration</th>
                      <th className="p-4">Reason</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leaves.map((leave) => (
                      <tr key={leave.id} className="hover:bg-slate-50/40">
                        <td className="p-4 font-semibold text-slate-700 text-xs">{leave.type}</td>
                        <td className="p-4 text-slate-600 text-xs font-medium">{leave.duration}</td>
                        <td className="p-4 text-slate-500 text-xs italic">"{leave.reason}"</td>
                        <td className="p-4">
                          <Badge variant={leave.status === "APPROVED" ? "success" : leave.status === "PENDING" ? "warning" : "danger"}>
                            {leave.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
