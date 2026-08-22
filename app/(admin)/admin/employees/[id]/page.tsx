"use client";

import React, { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { Progress } from "@/components/ui/Progress";
import {
  ArrowLeft, Mail, Phone, MapPin, Calendar, Briefcase,
  GraduationCap, Award, CreditCard, Download, Edit,
} from "lucide-react";
import Link from "next/link";
import { EMPLOYEES } from "../page";

const TABS = [
  { label: "Overview", value: "overview" },
  { label: "Performance", value: "performance" },
  { label: "Salary", value: "salary" },
  { label: "Timeline", value: "timeline" },
];

const skills = ["React", "TypeScript", "Figma", "System Design", "Team Leadership", "CSS / Tailwind"];

const statusVariant: Record<string, "success" | "warning" | "danger" | "secondary"> = {
  Active: "success",
  "On Leave": "warning",
  Inactive: "danger",
};

export default function EmployeeDetailPage() {
  const routeParams = useParams();
  const rawId = (routeParams?.id as string) || "";

  const employee = EMPLOYEES.find((e) => e.id.toLowerCase() === rawId.toLowerCase());

  const [tab, setTab] = useState("overview");

  if (!employee) {
    notFound();
  }

  const timeline = [
    { date: employee.joined, event: `Joined Acme Corp as ${employee.role}`, type: "join" },
    { date: "Jun 2024", event: "Completed Q1 Performance Review — Outstanding (4.8/5)", type: "review" },
    { date: "Aug 2024", event: `Promoted / Confirmed in ${employee.dept}`, type: "promotion" },
    { date: "Jan 2025", event: "Annual salary revised & updated in records", type: "salary" },
    { date: "Jun 2025", event: "Completed Q2 Performance Review — Outstanding (4.9/5)", type: "review" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Back + Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/employees">
          <button className="p-2 rounded-lg border border-border hover:bg-slate-50 cursor-pointer transition-colors" aria-label="Back to employee directory">
            <ArrowLeft className="h-4 w-4 text-slate-600" />
          </button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Employee Profile</h1>
          <p className="text-xs text-slate-500">ID: {employee.id}</p>
        </div>
      </div>

      {/* Profile Hero Card */}
      <Card className="p-0 overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-primary via-secondary to-indigo-400" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-10">
            <div className="flex items-end gap-4">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-2xl font-extrabold shadow-lg border-4 border-card">
                {employee.avatar}
              </div>
              <div className="mb-1">
                <h2 className="text-xl font-bold text-slate-900">{employee.name}</h2>
                <p className="text-sm text-slate-500">{employee.role} · {employee.dept}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={statusVariant[employee.status] ?? "secondary"}>{employee.status}</Badge>
                  <span className="text-xs text-slate-400">{employee.id}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1.5 cursor-pointer">
                <Edit className="h-3.5 w-3.5" /><span>Edit</span>
              </Button>
              <Button size="sm" className="flex items-center gap-1.5 cursor-pointer">
                <Download className="h-3.5 w-3.5" /><span>Export</span>
              </Button>
            </div>
          </div>

          {/* Contact Row */}
          <div className="flex flex-wrap gap-4 mt-5 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{employee.email}</span>
            <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{employee.phone}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{employee.location}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />Joined {employee.joined}</span>
            <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" />Department: {employee.dept}</span>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />

      {/* Tab Content */}
      {tab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4 text-xs">
                  {[
                    ["Full Name", employee.name],
                    ["Work Email", employee.email],
                    ["Phone Number", employee.phone],
                    ["Location", employee.location],
                    ["Status", employee.status],
                    ["Joined Date", employee.joined],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-semibold text-slate-400 uppercase tracking-wide text-[10px]">{k}</dt>
                      <dd className="mt-0.5 font-medium text-slate-700">{v}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-slate-400" /> Education</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-800">B.S. Computer Science & Design</p>
                  <p className="text-slate-500 mt-0.5">Carnegie Mellon University · 2018</p>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Award className="h-4 w-4 text-slate-400" /> Skills & Expertise</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s} className="rounded-lg bg-purple-50 text-primary px-3 py-1 text-xs font-semibold border border-purple-100">
                      {s}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Work Details</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-xs">
                {[
                  ["Employee ID", employee.id],
                  ["Department", employee.dept],
                  ["Designation", employee.role],
                  ["Employment Type", "Full-Time"],
                  ["Work Location", employee.location],
                  ["Current Status", employee.status],
                  ["Joined Date", employee.joined],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                    <span className="text-slate-400 font-medium">{k}</span>
                    <span className="font-semibold text-slate-700 text-right">{v}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {tab === "performance" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Performance Ratings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Technical Skills", value: 92 },
                { label: "Communication", value: 88 },
                { label: "Teamwork", value: 95 },
                { label: "Innovation", value: 85 },
                { label: "Leadership", value: 78 },
              ].map((r) => (
                <Progress key={r.label} label={r.label} value={r.value} showValue size="md" />
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Current Goals</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: `Complete ${employee.dept} platform migration`, progress: 90 },
                { title: "Optimize system performance & SLA", progress: 65 },
                { title: "Mentor junior team members", progress: 100 },
              ].map((g) => (
                <div key={g.title} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <p className="text-xs font-semibold text-slate-700">{g.title}</p>
                  <Progress value={g.progress} size="sm" variant={g.progress === 100 ? "success" : "default"} showValue />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "salary" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-slate-400" /> Compensation</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-xs">
              {[
                ["Base Salary", "$110,000 / year"],
                ["Monthly Gross", "$9,166"],
                ["Monthly Net", "$7,800 (est.)"],
                ["Bonus Eligibility", "15% Annual Bonus"],
                ["Pay Schedule", "Monthly (Last working day)"],
                ["Pay Method", "Direct Deposit"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-slate-50 pb-2 last:border-0">
                  <span className="text-slate-400">{k}</span>
                  <span className="font-bold text-slate-800">{v}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Bank Details</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-xs">
              {[
                ["Bank Name", "Silicon Valley Bank"],
                ["Account Number", "••••••4819"],
                ["Routing Number", "021000021"],
                ["Account Type", "Checking"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-slate-50 pb-2 last:border-0">
                  <span className="text-slate-400">{k}</span>
                  <span className="font-bold text-slate-800">{v}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "timeline" && (
        <Card>
          <CardHeader><CardTitle>Employment Timeline</CardTitle></CardHeader>
          <CardContent>
            <div className="relative space-y-0">
              {timeline.map((event, i) => (
                <div key={i} className="flex gap-4 pb-6 relative">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-primary mt-1 shrink-0 z-10" />
                    {i < timeline.length - 1 && <div className="flex-1 w-px bg-slate-200 mt-1" />}
                  </div>
                  <div className="flex-1 pb-1">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{event.date}</p>
                    <p className="text-sm font-medium text-slate-700 mt-0.5">{event.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
