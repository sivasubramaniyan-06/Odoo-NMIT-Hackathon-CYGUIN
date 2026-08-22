"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { StatCard } from "@/components/ui/StatCard";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { CreditCard, Download, Eye, TrendingUp, Receipt, DollarSign } from "lucide-react";

const TABS = [
  { label: "Overview", value: "overview" },
  { label: "Payslips", value: "payslips" },
];

const payslips = [
  { id: "PAY-904", month: "August 2026", gross: 9166, net: 7790, tax: 1376, status: "Available" },
  { id: "PAY-903", month: "July 2026", gross: 9166, net: 7790, tax: 1376, status: "Available" },
  { id: "PAY-902", month: "June 2026", gross: 9166, net: 7790, tax: 1376, status: "Available" },
  { id: "PAY-901", month: "May 2026", gross: 9166, net: 7790, tax: 1376, status: "Available" },
  { id: "PAY-900", month: "April 2026", gross: 9166, net: 7790, tax: 1376, status: "Available" },
  { id: "PAY-899", month: "March 2026", gross: 9166, net: 7790, tax: 1376, status: "Available" },
];

export default function EmployeePayrollPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState("overview");
  const [viewSlip, setViewSlip] = useState<typeof payslips[0] | null>(null);

  const ytdGross = payslips.reduce((s, p) => s + p.gross, 0);
  const ytdNet = payslips.reduce((s, p) => s + p.net, 0);
  const ytdTax = payslips.reduce((s, p) => s + p.tax, 0);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">My Payslips</h1>
          <p className="text-xs text-slate-500 mt-1">View your salary statements, tax summary, and YTD earnings</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Monthly Gross" value="$9,166" icon={CreditCard} iconBg="bg-purple-50" iconColor="text-primary" />
        <StatCard title="Monthly Net" value="$7,790" icon={DollarSign} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard title="YTD Gross" value={`$${ytdGross.toLocaleString()}`} icon={TrendingUp} iconBg="bg-sky-50" iconColor="text-sky-600" />
        <StatCard title="YTD Tax Paid" value={`$${ytdTax.toLocaleString()}`} icon={Receipt} iconBg="bg-amber-50" iconColor="text-amber-600" />
      </div>

      <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />

      {tab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Compensation Breakdown — August 2026</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { label: "Base Salary", amount: 9166, type: "earning" },
                  { label: "Housing Allowance", amount: 500, type: "earning" },
                  { label: "Transport Allowance", amount: 150, type: "earning" },
                  { label: "Federal Income Tax", amount: -980, type: "deduction" },
                  { label: "Social Security", amount: -236, type: "deduction" },
                  { label: "Health Insurance", amount: -160, type: "deduction" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0">
                    <span className="text-slate-600">{item.label}</span>
                    <span className={`font-semibold ${item.type === "deduction" ? "text-rose-600" : "text-slate-800"}`}>
                      {item.amount < 0 ? "-" : "+"}${Math.abs(item.amount).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
                <span className="font-bold text-slate-800">Net Salary</span>
                <span className="font-extrabold text-xl text-primary">$7,790</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Year-to-Date Summary</CardTitle><CardDescription>January 2026 — Present</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Gross Earnings", value: `$${ytdGross.toLocaleString()}`, color: "text-slate-800" },
                { label: "Total Deductions", value: `$${ytdTax.toLocaleString()}`, color: "text-rose-600" },
                { label: "Net Paid", value: `$${ytdNet.toLocaleString()}`, color: "text-primary" },
                { label: "Months Paid", value: `${payslips.length} of 12`, color: "text-slate-600" },
              ].map((r) => (
                <div key={r.label} className="flex justify-between py-2 border-b border-slate-50 last:border-0">
                  <span className="text-sm text-slate-500">{r.label}</span>
                  <span className={`font-bold text-sm ${r.color}`}>{r.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "payslips" && (
        <Card>
          <CardHeader><CardTitle>Payslip History</CardTitle><CardDescription>All your monthly salary statements</CardDescription></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-border text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="p-4 text-left">Month</th>
                    <th className="p-4 text-right">Gross</th>
                    <th className="p-4 text-right">Tax</th>
                    <th className="p-4 text-right">Net Paid</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {payslips.map((slip) => (
                    <tr key={slip.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4">
                        <p className="font-semibold text-slate-800 text-xs">{slip.month}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{slip.id}</p>
                      </td>
                      <td className="p-4 text-right text-xs text-slate-500">${slip.gross.toLocaleString()}</td>
                      <td className="p-4 text-right text-xs text-rose-500">-${slip.tax.toLocaleString()}</td>
                      <td className="p-4 text-right text-xs font-bold text-slate-800">${slip.net.toLocaleString()}</td>
                      <td className="p-4"><Badge variant="success">{slip.status}</Badge></td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => setViewSlip(slip)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer" aria-label="View"><Eye className="h-3.5 w-3.5" /></button>
                          <button onClick={() => toast({ title: `Downloading ${slip.month} payslip`, variant: "info" })} className="p-1.5 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 cursor-pointer" aria-label="Download"><Download className="h-3.5 w-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payslip Viewer Modal */}
      <Modal isOpen={viewSlip !== null} onClose={() => setViewSlip(null)} title="Salary Statement">
        {viewSlip && (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-white">
              <p className="text-xs font-semibold opacity-80">Payslip ID: {viewSlip.id}</p>
              <h2 className="text-lg font-extrabold mt-0.5">{viewSlip.month}</h2>
              <p className="text-xs opacity-80 mt-1">Alex Rivera · Senior UI Designer · Design</p>
            </div>
            <div className="space-y-2 text-sm divide-y">
              <div className="flex justify-between py-2"><span className="text-slate-500">Base Salary</span><span className="font-semibold">$9,166</span></div>
              <div className="flex justify-between py-2"><span className="text-slate-500">Allowances</span><span className="font-semibold text-emerald-600">+$650</span></div>
              <div className="flex justify-between py-2"><span className="text-slate-500">Tax Deductions</span><span className="font-semibold text-rose-600">-${viewSlip.tax.toLocaleString()}</span></div>
            </div>
            <div className="flex justify-between p-4 bg-purple-50 rounded-xl border border-purple-100">
              <span className="font-bold text-purple-900">Net Salary</span>
              <span className="font-extrabold text-xl text-purple-900">${viewSlip.net.toLocaleString()}</span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 cursor-pointer flex items-center justify-center gap-1.5" onClick={() => toast({ title: "PDF downloaded", variant: "success" })}>
                <Download className="h-4 w-4" />Download PDF
              </Button>
              <Button onClick={() => setViewSlip(null)} className="flex-1 cursor-pointer">Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
