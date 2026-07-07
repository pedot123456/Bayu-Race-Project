// Discarded scrap-metal hazard: a rusty, bent sheet with bolts, tumbling
// end over end.
export default function ScrapMetal() {
  return (
    <div className="relative w-16 h-16 animate-spin-slow" aria-hidden>
      <svg viewBox="0 0 70 70" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="scrapBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c7ccd1" />
            <stop offset="55%" stopColor="#8a95a0" />
            <stop offset="100%" stopColor="#5a6672" />
          </linearGradient>
        </defs>
        <path
          d="M12 10 L48 4 L64 24 L58 44 L34 66 L8 52 L4 26 Z"
          fill="url(#scrapBody)"
          stroke="#b5480f"
          strokeWidth="2"
        />
        <path d="M12 10 L34 30 L4 26 Z" fill="#b5480f" opacity="0.45" />
        <path d="M48 4 L34 30 L64 24 Z" fill="#3a4249" opacity="0.35" />
        <path d="M34 30 L58 44 L34 66 L8 52 Z" fill="#3a4249" opacity="0.2" />
        <circle cx="16" cy="16" r="3" fill="#3a4249" />
        <circle cx="46" cy="12" r="3" fill="#3a4249" />
        <circle cx="14" cy="46" r="3" fill="#3a4249" />
      </svg>
    </div>
  )
}
