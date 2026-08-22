"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { Progress } from "@/components/ui/Progress";
import { useToast } from "@/components/ui/Toast";
import { TrendingUp, Target, Star, CheckCircle2, Plus, Edit } from "lucide-react";

const TABS = [
  { label: "My Goals", value: "goals" },
  { label: "Self Review", value: "review" },
  { label: "Manager Feedback", value: "feedback" },
];

const goals = [
  { id: "G01", title: "Complete design tokens migration", progress: 90, due: "Sep 30, 2026", status: "In Progress" },
  { id: "G02", title: "Mentor 2 junior designers", progress: 100, due: "Aug 15, 2026", status: "Completed" },
  { id: "G03", title: "Achieve INP < 200ms optimization", progress: 45, due: "Oct 15, 2026", status: "In Progress" },
  { id: "G04", title: "Lead 1 cross-functional workshop", progress: 0, due: "Nov 30, 2026", status: "Not Started" },
];

const reviewCategories = [
  { label: "Technical Skills", value: 4 },
  { label: "Collaboration", value: 5 },
  { label: "Communication", value: 4 },
  { label: "Innovation", value: 3 },
  { label: "Leadership", value: 4 },
];

const feedbackItems = [
  { from: "Jane Cooper", role: "VP Design (Manager)", date: "Jun 2026", rating: 4.8, comment: "Alex has shown exceptional growth this quarter. The design tokens work was delivered ahead of schedule and the quality was outstanding. Continue developing leadership skills to prepare for the Lead Designer role." },
  { from: "Jordan Kim", role: "VP Engineering (Peer)", date: "Jun 2026", rating: 4.5, comment: "Great collaboration on the platform redesign project. Very responsive and open to technical constraints. Excellent attention to accessibility." },
];

export default function EmployeePerformancePage() {
  const { toast } = useToast();
  const [tab, setTab] = useState("goals");
  const [ratings, setRatings] = useState<Record<string, number>>(() =>
    Object.fromEntries(reviewCategories.map((c) => [c.label, c.value]))
  );
  const [selfNotes, setSelfNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const avgRating = (Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length).toFixed(1);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: "Self-review submitted!", description: "Your Q3 review has been sent to your manager.", variant: "success" });
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">My Performance</h1>
          <p className="text-xs text-slate-500 mt-1">Q3 2026 Performance Cycle · Review period: Sep 1–30</p>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 border border-purple-100">
          <Star className="h-5 w-5 text-amber-500" />
          <div>
            <p className="text-xs font-semibold text-slate-700">Last Rating</p>
            <p className="text-lg font-extrabold text-primary">4.8 / 5.0</p>
          </div>
        </div>
      </div>

      <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />

      {tab === "goals" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" className="flex items-center gap-1.5 cursor-pointer" onClick={() => toast({ title: "Goal added", variant: "success" })}>
              <Plus className="h-4 w-4" /><span>Add Goal</span>
            </Button>
          </div>
          {goals.map((goal) => (
            <Card key={goal.id} className="hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-800">{goal.title}</h3>
                    <Badge variant={goal.status === "Completed" ? "success" : goal.status === "In Progress" ? "info" : "secondary"}>
                      {goal.status === "Completed" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {goal.status}
                    </Badge>
                  </div>
                  <Progress value={goal.progress} size="md" variant={goal.progress === 100 ? "success" : "default"} showValue />
                  <p className="text-[10px] text-slate-400 flex items-center gap-1"><Target className="h-3 w-3" />Due: {goal.due}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer shrink-0">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "review" && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Q3 2026 Self-Review</CardTitle>
            <CardDescription>Rate yourself on key competencies and add reflections. Due: September 10, 2026.</CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="flex flex-col items-center text-center py-10 gap-4">
                <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Self-review submitted!</h3>
                  <p className="text-sm text-slate-500 mt-1">Your manager will complete their review by Sep 20.</p>
                </div>
                <Button variant="outline" onClick={() => setSubmitted(false)} className="cursor-pointer">Edit Review</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-6">
                {reviewCategories.map((cat) => (
                  <div key={cat.label} className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-xs font-semibold text-slate-600">{cat.label}</label>
                      <span className="text-xs font-bold text-primary">{ratings[cat.label]} / 5</span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          type="button"
                          key={n}
                          onClick={() => setRatings((prev) => ({ ...prev, [cat.label]: n }))}
                          className={`flex-1 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer border ${ratings[cat.label] >= n ? "bg-primary text-white border-primary shadow-sm" : "border-border text-slate-400 hover:border-primary/50"}`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                  <p className="text-xs font-semibold text-slate-600">Your estimated self-rating: <span className="text-lg font-extrabold text-primary ml-1">{avgRating} / 5</span></p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Key Achievements & Reflections</label>
                  <textarea value={selfNotes} onChange={(e) => setSelfNotes(e.target.value)} className="w-full min-h-[100px] rounded-lg border border-border p-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" placeholder="Describe your key contributions, challenges faced, and areas for growth this quarter..." />
                </div>

                <Button type="submit" className="w-full cursor-pointer flex items-center justify-center gap-2">
                  <TrendingUp className="h-4 w-4" />Submit Self-Review
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      )}

      {tab === "feedback" && (
        <div className="space-y-4">
          {feedbackItems.map((fb, i) => (
            <Card key={i}>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {fb.from.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{fb.from}</p>
                      <p className="text-xs text-slate-500">{fb.role}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.round(fb.rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`} />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-700">{fb.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed border-l-2 border-primary/30 pl-3 italic">"{fb.comment}"</p>
                  <p className="text-[10px] text-slate-400 mt-2">Review period: {fb.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
