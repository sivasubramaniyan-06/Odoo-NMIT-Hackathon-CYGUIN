"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";
import { Plus, CheckCircle2, X, GripVertical } from "lucide-react";

type Priority = "High" | "Medium" | "Low";
type Status = "todo" | "inprogress" | "done";

interface Task {
  id: string;
  title: string;
  description?: string;
  due: string;
  priority: Priority;
  status: Status;
}

const INITIAL_TASKS: Task[] = [
  { id: "T01", title: "Complete Q3 self-review form", description: "Fill in all performance ratings and submit by Aug 31.", due: "Aug 31", priority: "High", status: "todo" },
  { id: "T02", title: "Update portfolio in profile page", description: "Add 3 new case studies from recent projects.", due: "Sep 5", priority: "Low", status: "todo" },
  { id: "T03", title: "Complete Security Awareness Training", description: "Module 4 and 5 remaining.", due: "Sep 15", priority: "Medium", status: "inprogress" },
  { id: "T04", title: "Review onboarding docs for new joinee", description: "Sarah Kim starts Sep 1. Prepare welcome kit.", due: "Aug 30", priority: "High", status: "inprogress" },
  { id: "T05", title: "Code of Conduct 2026", description: "Completed all 6 modules.", due: "Aug 15", priority: "Medium", status: "done" },
  { id: "T06", title: "Submit expense report for NYC trip", description: "Flight + hotel receipts uploaded.", due: "Aug 20", priority: "Low", status: "done" },
];

const COLUMNS: { label: string; key: Status; color: string; headerColor: string }[] = [
  { label: "To Do", key: "todo", color: "bg-slate-50 border-slate-200", headerColor: "bg-slate-500" },
  { label: "In Progress", key: "inprogress", color: "bg-amber-50 border-amber-200", headerColor: "bg-amber-500" },
  { label: "Done", key: "done", color: "bg-emerald-50 border-emerald-200", headerColor: "bg-emerald-500" },
];

const priorityColor: Record<Priority, string> = {
  High: "bg-rose-100 text-rose-700 border border-rose-200",
  Medium: "bg-amber-100 text-amber-700 border border-amber-200",
  Low: "bg-slate-100 text-slate-600 border border-slate-200",
};

const PRIORITY_OPTIONS = ["High", "Medium", "Low"].map((p) => ({ value: p, label: p }));
const STATUS_OPTIONS: { value: Status; label: string }[] = [
  { value: "todo", label: "To Do" },
  { value: "inprogress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export default function EmployeeTasksPage() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDue, setNewDue] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("Medium");
  const [newStatus, setNewStatus] = useState<Status>("todo");

  const byStatus = (s: Status) => tasks.filter((t) => t.status === s);

  const moveTask = (id: string, newS: Status) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: newS } : t)));
    toast({ title: "Task updated", variant: "success" });
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast({ title: "Task deleted", variant: "info" });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const t: Task = { id: `T${Date.now()}`, title: newTitle, description: newDesc, due: newDue || "No due date", priority: newPriority, status: newStatus };
    setTasks((prev) => [t, ...prev]);
    setIsAddOpen(false);
    setNewTitle(""); setNewDesc(""); setNewDue("");
    toast({ title: "Task created", variant: "success" });
  };

  const todoCount = byStatus("todo").length;
  const inCount = byStatus("inprogress").length;
  const doneCount = byStatus("done").length;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">My Tasks</h1>
          <p className="text-xs text-slate-500 mt-1">
            {todoCount} to do · {inCount} in progress · {doneCount} completed
          </p>
        </div>
        <Button size="sm" onClick={() => setIsAddOpen(true)} className="flex items-center gap-1.5 cursor-pointer">
          <Plus className="h-4 w-4" /><span>Add Task</span>
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid gap-4 lg:grid-cols-3">
        {COLUMNS.map((col) => {
          const colTasks = byStatus(col.key);
          return (
            <div key={col.key} className={`rounded-2xl border-2 ${col.color} p-4 min-h-[400px]`}>
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${col.headerColor}`} />
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">{col.label}</h3>
                </div>
                <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-bold text-slate-600 border">{colTasks.length}</span>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {colTasks.map((task) => (
                  <div key={task.id} className="rounded-xl bg-card border border-border p-4 shadow-sm hover:shadow-md transition-shadow group relative">
                    {/* Delete button */}
                    <button onClick={() => deleteTask(task.id)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 cursor-pointer">
                      <X className="h-3 w-3" />
                    </button>

                    <div className="flex items-start gap-2 pr-4">
                      {task.status === "done" ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-slate-200 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-semibold ${task.status === "done" ? "line-through text-slate-400" : "text-slate-800"}`}>{task.title}</p>
                        {task.description && <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{task.description}</p>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${priorityColor[task.priority]}`}>{task.priority}</span>
                      <span className="text-[10px] text-slate-400">{task.due}</span>
                    </div>

                    {/* Quick Move Buttons */}
                    <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {STATUS_OPTIONS.filter((s) => s.value !== task.status).map((s) => (
                        <button key={s.value} onClick={() => moveTask(task.id, s.value)} className="flex-1 text-[9px] font-bold py-1 rounded-lg bg-slate-100 hover:bg-primary hover:text-white transition-colors cursor-pointer text-slate-500">
                          → {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {colTasks.length === 0 && (
                  <div className="text-center py-8 text-slate-300">
                    <GripVertical className="h-6 w-6 mx-auto mb-1" />
                    <p className="text-[10px] font-medium">No tasks here</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Create New Task">
        <form onSubmit={handleAdd} className="space-y-4">
          <Input label="Task Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required placeholder="e.g. Review design mockups" />
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Description</label>
            <textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} className="w-full min-h-[60px] rounded-lg border border-border p-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Optional notes..." />
          </div>
          <Input label="Due Date" type="date" value={newDue} onChange={(e) => setNewDue(e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Priority" options={PRIORITY_OPTIONS} value={newPriority} onChange={(e) => setNewPriority(e.target.value as Priority)} />
            <Select label="Status" options={STATUS_OPTIONS} value={newStatus} onChange={(e) => setNewStatus(e.target.value as Status)} />
          </div>
          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="flex-1 cursor-pointer">Cancel</Button>
            <Button type="submit" className="flex-1 cursor-pointer">Create Task</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
