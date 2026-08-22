"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, UserCircle2, ArrowRight, Building2, 
  Sparkles, CheckCircle, BarChart3, Clock, Users, Gift, ShieldAlert 
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">
      {/* Dynamic Animated Background Circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-12 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[80px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-indigo-500/10 blur-[100px] animate-bounce duration-[8000ms]" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md sticky top-0">
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

      {/* Main Hero & Portals Select */}
      <main className="flex-1 relative z-10">
        {/* Hero Banner Section */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center space-y-8">
          <div className="space-y-4 max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 dark:bg-purple-950/50 px-3 py-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300 border border-purple-200/40">
              <Sparkles className="h-3.5 w-3.5" /> AI-Ready Enterprise Suite
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-800 dark:text-white">
              Next-Gen Human Operations <br />
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Simplified & Synchronized
              </span>
            </h1>
            <p className="text-base sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Experience the power of real-time employee directories, automated payroll calculators, biometric calendar logs, and smart leave management workflows.
            </p>
          </div>

          {/* Centered Large Portals Select Buttons */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto pt-6">
            {/* HR Admin Portal Access */}
            <Link
              href="/login/admin"
              className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md hover:shadow-2xl hover:border-purple-500/50 hover:dark:border-purple-400/50 transition-all duration-300 text-center"
            >
              <div className="h-16 w-16 rounded-2xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <ShieldCheck className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">HR Admin Portal</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-[240px]">
                Oversee directories, approve leave requests, calculate payroll cycles, and track recruitment.
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-purple-600 dark:text-purple-400">
                <span>Continue as Admin</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Employee Portal Access */}
            <Link
              href="/login/employee"
              className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md hover:shadow-2xl hover:border-indigo-500/50 hover:dark:border-indigo-400/50 transition-all duration-300 text-center"
            >
              <div className="h-16 w-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <UserCircle2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Employee Portal</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-[240px]">
                Log attendance shifts, check salary slips, view tasks progress, and submit leaves.
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                <span>Continue as Employee</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

        {/* Highlight Feature Cards */}
        <section className="bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200/30 dark:border-slate-800/30 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-12">
              Everything you need to automate people operations
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="flex gap-4 items-start bg-white dark:bg-slate-900/40 border border-slate-200/45 dark:border-slate-800/50 p-5 rounded-2xl">
                <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/30 shrink-0 text-purple-600 dark:text-purple-400">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Interactive Analytics</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Instantly visualize attendance history, remaining leave days, and performance target completion with built-in clean Recharts.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 items-start bg-white dark:bg-slate-900/40 border border-slate-200/45 dark:border-slate-800/50 p-5 rounded-2xl">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 shrink-0 text-emerald-600 dark:text-emerald-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Real-Time Headcounts</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Watch employees check in or apply for leaves and observe direct, concurrent dashboard synchronization via web-sockets.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4 items-start bg-white dark:bg-slate-900/40 border border-slate-200/45 dark:border-slate-800/50 p-5 rounded-2xl">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 shrink-0 text-indigo-600 dark:text-indigo-400">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Unified DB Engine</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Synchronize organization structure, departments, assets logs, and payslips across Supabase cloud relational databases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-6 text-center border-t border-slate-200/50 dark:border-slate-800/50 text-xs text-slate-500 dark:text-slate-400 bg-white/40 dark:bg-slate-950/40">
        &copy; 2026 HRMS Enterprise SaaS Inc. Built for the Odoo Hackathon. All rights reserved.
      </footer>
    </div>
  );
}
