import { notFound } from "next/navigation";
import { AppShell } from "@/app/components/AppShell";
import { MissionPlayer } from "@/app/components/MissionPlayer";
import { getMissionBySlug, getNextMission } from "@/lib/data/lessons";

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
  const mission = getMissionBySlug(slug);
  if (!mission) notFound();

  const nextMission = getNextMission(slug);

  return (
    <AppShell activeNav="learn">
      <MissionPlayer mission={mission} nextMission={nextMission} />
    </AppShell>
  );
}