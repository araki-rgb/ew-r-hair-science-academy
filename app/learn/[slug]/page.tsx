import { notFound } from "next/navigation";
import { AppShell } from "@/app/components/AppShell";
import { LessonPlayer } from "@/app/components/LessonPlayer";
import { getLessonBySlug } from "@/lib/data/lessons";

export function generateStaticParams() {
  return [
    { slug: "hair-basic" },
    { slug: "scalp-basic" },
    { slug: "color-theory" },
    { slug: "developer-science" },
    { slug: "treatment-aftercare" },
    { slug: "ewr-products" },
    { slug: "sales-training" },
    { slug: "customer-explanation" },
  ];
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) notFound();

  return (
    <AppShell activeNav="learn">
      <LessonPlayer lesson={lesson} />
    </AppShell>
  );
}