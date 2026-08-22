"use client";

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";

function SafeSSRWrapper({ children, height }: { children: React.ReactNode; height: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div
        style={{ height }}
        className="w-full flex items-center justify-center text-xs text-muted-foreground bg-slate-50/50 rounded-lg border border-dashed animate-pulse"
      >
        Loading chart...
      </div>
    );
  }
  return <>{children}</>;
}

// ─── Area Chart ───────────────────────────────────────────────────────────────

interface AreaDef {
  key: string;
  color: string;
  label?: string;
}

interface AreaChartWrapperProps {
  data: Record<string, any>[];
  xKey?: string;       // new API (preferred)
  areas?: AreaDef[];   // new API (preferred)
  // legacy API
  dataKey?: string;
  strokeColor?: string;
  height?: number;
}

export function AreaChartWrapper({
  data,
  xKey = "name",
  areas,
  dataKey,
  strokeColor = "#6b21a8",
  height = 300,
}: AreaChartWrapperProps) {
  // Normalise to new API
  const resolvedAreas: AreaDef[] = areas ?? [
    { key: dataKey ?? "value", color: strokeColor },
  ];

  return (
    <SafeSSRWrapper height={height}>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {resolvedAreas.map((a) => (
                <linearGradient key={a.key} id={`grad-${a.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={a.color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={a.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey={xKey} stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dx={-5} />
            <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
            {resolvedAreas.map((a) => (
              <Area
                key={a.key}
                type="monotone"
                dataKey={a.key}
                name={a.label ?? a.key}
                stroke={a.color}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#grad-${a.key})`}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SafeSSRWrapper>
  );
}

// ─── Bar Chart ────────────────────────────────────────────────────────────────

interface BarDef {
  key: string;
  color: string;
  label?: string;
}

interface BarChartWrapperProps {
  data: Record<string, any>[];
  xKey?: string;       // new API
  bars?: BarDef[];     // new API
  // legacy API
  dataKeys?: string[];
  colors?: string[];
  height?: number;
}

export function BarChartWrapper({
  data,
  xKey = "name",
  bars,
  dataKeys,
  colors = ["#6b21a8", "#4338ca", "#a855f7"],
  height = 300,
}: BarChartWrapperProps) {
  const resolvedBars: BarDef[] = bars ?? (dataKeys ?? []).map((k, i) => ({
    key: k,
    color: colors[i % colors.length],
  }));

  return (
    <SafeSSRWrapper height={height}>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey={xKey} stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dx={-5} />
            <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
            {resolvedBars.length > 1 && (
              <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
            )}
            {resolvedBars.map((b) => (
              <Bar key={b.key} dataKey={b.key} name={b.label ?? b.key} fill={b.color} radius={[4, 4, 0, 0]} maxBarSize={40} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SafeSSRWrapper>
  );
}

// ─── Pie / Donut Chart ────────────────────────────────────────────────────────

interface PieChartWrapperProps {
  data: { name: string; value: number; color?: string }[];
  colors?: string[];
  height?: number;
  donut?: boolean;
}

export function PieChartWrapper({
  data,
  colors = ["#6b21a8", "#4338ca", "#a855f7", "#ec4899", "#f59e0b"],
  height = 300,
  donut = true,
}: PieChartWrapperProps) {
  return (
    <SafeSSRWrapper height={height}>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={donut ? 55 : 0}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color ?? colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
            <Legend verticalAlign="bottom" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </SafeSSRWrapper>
  );
}
