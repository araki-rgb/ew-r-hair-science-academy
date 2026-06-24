import { AppShell } from "@/app/components/AppShell";
import { AdminGate } from "@/app/components/AdminGate";
import { PageHeader } from "@/app/components/PageHeader";
import { CMSEditor } from "./CMSEditor";

export default function CMSPage() {
  return (
    <AppShell activeNav="progress">
      <AdminGate>
        <PageHeader
          backHref="/admin"
          backLabel="管理画面"
          label="CONTENT MANAGEMENT"
          title="CMS"
          description="Mission・製品・動画を編集。変更はサーバーに保存され、即座に学習画面に反映されます。"
          badge="ADMIN"
        />
        <section className="page-section pt-0">
          <p className="compliance-note text-[10px]">
            管理者ログイン（admin@ew-r.co.jp）が必要です
          </p>
        </section>
        <CMSEditor />
      </AdminGate>
    </AppShell>
  );
}