import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Environment from '../game/entities/Environment.jsx'
import Player from '../game/entities/Player.jsx'
import WoodPanel from '../components/ui/WoodPanel.jsx'
import Button from '../components/ui/Button.jsx'
import { KITE_DESIGNS } from '../game/kiteDesigns.js'
import { getKiteId, saveKiteId } from '../game/store/localStore.js'

export default function KiteSelectScreen() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(getKiteId())

  const handleRace = () => {
    saveKiteId(selectedId)
    navigate('/game')
  }

  return (
    <div
      className="relative w-full h-full flex flex-col items-center px-4 py-8"
      style={{
        paddingTop: 'max(2rem, env(safe-area-inset-top))',
        paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
      }}
    >
      <Environment />

      <h1 className="relative font-display text-[clamp(1.25rem,9cqw,1.75rem)] font-extrabold text-white mb-1 drop-shadow-[0_3px_0_rgba(0,0,0,0.25)] text-center">
        Choose Your Kite
      </h1>
      <p className="relative text-white/90 text-sm font-display font-semibold mb-4 text-center">
        14 designs. Pick one to represent your team.
      </p>

      <div className="relative w-full max-w-xs flex-1 overflow-y-auto">
        <WoodPanel>
          <div className="grid grid-cols-3 gap-2">
            {KITE_DESIGNS.map((design) => {
              const isSelected = design.id === selectedId
              return (
                <button
                  key={design.id}
                  type="button"
                  onClick={() => setSelectedId(design.id)}
                  className={`flex flex-col items-center rounded-xl border-2 py-2 transition-colors ${
                    isSelected
                      ? 'border-gold-300 bg-teal-950/60 shadow-[0_0_12px_rgba(245,196,81,0.6)]'
                      : 'border-transparent bg-teal-950/30'
                  }`}
                >
                  <div className="scale-75 -my-2">
                    <Player design={design} />
                  </div>
                  <span className="text-[10px] font-display font-semibold text-teal-100 mt-1 text-center leading-tight">
                    {design.name}
                  </span>
                </button>
              )
            })}
          </div>
        </WoodPanel>
      </div>

      <div className="relative w-full max-w-xs mt-6 flex flex-col gap-3">
        <Button onClick={handleRace}>Race!</Button>
        <Button variant="ghost" onClick={() => navigate('/menu')}>
          Back
        </Button>
      </div>
    </div>
  )
}
