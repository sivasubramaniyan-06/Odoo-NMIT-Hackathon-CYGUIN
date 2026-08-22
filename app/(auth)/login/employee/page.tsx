"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export default function EmployeeLoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Column: Branding banner */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-tr from-purple-950 via-indigo-900 to-purple-900 flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-md">
            <span className="font-bold text-lg text-white">HR</span>
          </div>
          <span className="text-xl font-bold tracking-tight">HRMS Enterprise</span>
        </div>

        <div className="max-w-md space-y-6">
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-purple-200 backdrop-blur-md">
            Version 4.2 Release
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
            Employee Workspace.
          </h1>
          <p className="text-md text-purple-200/80 leading-relaxed">
            Submit expense reimbursements, view your monthly payslips, manage your tasks, log attendance hours, and request leaves in your dedicated employee portal.
          </p>
        </div>

        <div className="text-xs text-purple-300/60">
          &copy; 2026 HRMS Enterprise SaaS Inc. All rights reserved.
        </div>
      </div>

      {/* Right Column: Employee Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md space-y-8 flex flex-col items-center">
          <div className="text-center w-full">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              Employee Sign In
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Access your personal workspace portal
            </p>
          </div>

          <Suspense fallback={
            <div className="w-full max-w-md h-80 rounded-2xl bg-card border border-border flex items-center justify-center animate-pulse">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          }>
            <LoginForm role="employee" />
          </Suspense>

          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-xs text-slate-500 dark:text-slate-400">
              New Employee?{" "}
              <Link href="/signup/employee" className="font-semibold text-primary hover:underline">
                Create Account
              </Link>
            </p>
            <Link href="/" className="text-xs font-semibold text-slate-400 hover:text-slate-600 hover:underline">
              Back to Role Selection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
