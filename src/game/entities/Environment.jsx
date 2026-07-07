// Stylized Malaysian countryside backdrop: rolling hills, coconut palms and
// looping wind-swirl accents over an open sky gradient. `scrolling` speeds
// up the hill/palm parallax during gameplay.
export default function Environment({ scrolling = false }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-brand-sky-top via-brand-sky-mid to-brand-sky-bottom">
      <svg
        className={`absolute bottom-[28%] left-0 w-[200%] h-24 opacity-70 ${scrolling ? 'animate-wind-scroll' : ''}`}
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0 30 Q 20 12 40 30 T 80 30 T 120 30"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M150 18 Q 170 0 190 18 T 230 18 T 270 18"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M280 42 Q 300 24 320 42 T 360 42 T 400 42"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div
        className={`absolute bottom-[18%] left-0 w-[200%] h-28 bg-brand-hill-far rounded-t-[50%] ${scrolling ? 'animate-hill-scroll-slow' : ''}`}
        aria-hidden
      />

      <div
        className={`absolute bottom-0 left-0 w-[200%] h-40 bg-brand-hill-near rounded-t-[45%] ${scrolling ? 'animate-hill-scroll' : ''}`}
        aria-hidden
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <PalmTree key={i} className="absolute bottom-16" style={{ left: `${i * 10 + 3}%` }} />
        ))}
      </div>
    </div>
  )
}

function PalmTree({ className = '', style }) {
  return (
    <svg
      className={className}
      style={{ width: 34, height: 60, ...style }}
      viewBox="0 0 34 60"
      aria-hidden
    >
      <path d="M17 60 L15 22 Q17 18 19 22 Z" fill="#4e3220" />
      <g fill="#1f7a5c">
        <path d="M17 22 Q0 10 2 0 Q18 8 17 22 Z" />
        <path d="M17 22 Q34 10 32 0 Q16 8 17 22 Z" />
        <path d="M17 22 Q4 24 0 16 Q14 14 17 22 Z" />
        <path d="M17 22 Q30 24 34 16 Q20 14 17 22 Z" />
        <path d="M17 22 Q10 6 17 -2 Q24 6 17 22 Z" />
      </g>
    </svg>
  )
}
