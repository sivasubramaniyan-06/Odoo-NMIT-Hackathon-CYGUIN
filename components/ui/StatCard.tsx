import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number; // percentage, positive = up, negative = down
    label?: string;
  };
  iconColor?: string;
  iconBg?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  iconColor = "text-primary",
  iconBg = "bg-purple-50",
  className,
}: StatCardProps) {
  const trendIcon =
    trend && trend.value > 0 ? TrendingUp : trend && trend.value < 0 ? TrendingDown : Minus;
  const TrendIcon = trendIcon;
  const trendColor =
    trend?.value === undefined || trend.value === 0
      ? "text-slate-400"
      : trend.value > 0
      ? "text-emerald-600"
      : "text-rose-600";

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-200",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn("rounded-xl p-3", iconBg)}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
        {trend && (
          <div className={cn("flex items-center gap-1 text-xs font-semibold", trendColor)}>
            <TrendIcon className="h-3.5 w-3.5" />
            <span>
              {trend.value > 0 ? "+" : ""}
              {trend.value}%
            </span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
        <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
          {title}
        </p>
        {subtitle && (
          <p className="text-[10px] text-slate-400 mt-1">{subtitle}</p>
        )}
        {trend?.label && (
          <p className={cn("text-[10px] font-semibold mt-1", trendColor)}>{trend.label}</p>
        )}
      </div>
    </div>
  );
}
