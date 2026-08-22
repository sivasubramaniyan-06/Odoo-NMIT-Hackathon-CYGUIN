"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Save, User, Landmark, PhoneCall } from "lucide-react";

export default function EmployeeProfilePage() {
  const [name, setName] = useState("Alex Rivera");
  const [email, setEmail] = useState("alex.rivera@company.com");
  const [phone, setPhone] = useState("+1 555-0122");
  
  // Bank details state stubs
  const [bank, setBank] = useState("Silicon Valley Bank");
  const [routing, setRouting] = useState("021000021");
  const [account, setAccount] = useState("******4819");

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          My Employee Dossier
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Inspect your corporate records, manage personal contacts, and review bank details.
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
            <p className="text-xs text-slate-400 font-medium mt-0.5">Senior UI Designer</p>
            <Badge variant="success" className="mt-3 text-[9px] uppercase tracking-wider">
              Active Member
            </Badge>
          </div>
          <div className="w-full border-t border-slate-100 pt-4 text-xs text-left space-y-2 text-slate-500">
            <p className="flex justify-between"><span>Employee ID:</span> <span className="font-bold">EMP-902</span></p>
            <p className="flex justify-between"><span>Department:</span> <span className="font-bold">Product Design</span></p>
            <p className="flex justify-between"><span>Joining Date:</span> <span className="font-bold">2024-03-01</span></p>
          </div>
        </Card>

        {/* Profile Details Edit forms */}
        <div className="md:col-span-2 space-y-6">
          {/* Personal Info */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-3">
              <User className="h-5 w-5 text-slate-400" />
              <div>
                <CardTitle>Personal Details</CardTitle>
                <CardDescription>Adjust your primary contact settings below.</CardDescription>
              </div>
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
                  label="Work Email Address"
                  type="email"
                  value={email}
                  disabled
                />
              </div>
              <Input
                label="Mobile Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <div className="flex justify-end pt-4 border-t">
                <Button className="flex items-center gap-2 cursor-pointer">
                  <Save className="h-4 w-4" />
                  <span>Save Personal Details</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bank/Deposit Info */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-3">
              <Landmark className="h-5 w-5 text-slate-400" />
              <div>
                <CardTitle>Direct Deposit Settings</CardTitle>
                <CardDescription>Specify your bank account for monthly salary disbursements.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Bank Name"
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  required
                />
                <Input
                  label="Routing Transit Number (9 digits)"
                  value={routing}
                  onChange={(e) => setRouting(e.target.value)}
                  required
                />
              </div>
              <Input
                label="Account Number"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                required
              />
              <div className="flex justify-end pt-4 border-t">
                <Button className="flex items-center gap-2 cursor-pointer">
                  <Save className="h-4 w-4" />
                  <span>Update Account</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
