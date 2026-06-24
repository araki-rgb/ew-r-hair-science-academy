"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Mission, MissionQuestion } from "@/lib/types";
import { XP_REWARDS } from "@/lib/data/gamification";
import { syncMissionComplete } from "@/lib/api/sync";
import { trackEvent } from "@/lib/analytics/events";
import { completeMission, loadProgress } from "@/lib/storage/progress-store";
import { CertificateExport } from "./CertificateExport";
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
    <div className="step-pipeline">
      {MISSION_STEPS.map((step, i) => {
        const state = i < activeIdx ? "done" : i === activeIdx ? "active" : "";
        return (
          <div key={step.key} className={`step-pill ${state}`} style={{ minWidth: 40 }}>
            <div className="step-pill-bar" />
            <span className="step-pill-label">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function SceneCard({ q }: { q: MissionQuestion }) {
  const { scene } = q;
  return (
    <div className="animate-fade-up space-y-4">
      <div className="card-premium overflow-hidden">
        <div className="scene-hero">
          <p className="relative text-[8px] font-bold tracking-[0.22em] text-white/75">FIELD SCENE</p>
          <p className="relative mt-1 text-[16px] font-bold leading-snug text-white">{scene.title}</p>
        </div>
        <div className="space-y-3.5 p-4">
          <div className="flex items-center gap-2 text-[11px] text-muted">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-primary">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {scene.location}
          </div>
          <p className="text-[13px] leading-[1.85] text-foreground">{scene.situation}</p>
          {scene.clientProfile && (
            <div className="rounded-[var(--radius-md)] bg-primary-muted/60 px-3.5 py-3">
              <p className="text-[9px] font-bold tracking-wide text-primary">お客様 / 相手</p>
              <p className="mt-1 text-[12px] leading-relaxed text-foreground">{scene.clientProfile}</p>
            </div>
          )}
          <div className="rounded-[var(--radius-md)] border border-primary/12 bg-background px-3.5 py-3">
            <p className="text-[9px] font-bold tracking-wide text-primary">この場面の課題</p>
            <p className="mt-1 text-[13px] font-semibold leading-snug text-foreground">{scene.challenge}</p>
          </div>
        </div>
      </div>
      <VideoArea video={q.video} questionId={q.id} compact />
    </div>
  );
}

function getChoiceClass(index: number, selected: number | null, answered: boolean, correct: number) {
  if (!answered) return selected === index ? "choice-btn selected" : "choice-btn";
  if (index === correct) return "choice-btn correct";
  if (selected === index) return "choice-btn incorrect";
  return "choice-btn opacity-45";
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
        syncMissionComplete(mission.slug, finalXp, finalAccuracy);
        trackEvent("mission_complete", { slug: mission.slug, accuracy: finalAccuracy });
        setSaved(true);
      }
      setStep("complete");
    }
  };

  return (
    <>
      <section className="page-header pb-3">
        <Link href="/learn" className="btn-ghost">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Mission一覧
        </Link>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="badge-primary">Mission {mission.missionNumber}</span>
          <span className="badge-muted">+{mission.xpReward} XP</span>
        </div>
        <h1 className="page-title mt-2 text-[1.375rem]">{mission.title}</h1>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {[
            { v: `${missionProgress}%`, l: "進捗" },
            { v: `${accuracy}%`, l: "正答" },
            { v: `+${sessionXp}`, l: "獲得XP" },
            { v: `${qIndex + 1}/${total}`, l: "問題" },
          ].map((s) => (
            <div key={s.l} className="metric-card">
              <p className="metric-value">{s.v}</p>
              <p className="metric-label">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="progress-track progress-glow mt-3">
          <div className="progress-fill" style={{ width: `${missionProgress}%` }} />
        </div>
      </section>

      <section className="page-section pt-0">
        <StepBar current={step} />
      </section>

      <section className="page-section pt-0">
        {step === "scene" && (
          <>
            <SceneCard q={current} />
            <button
              type="button"
              onClick={() => {
                setSessionXp((x) => x + XP_REWARDS.sceneComplete);
                setStep("question");
              }}
              className="btn-primary mt-5"
            >
              問題に進む
            </button>
          </>
        )}

        {step === "question" && (
          <>
            <div className="card-soft p-5">
              <span className="badge-muted">QUESTION {String(qIndex + 1).padStart(2, "0")}</span>
              <p className="mt-4 text-[17px] font-bold leading-[1.45] tracking-tight text-foreground">
                {current.question}
              </p>
            </div>
            <ul className="mt-4 space-y-2.5">
              {current.choices.map((choice, i) => (
                <li key={choice}>
                  <button
                    type="button"
                    onClick={() => handleSelect(i)}
                    className={getChoiceClass(i, selected, selected !== null, current.answerIndex)}
                  >
                    <span className="choice-letter">{CHOICE_LABELS[i]}</span>
                    <span className="text-[14px] font-medium leading-snug text-foreground">{choice}</span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {step === "answer" && selected !== null && (
          <div className="animate-fade-up space-y-4">
            <div className={`rounded-[var(--radius-lg)] px-4 py-5 text-center ${isCorrect ? "bg-[var(--success-muted)]" : "bg-[var(--danger-muted)]"}`}>
              <p className={`text-[15px] font-bold ${isCorrect ? "text-primary" : "text-[var(--danger)]"}`}>
                {isCorrect ? `正解 — +${XP_REWARDS.questionCorrect} XP` : `不正解 — +${XP_REWARDS.questionWrong} XP`}
              </p>
            </div>
            <button type="button" onClick={() => advance("ai")} className="btn-primary">
              AI解説を見る
            </button>
          </div>
        )}

        {step === "ai" && (
          <div className="animate-fade-up space-y-4">
            <div className="card-soft overflow-hidden">
              <div className="flex items-center gap-3 border-b border-border-subtle bg-gradient-to-r from-primary-muted/80 to-white px-4 py-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-primary text-white shadow-[var(--shadow-sm)]">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path d="M10 2a3 3 0 100 6 3 3 0 000-6zM4 16c0-3.3 2.7-6 6-6s6 2.7 6 6v1H4v-1z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-primary">AI TEACHER</p>
                  <p className="text-[9px] text-muted">科学的視点での整理</p>
                </div>
              </div>
              <p className="p-4 text-[13px] leading-[1.9] text-foreground whitespace-pre-line">
                {current.aiExplanation}
              </p>
            </div>
            <button type="button" onClick={() => advance("diagram")} className="btn-primary">
              図解で理解を深める
            </button>
          </div>
        )}

        {step === "diagram" && (
          <div className="animate-scale-in space-y-4">
            <p className="section-label">VISUAL LEARNING</p>
            <DiagramArea diagram={current.diagram} size="hero" />
            <button type="button" onClick={() => advance("field")} className="btn-primary">
              美容師向けトークを見る
            </button>
          </div>
        )}

        {step === "field" && (
          <div className="animate-slide-right space-y-4">
            <div className="talk-card talk-card-field">
              <div className="talk-card-header">
                <p className="text-[10px] font-bold tracking-wider text-primary">美容師向け · 現場での説明例</p>
              </div>
              <p className="p-4 text-[14px] leading-[1.9] text-foreground">{current.hairdresserTalk}</p>
            </div>
            <button type="button" onClick={() => advance("sales")} className="btn-primary">
              ディーラー営業トークを見る
            </button>
          </div>
        )}

        {step === "sales" && (
          <div className="animate-slide-right space-y-4">
            <div className="talk-card talk-card-sales">
              <div className="talk-card-header">
                <p className="text-[10px] font-bold tracking-wider text-gold">ディーラー向け · 営業トーク</p>
              </div>
              <p className="p-4 text-[14px] leading-[1.9] text-foreground">{current.dealerTalk}</p>
            </div>
            <button type="button" onClick={() => advance("summary")} className="btn-primary">
              ポイントを整理する
            </button>
          </div>
        )}

        {step === "summary" && (
          <div className="animate-fade-up space-y-4">
            <div className="card-premium p-4">
              <p className="section-label">KEY POINTS</p>
              <h2 className="section-title">ポイント整理</h2>
              <ul className="mt-4 space-y-3">
                {current.summaryPoints.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-[12px] leading-[1.7] text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button type="button" onClick={handleQuestionDone} className="btn-primary">
              {qIndex < total - 1 ? "次のシーンへ" : "Missionを修了する"}
            </button>
          </div>
        )}

        {step === "complete" && (
          <div className="animate-scale-in">
            <div className="card-premium overflow-hidden">
              <div className="cert-pattern px-5 py-10 text-center">
                <div className="mx-auto flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-[0_12px_32px_-8px_rgb(26_117_86/0.45)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-9 w-9">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="mt-5 text-[9px] font-bold tracking-[0.22em] text-gold">MISSION COMPLETE</p>
                <h2 className="mt-2 text-[1.375rem] font-bold tracking-tight text-foreground">
                  Mission {mission.missionNumber} 修了
                </h2>
                <p className="mt-2 text-[13px] text-muted">{mission.title}</p>
                <div className="mt-6 inline-flex items-center gap-5 rounded-[var(--radius-xl)] border border-border-subtle bg-white/90 px-6 py-4 shadow-[var(--shadow-xs)]">
                  {[
                    { v: `+${sessionXp + mission.xpReward}`, l: "獲得XP" },
                    { v: `${accuracy}%`, l: "正答率" },
                    { v: `${correctCount}/${total}`, l: "正解数" },
                  ].map((s, i) => (
                    <div key={s.l} className="flex items-center gap-5">
                      {i > 0 && <div className="h-9 w-px bg-border" />}
                      <div>
                        <p className={`text-[1.25rem] font-bold tracking-tight ${i === 0 ? "text-primary" : "text-foreground"}`}>{s.v}</p>
                        <p className="metric-label">{s.l}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3 p-5">
                <CertificateExport mission={mission} accuracy={accuracy} />
                {nextMission ? (
                  <button type="button" onClick={() => setStep("next-mission")} className="btn-primary">
                    次のMissionへ
                  </button>
                ) : (
                  <Link href="/learn" className="btn-primary">すべてのMissionを完了</Link>
                )}
                <Link href="/progress" className="btn-secondary">学習記録・バッジを確認</Link>
              </div>
            </div>
          </div>
        )}

        {step === "next-mission" && nextMission && (
          <div className="animate-fade-up space-y-4">
            <div className="card-premium p-6 text-center">
              <p className="section-label">NEXT MISSION</p>
              <h2 className="mt-2 text-[1.125rem] font-bold text-foreground">
                Mission {nextMission.missionNumber}: {nextMission.title}
              </h2>
              <p className="mt-2 text-[12px] leading-relaxed text-muted">{nextMission.description}</p>
              <p className="mt-3"><span className="badge-muted">+{nextMission.xpReward} XP</span></p>
            </div>
            <Link href={`/learn/${nextMission.slug}`} className="btn-primary">
              次のMissionを開始
            </Link>
            <Link href="/learn" className="flex w-full justify-center py-3 text-[13px] font-medium text-muted">
              あとで続ける
            </Link>
          </div>
        )}
      </section>
    </>
  );
}