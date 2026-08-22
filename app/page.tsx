"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, UserCircle2, ArrowRight, Building2 } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Top Navbar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
            HRMS Enterprise
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Content Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Glowing decorative backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl w-full text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-950/50 px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300 border border-purple-200/40">
              ⚡ Secure Portal Access
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Simplify People Operations <br />
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                at Enterprise Scale
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              Welcome to the HRMS portal. Select your workspace role below to sign in and manage directories, attendance, leave, recruitment, and payroll.
            </p>
          </div>

          {/* Action Buttons Section */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto pt-4">
            {/* Admin Card */}
            <Link
              href="/login/admin"
              className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/60 backdrop-blur-md shadow-md hover:shadow-xl hover:border-purple-500/50 hover:dark:border-purple-400/50 transition-all duration-300 text-center"
            >
              <div className="h-14 w-14 rounded-xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="h-7 w-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">HR Admin</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-[200px]">
                Manage staff profiles, approvals, payroll, recruitment, and reports.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
                <span>Continue as Admin</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Employee Card */}
            <Link
              href="/login/employee"
              className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/60 backdrop-blur-md shadow-md hover:shadow-xl hover:border-indigo-500/50 hover:dark:border-indigo-400/50 transition-all duration-300 text-center"
            >
              <div className="h-14 w-14 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <UserCircle2 className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Employee Portal</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-[200px]">
                Clock-in shifts, submit time-off requests, view slips, and update records.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span>Continue as Employee</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 text-center border-t border-slate-200/50 dark:border-slate-800/50 text-xs text-slate-500 dark:text-slate-400 bg-white/40 dark:bg-slate-950/40">
        &copy; 2026 HRMS Enterprise SaaS Inc. All rights reserved.
      </footer>
    </div>
  );
}
