"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AreaChartWrapper } from "@/components/ui/Charts";
import {
  Clock,
  Calendar,
  BookOpen,
  CreditCard,
  User,
  LogOut,
  Play,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

// Mock weekly hours chart
const weeklyHoursData = [
  { name: "Mon", hours: 8.5 },
  { name: "Tue", hours: 8.8 },
  { name: "Wed", hours: 9.0 },
  { name: "Thu", hours: 8.2 },
  { name: "Fri", hours: 7.8 },
];

export default function EmployeeDashboard() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleClockToggle = () => {
    if (isClockedIn) {
      setIsClockedIn(false);
      setClockTime(null);
    } else {
      setIsClockedIn(true);
      const now = new Date();
      setClockTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Greeting Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Good morning, Alex Rivera
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Designation: <span className="font-semibold text-slate-700">Senior UI Designer</span> • Team: <span className="font-semibold text-slate-700">Product Team</span>
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Today's Date</p>
          <p className="text-sm font-bold text-slate-700 mt-1">August 22, 2026</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Columns: Grid components */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shift Tracker Clock Box */}
          <Card className="bg-gradient-to-tr from-purple-950 via-indigo-900 to-purple-900 text-white border-0 shadow-md">
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <p className="text-xs text-purple-200/80 font-bold uppercase tracking-wider">Shift Tracker</p>
                <h3 className="text-3xl font-extrabold">{currentTime}</h3>
                <p className="text-xs text-purple-200/70">
                  {isClockedIn
                    ? `Clocked in at ${clockTime} (Active Shift)`
                    : "Not clocked in today. Please register check-in."}
                </p>
              </div>
              <Button
                onClick={handleClockToggle}
                className={`w-full md:w-auto h-11 px-6 font-bold shadow-md cursor-pointer transition-all ${
                  isClockedIn
                    ? "bg-rose-600 hover:bg-rose-700 text-white"
                    : "bg-white hover:bg-slate-50 text-slate-900"
                }`}
              >
                {isClockedIn ? "Clock Out" : "Clock In"}
              </Button>
            </CardContent>
          </Card>

          {/* Weekly attendance analytic */}
          <Card>
            <CardHeader>
              <CardTitle>Hours Logged (Week)</CardTitle>
              <CardDescription>Track of daily working hours for current payroll period</CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChartWrapper data={weeklyHoursData} dataKey="hours" strokeColor="#4f46e5" height={240} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar widgets */}
        <div className="space-y-6">
          {/* Leave Balances */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold uppercase tracking-wide text-slate-500">Leave Balance</CardTitle>
              <Link href="/employee/leave" className="text-xs font-semibold text-primary hover:underline">
                Request Leave
              </Link>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <p className="text-xs text-slate-400 font-bold">Annual</p>
                <p className="text-lg font-extrabold text-slate-800 mt-1">14</p>
                <p className="text-[9px] text-slate-400 mt-1">days left</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <p className="text-xs text-slate-400 font-bold">Sick</p>
                <p className="text-lg font-extrabold text-slate-800 mt-1">5</p>
                <p className="text-[9px] text-slate-400 mt-1">days left</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <p className="text-xs text-slate-400 font-bold">Unpaid</p>
                <p className="text-lg font-extrabold text-slate-800 mt-1">0</p>
                <p className="text-[9px] text-slate-400 mt-1">days left</p>
              </div>
            </CardContent>
          </Card>

          {/* Assigned Course tracking */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold uppercase tracking-wide text-slate-500">Ongoing Lessons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3.5 border border-slate-100 rounded-xl bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="default" className="text-[9px] px-2 py-0.5">Compliance</Badge>
                  <span className="text-[10px] text-slate-400 font-semibold">1h left</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800">Information Security Guidelines</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Due: Aug 28, 2026</p>
                </div>
                <Link
                  href="/employee/training"
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold bg-white border border-border hover:border-primary/40 hover:text-primary transition-all rounded-lg"
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>Resume Course</span>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Self-service Quick Links */}
          <Card className="p-4">
            <CardTitle className="text-sm font-bold mb-3">Self Service Operations</CardTitle>
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <Link href="/employee/payroll" className="p-3 border border-slate-100 hover:border-primary/30 hover:bg-primary/5 rounded-xl transition-all flex flex-col items-center">
                <CreditCard className="h-5 w-5 text-primary mb-1" />
                <span className="text-[10px] font-bold text-slate-700">View Payslip</span>
              </Link>
              <Link href="/employee/attendance" className="p-3 border border-slate-100 hover:border-primary/30 hover:bg-primary/5 rounded-xl transition-all flex flex-col items-center">
                <Clock className="h-5 w-5 text-primary mb-1" />
                <span className="text-[10px] font-bold text-slate-700">Clock Log</span>
              </Link>
              <Link href="/employee/profile" className="p-3 border border-slate-100 hover:border-primary/30 hover:bg-primary/5 rounded-xl transition-all flex flex-col items-center">
                <User className="h-5 w-5 text-primary mb-1" />
                <span className="text-[10px] font-bold text-slate-700">My Profile</span>
              </Link>
              <Link href="/employee/notifications" className="p-3 border border-slate-100 hover:border-primary/30 hover:bg-primary/5 rounded-xl transition-all flex flex-col items-center">
                <Calendar className="h-5 w-5 text-primary mb-1" />
                <span className="text-[10px] font-bold text-slate-700">Alert Feeds</span>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
