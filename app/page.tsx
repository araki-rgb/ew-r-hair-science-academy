import Link from "next/link";
import { AppShell } from "./components/AppShell";
import { CategoryIcon } from "./components/CategoryIcon";
import { DiagramIllustration } from "./components/DiagramIllustration";
import { HeroVisual } from "./components/HeroVisual";
import { ModeToggle } from "./components/ModeToggle";
import { RecommendedLessons } from "./components/RecommendedLessons";
import { RoadmapTimeline } from "./components/RoadmapTimeline";
import { categories } from "@/lib/data/categories";
import { demoProgress, getOverallProgress } from "@/lib/data/progress";
import { getLessonBySlug } from "@/lib/data/lessons";

const platformFeatures = [
  { label: "図解教材", value: "120+", sub: "断面・反応・頭皮" },
  { label: "動画対応", value: "準備中", sub: "施術デモ収録予定" },
  { label: "AI先生", value: "24h", sub: "現場質問に即回答" },
];

const diagrams = [
  { label: "髪の断面図", type: "hair-cross-section" as const, desc: "3層構造" },
  { label: "薬剤反応", type: "chemical-reaction" as const, desc: "1剤×2剤" },
  { label: "キューティクル", type: "cuticle" as const, desc: "鱗片構造" },
  { label: "頭皮環境", type: "scalp-environment" as const, desc: "土台ケア" },
];

export default function Home() {
  const overall = getOverallProgress();
  const nextLesson = getLessonBySlug(demoProgress.nextLessonSlug);

  return (
    <AppShell activeNav="home">
      <section className="relative overflow-hidden px-5 pb-6 pt-6">
        <div className="pointer-events-none absolute -right-12 -top-8 h-44 w-44 rounded-full bg-primary-muted/70 blur-3xl" />
        <p className="section-label animate-fade-up">EW-R HAIR SCIENCE ACADEMY</p>
        <h1 className="animate-fade-up animate-fade-up-delay-1 mt-3 text-[28px] font-bold leading-[1.3] tracking-tight text-foreground">
          髪の科学を、
          <br />
          <span className="text-primary">現場の提案力</span>へ。
        </h1>
        <p className="animate-fade-up animate-fade-up-delay-2 mt-3.5 text-[14px] leading-[1.8] text-muted">
          美容師・ディーラー向けの本格教育プラットフォーム。
          図解・動画・AI先生で、施術と提案の質を高めます。
        </p>

        <div className="animate-fade-up animate-fade-up-delay-3 mt-6">
          <HeroVisual />
        </div>

        <div className="animate-fade-up animate-fade-up-delay-4 mt-5">
          <ModeToggle />
        </div>
      </section>

      <section className="border-y border-border bg-white px-5 py-5">
        <div className="grid grid-cols-3 gap-4">
          {platformFeatures.map((f) => (
            <div key={f.label} className="text-center">
              <p className="text-[18px] font-bold tracking-tight text-primary">{f.value}</p>
              <p className="mt-0.5 text-[11px] font-semibold text-foreground">{f.label}</p>
              <p className="mt-0.5 text-[9px] text-muted">{f.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-6 pt-7">
        <div className="flex items-end justify-between">
          <div>
            <p className="section-label">LEARNING ROADMAP</p>
            <h2 className="mt-1 text-[16px] font-bold text-foreground">学習ロードマップ</h2>
          </div>
          <div className="text-right">
            <p className="text-[20px] font-bold text-primary">{overall.percent}%</p>
            <p className="text-[9px] text-muted">全体進捗</p>
          </div>
        </div>
        <div className="mt-4">
          <RoadmapTimeline />
        </div>
      </section>

      <section className="px-5 pb-8">
        <p className="section-label">RECOMMENDED</p>
        <h2 className="mt-1 text-[16px] font-bold text-foreground">目的別おすすめLesson</h2>
        <p className="mt-1 text-[11px] text-muted">選択中のモードに合わせて最適な教材を表示</p>
        <div className="mt-4">
          <RecommendedLessons />
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="card-premium overflow-hidden">
          <div className="border-b border-border bg-gradient-to-r from-primary-muted/80 to-white px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="section-label">CONTINUE LEARNING</p>
                <p className="mt-1 text-[15px] font-bold text-foreground">続きから学習</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <span className="text-[13px] font-bold text-primary">{overall.percent}%</span>
              </div>
            </div>
          </div>
          {nextLesson && (
            <Link href={`/learn/${nextLesson.slug}`} className="block p-5">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary px-2.5 py-0.5 text-[9px] font-bold text-white">
                  IN PROGRESS
                </span>
                <span className="text-[10px] text-muted">{nextLesson.duration}</span>
              </div>
              <h3 className="mt-2.5 text-[17px] font-bold leading-snug text-foreground">
                {nextLesson.title}
              </h3>
              <p className="mt-2 text-[12px] leading-relaxed text-muted">{nextLesson.description}</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-primary-muted">
                  <div className="h-full w-[35%] rounded-full bg-primary" />
                </div>
                <span className="text-[11px] font-semibold text-primary">35%</span>
              </div>
              <p className="mt-3 text-[12px] font-semibold text-primary">続きから学習 →</p>
            </Link>
          )}
        </div>
      </section>

      <section className="pb-8">
        <div className="px-5">
          <p className="section-label">VISUAL LIBRARY</p>
          <h2 className="mt-1 text-[16px] font-bold text-foreground">図解・動画教材</h2>
          <p className="mt-1 text-[11px] text-muted">施術理解を深めるビジュアルコンテンツ</p>
        </div>
        <div className="scrollbar-hide mt-4 flex gap-3 overflow-x-auto px-5 pb-1">
          {diagrams.map(({ label, type, desc }) => (
            <div key={label} className="card-soft w-[156px] shrink-0 overflow-hidden">
              <div className="diagram-frame flex h-[108px] items-center justify-center p-3">
                <DiagramIllustration type={type} />
              </div>
              <div className="border-t border-border bg-white px-3.5 py-3">
                <p className="text-[12px] font-bold text-foreground">{label}</p>
                <p className="mt-0.5 text-[10px] text-muted">{desc}</p>
                <div className="mt-2 flex items-center gap-1 text-[9px] text-primary">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  図解 + 動画対応予定
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="flex items-end justify-between">
          <h2 className="text-[16px] font-bold text-foreground">全8カテゴリ</h2>
          <Link href="/learn" className="text-[11px] font-semibold text-primary">すべて見る →</Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/learn/${cat.slug}`} className="card-soft group p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-muted text-primary transition group-active:bg-primary group-active:text-white">
                <CategoryIcon type={cat.icon} className="h-4 w-4" />
              </div>
              <span className="mt-3 inline-flex rounded-md bg-primary-muted px-2 py-0.5 text-[9px] font-bold text-primary">
                Lv.{cat.level}
              </span>
              <p className="mt-2 text-[13px] font-bold leading-snug text-foreground">{cat.title}</p>
              <p className="mt-1 text-[10px] text-muted">{cat.duration}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 pb-8">
        <Link
          href="/ai"
          className="card-premium relative block overflow-hidden p-5"
        >
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5" />
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-[0_8px_20px_-6px_rgb(27_122_90/0.5)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path d="M12 2a4 4 0 014 4v1a4 4 0 01-8 0V6a4 4 0 014-4z" strokeLinecap="round" />
                <rect x="5" y="11" width="14" height="10" rx="3" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="section-label">AI TEACHER</p>
              <h3 className="mt-0.5 text-[16px] font-bold text-foreground">AI先生に質問する</h3>
              <p className="mt-2 text-[12px] leading-relaxed text-muted">
                薬剤の組み合わせ、お客様への説明、営業トークまで。
                美容師・ディーラー向けの回答をその場で確認。
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["髪の成分", "2剤の選び方", "白髪ケア"].map((tag) => (
                  <span key={tag} className="rounded-full bg-primary-muted px-2.5 py-0.5 text-[10px] font-medium text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </section>

      <section className="px-5 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <Link href="/quiz" className="card-soft p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-muted text-primary">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="mt-3 text-[13px] font-bold text-foreground">理解度テスト</p>
            <p className="mt-1 text-[10px] text-muted">40問 · 合格80点</p>
          </Link>
          <Link href="/products" className="card-soft p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-muted text-primary">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M8 2a1 1 0 000 2h1v1a1 1 0 001 1h4a1 1 0 001-1V4h1a1 1 0 100-2H8zM4 6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2H4z" />
              </svg>
            </div>
            <p className="mt-3 text-[13px] font-bold text-foreground">製品理解</p>
            <p className="mt-1 text-[10px] text-muted">OXLONライン全製品</p>
          </Link>
        </div>
      </section>
    </AppShell>
  );
}