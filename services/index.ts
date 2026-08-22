import { QueryClient } from "@tanstack/react-query";

// Base Query Client for the application
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Standard Query Keys Factory for TanStack Queries
export const QUERY_KEYS = {
  auth: ["auth"] as const,
  employees: ["employees"] as const,
  employeeDetail: (id: string) => ["employees", id] as const,
  attendance: ["attendance"] as const,
  leaves: ["leaves"] as const,
  payroll: ["payroll"] as const,
  performance: ["performance"] as const,
  assets: ["assets"] as const,
};

// Services client layer placeholder
export const ApiService = {
  get: async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network request failed");
    return res.json();
  },
  post: async (url: string, data: any) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Network request failed");
    return res.json();
  },
};
