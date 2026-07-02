import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Environment from '../game/entities/Environment.jsx'
import Player from '../game/entities/Player.jsx'

const AUTO_ADVANCE_MS = 3000

export default function WelcomeScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/menu'), AUTO_ADVANCE_MS)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <button
      type="button"
      onClick={() => navigate('/menu')}
      className="relative w-full h-full flex flex-col items-center justify-center text-left px-6"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      aria-label="Continue to menu"
    >
      <Environment scrolling />

      <div className="relative flex flex-col items-center">
        <span className="font-display text-[clamp(0.7rem,6cqw,1.125rem)] font-semibold text-gold-200 tracking-[0.35em] uppercase mb-1 drop-shadow">
          Bayuri
        </span>
        <h1 className="font-display text-[clamp(2rem,16cqw,3.5rem)] font-extrabold text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.25)] tracking-wide text-center">
          Bayu <span className="text-gold-300">Race</span>
        </h1>

        <div className="mt-[7cqw]">
          <Player className="w-[28cqw] h-[28cqw] min-w-16 min-h-16 max-w-32 max-h-32" />
        </div>

        <p className="mt-[7cqw] font-display font-semibold text-white/90 animate-pulse text-[clamp(0.875rem,6cqw,1.125rem)]">
          Tap to continue
        </p>
      </div>
    </button>
  )
}
