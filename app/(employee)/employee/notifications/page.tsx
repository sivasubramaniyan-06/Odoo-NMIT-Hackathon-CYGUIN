"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BellRing, ShieldAlert, Award, Clock, Coins, UserCircle } from "lucide-react";

const initialAlerts = [
  { id: "1", type: "LEAVE", title: "Sick Leave Application Approved", message: "Your 1-day sick leave request for Aug 25, 2026 has been approved by your supervisor Jane Cooper.", time: "Today at 09:30 AM", unread: true, icon: Clock },
  { id: "2", type: "PAYROLL", title: "Monthly Payslip Released", message: "Your digital salary statement for the July 2026 payroll run has been issued and processed.", time: "Yesterday at 04:15 PM", unread: false, icon: Coins },
  { id: "3", type: "TRAINING", title: "Assigned New Training Program", message: "You have been enrolled in the mandatory course 'Information Security Guidelines'. Please complete it by Aug 28.", time: "Aug 20 at 10:00 AM", unread: false, icon: Award },
];

export default function EmployeeNotificationsPage() {
  const [alerts, setAlerts] = useState(initialAlerts);

  const handleMarkAllRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, unread: false })));
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            My Notification Center
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review updates, request statuses, payroll releases, and training schedule changes.
          </p>
        </div>
        <div>
          {alerts.some((a) => a.unread) && (
            <Button onClick={handleMarkAllRead} variant="outline" className="text-xs h-9 cursor-pointer">
              <span>Mark all as read</span>
            </Button>
          )}
        </div>
      </div>

      {/* Notifications list */}
      <Card>
        <CardContent className="divide-y divide-slate-100 p-0">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div key={alert.id} className={`flex items-start gap-4 p-5 hover:bg-slate-50/50 transition-colors ${alert.unread ? "bg-purple-50/10" : ""}`}>
                <div className={`p-2 rounded-lg shrink-0 ${alert.unread ? "bg-purple-100 text-primary" : "bg-slate-100 text-slate-400"}`}>
                  <Icon className="h-5 w-5" />
                </div>
                
                <div className="flex-1 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                      <span>{alert.title}</span>
                      {alert.unread && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-semibold">{alert.time}</span>
                  </div>
                  <p className="text-slate-500 leading-relaxed text-xs">{alert.message}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
