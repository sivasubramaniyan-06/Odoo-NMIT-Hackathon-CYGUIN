import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({
  label,
  error,
  options,
  placeholder,
  className,
  id,
  ...props
}: SelectProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-slate-500 uppercase tracking-wide"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={inputId}
          className={cn(
            "flex h-10 w-full appearance-none rounded-lg border border-border bg-card px-3 py-2 pr-9 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-rose-400 focus:ring-rose-400",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" />
      </div>
      {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
    </div>
  );
}
