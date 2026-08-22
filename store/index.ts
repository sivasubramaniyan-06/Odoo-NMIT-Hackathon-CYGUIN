import { create } from "zustand";

interface UIState {
  isSidebarOpen: boolean;
  theme: "light" | "dark";
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setTheme: (theme: "light" | "dark") => void;
}

// UI State Store
export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  theme: "light",
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  setTheme: (theme) => set({ theme }),
}));

interface AuthUserState {
  userId: string | null;
  role: "admin" | "employee" | null;
  email: string | null;
  setAuthUser: (user: { userId: string; role: "admin" | "employee"; email: string } | null) => void;
}

// Auth State Store
export const useAuthStore = create<AuthUserState>((set) => ({
  userId: null,
  role: null,
  email: null,
  setAuthUser: (user) =>
    set({
      userId: user?.userId ?? null,
      role: user?.role ?? null,
      email: user?.email ?? null,
    }),
}));
