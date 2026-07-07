// Discarded cardboard box hazard, tumbling end over end with a torn flap.
export default function CardboardBox() {
  return (
    <div className="relative w-16 h-16 animate-spin-slow" aria-hidden>
      <svg viewBox="0 0 70 70" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="boxBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d8b98a" />
            <stop offset="100%" stopColor="#a97445" />
          </linearGradient>
        </defs>
        <rect x="8" y="16" width="54" height="46" fill="url(#boxBody)" stroke="#6b452b" strokeWidth="2" />
        <path d="M8 16 L35 30 L62 16" fill="none" stroke="#6b452b" strokeWidth="2" />
        <path d="M35 30 L35 62" stroke="#6b452b" strokeWidth="2" opacity="0.5" />
        <path d="M14 10 L35 22 L35 30 L8 16 Z" fill="#c49a67" stroke="#6b452b" strokeWidth="2" />
        <path d="M56 10 L35 22 L35 30 L62 16 Z" fill="#e0c090" stroke="#6b452b" strokeWidth="2" />
        <path d="M18 44 H52" stroke="#6b452b" strokeWidth="3" opacity="0.5" />
      </svg>
    </div>
  )
}
