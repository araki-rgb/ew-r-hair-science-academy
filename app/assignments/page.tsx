"use client";

import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { AssignmentsPanel } from "@/app/components/AssignmentsPanel";

export default function AssignmentsPage() {
  return (
    <AppShell activeNav="learn">
      <section className="px-5 pb-5 pt-7">
        <Link href="/learn" className="text-[13px] font-medium text-primary">← Mission</Link>
        <p className="section-label mt-4">TRAINING ASSIGNMENTS</p>
        <h1 className="mt-2 text-[24px] font-bold text-foreground">必修トレーニング</h1>
        <p className="mt-2 text-[12px] leading-relaxed text-muted">
          教育本部・営業本部からアサインされた学習課題。期限と必修マークを確認してください。
        </p>
      </section>
      <section className="px-5 pb-6">
        <AssignmentsPanel />
      </section>
    </AppShell>
  );
}