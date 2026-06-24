"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/app/components/AppShell";
import { BrandLogo } from "@/app/components/BrandLogo";
import { PageHeader } from "@/app/components/PageHeader";
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
      <section className="page-header pb-2">
        <div className="flex justify-center">
          <BrandLogo size="lg" />
        </div>
        <p className="section-label mt-5 text-center">ENTERPRISE LOGIN</p>
        <h1 className="page-title text-center">法人アカウント</h1>
        <p className="page-desc text-center">
          学習進捗をサーバーに保存。管理者は進捗・監査ログを一元確認できます。
        </p>
      </section>

      <section className="page-section pt-0">
        <div className="card-premium p-5">
          <div className="space-y-4">
            <div>
              <label className="input-label">メールアドレス</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field mt-1.5"
              />
            </div>
            <div>
              <label className="input-label">パスワード</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ewr2026"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="input-field mt-1.5"
              />
            </div>
            {error && <p className="text-[12px] text-[var(--danger)]">{error}</p>}
            <button type="button" onClick={handleLogin} disabled={loading} className="btn-primary">
              {loading ? "認証中..." : "ログイン"}
            </button>
          </div>
        </div>

        <div className="card-soft mt-4 p-4">
          <p className="text-[11px] font-bold text-foreground">デモアカウント</p>
          <ul className="mt-2.5 space-y-1.5 text-[10px] leading-relaxed text-muted">
            <li><span className="font-semibold text-foreground">受講者</span> learner@ew-r.co.jp / ewr2026</li>
            <li><span className="font-semibold text-foreground">管理者</span> admin@ew-r.co.jp / ewr2026</li>
            <li><span className="font-semibold text-foreground">営業</span> dealer@ew-r.co.jp / ewr2026</li>
          </ul>
        </div>

        <Link href="/" className="mt-5 flex justify-center text-[13px] font-medium text-primary">
          ゲスト（ローカル保存）で続ける →
        </Link>
      </section>
    </AppShell>
  );
}