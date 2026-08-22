import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, Inbox, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: "default" | "search" | "error";
  className?: string;
}

export function EmptyState({
  icon: IconProp,
  title,
  description,
  action,
  variant = "default",
  className,
}: EmptyStateProps) {
  const DefaultIcon = variant === "search" ? Search : variant === "error" ? AlertCircle : Inbox;
  const Icon = IconProp ?? DefaultIcon;

  const iconColors: Record<string, string> = {
    default: "bg-slate-100 text-slate-400",
    search: "bg-purple-50 text-primary",
    error: "bg-rose-50 text-rose-500",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6 text-center", className)}>
      <div className={cn("mb-4 rounded-2xl p-4", iconColors[variant])}>
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-sm font-bold text-slate-700 mb-1">{title}</h3>
      {description && (
        <p className="text-xs text-slate-400 max-w-xs leading-relaxed">{description}</p>
      )}
      {action && (
        <Button
          onClick={action.onClick}
          className="mt-5"
          size="sm"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
