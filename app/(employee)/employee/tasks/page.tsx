"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/src/context/AuthContext";
import { createClient } from "@/src/lib/supabase/client";
import { Plus, CheckCircle2, X, GripVertical, Search, Edit2 } from "lucide-react";

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
  const { user, loading: authLoading } = useAuth();
  const email = user?.email || "";
  const supabase = createClient();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [employeeInfo, setEmployeeInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Create Task Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDue, setNewDue] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("Medium");
  const [newStatus, setNewStatus] = useState<Status>("todo");

  // Edit Task Modal States
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editDue, setEditDue] = useState("");
  const [editPriority, setEditPriority] = useState<Priority>("Medium");
  const [editStatus, setEditStatus] = useState<Status>("todo");

  const fetchTasks = async () => {
    if (!email) {
      if (!authLoading) setLoading(false);
      return;
    }

    try {
      const { data: emp } = await supabase
        .from("employees")
        .select("*")
        .eq("work_email", email)
        .maybeSingle();

      if (emp) {
        setEmployeeInfo(emp);

        const { data: goalsList } = await supabase
          .from("goals")
          .select("*")
          .eq("employee_id", emp.id);

        if (goalsList) {
          setTasks(goalsList.map(g => ({
            id: g.id,
            title: g.title || "",
            description: g.description || "",
            due: g.end_date || "No due date",
            priority: (g.goal_type === "High" || g.goal_type === "Medium" || g.goal_type === "Low") ? g.goal_type : "Medium",
            status: (g.status === "todo" || g.status === "inprogress" || g.status === "done") ? g.status : "todo"
          })));
        }
      }
    } catch (err) {
      console.error("Tasks fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!email) {
      setLoading(false);
      return;
    }
    fetchTasks();

    const channel = supabase
      .channel("tasks_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "goals" }, () => {
        fetchTasks();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [email, authLoading]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !employeeInfo) return;

    try {
      const { error } = await supabase.from("goals").insert({
        company_id: employeeInfo.company_id,
        employee_id: employeeInfo.id,
        title: newTitle,
        description: newDesc,
        goal_type: newPriority,
        status: newStatus,
        end_date: newDue || null,
        progress: newStatus === "done" ? 100 : newStatus === "inprogress" ? 50 : 0
      });

      if (error) {
        toast({ title: "Failed to create task", description: error.message, variant: "error" });
      } else {
        toast({ title: "Task created successfully", variant: "success" });
        setIsAddOpen(false);
        setNewTitle(""); setNewDesc(""); setNewDue("");
        fetchTasks();
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "error" });
    }
  };

  const handleEditOpen = (task: Task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.description || "");
    setEditDue(task.due !== "No due date" ? task.due : "");
    setEditPriority(task.priority);
    setEditStatus(task.status);
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle || !editId) return;

    try {
      const { error } = await supabase
        .from("goals")
        .update({
          title: editTitle,
          description: editDesc,
          goal_type: editPriority,
          status: editStatus,
          end_date: editDue || null,
          progress: editStatus === "done" ? 100 : editStatus === "inprogress" ? 50 : 0
        })
        .eq("id", editId);

      if (error) {
        toast({ title: "Failed to update task", description: error.message, variant: "error" });
      } else {
        toast({ title: "Task updated successfully", variant: "success" });
        setIsEditOpen(false);
        fetchTasks();
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "error" });
    }
  };

  const moveTask = async (id: string, newS: Status) => {
    try {
      const { error } = await supabase
        .from("goals")
        .update({
          status: newS,
          progress: newS === "done" ? 100 : newS === "inprogress" ? 50 : 0
        })
        .eq("id", id);

      if (error) {
        toast({ title: "Failed to move task", description: error.message, variant: "error" });
      } else {
        toast({ title: `Moved task to ${newS}`, variant: "success" });
        fetchTasks();
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "error" });
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from("goals")
        .delete()
        .eq("id", id);

      if (error) {
        toast({ title: "Failed to delete task", description: error.message, variant: "error" });
      } else {
        toast({ title: "Task deleted successfully", variant: "info" });
        fetchTasks();
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "error" });
    }
  };

  // Filter and search tasks
  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                          (t.description && t.description.toLowerCase().includes(search.toLowerCase()));
    const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const byStatus = (s: Status) => filteredTasks.filter((t) => t.status === s);

  if (loading) return <div className="p-6">Loading tasks...</div>;

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

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              options={[
                { value: "all", label: "All Priorities" },
                { value: "High", label: "High" },
                { value: "Medium", label: "Medium" },
                { value: "Low", label: "Low" },
              ]}
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            />
          </div>
        </div>
      </Card>

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

              {/* Tasks List */}
              <div className="space-y-3">
                {colTasks.map((task) => (
                  <div key={task.id} className="rounded-xl bg-card border border-border p-4 shadow-sm hover:shadow-md transition-all group relative">
                    {/* Action buttons */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button onClick={() => handleEditOpen(task)} className="p-1 rounded text-slate-400 hover:text-primary hover:bg-slate-50 cursor-pointer">
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => deleteTask(task.id)} className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 cursor-pointer">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex items-start gap-2 pr-12">
                      {task.status === "done" ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-slate-200 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold ${task.status === "done" ? "line-through text-slate-400" : "text-slate-800"}`}>{task.title}</p>
                        {task.description && <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{task.description}</p>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${priorityColor[task.priority]}`}>{task.priority}</span>
                      <span className="text-[10px] text-slate-400">{task.due}</span>
                    </div>

                    {/* Quick Move Status Buttons */}
                    <div className="flex gap-1 mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
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
                    <GripVertical className="h-6 w-6 mx-auto mb-1 animate-pulse" />
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

      {/* Edit Task Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Task Details">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <Input label="Task Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required />
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Description</label>
            <textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} className="w-full min-h-[60px] rounded-lg border border-border p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <Input label="Due Date" type="date" value={editDue} onChange={(e) => setEditDue(e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Priority" options={PRIORITY_OPTIONS} value={editPriority} onChange={(e) => setEditPriority(e.target.value as Priority)} />
            <Select label="Status" options={STATUS_OPTIONS} value={editStatus} onChange={(e) => setEditStatus(e.target.value as Status)} />
          </div>
          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)} className="flex-1 cursor-pointer">Cancel</Button>
            <Button type="submit" className="flex-1 cursor-pointer">Save Changes</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
