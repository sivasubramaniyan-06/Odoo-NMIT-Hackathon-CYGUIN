"use client";

import React from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-border bg-slate-50 dark:bg-slate-900/60 p-1">
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`rounded-md p-1.5 transition-all cursor-pointer ${
          theme === "light"
            ? "bg-white dark:bg-slate-800 text-amber-500 shadow-xs"
            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        }`}
        title="Light Mode"
        aria-label="Use light theme"
      >
        <Sun className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`rounded-md p-1.5 transition-all cursor-pointer ${
          theme === "dark"
            ? "bg-white dark:bg-slate-800 text-purple-500 dark:text-purple-400 shadow-xs"
            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        }`}
        title="Dark Mode"
        aria-label="Use dark theme"
      >
        <Moon className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("system")}
        className={`rounded-md p-1.5 transition-all cursor-pointer ${
          theme === "system"
            ? "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-xs"
            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        }`}
        title="System Preference"
        aria-label="Use system preferred theme"
      >
        <Laptop className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
