"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { StatCard } from "@/components/ui/StatCard";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";
import { AreaChartWrapper, BarChartWrapper } from "@/components/ui/Charts";
import { Coins, Download, Eye, CreditCard, Receipt, Plus, Building2, Zap } from "lucide-react";

const TABS = [
  { label: "Overview", value: "overview" },
  { label: "Run Payroll", value: "run" },
  { label: "Payslips", value: "payslips" },
  { label: "Reimbursements", value: "reimbursements" },
];

const payrollTrend = [
  { month: "Mar", total: 380000 }, { month: "Apr", total: 395000 },
  { month: "May", total: 405000 }, { month: "Jun", total: 408000 },
  { month: "Jul", total: 412000 }, { month: "Aug", total: 412850 },
];

const componentBreakdown = [
  { name: "Base Salary", amount: 340000 },
  { name: "Allowances", amount: 35000 },
  { name: "Bonuses", amount: 22000 },
  { name: "Deductions", amount: -34150 },
];

const payslips = [
  { id: "PAY-904", name: "Jordan Kim", dept: "Engineering", month: "August 2026", gross: 11000, net: 9350, status: "Paid" },
  { id: "PAY-903", name: "Ana Patel", dept: "Design", month: "August 2026", gross: 9500, net: 8075, status: "Paid" },
  { id: "PAY-902", name: "Chen Wei", dept: "Sales", month: "August 2026", gross: 14000, net: 11900, status: "Paid" },
  { id: "PAY-901", name: "Alex Rivera", dept: "Design", month: "August 2026", gross: 9166, net: 7790, status: "Pending" },
];

const reimbursements = [
  { id: "RMB-01", name: "Jordan Kim", category: "Travel", amount: 1200, date: "Aug 18", status: "Pending", desc: "Flight to NYC for client meeting" },
  { id: "RMB-02", name: "Ana Patel", category: "Equipment", amount: 350, date: "Aug 10", status: "Approved", desc: "Webcam upgrade for remote work" },
  { id: "RMB-03", name: "Sam Taylor", category: "Training", amount: 499, date: "Aug 05", status: "Pending", desc: "AWS certification exam fee" },
];

const DEPT_OPTIONS = [
  { value: "all", label: "All Departments" },
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
];

export default function AdminPayrollPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState("overview");
  const [selectedSlip, setSelectedSlip] = useState<typeof payslips[0] | null>(null);
  const [runDept, setRunDept] = useState("all");
  const [runMonth, setRunMonth] = useState("2026-08");
  const [runConfirm, setRunConfirm] = useState(false);

  const handleRunPayroll = () => {
    setRunConfirm(false);
    toast({ title: "Payroll processing started", description: `Running payroll for ${runMonth}. Payslips will be generated within 5 minutes.`, variant: "success" });
  };

  const handleApproveReimbursement = (id: string) => {
    toast({ title: "Reimbursement approved", description: `Reimbursement ${id} has been approved for processing.`, variant: "success" });
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Payroll Management</h1>
          <p className="text-xs text-slate-500 mt-1">Manage salary disbursements, payslips, and reimbursements</p>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-1.5 cursor-pointer">
          <Download className="h-4 w-4" /><span>Export Payroll</span>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Payroll (Aug)" value="$412,850" icon={Coins} iconBg="bg-purple-50" iconColor="text-primary" trend={{ value: 1.1 }} />
        <StatCard title="Employees Paid" value="162 / 167" icon={CreditCard} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard title="Pending Payslips" value="5" icon={Receipt} iconBg="bg-amber-50" iconColor="text-amber-600" />
        <StatCard title="Reimbursements" value="$2,049" icon={Building2} iconBg="bg-sky-50" iconColor="text-sky-600" />
      </div>

      <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />

      {tab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Payroll Cost Trend</CardTitle><CardDescription>Total payroll disbursed over the last 6 months</CardDescription></CardHeader>
            <CardContent>
              <AreaChartWrapper data={payrollTrend} xKey="month" areas={[{ key: "total", color: "#6b21a8", label: "Total Payroll" }]} height={200} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Cost Breakdown — August 2026</CardTitle><CardDescription>Salary components distribution</CardDescription></CardHeader>
            <CardContent>
              <BarChartWrapper data={componentBreakdown} xKey="name" bars={[{ key: "amount", color: "#4f46e5", label: "Amount ($)" }]} height={200} />
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "run" && (
        <Card>
          <CardHeader><CardTitle>Run Payroll</CardTitle><CardDescription>Generate and disburse salary for a department or all employees</CardDescription></CardHeader>
          <CardContent className="space-y-6 max-w-lg">
            <div className="grid grid-cols-2 gap-4">
              <Select label="Department" options={DEPT_OPTIONS} value={runDept} onChange={(e) => setRunDept(e.target.value)} />
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">Payroll Month</label>
                <input type="month" value={runMonth} onChange={(e) => setRunMonth(e.target.value)} className="flex h-10 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm cursor-pointer" />
              </div>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-1">
              <p className="font-bold flex items-center gap-1.5"><Zap className="h-3.5 w-3.5" /> Pre-run Checklist</p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-amber-700">
                <li>All attendance records finalized</li>
                <li>Leave deductions calculated</li>
                <li>Bonus and reimbursements verified</li>
                <li>Bank account details confirmed for all employees</li>
              </ul>
            </div>
            <Button onClick={() => setRunConfirm(true)} className="flex items-center gap-2 cursor-pointer">
              <Zap className="h-4 w-4" /><span>Generate & Process Payroll</span>
            </Button>
          </CardContent>
        </Card>
      )}

      {tab === "payslips" && (
        <Card>
          <CardHeader><CardTitle>Payslip Repository</CardTitle><CardDescription>All disbursed salary statements</CardDescription></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-border text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="p-4 text-left">Employee</th>
                    <th className="p-4 text-left hidden md:table-cell">Dept</th>
                    <th className="p-4 text-left">Month</th>
                    <th className="p-4 text-right">Gross</th>
                    <th className="p-4 text-right">Net Paid</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {payslips.map((slip) => (
                    <tr key={slip.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="font-semibold text-slate-800 text-xs">{slip.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{slip.id}</p>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell text-xs text-slate-500">{slip.dept}</td>
                      <td className="p-4 text-xs text-slate-500">{slip.month}</td>
                      <td className="p-4 text-right text-xs text-slate-500">${slip.gross.toLocaleString()}</td>
                      <td className="p-4 text-right text-xs font-bold text-slate-800">${slip.net.toLocaleString()}</td>
                      <td className="p-4"><Badge variant={slip.status === "Paid" ? "success" : "warning"}>{slip.status}</Badge></td>
                      <td className="p-4 text-right">
                        <button onClick={() => setSelectedSlip(slip)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "reimbursements" && (
        <div className="space-y-4">
          {reimbursements.map((r) => (
            <Card key={r.id} className="hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-slate-800">{r.name}</p>
                    <Badge variant="secondary">{r.category}</Badge>
                    <span className="text-xs text-slate-400">{r.date}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 italic">"{r.desc}"</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-lg font-bold text-slate-800">${r.amount.toLocaleString()}</span>
                  <Badge variant={r.status === "Approved" ? "success" : "warning"}>{r.status}</Badge>
                  {r.status === "Pending" && (
                    <Button size="sm" onClick={() => handleApproveReimbursement(r.id)} className="cursor-pointer">Approve</Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Payslip Viewer Modal */}
      <Modal isOpen={selectedSlip !== null} onClose={() => setSelectedSlip(null)} title="Salary Statement">
        {selectedSlip && (
          <div className="space-y-4">
            <div className="text-xs text-slate-500 border-b pb-3">
              <p className="font-bold text-slate-800 text-sm">{selectedSlip.name}</p>
              <p>{selectedSlip.dept} · {selectedSlip.month}</p>
            </div>
            <div className="space-y-2 text-sm divide-y">
              <div className="flex justify-between py-1"><span className="text-slate-500">Base Salary</span><span className="font-semibold">${selectedSlip.gross.toLocaleString()}</span></div>
              <div className="flex justify-between py-1"><span className="text-slate-500">Allowances</span><span className="text-emerald-600 font-semibold">+$800</span></div>
              <div className="flex justify-between py-1"><span className="text-slate-500">Tax & Deductions</span><span className="text-rose-600 font-semibold">-${(selectedSlip.gross - selectedSlip.net + 800).toLocaleString()}</span></div>
            </div>
            <div className="flex justify-between p-3 bg-purple-50 rounded-xl border border-purple-100">
              <span className="font-bold text-purple-900">Net Paid</span>
              <span className="font-extrabold text-lg text-purple-900">${selectedSlip.net.toLocaleString()}</span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 cursor-pointer flex items-center justify-center gap-1.5"><Download className="h-4 w-4" />Export PDF</Button>
              <Button onClick={() => setSelectedSlip(null)} className="flex-1 cursor-pointer">Close</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Run Payroll Confirm */}
      <ConfirmDialog
        isOpen={runConfirm}
        onClose={() => setRunConfirm(false)}
        onConfirm={handleRunPayroll}
        title="Confirm Payroll Run"
        description={`You are about to process payroll for ${runMonth}. This will generate payslips and initiate bank transfers for all eligible employees.`}
        confirmLabel="Process Payroll"
        variant="safe"
      />
    </div>
  );
}
