"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { Progress } from "@/components/ui/Progress";
import { SearchBar } from "@/components/ui/SearchBar";
import { useToast } from "@/components/ui/Toast";
import { GraduationCap, Star, Award, BookOpen, Play, CheckCircle2, Flame } from "lucide-react";

const TABS = [
  { label: "My Courses", value: "enrolled" },
  { label: "Catalog", value: "catalog" },
  { label: "Certificates", value: "certs" },
];

const enrolled = [
  { id: 1, title: "Code of Conduct 2026", category: "Compliance", progress: 100, lessons: 6, total: 6, cert: true, color: "from-emerald-500 to-teal-600" },
  { id: 2, title: "Security Awareness Training", category: "Security", progress: 60, lessons: 3, total: 5, cert: false, color: "from-amber-500 to-orange-600" },
  { id: 3, title: "Advanced React Patterns", category: "Technical", progress: 30, lessons: 2, total: 7, cert: false, color: "from-primary to-secondary" },
  { id: 4, title: "Leadership Fundamentals", category: "Soft Skills", progress: 0, lessons: 0, total: 8, cert: false, color: "from-pink-500 to-rose-600" },
];

const catalog = [
  { id: 5, title: "Data Analysis with Python", category: "Technical", duration: "4h 30m", level: "Intermediate", enrolled: false },
  { id: 6, title: "Effective Communication", category: "Soft Skills", duration: "2h 15m", level: "Beginner", enrolled: false },
  { id: 7, title: "Project Management Essentials", category: "Management", duration: "6h 00m", level: "Intermediate", enrolled: false },
  { id: 8, title: "Design Thinking Workshop", category: "Design", duration: "3h 45m", level: "Beginner", enrolled: true },
];

const certificates = [
  { title: "Code of Conduct 2026", issued: "Aug 15, 2026", id: "CERT-2026-001" },
];

const categoryBadge: Record<string, "default" | "success" | "warning" | "info" | "secondary"> = {
  Compliance: "success",
  Security: "warning",
  Technical: "default",
  "Soft Skills": "info",
  Management: "secondary",
  Design: "secondary",
};

export default function EmployeeTrainingPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState("enrolled");
  const [search, setSearch] = useState("");
  const [enrolledIds, setEnrolledIds] = useState(new Set([1, 2, 3, 4, 8]));

  const filteredCatalog = catalog.filter((c) =>
    !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase())
  );

  const completedCount = enrolled.filter((c) => c.progress === 100).length;
  const inProgressCount = enrolled.filter((c) => c.progress > 0 && c.progress < 100).length;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">My Learning</h1>
          <p className="text-xs text-slate-500 mt-1">
            {completedCount} completed · {inProgressCount} in progress · {enrolled.length} total assigned
          </p>
        </div>
        {/* Streak Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200">
          <Flame className="h-4 w-4 text-amber-500" />
          <span className="text-xs font-bold text-amber-700">12 Day Learning Streak 🔥</span>
        </div>
      </div>

      <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />

      {tab === "enrolled" && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {enrolled.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
              {/* Course Banner */}
              <div className={`h-20 bg-gradient-to-r ${course.color} flex items-center justify-center relative`}>
                <BookOpen className="h-8 w-8 text-white/60" />
                {course.cert && course.progress === 100 && (
                  <div className="absolute top-2 right-2 rounded-full bg-amber-400 p-1 shadow-sm">
                    <Star className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-800">{course.title}</h3>
                  <Badge variant={categoryBadge[course.category]}>{course.category}</Badge>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Progress</span>
                    <span className="font-semibold">{course.lessons}/{course.total} lessons</span>
                  </div>
                  <Progress value={course.progress} size="md" variant={course.progress === 100 ? "success" : "default"} showValue />
                </div>
                <Button
                  className={`w-full flex items-center justify-center gap-2 cursor-pointer ${course.progress === 100 ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                  onClick={() => toast({ title: course.progress === 100 ? "Course completed!" : `Resuming ${course.title}`, variant: "success" })}
                >
                  {course.progress === 100 ? (
                    <><CheckCircle2 className="h-4 w-4" />Completed</>
                  ) : course.progress === 0 ? (
                    <><Play className="h-4 w-4" />Start Course</>
                  ) : (
                    <><Play className="h-4 w-4" />Continue</>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "catalog" && (
        <div className="space-y-4">
          <SearchBar value={search} onChange={setSearch} placeholder="Search courses..." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCatalog.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-slate-800">{course.title}</h3>
                    <Badge variant={categoryBadge[course.category]}>{course.category}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{course.duration}</span>
                    <span>·</span>
                    <span>{course.level}</span>
                  </div>
                  {enrolledIds.has(course.id) ? (
                    <Button variant="outline" className="w-full cursor-pointer" disabled>
                      <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500" />Enrolled
                    </Button>
                  ) : (
                    <Button className="w-full cursor-pointer" onClick={() => {
                      setEnrolledIds((prev) => { const s = new Set(prev); s.add(course.id); return s; });
                      toast({ title: "Enrolled successfully", description: `You have been enrolled in ${course.title}.`, variant: "success" });
                    }}>
                      <GraduationCap className="h-4 w-4 mr-2" />Enroll
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "certs" && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <Card key={cert.id} className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
                <div className="flex flex-col items-center text-center gap-3 py-2">
                  <div className="h-14 w-14 rounded-full bg-amber-400 flex items-center justify-center shadow-md">
                    <Award className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{cert.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Issued: {cert.issued}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">{cert.id}</p>
                  </div>
                  <Button size="sm" variant="outline" className="w-full cursor-pointer" onClick={() => toast({ title: "Certificate downloaded", variant: "success" })}>
                    Download PDF
                  </Button>
                </div>
              </Card>
            ))}

            {/* Empty slot card */}
            <div className="rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center p-8 text-center text-slate-400">
              <div>
                <Award className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-xs font-medium">Complete courses to earn certificates</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
