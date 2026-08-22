"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SearchBar } from "@/components/ui/SearchBar";
import { Select } from "@/components/ui/Select";
import { Megaphone, Pin, Bell, Tag } from "lucide-react";

const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "All Hands Meeting — September 3, 2026",
    body: "Our quarterly All Hands meeting is scheduled for September 3rd at 10:00 AM PST. All employees are expected to attend. The agenda includes Q3 progress updates, product roadmap preview, and open Q&A with leadership.",
    category: "Company",
    date: "Aug 22, 2026",
    author: "CEO Office",
    pinned: true,
    unread: true,
  },
  {
    id: 2,
    title: "Q3 Performance Review Cycle Opens",
    body: "The Q3 self-review forms are now open. Please complete your self-evaluation by September 10. Manager reviews will follow from September 11–20. Results will be shared by end of September.",
    category: "HR",
    date: "Aug 20, 2026",
    author: "HR Team",
    pinned: false,
    unread: true,
  },
  {
    id: 3,
    title: "New Work From Home Policy Effective September 1",
    body: "Starting September 1, 2026, all employees are eligible for up to 3 WFH days per week, subject to manager approval. Full policy document available on the intranet. Questions? Contact hr@acme.com",
    category: "Policy",
    date: "Aug 18, 2026",
    author: "People Operations",
    pinned: false,
    unread: false,
  },
  {
    id: 4,
    title: "Office Closure — Labor Day, September 2",
    body: "The office will be closed on Monday, September 2 in observance of Labor Day. Employees providing essential services should coordinate with their managers in advance.",
    category: "Holiday",
    date: "Aug 15, 2026",
    author: "Operations",
    pinned: false,
    unread: false,
  },
  {
    id: 5,
    title: "New Benefits: Mental Health Days",
    body: "We are thrilled to announce the addition of 3 Mental Health Days per year for all full-time employees, effective immediately. These can be taken without prior notice and do not require a doctor's note.",
    category: "Benefits",
    date: "Aug 10, 2026",
    author: "HR Team",
    pinned: false,
    unread: false,
  },
];

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "Company", label: "Company" },
  { value: "HR", label: "HR" },
  { value: "Policy", label: "Policy" },
  { value: "Holiday", label: "Holiday" },
  { value: "Benefits", label: "Benefits" },
];

const categoryVariant: Record<string, "default" | "success" | "warning" | "info" | "secondary" | "danger"> = {
  Company: "default",
  HR: "info",
  Policy: "warning",
  Holiday: "success",
  Benefits: "secondary",
};

export default function EmployeeAnnouncementsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [read, setRead] = useState<Set<number>>(new Set([3, 4, 5]));

  const filtered = ANNOUNCEMENTS.filter((a) => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.body.toLowerCase().includes(search.toLowerCase());
    const matchCat = !category || a.category === category;
    return matchSearch && matchCat;
  });

  const pinned = filtered.filter((a) => a.pinned);
  const rest = filtered.filter((a) => !a.pinned);
  const unreadCount = ANNOUNCEMENTS.filter((a) => !read.has(a.id)).length;

  const markRead = (id: number) => setRead((prev) => { const s = new Set(prev); s.add(id); return s; });

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Announcements</h1>
          <p className="text-xs text-slate-500 mt-1">
            {unreadCount > 0 ? <span className="text-primary font-semibold">{unreadCount} unread</span> : "All caught up"} · {ANNOUNCEMENTS.length} total
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search announcements..." className="flex-1" />
        <Select options={CATEGORIES} value={category} onChange={(e) => setCategory(e.target.value)} className="sm:w-44" />
      </div>

      {/* Pinned */}
      {pinned.length > 0 && (
        <div className="space-y-3">
          <h2 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <Pin className="h-3.5 w-3.5" />Pinned
          </h2>
          {pinned.map((ann) => (
            <Card key={ann.id} onClick={() => markRead(ann.id)} className={`border-2 border-primary/30 bg-purple-50/20 cursor-pointer hover:shadow-md transition-all`}>
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary/10 p-3 shrink-0">
                  <Megaphone className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-900">{ann.title}</h3>
                    <div className="flex items-center gap-2 shrink-0">
                      {!read.has(ann.id) && <span className="h-2 w-2 rounded-full bg-primary" />}
                      <Badge variant={categoryVariant[ann.category] ?? "secondary"}>{ann.category}</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">{ann.body}</p>
                  <div className="flex items-center gap-3 mt-3 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1"><Bell className="h-3 w-3" />{ann.author}</span>
                    <span>{ann.date}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Rest */}
      <div className="space-y-3">
        {rest.length > 0 && <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2"><Tag className="h-3.5 w-3.5" />All Announcements</h2>}
        {rest.map((ann) => (
          <Card key={ann.id} onClick={() => markRead(ann.id)} className={`cursor-pointer hover:shadow-md transition-all ${!read.has(ann.id) ? "border-primary/20 bg-purple-50/10" : ""}`}>
            <div className="flex items-start gap-4">
              <div className={`rounded-xl p-3 shrink-0 ${!read.has(ann.id) ? "bg-primary/10" : "bg-slate-100"}`}>
                <Megaphone className={`h-5 w-5 ${!read.has(ann.id) ? "text-primary" : "text-slate-400"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <h3 className={`text-sm font-semibold ${!read.has(ann.id) ? "text-slate-900 font-bold" : "text-slate-700"}`}>{ann.title}</h3>
                  <div className="flex items-center gap-2 shrink-0">
                    {!read.has(ann.id) && <span className="h-2 w-2 rounded-full bg-primary" />}
                    <Badge variant={categoryVariant[ann.category] ?? "secondary"}>{ann.category}</Badge>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">{ann.body}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400">
                  <span>{ann.author}</span><span>·</span><span>{ann.date}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
