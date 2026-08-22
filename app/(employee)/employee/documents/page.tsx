"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FileText, Download, FilePlus, Search } from "lucide-react";

const initialDocs = [
  { id: "DOC-01", name: "Employment Contract Agreement.pdf", type: "Contract", signedDate: "Mar 01, 2024", size: "2.4 MB" },
  { id: "DOC-02", name: "W-4 Employee Tax Withholding.pdf", type: "Tax Form", signedDate: "Mar 02, 2024", size: "1.1 MB" },
  { id: "DOC-03", name: "Employee Handbook Acknowledgement.pdf", type: "Compliance", signedDate: "Aug 10, 2026", size: "480 KB" },
];

export default function EmployeeDocumentsPage() {
  const [docs] = useState(initialDocs);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            My Document Vault
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Access secure digital copies of your signed employment agreements, onboarding tax forms, and policy handbooks.
          </p>
        </div>
        <div>
          <Button className="flex items-center gap-2 cursor-pointer">
            <FilePlus className="h-4 w-4" />
            <span>Upload Document</span>
          </Button>
        </div>
      </div>

      {/* Roster list */}
      <Card>
        <CardHeader>
          <CardTitle>Signed Document Registry</CardTitle>
          <CardDescription>All documents are secured with standard encryption.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-border text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
                  <th className="p-4">Document ID</th>
                  <th className="p-4">File Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Signed Date</th>
                  <th className="p-4">File Size</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {docs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/40">
                    <td className="p-4 font-mono text-xs font-bold text-slate-500">{doc.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <FileText className="h-4.5 w-4.5 text-primary shrink-0" />
                        <span className="font-semibold text-slate-700">{doc.name}</span>
                      </div>
                    </td>
                    <td className="p-4"><Badge variant="secondary">{doc.type}</Badge></td>
                    <td className="p-4 text-slate-500 text-xs">{doc.signedDate}</td>
                    <td className="p-4 text-slate-400 text-xs font-medium">{doc.size}</td>
                    <td className="p-4 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-lg cursor-pointer"
                        aria-label="Download document"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
