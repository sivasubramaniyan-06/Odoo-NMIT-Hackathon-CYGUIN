"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import {
  TrendingUp,
  Target,
  Plus,
  BookmarkCheck,
  CheckCircle,
} from "lucide-react";

// Mock personal goals
const initialGoals = [
  { id: "1", title: "Complete design tokens migrations in components repo", progress: 90, status: "ON TRACK", targetDate: "Sep 01, 2026" },
  { id: "2", title: "Achieve INP score optimization to < 200ms", progress: 45, status: "IN PROGRESS", targetDate: "Oct 15, 2026" },
  { id: "3", title: "Support onboarding of two junior designers", progress: 100, status: "COMPLETED", targetDate: "Aug 15, 2026" },
];

export default function EmployeePerformancePage() {
  const [goals, setGoals] = useState(initialGoals);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          My Performance Dashboard
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review your goals, align personal targets with corporate KPIs, and inspect reviews.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column: Personal Goals progress */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Target className="h-4.5 w-4.5 text-primary" />
            <span>Active Performance Goals</span>
          </h3>

          <div className="space-y-4">
            {goals.map((goal) => (
              <Card key={goal.id} className="hover:shadow transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-800 leading-snug">{goal.title}</h4>
                    <Badge variant={goal.status === "COMPLETED" ? "success" : goal.status === "ON TRACK" ? "info" : "warning"}>
                      {goal.status}
                    </Badge>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase">
                      <span>Completion Goal: {goal.targetDate}</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Key metrics and review summary */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <BookmarkCheck className="h-4.5 w-4.5 text-primary" />
            <span>Latest Evaluation Review</span>
          </h3>

          <Card className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Evaluation Cycle</p>
              <h4 className="font-bold text-slate-800">Q2 2026 Review</h4>
              <p className="text-xs text-slate-500 leading-relaxed italic">
                "Alex shows excellent ownership of UI libraries, driving consistency across screens. Keep up the high standard of work!"
              </p>
              <p className="text-[10px] text-slate-400 font-semibold mt-1">Reviewer: Jane Cooper (VP of Engineering)</p>
            </div>

            <div className="space-y-2 pt-2 border-t text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Overall Rating:</span>
                <span className="font-bold text-slate-800">4.8 / 5.0 (Outstanding)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Self Evaluation:</span>
                <span className="text-emerald-600 font-semibold">Submitted</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
