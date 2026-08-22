"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import {
  Clock,
  Calendar,
  AlertCircle,
  MapPin,
  Clock3,
} from "lucide-react";

// Mock personal attendance logs
const myLogs = [
  { date: "Aug 21, 2026", timeIn: "08:52 AM", timeOut: "05:30 PM", hours: "8.6h", status: "PRESENT", location: "Office HQ" },
  { date: "Aug 20, 2026", timeIn: "09:12 AM", timeOut: "06:00 PM", hours: "8.8h", status: "LATE", location: "Office HQ" },
  { date: "Aug 19, 2026", timeIn: "08:45 AM", timeOut: "05:15 PM", hours: "8.5h", status: "PRESENT", location: "Remote" },
  { date: "Aug 18, 2026", timeIn: "---", timeOut: "---", hours: "0h", status: "ABSENT", location: "---" },
  { date: "Aug 17, 2026", timeIn: "08:58 AM", timeOut: "05:40 PM", hours: "8.7h", status: "PRESENT", location: "Office HQ" },
];

export default function EmployeeAttendancePage() {
  const [logs, setLogs] = useState(myLogs);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);

  const handleClockIn = () => {
    setIsClockedIn(true);
    setClockInTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  const handleClockOut = () => {
    if (!clockInTime) return;
    const now = new Date();
    const timeOutStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLog = {
      date: new Date().toLocaleDateString([], { month: 'short', day: '2-digit', year: 'numeric' }),
      timeIn: clockInTime,
      timeOut: timeOutStr,
      hours: "8.0h",
      status: "PRESENT" as const,
      location: "Remote",
    };
    setLogs([newLog, ...logs]);
    setIsClockedIn(false);
    setClockInTime(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          My Attendance Portal
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Clock in for your shift, specify check-in locations, and inspect personal log histories.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column: Interactive Check-in Card */}
        <div className="md:col-span-1 space-y-6">
          <Card className="text-center p-6 space-y-4">
            <CardHeader className="p-0">
              <CardTitle className="text-sm font-bold uppercase tracking-wide text-slate-400">Shift Check-In</CardTitle>
            </CardHeader>
            <div className="mx-auto h-16 w-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-primary">
              <Clock className="h-8 w-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-slate-800">
                {isClockedIn ? "Active Shift" : "Shift Inactive"}
              </h3>
              <p className="text-xs text-slate-400">
                {isClockedIn
                  ? `Clocked in at ${clockInTime} today`
                  : "Please register your presence"}
              </p>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 bg-slate-50 py-2 px-3 rounded-lg border border-slate-100">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              <span>Current location: <span className="font-semibold text-slate-700">Remote</span></span>
            </div>

            <Button
              onClick={isClockedIn ? handleClockOut : handleClockIn}
              className={`w-full h-10 font-bold cursor-pointer transition-all ${
                isClockedIn ? "bg-rose-600 hover:bg-rose-700 text-white" : "bg-primary hover:bg-primary/95 text-white"
              }`}
            >
              {isClockedIn ? "Clock Out Now" : "Clock In Now"}
            </Button>
          </Card>
        </div>

        {/* Right Column: Attendance History logs */}
        <div className="md:col-span-2 space-y-6">
          {/* Monthly Stats */}
          <div className="grid grid-cols-3 gap-2">
            <Card className="p-4 flex flex-col justify-between h-24">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Days Logged</span>
              <h4 className="text-xl font-bold text-slate-800 mt-1">19 / 20</h4>
            </Card>
            <Card className="p-4 flex flex-col justify-between h-24">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Late Check-ins</span>
              <h4 className="text-xl font-bold text-amber-600 mt-1">1</h4>
            </Card>
            <Card className="p-4 flex flex-col justify-between h-24">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Hours Worked</span>
              <h4 className="text-xl font-bold text-indigo-600 mt-1">162.8h</h4>
            </Card>
          </div>

          {/* Roster logs table */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Attendance Log Registry</CardTitle>
                <CardDescription>Review list of recent logs for current pay cycle</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-border text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
                      <th className="p-4">Date</th>
                      <th className="p-4">Time In</th>
                      <th className="p-4">Time Out</th>
                      <th className="p-4">Hours</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {logs.map((log, index) => (
                      <tr key={index} className="hover:bg-slate-50/40">
                        <td className="p-4 font-semibold text-slate-700 text-xs">{log.date}</td>
                        <td className="p-4 text-slate-600 text-xs">{log.timeIn}</td>
                        <td className="p-4 text-slate-600 text-xs">{log.timeOut}</td>
                        <td className="p-4 text-slate-600 text-xs font-semibold">{log.hours}</td>
                        <td className="p-4 text-slate-400 text-xs">{log.location}</td>
                        <td className="p-4">
                          <Badge variant={log.status === "PRESENT" ? "success" : log.status === "LATE" ? "warning" : "danger"}>
                            {log.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
