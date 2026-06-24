"use client";

import { useEffect, useState } from "react";

type Entry = {
  id: string;
  action: string;
  resource: string;
  userEmail?: string;
  metadata: Record<string, unknown>;
  at: string;
};

export function AuditLog() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/audit?limit=50", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setEntries(data.entries ?? []);
      })
      .catch(() => setError("監査ログの取得に失敗しました"));
  }, []);

  if (error) {
    return (
      <section className="page-section pb-8">
        <p className="text-[12px] text-muted">{error}（admin@ew-r.co.jp でログインしてください）</p>
      </section>
    );
  }

  return (
    <section className="page-section pb-8">
      <p className="section-label">AUDIT TRAIL</p>
      <h2 className="section-title">監査ログ（直近50件）</h2>
      <div className="mt-3 space-y-2">
        {entries.map((e) => (
          <div key={e.id} className="card-soft p-3.5">
            <div className="flex items-center justify-between gap-2">
              <span className="badge-muted">{e.action}</span>
              <p className="text-[9px] text-muted">{new Date(e.at).toLocaleString("ja-JP")}</p>
            </div>
            <p className="mt-1.5 text-[10px] text-muted">
              {e.userEmail ?? "ゲスト"} · {e.resource}
            </p>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="card-soft p-4 text-center text-[12px] text-muted">ログがありません</p>
        )}
      </div>
    </section>
  );
}