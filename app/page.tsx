import Link from "next/link";
import { AppShell } from "./components/AppShell";
import { CategoryIcon } from "./components/CategoryIcon";
import { DiagramIllustration } from "./components/DiagramIllustration";
import { categories } from "@/lib/data/categories";
import { demoProgress, getOverallProgress } from "@/lib/data/progress";
import { getLessonBySlug } from "@/lib/data/lessons";

const audienceCards = [
  {
    role: "美容師向け",
    description: "カウンセリング・施術・ホームケア提案に活かす学習コース",
    href: "/learn",
    accent: "from-primary-muted to-white",
    icon: "customer",
  },
  {
    role: "ディーラー向け",
    description: "製品特性・成分・提案トークを現場で説明できる知識を習得",
    href: "/products",
    accent: "from-[#edf7f3] to-white",
    icon: "sales",
  },
];

const diagrams = [
  { label: "髪の断面図", type: "hair-cross-section" as const },
  { label: "キューティクル", type: "cuticle" as const },
  { label: "薬剤反応", type: "chemical-reaction" as const },
  { label: "頭皮環境", type: "scalp-environment" as const },
];

export default function Home() {
  const overall = getOverallProgress();
  const nextLesson = getLessonBySlug(demoProgress.nextLessonSlug);

  return (
    <AppShell activeNav="home">
      <section className="relative overflow-hidden px-5 pb-8 pt-7">
        <div className="pointer-events-none absolute -right-10 -top-6 h-40 w-40 rounded-full bg-primary-muted/80 blur-2xl" />
        <p className="animate-fade-up text-[10px] font-semibold tracking-[0.2em] text-primary">
          EW-R HAIR SCIENCE
        </p>
        <h1 className="animate-fade-up animate-fade-up-delay-1 mt-3 text-[26px] font-bold leading-[1.35] tracking-tight text-foreground">
          髪を理解すれば、
          <br />
          提案が変わる。
        </h1>
        <p className="animate-fade-up animate-fade-up-delay-2 mt-4 text-[14px] leading-[1.75] text-muted">
          美容師とディーラーのための、髪・頭皮・薬剤・製品理解の学習プラットフォーム
        </p>
        <Link
          href="/learn"
          className="animate-fade-up animate-fade-up-delay-3 mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgb(27_122_90/0.45)] transition active:scale-[0.98]"
        >
          学習を始める
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </section>

      <section className="border-b border-border bg-white px-5 py-5">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-lg font-bold text-foreground">{overall.percent}%</p>
            <p className="text-[10px] text-muted">学習進捗</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">40+</p>
            <p className="text-[10px] text-muted">教材問題</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">8</p>
            <p className="text-[10px] text-muted">学習カテゴリ</p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-8 pt-6">
        <h2 className="text-[13px] font-semibold text-foreground">あなたの役割を選ぶ</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {audienceCards.map((card) => (
            <Link
              key={card.role}
              href={card.href}
              className={`card-soft flex flex-col bg-gradient-to-br ${card.accent} p-4`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                <CategoryIcon type={card.icon} className="h-5 w-5" />
              </div>
              <p className="mt-3 text-[13px] font-bold text-foreground">{card.role}</p>
              <p className="mt-1.5 flex-1 text-[11px] leading-relaxed text-muted">{card.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="flex items-end justify-between">
          <h2 className="text-[13px] font-semibold text-foreground">学習カテゴリー</h2>
          <Link href="/learn" className="text-[11px] text-primary">すべて見る</Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/learn/${cat.slug}`} className="card-soft p-4">
              <span className="inline-flex rounded-lg bg-primary-muted px-2 py-0.5 text-[10px] font-semibold text-primary">
                Lv.{cat.level}
              </span>
              <p className="mt-2.5 text-[13px] font-semibold leading-snug text-foreground">{cat.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="pb-8">
        <div className="px-5">
          <h2 className="text-[13px] font-semibold text-foreground">図解ライブラリ</h2>
          <p className="mt-1 text-[11px] text-muted">※ Grok生成画像に差し替え予定</p>
        </div>
        <div className="scrollbar-hide mt-3 flex gap-3 overflow-x-auto px-5 pb-1">
          {diagrams.map(({ label, type }) => (
            <div key={label} className="card-soft diagram-placeholder w-[148px] shrink-0 overflow-hidden">
              <div className="flex h-[100px] items-center justify-center p-2">
                <DiagramIllustration type={type} />
              </div>
              <div className="border-t border-border bg-white px-3 py-2.5">
                <p className="text-[12px] font-semibold text-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-8">
        <h2 className="text-[13px] font-semibold text-foreground">今日のおすすめLesson</h2>
        {nextLesson && (
          <Link href={`/learn/${nextLesson.slug}`} className="card-soft mt-3 block overflow-hidden">
            <div className="bg-gradient-to-r from-primary-muted to-[#f0f9f6] px-4 py-3">
              <span className="text-[10px] font-semibold tracking-wider text-primary">RECOMMENDED</span>
            </div>
            <div className="p-4">
              <p className="text-[11px] font-medium text-primary">{nextLesson.title}</p>
              <h3 className="mt-1 text-[15px] font-bold leading-snug text-foreground">
                頭皮環境を整えるケアの考え方
              </h3>
              <p className="mt-2 text-[12px] leading-relaxed text-muted">
                健やかな髪を育むためのホームケア提案のポイントを学びます。
              </p>
              <p className="mt-3 text-[11px] font-semibold text-primary">続きから学習 →</p>
            </div>
          </Link>
        )}
      </section>

      <section className="px-5 pb-5">
        <div className="grid grid-cols-2 gap-3">
          <Link href="/quiz" className="card-soft p-4 text-center">
            <p className="text-[12px] font-bold text-foreground">Quiz</p>
            <p className="mt-1 text-[10px] text-muted">理解度テスト</p>
          </Link>
          <Link href="/ai" className="card-soft p-4 text-center">
            <p className="text-[12px] font-bold text-foreground">AI先生</p>
            <p className="mt-1 text-[10px] text-muted">質問に回答</p>
          </Link>
        </div>
      </section>

      <section className="px-5 pb-6">
        <Link href="/ai" className="card-soft relative block overflow-hidden bg-gradient-to-br from-[#edf7f3] via-white to-white p-5">
          <p className="text-[10px] font-semibold tracking-wider text-primary">AI TEACHER</p>
          <h3 className="mt-0.5 text-[15px] font-bold text-foreground">AI先生に質問する</h3>
          <p className="mt-2 text-[12px] leading-relaxed text-muted">
            薬剤の組み合わせや、お客様への説明の仕方など、現場の疑問をその場で確認できます。
          </p>
          <span className="mt-3 inline-flex text-[12px] font-semibold text-primary">会話を始める →</span>
        </Link>
      </section>
    </AppShell>
  );
}