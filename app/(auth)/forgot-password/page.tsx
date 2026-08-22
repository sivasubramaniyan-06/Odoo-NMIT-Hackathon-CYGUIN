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
import { Mail, ArrowLeft, Send } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/otp-verification?flow=reset");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Enter your work email address to receive an OTP code.
          </p>
        </div>

        <Card className="p-8 border-slate-200/60 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Work Email Address"
              type="email"
              placeholder="name@company.com"
              error={errors.email?.message}
              {...register("email")}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <span>{isLoading ? "Sending..." : "Send Verification Code"}</span>
              {!isLoading && <Send className="h-4 w-4" />}
            </Button>
          </form>
        </Card>

        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
