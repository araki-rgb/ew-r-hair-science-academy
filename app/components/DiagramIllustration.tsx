import type { DiagramType } from "@/lib/types";

export function DiagramIllustration({ type }: { type: DiagramType }) {
  switch (type) {
    case "hair-cross-section":
      return <HairCrossSection />;
    case "cuticle":
      return <CuticleDiagram />;
    case "chemical-reaction":
    case "oxidation-reaction":
      return <ChemicalReaction />;
    case "alkaline-reaction":
      return <CuticleDiagram />;
    case "hair-internal":
      return <HairCrossSection />;
    case "salon-scene":
      return <CustomerScene />;
    case "scalp-environment":
      return <ScalpEnvironment />;
    case "color-residue":
      return <ColorResidue />;
    case "gray-mechanism":
      return <GrayMechanism />;
    case "customer-scene":
      return <CustomerScene />;
    case "dealer-scene":
      return <DealerScene />;
    case "developer":
      return <DeveloperDiagram />;
    case "treatment":
      return <TreatmentDiagram />;
    case "product":
      return <ProductDiagram />;
    case "sales":
      return <SalesDiagram />;
    case "color-wheel":
      return <ColorWheel />;
    default:
      return <HairCrossSection />;
  }
}

function HairCrossSection() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" aria-hidden>
      <ellipse cx="120" cy="120" rx="56" ry="84" fill="#f0f9f6" stroke="#c5e6d8" strokeWidth="2" />
      <ellipse cx="120" cy="120" rx="40" ry="64" fill="#a8d5c4" />
      <ellipse cx="120" cy="120" rx="22" ry="36" fill="#6bb896" />
      <ellipse cx="120" cy="120" rx="8" ry="14" fill="#1b7a5a" />
      <text x="200" y="60" fill="#1b7a5a" fontSize="11" fontWeight="600">キューティクル</text>
      <text x="200" y="120" fill="#1b7a5a" fontSize="11" fontWeight="600">コルテックス</text>
      <text x="200" y="180" fill="#1b7a5a" fontSize="11" fontWeight="600">メデュラ</text>
    </svg>
  );
}

function CuticleDiagram() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" aria-hidden>
      <rect x="60" y="40" width="200" height="160" rx="12" fill="#e8f5f0" />
      {Array.from({ length: 10 }).map((_, i) => (
        <path key={i} d={`M70 ${55 + i * 14} Q160 ${48 + i * 14} 250 ${55 + i * 14}`} fill="none" stroke="#2d9b75" strokeWidth="2.5" />
      ))}
      <text x="160" y="220" textAnchor="middle" fill="#6b7c78" fontSize="10">鱗片状のキューティクル層</text>
    </svg>
  );
}

function ChemicalReaction() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" aria-hidden>
      <circle cx="90" cy="100" r="28" fill="#b8e0d0" stroke="#1b7a5a" strokeWidth="2" />
      <text x="90" y="105" textAnchor="middle" fill="#1b7a5a" fontSize="11">1剤</text>
      <circle cx="230" cy="100" r="28" fill="#b8e0d0" stroke="#1b7a5a" strokeWidth="2" />
      <text x="230" y="105" textAnchor="middle" fill="#1b7a5a" fontSize="11">2剤</text>
      <line x1="118" y1="100" x2="202" y2="100" stroke="#2d9b75" strokeWidth="2" strokeDasharray="5 4" />
      <rect x="130" y="150" width="60" height="40" rx="8" fill="#1b7a5a" opacity="0.7" />
      <text x="160" y="175" textAnchor="middle" fill="white" fontSize="10">反応</text>
    </svg>
  );
}

function ScalpEnvironment() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" aria-hidden>
      <rect x="40" y="130" width="240" height="20" rx="6" fill="#c5e6d8" />
      <rect x="40" y="150" width="240" height="16" rx="4" fill="#8ecdb0" />
      <rect x="40" y="166" width="240" height="12" rx="4" fill="#4db88a" />
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={i} x1={70 + i * 28} y1="80" x2={62 + i * 28} y2="130" stroke="#2d9b75" strokeWidth="2.5" strokeLinecap="round" />
      ))}
      <text x="160" y="210" textAnchor="middle" fill="#6b7c78" fontSize="10">頭皮環境と毛髪の根元</text>
    </svg>
  );
}

function ColorResidue() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" aria-hidden>
      <ellipse cx="160" cy="120" rx="50" ry="80" fill="#e8f5f0" stroke="#2d9b75" strokeWidth="2" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={120 + i * 40} cy={160 - i * 20} r="8" fill="#a8d5c4" opacity="0.8" />
      ))}
      <text x="160" y="220" textAnchor="middle" fill="#6b7c78" fontSize="10">施術後の残留物イメージ</text>
    </svg>
  );
}

function GrayMechanism() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" aria-hidden>
      <ellipse cx="100" cy="120" rx="30" ry="50" fill="#d4d4d4" />
      <ellipse cx="160" cy="120" rx="30" ry="50" fill="#9ca3af" />
      <ellipse cx="220" cy="120" rx="30" ry="50" fill="#1f2937" />
      <text x="100" y="190" textAnchor="middle" fill="#6b7c78" fontSize="9">メラニン多</text>
      <text x="160" y="190" textAnchor="middle" fill="#6b7c78" fontSize="9">減少</text>
      <text x="220" y="190" textAnchor="middle" fill="#6b7c78" fontSize="9">白髪化</text>
      <text x="160" y="220" textAnchor="middle" fill="#6b7c78" fontSize="10">エイジングケア視点</text>
    </svg>
  );
}

function CustomerScene() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" aria-hidden>
      <rect x="40" y="60" width="240" height="140" rx="16" fill="#e8f5f0" />
      <circle cx="120" cy="120" r="24" fill="#c5e6d8" />
      <rect x="170" y="100" width="80" height="50" rx="8" fill="white" stroke="#2d9b75" strokeWidth="1.5" />
      <text x="210" y="130" textAnchor="middle" fill="#1b7a5a" fontSize="10">カウンセリング</text>
      <text x="160" y="220" textAnchor="middle" fill="#6b7c78" fontSize="10">お客様説明シーン</text>
    </svg>
  );
}

function DealerScene() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" aria-hidden>
      <rect x="30" y="70" width="120" height="100" rx="12" fill="#e8f5f0" />
      <rect x="170" y="70" width="120" height="100" rx="12" fill="#d4ebe3" />
      <text x="90" y="125" textAnchor="middle" fill="#1b7a5a" fontSize="10">ディーラー</text>
      <text x="230" y="125" textAnchor="middle" fill="#1b7a5a" fontSize="10">サロン</text>
      <path d="M150 120 L170 120" stroke="#2d9b75" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="160" y="220" textAnchor="middle" fill="#6b7c78" fontSize="10">営業提案シーン</text>
    </svg>
  );
}

function DeveloperDiagram() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" aria-hidden>
      <rect x="60" y="50" width="50" height="140" rx="8" fill="#e8f5f0" stroke="#2d9b75" strokeWidth="2" />
      <text x="85" y="130" textAnchor="middle" fill="#1b7a5a" fontSize="12" fontWeight="600">3%</text>
      <rect x="135" y="50" width="50" height="140" rx="8" fill="#d4ebe3" stroke="#2d9b75" strokeWidth="2" />
      <text x="160" y="130" textAnchor="middle" fill="#1b7a5a" fontSize="12" fontWeight="600">6%</text>
      <rect x="210" y="50" width="50" height="140" rx="8" fill="#a8d5c4" stroke="#2d9b75" strokeWidth="2" />
      <text x="235" y="130" textAnchor="middle" fill="#1b7a5a" fontSize="12" fontWeight="600">9%</text>
      <text x="160" y="220" textAnchor="middle" fill="#6b7c78" fontSize="10">オキシ濃度の使い分け</text>
    </svg>
  );
}

function TreatmentDiagram() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" aria-hidden>
      <rect x="50" y="80" width="70" height="100" rx="10" fill="#e8f5f0" stroke="#2d9b75" />
      <text x="85" y="135" textAnchor="middle" fill="#1b7a5a" fontSize="10">施術</text>
      <path d="M120 130 L150 130" stroke="#2d9b75" strokeWidth="2" />
      <rect x="150" y="80" width="70" height="100" rx="10" fill="#d4ebe3" stroke="#2d9b75" />
      <text x="185" y="135" textAnchor="middle" fill="#1b7a5a" fontSize="10">処理</text>
      <path d="M220 130 L250 130" stroke="#2d9b75" strokeWidth="2" />
      <rect x="250" y="80" width="30" height="100" rx="6" fill="#a8d5c4" stroke="#2d9b75" />
      <text x="265" y="135" textAnchor="middle" fill="#1b7a5a" fontSize="8">ケア</text>
    </svg>
  );
}

function ProductDiagram() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" aria-hidden>
      <rect x="110" y="50" width="100" height="150" rx="12" fill="#e8f5f0" stroke="#2d9b75" strokeWidth="2" />
      <rect x="125" y="65" width="70" height="30" rx="4" fill="#1b7a5a" opacity="0.3" />
      <text x="160" y="140" textAnchor="middle" fill="#1b7a5a" fontSize="12" fontWeight="600">EW-R</text>
      <text x="160" y="220" textAnchor="middle" fill="#6b7c78" fontSize="10">製品ライン</text>
    </svg>
  );
}

function SalesDiagram() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" aria-hidden>
      <polyline points="50,180 100,140 150,160 200,90 270,70" fill="none" stroke="#2d9b75" strokeWidth="3" />
      {[[50,180],[100,140],[150,160],[200,90],[270,70]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill="#1b7a5a" />
      ))}
      <text x="160" y="220" textAnchor="middle" fill="#6b7c78" fontSize="10">提案力の向上</text>
    </svg>
  );
}

function ColorWheel() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" aria-hidden>
      <circle cx="160" cy="110" r="70" fill="none" stroke="#e8f5f0" strokeWidth="20" />
      <path d="M160 40 A70 70 0 0 1 220 110" fill="none" stroke="#ef4444" strokeWidth="20" />
      <path d="M220 110 A70 70 0 0 1 160 180" fill="none" stroke="#eab308" strokeWidth="20" />
      <path d="M160 180 A70 70 0 0 1 100 110" fill="none" stroke="#22c55e" strokeWidth="20" />
      <path d="M100 110 A70 70 0 0 1 160 40" fill="none" stroke="#3b82f6" strokeWidth="20" />
      <text x="160" y="220" textAnchor="middle" fill="#6b7c78" fontSize="10">補色・色の関係</text>
    </svg>
  );
}