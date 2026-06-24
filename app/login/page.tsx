"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/app/components/AppShell";
import { useAuth } from "@/app/hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("learner@ew-r.co.jp");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      router.push("/progress");
    } catch (e) {
      setError(e instanceof Error ? e.message : "ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell activeNav="progress">
      <section className="px-5 py-10">
        <p className="section-label">ENTERPRISE LOGIN</p>
        <h1 className="mt-2 text-[24px] font-bold text-foreground">法人アカウント</h1>
        <p className="mt-2 text-[12px] leading-relaxed text-muted">
          サーバーに学習進捗を保存。組織管理者が進捗・監査ログを確認できます。
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-foreground">メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-[14px] outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-foreground">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ewr2026"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-[14px] outline-none focus:border-primary"
            />
          </div>
          {error && <p className="text-[12px] text-[#9b3b3b]">{error}</p>}
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="flex w-full items-center justify-center rounded-2xl bg-primary py-4 text-[15px] font-semibold text-white disabled:opacity-60"
          >
            {loading ? "認証中..." : "ログイン"}
          </button>
        </div>

        <div className="card-soft mt-6 p-4">
          <p className="text-[11px] font-bold text-foreground">デモアカウント</p>
          <ul className="mt-2 space-y-1 text-[10px] text-muted">
            <li>受講者: learner@ew-r.co.jp / ewr2026</li>
            <li>管理者: admin@ew-r.co.jp / ewr2026</li>
            <li>営業: dealer@ew-r.co.jp / ewr2026</li>
          </ul>
        </div>

        <Link href="/" className="mt-6 block text-center text-[13px] font-medium text-primary">
          ゲスト（ローカル保存）で続ける →
        </Link>
      </section>
    </AppShell>
  );
}