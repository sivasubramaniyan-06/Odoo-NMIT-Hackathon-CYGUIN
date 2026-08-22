"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Save, User, ShieldAlert, History } from "lucide-react";

export default function AdminProfilePage() {
  const [name, setName] = useState("Alex Rivera");
  const [email, setEmail] = useState("alex.rivera@company.com");
  const [phone, setPhone] = useState("+1 555-0199");
  const [role, setRole] = useState("HR Director");

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          HR Administrator Profile
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your administrative profile settings, contact info, and view system activity audit logs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card Summary */}
        <Card className="md:col-span-1 flex flex-col items-center text-center p-6 space-y-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-3xl font-extrabold shadow-md border-4 border-white">
            AR
          </div>
          <div>
            <h3 className="font-bold text-slate-800">{name}</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">{role}</p>
            <Badge variant="default" className="mt-3 text-[9px] uppercase tracking-wider">
              Super Admin
            </Badge>
          </div>
          <div className="w-full border-t border-slate-100 pt-4 text-xs text-left space-y-2 text-slate-500">
            <p className="flex justify-between"><span>User ID:</span> <span className="font-bold">USR-9481</span></p>
            <p className="flex justify-between"><span>Location:</span> <span className="font-bold">San Francisco, CA</span></p>
            <p className="flex justify-between"><span>Status:</span> <span className="text-emerald-600 font-bold">Active</span></p>
          </div>
        </Card>

        {/* Profile edit forms */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>Keep your contact details up to date for official system emails.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Job Designation"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Work Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Mobile Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            
            <div className="flex justify-end pt-4 border-t">
              <Button className="flex items-center gap-2 cursor-pointer">
                <Save className="h-4 w-4" />
                <span>Save Profile Changes</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit History Logs */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 pb-3">
          <History className="h-5 w-5 text-slate-400" />
          <div>
            <CardTitle>Security Audit History</CardTitle>
            <CardDescription>Track recent logins and administrator actions performed in this session.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between items-start border-b pb-2.5">
              <div>
                <p className="font-semibold text-slate-700">Company registration details modified</p>
                <p className="text-slate-400 mt-0.5">IP: 192.168.1.18 • OS: macOS Chrome</p>
              </div>
              <span className="text-slate-400 font-medium">Today at 10:48 AM</span>
            </div>
            <div className="flex justify-between items-start border-b pb-2.5">
              <div>
                <p className="font-semibold text-slate-700">Onboarded new employee (Ronald Richards)</p>
                <p className="text-slate-400 mt-0.5">IP: 192.168.1.18 • OS: macOS Chrome</p>
              </div>
              <span className="text-slate-400 font-medium">Aug 22 at 09:20 AM</span>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-slate-700">Administrator session initiated (Login success)</p>
                <p className="text-slate-400 mt-0.5">IP: 192.168.1.18 • OS: macOS Chrome</p>
              </div>
              <span className="text-slate-400 font-medium">Aug 22 at 08:30 AM</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
