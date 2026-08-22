"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/src/lib/supabase/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { Select } from "@/components/ui/Select";
import { User, Mail, Lock, Phone, Building, ArrowLeft, Camera } from "lucide-react";

export default function EmployeeSignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("Engineering");
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword || !phone) {
      toast({ title: "Validation Error", description: "Please fill in all fields", variant: "error" });
      return;
    }

    if (password !== confirmPassword) {
      toast({ title: "Validation Error", description: "Passwords do not match", variant: "error" });
      return;
    }

    setLoading(true);

    try {
      // 1. Sign up user using Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: "employee",
            phone,
            department,
            avatar_url: photoPreview,
          },
        },
      });

      if (authError) {
        toast({ title: "Registration Failed", description: authError.message, variant: "error" });
        setLoading(false);
        return;
      }

      // 2. Insert profile record into the database employees directory
      const employeePayload = {
        name: fullName,
        email: email,
        phone: phone,
        dept: department,
        role: "Associate",
        status: "ACTIVE"
      };

      const res = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeePayload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.warn("Could not insert employee profile record:", errorData.error);
        // Continue anyway since Auth account was created successfully
      }

      toast({
        title: "Account Created Successfully",
        description: "Your employee account has been created. Please sign in.",
        variant: "success",
      });

      // Redirect to employee login
      router.push("/login/employee");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "An unexpected error occurred during signup",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

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
            Self Onboarding
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
            Join the Organization.
          </h1>
          <p className="text-md text-purple-200/80 leading-relaxed">
            Create your profile credentials to access your timesheet records, register leaves, review payroll components, and view project tasks.
          </p>
        </div>

        <div className="text-xs text-purple-300/60">
          &copy; 2026 HRMS Enterprise SaaS Inc. All rights reserved.
        </div>
      </div>

      {/* Right Column: SignUp form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950 overflow-y-auto">
        <div className="w-full max-w-md space-y-6 flex flex-col items-center py-8">
          <div className="w-full">
            <Link
              href="/login/employee"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>

          <div className="text-center w-full">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              Create Employee Account
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Onboard yourself to access the platform
            </p>
          </div>

          <Card className="w-full border border-border/80 bg-card/60 backdrop-blur-md shadow-xl rounded-2xl p-6">
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Profile Photo Uploader */}
                <div className="flex flex-col items-center justify-center space-y-2 pb-2">
                  <div className="relative group">
                    <div className="h-20 w-20 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
                      ) : (
                        <Camera className="h-6 w-6 text-slate-400" />
                      )}
                    </div>
                    <label className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-white text-[10px] font-bold">
                      Upload
                      <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                    </label>
                  </div>
                  <span className="text-[10px] text-slate-400">Profile Photo (Optional)</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Jane Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Department
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 z-10" />
                    <Select
                      options={[
                        { value: "Engineering", label: "Engineering" },
                        { value: "Design", label: "Design" },
                        { value: "Sales", label: "Sales" },
                        { value: "Marketing", label: "Marketing" },
                        { value: "Finance", label: "Finance" },
                        { value: "HR", label: "Human Resources" },
                      ]}
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Confirm
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full mt-2 cursor-pointer flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    "Register Profile"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
