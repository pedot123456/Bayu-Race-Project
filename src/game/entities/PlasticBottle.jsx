// Discarded plastic bottle hazard, tumbling with a loose recycling-symbol
// label as it falls.
export default function PlasticBottle() {
  return (
    <div className="relative w-14 h-20 animate-flap" aria-hidden>
      <svg viewBox="0 0 50 80" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="bottleBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e0fffd" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#a6f2ef" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#6fe0d2" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <rect x="18" y="2" width="14" height="10" rx="2" fill="#8a95a0" />
        <path
          d="M16 12 H34 L32 24 Q40 34 40 46 V70 Q40 78 25 78 Q10 78 10 70 V46 Q10 34 18 24 Z"
          fill="url(#bottleBody)"
          stroke="#12b8c4"
          strokeWidth="2"
        />
        <rect x="10" y="46" width="30" height="20" fill="#ffffff" opacity="0.85" />
        <path
          d="M25 50 a6 6 0 1 0 0.01 0"
          fill="none"
          stroke="#1a9c90"
          strokeWidth="2"
        />
        <path d="M25 47 L27 51 L23 51 Z" fill="#1a9c90" />
      </svg>
    </div>
  )
}
