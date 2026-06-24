import type { Lesson, LessonQuestion } from "../../types";
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

export function getAllQuestions(): LessonQuestion[] {
  return lessons.flatMap((lesson) => lesson.questions);
}

export function getQuizQuestions(count = 10): LessonQuestion[] {
  const all = getAllQuestions();
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}