import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Environment from '../game/entities/Environment.jsx'
import Player from '../game/entities/Player.jsx'
import PartnerLogos from '../components/ui/PartnerLogos.jsx'
import useFullscreen from '../lib/useFullscreen.js'

const AUTO_ADVANCE_MS = 6000

export default function WelcomeScreen() {
  const navigate = useNavigate()
  const { enterFullscreen } = useFullscreen()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/menu'), AUTO_ADVANCE_MS)
    return () => clearTimeout(timer)
  }, [navigate])

  const handleContinue = () => {
    // Piggyback on this tap (a real user gesture) to go fullscreen - on a
    // booth monitor this is what makes the 16:9 stage fill the screen
    // edge to edge instead of losing space to the browser's own chrome.
    enterFullscreen()
    navigate('/menu')
  }

  return (
    <button
      type="button"
      onClick={handleContinue}
      className="relative w-full h-full flex flex-col items-stretch justify-between text-left px-[3cqmin] py-[3cqmin]"
      style={{
        paddingTop: 'max(3cqmin, env(safe-area-inset-top))',
        paddingBottom: 'max(3cqmin, env(safe-area-inset-bottom))',
      }}
      aria-label="Continue to menu"
    >
      <Environment scrolling />

      <PartnerLogos />

      <div className="relative flex flex-1 items-center justify-center gap-[6cqmin]">
        <div className="flex flex-col items-end text-right">
          <span className="font-display text-[clamp(0.7rem,4.5cqmin,1.125rem)] font-semibold text-brand-accent-200 tracking-[0.35em] uppercase mb-1 drop-shadow">
            Bayuri
          </span>
          <h1 className="font-display text-[clamp(2rem,11cqmin,3.75rem)] font-extrabold text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.25)] tracking-wide">
            Bayu <span className="text-brand-accent-300">Race</span>
          </h1>
        </div>

        <Player className="w-[18cqmin] h-[18cqmin] min-w-16 min-h-16 max-w-40 max-h-40" />
      </div>

      <p className="relative self-center font-display font-semibold text-white/90 animate-pulse text-[clamp(0.875rem,4.5cqmin,1.125rem)]">
        Tap to continue
      </p>
    </button>
  )
}
