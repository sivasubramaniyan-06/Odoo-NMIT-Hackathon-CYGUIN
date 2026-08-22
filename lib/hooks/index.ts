"use client";

import { useState, useEffect } from "react";

// Placeholder custom hook for fetching authentication status
export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Stub auth subscription
    setLoading(false);
  }, []);

  return { user, loading, isAuthenticated: !!user };
}

// Helper hook for responsive layout logic
export function useResponsive() {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    width,
  };
}
