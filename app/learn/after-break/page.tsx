import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { AfterBreakFlowDiagram } from "@/app/components/AfterBreakFlowDiagram";
import { DiagramIllustration } from "@/app/components/DiagramIllustration";
import { PageHeader } from "@/app/components/PageHeader";
import {
  afterBreakSummary,
  colorVsPerm,
  functionalBlocks,
  hairBonds,
  hairLayers,
  learningPath,
  misconceptions,
  moisturePh,
  practiceQuestions,
  residueConnections,
} from "@/lib/content/after-break-guide";

export default function AfterBreakGuidePage() {
  return (
    <AppShell activeNav="learn">
      <PageHeader
        backHref="/learn"
        backLabel="Mission"
        label="STUDY GUIDE"
        title="アフターブレイクを構造的に理解する"
        description="高校生でもわかるレベルで、毛髪理論と製品の機能構造を段階的に学べます。"
        badge="基礎"
      />

      <section className="page-section pt-0">
        <div className="card-premium p-5">
          <p className="section-label">ONE SENTENCE</p>
          <p className="mt-2 text-[15px] font-bold leading-snug text-foreground">
            {afterBreakSummary.oneLiner}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {afterBreakSummary.targets.map((t) => (
              <span key={t} className="badge-primary">{t}</span>
            ))}
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-muted">
            使い方：<strong className="text-foreground">{afterBreakSummary.usage}</strong>
          </p>
          <div className="compliance-note mt-4">
            <p className="font-semibold text-foreground">「修復」の正しい理解</p>
            <p className="mt-1.5">{afterBreakSummary.notClaim}</p>
          </div>
        </div>
      </section>

      <section className="page-section">
        <p className="section-label">LEARNING PATH</p>
        <h2 className="section-title">学習の順番</h2>
        <p className="mt-1 text-[11px] text-muted">上から順に読むと、知識がつながりやすくなります。</p>
        <div className="mt-3 space-y-2">
          {learningPath.map((step) => (
            <div key={step.step} className="flow-step">
              <span className="flow-step-num">{step.step}</span>
              <div>
                <p className="text-[13px] font-bold text-foreground">{step.title}</p>
                <p className="mt-0.5 text-[11px] text-muted">{step.focus}</p>
                <p className="mt-1 text-[10px] font-medium text-primary">ゴール：{step.goal}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section" id="hair-structure">
        <p className="section-label">STEP 01</p>
        <h2 className="section-title">髪の三層構造</h2>
        <div className="card-soft mt-3 overflow-hidden">
          <div className="aspect-[4/3] bg-primary-muted/30 p-4">
            <DiagramIllustration type="hair-cross-section" />
          </div>
          <div className="divide-y divide-border-subtle">
            {hairLayers.map((layer) => (
              <div key={layer.name} className="p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-[14px] font-bold text-foreground">{layer.name}</h3>
                  <span className="badge-muted">{layer.location}</span>
                </div>
                <p className="mt-1.5 text-[12px] leading-relaxed text-foreground">{layer.role}</p>
                <p className="mt-2 rounded-lg bg-primary-muted/40 px-3 py-2 text-[11px] text-primary">
                  イメージ：{layer.image}
                </p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-muted">
          主成分は<strong className="text-foreground">ケラチン</strong>（タンパク質）で、シスチンが多いことが丈夫さにつながります。
        </p>
      </section>

      <section className="page-section" id="bonds">
        <p className="section-label">STEP 02</p>
        <h2 className="section-title">4つの結合</h2>
        <p className="mt-1 text-[11px] text-muted">
          髪はたくさんの「分子の手つなぎ」で形を保っています。どの手つなぎが切れやすいかが、濡れたとき・薬剤をつけたときの違いになります。
        </p>
        <div className="mt-3 space-y-2">
          {hairBonds.map((bond) => (
            <div key={bond.name} className="card-soft p-4">
              <h3 className="text-[14px] font-bold text-primary">{bond.name}</h3>
              <dl className="mt-2 space-y-1.5 text-[11px]">
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0 font-semibold text-muted">役割</dt>
                  <dd className="text-foreground">{bond.role}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0 font-semibold text-muted">変化要因</dt>
                  <dd className="text-foreground">{bond.trigger}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0 font-semibold text-muted">戻りやすさ</dt>
                  <dd className="text-foreground">{bond.recovery}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section" id="moisture-ph">
        <p className="section-label">STEP 03</p>
        <h2 className="section-title">水分とpH</h2>
        <div className="mt-3 space-y-2">
          <div className="card-soft p-4">
            <span className="badge-muted">水分</span>
            <p className="mt-2 text-[12px] leading-relaxed text-foreground">{moisturePh.moisture}</p>
          </div>
          <div className="card-soft p-4">
            <span className="badge-muted">pH</span>
            <p className="mt-2 text-[12px] leading-relaxed text-foreground">{moisturePh.ph}</p>
          </div>
          <div className="card-soft border-primary/20 bg-primary-muted/20 p-4">
            <span className="badge-primary">施術後</span>
            <p className="mt-2 text-[12px] leading-relaxed text-foreground">{moisturePh.aftercare}</p>
          </div>
        </div>
      </section>

      <section className="page-section" id="functional-blocks">
        <p className="section-label">STEP 04–05</p>
        <h2 className="section-title">アフターブレイクの機能構造</h2>
        <p className="mt-1 text-[11px] text-muted">
          物理的な機械構造ではなく、残留物ごとに成分群を割り当てた「機能構造」です。
        </p>
        <div className="mt-3 space-y-2">
          {functionalBlocks.map((block) => (
            <div key={block.block} className="card-soft p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[13px] font-bold text-foreground">{block.block}</h3>
                <span className="badge-primary">{block.target}</span>
              </div>
              <p className="mt-2 text-[11px] font-medium text-primary">{block.ingredients}</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-foreground">{block.simple}</p>
              <p className="mt-2 text-[10px] text-muted">※ {block.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section" id="process-flow">
        <p className="section-label">FLOW</p>
        <h2 className="section-title">工程フロー</h2>
        <p className="mt-1 text-[11px] text-muted">理科の反応経路図のように、「何が残るか」と「どう対応するか」を見ます。</p>
        <div className="card-soft mt-3 p-3">
          <AfterBreakFlowDiagram />
        </div>
      </section>

      <section className="page-section" id="residue">
        <p className="section-label">THEORY LINK</p>
        <h2 className="section-title">残留物と毛髪理論の接点</h2>
        <p className="mt-1 text-[11px] text-muted">キーワード：残留 · pHの立て直し · 酸化の後始末 · 摩擦の低減</p>
        <div className="mt-3 space-y-2">
          {residueConnections.map((row) => (
            <details key={row.factor} className="faq-item">
              <summary>{row.factor}</summary>
              <div className="space-y-2 text-[11px] leading-relaxed">
                <p><strong>関わる部位：</strong>{row.area}</p>
                <p><strong>起こりやすいこと：</strong>{row.effect}</p>
                <p><strong>アフターブレイクの対応：</strong>{row.response}</p>
                <p className="rounded-lg bg-danger-muted/50 px-2.5 py-2 text-muted">
                  <strong className="text-foreground">限界の見方：</strong>{row.limit}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="page-section" id="color-vs-perm">
        <p className="section-label">COMPARE</p>
        <h2 className="section-title">カラー vs パーマ</h2>
        <p className="mt-1 text-[11px] text-muted">
          覚え方：カラーは外壁が荒れやすく、パーマは本体の結び目が変わりやすい。
        </p>
        <div className="mt-3 overflow-hidden rounded-2xl border border-border-subtle bg-white">
          <div className="grid grid-cols-3 gap-px bg-border-subtle text-center text-[9px] font-bold">
            <div className="bg-primary-muted/50 px-2 py-2.5 text-primary">比較項目</div>
            <div className="bg-primary-muted/50 px-2 py-2.5 text-primary">ヘアカラー</div>
            <div className="bg-primary-muted/50 px-2 py-2.5 text-primary">パーマ</div>
          </div>
          {colorVsPerm.map((row) => (
            <div key={row.label} className="border-t border-border-subtle">
              <p className="bg-background px-3 py-2 text-[10px] font-bold text-muted">{row.label}</p>
              <div className="grid grid-cols-2 gap-2 px-3 pb-3">
                <div className="rounded-lg bg-primary-muted/30 p-2.5 text-[10px] leading-relaxed">{row.color}</div>
                <div className="rounded-lg bg-gold-muted/60 p-2.5 text-[10px] leading-relaxed">{row.perm}</div>
              </div>
              <p className="border-t border-border-subtle bg-success-muted/40 px-3 py-2 text-[10px] leading-relaxed text-primary">
                After Break：{row.afterBreak}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section" id="misconceptions">
        <p className="section-label">Q&A</p>
        <h2 className="section-title">よくある誤解</h2>
        <div className="mt-3 space-y-2">
          {misconceptions.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="page-section" id="practice">
        <p className="section-label">PRACTICE</p>
        <h2 className="section-title">練習問題</h2>
        <p className="mt-1 text-[11px] text-muted">答えを見る前に、自分の言葉で説明してみましょう。</p>
        <div className="mt-3 space-y-2">
          {practiceQuestions.map((q, i) => (
            <details key={q.id} className="card-soft p-0 overflow-hidden">
              <summary className="cursor-pointer px-4 py-3.5 text-[13px] font-semibold text-foreground">
                問題{i + 1}：{q.question}
              </summary>
              <div className="border-t border-border-subtle bg-primary-muted/20 px-4 py-3">
                <p className="text-[10px] font-bold text-primary">模範解答の方向性</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-foreground">{q.hint}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="page-section">
        <p className="section-label">COMPLIANCE</p>
        <h2 className="section-title">表現上の注意</h2>
        <ul className="compliance-note mt-3 space-y-2.5">
          <li className="flex gap-2.5">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-white">✓</span>
            <span>「髪を再生する」「S-S結合を修復する」などの断定表現は使わない</span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-white">✓</span>
            <span>「残留物の処理」「後ダメージの抑制」「使用感の改善」という枠組みで説明する</span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-white">✓</span>
            <span>公式に書かれていない試験データや濃度は、推測で補わない</span>
          </li>
        </ul>
      </section>

      <section className="page-section pb-8 space-y-3">
        <Link href="/products/oxlon-after-break" className="btn-primary">
          OXLON After Break 製品ページ
        </Link>
        <Link href="/learn/treatment-aftercare" className="btn-secondary">
          関連Mission：施術後ケア
        </Link>
        <Link href="/learn/ewr-products" className="btn-secondary">
          関連Mission：EW-R製品
        </Link>
        <Link href="/glossary" className="btn-ghost flex w-full justify-center py-2">
          用語集で復習する →
        </Link>
      </section>
    </AppShell>
  );
}