// Stylized Malaysian countryside backdrop: cinematic sun, rolling hills,
// coconut palms and looping wind-swirl accents. `scrolling` speeds up the
// hill/palm parallax during gameplay.
export default function Environment({ scrolling = false }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-sky-top via-sky-mid to-sky-bottom">
      <div
        className="absolute left-1/2 top-[14%] h-40 w-40 -translate-x-1/2 rounded-full bg-gold-300 blur-2xl opacity-80"
        aria-hidden
      />
      <div
        className="absolute left-1/2 top-[16%] h-24 w-24 -translate-x-1/2 rounded-full bg-gold-200"
        aria-hidden
      />

      <svg
        className={`absolute bottom-[28%] left-0 w-[200%] h-24 opacity-70 ${scrolling ? 'animate-wind-scroll' : ''}`}
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0 30 Q 20 10, 40 30 T 80 30"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M150 20 Q 170 0, 190 20 T 230 20"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M280 40 Q 300 20, 320 40 T 360 40"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <div
        className={`absolute bottom-[18%] left-0 w-[200%] h-28 bg-hill-far rounded-t-[50%] ${scrolling ? 'animate-hill-scroll-slow' : ''}`}
        aria-hidden
      />

      <div
        className={`absolute bottom-0 left-0 w-[200%] h-40 bg-hill-near rounded-t-[45%] ${scrolling ? 'animate-hill-scroll' : ''}`}
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
