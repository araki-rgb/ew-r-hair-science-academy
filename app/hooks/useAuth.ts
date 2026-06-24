"use client";

import { useCallback, useEffect, useState } from "react";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  orgId: string;
  orgName?: string;
  jobTitle?: string;
  salonName?: string;
};

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data = await res.json();
      setUser(data.user ?? null);
    } catch {
      setUser(null);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "ログイン失敗");
    await refresh();
    return data.user;
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  return { user, hydrated, login, logout, refresh, isLoggedIn: !!user };
}