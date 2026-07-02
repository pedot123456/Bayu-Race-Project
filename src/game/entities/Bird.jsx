// Stylized cartoon bird hazard, wings flapping in place.
export default function Bird() {
  return (
    <div className="relative w-16 h-16 animate-flap" aria-hidden>
      <svg viewBox="0 0 70 60" className="w-full h-full drop-shadow-lg">
        <ellipse cx="35" cy="34" rx="16" ry="13" fill="#f2711b" />
        <path d="M14 30 Q-4 22 6 8 Q22 14 24 28 Z" fill="#d85a15" />
        <path d="M56 30 Q74 22 64 8 Q48 14 46 28 Z" fill="#d85a15" />
        <circle cx="44" cy="26" r="4.5" fill="white" />
        <circle cx="45.5" cy="25" r="2" fill="#08060d" />
        <path d="M56 28 L66 31 L56 34 Z" fill="#f5c451" />
      </svg>
    </div>
  )
}
