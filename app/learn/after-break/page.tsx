import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { AfterBreakFlowDiagram } from "@/app/components/AfterBreakFlowDiagram";
import { DiagramIllustration } from "@/app/components/DiagramIllustration";
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
      <header className="guide-hero">
        <Link href="/learn" className="back-link">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Missionへ戻る
        </Link>
        <h1 className="guide-hero-title mt-6">アフターブレイクを構造的に理解する</h1>
        <p className="guide-hero-desc">
          毛髪の構造と、施術後に残りやすい成分の関係を整理した学習ページです。
          上から順にお読みいただくと、製品の位置づけまでつながって理解できます。
        </p>
      </header>

      <article className="guide-body">
        <section className="guide-chapter">
          <p className="guide-lead">{afterBreakSummary.oneLiner}</p>
          <p className="guide-lead">
            カラーやパーマのあと、髪や頭皮に残りやすいのは
            {afterBreakSummary.targets.map((t, i) => (
              <span key={t}>
                {i > 0 && (i === afterBreakSummary.targets.length - 1 ? "、そして" : "、")}
                <strong>{t}</strong>
              </span>
            ))}
            です。シャンプーに混ぜて洗う工程のなかで、これらをまとめて処理する設計になっています。
          </p>
          <p className="guide-lead">
            使い方は、シャンプー1プッシュに対して本品1プッシュ。別工程を増やさず、いつもの洗髪に組み込めます。
          </p>
          <div className="guide-callout">
            <p className="guide-callout-title">「修復」という言葉の捉え方</p>
            <p className="guide-callout-body">{afterBreakSummary.notClaim}</p>
          </div>
        </section>

        <section className="guide-chapter">
          <p className="guide-chapter-num">目次</p>
          <h2 className="guide-chapter-title">このページの読み方</h2>
          <p className="guide-chapter-intro">
            まず髪の構造を押さえ、つづいて施術後の残留物と製品の役割へ進みます。
          </p>
          <ol className="guide-index">
            {learningPath.map((step) => (
              <li key={step.step}>
                <span className="guide-index-num">{step.step}</span>
                <div className="guide-index-text">
                  <p className="guide-index-title">{step.title}</p>
                  <p className="guide-index-desc">{step.focus}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="guide-chapter" id="hair-structure">
          <p className="guide-chapter-num">第1章</p>
          <h2 className="guide-chapter-title">髪の三層構造</h2>
          <p className="guide-chapter-intro">
            髪は「外側の保護層」「内側の本体」「中心の芯」の三層でできています。
            どの層に何が起きるかを知ると、施術後の変化の説明がしやすくなります。
          </p>
          <figure className="guide-figure">
            <div className="guide-figure-visual aspect-[4/3]">
              <DiagramIllustration type="hair-cross-section" />
            </div>
            <figcaption className="guide-figure-caption">
              断面図：外側がキューティクル、中間がコルテックス、中心がメデュラ
            </figcaption>
          </figure>
          {hairLayers.map((layer) => (
            <div key={layer.name} className="guide-item">
              <h3 className="guide-item-title">{layer.name}</h3>
              <p className="guide-item-meta">{layer.location}</p>
              <p className="guide-item-body">{layer.role}</p>
              <p className="guide-item-aside">たとえるなら、{layer.image}。</p>
            </div>
          ))}
          <p className="guide-prose">
            毛髪全体の主成分はケラチンというタンパク質です。シスチンを多く含むことが、丈夫さや弾力につながります。
          </p>
        </section>

        <section className="guide-chapter" id="bonds">
          <p className="guide-chapter-num">第2章</p>
          <h2 className="guide-chapter-title">4つの結合</h2>
          <p className="guide-chapter-intro">
            髪の形や強さは、分子どうしの「つながり」で保たれています。
            どのつながりが切れやすいかによって、濡れたとき・乾いたとき・薬剤をつけたときの違いが生まれます。
          </p>
          {hairBonds.map((bond) => (
            <div key={bond.name} className="guide-item">
              <h3 className="guide-item-title">{bond.name}</h3>
              <p className="guide-item-body">
                {bond.role}。{bond.trigger}によって変化しやすく、{bond.recovery}
              </p>
            </div>
          ))}
        </section>

        <section className="guide-chapter" id="moisture-ph">
          <p className="guide-chapter-num">第3章</p>
          <h2 className="guide-chapter-title">水分とpH</h2>
          <div className="guide-prose">
            <p>{moisturePh.moisture}</p>
            <p>{moisturePh.ph}</p>
            <p>{moisturePh.aftercare}</p>
          </div>
        </section>

        <section className="guide-chapter" id="functional-blocks">
          <p className="guide-chapter-num">第4章</p>
          <h2 className="guide-chapter-title">アフターブレイクの機能構造</h2>
          <p className="guide-chapter-intro">
            この製品は、残留物の性質ごとに成分を割り当てた「機能構造」で設計されています。
            機械のような物理構造ではなく、化学的な後処理と、洗い心地の配慮が組み合わさった処方です。
          </p>
          {functionalBlocks.map((block) => (
            <div key={block.block} className="guide-item">
              <h3 className="guide-item-title">{block.block}</h3>
              <p className="guide-item-meta">
                対象：{block.target}　／　{block.ingredients}
              </p>
              <p className="guide-item-body">{block.simple}</p>
              <p className="guide-item-meta">（{block.note}）</p>
            </div>
          ))}
        </section>

        <section className="guide-chapter" id="process-flow">
          <p className="guide-chapter-num">第5章</p>
          <h2 className="guide-chapter-title">施術後の流れ</h2>
          <p className="guide-chapter-intro">
            カラーやパーマのあとに何が残り、それぞれをどう処理するのかを、一本の流れで整理します。
          </p>
          <figure className="guide-figure p-3">
            <AfterBreakFlowDiagram />
          </figure>
        </section>

        <section className="guide-chapter" id="residue">
          <p className="guide-chapter-num">第6章</p>
          <h2 className="guide-chapter-title">残留物と毛髪理論の接点</h2>
          <p className="guide-chapter-intro">
            残留、pHの立て直し、酸化の後始末、摩擦の低減——この四つが、アフターブレイクを理解するうえでの軸になります。
          </p>
          <div className="guide-faq">
            {residueConnections.map((row) => (
              <details key={row.factor}>
                <summary>{row.factor}</summary>
                <p>
                  主に{row.area}に関わり、{row.effect}。
                  アフターブレイクでは{row.response}。
                  ただし、{row.limit}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="guide-chapter" id="color-vs-perm">
          <p className="guide-chapter-num">第7章</p>
          <h2 className="guide-chapter-title">カラーとパーマの違い</h2>
          <p className="guide-chapter-intro">
            どちらも表面と内部の両方に影響しますが、目立ちやすい負担の場所は少し異なります。
            カラーは外壁が荒れやすく、パーマは本体の結び目が変わりやすい——この整理で大きく外しません。
          </p>
          {colorVsPerm.map((row) => (
            <div key={row.label} className="guide-compare-row">
              <p className="guide-compare-label">{row.label}</p>
              <div className="guide-compare-cols">
                <div className="guide-compare-col">
                  <span>ヘアカラー</span>
                  {row.color}
                </div>
                <div className="guide-compare-col">
                  <span>パーマ</span>
                  {row.perm}
                </div>
              </div>
              <p className="guide-compare-foot">アフターブレイクの位置づけ：{row.afterBreak}</p>
            </div>
          ))}
        </section>

        <section className="guide-chapter" id="misconceptions">
          <p className="guide-chapter-num">第8章</p>
          <h2 className="guide-chapter-title">よくある誤解</h2>
          <div className="guide-faq">
            {misconceptions.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="guide-chapter" id="practice">
          <p className="guide-chapter-num">第9章</p>
          <h2 className="guide-chapter-title">確認してみる</h2>
          <p className="guide-chapter-intro">
            読み終えたら、自分の言葉で説明できるか確かめてみてください。
          </p>
          <div className="guide-practice">
            {practiceQuestions.map((q, i) => (
              <details key={q.id}>
                <summary>問{i + 1}　{q.question}</summary>
                <p className="guide-practice-answer">{q.hint}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="guide-chapter">
          <p className="guide-chapter-num">おわりに</p>
          <h2 className="guide-chapter-title">説明するときの注意</h2>
          <div className="guide-prose">
            <p>
              「髪を再生する」「S-S結合を修復する」といった断定表現は使わないでください。
              残留物の処理、後ダメージの抑制、使用感の改善——この枠組みでお伝えするのが適切です。
            </p>
            <p>
              公式に記載のない試験データや濃度を、推測で補うことも避けてください。
              書かれていることと、学術的に確実なことは、きちんと分けて説明しましょう。
            </p>
          </div>
        </section>

        <footer className="guide-footer-links space-y-3">
          <Link href="/products/oxlon-after-break" className="btn-primary">
            OXLON After Break の製品情報
          </Link>
          <Link href="/learn/treatment-aftercare" className="btn-secondary">
            施術後ケアのMissionへ
          </Link>
          <Link href="/learn/ewr-products" className="btn-secondary">
            EW-R製品のMissionへ
          </Link>
          <Link href="/glossary" className="btn-ghost flex w-full justify-center py-2">
            用語集を見る
          </Link>
        </footer>
      </article>
    </AppShell>
  );
}