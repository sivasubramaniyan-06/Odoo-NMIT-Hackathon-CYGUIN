"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BarChartWrapper } from "@/components/ui/Charts";
import {
  CalendarRange,
  FileCheck2,
  AlertCircle,
  Clock,
  Check,
  X,
} from "lucide-react";

// Leave split data
const monthlyLeavesData = [
  { name: "Jan", Sick: 12, Annual: 24, Unpaid: 4 },
  { name: "Feb", Sick: 8, Annual: 18, Unpaid: 2 },
  { name: "Mar", Sick: 15, Annual: 32, Unpaid: 6 },
  { name: "Apr", Sick: 10, Annual: 28, Unpaid: 5 },
  { name: "May", Sick: 14, Annual: 45, Unpaid: 8 },
  { name: "Jun", Sick: 20, Annual: 55, Unpaid: 12 },
];

const pendingRequests = [
  { id: "1", name: "Dianne Russell", role: "Software Engineer", type: "Sick Leave", duration: "Aug 24 - Aug 25 (2 days)", reason: "Medical procedure follow-up.", appliedDate: "Aug 21, 2026" },
  { id: "2", name: "Guy Hawkins", role: "UI Designer", type: "Annual Leave", duration: "Sep 01 - Sep 07 (7 days)", reason: "Family vacation trip.", appliedDate: "Aug 20, 2026" },
  { id: "3", name: "Kristin Watson", role: "Product Manager", type: "Paternity Leave", duration: "Aug 28 - Sep 11 (14 days)", reason: "Welcoming newborn child.", appliedDate: "Aug 19, 2026" },
  { id: "4", name: "Jane Doe", role: "Support Team Lead", type: "Unpaid Leave", duration: "Oct 12 - Oct 14 (3 days)", reason: "Personal emergency travel.", appliedDate: "Aug 22, 2026" },
];

export default function AdminLeavePage() {
  const [requests, setRequests] = useState(pendingRequests);

  const handleApprove = (id: string) => {
    setRequests(requests.filter((r) => r.id !== id));
  };

  const handleReject = (id: string) => {
    setRequests(requests.filter((r) => r.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Leave Management
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review pending request queues, analyze leave cycles, and verify team calendars.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-primary rounded-xl">
            <CalendarRange className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Out Today</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">24</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Active leave records</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Approvals</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">{requests.length}</h3>
            <p className="text-[10px] text-amber-600 font-semibold mt-1">Require admin review</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <FileCheck2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Approved (Month)</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">112</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">98.4% approval rate</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rejected Requests</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">6</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">In current calendar cycle</p>
          </div>
        </Card>
      </div>

      {/* Analytics Graph */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Type Distribution</CardTitle>
          <CardDescription>Monthly breakdown of sick, annual, and unpaid leave allocations</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChartWrapper data={monthlyLeavesData} dataKeys={["Sick", "Annual", "Unpaid"]} height={280} />
        </CardContent>
      </Card>

      {/* Pending Approvals Section */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Request Stream</CardTitle>
          <CardDescription>Approve or deny submitted employee leave proposals</CardDescription>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No leave requests pending review. All caught up!
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {requests.map((request) => (
                <div key={request.id} className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-800">{request.name}</span>
                      <span className="text-[10px] text-slate-400">({request.role})</span>
                      <Badge variant="warning" className="text-[9px] px-2 py-0.5">
                        {request.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 font-semibold">{request.duration}</p>
                    <p className="text-xs text-slate-500 italic">" {request.reason} "</p>
                    <p className="text-[10px] text-slate-400">Applied: {request.appliedDate}</p>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto shrink-0">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(request.id)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 h-9 cursor-pointer"
                    >
                      <Check className="h-4 w-4" />
                      <span>Approve</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(request.id)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-1.5 border-rose-200 hover:bg-rose-50 text-rose-600 text-xs px-3 h-9 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                      <span>Reject</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
