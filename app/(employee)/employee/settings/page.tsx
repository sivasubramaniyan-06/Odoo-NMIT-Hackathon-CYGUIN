"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Save, BellRing, Lock } from "lucide-react";

export default function EmployeeSettingsPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Portal Preferences
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Adjust your account security preferences, choose login credentials, and configure notifications.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Security / Password */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 pb-3">
            <Lock className="h-5 w-5 text-slate-400" />
            <div>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Secure your workspace with a new password.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              placeholder="••••••••"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <div className="flex justify-end pt-4 border-t">
              <Button className="flex items-center gap-2 cursor-pointer">
                <Save className="h-4 w-4" />
                <span>Save Password</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications toggler */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 pb-3">
            <BellRing className="h-5 w-5 text-slate-400" />
            <div>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Opt-in or out of corporate alert schedules.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3.5 text-xs">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <div>
                  <p className="font-bold text-slate-700">Leave Approvals & Comments</p>
                  <p className="text-slate-400 mt-0.5">Receive emails when your leave request is approved or denied.</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer border-t pt-3.5">
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <div>
                  <p className="font-bold text-slate-700">Payroll Statements</p>
                  <p className="text-slate-400 mt-0.5">Receive emails when a new payslip is generated and released.</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer border-t pt-3.5">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <div>
                  <p className="font-bold text-slate-700">Training Enrollment Updates</p>
                  <p className="text-slate-400 mt-0.5">Receive emails when assigned new learning paths.</p>
                </div>
              </label>
            </div>
            
            <div className="flex justify-end pt-4 border-t mt-4">
              <Button className="flex items-center gap-2 cursor-pointer">
                <Save className="h-4 w-4" />
                <span>Save Preferences</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
