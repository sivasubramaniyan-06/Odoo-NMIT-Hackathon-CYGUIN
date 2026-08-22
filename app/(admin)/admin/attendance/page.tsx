"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { StatCard } from "@/components/ui/StatCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { useToast } from "@/components/ui/Toast";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { CalendarCheck, Clock, AlertTriangle, Users, CheckCircle2, XCircle, Download, Plus } from "lucide-react";

const TABS = [
  { label: "Daily", value: "daily" },
  { label: "Monthly", value: "monthly" },
  { label: "Live", value: "live" },
  { label: "Corrections", value: "corrections" },
];

const dailyRecords = [
  { id: "1", name: "Jordan Kim", dept: "Engineering", in: "09:02", out: "18:15", hours: "9h 13m", status: "Present" },
  { id: "2", name: "Ana Patel", dept: "Design", in: "10:35", out: "19:00", hours: "8h 25m", status: "Late" },
  { id: "3", name: "Chen Wei", dept: "Sales", in: "—", out: "—", hours: "—", status: "Absent" },
  { id: "4", name: "Maria Santos", dept: "Marketing", in: "08:55", out: "17:30", hours: "8h 35m", status: "Present" },
  { id: "5", name: "James Liu", dept: "Engineering", in: "—", out: "—", hours: "—", status: "On Leave" },
  { id: "6", name: "Priya Mehta", dept: "HR", in: "09:00", out: "18:00", hours: "9h 00m", status: "Present" },
  { id: "7", name: "David Brown", dept: "Finance", in: "09:14", out: "18:45", hours: "9h 31m", status: "Present" },
  { id: "8", name: "Alex Rivera", dept: "Design", in: "08:50", out: "17:55", hours: "9h 05m", status: "Present" },
];

const liveData = [
  { name: "Jordan Kim", avatar: "JK", status: "In Office", since: "9:02 AM", dept: "Engineering" },
  { name: "Ana Patel", avatar: "AP", status: "Working Remotely", since: "10:35 AM", dept: "Design" },
  { name: "Maria Santos", avatar: "MS", status: "In Office", since: "8:55 AM", dept: "Marketing" },
  { name: "Alex Rivera", avatar: "AR", status: "In Office", since: "8:50 AM", dept: "Design" },
  { name: "Kevin Park", avatar: "KP", status: "Working Remotely", since: "9:30 AM", dept: "Engineering" },
  { name: "Nora Walsh", avatar: "NW", status: "Not Checked In", since: "—", dept: "Marketing" },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = Array.from({ length: 31 }, (_, i) => i + 1);

const statusColor: Record<string, string> = {
  Present: "bg-emerald-500",
  Late: "bg-amber-500",
  Absent: "bg-rose-500",
  "On Leave": "bg-sky-400",
  "Half Day": "bg-orange-400",
};

const badgeVariant: Record<string, "success" | "warning" | "danger" | "info" | "secondary"> = {
  Present: "success",
  Late: "warning",
  Absent: "danger",
  "On Leave": "info",
};

export default function AdminAttendancePage() {
  const { toast } = useToast();
  const [tab, setTab] = useState("daily");
  const [search, setSearch] = useState("");
  const [correctionOpen, setCorrectionOpen] = useState(false);
  const [correctionName, setCorrectionName] = useState("");
  const [correctionDate, setCorrectionDate] = useState("");
  const [correctionIn, setCorrectionIn] = useState("");
  const [correctionOut, setCorrectionOut] = useState("");

  const filtered = dailyRecords.filter((r) =>
    !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.dept.toLowerCase().includes(search.toLowerCase())
  );

  const handleCorrectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCorrectionOpen(false);
    toast({ title: "Correction submitted", description: `Attendance correction for ${correctionName} has been logged for HR review.`, variant: "success" });
    setCorrectionName(""); setCorrectionDate(""); setCorrectionIn(""); setCorrectionOut("");
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Attendance Management</h1>
          <p className="text-xs text-slate-500 mt-1">Track daily check-ins, monitor absence patterns, and manage corrections</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1.5 cursor-pointer"><Download className="h-4 w-4" /><span>Export</span></Button>
          <Button size="sm" onClick={() => setCorrectionOpen(true)} className="flex items-center gap-1.5 cursor-pointer"><Plus className="h-4 w-4" /><span>Add Correction</span></Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Present Today" value="142" icon={CalendarCheck} iconBg="bg-emerald-50" iconColor="text-emerald-600" trend={{ value: 1.5 }} />
        <StatCard title="Late Arrivals" value="8" icon={Clock} iconBg="bg-amber-50" iconColor="text-amber-600" trend={{ value: -20, label: "vs yesterday" }} />
        <StatCard title="Absent" value="3" icon={AlertTriangle} iconBg="bg-rose-50" iconColor="text-rose-600" />
        <StatCard title="On Leave" value="14" icon={Users} iconBg="bg-sky-50" iconColor="text-sky-600" />
      </div>

      <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />

      {tab === "daily" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
            <div><CardTitle>Today's Attendance Log</CardTitle><CardDescription>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</CardDescription></div>
            <SearchBar value={search} onChange={setSearch} placeholder="Search employees..." className="w-60" />
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-border text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="p-4 text-left">Employee</th>
                    <th className="p-4 text-left hidden md:table-cell">Department</th>
                    <th className="p-4 text-left">Check In</th>
                    <th className="p-4 text-left hidden sm:table-cell">Check Out</th>
                    <th className="p-4 text-left hidden lg:table-cell">Hours</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                            {r.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <span className="font-semibold text-slate-800 text-xs">{r.name}</span>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell text-xs text-slate-500">{r.dept}</td>
                      <td className="p-4 text-xs font-mono font-semibold text-slate-700">{r.in}</td>
                      <td className="p-4 hidden sm:table-cell text-xs font-mono text-slate-500">{r.out}</td>
                      <td className="p-4 hidden lg:table-cell text-xs text-slate-500">{r.hours}</td>
                      <td className="p-4"><Badge variant={badgeVariant[r.status] ?? "secondary"}>{r.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "monthly" && (
        <Card>
          <CardHeader><CardTitle>August 2026 — Attendance Heatmap</CardTitle><CardDescription>Color coded by attendance status across all working days</CardDescription></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="text-[10px] border-collapse w-full">
                <thead>
                  <tr>
                    <th className="p-2 text-left text-slate-400 font-bold uppercase tracking-wide w-32">Employee</th>
                    {days.slice(0, 22).map((d) => (
                      <th key={d} className="p-1 text-center text-slate-400 font-medium w-6">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {dailyRecords.slice(0, 6).map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50">
                      <td className="p-2 font-semibold text-slate-700 text-xs">{emp.name.split(" ")[0]}</td>
                      {days.slice(0, 22).map((d) => {
                        const statusKey = d % 5 === 0 ? "Absent" : d % 7 === 0 ? "Late" : d % 11 === 0 ? "On Leave" : "Present";
                        return (
                          <td key={d} className="p-1 text-center">
                            <span className={`inline-block h-5 w-5 rounded ${statusColor[statusKey]} opacity-80`} title={statusKey} />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-4 mt-4 flex-wrap">
              {Object.entries(statusColor).map(([label, color]) => (
                <span key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className={`h-3 w-3 rounded ${color}`} />{label}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "live" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {liveData.map((emp) => (
            <Card key={emp.name} className="flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-sm font-bold shrink-0">
                {emp.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate">{emp.name}</p>
                <p className="text-xs text-slate-500">{emp.dept}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${emp.status === "Not Checked In" ? "bg-slate-300" : "bg-emerald-500"}`} />
                  <span className="text-[10px] text-slate-500 font-medium">{emp.status}</span>
                  {emp.since !== "—" && <span className="text-[10px] text-slate-400">· since {emp.since}</span>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "corrections" && (
        <Card>
          <CardHeader><CardTitle>Correction Requests</CardTitle><CardDescription>Attendance corrections submitted for approval</CardDescription></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Ana Patel", date: "Aug 18", reason: "Forgot to check out — Left at 18:30", status: "Pending" },
                { name: "Sam Taylor", date: "Aug 15", reason: "VPN connectivity issue — worked from home", status: "Approved" },
              ].map((req, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">{req.name} · <span className="font-normal text-slate-500">{req.date}</span></p>
                    <p className="text-xs text-slate-500 mt-0.5 italic">"{req.reason}"</p>
                  </div>
                  <Badge variant={req.status === "Approved" ? "success" : "warning"}>{req.status}</Badge>
                  {req.status === "Pending" && (
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100 cursor-pointer"><CheckCircle2 className="h-3.5 w-3.5" /></button>
                      <button className="p-1.5 rounded bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer"><XCircle className="h-3.5 w-3.5" /></button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Correction Modal */}
      <Modal isOpen={correctionOpen} onClose={() => setCorrectionOpen(false)} title="Submit Attendance Correction">
        <form onSubmit={handleCorrectionSubmit} className="space-y-4">
          <Input label="Employee Name" value={correctionName} onChange={(e) => setCorrectionName(e.target.value)} required />
          <Input label="Date" type="date" value={correctionDate} onChange={(e) => setCorrectionDate(e.target.value)} required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Correct Check-In" type="time" value={correctionIn} onChange={(e) => setCorrectionIn(e.target.value)} />
            <Input label="Correct Check-Out" type="time" value={correctionOut} onChange={(e) => setCorrectionOut(e.target.value)} />
          </div>
          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setCorrectionOpen(false)} className="flex-1 cursor-pointer">Cancel</Button>
            <Button type="submit" className="flex-1 cursor-pointer">Submit Correction</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
