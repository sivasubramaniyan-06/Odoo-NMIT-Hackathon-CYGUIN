"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { Eye, EyeOff, ShieldCheck, Lock, Mail } from "lucide-react";

export function LoginForm({ role }: { role: "admin" | "employee" }) {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getFriendlyErrorMessage = (error: any): string => {
    const message = error.message || "";
    const status = error.status;

    if (message.includes("Invalid login credentials") || message.includes("Invalid credentials")) {
      return "Incorrect password or email address.";
    }
    if (message.includes("Email not confirmed")) {
      return "Email not verified. Please check your inbox.";
    }
    if (message.includes("Email structure") || message.includes("invalid email")) {
      return "Invalid email address format.";
    }
    if (message.includes("Network") || status === 0) {
      return "Network error. Please check your connection and try again.";
    }
    return message || "An unexpected error occurred.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);

    if (role === "admin") {
      // Admin Authentication with fixed credentials: admin / admin@123
      if (email.trim() === "admin" && password === "admin@123") {
        // Set local admin session cookie
        document.cookie = "sb-admin-token=admin-logged-in; path=/; max-age=86400; SameSite=Lax";
        
        toast({
          title: "Welcome Admin",
          description: "Login successful. Redirecting to Admin Dashboard...",
          variant: "success",
        });

        // Trigger reload/redirect to Admin Dashboard
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 500);
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid admin credentials.",
          variant: "error",
        });
        setLoading(false);
      }
      return;
    }

    try {
      const { data, error } = await login(email, password);

      if (error) {
        toast({
          title: "Authentication Failed",
          description: getFriendlyErrorMessage(error),
          variant: "error",
        });
      } else {
        toast({
          title: "Welcome Back!",
          description: "Login successful. Redirecting you to your workspace...",
          variant: "success",
        });

        // Determine redirect target
        const next = searchParams.get("next");
        if (next) {
          router.push(next);
        } else {
          router.push("/employee/dashboard");
        }
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: getFriendlyErrorMessage(err),
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border border-border/80 bg-card/60 backdrop-blur-md shadow-xl rounded-2xl p-6">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto h-12 w-12 rounded-xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center mb-3">
          <ShieldCheck className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl font-bold tracking-tight">
          {role === "admin" ? "Admin Portal" : "Employee Portal"}
        </CardTitle>
        <CardDescription className="text-xs mt-1">
          Secure Portal Access · Enter credentials to log in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              {role === "admin" ? "Username" : "Work Email"}
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <Input
                type={role === "admin" ? "text" : "email"}
                placeholder={role === "admin" ? "admin" : "name@company.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Password
              </label>
              {role === "employee" && (
                <button
                  type="button"
                  onClick={() => router.push(`/forgot-password?role=${role}`)}
                  className="text-[10px] font-semibold text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
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
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
