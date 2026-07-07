// Crushed aluminum can hazard, tumbling with dented metallic highlights.
export default function AluminumCan() {
  return (
    <div className="relative w-12 h-16 animate-spin-slow" aria-hidden>
      <svg viewBox="0 0 50 70" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="canBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e5e9ec" />
            <stop offset="45%" stopColor="#aab3ba" />
            <stop offset="100%" stopColor="#7d868d" />
          </linearGradient>
        </defs>
        <path
          d="M14 8 L36 8 L34 20 L38 34 L30 40 L34 52 L28 62 L16 60 L20 48 L14 38 L18 26 Z"
          fill="url(#canBody)"
          stroke="#5a6672"
          strokeWidth="2"
        />
        <path d="M14 8 L36 8 L34 20 L18 26 Z" fill="#2bc0b0" opacity="0.85" />
        <path d="M34 20 L38 34 L30 40 L18 26 Z" fill="#ffffff" opacity="0.25" />
        <path d="M30 40 L34 52 L28 62 L20 48 Z" fill="#2bc0b0" opacity="0.6" />
        <ellipse cx="25" cy="8" rx="11" ry="3" fill="#c7ccd1" stroke="#5a6672" strokeWidth="1.5" />
      </svg>
    </div>
  )
}
