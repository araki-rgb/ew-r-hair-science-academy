import { resolveMission } from "../cms/resolve-mission";
import type { Mission } from "../types";
import { lessons } from "../data/lessons";
import { getCmsOverrides, applyLessonOverrides, getMergedVideos } from "./cms-service";

export async function getMissionWithCms(slug: string): Promise<Mission | undefined> {
  const overrides = await getCmsOverrides();
  const lesson = lessons.find((l) => l.slug === slug);
  if (!lesson) return undefined;
  const mission = resolveMission(applyLessonOverrides(lesson, overrides));
  const mergedVideos = getMergedVideos(overrides);

  return {
    ...mission,
    questions: mission.questions.map((q) => {
      const vo = mergedVideos[q.id];
      if (!vo) return q;
      const url = vo.url ?? q.video.url;
      return {
        ...q,
        video: {
          ...q.video,
          ...vo,
          url: url ?? null,
          status: url ? "ready" : q.video.status,
        },
      };
    }),
  };
}

export async function getNextMissionWithCms(slug: string): Promise<Mission | null> {
  const overrides = await getCmsOverrides();
  const lesson = lessons.find((l) => l.slug === slug);
  if (!lesson?.nextMissionSlug) return null;
  const next = lessons.find((l) => l.slug === lesson.nextMissionSlug);
  return next ? resolveMission(applyLessonOverrides(next, overrides)) : null;
}