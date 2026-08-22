"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { AreaChartWrapper } from "@/components/ui/Charts";
import {
  Coins,
  Receipt,
  FileSpreadsheet,
  Download,
  AlertCircle,
  Plus,
} from "lucide-react";

// Mock payroll data
const payrollHistory = [
  { name: "Mar", totalDisbursed: 380000 },
  { name: "Apr", totalDisbursed: 395000 },
  { name: "May", totalDisbursed: 405000 },
  { name: "Jun", totalDisbursed: 408000 },
  { name: "Jul", totalDisbursed: 412000 },
  { name: "Aug", totalDisbursed: 412850 },
];

const payrollLedgers = [
  { id: "1", name: "Jane Cooper", dept: "Engineering", base: 13750, allowance: 1200, deduction: 1100, net: 13850, status: "PAID" },
  { id: "2", name: "Cody Fisher", dept: "Engineering", base: 10833, allowance: 800, deduction: 900, net: 10733, status: "PAID" },
  { id: "3", name: "Esther Howard", dept: "Product Management", base: 12916, allowance: 1000, deduction: 1200, net: 12716, status: "PAID" },
  { id: "4", name: "Albert Flores", dept: "Human Resources", base: 7916, allowance: 600, deduction: 750, net: 7766, status: "PROCESSING" },
];

export default function AdminPayrollPage() {
  const [ledgers, setLedgers] = useState(payrollLedgers);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);

  // Generator form state
  const [empName, setEmpName] = useState("Ronald Richards");
  const [empDept, setEmpDept] = useState("Engineering");
  const [basePay, setBasePay] = useState(9166);
  const [allowance, setAllowance] = useState(800);
  const [deduction, setDeduction] = useState(650);

  const calculateNet = () => {
    return Number(basePay) + Number(allowance) - Number(deduction);
  };

  const handleGenerateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      id: String(ledgers.length + 1),
      name: empName,
      dept: empDept,
      base: basePay,
      allowance: allowance,
      deduction: deduction,
      net: calculateNet(),
      status: "PROCESSING" as const,
    };
    setLedgers([...ledgers, newEntry]);
    setIsGeneratorOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Payroll Administration
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Conduct monthly salary releases, generate staff payslips, and inspect total compensation metrics.
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setIsGeneratorOpen(true)} className="flex items-center gap-2 cursor-pointer">
            <Plus className="h-4 w-4" />
            <span>Generate Payslip</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-primary rounded-xl">
            <Coins className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Payroll Run (Aug)</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">$412,850</h3>
            <p className="text-[10px] text-emerald-600 font-semibold mt-1">Approved & closed on Aug 20</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Receipt className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Release</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">$7,766</h3>
            <p className="text-[10px] text-amber-600 font-semibold mt-1">1 active run in progress</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-secondary rounded-xl">
            <FileSpreadsheet className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Taxes & Contributions</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">$68,420</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Due by end of month</p>
          </div>
        </Card>
      </div>

      {/* Analytics Graph */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Expenditure Trend</CardTitle>
          <CardDescription>Historical overview of salary disbursement totals (USD)</CardDescription>
        </CardHeader>
        <CardContent>
          <AreaChartWrapper data={payrollHistory} dataKey="totalDisbursed" strokeColor="#4338ca" height={260} />
        </CardContent>
      </Card>

      {/* Salary Ledgers */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>August Salary Ledger</CardTitle>
            <CardDescription>Individual compensation breakdowns for the current cycle</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2 cursor-pointer">
            <Download className="h-4 w-4" />
            <span>Download Payroll Report</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-border text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
                  <th className="p-4">Employee</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Base Salary</th>
                  <th className="p-4">Allowances</th>
                  <th className="p-4">Deductions</th>
                  <th className="p-4">Net Salary</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ledgers.map((ledger) => (
                  <tr key={ledger.id} className="hover:bg-slate-50/40">
                    <td className="p-4 font-semibold text-slate-700">{ledger.name}</td>
                    <td className="p-4 text-slate-500 text-xs">{ledger.dept}</td>
                    <td className="p-4 text-slate-600 text-xs font-semibold">${ledger.base.toLocaleString()}</td>
                    <td className="p-4 text-emerald-600 text-xs font-semibold">+${ledger.allowance.toLocaleString()}</td>
                    <td className="p-4 text-rose-600 text-xs font-semibold">-${ledger.deduction.toLocaleString()}</td>
                    <td className="p-4 text-slate-800 font-bold">${ledger.net.toLocaleString()}</td>
                    <td className="p-4">
                      <Badge variant={ledger.status === "PAID" ? "success" : "warning"}>
                        {ledger.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Generate Payslip Modal */}
      <Modal isOpen={isGeneratorOpen} onClose={() => setIsGeneratorOpen(false)} title="Payslip Generation Wizard">
        <form onSubmit={handleGenerateSubmit} className="space-y-4">
          <Input
            label="Employee Name"
            value={empName}
            onChange={(e) => setEmpName(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Business Unit
              </label>
              <select
                value={empDept}
                onChange={(e) => setEmpDept(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm cursor-pointer"
              >
                <option value="Engineering">Engineering</option>
                <option value="Product Management">Product Management</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Sales & Marketing">Sales & Marketing</option>
              </select>
            </div>
            <Input
              label="Monthly Base Pay ($)"
              type="number"
              value={basePay}
              onChange={(e) => setBasePay(Number(e.target.value))}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Allowances ($)"
              type="number"
              value={allowance}
              onChange={(e) => setAllowance(Number(e.target.value))}
            />
            <Input
              label="Deductions & Taxes ($)"
              type="number"
              value={deduction}
              onChange={(e) => setDeduction(Number(e.target.value))}
            />
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Calculated Net Payout</p>
            <p className="text-xl font-extrabold text-slate-900">${calculateNet().toLocaleString()}</p>
          </div>

          <div className="flex justify-end gap-3 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => setIsGeneratorOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex items-center gap-1.5">
              <span>Disburse & Sign</span>
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
