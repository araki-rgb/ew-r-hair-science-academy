"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Mission, MissionQuestion } from "@/lib/types";
import { XP_REWARDS } from "@/lib/data/gamification";
import { completeMission, loadProgress } from "@/lib/storage/progress-store";
import { DiagramArea } from "./DiagramArea";
import { VideoArea } from "./VideoArea";

const CHOICE_LABELS = ["A", "B", "C", "D"];

const MISSION_STEPS = [
  { key: "scene", label: "現場" },
  { key: "question", label: "問題" },
  { key: "answer", label: "回答" },
  { key: "ai", label: "AI解説" },
  { key: "diagram", label: "図解" },
  { key: "field", label: "現場T" },
  { key: "sales", label: "営業T" },
  { key: "summary", label: "整理" },
] as const;

type StepKey = (typeof MISSION_STEPS)[number]["key"] | "complete" | "next-mission";

function StepBar({ current }: { current: StepKey }) {
  const idx = MISSION_STEPS.findIndex((s) => s.key === current);
  const activeIdx = current === "complete" || current === "next-mission" ? MISSION_STEPS.length : idx;

  return (
    <div className="scrollbar-hide flex gap-1 overflow-x-auto pb-1">
      {MISSION_STEPS.map((step, i) => (
        <div
          key={step.key}
          className={`flex shrink-0 flex-col items-center gap-0.5 ${
            i <= activeIdx ? "opacity-100" : "opacity-35"
          }`}
          style={{ minWidth: 36 }}
        >
          <div
            className={`h-1.5 w-full rounded-full transition-all ${
              i < activeIdx
                ? "bg-primary-light"
                : i === activeIdx
                  ? "bg-primary"
                  : "bg-border"
            }`}
          />
          <span
            className={`text-[7px] font-medium ${
              i === activeIdx ? "text-primary" : "text-muted"
            }`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function SceneCard({ q }: { q: MissionQuestion }) {
  const { scene } = q;
  return (
    <div className="animate-fade-up space-y-4">
      <div className="card-premium overflow-hidden">
        <div className="bg-gradient-to-r from-[#0f5c42] to-primary px-4 py-3">
          <p className="text-[9px] font-bold tracking-[0.2em] text-white/80">FIELD SCENE</p>
          <p className="mt-0.5 text-[15px] font-bold text-white">{scene.title}</p>
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-center gap-2 text-[11px] text-muted">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-primary">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {scene.location}
          </div>
          <p className="text-[13px] leading-[1.85] text-foreground">{scene.situation}</p>
          {scene.clientProfile && (
            <div className="rounded-xl bg-primary-muted/50 px-3.5 py-3">
              <p className="text-[9px] font-bold text-primary">お客様 / 相手</p>
              <p className="mt-1 text-[12px] text-foreground">{scene.clientProfile}</p>
            </div>
          )}
          <div className="rounded-xl border border-primary/15 bg-background px-3.5 py-3">
            <p className="text-[9px] font-bold text-primary">この場面の課題</p>
            <p className="mt-1 text-[13px] font-semibold text-foreground">{scene.challenge}</p>
          </div>
        </div>
      </div>
      <VideoArea video={q.video} compact />
    </div>
  );
}

function getChoiceStyle(
  index: number,
  selected: number | null,
  answered: boolean,
  correct: number,
) {
  if (!answered) {
    return selected === index
      ? "border-primary bg-primary-muted ring-1 ring-primary/30"
      : "border-border bg-background active:border-primary";
  }
  if (index === correct) return "border-primary bg-[#e4f2ec]";
  if (selected === index) return "border-[#e8b4b4] bg-[#fdf2f2]";
  return "border-border opacity-50";
}

type Props = {
  mission: Mission;
  nextMission: Mission | null;
};

export function MissionPlayer({ mission, nextMission }: Props) {
  const [qIndex, setQIndex] = useState(0);
  const [step, setStep] = useState<StepKey>("scene");
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [saved, setSaved] = useState(false);

  const total = mission.questions.length;
  const current = mission.questions[qIndex];
  const isCorrect = selected === current.answerIndex;
  const missionProgress = Math.round(
    ((qIndex + (step !== "scene" && step !== "question" ? 1 : 0)) / total) * 100,
  );

  const accuracy = useMemo(() => {
    const answered = qIndex + (selected !== null ? 1 : 0);
    return answered > 0 ? Math.round((correctCount / answered) * 100) : 0;
  }, [qIndex, selected, correctCount]);

  const advance = (next: StepKey) => setStep(next);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const xp = index === current.answerIndex ? XP_REWARDS.questionCorrect : XP_REWARDS.questionWrong;
    setSessionXp((x) => x + xp);
    if (index === current.answerIndex) setCorrectCount((c) => c + 1);
    setStep("answer");
  };

  const handleQuestionDone = () => {
    setSessionXp((x) => x + XP_REWARDS.stepComplete * 5);
    if (qIndex < total - 1) {
      setQIndex((i) => i + 1);
      setSelected(null);
      setStep("scene");
    } else {
      const stepBonus = XP_REWARDS.stepComplete * 5;
      const missionBonus = XP_REWARDS.missionComplete;
      const finalXp = sessionXp + stepBonus + missionBonus;
      const finalAccuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;
      setSessionXp(finalXp);
      if (!saved) {
        completeMission(loadProgress(), mission.slug, finalXp, finalAccuracy);
        setSaved(true);
      }
      setStep("complete");
    }
  };

  return (
    <>
      <section className="px-5 pb-3 pt-5">
        <Link href="/learn" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Mission一覧
        </Link>

        <div className="mt-4">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
              Mission {mission.missionNumber}
            </span>
            <span className="text-[10px] font-semibold text-primary">+{mission.xpReward} XP</span>
          </div>
          <h1 className="mt-2 text-[22px] font-bold tracking-tight text-foreground">{mission.title}</h1>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-1.5 text-center">
          {[
            { v: `${missionProgress}%`, l: "進捗" },
            { v: `${accuracy}%`, l: "正答" },
            { v: `+${sessionXp}`, l: "獲得XP" },
            { v: `${qIndex + 1}/${total}`, l: "問題" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl bg-primary-muted/50 py-2">
              <p className="text-[13px] font-bold text-foreground">{s.v}</p>
              <p className="text-[8px] text-muted">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-primary-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
            style={{ width: `${missionProgress}%` }}
          />
        </div>
      </section>

      <section className="px-5 pb-3">
        <StepBar current={step} />
      </section>

      <section className="px-5 pb-6">
        {step === "scene" && (
          <>
            <SceneCard q={current} />
            <button
              type="button"
              onClick={() => {
                setSessionXp((x) => x + XP_REWARDS.sceneComplete);
                setStep("question");
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-[14px] font-semibold text-white shadow-[0_8px_24px_-6px_rgb(27_122_90/0.45)]"
            >
              問題に進む
            </button>
          </>
        )}

        {step === "question" && (
          <>
            <div className="card-soft p-5">
              <span className="inline-flex rounded-lg bg-primary-muted px-2.5 py-1 text-[10px] font-semibold text-primary">
                QUESTION {String(qIndex + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-[17px] font-bold leading-snug text-foreground">
                Q. {current.question}
              </p>
            </div>
            <ul className="mt-4 space-y-2.5">
              {current.choices.map((choice, i) => (
                <li key={choice}>
                  <button
                    type="button"
                    onClick={() => handleSelect(i)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition ${getChoiceStyle(i, selected, selected !== null, current.answerIndex)}`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[13px] font-bold text-primary shadow-sm">
                      {CHOICE_LABELS[i]}
                    </span>
                    <span className="text-[14px] font-medium text-foreground">{choice}</span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {step === "answer" && selected !== null && (
          <div className="animate-fade-up space-y-4">
            <div className={`rounded-2xl px-4 py-4 text-center ${isCorrect ? "bg-[#e4f2ec]" : "bg-[#fdf2f2]"}`}>
              <p className={`text-[15px] font-bold ${isCorrect ? "text-primary" : "text-[#9b3b3b]"}`}>
                {isCorrect ? `正解！ +${XP_REWARDS.questionCorrect} XP` : `不正解 +${XP_REWARDS.questionWrong} XP`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => advance("ai")}
              className="flex w-full items-center justify-center rounded-2xl bg-primary py-3.5 text-[14px] font-semibold text-white"
            >
              AI解説を見る
            </button>
          </div>
        )}

        {step === "ai" && (
          <div className="animate-fade-up space-y-4">
            <div className="card-soft overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border bg-gradient-to-r from-primary-muted to-white px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path d="M10 2a3 3 0 100 6 3 3 0 000-6zM4 16c0-3.3 2.7-6 6-6s6 2.7 6 6v1H4v-1z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-primary">AI TEACHER 解説</p>
                  <p className="text-[9px] text-muted">科学的視点での整理</p>
                </div>
              </div>
              <p className="p-4 text-[13px] leading-[1.9] text-foreground whitespace-pre-line">
                {current.aiExplanation}
              </p>
            </div>
            <button type="button" onClick={() => advance("diagram")} className="flex w-full items-center justify-center rounded-2xl bg-primary py-3.5 text-[14px] font-semibold text-white">
              図解で理解を深める
            </button>
          </div>
        )}

        {step === "diagram" && (
          <div className="animate-scale-in space-y-4">
            <p className="section-label">VISUAL LEARNING</p>
            <DiagramArea diagram={current.diagram} size="hero" />
            <button type="button" onClick={() => advance("field")} className="flex w-full items-center justify-center rounded-2xl bg-primary py-3.5 text-[14px] font-semibold text-white">
              美容師向けトークを見る
            </button>
          </div>
        )}

        {step === "field" && (
          <div className="animate-slide-right space-y-4">
            <div className="card-soft overflow-hidden">
              <div className="border-b border-border bg-primary-muted/50 px-4 py-2.5">
                <p className="text-[10px] font-bold tracking-wider text-primary">美容師向け · 現場での説明例</p>
              </div>
              <p className="p-4 text-[14px] leading-[1.9] text-foreground">{current.hairdresserTalk}</p>
            </div>
            <button type="button" onClick={() => advance("sales")} className="flex w-full items-center justify-center rounded-2xl bg-primary py-3.5 text-[14px] font-semibold text-white">
              ディーラー営業トークを見る
            </button>
          </div>
        )}

        {step === "sales" && (
          <div className="animate-slide-right space-y-4">
            <div className="card-soft overflow-hidden">
              <div className="border-b border-border bg-gold-muted px-4 py-2.5">
                <p className="text-[10px] font-bold tracking-wider text-gold">ディーラー向け · 営業トーク</p>
              </div>
              <p className="p-4 text-[14px] leading-[1.9] text-foreground">{current.dealerTalk}</p>
            </div>
            <button type="button" onClick={() => advance("summary")} className="flex w-full items-center justify-center rounded-2xl bg-primary py-3.5 text-[14px] font-semibold text-white">
              ポイントを整理する
            </button>
          </div>
        )}

        {step === "summary" && (
          <div className="animate-fade-up space-y-4">
            <div className="card-premium p-4">
              <p className="section-label">KEY POINTS</p>
              <h2 className="mt-1 text-[15px] font-bold text-foreground">ポイント整理</h2>
              <ul className="mt-3 space-y-2.5">
                {current.summaryPoints.map((point, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-[12px] leading-relaxed text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={handleQuestionDone}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgb(27_122_90/0.45)]"
            >
              {qIndex < total - 1 ? "次のシーンへ" : "Missionを修了する"}
            </button>
          </div>
        )}

        {step === "complete" && (
          <div className="animate-scale-in">
            <div className="card-premium overflow-hidden">
              <div className="cert-pattern px-5 py-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-[0_12px_32px_-8px_rgb(27_122_90/0.5)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-9 w-9">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="mt-4 text-[10px] font-bold tracking-[0.2em] text-gold">MISSION COMPLETE</p>
                <h2 className="mt-2 text-[22px] font-bold text-foreground">Mission {mission.missionNumber} 修了</h2>
                <p className="mt-2 text-[13px] text-muted">{mission.title}</p>
                <div className="mt-5 inline-flex items-center gap-4 rounded-2xl bg-white/80 px-5 py-3">
                  <div>
                    <p className="text-[20px] font-bold text-primary">+{sessionXp + mission.xpReward}</p>
                    <p className="text-[9px] text-muted">獲得XP</p>
                  </div>
                  <div className="h-10 w-px bg-border" />
                  <div>
                    <p className="text-[20px] font-bold text-foreground">{accuracy}%</p>
                    <p className="text-[9px] text-muted">正答率</p>
                  </div>
                  <div className="h-10 w-px bg-border" />
                  <div>
                    <p className="text-[20px] font-bold text-foreground">{correctCount}/{total}</p>
                    <p className="text-[9px] text-muted">正解数</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 p-5">
                {nextMission ? (
                  <button
                    type="button"
                    onClick={() => setStep("next-mission")}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-[15px] font-semibold text-white"
                  >
                    次のMissionへ
                  </button>
                ) : (
                  <Link href="/learn" className="flex w-full items-center justify-center rounded-2xl bg-primary py-4 text-[15px] font-semibold text-white">
                    すべてのMissionを完了
                  </Link>
                )}
                <Link href="/progress" className="flex w-full items-center justify-center rounded-2xl border border-primary/20 py-3.5 text-[13px] font-semibold text-primary">
                  学習記録・バッジを確認
                </Link>
              </div>
            </div>
          </div>
        )}

        {step === "next-mission" && nextMission && (
          <div className="animate-fade-up space-y-4">
            <div className="card-premium p-5 text-center">
              <p className="section-label">NEXT MISSION</p>
              <h2 className="mt-2 text-[18px] font-bold text-foreground">
                Mission {nextMission.missionNumber}: {nextMission.title}
              </h2>
              <p className="mt-2 text-[12px] text-muted">{nextMission.description}</p>
              <p className="mt-3 text-[11px] font-semibold text-primary">+{nextMission.xpReward} XP</p>
            </div>
            <Link
              href={`/learn/${nextMission.slug}`}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgb(27_122_90/0.45)]"
            >
              次のMissionを開始
            </Link>
            <Link href="/learn" className="flex w-full items-center justify-center py-3 text-[13px] font-medium text-muted">
              あとで続ける
            </Link>
          </div>
        )}
      </section>
    </>
  );
}