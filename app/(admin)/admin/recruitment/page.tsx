"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import {
  Briefcase,
  Calendar,
  Clock,
  Plus,
  ArrowRight,
  UserCheck,
  Video,
} from "lucide-react";

// Mock candidates pipeline
const initialCandidates = [
  { id: "c1", name: "Esther Howard", role: "Frontend Dev", stage: "Applied", email: "esther.h@gmail.com" },
  { id: "c2", name: "Devon Lane", role: "Product Manager", stage: "Technical", email: "devon.lane@gmail.com" },
  { id: "c3", name: "Bessie Cooper", role: "Marketing Lead", stage: "Technical", email: "bessie.c@gmail.com" },
  { id: "c4", name: "Courtney Henry", role: "QA Engineer", stage: "Finalist", email: "courtney.h@gmail.com" },
  { id: "c5", name: "Albert Flores", role: "HR Coordinator", stage: "Offer", email: "albert.f@gmail.com" },
];

const stages = ["Applied", "Technical", "Finalist", "Offer"];

export default function AdminRecruitmentPage() {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

  // Form states
  const [candName, setCandName] = useState("");
  const [candRole, setCandRole] = useState("Frontend Dev");
  const [candEmail, setCandEmail] = useState("");
  const [interviewDate, setInterviewDate] = useState("2026-08-25");
  const [interviewTime, setInterviewTime] = useState("10:00 AM");

  const moveCandidate = (id: string, nextStage: string) => {
    setCandidates(
      candidates.map((c) => (c.id === id ? { ...c, stage: nextStage } : c))
    );
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add to pipeline as Applied or Scheduled
    const newCand = {
      id: `c-${Date.now()}`,
      name: candName,
      role: candRole,
      stage: "Technical",
      email: candEmail,
    };
    setCandidates([...candidates, newCand]);
    setIsSchedulerOpen(false);
    // Reset Form
    setCandName("");
    setCandEmail("");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Recruitment & ATS Board
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track job applications, manage hiring funnels, and organize candidate evaluations.
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setIsSchedulerOpen(true)} className="flex items-center gap-2 cursor-pointer">
            <Plus className="h-4 w-4" />
            <span>Schedule Interview</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-primary rounded-xl">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Open Roles</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">18</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Across 4 departments</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-secondary rounded-xl">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Funnel</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">42</h3>
            <p className="text-[10px] text-amber-600 font-semibold mt-1">Candidates in pipeline</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <UserCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Offers Made</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">4</h3>
            <p className="text-[10px] text-emerald-600 font-semibold mt-1">2 accepted this week</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-sky-50 text-sky-700 rounded-xl">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Scheduled (Week)</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">12</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Technical & Final rounds</p>
          </div>
        </Card>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        {stages.map((stage) => {
          const stageCandidates = candidates.filter((c) => c.stage === stage);

          return (
            <div key={stage} className="flex flex-col rounded-xl bg-slate-50 border border-slate-100 p-4 h-[600px] overflow-hidden">
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{stage}</span>
                <Badge variant="outline" className="text-[10px]">
                  {stageCandidates.length}
                </Badge>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {stageCandidates.length === 0 ? (
                  <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-200/50 rounded-xl py-12 text-center text-slate-400 text-[10px]">
                    No candidates
                  </div>
                ) : (
                  stageCandidates.map((cand) => (
                    <Card key={cand.id} className="p-4 bg-card border-slate-200 hover:border-primary/30 shadow-xs cursor-pointer group">
                      <h4 className="font-bold text-xs text-slate-800">{cand.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-1">{cand.role}</p>
                      <p className="text-[9px] text-slate-400 mt-1 truncate">{cand.email}</p>

                      {/* Advance Stage button */}
                      {stage !== "Offer" && (
                        <div className="flex justify-end mt-3 border-t pt-2.5">
                          <button
                            onClick={() => {
                              const nextIdx = stages.indexOf(stage) + 1;
                              moveCandidate(cand.id, stages[nextIdx]!);
                            }}
                            className="inline-flex items-center gap-1 text-[10px] text-primary font-bold hover:underline cursor-pointer"
                          >
                            <span>Move Stage</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </Card>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Scheduler Modal */}
      <Modal isOpen={isSchedulerOpen} onClose={() => setIsSchedulerOpen(false)} title="Schedule Candidate Evaluation">
        <form onSubmit={handleScheduleSubmit} className="space-y-4">
          <Input
            label="Candidate Name"
            placeholder="Jane Doe"
            value={candName}
            onChange={(e) => setCandName(e.target.value)}
            required
          />
          <Input
            label="Work Email Address"
            type="email"
            placeholder="jane.doe@gmail.com"
            value={candEmail}
            onChange={(e) => setCandEmail(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Target Role
              </label>
              <select
                value={candRole}
                onChange={(e) => setCandRole(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm cursor-pointer"
              >
                <option value="Frontend Dev">Frontend Dev</option>
                <option value="Product Manager">Product Manager</option>
                <option value="QA Engineer">QA Engineer</option>
                <option value="HR Coordinator">HR Coordinator</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Interview Format
              </label>
              <div className="flex h-10 items-center gap-2 border border-border rounded-lg bg-slate-50/50 px-3 text-xs text-slate-600">
                <Video className="h-4 w-4 text-slate-400" />
                <span>Virtual Meeting (Google Meet)</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Interview Date"
              type="date"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
              required
            />
            <Input
              label="Start Time"
              placeholder="10:00 AM"
              value={interviewTime}
              onChange={(e) => setInterviewTime(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-3 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => setIsSchedulerOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Schedule & Invite
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
