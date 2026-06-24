import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { AdminGate } from "@/app/components/AdminGate";
import { CMSEditor } from "./CMSEditor";

export default function CMSPage() {
  return (
    <AppShell activeNav="progress">
      <AdminGate>
        <section className="px-5 pb-4 pt-7">
          <Link href="/admin" className="text-[13px] font-medium text-primary">← 管理画面</Link>
          <p className="section-label mt-4">CONTENT MANAGEMENT</p>
          <h1 className="mt-2 text-[24px] font-bold text-foreground">CMS</h1>
          <p className="mt-2 text-[12px] text-muted">
            Mission・製品・動画を編集。変更はサーバーに保存され、即座に学習画面に反映されます。
          </p>
          <p className="mt-2 text-[10px] text-gold">※ 管理者ログイン（admin@ew-r.co.jp）が必要です</p>
        </section>
        <CMSEditor />
      </AdminGate>
    </AppShell>
  );
}