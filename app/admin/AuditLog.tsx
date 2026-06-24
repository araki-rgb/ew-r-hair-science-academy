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
    return <p className="px-5 text-[12px] text-muted">{error}（admin@ew-r.co.jp でログインしてください）</p>;
  }

  return (
    <section className="px-5 pb-6">
      <h2 className="text-[15px] font-bold text-foreground">監査ログ（直近50件）</h2>
      <div className="mt-3 space-y-2">
        {entries.map((e) => (
          <div key={e.id} className="card-soft p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold text-foreground">{e.action}</p>
              <p className="text-[9px] text-muted">{new Date(e.at).toLocaleString("ja-JP")}</p>
            </div>
            <p className="mt-0.5 text-[10px] text-muted">
              {e.userEmail ?? "ゲスト"} · {e.resource}
            </p>
          </div>
        ))}
        {entries.length === 0 && <p className="text-[12px] text-muted">ログがありません</p>}
      </div>
    </section>
  );
}