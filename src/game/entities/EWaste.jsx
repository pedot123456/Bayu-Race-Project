// Broken e-waste hazard: a cracked circuit board with a shorting spark.
export default function EWaste() {
  return (
    <div className="relative w-16 h-16" aria-hidden>
      <svg viewBox="0 0 70 70" className="w-full h-full drop-shadow-lg">
        <rect x="6" y="6" width="58" height="58" rx="6" fill="#1f7a5c" />
        <rect x="6" y="6" width="58" height="58" rx="6" fill="#08060d" opacity="0.35" />
        <g stroke="#f5c451" strokeWidth="2" fill="none" opacity="0.8">
          <path d="M14 14 H30 V26 H46" />
          <path d="M56 14 V30 H40" />
          <path d="M14 56 H28 V44 H14" />
          <path d="M56 56 H42 V48" />
        </g>
        <circle cx="14" cy="14" r="2.5" fill="#f5c451" />
        <circle cx="56" cy="14" r="2.5" fill="#f5c451" />
        <circle cx="14" cy="56" r="2.5" fill="#f5c451" />
        <circle cx="56" cy="56" r="2.5" fill="#f5c451" />
        <rect x="26" y="26" width="18" height="18" rx="2" fill="#3a4249" stroke="#c7ccd1" strokeWidth="1.5" />
        <path
          d="M34 22 L28 36 L34 36 L30 50 L46 32 L37 32 Z"
          fill="#ffe08a"
          className="animate-flash"
        />
      </svg>
    </div>
  )
}
