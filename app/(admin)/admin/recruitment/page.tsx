"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { StatCard } from "@/components/ui/StatCard";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { SearchBar } from "@/components/ui/SearchBar";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { Briefcase, Users, Calendar, FileText, Plus, Star, Clock, ChevronRight } from "lucide-react";

const TABS = [
  { label: "Job Postings", value: "jobs" },
  { label: "Pipeline", value: "pipeline" },
  { label: "Interviews", value: "interviews" },
];

const jobPostings = [
  { id: "J001", title: "Senior Frontend Engineer", dept: "Engineering", location: "Hybrid, SF", applicants: 42, status: "Active", posted: "Aug 10" },
  { id: "J002", title: "Product Designer II", dept: "Design", location: "Remote", applicants: 28, status: "Active", posted: "Aug 15" },
  { id: "J003", title: "Sales Account Executive", dept: "Sales", location: "New York", applicants: 15, status: "Paused", posted: "Jul 28" },
  { id: "J004", title: "DevOps Engineer", dept: "Engineering", location: "Austin, TX", applicants: 19, status: "Active", posted: "Aug 18" },
  { id: "J005", title: "Content Marketing Manager", dept: "Marketing", location: "Remote", applicants: 33, status: "Closed", posted: "Jul 01" },
];

const pipeline = {
  Applied: [
    { name: "Lena Park", role: "Frontend Eng", score: 82, avatar: "LP" },
    { name: "Raj Sharma", role: "Frontend Eng", score: 76, avatar: "RS" },
    { name: "Amy Chen", role: "Designer", score: 88, avatar: "AC" },
  ],
  Screening: [
    { name: "Tom Walsh", role: "DevOps", score: 79, avatar: "TW" },
    { name: "Nina Patel", role: "Frontend Eng", score: 91, avatar: "NP" },
  ],
  Interview: [
    { name: "Dan Kim", role: "Frontend Eng", score: 85, avatar: "DK" },
  ],
  "Offer Sent": [
    { name: "Sarah Miller", role: "Designer", score: 94, avatar: "SM" },
  ],
};

const interviews = [
  { id: "I01", candidate: "Dan Kim", role: "Senior Frontend Eng", date: "Aug 23, 10:00 AM", interviewer: "Jordan Kim", type: "Technical", status: "Scheduled" },
  { id: "I02", candidate: "Nina Patel", role: "Senior Frontend Eng", date: "Aug 24, 2:00 PM", interviewer: "Ana Patel", type: "Portfolio Review", status: "Scheduled" },
  { id: "I03", candidate: "Tom Walsh", role: "DevOps Engineer", date: "Aug 22, 11:00 AM", interviewer: "Sam Taylor", type: "Phone Screen", status: "Completed" },
];

const pipelineStages = ["Applied", "Screening", "Interview", "Offer Sent"] as const;
const stageColors = ["bg-sky-50 border-sky-200", "bg-amber-50 border-amber-200", "bg-purple-50 border-purple-200", "bg-emerald-50 border-emerald-200"];

export default function AdminRecruitmentPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState("jobs");
  const [search, setSearch] = useState("");

  const [jobs, setJobs] = useState(jobPostings);
  const [isJobOpen, setIsJobOpen] = useState(false);
  const [isInterviewOpen, setIsInterviewOpen] = useState(false);

  const [jobTitle, setJobTitle] = useState("");
  const [jobDept, setJobDept] = useState("Engineering");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const filteredJobs = jobs.filter(
    (j) =>
      !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.dept.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim() || !jobLocation.trim() || !jobDescription.trim()) {
      toast({
        title: "Validation error",
        description: "Please fill in all required job details.",
        variant: "warning",
      });
      return;
    }

    const newJob = {
      id: `J00${jobs.length + 1}`,
      title: jobTitle.trim(),
      dept: jobDept,
      location: jobLocation.trim(),
      applicants: 0,
      status: "Active",
      posted: "Just now",
      description: jobDescription.trim(),
    };

    setJobs((prev) => [newJob, ...prev]);
    setIsJobOpen(false);
    setJobTitle("");
    setJobDept("Engineering");
    setJobLocation("");
    setJobDescription("");

    toast({
      title: "Job posted",
      description: `"${newJob.title}" has been published and is now accepting applications.`,
      variant: "success",
    });
  };

  const handleToggleJobStatus = (id: string) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id !== id) return j;
        const nextStatus = j.status === "Active" ? "Paused" : j.status === "Paused" ? "Closed" : "Active";
        toast({
          title: "Status updated",
          description: `"${j.title}" is now ${nextStatus.toLowerCase()}.`,
          variant: "success",
        });
        return { ...j, status: nextStatus };
      })
    );
  };

  const statusVariant: Record<string, "success" | "warning" | "danger" | "secondary"> = {
    Active: "success", Paused: "warning", Closed: "danger",
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Recruitment & ATS</h1>
          <p className="text-xs text-slate-500 mt-1">Manage job postings, candidate pipelines, and interview scheduling</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsInterviewOpen(true)} className="flex items-center gap-1.5 cursor-pointer">
            <Calendar className="h-4 w-4" /><span>Schedule Interview</span>
          </Button>
          <Button size="sm" onClick={() => setIsJobOpen(true)} className="flex items-center gap-1.5 cursor-pointer">
            <Plus className="h-4 w-4" /><span>Post Job</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Positions" value={jobs.filter((j) => j.status === "Active").length.toString()} icon={Briefcase} iconBg="bg-purple-50" iconColor="text-primary" trend={{ value: 33 }} />
        <StatCard title="Total Applicants" value={jobs.reduce((acc, j) => acc + j.applicants, 0).toString()} icon={Users} iconBg="bg-sky-50" iconColor="text-sky-600" trend={{ value: 15 }} />
        <StatCard title="Interviews This Week" value="5" icon={Calendar} iconBg="bg-amber-50" iconColor="text-amber-600" />
        <StatCard title="Offer Acceptance Rate" value="78%" icon={Star} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
      </div>

      <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />

      {tab === "jobs" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
            <CardTitle>All Job Postings</CardTitle>
            <SearchBar value={search} onChange={setSearch} placeholder="Search jobs..." className="w-60" />
          </CardHeader>
          <CardContent>
            {filteredJobs.length === 0 ? (
              <EmptyState
                variant="search"
                title="No job postings found"
                description="No positions match your search criteria."
                action={{
                  label: "Clear search",
                  onClick: () => setSearch(""),
                }}
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-border text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="p-4 text-left">Position</th>
                      <th className="p-4 text-left hidden md:table-cell">Department</th>
                      <th className="p-4 text-left hidden lg:table-cell">Location</th>
                      <th className="p-4 text-center">Applicants</th>
                      <th className="p-4 text-left">Status</th>
                      <th className="p-4 text-left hidden sm:table-cell">Posted</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50/60 transition-colors group">
                        <td className="p-4">
                          <p className="font-semibold text-slate-800 text-xs">{job.title}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{job.id}</p>
                        </td>
                        <td className="p-4 hidden md:table-cell"><Badge variant="secondary">{job.dept}</Badge></td>
                        <td className="p-4 hidden lg:table-cell text-xs text-slate-500">{job.location}</td>
                        <td className="p-4 text-center text-xs font-bold text-primary">{job.applicants}</td>
                        <td className="p-4">
                          <button
                            onClick={() => handleToggleJobStatus(job.id)}
                            title="Click to cycle status (Active -> Paused -> Closed)"
                            className="cursor-pointer transition-transform hover:scale-105"
                          >
                            <Badge variant={statusVariant[job.status]}>{job.status}</Badge>
                          </button>
                        </td>
                        <td className="p-4 hidden sm:table-cell text-xs text-slate-400">{job.posted}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleToggleJobStatus(job.id)}
                            title={`Change status (Current: ${job.status})`}
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronRight className="h-4 w-4 text-slate-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {tab === "pipeline" && (
        <div className="grid gap-4 lg:grid-cols-4">
          {pipelineStages.map((stage, si) => (
            <div key={stage} className={`rounded-xl border-2 ${stageColors[si]} p-4 space-y-3`}>
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">{stage}</h3>
                <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-bold text-slate-600 border">
                  {pipeline[stage]?.length ?? 0}
                </span>
              </div>
              {(pipeline[stage] ?? []).map((c) => (
                <div key={c.name} className="bg-card rounded-xl p-3 border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                      {c.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{c.name}</p>
                      <p className="text-[10px] text-slate-500">{c.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Match Score</span>
                    <span className={`text-[10px] font-bold ${c.score >= 85 ? "text-emerald-600" : c.score >= 75 ? "text-amber-600" : "text-rose-600"}`}>
                      {c.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === "interviews" && (
        <div className="space-y-4">
          {interviews.map((iv) => (
            <Card key={iv.id} className="hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-slate-800">{iv.candidate}</p>
                    <Badge variant="secondary">{iv.type}</Badge>
                    <Badge variant={iv.status === "Completed" ? "success" : "info"}>{iv.status}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{iv.role}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{iv.date}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />Interviewer: {iv.interviewer}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="outline" className="cursor-pointer">View Notes</Button>
                  {iv.status === "Scheduled" && (
                    <Button size="sm" className="cursor-pointer">Start Interview</Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Post Job Modal */}
      <Modal isOpen={isJobOpen} onClose={() => setIsJobOpen(false)} title="Create Job Posting">
        <form onSubmit={handleAddJob} className="space-y-4">
          <Input
            label="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
            placeholder="e.g. Senior Frontend Engineer"
          />
          <Select
            label="Department"
            options={[
              { value: "Engineering", label: "Engineering" },
              { value: "Design", label: "Design" },
              { value: "Sales", label: "Sales" },
              { value: "Marketing", label: "Marketing" },
            ]}
            value={jobDept}
            onChange={(e) => setJobDept(e.target.value)}
          />
          <Input
            label="Location"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
            required
            placeholder="e.g. Remote, San Francisco"
          />
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
              className="w-full min-h-[80px] rounded-lg border border-border p-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Describe the role and responsibilities..."
            />
          </div>
          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsJobOpen(false)} className="flex-1 cursor-pointer">Cancel</Button>
            <Button type="submit" className="flex-1 cursor-pointer">Publish Job</Button>
          </div>
        </form>
      </Modal>

      {/* Schedule Interview Modal */}
      <Modal isOpen={isInterviewOpen} onClose={() => setIsInterviewOpen(false)} title="Schedule Interview">
        <form onSubmit={(e) => { e.preventDefault(); setIsInterviewOpen(false); toast({ title: "Interview scheduled", variant: "success" }); }} className="space-y-4">
          <Input label="Candidate Name" placeholder="e.g. Dan Kim" required />
          <Input label="Position" placeholder="e.g. Senior Frontend Engineer" required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Date" type="date" required />
            <Input label="Time" type="time" required />
          </div>
          <Input label="Interviewer" placeholder="e.g. Jordan Kim" required />
          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsInterviewOpen(false)} className="flex-1 cursor-pointer">Cancel</Button>
            <Button type="submit" className="flex-1 cursor-pointer">Schedule</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
