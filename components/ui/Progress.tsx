import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number; // 0–100
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

const sizeClasses = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

const variantClasses = {
  default: "bg-primary",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-rose-500",
};

export function Progress({
  value,
  max = 100,
  label,
  showValue = false,
  size = "md",
  variant = "default",
  className,
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("space-y-1.5", className)}>
      {(label || showValue) && (
        <div className="flex justify-between text-xs font-semibold text-slate-500">
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        className={cn("w-full rounded-full bg-slate-100 overflow-hidden", sizeClasses[size])}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemax={max}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500", variantClasses[variant])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
