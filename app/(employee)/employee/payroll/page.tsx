"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  Coins,
  Receipt,
  FileSpreadsheet,
  Download,
  Eye,
  Building,
} from "lucide-react";

// Mock personal payslips list
const payslipHistory = [
  { id: "PAY-904", month: "July 2026", gross: 9166, allowances: 800, deductions: 650, net: 9316, status: "PAID", date: "2026-07-31" },
  { id: "PAY-903", month: "June 2026", gross: 9166, allowances: 800, deductions: 650, net: 9316, status: "PAID", date: "2026-06-30" },
  { id: "PAY-902", month: "May 2026", gross: 9166, allowances: 500, deductions: 600, net: 9066, status: "PAID", date: "2026-05-31" },
  { id: "PAY-901", month: "April 2026", gross: 9166, allowances: 500, deductions: 600, net: 9066, status: "PAID", date: "2026-04-30" },
];

export default function EmployeePayrollPage() {
  const [selectedPayslip, setSelectedPayslip] = useState<typeof payslipHistory[0] | null>(null);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          My Payroll Center
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Access your monthly digital salary receipts, tax summaries, and payroll ledgers.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-primary rounded-xl">
            <Coins className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gross Monthly</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">$9,166</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Base rate contract salary</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Receipt className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Taxes & Deductions</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">$650</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">FICA, healthcare, retirement</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <FileSpreadsheet className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Net Paid (July)</p>
            <h3 className="text-2xl font-bold text-slate-950 mt-1">$9,316</h3>
            <p className="text-[10px] text-emerald-600 font-semibold mt-1">Direct deposit on Jul 31</p>
          </div>
        </Card>
      </div>

      {/* Payslip History Card */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Slips Repository</CardTitle>
          <CardDescription>Archive list of all disbursed salary records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-border text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
                  <th className="p-4">Payslip ID</th>
                  <th className="p-4">Month Cycle</th>
                  <th className="p-4">Gross Income</th>
                  <th className="p-4">Deductions</th>
                  <th className="p-4">Net Received</th>
                  <th className="p-4">Payment Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payslipHistory.map((slip) => (
                  <tr key={slip.id} className="hover:bg-slate-50/40">
                    <td className="p-4 font-mono text-xs font-bold text-slate-500">{slip.id}</td>
                    <td className="p-4 font-semibold text-slate-700">{slip.month}</td>
                    <td className="p-4 text-slate-500 text-xs">${slip.gross.toLocaleString()}</td>
                    <td className="p-4 text-rose-600 text-xs font-semibold">-${slip.deductions.toLocaleString()}</td>
                    <td className="p-4 text-slate-800 font-bold">${slip.net.toLocaleString()}</td>
                    <td className="p-4 text-slate-500 text-xs">{slip.date}</td>
                    <td className="p-4 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedPayslip(slip)}
                        className="h-8 px-2 hover:bg-slate-100 text-slate-600 rounded-lg cursor-pointer"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Digital Payslip Viewer Modal */}
      <Modal isOpen={selectedPayslip !== null} onClose={() => setSelectedPayslip(null)} title="Salary Statement Details">
        {selectedPayslip && (
          <div className="space-y-6">
            {/* Payslip Header info */}
            <div className="border-b pb-4 text-xs space-y-1">
              <div className="flex justify-between font-bold text-sm text-slate-800">
                <div className="flex items-center gap-1.5">
                  <Building className="h-4 w-4 text-slate-400" />
                  <span>Acme Global Industries</span>
                </div>
                <span>{selectedPayslip.month}</span>
              </div>
              <p className="text-slate-400">Statement ID: {selectedPayslip.id} • Date: {selectedPayslip.date}</p>
            </div>

            {/* General employee block */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <p className="text-slate-400 font-semibold uppercase tracking-wide">Employee</p>
                <p className="font-bold text-slate-800">Alex Rivera</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase tracking-wide">Job Position</p>
                <p className="font-bold text-slate-800">Senior UI Designer</p>
              </div>
            </div>

            {/* Detailed calculations table */}
            <div className="space-y-2.5 text-xs">
              <h4 className="font-bold text-slate-800">Earnings & Deductions Summary</h4>
              
              <div className="space-y-2 divide-y border-t border-b py-2">
                <div className="flex justify-between pt-1">
                  <span className="text-slate-600">Base Wage Earnings</span>
                  <span className="font-semibold text-slate-800">${selectedPayslip.gross.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-600">Allowances & Reimbursements</span>
                  <span className="font-semibold text-emerald-600">+${selectedPayslip.allowances.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-600">Statutory Tax & Insurance Deductions</span>
                  <span className="font-semibold text-rose-600">-${selectedPayslip.deductions.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center bg-purple-50 p-3 rounded-xl border border-purple-100">
                <span className="font-bold text-purple-950">Net Payout Received</span>
                <span className="text-lg font-extrabold text-purple-950">${selectedPayslip.net.toLocaleString()}</span>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-between pt-4 border-t gap-3">
              <Button variant="outline" className="flex-1 flex items-center justify-center gap-1.5 cursor-pointer">
                <Download className="h-4 w-4" />
                <span>Export PDF</span>
              </Button>
              <Button onClick={() => setSelectedPayslip(null)} className="flex-1">
                Close Statement
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
