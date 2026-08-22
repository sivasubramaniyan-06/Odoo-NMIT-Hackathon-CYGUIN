"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import {
  TrendingUp,
  Award,
  Users,
  Calendar,
  Plus,
  Send,
  SlidersHorizontal,
} from "lucide-react";

// Mock review entries
const performanceReviews = [
  { id: "1", employee: "Jane Cooper", role: "VP of Engineering", reviewer: "CEO", cycle: "Q2 2026", rating: "4.8/5.0", status: "COMPLETED" },
  { id: "2", employee: "Cody Fisher", role: "Engineering Manager", reviewer: "Jane Cooper", cycle: "Q2 2026", rating: "4.5/5.0", status: "COMPLETED" },
  { id: "3", employee: "Esther Howard", role: "Director of Product", reviewer: "CEO", cycle: "Q2 2026", rating: "---", status: "PENDING REVIEW" },
  { id: "4", employee: "Ronald Richards", role: "Senior Developer", reviewer: "Cody Fisher", cycle: "Q2 2026", rating: "---", status: "SELF EVALUATION" },
];

export default function AdminPerformancePage() {
  const [reviews, setReviews] = useState(performanceReviews);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form states
  const [empName, setEmpName] = useState("");
  const [cycle, setCycle] = useState("Q3 2026");
  const [reviewer, setReviewer] = useState("");

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview = {
      id: String(reviews.length + 1),
      employee: empName,
      role: "Staff Member",
      reviewer: reviewer,
      cycle: cycle,
      rating: "---",
      status: "SELF EVALUATION" as const,
    };
    setReviews([...reviews, newReview]);
    setIsAddOpen(false);
    // Reset Form
    setEmpName("");
    setReviewer("");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Performance Reviews
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Conduct corporate evaluation cycles, configure peer reviews, and review scoring trends.
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 cursor-pointer">
            <Plus className="h-4 w-4" />
            <span>Launch Evaluation</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-primary rounded-xl">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Rating</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">4.62 / 5.0</h3>
            <p className="text-[10px] text-emerald-600 font-semibold mt-1">Top tier corporate performance</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Review Cycle</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">Q2 2026</h3>
            <p className="text-[10px] text-amber-600 font-semibold mt-1">2 reviews pending closure</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Participation</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">98.2%</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Completed self-assessments</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-sky-50 text-sky-700 rounded-xl">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Top Performers</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">24</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Scored &gt; 4.8 / 5.0</p>
          </div>
        </Card>
      </div>

      {/* Evaluations Ledger */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Evaluation Cycle Ledger</CardTitle>
            <CardDescription>Status and ratings of employees in the active cycle</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2 cursor-pointer">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-border text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
                  <th className="p-4">Employee</th>
                  <th className="p-4">Cycle</th>
                  <th className="p-4">Evaluator</th>
                  <th className="p-4">Score</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reviews.map((rev) => (
                  <tr key={rev.id} className="hover:bg-slate-50/40">
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-700">{rev.employee}</span>
                        <span className="text-[10px] text-slate-400">{rev.role}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 text-xs font-medium">{rev.cycle}</td>
                    <td className="p-4 text-slate-500 text-xs">{rev.reviewer}</td>
                    <td className="p-4 text-slate-700 font-bold text-xs">{rev.rating}</td>
                    <td className="p-4">
                      <Badge variant={rev.status === "COMPLETED" ? "success" : rev.status === "PENDING REVIEW" ? "warning" : "outline"}>
                        {rev.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      {rev.status !== "COMPLETED" && (
                        <Button size="sm" variant="ghost" className="h-8 text-xs text-primary hover:bg-primary/5 rounded-lg cursor-pointer">
                          <span>Remind</span>
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Launch Evaluation Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Launch Review Cycle">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input
            label="Target Employee"
            placeholder="Jane Doe"
            value={empName}
            onChange={(e) => setEmpName(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Evaluation Cycle"
              placeholder="Q3 2026"
              value={cycle}
              onChange={(e) => setCycle(e.target.value)}
              required
            />
            <Input
              label="Assigned Reviewer"
              placeholder="Supervisor Name"
              value={reviewer}
              onChange={(e) => setReviewer(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-3 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex items-center gap-1.5">
              <span>Send Invites</span>
              <Send className="h-4.5 w-4.5" />
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
