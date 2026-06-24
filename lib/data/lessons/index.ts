import type { Lesson, Mission } from "../../types";
import { resolveMission, getNextMission as resolveNext } from "../../cms/resolve-mission";
import { hairBasicLesson } from "./hair-basic";
import { scalpBasicLesson } from "./scalp-basic";
import { colorTheoryLesson } from "./color-theory";
import { developerScienceLesson } from "./developer-science";
import { treatmentAftercareLesson } from "./treatment-aftercare";
import { ewrProductsLesson } from "./ewr-products";
import { salesTrainingLesson } from "./sales-training";
import { customerExplanationLesson } from "./customer-explanation";

export const lessons: Lesson[] = [
  hairBasicLesson,
  scalpBasicLesson,
  colorTheoryLesson,
  developerScienceLesson,
  treatmentAftercareLesson,
  ewrProductsLesson,
  salesTrainingLesson,
  customerExplanationLesson,
];

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getMissionBySlug(slug: string): Mission | undefined {
  const lesson = getLessonBySlug(slug);
  return lesson ? resolveMission(lesson) : undefined;
}

export function getNextMission(slug: string): Mission | null {
  return resolveNext(slug, lessons);
}

export function getAllQuestions() {
  return lessons.flatMap((lesson) => lesson.questions);
}

export function getQuizQuestions(count = 10) {
  const all = getAllQuestions();
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}