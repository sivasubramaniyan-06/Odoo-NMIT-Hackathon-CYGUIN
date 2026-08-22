"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { StatCard } from "@/components/ui/StatCard";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/ui/Toast";
import { Building2, Users, MapPin, GitBranch, Plus, Edit, Trash2 } from "lucide-react";

const TABS = [
  { label: "Departments", value: "departments" },
  { label: "Teams", value: "teams" },
  { label: "Hierarchy", value: "hierarchy" },
  { label: "Locations", value: "locations" },
];

const initialDepts = [
  { id: "D01", name: "Engineering", head: "Jordan Kim", count: 54, color: "bg-purple-500" },
  { id: "D02", name: "Design", head: "Ana Patel", count: 18, color: "bg-indigo-500" },
  { id: "D03", name: "Sales", head: "Chen Wei", count: 32, color: "bg-sky-500" },
  { id: "D04", name: "Marketing", head: "Maria Santos", count: 21, color: "bg-pink-500" },
  { id: "D05", name: "HR", head: "Priya Mehta", count: 12, color: "bg-amber-500" },
  { id: "D06", name: "Finance", head: "David Brown", count: 16, color: "bg-emerald-500" },
];

const teams = [
  { name: "Platform UX", dept: "Design", members: 6, lead: "Alex Rivera" },
  { name: "Backend Core", dept: "Engineering", members: 14, lead: "Kevin Park" },
  { name: "DevOps / SRE", dept: "Engineering", members: 8, lead: "Sam Taylor" },
  { name: "Enterprise Sales", dept: "Sales", members: 12, lead: "Chen Wei" },
  { name: "Growth Marketing", dept: "Marketing", members: 9, lead: "Nora Walsh" },
];

const locations = [
  { name: "San Francisco HQ", address: "100 Market St, San Francisco, CA 94105", employees: 72, type: "HQ" },
  { name: "New York Office", address: "350 5th Ave, New York, NY 10118", employees: 38, type: "Regional" },
  { name: "Remote", address: "Fully distributed", employees: 57, type: "Remote" },
];

const hierarchy = [
  { name: "Alex Rivera", role: "CEO", level: 0, reports: [
    { name: "Jordan Kim", role: "VP Engineering", level: 1, reports: [
      { name: "Kevin Park", role: "Lead Backend", level: 2, reports: [] },
      { name: "Sam Taylor", role: "DevOps Lead", level: 2, reports: [] },
    ]},
    { name: "Ana Patel", role: "VP Design", level: 1, reports: [
      { name: "Alex Rivera", role: "Lead Designer", level: 2, reports: [] },
    ]},
  ]},
];

function HierarchyNode({ node, depth = 0 }: { node: typeof hierarchy[0]; depth?: number }) {
  return (
    <div className={`ml-${depth === 0 ? "0" : "8"} border-l-2 border-slate-200 pl-4`}>
      <div className="flex items-center gap-3 py-2">
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-[10px] font-bold shrink-0">
          {node.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">{node.name}</p>
          <p className="text-xs text-slate-500">{node.role}</p>
        </div>
      </div>
      {node.reports?.map((child: any) => (
        <HierarchyNode key={child.name} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function AdminOrganizationPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState("departments");
  const [depts, setDepts] = useState(initialDepts);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newDeptName, setNewDeptName] = useState("");
  const [newDeptHead, setNewDeptHead] = useState("");

  const handleDelete = () => {
    setDepts((prev) => prev.filter((d) => d.id !== deleteTarget));
    setDeleteTarget(null);
    toast({ title: "Department deleted", variant: "success" });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName) return;
    const newDept = {
      id: `D0${depts.length + 1}`,
      name: newDeptName,
      head: newDeptHead || "Unassigned",
      count: 0,
      color: "bg-slate-500",
    };
    setDepts((prev) => [...prev, newDept]);
    setIsAddOpen(false);
    setNewDeptName(""); setNewDeptHead("");
    toast({ title: "Department created", description: `${newDeptName} has been added to the organization.`, variant: "success" });
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Organization Management</h1>
          <p className="text-xs text-slate-500 mt-1">Manage departments, teams, reporting structure, and office locations</p>
        </div>
        <Button size="sm" onClick={() => setIsAddOpen(true)} className="flex items-center gap-1.5 cursor-pointer">
          <Plus className="h-4 w-4" /><span>Add Department</span>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Departments" value={depts.length} icon={Building2} iconBg="bg-purple-50" iconColor="text-primary" />
        <StatCard title="Total Teams" value={teams.length} icon={Users} iconBg="bg-sky-50" iconColor="text-sky-600" />
        <StatCard title="Office Locations" value={locations.length} icon={MapPin} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard title="Hierarchy Levels" value="4" icon={GitBranch} iconBg="bg-amber-50" iconColor="text-amber-600" />
      </div>

      <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />

      {tab === "departments" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {depts.map((dept) => (
            <Card key={dept.id} className="hover:shadow-md transition-shadow group">
              <div className="flex items-start gap-4">
                <div className={`h-12 w-12 rounded-xl ${dept.color} flex items-center justify-center text-white text-lg font-extrabold shrink-0`}>
                  {dept.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800">{dept.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Head: {dept.head}</p>
                  <p className="text-xs text-primary font-semibold mt-1">{dept.count} employees</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"><Edit className="h-3.5 w-3.5" /></button>
                  <button onClick={() => setDeleteTarget(dept.id)} className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "teams" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <Card key={team.name} className="hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-800">{team.name}</h3>
                  <Badge variant="secondary">{team.dept}</Badge>
                </div>
                <div className="text-xs text-slate-500 space-y-1.5">
                  <p className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{team.members} members</p>
                  <p className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" />Lead: {team.lead}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "hierarchy" && (
        <Card>
          <CardHeader><CardTitle>Reporting Hierarchy</CardTitle><CardDescription>Organizational reporting structure</CardDescription></CardHeader>
          <CardContent>
            {hierarchy.map((node) => (
              <HierarchyNode key={node.name} node={node} />
            ))}
          </CardContent>
        </Card>
      )}

      {tab === "locations" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc) => (
            <Card key={loc.name} className="hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-800">{loc.name}</h3>
                  <Badge variant={loc.type === "HQ" ? "default" : loc.type === "Remote" ? "secondary" : "info"}>{loc.type}</Badge>
                </div>
                <div className="text-xs text-slate-500 space-y-1.5">
                  <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{loc.address}</p>
                  <p className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{loc.employees} employees</p>
                </div>
                <div className="h-24 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs">
                  Map Preview
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog isOpen={deleteTarget !== null} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Department" description="This will remove the department and reassign employees. This action cannot be undone." confirmLabel="Delete" variant="destructive" />

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Create New Department">
        <form onSubmit={handleAdd} className="space-y-4">
          <Input label="Department Name" value={newDeptName} onChange={(e) => setNewDeptName(e.target.value)} required placeholder="e.g. Customer Success" />
          <Input label="Department Head" value={newDeptHead} onChange={(e) => setNewDeptHead(e.target.value)} placeholder="e.g. Jane Cooper" />
          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="flex-1 cursor-pointer">Cancel</Button>
            <Button type="submit" className="flex-1 cursor-pointer">Create Department</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
