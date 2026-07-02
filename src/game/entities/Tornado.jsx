// Swirling mini-tornado vortex hazard.
export default function Tornado() {
  return (
    <div className="relative w-16 h-24" aria-hidden>
      <svg viewBox="0 0 60 90" className="w-full h-full animate-spin-slow drop-shadow-lg">
        <defs>
          <linearGradient id="tornadoBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e5e9ec" />
            <stop offset="100%" stopColor="#8a95a0" />
          </linearGradient>
        </defs>
        <ellipse cx="30" cy="10" rx="26" ry="7" fill="url(#tornadoBody)" opacity="0.95" />
        <ellipse cx="30" cy="26" rx="19" ry="6" fill="url(#tornadoBody)" opacity="0.9" />
        <ellipse cx="30" cy="42" rx="13" ry="5" fill="url(#tornadoBody)" opacity="0.85" />
        <ellipse cx="30" cy="56" rx="8" ry="4" fill="url(#tornadoBody)" opacity="0.8" />
        <ellipse cx="30" cy="68" rx="4" ry="3" fill="url(#tornadoBody)" opacity="0.75" />
      </svg>
    </div>
  )
}
