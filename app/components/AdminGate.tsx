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
    return <div className="page-section py-20 text-center text-muted">読み込み中...</div>;
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
    <section className="page-section py-10">
      <div className="card-premium p-6 text-center">
        <p className="section-label">ADMIN ACCESS</p>
        <h2 className="section-title mt-2">管理者認証</h2>
        <p className="page-desc mt-2">
          法人アカウントでログインするか、デモPINを入力してください。
        </p>
        <Link href="/login" className="btn-primary mt-5">
          法人ログイン（admin@ew-r.co.jp）
        </Link>
        <p className="my-4 text-[10px] text-muted">または</p>
        <input
          type="password"
          value={pin}
          onChange={(e) => { setPin(e.target.value); setError(""); }}
          placeholder="デモPIN"
          className="input-field text-center"
          onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
        />
        {error && <p className="mt-2 text-[11px] text-[var(--danger)]">{error}</p>}
        <button type="button" onClick={handleUnlock} className="btn-secondary mt-4">
          PINで認証
        </button>
      </div>
    </section>
  );
}