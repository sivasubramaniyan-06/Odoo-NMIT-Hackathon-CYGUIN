"use client";

import React, { useState, useMemo } from "react";
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

interface Job {
  id: string;
  title: string;
  dept: string;
  location: string;
  applicants: number;
  status: "Active" | "Paused" | "Closed";
  posted: string;
  description?: string;
}

interface Candidate {
  id: string;
  name: string;
  role: string;
  score: number;
  avatar: string;
  stage: "Applied" | "Screening" | "Interview" | "Offer Sent";
  notes?: string;
}

interface Interview {
  id: string;
  candidate: string;
  role: string;
  date: string;
  time?: string;
  interviewer: string;
  type: string;
  status: "Scheduled" | "In Progress" | "Completed";
  notes?: string;
}

const TABS = [
  { label: "Job Postings", value: "jobs" },
  { label: "Pipeline", value: "pipeline" },
  { label: "Interviews", value: "interviews" },
];

const jobPostings: Job[] = [
  {
    id: "J001",
    title: "Senior Frontend Engineer",
    dept: "Engineering",
    location: "Hybrid, SF",
    applicants: 42,
    status: "Active",
    posted: "Aug 10",
    description:
      "We are seeking a Senior Frontend Engineer to build scalable web applications using Next.js, React, and TypeScript. You will work closely with product designers and backend engineers to craft beautiful UI components and optimize app performance.",
  },
  {
    id: "J002",
    title: "Product Designer II",
    dept: "Design",
    location: "Remote",
    applicants: 28,
    status: "Active",
    posted: "Aug 15",
    description:
      "Looking for an experienced Product Designer II to lead design initiatives across web and mobile platforms. Responsibilities include wireframing, high-fidelity prototyping, user research, and maintaining design systems.",
  },
  {
    id: "J003",
    title: "Sales Account Executive",
    dept: "Sales",
    location: "New York",
    applicants: 15,
    status: "Paused",
    posted: "Jul 28",
    description:
      "Drive revenue growth by acquiring enterprise clients. Manage full sales cycles from prospecting and demos to contract negotiation and closing.",
  },
  {
    id: "J004",
    title: "DevOps Engineer",
    dept: "Engineering",
    location: "Austin, TX",
    applicants: 19,
    status: "Active",
    posted: "Aug 18",
    description:
      "Architect and maintain cloud infrastructure on AWS/GCP using Terraform, Kubernetes, and CI/CD pipelines to ensure 99.99% uptime and zero-downtime deployments.",
  },
  {
    id: "J005",
    title: "Content Marketing Manager",
    dept: "Marketing",
    location: "Remote",
    applicants: 33,
    status: "Closed",
    posted: "Jul 01",
    description:
      "Lead content strategy across blog, social media, and email marketing. Create compelling case studies and whitepapers to drive organic lead generation.",
  },
];

const initialPipeline: Record<string, Candidate[]> = {
  Applied: [
    { id: "C101", name: "Lena Park", role: "Frontend Eng", score: 82, avatar: "LP", stage: "Applied", notes: "Strong React background, good communication." },
    { id: "C102", name: "Raj Sharma", role: "Frontend Eng", score: 76, avatar: "RS", stage: "Applied", notes: "Needs technical assessment review." },
    { id: "C103", name: "Amy Chen", role: "Designer", score: 88, avatar: "AC", stage: "Applied", notes: "Impressive Figma portfolio." },
  ],
  Screening: [
    { id: "C104", name: "Tom Walsh", role: "DevOps", score: 79, avatar: "TW", stage: "Screening", notes: "Kubernetes & AWS experience." },
    { id: "C105", name: "Nina Patel", role: "Frontend Eng", score: 91, avatar: "NP", stage: "Screening", notes: "High algorithm score, schedule tech round." },
  ],
  Interview: [
    { id: "C106", name: "Dan Kim", role: "Frontend Eng", score: 85, avatar: "DK", stage: "Interview", notes: "Technical interview scheduled for Aug 23." },
  ],
  "Offer Sent": [
    { id: "C107", name: "Sarah Miller", role: "Designer", score: 94, avatar: "SM", stage: "Offer Sent", notes: "Offer letter issued on Aug 20." },
  ],
};

const initialInterviews: Interview[] = [
  { id: "I01", candidate: "Dan Kim", role: "Senior Frontend Eng", date: "Aug 23, 10:00 AM", interviewer: "Jordan Kim", type: "Technical", status: "Scheduled", notes: "Focus on React performance and state management." },
  { id: "I02", candidate: "Nina Patel", role: "Senior Frontend Eng", date: "Aug 24, 2:00 PM", interviewer: "Ana Patel", type: "Portfolio Review", status: "Scheduled", notes: "Review previous component library architecture." },
  { id: "I03", candidate: "Tom Walsh", role: "DevOps Engineer", date: "Aug 22, 11:00 AM", interviewer: "Sam Taylor", type: "Phone Screen", status: "Completed", notes: "Passed screening call with strong DevOps credentials." },
];

const pipelineStages = ["Applied", "Screening", "Interview", "Offer Sent"] as const;
const stageColors = ["bg-sky-50 border-sky-200", "bg-amber-50 border-amber-200", "bg-purple-50 border-purple-200", "bg-emerald-50 border-emerald-200"];

export default function AdminRecruitmentPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState("jobs");

  // Job Postings State
  const [jobs, setJobs] = useState<Job[]>(jobPostings);
  const [isJobOpen, setIsJobOpen] = useState(false);
  const [isInterviewOpen, setIsInterviewOpen] = useState(false);

  // Job Details Modal State
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);

  const [jobTitle, setJobTitle] = useState("");
  const [jobDept, setJobDept] = useState("Engineering");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  // Job Postings Filters
  const [jobSearch, setJobSearch] = useState("");
  const [jobDeptFilter, setJobDeptFilter] = useState("");
  const [jobStatusFilter, setJobStatusFilter] = useState("");

  // Candidate Pipeline State
  const [pipelineData, setPipelineData] = useState<Record<string, Candidate[]>>(initialPipeline);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [candidateStage, setCandidateStage] = useState<"Applied" | "Screening" | "Interview" | "Offer Sent">("Applied");
  const [candidateNotes, setCandidateNotes] = useState<string>("");

  // Candidate Pipeline Filters
  const [candidateSearch, setCandidateSearch] = useState("");
  const [candidateRoleFilter, setCandidateRoleFilter] = useState("");

  // Interview Management State
  const [interviewList, setInterviewList] = useState<Interview[]>(initialInterviews);
  const [ivCandidate, setIvCandidate] = useState("");
  const [ivRole, setIvRole] = useState("");
  const [ivDate, setIvDate] = useState("");
  const [ivTime, setIvTime] = useState("");
  const [ivInterviewer, setIvInterviewer] = useState("");
  const [ivType, setIvType] = useState("Technical");

  // Interview Filters
  const [interviewSearch, setInterviewSearch] = useState("");
  const [interviewTypeFilter, setInterviewTypeFilter] = useState("");
  const [interviewStatusFilter, setInterviewStatusFilter] = useState("");

  // Interview Notes Modal State
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [editingNotes, setEditingNotes] = useState("");

  // Memoized Job Dept Options
  const jobDeptOptions = useMemo(() => {
    const depts = Array.from(new Set(jobs.map((j) => j.dept)));
    return [
      { value: "", label: "All Departments" },
      ...depts.map((d) => ({ value: d, label: d })),
    ];
  }, [jobs]);

  const jobStatusOptions = [
    { value: "", label: "All Statuses" },
    { value: "Active", label: "Active" },
    { value: "Paused", label: "Paused" },
    { value: "Closed", label: "Closed" },
  ];

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    const searchLower = jobSearch.toLowerCase();
    return jobs.filter((j) => {
      const matchesSearch =
        !jobSearch ||
        j.title.toLowerCase().includes(searchLower) ||
        j.dept.toLowerCase().includes(searchLower) ||
        j.location.toLowerCase().includes(searchLower);
      const matchesDept = !jobDeptFilter || j.dept === jobDeptFilter;
      const matchesStatus = !jobStatusFilter || j.status === jobStatusFilter;
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [jobs, jobSearch, jobDeptFilter, jobStatusFilter]);

  const handleClearJobFilters = () => {
    setJobSearch("");
    setJobDeptFilter("");
    setJobStatusFilter("");
  };

  // Memoized Candidate Role Options
  const candidateRoleOptions = useMemo(() => {
    const roles = new Set<string>();
    Object.values(pipelineData).forEach((list) => {
      list.forEach((c) => {
        if (c.role) roles.add(c.role);
      });
    });
    return [
      { value: "", label: "All Roles" },
      ...Array.from(roles).map((r) => ({ value: r, label: r })),
    ];
  }, [pipelineData]);

  // Filtered Pipeline Data
  const filteredPipelineData = useMemo(() => {
    const result: Record<string, Candidate[]> = {};
    const searchLower = candidateSearch.toLowerCase();

    pipelineStages.forEach((stage) => {
      const stageCandidates = pipelineData[stage] || [];
      result[stage] = stageCandidates.filter((c) => {
        const matchesSearch =
          !candidateSearch ||
          c.name.toLowerCase().includes(searchLower) ||
          c.role.toLowerCase().includes(searchLower) ||
          c.id.toLowerCase().includes(searchLower) ||
          (c.notes && c.notes.toLowerCase().includes(searchLower));

        const matchesRole = !candidateRoleFilter || c.role === candidateRoleFilter;

        return matchesSearch && matchesRole;
      });
    });

    return result;
  }, [pipelineData, candidateSearch, candidateRoleFilter]);

  const totalFilteredCandidates = useMemo(() => {
    return Object.values(filteredPipelineData).reduce((acc, list) => acc + list.length, 0);
  }, [filteredPipelineData]);

  const handleClearCandidateFilters = () => {
    setCandidateSearch("");
    setCandidateRoleFilter("");
  };

  // Memoized Interview Type Options
  const interviewTypeOptions = useMemo(() => {
    const types = Array.from(new Set(interviewList.map((iv) => iv.type)));
    return [
      { value: "", label: "All Types" },
      ...types.map((t) => ({ value: t, label: t })),
    ];
  }, [interviewList]);

  const interviewStatusOptions = [
    { value: "", label: "All Statuses" },
    { value: "Scheduled", label: "Scheduled" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
  ];

  // Filtered Interviews
  const filteredInterviews = useMemo(() => {
    const searchLower = interviewSearch.toLowerCase();
    return interviewList.filter((iv) => {
      const matchesSearch =
        !interviewSearch ||
        iv.candidate.toLowerCase().includes(searchLower) ||
        iv.role.toLowerCase().includes(searchLower) ||
        iv.interviewer.toLowerCase().includes(searchLower) ||
        iv.id.toLowerCase().includes(searchLower);

      const matchesType = !interviewTypeFilter || iv.type === interviewTypeFilter;
      const matchesStatus = !interviewStatusFilter || iv.status === interviewStatusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [interviewList, interviewSearch, interviewTypeFilter, interviewStatusFilter]);

  const handleClearInterviewFilters = () => {
    setInterviewSearch("");
    setInterviewTypeFilter("");
    setInterviewStatusFilter("");
  };

  const handleOpenJobDetails = (job: Job) => {
    setSelectedJob(job);
    setIsJobDetailsOpen(true);
  };

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

    const newJob: Job = {
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
        const nextStatus: "Active" | "Paused" | "Closed" =
          j.status === "Active" ? "Paused" : j.status === "Paused" ? "Closed" : "Active";
        toast({
          title: "Status updated",
          description: `"${j.title}" is now ${nextStatus.toLowerCase()}.`,
          variant: "success",
        });
        return { ...j, status: nextStatus };
      })
    );

    if (selectedJob && selectedJob.id === id) {
      const nextStatus: "Active" | "Paused" | "Closed" =
        selectedJob.status === "Active" ? "Paused" : selectedJob.status === "Paused" ? "Closed" : "Active";
      setSelectedJob((prev) => (prev ? { ...prev, status: nextStatus } : null));
    }
  };

  const handleOpenCandidateModal = (c: Candidate) => {
    setSelectedCandidate(c);
    setCandidateStage(c.stage);
    setCandidateNotes(c.notes || "");
  };

  const handleSaveCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate) return;

    const currentStage = selectedCandidate.stage;
    const newStage = candidateStage;
    const updatedNotes = candidateNotes.trim();

    setPipelineData((prev) => {
      const updated = { ...prev };

      // Remove from current stage
      updated[currentStage] = (updated[currentStage] || []).filter(
        (c) => c.id !== selectedCandidate.id && c.name !== selectedCandidate.name
      );

      // Create updated candidate object
      const updatedCandidate: Candidate = {
        ...selectedCandidate,
        stage: newStage,
        notes: updatedNotes,
      };

      // Append to new stage
      updated[newStage] = [...(updated[newStage] || []), updatedCandidate];

      return updated;
    });

    const candidateName = selectedCandidate.name;
    setSelectedCandidate(null);

    toast({
      title: "Candidate stage updated",
      description: `${candidateName} moved to ${newStage}.`,
      variant: "success",
    });
  };

  const handleScheduleInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ivCandidate.trim() || !ivRole.trim() || !ivDate || !ivTime || !ivInterviewer.trim()) {
      toast({
        title: "Validation error",
        description: "Please fill in all required interview details.",
        variant: "warning",
      });
      return;
    }

    const dateObj = new Date(`${ivDate}T${ivTime}`);
    const formattedDate = isNaN(dateObj.getTime())
      ? `${ivDate}, ${ivTime}`
      : `${dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })}, ${dateObj.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;

    const newInterview: Interview = {
      id: `I0${interviewList.length + 1}`,
      candidate: ivCandidate.trim(),
      role: ivRole.trim(),
      date: formattedDate,
      time: ivTime,
      interviewer: ivInterviewer.trim(),
      type: ivType,
      status: "Scheduled",
      notes: "",
    };

    setInterviewList((prev) => [newInterview, ...prev]);
    setIsInterviewOpen(false);
    setIvCandidate("");
    setIvRole("");
    setIvDate("");
    setIvTime("");
    setIvInterviewer("");
    setIvType("Technical");

    toast({
      title: "Interview scheduled",
      description: `Interview for ${newInterview.candidate} has been scheduled.`,
      variant: "success",
    });
  };

  const handleAdvanceInterviewStatus = (id: string) => {
    setInterviewList((prev) =>
      prev.map((iv) => {
        if (iv.id !== id) return iv;
        const nextStatus = iv.status === "Scheduled" ? "In Progress" : "Completed";
        toast({
          title: nextStatus === "In Progress" ? "Interview started" : "Interview completed",
          description: `${iv.candidate}'s interview is now ${nextStatus.toLowerCase()}.`,
          variant: "success",
        });
        return { ...iv, status: nextStatus };
      })
    );
  };

  const handleOpenInterviewNotes = (iv: Interview) => {
    setSelectedInterview(iv);
    setEditingNotes(iv.notes || "");
  };

  const handleSaveInterviewNotes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInterview) return;

    setInterviewList((prev) =>
      prev.map((iv) => (iv.id === selectedInterview.id ? { ...iv, notes: editingNotes.trim() } : iv))
    );

    setSelectedInterview(null);
    toast({
      title: "Interview notes updated",
      description: "Evaluation notes have been saved successfully.",
      variant: "success",
    });
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
        <StatCard title="Interviews This Week" value={interviewList.length.toString()} icon={Calendar} iconBg="bg-amber-50" iconColor="text-amber-600" />
        <StatCard title="Offer Acceptance Rate" value="78%" icon={Star} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
      </div>

      <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />

      {tab === "jobs" && (
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>All Job Postings</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full sm:w-auto">
              <SearchBar
                value={jobSearch}
                onChange={setJobSearch}
                placeholder="Search jobs..."
                className="w-full sm:w-60"
              />
              <Select
                options={jobDeptOptions}
                value={jobDeptFilter}
                onChange={(e) => setJobDeptFilter(e.target.value)}
                className="w-full sm:w-44"
              />
              <Select
                options={jobStatusOptions}
                value={jobStatusFilter}
                onChange={(e) => setJobStatusFilter(e.target.value)}
                className="w-full sm:w-36"
              />
            </div>
          </CardHeader>
          <CardContent>
            {filteredJobs.length === 0 ? (
              <EmptyState
                variant="search"
                title="No job postings found"
                description="No positions match your search or filter criteria."
                action={{
                  label: "Clear filters",
                  onClick: handleClearJobFilters,
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
                      <tr
                        key={job.id}
                        onClick={() => handleOpenJobDetails(job)}
                        className="hover:bg-slate-50/60 transition-colors group cursor-pointer"
                      >
                        <td className="p-4">
                          <p className="font-semibold text-slate-800 text-xs hover:text-primary transition-colors">{job.title}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{job.id}</p>
                        </td>
                        <td className="p-4 hidden md:table-cell"><Badge variant="secondary">{job.dept}</Badge></td>
                        <td className="p-4 hidden lg:table-cell text-xs text-slate-500">{job.location}</td>
                        <td className="p-4 text-center text-xs font-bold text-primary">{job.applicants}</td>
                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleToggleJobStatus(job.id)}
                            title="Click to cycle status (Active -> Paused -> Closed)"
                            className="cursor-pointer transition-transform hover:scale-105"
                          >
                            <Badge variant={statusVariant[job.status]}>{job.status}</Badge>
                          </button>
                        </td>
                        <td className="p-4 hidden sm:table-cell text-xs text-slate-400">{job.posted}</td>
                        <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleOpenJobDetails(job)}
                            title="View Job Details"
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
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <SearchBar
                placeholder="Search candidates by name, role, notes..."
                value={candidateSearch}
                onChange={setCandidateSearch}
                className="flex-1"
              />
              <Select
                options={candidateRoleOptions}
                value={candidateRoleFilter}
                onChange={(e) => setCandidateRoleFilter(e.target.value)}
                className="w-full sm:w-48"
              />
            </div>
          </Card>

          {totalFilteredCandidates === 0 ? (
            <EmptyState
              variant="search"
              title="No candidates found"
              description="No candidates match your active search or role filter."
              action={{
                label: "Clear filters",
                onClick: handleClearCandidateFilters,
              }}
            />
          ) : (
            <div className="grid gap-4 lg:grid-cols-4">
              {pipelineStages.map((stage, si) => {
                const stageCandidates = filteredPipelineData[stage] ?? [];
                return (
                  <div key={stage} className={`rounded-xl border-2 ${stageColors[si]} p-4 space-y-3`}>
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">{stage}</h3>
                      <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-bold text-slate-600 border">
                        {stageCandidates.length}
                      </span>
                    </div>
                    {stageCandidates.length === 0 ? (
                      <div className="p-4 text-center rounded-xl bg-white/60 border border-dashed border-slate-200">
                        <p className="text-xs text-slate-400 font-medium">No candidates in {stage}</p>
                      </div>
                    ) : (
                      stageCandidates.map((c) => (
                        <div
                          key={c.id || c.name}
                          onClick={() => handleOpenCandidateModal(c)}
                          className="bg-card rounded-xl p-3 border border-border shadow-sm hover:shadow-md hover:border-primary/40 transition-all cursor-pointer space-y-2 group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                              {c.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors truncate">{c.name}</p>
                              <p className="text-[10px] text-slate-500 truncate">{c.role}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-400">Match Score</span>
                            <span className={`text-[10px] font-bold ${c.score >= 85 ? "text-emerald-600" : c.score >= 75 ? "text-amber-600" : "text-rose-600"}`}>
                              {c.score}%
                            </span>
                          </div>
                          {c.notes && (
                            <p className="text-[10px] text-slate-500 italic border-t pt-1.5 line-clamp-2">"{c.notes}"</p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {tab === "interviews" && (
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <SearchBar
                placeholder="Search interviews by candidate, position, interviewer..."
                value={interviewSearch}
                onChange={setInterviewSearch}
                className="flex-1"
              />
              <Select
                options={interviewTypeOptions}
                value={interviewTypeFilter}
                onChange={(e) => setInterviewTypeFilter(e.target.value)}
                className="w-full sm:w-44"
              />
              <Select
                options={interviewStatusOptions}
                value={interviewStatusFilter}
                onChange={(e) => setInterviewStatusFilter(e.target.value)}
                className="w-full sm:w-36"
              />
            </div>
          </Card>

          {filteredInterviews.length === 0 ? (
            <EmptyState
              variant="search"
              title="No interviews found"
              description="No interviews match your active search or filter criteria."
              action={{
                label: "Clear filters",
                onClick: handleClearInterviewFilters,
              }}
            />
          ) : (
            <div className="space-y-4">
              {filteredInterviews.map((iv) => (
                <Card key={iv.id} className="hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-slate-800">{iv.candidate}</p>
                        <Badge variant="secondary">{iv.type}</Badge>
                        <Badge variant={iv.status === "Completed" ? "success" : iv.status === "In Progress" ? "warning" : "info"}>
                          {iv.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{iv.role}</p>
                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{iv.date}</span>
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" />Interviewer: {iv.interviewer}</span>
                      </div>
                      {iv.notes && (
                        <p className="text-xs text-slate-500 italic mt-2 border-t pt-2 line-clamp-2">"{iv.notes}"</p>
                      )}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" variant="outline" onClick={() => handleOpenInterviewNotes(iv)} className="cursor-pointer">
                        View Notes
                      </Button>
                      {iv.status === "Scheduled" && (
                        <Button size="sm" onClick={() => handleAdvanceInterviewStatus(iv.id)} className="cursor-pointer">
                          Start Interview
                        </Button>
                      )}
                      {iv.status === "In Progress" && (
                        <Button size="sm" onClick={() => handleAdvanceInterviewStatus(iv.id)} className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer">
                          Complete Interview
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Job Details Modal */}
      <Modal isOpen={isJobDetailsOpen && selectedJob !== null} onClose={() => setIsJobDetailsOpen(false)} title="Job Posting Details">
        {selectedJob && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-slate-900 text-base">{selectedJob.title}</h3>
                  <Badge variant={statusVariant[selectedJob.status]}>{selectedJob.status}</Badge>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{selectedJob.id}</p>
              </div>
              <div className="shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleJobStatus(selectedJob.id)}
                  className="cursor-pointer flex items-center gap-1.5"
                >
                  <span>Change Status ({selectedJob.status})</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Department</span>
                <span className="font-semibold text-slate-800">{selectedJob.dept}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Location</span>
                <span className="font-semibold text-slate-800">{selectedJob.location}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Applicants</span>
                <span className="font-semibold text-primary">{selectedJob.applicants} Applicants</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Posted Date</span>
                <span className="font-semibold text-slate-800">{selectedJob.posted}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Job Description</label>
              <div className="p-3.5 rounded-xl border border-border bg-white text-xs text-slate-700 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                {selectedJob.description || "No full job description available for this position."}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button onClick={() => setIsJobDetailsOpen(false)} className="w-full sm:w-auto cursor-pointer">
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Candidate Details & Stage Movement Modal */}
      <Modal isOpen={selectedCandidate !== null} onClose={() => setSelectedCandidate(null)} title="Candidate Details & Stage">
        {selectedCandidate && (
          <form onSubmit={handleSaveCandidate} className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-xs font-bold shrink-0">
                {selectedCandidate.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900">{selectedCandidate.name}</p>
                <p className="text-xs text-slate-500">{selectedCandidate.role}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Match Score</span>
                <span className={`text-xs font-extrabold ${selectedCandidate.score >= 85 ? "text-emerald-600" : selectedCandidate.score >= 75 ? "text-amber-600" : "text-rose-600"}`}>
                  {selectedCandidate.score}%
                </span>
              </div>
            </div>

            <Select
              label="Pipeline Stage"
              options={pipelineStages.map((s) => ({ value: s, label: s }))}
              value={candidateStage}
              onChange={(e) => setCandidateStage(e.target.value as any)}
            />

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Candidate Notes</label>
              <textarea
                value={candidateNotes}
                onChange={(e) => setCandidateNotes(e.target.value)}
                className="w-full min-h-[90px] rounded-lg border border-border p-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Add evaluation notes, interview feedback, or comments..."
              />
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setSelectedCandidate(null)} className="flex-1 cursor-pointer">Cancel</Button>
              <Button type="submit" className="flex-1 cursor-pointer">Save Changes</Button>
            </div>
          </form>
        )}
      </Modal>

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
        <form onSubmit={handleScheduleInterview} className="space-y-4">
          <Input
            label="Candidate Name"
            value={ivCandidate}
            onChange={(e) => setIvCandidate(e.target.value)}
            placeholder="e.g. Dan Kim"
            required
          />
          <Input
            label="Position"
            value={ivRole}
            onChange={(e) => setIvRole(e.target.value)}
            placeholder="e.g. Senior Frontend Engineer"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Date"
              type="date"
              value={ivDate}
              onChange={(e) => setIvDate(e.target.value)}
              required
            />
            <Input
              label="Time"
              type="time"
              value={ivTime}
              onChange={(e) => setIvTime(e.target.value)}
              required
            />
          </div>
          <Input
            label="Interviewer"
            value={ivInterviewer}
            onChange={(e) => setIvInterviewer(e.target.value)}
            placeholder="e.g. Jordan Kim"
            required
          />
          <Select
            label="Interview Type"
            options={[
              { value: "Technical", label: "Technical" },
              { value: "Portfolio Review", label: "Portfolio Review" },
              { value: "Phone Screen", label: "Phone Screen" },
              { value: "HR Culture", label: "HR Culture" },
            ]}
            value={ivType}
            onChange={(e) => setIvType(e.target.value)}
          />
          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsInterviewOpen(false)} className="flex-1 cursor-pointer">Cancel</Button>
            <Button type="submit" className="flex-1 cursor-pointer">Schedule</Button>
          </div>
        </form>
      </Modal>

      {/* View/Edit Interview Notes Modal */}
      <Modal isOpen={selectedInterview !== null} onClose={() => setSelectedInterview(null)} title="Interview Notes">
        {selectedInterview && (
          <form onSubmit={handleSaveInterviewNotes} className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
              <div className="flex justify-between items-center">
                <p className="font-bold text-slate-800 text-sm">{selectedInterview.candidate}</p>
                <Badge variant={selectedInterview.status === "Completed" ? "success" : selectedInterview.status === "In Progress" ? "warning" : "info"}>
                  {selectedInterview.status}
                </Badge>
              </div>
              <p className="text-slate-500">{selectedInterview.role} · {selectedInterview.type}</p>
              <p className="text-slate-400">{selectedInterview.date} · Interviewer: {selectedInterview.interviewer}</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Evaluation Notes</label>
              <textarea
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                className="w-full min-h-[100px] rounded-lg border border-border p-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="No interview notes have been added yet. Add feedback here..."
              />
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setSelectedInterview(null)} className="flex-1 cursor-pointer">Cancel</Button>
              <Button type="submit" className="flex-1 cursor-pointer">Save Notes</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
