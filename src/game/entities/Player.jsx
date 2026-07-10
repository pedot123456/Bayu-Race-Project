import { useId } from 'react'
import { KITE_DESIGNS } from '../kiteDesigns.js'

// The Wau Bulan (moon kite) player character: a diamond silhouette whose
// gradient, accent diamond, and ribbon tails are driven by `design`
// (see game/kiteDesigns.js for the 14 selectable skins).
export default function Player({ hit = false, design = KITE_DESIGNS[0], className = 'w-20 h-20' }) {
  const uid = useId()
  const bodyGradId = `kiteBody-${uid}`
  const accentGradId = `kiteAccent-${uid}`
  const weaveId = `kiteWeave-${uid}`

  return (
    <div
      className={`relative animate-float ${className} ${hit ? 'animate-pulse' : ''}`}
      aria-hidden
    >
      <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)]">
        <defs>
          <linearGradient id={bodyGradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={design.from} />
            <stop offset="45%" stopColor={design.mid} />
            <stop offset="100%" stopColor={design.to} />
          </linearGradient>
          <linearGradient id={accentGradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={design.accentFrom} />
            <stop offset="100%" stopColor={design.accentTo} />
          </linearGradient>
          {/* Songket-inspired woven diamond lattice, tinted with this
              kite's own outline color so it varies design to design. */}
          <pattern id={weaveId} width="14" height="14" patternUnits="userSpaceOnUse">
            <path
              d="M7 0 L14 7 L7 14 L0 7 Z"
              fill="none"
              stroke={design.outline}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
          </pattern>
        </defs>

        <path
          d="M50 4 L92 55 L50 122 L8 55 Z"
          fill={`url(#${bodyGradId})`}
          stroke={design.outline}
          strokeWidth="3"
        />
        <path d="M50 4 L92 55 L50 122 L8 55 Z" fill={`url(#${weaveId})`} opacity="0.55" />
        <path d="M50 4 L50 122" stroke={design.outline} strokeWidth="2" opacity="0.6" />
        <path d="M8 55 L92 55" stroke={design.outline} strokeWidth="2" opacity="0.6" />

        <path
          d="M50 20 Q66 55 50 90 Q34 55 50 20 Z"
          fill={`url(#${accentGradId})`}
          opacity="0.9"
        />

        <circle cx="50" cy="55" r="6" fill={design.accentFrom} stroke={design.outline} strokeWidth="1.5" />

        <path
          d="M42 118 Q38 128 30 132"
          stroke={design.ribbons[0]}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M50 122 Q50 132 50 138"
          stroke={design.ribbons[1]}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M58 118 Q62 128 70 132"
          stroke={design.ribbons[2]}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
