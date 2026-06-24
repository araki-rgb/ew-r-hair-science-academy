export type TrainingAssignment = {
  id: string;
  title: string;
  slug: string;
  deadline: string;
  mandatory: boolean;
  assignedBy: string;
  targetRole: "hairdresser" | "dealer" | "both";
  status: "pending" | "in-progress" | "completed" | "overdue";
};

export const defaultAssignments: TrainingAssignment[] = [
  { id: "a1", title: "髪の基礎", slug: "hair-basic", deadline: "2026.07.15", mandatory: true, assignedBy: "教育本部", targetRole: "both", status: "completed" },
  { id: "a2", title: "頭皮の基礎", slug: "scalp-basic", deadline: "2026.07.31", mandatory: true, assignedBy: "教育本部", targetRole: "hairdresser", status: "in-progress" },
  { id: "a3", title: "EW-R製品理解", slug: "ewr-products", deadline: "2026.08.15", mandatory: true, assignedBy: "営業本部", targetRole: "dealer", status: "pending" },
  { id: "a4", title: "理解度テスト", slug: "quiz", deadline: "2026.08.31", mandatory: true, assignedBy: "教育本部", targetRole: "both", status: "pending" },
  { id: "a5", title: "営業トレーニング", slug: "sales-training", deadline: "2026.09.15", mandatory: false, assignedBy: "営業本部", targetRole: "dealer", status: "pending" },
];

export function resolveAssignmentStatus(
  assignments: TrainingAssignment[],
  completedMissions: string[],
  quizPassed: boolean,
): TrainingAssignment[] {
  const now = new Date();
  return assignments.map((a) => {
    if (a.slug === "quiz") {
      if (quizPassed) return { ...a, status: "completed" as const };
      return { ...a, status: "pending" as const };
    }
    if (completedMissions.includes(a.slug)) return { ...a, status: "completed" as const };
    const deadline = new Date(a.deadline.replace(/\./g, "-"));
    if (deadline < now) return { ...a, status: "overdue" as const };
    if (completedMissions.length > 0 && a.slug === "scalp-basic") return { ...a, status: "in-progress" as const };
    return a;
  });
}