"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  GraduationCap,
  BookOpen,
  Award,
  Download,
  Play,
  CheckCircle,
} from "lucide-react";

// Mock personal courses list
const assignedCourses = [
  { id: "1", title: "Information Security Guidelines", category: "Compliance", progress: 65, duration: "2.0h", instructor: "System Admin", deadline: "Aug 28, 2026" },
  { id: "2", title: "Corporate Code of Conduct", category: "Compliance", progress: 100, duration: "1.5h", instructor: "HR Team", deadline: "Completed" },
  { id: "3", title: "Introduction to Next.js 15", category: "Technical", progress: 20, duration: "4.0h", instructor: "Engineering Lead", deadline: "Sep 15, 2026" },
];

const certificates = [
  { id: "CRT-10928", title: "Corporate Code of Conduct Verification", issueDate: "Aug 10, 2026", type: "Compliance Certificate" },
  { id: "CRT-10812", title: "Workspace Anti-Harassment Standards", issueDate: "Jan 15, 2026", type: "Compliance Certificate" },
];

export default function EmployeeTrainingPage() {
  const [courses, setCourses] = useState(assignedCourses);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          L&D Learning Center
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Complete mandatory corporate training programs, study lessons, and download certifications.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Assigned Courses grid */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="h-4.5 w-4.5 text-primary" />
            <span>Assigned Training Paths</span>
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            {courses.map((course) => (
              <Card key={course.id} className="flex flex-col justify-between hover:shadow transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant={course.category === "Compliance" ? "default" : "secondary"}>
                      {course.category}
                    </Badge>
                    <span className="text-[10px] text-slate-400 font-semibold">{course.duration}</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-slate-800 leading-snug">{course.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">Instructor: {course.instructor}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Deadline: <span className="font-semibold text-slate-600">{course.deadline}</span>
                    </p>
                  </div>

                  {/* Progress block */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4 pt-3 border-t">
                  {course.progress === 100 ? (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold py-1">
                      <CheckCircle className="h-4 w-4" />
                      <span>Completed</span>
                    </div>
                  ) : (
                    <Button size="sm" className="h-8 text-xs flex items-center gap-1.5 rounded-lg cursor-pointer">
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Study Lessons</span>
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Certificates list */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Award className="h-4.5 w-4.5 text-primary" />
            <span>My Certifications</span>
          </h3>

          <div className="space-y-3">
            {certificates.map((cert) => (
              <Card key={cert.id} className="p-4 hover:shadow transition-shadow">
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs text-slate-800 leading-snug">{cert.title}</h4>
                    <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">{cert.type}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Issued: {cert.issueDate}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-lg cursor-pointer shrink-0"
                    aria-label="Download certificate"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
