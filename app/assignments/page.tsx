"use client";

import { AppShell } from "@/app/components/AppShell";
import { AssignmentsPanel } from "@/app/components/AssignmentsPanel";
import { PageHeader } from "@/app/components/PageHeader";

export default function AssignmentsPage() {
  return (
    <AppShell activeNav="learn">
      <PageHeader
        backHref="/learn"
        backLabel="Mission"
        label="TRAINING ASSIGNMENTS"
        title="必修トレーニング"
        description="教育本部・営業本部からアサインされた学習課題。期限と必修マークを確認してください。"
      />
      <section className="page-section pt-0 pb-8">
        <AssignmentsPanel />
      </section>
    </AppShell>
  );
}