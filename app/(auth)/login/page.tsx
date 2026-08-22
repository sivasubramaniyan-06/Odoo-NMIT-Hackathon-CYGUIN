"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useAuthStore } from "@/store";
import { ShieldCheck, UserCircle2, ArrowRight } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { setAuthUser } = useAuthStore();
  const [role, setRole] = useState<"admin" | "employee">("admin");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      setAuthUser({
        userId: role === "admin" ? "admin-123" : "emp-555",
        role: role,
        email: data.email,
      });
      setIsLoading(false);
      router.push(role === "admin" ? "/admin/dashboard" : "/employee/dashboard");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Column: Branding banner (hidden on mobile) */}
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
            Simplify People Operations at Scale.
          </h1>
          <p className="text-md text-purple-200/80 leading-relaxed">
            Manage employee directories, clock-in tracking, leave requests, recruitment pipelines, and payroll processing in one unified enterprise portal.
          </p>
        </div>

        <div className="text-xs text-purple-300/60">
          &copy; 2026 HRMS Enterprise SaaS Inc. All rights reserved.
        </div>
      </div>

      {/* Right Column: Interactive Login forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Access your workspace portal below.
            </p>
          </div>

          <Card className="p-8 border-slate-200/60 shadow-lg">
            {/* Tab controls */}
            <div className="flex rounded-lg bg-slate-100 p-1 mb-6">
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  role === "admin"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                <span>HR Admin</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("employee")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  role === "employee"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <UserCircle2 className="h-4 w-4" />
                <span>Employee</span>
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Work Email"
                type="email"
                placeholder="name@company.com"
                error={errors.email?.message}
                {...register("email")}
              />

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Password
                  </label>
                  <Link
                    href={`/forgot-password?role=${role}`}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Forgot?
                  </Link>
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  error={errors.password?.message}
                  {...register("password")}
                />
              </div>

              <Button
                type="submit"
                variant={role === "admin" ? "default" : "secondary"}
                className="w-full flex justify-center items-center gap-2 mt-2"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : `Sign in as ${role === "admin" ? "Admin" : "Employee"}`}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>
          </Card>

          {role === "admin" && (
            <p className="text-center text-xs text-slate-500">
              Need to set up your organization?{" "}
              <Link href="/register" className="font-semibold text-primary hover:underline">
                Register Company
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
