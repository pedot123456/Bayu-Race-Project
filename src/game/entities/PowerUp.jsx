// Collectible eco power-up: a glowing leaf gem. Visually distinct from the
// obstacles on purpose (soft glow, gem silhouette, warm/positive colors) so
// it reads as "safe to grab" at a glance instead of "dodge me".
export default function PowerUp() {
  return (
    <div className="relative w-14 h-14 animate-float" aria-hidden>
      <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-[0_0_10px_rgba(43,192,176,0.85)]">
        <defs>
          <radialGradient id="powerupGlow" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#fff0c2" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2bc0b0" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="powerupBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4f26e" />
            <stop offset="100%" stopColor="#16a05f" />
          </linearGradient>
        </defs>
        <circle cx="30" cy="30" r="27" fill="url(#powerupGlow)" />
        <path
          d="M30 10 C46 16 48 36 30 50 C12 36 14 16 30 10 Z"
          fill="url(#powerupBody)"
          stroke="#fff0c2"
          strokeWidth="2.5"
        />
        <path d="M30 16 L30 44" stroke="#fff0c2" strokeWidth="1.5" opacity="0.7" />
        <path d="M30 24 Q38 26 30 34 Q22 26 30 24 Z" fill="#fff0c2" opacity="0.85" />
      </svg>
    </div>
  )
}
