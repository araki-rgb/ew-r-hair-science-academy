"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";
import { getUserRole, unlockAdmin, type UserRole } from "@/lib/storage/role-store";

type Props = {
  children: React.ReactNode;
};

const SERVER_ADMIN_ROLES = ["admin", "education_manager", "sales_manager"];

export function AdminGate({ children }: Props) {
  const { user, hydrated: authHydrated } = useAuth();
  const [role, setRole] = useState<UserRole>("learner");
  const [hydrated, setHydrated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setRole(getUserRole());
    setHydrated(true);
    const handler = (e: Event) => setRole((e as CustomEvent<UserRole>).detail);
    window.addEventListener("ewr-role-change", handler);
    return () => window.removeEventListener("ewr-role-change", handler);
  }, []);

  const hasServerAdmin = authHydrated && user && SERVER_ADMIN_ROLES.includes(user.role);
  const hasLocalAdmin = role === "admin";

  if (!hydrated || !authHydrated) {
    return <div className="px-5 py-20 text-center text-muted">読み込み中...</div>;
  }

  if (hasServerAdmin || hasLocalAdmin) return <>{children}</>;

  const handleUnlock = () => {
    if (unlockAdmin(pin)) {
      setRole("admin");
      setError("");
    } else {
      setError("PINが正しくありません（デモ: ewr2026）");
    }
  };

  return (
    <section className="px-5 py-12">
      <div className="card-premium p-6 text-center">
        <p className="section-label">ADMIN ACCESS</p>
        <h2 className="mt-2 text-[18px] font-bold text-foreground">管理者認証</h2>
        <p className="mt-2 text-[12px] leading-relaxed text-muted">
          法人アカウントでログインするか、デモPINを入力してください。
        </p>
        <Link href="/login" className="mt-4 flex w-full items-center justify-center rounded-2xl bg-primary py-3.5 text-[14px] font-semibold text-white">
          法人ログイン（admin@ew-r.co.jp）
        </Link>
        <p className="my-4 text-[10px] text-muted">または</p>
        <input
          type="password"
          value={pin}
          onChange={(e) => { setPin(e.target.value); setError(""); }}
          placeholder="デモPIN"
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-center text-[14px] outline-none focus:border-primary"
          onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
        />
        {error && <p className="mt-2 text-[11px] text-[#9b3b3b]">{error}</p>}
        <button type="button" onClick={handleUnlock} className="mt-4 w-full rounded-2xl border border-primary/20 py-3 text-[13px] font-semibold text-primary">
          PINで認証
        </button>
      </div>
    </section>
  );
}