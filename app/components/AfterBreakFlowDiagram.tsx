export function AfterBreakFlowDiagram() {
  return (
    <svg
      viewBox="0 0 360 420"
      className="h-auto w-full"
      role="img"
      aria-label="アフターブレイクの工程フロー図"
    >
      <rect x="1" y="1" width="358" height="418" rx="12" fill="white" stroke="rgb(221 232 226)" />
      <text x="180" y="28" textAnchor="middle" fill="#132820" fontSize="13" fontWeight="700">
        施術後 → 残留物 → アフターブレイク
      </text>

      <rect x="100" y="44" width="160" height="36" rx="8" fill="#e8f3ed" stroke="#1a7556" strokeWidth="1.5" />
      <text x="180" y="67" textAnchor="middle" fill="#1a7556" fontSize="11" fontWeight="600">
        カラー・パーマ施術
      </text>

      <line x1="180" y1="80" x2="180" y2="100" stroke="#1a7556" strokeWidth="2" markerEnd="url(#arrow)" />

      <rect x="40" y="100" width="280" height="52" rx="8" fill="#fdf4f4" stroke="#9b3b3b" strokeWidth="1" strokeOpacity="0.3" />
      <text x="180" y="122" textAnchor="middle" fill="#9b3b3b" fontSize="10" fontWeight="600">
        髪に残りやすいもの
      </text>
      <text x="180" y="140" textAnchor="middle" fill="#5c6f68" fontSize="9">
        残留アルカリ · 過酸化水素 · 活性酸素 · におい
      </text>

      <line x1="180" y1="152" x2="180" y2="172" stroke="#1a7556" strokeWidth="2" />

      {[
        { y: 172, residue: "残留アルカリ", action: "乳酸・リン酸", result: "pHを弱酸性へ" },
        { y: 222, residue: "過酸化水素", action: "カタラーゼ", result: "水 + 酸素へ分解" },
        { y: 272, residue: "活性酸素", action: "ポリフェノール", result: "酸化ストレス抑制" },
        { y: 322, residue: "におい・摩擦", action: "PQ-10等", result: "塗布性・摩擦低減" },
      ].map((row) => (
        <g key={row.y}>
          <rect x="24" y={row.y} width="90" height="40" rx="6" fill="#f8f4ec" stroke="#b8956a" strokeWidth="1" strokeOpacity="0.5" />
          <text x="69" y={row.y + 24} textAnchor="middle" fill="#132820" fontSize="8.5" fontWeight="600">
            {row.residue}
          </text>
          <line x1="114" y1={row.y + 20} x2="138" y2={row.y + 20} stroke="#2d9b75" strokeWidth="1.5" />
          <rect x="138" y={row.y} width="90" height="40" rx="6" fill="#e8f3ed" stroke="#1a7556" strokeWidth="1" strokeOpacity="0.4" />
          <text x="183" y={row.y + 24} textAnchor="middle" fill="#1a7556" fontSize="8.5" fontWeight="600">
            {row.action}
          </text>
          <line x1="228" y1={row.y + 20} x2="252" y2={row.y + 20} stroke="#2d9b75" strokeWidth="1.5" />
          <rect x="252" y={row.y} width="84" height="40" rx="6" fill="white" stroke="#dde8e2" strokeWidth="1" />
          <text x="294" y={row.y + 24} textAnchor="middle" fill="#5c6f68" fontSize="8">
            {row.result}
          </text>
        </g>
      ))}

      <line x1="180" y1="362" x2="180" y2="378" stroke="#1a7556" strokeWidth="2" />
      <rect x="70" y="378" width="220" height="32" rx="8" fill="#1a7556" />
      <text x="180" y="399" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">
        後ダメージを進みにくくする
      </text>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#1a7556" />
        </marker>
      </defs>
    </svg>
  );
}