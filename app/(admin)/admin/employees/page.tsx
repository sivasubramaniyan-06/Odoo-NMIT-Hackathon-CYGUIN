"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  Users,
  Search,
  Filter,
  UserPlus,
  GitFork,
  Eye,
  Edit2,
  Trash2,
  Building,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  DollarSign,
  ChevronRight,
} from "lucide-react";

// Mock employee roster
const initialEmployees = [
  { id: "EMP-101", name: "Jane Cooper", email: "jane.cooper@company.com", phone: "+1 555-0192", department: "Engineering", role: "VP of Engineering", joined: "2023-04-12", status: "ACTIVE", salary: 165000, manager: "CEO" },
  { id: "EMP-102", name: "Cody Fisher", email: "cody.fisher@company.com", phone: "+1 555-0193", department: "Engineering", role: "Engineering Manager", joined: "2023-09-01", status: "ACTIVE", salary: 130000, manager: "Jane Cooper" },
  { id: "EMP-103", name: "Esther Howard", email: "esther.howard@company.com", phone: "+1 555-0194", department: "Product Management", role: "Director of Product", joined: "2024-01-15", status: "ACTIVE", salary: 155000, manager: "CEO" },
  { id: "EMP-104", name: "Ronald Richards", email: "ronald.richards@company.com", phone: "+1 555-0195", department: "Engineering", role: "Senior Developer", joined: "2024-02-18", status: "ACTIVE", salary: 110000, manager: "Cody Fisher" },
  { id: "EMP-105", name: "Albert Flores", email: "albert.flores@company.com", phone: "+1 555-0196", department: "Human Resources", role: "HR Manager", joined: "2022-11-05", status: "ACTIVE", salary: 95000, manager: "CEO" },
  { id: "EMP-106", name: "Savannah Webb", email: "savannah.webb@company.com", phone: "+1 555-0197", department: "Sales & Marketing", role: "Marketing Lead", joined: "2023-11-10", status: "SUSPENDED", salary: 85000, manager: "CEO" },
  { id: "EMP-107", name: "Jenny Wilson", email: "jenny.wilson@company.com", phone: "+1 555-0198", department: "Product Management", role: "Senior Product Manager", joined: "2024-03-01", status: "ACTIVE", salary: 125000, manager: "Esther Howard" },
];

export default function EmployeeManagementPage() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [activeTab, setActiveTab] = useState<"directory" | "org-chart">("directory");
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");

  // Drawer/Modal States
  const [selectedEmp, setSelectedEmp] = useState<typeof initialEmployees[0] | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Form States (for simple stubbing)
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formDept, setFormDept] = useState("Engineering");
  const [formRole, setFormRole] = useState("");

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) || emp.id.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === "all" || emp.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmp = {
      id: `EMP-${100 + employees.length + 1}`,
      name: formName,
      email: formEmail,
      phone: "+1 555-9999",
      department: formDept,
      role: formRole,
      joined: new Date().toISOString().split("T")[0],
      status: "ACTIVE" as const,
      salary: 90000,
      manager: "CEO",
    };
    setEmployees([...employees, newEmp]);
    setIsAddOpen(false);
    // Reset Form
    setFormName("");
    setFormEmail("");
    setFormRole("");
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmp) return;
    setEmployees(
      employees.map((emp) =>
        emp.id === selectedEmp.id
          ? { ...emp, name: formName, email: formEmail, department: formDept, role: formRole }
          : emp
      )
    );
    setIsEditOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Employee Administration
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Access staff listings, reporting structures, and onboard new colleagues.
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 cursor-pointer">
            <UserPlus className="h-4 w-4" />
            <span>Onboard Employee</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("directory")}
          className={`flex items-center gap-2 py-3 px-5 text-sm font-semibold border-b-2 cursor-pointer transition-colors ${
            activeTab === "directory"
              ? "border-primary text-primary"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Employee Directory</span>
        </button>
        <button
          onClick={() => setActiveTab("org-chart")}
          className={`flex items-center gap-2 py-3 px-5 text-sm font-semibold border-b-2 cursor-pointer transition-colors ${
            activeTab === "org-chart"
              ? "border-primary text-primary"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <GitFork className="h-4 w-4" />
          <span>Organization Chart</span>
        </button>
      </div>

      {/* Directory Tab Content */}
      {activeTab === "directory" && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between bg-card p-4 rounded-xl border border-border">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, ID or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-border bg-slate-50/50 py-2.5 pl-9 pr-3 text-xs focus:bg-card focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="rounded-lg border border-border bg-card py-2.5 px-3 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none shadow-sm cursor-pointer"
                >
                  <option value="all">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Product Management">Product Management</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Sales & Marketing">Sales & Marketing</option>
                </select>
              </div>
            </div>
          </div>

          {/* Roster Table */}
          <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full text-sm border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-border text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
                  <th className="p-4">Employee ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/40">
                    <td className="p-4 font-mono text-xs font-bold text-slate-500">{emp.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-primary">
                          {emp.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-700">{emp.name}</span>
                          <span className="text-[10px] text-slate-400">{emp.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-500 text-xs">{emp.department}</td>
                    <td className="p-4 text-slate-500 text-xs">{emp.role}</td>
                    <td className="p-4">
                      <Badge variant={emp.status === "ACTIVE" ? "success" : "warning"}>
                        {emp.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedEmp(emp)}
                        className="h-8 px-2 hover:bg-slate-100 text-slate-600 rounded-lg cursor-pointer"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedEmp(emp);
                          setFormName(emp.name);
                          setFormEmail(emp.email);
                          setFormDept(emp.department);
                          setFormRole(emp.role);
                          setIsEditOpen(true);
                        }}
                        className="h-8 px-2 hover:bg-slate-100 text-slate-600 rounded-lg cursor-pointer"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Org Chart Tab Content */}
      {activeTab === "org-chart" && (
        <Card className="p-8 border-border shadow-sm flex flex-col items-center">
          <div className="space-y-8 w-full max-w-3xl flex flex-col items-center">
            {/* CEO node */}
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground p-4 rounded-xl shadow-md text-center w-52 border border-primary/20">
                <h4 className="font-bold text-sm">William Vance</h4>
                <p className="text-[10px] text-purple-200 mt-1 uppercase font-semibold tracking-wider">Chief Executive Officer</p>
              </div>
              <div className="h-8 w-0.5 bg-slate-200 mt-2" />
            </div>

            {/* Reporting Line connectors */}
            <div className="w-full flex items-center justify-between px-16 relative">
              <div className="absolute top-0 left-[20%] right-[20%] h-0.5 bg-slate-200" />
              
              {/* Dept Node 1 */}
              <div className="flex flex-col items-center flex-1">
                <div className="h-4 w-0.5 bg-slate-200" />
                <div className="bg-card border border-border p-3.5 rounded-xl shadow-xs text-center w-48 hover:shadow transition-shadow">
                  <h4 className="font-bold text-xs text-slate-700">Jane Cooper</h4>
                  <p className="text-[9px] text-muted-foreground mt-0.5 uppercase tracking-wider">VP of Engineering</p>
                  <div className="flex items-center justify-center gap-1.5 mt-2 text-[9px] text-slate-400">
                    <ChevronRight className="h-3 w-3 rotate-90 text-slate-300" />
                    <span>3 direct reports</span>
                  </div>
                </div>
              </div>

              {/* Dept Node 2 */}
              <div className="flex flex-col items-center flex-1">
                <div className="h-4 w-0.5 bg-slate-200" />
                <div className="bg-card border border-border p-3.5 rounded-xl shadow-xs text-center w-48 hover:shadow transition-shadow">
                  <h4 className="font-bold text-xs text-slate-700">Esther Howard</h4>
                  <p className="text-[9px] text-muted-foreground mt-0.5 uppercase tracking-wider">Director of Product</p>
                  <div className="flex items-center justify-center gap-1.5 mt-2 text-[9px] text-slate-400">
                    <ChevronRight className="h-3 w-3 rotate-90 text-slate-300" />
                    <span>1 direct report</span>
                  </div>
                </div>
              </div>

              {/* Dept Node 3 */}
              <div className="flex flex-col items-center flex-1">
                <div className="h-4 w-0.5 bg-slate-200" />
                <div className="bg-card border border-border p-3.5 rounded-xl shadow-xs text-center w-48 hover:shadow transition-shadow">
                  <h4 className="font-bold text-xs text-slate-700">Albert Flores</h4>
                  <p className="text-[9px] text-muted-foreground mt-0.5 uppercase tracking-wider">HR Manager</p>
                  <div className="flex items-center justify-center gap-1.5 mt-2 text-[9px] text-slate-400">
                    <ChevronRight className="h-3 w-3 rotate-90 text-slate-300" />
                    <span>0 reports</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Employee Details Modal */}
      <Modal isOpen={selectedEmp !== null && !isEditOpen} onClose={() => setSelectedEmp(null)} title="Employee Dossier">
        {selectedEmp && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-md">
                {selectedEmp.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <h3 className="text-md font-bold text-slate-900">{selectedEmp.name}</h3>
                <p className="text-xs text-slate-400">{selectedEmp.role}</p>
                <Badge variant={selectedEmp.status === "ACTIVE" ? "success" : "warning"} className="mt-1">
                  {selectedEmp.status}
                </Badge>
              </div>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 p-2 bg-card rounded-lg border border-border">
                <p className="font-semibold text-slate-400 uppercase tracking-wide">ID Number</p>
                <p className="font-bold text-slate-700">{selectedEmp.id}</p>
              </div>
              <div className="space-y-1 p-2 bg-card rounded-lg border border-border">
                <p className="font-semibold text-slate-400 uppercase tracking-wide">Department</p>
                <p className="font-bold text-slate-700">{selectedEmp.department}</p>
              </div>
              <div className="space-y-1 p-2 bg-card rounded-lg border border-border">
                <p className="font-semibold text-slate-400 uppercase tracking-wide">Work Email</p>
                <p className="font-bold text-slate-700">{selectedEmp.email}</p>
              </div>
              <div className="space-y-1 p-2 bg-card rounded-lg border border-border">
                <p className="font-semibold text-slate-400 uppercase tracking-wide">Mobile Phone</p>
                <p className="font-bold text-slate-700">{selectedEmp.phone}</p>
              </div>
              <div className="space-y-1 p-2 bg-card rounded-lg border border-border">
                <p className="font-semibold text-slate-400 uppercase tracking-wide">Date Joined</p>
                <p className="font-bold text-slate-700">{selectedEmp.joined}</p>
              </div>
              <div className="space-y-1 p-2 bg-card rounded-lg border border-border">
                <p className="font-semibold text-slate-400 uppercase tracking-wide">Annual Salary</p>
                <p className="font-bold text-slate-700">${selectedEmp.salary.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button onClick={() => setSelectedEmp(null)}>Done</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Employee Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Onboard New Employee">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Jane Cooper"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            required
          />
          <Input
            label="Work Email Address"
            type="email"
            placeholder="jane.cooper@company.com"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Department
              </label>
              <select
                value={formDept}
                onChange={(e) => setFormDept(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm cursor-pointer"
              >
                <option value="Engineering">Engineering</option>
                <option value="Product Management">Product Management</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Sales & Marketing">Sales & Marketing</option>
              </select>
            </div>
            <Input
              label="Corporate Role"
              placeholder="Developer"
              value={formRole}
              onChange={(e) => setFormRole(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-3 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Complete Onboarding
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Employee Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Employee Profile">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            required
          />
          <Input
            label="Work Email Address"
            type="email"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Department
              </label>
              <select
                value={formDept}
                onChange={(e) => setFormDept(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm cursor-pointer"
              >
                <option value="Engineering">Engineering</option>
                <option value="Product Management">Product Management</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Sales & Marketing">Sales & Marketing</option>
              </select>
            </div>
            <Input
              label="Corporate Role"
              value={formRole}
              onChange={(e) => setFormRole(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-3 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
