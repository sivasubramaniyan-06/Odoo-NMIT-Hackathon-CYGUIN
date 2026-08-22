"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";

type ToastVariant = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toasts: Toast[];
  toast: (opts: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((opts: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...opts, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastViewport toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const variantConfig: Record<ToastVariant, { icon: React.ReactNode; classes: string }> = {
  success: {
    icon: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
    classes: "border-emerald-200 bg-white",
  },
  error: {
    icon: <XCircle className="h-4 w-4 text-rose-600" />,
    classes: "border-rose-200 bg-white",
  },
  warning: {
    icon: <AlertTriangle className="h-4 w-4 text-amber-600" />,
    classes: "border-amber-200 bg-white",
  },
  info: {
    icon: <Info className="h-4 w-4 text-sky-600" />,
    classes: "border-sky-200 bg-white",
  },
};

function ToastViewport({ toasts, dismiss }: { toasts: Toast[]; dismiss: (id: string) => void }) {
  return (
    <div
      className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-80"
      aria-live="polite"
    >
      {toasts.map((t) => {
        const cfg = variantConfig[t.variant];
        return (
          <div
            key={t.id}
            className={cn(
              "flex items-start gap-3 rounded-xl border p-4 shadow-lg transition-all duration-300 animate-in slide-in-from-right-4",
              cfg.classes
            )}
          >
            <span className="shrink-0 mt-0.5">{cfg.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800">{t.title}</p>
              {t.description && (
                <p className="text-xs text-slate-500 mt-0.5">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="shrink-0 rounded p-0.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
