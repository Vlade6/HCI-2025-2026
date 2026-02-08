"use client";

import { useEffect, useState } from "react";

export type AuthUser = { id: number; username: string; email: string } | null;

export function useAuth() {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();
      setUser(data.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await refresh();
  };

  useEffect(() => {
    refresh();
  }, []);

  return { user, loading, refresh, logout };
}
