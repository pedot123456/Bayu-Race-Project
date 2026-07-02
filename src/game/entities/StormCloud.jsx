// Stormy dark cloud hazard with a glowing lightning bolt flash.
export default function StormCloud() {
  return (
    <div className="relative w-20 h-20" aria-hidden>
      <svg viewBox="0 0 90 70" className="w-full h-full drop-shadow-lg">
        <ellipse cx="45" cy="30" rx="38" ry="20" fill="#3a2416" opacity="0.15" />
        <path
          d="M20 40 Q6 40 6 27 Q6 15 20 16 Q22 4 38 6 Q52 -2 62 10 Q80 8 80 26 Q80 40 64 40 Z"
          fill="#3f4750"
        />
        <path
          d="M20 40 Q6 40 6 27 Q6 15 20 16 Q22 4 38 6 Q52 -2 62 10 Q80 8 80 26 Q80 40 64 40 Z"
          fill="#2a3138"
          opacity="0.5"
        />
        <path
          d="M42 40 L32 56 L42 56 L36 68 L54 48 L44 48 Z"
          fill="#f5c451"
          className="animate-flash"
        />
      </svg>
    </div>
  )
}
