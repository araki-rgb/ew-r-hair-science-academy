"use client";

import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { AssignmentsPanel } from "@/app/components/AssignmentsPanel";

export default function AssignmentsPage() {
  return (
    <AppShell activeNav="learn">
      <section className="page-header pb-3">
        <Link href="/learn" className="back-link">← Mission</Link>
        <p className="section-label mt-4">TRAINING ASSIGNMENTS</p>
        <h1 className="page-title">必修トレーニング</h1>
        <p className="page-desc">
          教育本部・営業本部からアサインされた学習課題。期限と必修マークを確認してください。
        </p>
      </section>
      <section className="page-section pt-0 pb-8">
        <AssignmentsPanel />
      </section>
    </AppShell>
  );
}