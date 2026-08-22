"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
  Building,
  Users,
  ShieldCheck,
  Plus,
  Save,
  Trash2,
} from "lucide-react";

// Mock departments data
const initialDepts = [
  { id: "1", name: "Engineering", head: "Jane Cooper", count: 82 },
  { id: "2", name: "Product Management", head: "Esther Howard", count: 24 },
  { id: "3", name: "Human Resources", head: "Albert Flores", count: 12 },
  { id: "4", name: "Sales & Marketing", head: "Savannah Webb", count: 48 },
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"company" | "departments" | "roles">("company");
  const [departments, setDepartments] = useState(initialDepts);

  // New Department States
  const [newDeptName, setNewDeptName] = useState("");
  const [newDeptHead, setNewDeptHead] = useState("");

  const handleAddDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName) return;
    const newDept = {
      id: String(departments.length + 1),
      name: newDeptName,
      head: newDeptHead || "TBD",
      count: 0,
    };
    setDepartments([...departments, newDept]);
    setNewDeptName("");
    setNewDeptHead("");
  };

  const handleDeleteDept = (id: string) => {
    setDepartments(departments.filter((d) => d.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          System Administration
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Adjust company profiles, configure business departments, and define permission structures.
          All settings are saved globally.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("company")}
          className={`flex items-center gap-2 py-3 px-5 text-sm font-semibold border-b-2 cursor-pointer transition-colors ${
            activeTab === "company"
              ? "border-primary text-primary"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Building className="h-4 w-4" />
          <span>Company Profile</span>
        </button>
        <button
          onClick={() => setActiveTab("departments")}
          className={`flex items-center gap-2 py-3 px-5 text-sm font-semibold border-b-2 cursor-pointer transition-colors ${
            activeTab === "departments"
              ? "border-primary text-primary"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Departments</span>
        </button>
        <button
          onClick={() => setActiveTab("roles")}
          className={`flex items-center gap-2 py-3 px-5 text-sm font-semibold border-b-2 cursor-pointer transition-colors ${
            activeTab === "roles"
              ? "border-primary text-primary"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>Roles & Permissions</span>
        </button>
      </div>

      {/* Company settings Tab */}
      {activeTab === "company" && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Organization Details</CardTitle>
            <CardDescription>Configure primary company information for system documents and payslips.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Company Legal Name" defaultValue="Acme Global Industries" />
              <Input label="Workspace Domain" defaultValue="acme-global.hrms.com" disabled />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Corporate Email" defaultValue="ops@acme-global.com" />
              <Input label="Phone Number" defaultValue="+1 555-8919" />
            </div>
            <Input label="Office Headquarters Address" defaultValue="100 Silicon Boulevard, San Francisco, CA" />
            <div className="flex justify-end pt-4 border-t">
              <Button className="flex items-center gap-2 cursor-pointer">
                <Save className="h-4 w-4" />
                <span>Save Profile</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Departments settings Tab */}
      {activeTab === "departments" && (
        <div className="grid gap-6 md:grid-cols-3">
          {/* Department add form */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Add Department</CardTitle>
              <CardDescription>Setup a new department in the corporate structure.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddDept} className="space-y-4">
                <Input
                  label="Department Name"
                  placeholder="e.g. Finance"
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                  required
                />
                <Input
                  label="Department Head"
                  placeholder="e.g. Jane Doe"
                  value={newDeptHead}
                  onChange={(e) => setNewDeptHead(e.target.value)}
                />
                <Button type="submit" className="w-full flex items-center justify-center gap-2 cursor-pointer">
                  <Plus className="h-4 w-4" />
                  <span>Create Business Unit</span>
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Departments grid list */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Active Departments</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {departments.map((dept) => (
                <Card key={dept.id} className="p-4 hover:shadow transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">{dept.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-1">Head: {dept.head}</p>
                      <Badge variant="secondary" className="mt-3 text-[10px]">
                        {dept.count} Members
                      </Badge>
                    </div>
                    {dept.count === 0 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteDept(dept.id)}
                        className="h-8 w-8 p-0 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer animate-fade-in"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Roles & Permissions settings Tab */}
      {activeTab === "roles" && (
        <Card>
          <CardHeader>
            <CardTitle>Access Control Matrix</CardTitle>
            <CardDescription>Manage fine-grained directory, payroll, and review access levels per system role.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-border text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
                    <th className="p-4">Resource Node</th>
                    <th className="p-4 text-center">HR Admin</th>
                    <th className="p-4 text-center">Line Manager</th>
                    <th className="p-4 text-center">Employee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-700">Modify Employee Records</td>
                    <td className="p-4 text-center"><input type="checkbox" defaultChecked disabled /></td>
                    <td className="p-4 text-center"><input type="checkbox" defaultChecked /></td>
                    <td className="p-4 text-center"><input type="checkbox" disabled /></td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-700">Review Leave Applications</td>
                    <td className="p-4 text-center"><input type="checkbox" defaultChecked disabled /></td>
                    <td className="p-4 text-center"><input type="checkbox" defaultChecked /></td>
                    <td className="p-4 text-center"><input type="checkbox" disabled /></td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-700">Run Payroll Disbursements</td>
                    <td className="p-4 text-center"><input type="checkbox" defaultChecked disabled /></td>
                    <td className="p-4 text-center"><input type="checkbox" /></td>
                    <td className="p-4 text-center"><input type="checkbox" disabled /></td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-700">Submit Self Evaluations</td>
                    <td className="p-4 text-center"><input type="checkbox" defaultChecked /></td>
                    <td className="p-4 text-center"><input type="checkbox" defaultChecked /></td>
                    <td className="p-4 text-center"><input type="checkbox" defaultChecked disabled /></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-6 mt-6 border-t">
              <Button className="flex items-center gap-2 cursor-pointer">
                <Save className="h-4 w-4" />
                <span>Save Matrix Rules</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
