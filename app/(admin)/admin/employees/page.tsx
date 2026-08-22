"use client";

import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SearchBar } from "@/components/ui/SearchBar";
import { Select } from "@/components/ui/Select";
import { Tabs } from "@/components/ui/Tabs";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import {
  Plus, Download, LayoutGrid, List, Edit, Trash2, Eye,
  Mail, Phone, MapPin, Users,
} from "lucide-react";
import Link from "next/link";

export const EMPLOYEES = [
  { id: "EMP-001", name: "Jordan Kim", role: "Lead Engineer", dept: "Engineering", status: "Active", email: "jordan@acme.com", phone: "+1 555-0101", location: "San Francisco", joined: "2022-03-15", avatar: "JK" },
  { id: "EMP-002", name: "Ana Patel", role: "Product Designer", dept: "Design", status: "Active", email: "ana@acme.com", phone: "+1 555-0102", location: "New York", joined: "2023-01-10", avatar: "AP" },
  { id: "EMP-003", name: "Chen Wei", role: "Sales Director", dept: "Sales", status: "Active", email: "chen@acme.com", phone: "+1 555-0103", location: "Chicago", joined: "2021-06-01", avatar: "CW" },
  { id: "EMP-004", name: "Maria Santos", role: "Marketing Manager", dept: "Marketing", status: "Active", email: "maria@acme.com", phone: "+1 555-0104", location: "Los Angeles", joined: "2022-09-20", avatar: "MS" },
  { id: "EMP-005", name: "James Liu", role: "Senior Engineer", dept: "Engineering", status: "On Leave", email: "james@acme.com", phone: "+1 555-0105", location: "Austin", joined: "2023-03-01", avatar: "JL" },
  { id: "EMP-006", name: "Priya Mehta", role: "HR Specialist", dept: "HR", status: "Active", email: "priya@acme.com", phone: "+1 555-0106", location: "Boston", joined: "2023-07-15", avatar: "PM" },
  { id: "EMP-007", name: "David Brown", role: "Finance Analyst", dept: "Finance", status: "Active", email: "david@acme.com", phone: "+1 555-0107", location: "Seattle", joined: "2022-11-01", avatar: "DB" },
  { id: "EMP-008", name: "Lisa Chen", role: "Operations Lead", dept: "Operations", status: "Inactive", email: "lisa@acme.com", phone: "+1 555-0108", location: "Denver", joined: "2021-02-14", avatar: "LC" },
  { id: "EMP-009", name: "Alex Rivera", role: "Senior UI Designer", dept: "Design", status: "Active", email: "alex@acme.com", phone: "+1 555-0109", location: "San Francisco", joined: "2024-03-01", avatar: "AR" },
  { id: "EMP-010", name: "Sam Taylor", role: "DevOps Engineer", dept: "Engineering", status: "Active", email: "sam@acme.com", phone: "+1 555-0110", location: "Portland", joined: "2023-08-15", avatar: "ST" },
  { id: "EMP-011", name: "Nora Walsh", role: "Content Strategist", dept: "Marketing", status: "Active", email: "nora@acme.com", phone: "+1 555-0111", location: "Miami", joined: "2024-01-20", avatar: "NW" },
  { id: "EMP-012", name: "Kevin Park", role: "Backend Engineer", dept: "Engineering", status: "Active", email: "kevin@acme.com", phone: "+1 555-0112", location: "Atlanta", joined: "2023-05-10", avatar: "KP" },
];

const DEPT_OPTIONS = [
  { value: "", label: "All Departments" },
  { value: "Engineering", label: "Engineering" },
  { value: "Design", label: "Design" },
  { value: "Sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
  { value: "HR", label: "HR" },
  { value: "Finance", label: "Finance" },
  { value: "Operations", label: "Operations" },
];

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "Active", label: "Active" },
  { value: "On Leave", label: "On Leave" },
  { value: "Inactive", label: "Inactive" },
];

const PAGE_SIZE = 8;
const gradients = ["from-purple-500 to-indigo-600", "from-indigo-500 to-cyan-600", "from-pink-500 to-rose-600", "from-emerald-500 to-teal-600", "from-amber-500 to-orange-600"];

export default function AdminEmployeesPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [view, setView] = useState("table");
  const [page, setPage] = useState(1);
  const [employees, setEmployees] = useState(EMPLOYEES);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newDept, setNewDept] = useState("Engineering");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newStatus, setNewStatus] = useState("Active");

  const [editingEmployee, setEditingEmployee] = useState<typeof EMPLOYEES[0] | null>(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editDept, setEditDept] = useState("Engineering");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editStatus, setEditStatus] = useState("Active");

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase());
      const matchDept = !dept || e.dept === dept;
      const matchStatus = !statusFilter || e.status === statusFilter;
      return matchSearch && matchDept && matchStatus;
    });
  }, [employees, search, dept, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = () => {
    setEmployees((prev) => prev.filter((e) => e.id !== deleteTarget));
    setDeleteTarget(null);
    toast({ title: "Employee removed", description: "The employee record has been deleted.", variant: "success" });
  };

  const handleStartEdit = (emp: typeof EMPLOYEES[0]) => {
    setEditingEmployee(emp);
    setEditName(emp.name);
    setEditRole(emp.role);
    setEditDept(emp.dept);
    setEditEmail(emp.email);
    setEditPhone(emp.phone || "");
    setEditLocation(emp.location || "");
    setEditStatus(emp.status || "Active");
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEmployee || !editName || !editRole || !editEmail) return;

    const updatedAvatar = editName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === editingEmployee.id
          ? {
              ...emp,
              name: editName,
              role: editRole,
              dept: editDept,
              email: editEmail,
              phone: editPhone || emp.phone,
              location: editLocation || emp.location,
              status: editStatus,
              avatar: updatedAvatar || emp.avatar,
            }
          : emp
      )
    );

    setEditingEmployee(null);
    toast({
      title: "Employee updated successfully",
      description: `${editName}'s details have been updated.`,
      variant: "success",
    });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newRole || !newEmail) return;
    const newEmp = {
      id: `EMP-0${employees.length + 1}`,
      name: newName,
      role: newRole,
      dept: newDept,
      status: newStatus || "Active",
      email: newEmail,
      phone: newPhone || "+1 555-0000",
      location: newLocation || "Remote",
      joined: new Date().toISOString().split("T")[0],
      avatar: newName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
    };
    setEmployees((prev) => [newEmp, ...prev]);
    setIsAddOpen(false);
    setNewName(""); setNewRole(""); setNewEmail(""); setNewDept("Engineering"); setNewPhone(""); setNewLocation(""); setNewStatus("Active");
    toast({ title: "Employee added", description: `${newName} has been onboarded successfully.`, variant: "success" });
  };

  const statusVariant: Record<string, "success" | "warning" | "danger" | "secondary"> = {
    Active: "success", "On Leave": "warning", Inactive: "danger",
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Employee Directory</h1>
          <p className="text-xs text-slate-500 mt-1">{employees.length} employees across {DEPT_OPTIONS.length - 1} departments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1.5 cursor-pointer">
            <Download className="h-4 w-4" /><span className="hidden sm:inline">Export</span>
          </Button>
          <Button size="sm" onClick={() => setIsAddOpen(true)} className="flex items-center gap-1.5 cursor-pointer">
            <Plus className="h-4 w-4" /><span>Add Employee</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <SearchBar placeholder="Search by name, role, or email..." value={search} onChange={(v) => { setSearch(v); setPage(1); }} className="flex-1" />
          <Select options={DEPT_OPTIONS} value={dept} onChange={(e) => { setDept(e.target.value); setPage(1); }} className="sm:w-44" />
          <Select options={STATUS_OPTIONS} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="sm:w-36" />
          <Tabs
            tabs={[{ label: "", value: "table" }, { label: "", value: "grid" }]}
            activeTab={view}
            onChange={setView}
            className="hidden sm:flex"
          />
          <div className="hidden sm:flex gap-1">
            <button onClick={() => setView("table")} className={`p-2 rounded-lg border cursor-pointer transition-colors ${view === "table" ? "bg-primary text-white border-primary" : "border-border text-slate-500 hover:bg-slate-50"}`}><List className="h-4 w-4" /></button>
            <button onClick={() => setView("grid")} className={`p-2 rounded-lg border cursor-pointer transition-colors ${view === "grid" ? "bg-primary text-white border-primary" : "border-border text-slate-500 hover:bg-slate-50"}`}><LayoutGrid className="h-4 w-4" /></button>
          </div>
        </div>
      </Card>

      {/* Content */}
      {filtered.length === 0 ? (
        <EmptyState variant="search" title="No employees found" description="Try adjusting your search or filter criteria." action={{ label: "Clear filters", onClick: () => { setSearch(""); setDept(""); setStatusFilter(""); } }} />
      ) : view === "table" ? (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-border text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="p-4 text-left">Employee</th>
                  <th className="p-4 text-left hidden md:table-cell">Department</th>
                  <th className="p-4 text-left hidden lg:table-cell">Contact</th>
                  <th className="p-4 text-left hidden xl:table-cell">Joined</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginated.map((emp, i) => (
                  <tr key={emp.id} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-9 w-9 rounded-full bg-gradient-to-tr ${gradients[i % gradients.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                          {emp.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{emp.name}</p>
                          <p className="text-xs text-slate-500">{emp.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <Badge variant="secondary">{emp.dept}</Badge>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="text-xs text-slate-500 space-y-0.5">
                        <div className="flex items-center gap-1"><Mail className="h-3 w-3" />{emp.email}</div>
                        <div className="flex items-center gap-1"><MapPin className="h-3 w-3" />{emp.location}</div>
                      </div>
                    </td>
                    <td className="p-4 hidden xl:table-cell text-xs text-slate-500">{emp.joined}</td>
                    <td className="p-4">
                      <Badge variant={statusVariant[emp.status] ?? "secondary"}>{emp.status}</Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/employees/${emp.id}`}>
                          <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer transition-colors" aria-label="View"><Eye className="h-3.5 w-3.5" /></button>
                        </Link>
                        <button onClick={() => handleStartEdit(emp)} className="p-1.5 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors" aria-label="Edit"><Edit className="h-3.5 w-3.5" /></button>
                        <button onClick={() => setDeleteTarget(emp.id)} className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 cursor-pointer transition-colors" aria-label="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-border">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginated.map((emp, i) => (
            <Card key={emp.id} className="flex flex-col hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center pt-2 pb-4 gap-3">
                <div className={`h-14 w-14 rounded-full bg-gradient-to-tr ${gradients[i % gradients.length]} flex items-center justify-center text-white text-lg font-bold shadow-md`}>
                  {emp.avatar}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{emp.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{emp.role}</p>
                  <Badge variant={statusVariant[emp.status] ?? "secondary"} className="mt-2">{emp.status}</Badge>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-500">
                <div className="flex items-center gap-2"><Mail className="h-3 w-3 shrink-0" /><span className="truncate">{emp.email}</span></div>
                <div className="flex items-center gap-2"><Users className="h-3 w-3 shrink-0" /><span>{emp.dept}</span></div>
                <div className="flex items-center gap-2"><MapPin className="h-3 w-3 shrink-0" /><span>{emp.location}</span></div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href={`/admin/employees/${emp.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full cursor-pointer">View</Button>
                </Link>
                <button onClick={() => handleStartEdit(emp)} className="p-2 rounded-lg border border-border text-slate-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 cursor-pointer transition-colors" aria-label="Edit"><Edit className="h-3.5 w-3.5" /></button>
                <button onClick={() => setDeleteTarget(emp.id)} className="p-2 rounded-lg border border-border text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 cursor-pointer transition-colors" aria-label="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination for grid view */}
      {view === "grid" && filtered.length > PAGE_SIZE && (
        <div className="mt-4">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Employee Record"
        description="This action is permanent. The employee's data, payroll history, and documents will be removed."
        confirmLabel="Delete Employee"
        variant="destructive"
      />

      {/* Add Employee Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Onboard New Employee">
        <form onSubmit={handleAdd} className="space-y-4">
          <Input label="Full Name" value={newName} onChange={(e) => setNewName(e.target.value)} required placeholder="e.g. Sarah Johnson" />
          <Input label="Job Title / Role" value={newRole} onChange={(e) => setNewRole(e.target.value)} required placeholder="e.g. Senior Engineer" />
          <Input label="Work Email" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required placeholder="e.g. sarah@acme.com" />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Department" options={DEPT_OPTIONS.filter((d) => d.value)} value={newDept} onChange={(e) => setNewDept(e.target.value)} />
            <Select label="Status" options={STATUS_OPTIONS.filter((s) => s.value)} value={newStatus} onChange={(e) => setNewStatus(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Phone Number" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder="e.g. +1 555-0100" />
            <Input label="Location" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="e.g. San Francisco" />
          </div>
          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="flex-1 cursor-pointer">Cancel</Button>
            <Button type="submit" className="flex-1 cursor-pointer">Add Employee</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Employee Modal */}
      <Modal isOpen={editingEmployee !== null} onClose={() => setEditingEmployee(null)} title="Edit Employee Details">
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <Input label="Full Name" value={editName} onChange={(e) => setEditName(e.target.value)} required placeholder="e.g. Sarah Johnson" />
          <Input label="Job Title / Role" value={editRole} onChange={(e) => setEditRole(e.target.value)} required placeholder="e.g. Senior Engineer" />
          <Input label="Work Email" type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} required placeholder="e.g. sarah@acme.com" />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Department" options={DEPT_OPTIONS.filter((d) => d.value)} value={editDept} onChange={(e) => setEditDept(e.target.value)} />
            <Select label="Status" options={STATUS_OPTIONS.filter((s) => s.value)} value={editStatus} onChange={(e) => setEditStatus(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Phone Number" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} placeholder="e.g. +1 555-0100" />
            <Input label="Location" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} placeholder="e.g. San Francisco" />
          </div>
          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setEditingEmployee(null)} className="flex-1 cursor-pointer">Cancel</Button>
            <Button type="submit" className="flex-1 cursor-pointer">Save Changes</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
