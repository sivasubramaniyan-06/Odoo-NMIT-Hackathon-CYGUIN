"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Plus,
  Play,
  CheckCircle,
} from "lucide-react";

// Mock courses data
const initialCourses = [
  { id: "1", title: "Corporate Code of Conduct", desc: "Essential compliance training on company policies, ethics, and values.", duration: "1.5 hours", enrollments: 412, completion: 94, category: "Compliance" },
  { id: "2", title: "Introduction to Next.js 15", desc: "Learn framework basics including Routing, Server Components, and mutations.", duration: "4.0 hours", enrollments: 124, completion: 82, category: "Technical" },
  { id: "3", title: "Effective Product Management", desc: "Key strategies for roadmapping, scoping, and conducting user interviews.", duration: "3.5 hours", enrollments: 45, completion: 78, category: "Management" },
  { id: "4", title: "Information Security Guidelines", desc: "Protecting workspace systems from phishing, social engineering, and data leaks.", duration: "2.0 hours", enrollments: 388, completion: 91, category: "Compliance" },
];

export default function AdminTrainingPage() {
  const [courses, setCourses] = useState(initialCourses);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [duration, setDuration] = useState("2.5 hours");
  const [category, setCategory] = useState("Compliance");

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse = {
      id: String(courses.length + 1),
      title,
      desc,
      duration,
      enrollments: 0,
      completion: 0,
      category,
    };
    setCourses([...courses, newCourse]);
    setIsAddOpen(false);
    // Reset Form
    setTitle("");
    setDesc("");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            L&D Course Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Author corporate training programs, enroll departments, and audit completion pipelines.
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 cursor-pointer">
            <Plus className="h-4 w-4" />
            <span>Create Course</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-primary rounded-xl">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Courses</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">{courses.length}</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">In learning repository</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-secondary rounded-xl">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Enrolled</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">969</h3>
            <p className="text-[10px] text-emerald-600 font-semibold mt-1">Active learning paths</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Progress</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">86.2%</h3>
            <p className="text-[10px] text-emerald-600 font-semibold mt-1">+2.4% MoM improvement</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-sky-50 text-sky-700 rounded-xl">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Certificates Issued</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">1,240</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Total historical credentials</p>
          </div>
        </Card>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col justify-between hover:border-primary/20 hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={course.category === "Compliance" ? "default" : "secondary"}>
                  {course.category}
                </Badge>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-800">{course.title}</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{course.desc}</p>
              </div>

              {/* Progress bar container */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                  <span>Enrolled: {course.enrollments}</span>
                  <span>Completion Rate: {course.completion}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${course.completion}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t mt-4 pt-3">
              <Button size="sm" variant="ghost" className="h-8 text-xs flex items-center gap-1.5 rounded-lg cursor-pointer">
                <Play className="h-3.5 w-3.5" />
                <span>Audit Lessons</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Course Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Create New Course">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input
            label="Course Title"
            placeholder="e.g. Code of Conduct"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Course Description
            </label>
            <textarea
              className="flex min-h-[80px] w-full rounded-lg border border-border bg-card px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm"
              placeholder="Provide a detailed course summary..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm cursor-pointer"
              >
                <option value="Compliance">Compliance</option>
                <option value="Technical">Technical</option>
                <option value="Management">Management</option>
              </select>
            </div>
            <Input
              label="Estimated Duration"
              placeholder="e.g. 2.5 hours"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-3 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Publish Program
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
