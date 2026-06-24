import Link from "next/link";
import { AppShell } from "./components/AppShell";
import { CategoryIcon } from "./components/CategoryIcon";
import { HeroVisual } from "./components/HeroVisual";
import { ModeToggle } from "./components/ModeToggle";
import { AssignmentsPanel } from "./components/AssignmentsPanel";
import { ComplianceFooter } from "./components/ComplianceFooter";
import { ContinueLearningCard } from "./components/ContinueLearningCard";
import { ProgressSummary } from "./components/ProgressSummary";
import { RecommendedLessons } from "./components/RecommendedLessons";
import { RoadmapTimeline } from "./components/RoadmapTimeline";
import { categories } from "@/lib/data/categories";
import { diagramGallery } from "@/lib/content/diagram-images";
import { getDiagramPrompt } from "@/lib/content/diagram-prompts";
import { enterpriseMetrics } from "@/lib/data/enterprise-value";

const platformFeatures = [
  { label: "図解教材", value: "16種", sub: "AI生成済み" },
  { label: "動画対応", value: "8本", sub: "シーン別デモ収録" },
  { label: "AI先生", value: "24h", sub: "現場質問に即回答" },
];

const diagramLabels: Record<string, string> = {
  "hair-cross-section": "髪の断面図",
  cuticle: "キューティクル",
  "hair-internal": "毛髪内部",
  "chemical-reaction": "カラー反応",
  "oxidation-reaction": "酸化反応",
  "alkaline-reaction": "アルカリ反応",
  "scalp-environment": "頭皮構造",
  "color-residue": "カラー残留",
  "gray-mechanism": "白髪メカニズム",
  "customer-scene": "カウンセリング",
  "dealer-scene": "営業提案",
  developer: "オキシ濃度",
  treatment: "施術フロー",
  product: "製品ライン",
  sales: "提案力向上",
  "color-wheel": "カラーホイール",
  "salon-scene": "サロン施術",
};

export default function Home() {
  return (
    <AppShell activeNav="home">
      <section className="page-header relative overflow-hidden">
        <div className="pointer-events-none absolute -right-12 -top-8 h-44 w-44 rounded-full bg-primary-muted/70 blur-3xl" />
        <p className="section-label animate-fade-up">EW-R HAIR SCIENCE ACADEMY</p>
        <h1 className="text-display animate-fade-up animate-fade-up-delay-1">
          学ぶ · 理解する ·
          <br />
          <span className="text-primary">活かす · 提案する</span>
        </h1>
        <p className="page-desc animate-fade-up animate-fade-up-delay-2">
          美容師とディーラーのための企業向け教育プラットフォーム。
          ストーリー型Mission・図解教材・AIアシスタントで、現場と営業の質を変えます。
        </p>
        <div className="animate-fade-up animate-fade-up-delay-3 mt-6">
          <HeroVisual />
        </div>
        <div className="animate-fade-up animate-fade-up-delay-4 mt-5">
          <ModeToggle />
        </div>
      </section>

      <section className="border-y border-border bg-white px-[var(--page-x)] py-5">
        <div className="grid grid-cols-3 gap-3">
          {platformFeatures.map((f) => (
            <div key={f.label} className="metric-card py-3">
              <p className="metric-hero-value text-[1.125rem]">{f.value}</p>
              <p className="mt-0.5 text-[11px] font-semibold text-foreground">{f.label}</p>
              <p className="metric-label">{f.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section pt-7">
        <div className="section-heading-row">
          <div>
            <p className="section-label">LEARNING ROADMAP</p>
            <h2 className="section-title">学習ロードマップ</h2>
          </div>
          <ProgressSummary variant="inline" />
        </div>
        <div className="mt-4">
          <RoadmapTimeline />
        </div>
      </section>

      <section className="page-section">
        <p className="section-label">RECOMMENDED</p>
        <h2 className="section-title">目的別おすすめLesson</h2>
        <p className="mt-1 text-[11px] text-muted">選択中のモードに合わせて最適な教材を表示</p>
        <div className="mt-4">
          <RecommendedLessons />
        </div>
      </section>

      <section className="page-section">
        <AssignmentsPanel compact />
      </section>

      <section className="page-section">
        <ContinueLearningCard />
      </section>

      <section className="page-section">
        <Link href="/enterprise" className="card-premium card-interactive block p-5">
          <p className="section-label">FOR ENTERPRISE</p>
          <h3 className="section-title">企業導入の価値</h3>
          <p className="mt-2 text-[12px] text-muted">
            教育コスト{enterpriseMetrics.roi[0].value}削減 · 提案品質{enterpriseMetrics.roi[1].value}向上
          </p>
          <p className="btn-ghost mt-2">経営・教育・営業の成果 →</p>
        </Link>
      </section>

      <section className="page-section">
        <p className="section-label">VISUAL LIBRARY</p>
        <h2 className="section-title">図解・動画教材</h2>
        <p className="mt-1 text-[11px] text-muted">全16種 · AI生成図解ライブラリ</p>
        <div className="scrollbar-hide mt-4 flex gap-3 overflow-x-auto pb-1">
          {diagramGallery.map(({ type, url }) => {
            const label = diagramLabels[type] ?? type;
            const alt = getDiagramPrompt(type).alt;
            return (
              <div key={type} className="card-soft w-[148px] shrink-0 overflow-hidden">
                <div className="diagram-frame h-[108px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={alt} className="h-full w-full object-cover" />
                </div>
                <div className="border-t border-border bg-white px-3 py-2.5">
                  <p className="text-[11px] font-bold text-foreground">{label}</p>
                  <p className="mt-0.5 line-clamp-2 text-[9px] leading-relaxed text-muted">{alt}</p>
                  <span className="badge-muted mt-1.5">AI図解</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading-row">
          <h2 className="section-title">全8カテゴリ</h2>
          <Link href="/learn" className="btn-ghost text-[11px]">すべて見る →</Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/learn/${cat.slug}`} className="card-soft card-interactive group p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-muted text-primary transition group-active:bg-primary group-active:text-white">
                <CategoryIcon type={cat.icon} className="h-4 w-4" />
              </div>
              <span className="badge-muted mt-3">Lv.{cat.level}</span>
              <p className="mt-2 text-[13px] font-bold leading-snug text-foreground">{cat.title}</p>
              <p className="mt-1 text-[10px] text-muted">{cat.duration}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-section">
        <Link href="/ai" className="card-premium card-interactive relative block overflow-hidden p-5">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5" />
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-[var(--shadow-primary)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path d="M12 2a4 4 0 014 4v1a4 4 0 01-8 0V6a4 4 0 014-4z" strokeLinecap="round" />
                <rect x="5" y="11" width="14" height="10" rx="3" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="section-label">AI TEACHER</p>
              <h3 className="section-title">AI先生に質問する</h3>
              <p className="mt-2 text-[12px] leading-relaxed text-muted">
                薬剤の組み合わせ、お客様への説明、営業トークまで。
                美容師・ディーラー向けの回答をその場で確認。
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["髪の成分", "2剤の選び方", "白髪ケア"].map((tag) => (
                  <span key={tag} className="badge-muted">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </section>

      <section className="page-section pb-6">
        <div className="grid grid-cols-2 gap-3">
          <Link href="/quiz" className="card-soft card-interactive p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-muted text-primary">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="mt-3 text-[13px] font-bold text-foreground">理解度テスト</p>
            <p className="mt-1 text-[10px] text-muted">40問 · 合格80点</p>
          </Link>
          <Link href="/products" className="card-soft card-interactive p-4">
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

      <ComplianceFooter />
    </AppShell>
  );
}