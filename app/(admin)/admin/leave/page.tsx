"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { StatCard } from "@/components/ui/StatCard";
import { Progress } from "@/components/ui/Progress";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { CalendarOff, Clock, CheckCircle, XCircle, Users, Calendar, MessageSquare } from "lucide-react";

const TABS = [
  { label: "Pending", value: "pending", badge: 5 },
  { label: "Approved", value: "approved" },
  { label: "Calendar", value: "calendar" },
  { label: "Balances", value: "balances" },
];

type LeaveReq = { id: string; name: string; avatar: string; type: string; dates: string; days: number; dept: string; reason: string; status: string; };

const initialRequests: LeaveReq[] = [
  { id: "1", name: "Maria Santos", avatar: "MS", type: "Annual Leave", dates: "Sep 1–7, 2026", days: 7, dept: "Marketing", reason: "Family vacation trip planned ahead.", status: "Pending" },
  { id: "2", name: "Jordan Kim", avatar: "JK", type: "Sick Leave", dates: "Aug 25, 2026", days: 1, dept: "Engineering", reason: "Medical appointment.", status: "Pending" },
  { id: "3", name: "Priya Mehta", avatar: "PM", type: "Annual Leave", dates: "Sep 10–12, 2026", days: 3, dept: "HR", reason: "Personal travel.", status: "Pending" },
  { id: "4", name: "David Brown", avatar: "DB", type: "Unpaid Leave", dates: "Aug 29–30, 2026", days: 2, dept: "Finance", reason: "Family emergency.", status: "Pending" },
  { id: "5", name: "Sam Taylor", avatar: "ST", type: "Sick Leave", dates: "Aug 22, 2026", days: 1, dept: "Engineering", reason: "Feeling unwell.", status: "Pending" },
];

const approvedRequests: LeaveReq[] = [
  { id: "6", name: "Ana Patel", avatar: "AP", type: "Annual Leave", dates: "Aug 10–15, 2026", days: 6, dept: "Design", reason: "Summer holiday.", status: "Approved" },
  { id: "7", name: "James Liu", avatar: "JL", type: "Sick Leave", dates: "Aug 12, 2026", days: 1, dept: "Engineering", reason: "Dental checkup.", status: "Approved" },
];

const leaveBalances = [
  { type: "Annual Leave", allowed: 20, used: 6, remaining: 14 },
  { type: "Sick Leave", allowed: 8, used: 3, remaining: 5 },
  { type: "Unpaid Leave", allowed: 5, used: 2, remaining: 3 },
  { type: "Maternity/Paternity", allowed: 90, used: 0, remaining: 90 },
];

const calendarWeeks = [
  ["Jordan K.", "Ana P.", "", "", ""],
  ["", "", "Maria S.", "Maria S.", ""],
  ["", "Priya M.", "Priya M.", "", "Sam T."],
];

export default function AdminLeavePage() {
  const { toast } = useToast();
  const [tab, setTab] = useState("pending");
  const [requests, setRequests] = useState(initialRequests);
  const [confirmAction, setConfirmAction] = useState<{ id: string; type: "approve" | "reject" } | null>(null);
  const [commentTarget, setCommentTarget] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const handleAction = () => {
    if (!confirmAction) return;
    const { id, type } = confirmAction;
    setRequests((prev) => prev.filter((r) => r.id !== id));
    setConfirmAction(null);
    toast({
      title: type === "approve" ? "Leave approved" : "Leave rejected",
      description: `The leave request has been ${type}d and the employee notified.`,
      variant: type === "approve" ? "success" : "error",
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Leave Management</h1>
          <p className="text-xs text-slate-500 mt-1">Review pending requests, monitor team availability, and manage leave policies</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Pending Approvals" value={requests.length} icon={CalendarOff} iconBg="bg-amber-50" iconColor="text-amber-600" />
        <StatCard title="Approved This Month" value="14" icon={CheckCircle} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard title="Employees on Leave" value="8" icon={Users} iconBg="bg-sky-50" iconColor="text-sky-600" />
        <StatCard title="Avg Leave Days/Emp" value="4.2" icon={Clock} iconBg="bg-purple-50" iconColor="text-primary" />
      </div>

      <Tabs tabs={TABS.map((t) => t.value === "pending" ? { ...t, badge: requests.length } : t)} activeTab={tab} onChange={setTab} />

      {tab === "pending" && (
        <div className="space-y-4">
          {requests.length === 0 ? (
            <Card className="py-16 text-center">
              <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-700">All caught up!</p>
              <p className="text-xs text-slate-400 mt-1">No pending leave requests.</p>
            </Card>
          ) : requests.map((req) => (
            <Card key={req.id} className="hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {req.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-slate-800">{req.name}</p>
                      <Badge variant="secondary">{req.dept}</Badge>
                      <Badge variant={req.type === "Sick Leave" ? "warning" : req.type === "Unpaid Leave" ? "danger" : "info"}>{req.type}</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      <span className="text-primary font-semibold">{req.dates}</span> · {req.days} day{req.days > 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 italic">"{req.reason}"</p>
                  </div>
                </div>
                <div className="flex gap-2 sm:shrink-0">
                  <Button size="sm" variant="ghost" onClick={() => setCommentTarget(req.id)} className="h-8 px-2 text-slate-500 hover:bg-slate-100 cursor-pointer">
                    <MessageSquare className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setConfirmAction({ id: req.id, type: "reject" })} className="border-rose-200 text-rose-600 hover:bg-rose-50 cursor-pointer flex items-center gap-1.5">
                    <XCircle className="h-3.5 w-3.5" /><span>Reject</span>
                  </Button>
                  <Button size="sm" onClick={() => setConfirmAction({ id: req.id, type: "approve" })} className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5" /><span>Approve</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "approved" && (
        <Card>
          <CardHeader><CardTitle>Approved Leave Requests</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {approvedRequests.map((req) => (
                <div key={req.id} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold shrink-0">{req.avatar}</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">{req.name} <span className="font-normal text-slate-500">· {req.dept}</span></p>
                    <p className="text-xs text-slate-500 mt-0.5">{req.type} · {req.dates} ({req.days} days)</p>
                  </div>
                  <Badge variant="success">Approved</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "calendar" && (
        <Card>
          <CardHeader><CardTitle>Team Leave Calendar — September 2026</CardTitle><CardDescription>Visual overview of team availability for the upcoming month</CardDescription></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="p-2 text-left text-slate-400 font-bold uppercase tracking-wide">Week</th>
                    {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
                      <th key={d} className="p-2 text-center text-slate-400 font-medium">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {calendarWeeks.map((week, wi) => (
                    <tr key={wi} className="h-14">
                      <td className="p-2 font-semibold text-slate-400 text-[10px] uppercase">W{wi + 1}</td>
                      {week.map((emp, di) => (
                        <td key={di} className="p-1">
                          {emp ? (
                            <div className="rounded-lg bg-amber-100 border border-amber-200 text-amber-800 px-2 py-1.5 text-[10px] font-semibold text-center">
                              {emp}
                            </div>
                          ) : (
                            <div className="h-8" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "balances" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {leaveBalances.map((lb) => (
            <Card key={lb.type}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">{lb.type}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Used: <span className="font-bold text-slate-700">{lb.used} days</span></span>
                  <span className="text-slate-500">Remaining: <span className="font-bold text-primary">{lb.remaining} days</span></span>
                </div>
                <Progress value={lb.used} max={lb.allowed} showValue size="md" variant={lb.used / lb.allowed > 0.8 ? "warning" : "default"} />
                <p className="text-[10px] text-slate-400 text-right">Allocation: {lb.allowed} days/year</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmAction !== null}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleAction}
        title={confirmAction?.type === "approve" ? "Approve Leave Request" : "Reject Leave Request"}
        description={confirmAction?.type === "approve" ? "The employee will be notified and the leave will be marked as approved." : "The employee will be notified that their leave request has been rejected."}
        confirmLabel={confirmAction?.type === "approve" ? "Yes, Approve" : "Yes, Reject"}
        variant={confirmAction?.type === "reject" ? "destructive" : "safe"}
      />

      {/* Comment Modal */}
      <Modal isOpen={commentTarget !== null} onClose={() => setCommentTarget(null)} title="Add Comment">
        <div className="space-y-4">
          <textarea className="w-full min-h-[80px] rounded-lg border border-border p-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Add a note or reason for your decision..." value={comment} onChange={(e) => setComment(e.target.value)} />
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setCommentTarget(null)} className="flex-1 cursor-pointer">Cancel</Button>
            <Button onClick={() => { setCommentTarget(null); setComment(""); toast({ title: "Comment added", variant: "success" }); }} className="flex-1 cursor-pointer">Save Comment</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
