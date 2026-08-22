"use client";

import React, { useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

function OtpVerificationInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const flow = searchParams.get("flow") || "reset";
  
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setCode(code.map((d, idx) => (idx === index ? element.value : d)));

    // Focus next input box
    if (element.value !== "" && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedText)) return;

    const newCode = [...code];
    for (let i = 0; i < pastedText.length; i++) {
      newCode[i] = pastedText[i] || "";
    }
    setCode(newCode);
    const lastFilledIndex = Math.min(pastedText.length, 5);
    inputsRef.current[lastFilledIndex]?.focus();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const joinedCode = code.join("");
    if (joinedCode.length < 6) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (flow === "register") {
        setIsSuccess(true);
      } else {
        router.push("/reset-password");
      }
    }, 1200);
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md p-8 border-slate-200/60 shadow-lg text-center space-y-6 bg-card text-foreground">
        <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Registration Complete!</h2>
          <p className="text-sm text-slate-500">
            Your company has been verified and registered. You can now log into your administrator control center.
          </p>
        </div>
        <Button onClick={() => router.push("/login")} className="w-full flex items-center justify-center gap-2 cursor-pointer">
          <span>Continue to Sign In</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Enter Verification Code
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          We sent a 6-digit verification code to your email.
        </p>
      </div>

      <Card className="p-8 border-slate-200/60 shadow-lg">
        <form onSubmit={handleVerify} className="space-y-6">
          {/* 6 digits input boxes */}
          <div className="flex justify-between gap-2">
            {code.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => { inputsRef.current[index] = el; }}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-12 rounded-lg border border-border text-center text-lg font-bold bg-card text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
              />
            ))}
          </div>

          <Button
            type="submit"
            disabled={code.join("").length < 6 || isLoading}
            className="w-full flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isLoading ? "Verifying..." : "Verify Code"}</span>
            {!isLoading && <ShieldCheck className="h-4 w-4" />}
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Did not receive code?{" "}
          <button className="font-semibold text-primary hover:underline cursor-pointer">
            Resend Code
          </button>
        </div>
      </Card>
    </div>
  );
}

export default function OtpVerificationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <Suspense fallback={
        <div className="text-xs text-muted-foreground bg-slate-50/50 p-8 rounded-lg border border-dashed animate-pulse">
          Loading verification gateway...
        </div>
      }>
        <OtpVerificationInner />
      </Suspense>
    </div>
  );
}
