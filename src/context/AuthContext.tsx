"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { User, Session, AuthResponse } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkAdminSession = () => {
      if (typeof window !== "undefined") {
        const cookies = document.cookie.split(";").map(c => c.trim());
        const adminCookie = cookies.find(c => c.startsWith("sb-admin-token="));
        if (adminCookie && adminCookie.split("=")[1] === "admin-logged-in") {
          const mockAdminUser: any = {
            id: "admin-123",
            email: "admin@company.com",
            user_metadata: {
              full_name: "HR Administrator",
              role: "admin"
            }
          };
          setUser(mockAdminUser);
          setSession({
            access_token: "admin-token",
            token_type: "bearer",
            expires_in: 3600,
            refresh_token: "admin-refresh",
            user: mockAdminUser
          });
          setLoading(false);
          return true;
        }
      }
      return false;
    };

    if (checkAdminSession()) {
      return;
    }

    const getInitialSession = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
      } catch (err) {
        console.error("Error getting session:", err);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        // If we have an active admin session, do not override with null from Supabase
        if (checkAdminSession()) return;
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (typeof window !== "undefined") {
        document.cookie = "sb-admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      }
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setSession(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
