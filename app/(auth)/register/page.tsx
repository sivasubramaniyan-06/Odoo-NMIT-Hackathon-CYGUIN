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
import { Building, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  workEmail: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 char"),
  companyName: z.string().min(2, "Company name is required"),
  employeeCount: z.string().min(1, "Please select company size"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      workEmail: "",
      password: "",
      companyName: "",
      employeeCount: "10-50",
    },
  });

  const nextStep = async () => {
    const valid = await trigger(["fullName", "workEmail", "password"]);
    if (valid) setStep(2);
  };

  const onSubmit = (data: RegisterFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/otp-verification?flow=register");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Column: Branding info */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-tr from-purple-950 via-indigo-900 to-purple-900 flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-md">
            <span className="font-bold text-lg text-white">HR</span>
          </div>
          <span className="text-xl font-bold tracking-tight">HRMS Enterprise</span>
        </div>

        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
            Launch Your HR Command Center.
          </h1>
          <p className="text-md text-purple-200/80 leading-relaxed">
            Configure custom leave types, set up role hierarchies, define payslip calculations, and onboard employees instantly.
          </p>
        </div>

        <div className="text-xs text-purple-300/60">
          &copy; 2026 HRMS Enterprise SaaS Inc. All rights reserved.
        </div>
      </div>

      {/* Right Column: Register form steps */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Register Company
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Step {step} of 2: {step === 1 ? "Administrator Details" : "Company Specifics"}
            </p>
          </div>

          <Card className="p-8 border-slate-200/60 shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {step === 1 ? (
                <>
                  <Input
                    label="Administrator Name"
                    placeholder="Jane Doe"
                    error={errors.fullName?.message}
                    {...register("fullName")}
                  />
                  <Input
                    label="Work Email"
                    type="email"
                    placeholder="jane.doe@company.com"
                    error={errors.workEmail?.message}
                    {...register("workEmail")}
                  />
                  <Input
                    label="Create Password"
                    type="password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    {...register("password")}
                  />

                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    <span>Continue to Company Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Input
                    label="Company Name"
                    placeholder="Acme Corp"
                    error={errors.companyName?.message}
                    {...register("companyName")}
                  />

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Organization Size
                    </label>
                    <select
                      className="flex h-10 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm"
                      {...register("employeeCount")}
                    >
                      <option value="1-10">1 - 10 employees</option>
                      <option value="10-50">10 - 50 employees</option>
                      <option value="50-250">50 - 250 employees</option>
                      <option value="250-1000">250 - 1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back</span>
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{isLoading ? "Creating..." : "Register"}</span>
                      {!isLoading && <ShieldCheck className="h-4 w-4" />}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </Card>

          <p className="text-center text-xs text-slate-500">
            Already have an organization?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
