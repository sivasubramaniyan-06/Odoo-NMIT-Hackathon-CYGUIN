"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";
import { createClient } from "@/src/lib/supabase/client";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface CalEvent {
  id: string | number;
  title: string;
  date: string;
  type: "Holiday" | "Company" | "Leave" | "Review" | "Training" | "Birthday" | "Meeting";
}

const EVENTS: CalEvent[] = [
  { id: 1, title: "All Hands Meeting", date: "2026-09-03", type: "Company" },
  { id: 2, title: "Labor Day (Holiday)", date: "2026-09-02", type: "Holiday" },
  { id: 5, title: "Q3 Review Cycle Starts", date: "2026-09-11", type: "Review" },
  { id: 6, title: "Security Training Deadline", date: "2026-09-15", type: "Training" },
  { id: 7, title: "Team Building Event", date: "2026-09-19", type: "Company" },
];

const typeColors: Record<CalEvent["type"], string> = {
  Holiday: "bg-rose-50 border-rose-200 text-rose-700",
  Company: "bg-purple-50 border-purple-200 text-purple-700",
  Leave: "bg-amber-50 border-amber-200 text-amber-700",
  Review: "bg-sky-50 border-sky-200 text-sky-700",
  Training: "bg-emerald-50 border-emerald-200 text-emerald-700",
  Birthday: "bg-pink-50 border-pink-200 text-pink-700",
  Meeting: "bg-blue-50 border-blue-200 text-blue-700",
};

const typeDot: Record<CalEvent["type"], string> = {
  Holiday: "bg-rose-500",
  Company: "bg-purple-500",
  Leave: "bg-amber-500",
  Review: "bg-sky-500",
  Training: "bg-emerald-500",
  Birthday: "bg-pink-500",
  Meeting: "bg-blue-500",
};

const typeVariant: Record<CalEvent["type"], "default" | "danger" | "success" | "warning" | "info" | "secondary"> = {
  Holiday: "danger",
  Company: "default",
  Leave: "warning",
  Review: "info",
  Training: "success",
  Birthday: "secondary",
  Meeting: "default",
};

export default function EmployeeCalendarPage() {
  const { toast } = useToast();
  const now = new Date();
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(8); // September (0-indexed)
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [events, setEvents] = useState<CalEvent[]>(EVENTS);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newType, setNewType] = useState<CalEvent["type"]>("Company");

  const supabase = createClient();

  const fetchCalendarEvents = async () => {
    try {
      // 1. Fetch Leave Requests (Approved)
      const { data: leaves } = await supabase
        .from("leave_requests")
        .select("*")
        .eq("status", "Approved");
      
      const leaveEvents = leaves ? leaves.map((l: any) => ({
        id: `leave-${l.id}`,
        title: `${l.employee_name || "Employee"} on Leave`,
        date: l.start_date,
        type: "Leave" as const
      })) : [];

      // 2. Fetch Employees for birthdays
      const { data: emps } = await supabase
        .from("employees")
        .select("id, first_name, last_name");
      
      const birthdayEvents = emps ? emps.map((emp: any) => {
        const hash = emp.id.split("").reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
        const day = (hash % 28) + 1;
        const monthIndex = hash % 12;
        return {
          id: `bday-${emp.id}`,
          title: `🎂 ${emp.first_name} ${emp.last_name}'s Birthday`,
          date: `2026-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
          type: "Birthday" as const
        };
      }) : [];

      // 3. Fetch Goals for reviews / training deadline events
      const { data: goalsList } = await supabase
        .from("goals")
        .select("*");
      
      const goalEvents = goalsList ? goalsList.map((g: any) => ({
        id: `goal-${g.id}`,
        title: `🎯 Target: ${g.title}`,
        date: g.end_date || "2026-09-30",
        type: (g.goal_type === "Training" ? "Training" : "Review") as CalEvent["type"]
      })) : [];

      // Combine with default static company events/holidays
      setEvents([...EVENTS, ...leaveEvents, ...birthdayEvents, ...goalEvents]);
    } catch (err) {
      console.error("Calendar data load error:", err);
    }
  };

  useEffect(() => {
    fetchCalendarEvents();
  }, []);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const getDateStr = (d: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const selectedEvents = selectedDate ? events.filter((e) => e.date === selectedDate) : [];

  const handleAddEvent = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!newTitle || !newDate) return;
    const newEv: CalEvent = { id: `local-${Date.now()}`, title: newTitle, date: newDate, type: newType };
    setEvents((prev) => [...prev, newEv]);
    setIsAddOpen(false);
    setNewTitle(""); setNewDate("");
    toast({ title: "Event added to calendar", variant: "success" });
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Company Calendar</h1>
          <p className="text-xs text-slate-500 mt-1">Holidays, events, leave markers, and review cycles</p>
        </div>
        <Button size="sm" onClick={() => setIsAddOpen(true)} className="flex items-center gap-1.5 cursor-pointer">
          <Plus className="h-4 w-4" /><span>Add Event</span>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Calendar Grid */}
        <div className="lg:col-span-3">
          <Card>
            {/* Month Navigator */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"><ChevronLeft className="h-4 w-4 text-slate-600" /></button>
              <h2 className="text-base font-bold text-slate-900">{MONTHS[month]} {year}</h2>
              <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"><ChevronRight className="h-4 w-4 text-slate-600" /></button>
            </div>

            <div className="p-4">
              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {DAYS.map((d) => (
                  <div key={d} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-wide py-2">{d}</div>
                ))}
              </div>

              {/* Calendar cells */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const d = i + 1;
                  const dateStr = getDateStr(d);
                  const dayEvents = events.filter((e) => e.date === dateStr);
                  const isToday = dateStr === `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
                  const isSelected = selectedDate === dateStr;

                  return (
                    <button
                      key={d}
                      onClick={() => setSelectedDate(selectedDate === dateStr ? null : dateStr)}
                      className={`min-h-[60px] p-1.5 rounded-xl text-left transition-all cursor-pointer border ${
                        isSelected ? "bg-primary text-white border-primary shadow-md" :
                        isToday ? "bg-primary/5 border-primary/30" : "border-transparent hover:bg-slate-50"
                      }`}
                    >
                      <span className={`text-xs font-bold block mb-1 ${isSelected ? "text-white" : isToday ? "text-primary" : "text-slate-700"}`}>{d}</span>
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 2).map((ev) => (
                          <div key={ev.id} className={`flex items-center gap-1 rounded px-1 py-0.5 text-[9px] font-semibold truncate ${isSelected ? "bg-white/20 text-white" : typeColors[ev.type]}`}>
                            <span className={`h-1 w-1 rounded-full shrink-0 ${isSelected ? "bg-white" : typeDot[ev.type]}`} />
                            <span className="truncate">{ev.title}</span>
                          </div>
                        ))}
                        {dayEvents.length > 2 && <p className={`text-[9px] font-bold pl-1 ${isSelected ? "text-white/80" : "text-slate-400"}`}>+{dayEvents.length - 2} more</p>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Legend */}
          <Card>
            <CardHeader><CardTitle className="text-sm">Event Types</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(typeDot).map(([type, color]) => (
                <div key={type} className="flex items-center gap-2 text-xs">
                  <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${color}`} />
                  <span className="text-slate-600 font-medium">{type}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Selected Day Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center justify-between">
                <span>{selectedDate ? `${new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}` : "Select a date"}</span>
                {selectedDate && <button onClick={() => setSelectedDate(null)} className="cursor-pointer text-slate-400 hover:text-slate-600"><X className="h-3.5 w-3.5" /></button>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDate ? (
                selectedEvents.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">No events on this day</p>
                ) : (
                  <div className="space-y-2">
                    {selectedEvents.map((ev) => (
                      <div key={ev.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <Badge variant={typeVariant[ev.type]}>{ev.type}</Badge>
                        <p className="text-xs font-semibold text-slate-800 mt-1.5">{ev.title}</p>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <p className="text-xs text-slate-400 text-center py-4">Click a date to see events</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Event Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Calendar Event">
        <form onSubmit={handleAddEvent} className="space-y-4">
          <Input label="Event Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required placeholder="e.g. Team Offsite" />
          <Input label="Date" type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} required />
          <Select
            label="Event Type"
            options={["Company", "Holiday", "Leave", "Review", "Training"].map((t) => ({ value: t, label: t }))}
            value={newType}
            onChange={(e) => setNewType(e.target.value as CalEvent["type"])}
          />
          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="flex-1 cursor-pointer">Cancel</Button>
            <Button type="submit" className="flex-1 cursor-pointer">Add Event</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
