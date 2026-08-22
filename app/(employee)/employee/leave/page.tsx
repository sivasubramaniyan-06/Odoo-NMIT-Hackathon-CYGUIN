"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { Progress } from "@/components/ui/Progress";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";
import { CalendarOff, Plus, Clock, CheckCircle2, XCircle } from "lucide-react";

const TABS = [
  { label: "Balances", value: "balances" },
  { label: "Apply", value: "apply" },
  { label: "History", value: "history" },
];

const balances = [
  { type: "Annual Leave", used: 6, total: 20, variant: "default" as const, color: "text-primary", bgColor: "bg-purple-50", iconColor: "text-primary" },
  { type: "Sick Leave", used: 3, total: 8, variant: "success" as const, color: "text-emerald-600", bgColor: "bg-emerald-50", iconColor: "text-emerald-600" },
  { type: "Unpaid Leave", used: 2, total: 5, variant: "warning" as const, color: "text-amber-600", bgColor: "bg-amber-50", iconColor: "text-amber-600" },
  { type: "Maternity/Paternity", used: 0, total: 90, variant: "default" as const, color: "text-indigo-600", bgColor: "bg-indigo-50", iconColor: "text-secondary" },
];

const history = [
  { id: "L01", type: "Annual Leave", dates: "Aug 10–15, 2026", days: 6, reason: "Summer holiday", status: "Approved" },
  { id: "L02", type: "Sick Leave", dates: "Jul 12, 2026", days: 1, reason: "Dentist appointment", status: "Approved" },
  { id: "L03", type: "Annual Leave", dates: "Jun 1–3, 2026", days: 3, reason: "Long weekend", status: "Approved" },
];

const LEAVE_TYPES = [
  { value: "Annual Leave", label: "Annual Leave" },
  { value: "Sick Leave", label: "Sick Leave" },
  { value: "Unpaid Leave", label: "Unpaid Leave" },
  { value: "Maternity/Paternity", label: "Maternity/Paternity Leave" },
];

export default function EmployeeLeavePage() {
  const { toast } = useToast();
  const [tab, setTab] = useState("balances");
  const [leaveType, setLeaveType] = useState("Annual Leave");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const calcDays = () => {
    if (!startDate || !endDate) return 0;
    const ms = new Date(endDate).getTime() - new Date(startDate).getTime();
    return Math.max(0, Math.floor(ms / 86400000) + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason) {
      toast({ title: "Please fill all required fields", variant: "error" });
      return;
    }
    toast({ title: "Leave request submitted", description: `Your ${leaveType} request for ${calcDays()} day(s) has been sent for approval.`, variant: "success" });
    setStartDate(""); setEndDate(""); setReason(""); setLeaveType("Annual Leave");
    setTab("history");
  };

  const statusVariant: Record<string, "success" | "warning" | "danger"> = {
    Approved: "success", Pending: "warning", Rejected: "danger",
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Leave Portal</h1>
          <p className="text-xs text-slate-500 mt-1">View balances, apply for leave, and track your requests</p>
        </div>
        <Button size="sm" onClick={() => setTab("apply")} className="flex items-center gap-1.5 cursor-pointer">
          <Plus className="h-4 w-4" /><span>Apply Leave</span>
        </Button>
      </div>

      <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />

      {tab === "balances" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {balances.map((lb) => (
            <Card key={lb.type} className="hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`rounded-xl p-3 shrink-0 ${lb.bgColor}`}>
                  <CalendarOff className={`h-5 w-5 ${lb.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-slate-800">{lb.type}</p>
                    <span className={`text-sm font-extrabold ${lb.color}`}>{lb.total - lb.used} left</span>
                  </div>
                  <Progress value={lb.total - lb.used} max={lb.total} size="md" variant={lb.variant} />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Used: {lb.used} days</span>
                    <span>Total: {lb.total} days/year</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "apply" && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Submit Leave Request</CardTitle>
            <CardDescription>Your request will be reviewed by your manager within 24–48 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Select label="Leave Type" options={LEAVE_TYPES} value={leaveType} onChange={(e) => setLeaveType(e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                <Input label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
              </div>
              {calcDays() > 0 && (
                <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                  <Clock className="h-4 w-4" />
                  <span>Duration: {calcDays()} working day{calcDays() > 1 ? "s" : ""}</span>
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Reason *</label>
                <textarea value={reason} onChange={(e) => setReason(e.target.value)} className="w-full min-h-[80px] rounded-lg border border-border p-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm resize-none" placeholder="Brief reason for leave..." required />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Supporting Document (Optional)</label>
                <div className="flex items-center justify-center border-2 border-dashed border-border rounded-xl p-6 text-slate-400 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
                  <div className="text-center">
                    <p className="text-xs font-medium">Click to upload or drag & drop</p>
                    <p className="text-[10px] mt-0.5">PDF, JPG, PNG up to 5MB</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setTab("balances")} className="flex-1 cursor-pointer">Cancel</Button>
                <Button type="submit" className="flex-1 cursor-pointer">Submit Request</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {tab === "history" && (
        <Card>
          <CardHeader><CardTitle>Leave History</CardTitle><CardDescription>All your past and upcoming leave requests</CardDescription></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {history.map((h) => (
                <div key={h.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={h.status === "Approved" ? "success" : h.status === "Pending" ? "warning" : "danger"}>
                        {h.status === "Approved" ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                        {h.status}
                      </Badge>
                      <span className="text-sm font-bold text-slate-800">{h.type}</span>
                    </div>
                    <p className="text-xs text-primary font-semibold mt-1">{h.dates} · {h.days} day{h.days > 1 ? "s" : ""}</p>
                    <p className="text-xs text-slate-400 mt-0.5 italic">"{h.reason}"</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{h.id}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
