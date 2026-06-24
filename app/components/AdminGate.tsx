"use client";

import { useEffect, useState } from "react";
import { getUserRole, unlockAdmin, type UserRole } from "@/lib/storage/role-store";

type Props = {
  children: React.ReactNode;
};

export function AdminGate({ children }: Props) {
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

  if (!hydrated) {
    return <div className="px-5 py-20 text-center text-muted">読み込み中...</div>;
  }

  if (role === "admin") return <>{children}</>;

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
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-muted text-gold">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-7 w-7">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="section-label mt-4">ADMIN ACCESS</p>
        <h2 className="mt-2 text-[18px] font-bold text-foreground">管理者認証</h2>
        <p className="mt-2 text-[12px] leading-relaxed text-muted">
          教育管理画面は管理者のみアクセス可能です。デモ用PINを入力してください。
        </p>
        <input
          type="password"
          value={pin}
          onChange={(e) => { setPin(e.target.value); setError(""); }}
          placeholder="管理者PIN"
          className="mt-5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-center text-[14px] outline-none focus:border-primary"
          onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
        />
        {error && <p className="mt-2 text-[11px] text-[#9b3b3b]">{error}</p>}
        <button
          type="button"
          onClick={handleUnlock}
          className="mt-4 flex w-full items-center justify-center rounded-2xl bg-primary py-3.5 text-[14px] font-semibold text-white"
        >
          認証する
        </button>
      </div>
    </section>
  );
}