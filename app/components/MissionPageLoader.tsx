"use client";

import { useEffect, useState } from "react";
import type { Mission } from "@/lib/types";
import { MissionPlayer } from "./MissionPlayer";

export function MissionPageLoader({ slug, fallbackMission, fallbackNext }: {
  slug: string;
  fallbackMission: Mission;
  fallbackNext: Mission | null;
}) {
  const [mission, setMission] = useState<Mission>(fallbackMission);
  const [nextMission, setNextMission] = useState<Mission | null>(fallbackNext);

  useEffect(() => {
    fetch(`/api/missions/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.mission) setMission(data.mission);
        if (data.nextMission !== undefined) setNextMission(data.nextMission);
      })
      .catch(() => { /* use fallback */ });
  }, [slug]);

  return <MissionPlayer mission={mission} nextMission={nextMission} />;
}