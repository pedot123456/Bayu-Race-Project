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
      className="relative w-full h-full flex flex-col items-center px-[3cqmin] py-[2.5cqmin]"
      style={{
        paddingTop: 'max(1.5cqmin, env(safe-area-inset-top))',
        paddingBottom: 'max(1.5cqmin, env(safe-area-inset-bottom))',
      }}
    >
      <Environment />

      <h1 className="relative font-display text-[clamp(1.1rem,6cqmin,1.75rem)] font-extrabold text-white mb-1 drop-shadow-[0_3px_0_rgba(0,0,0,0.25)] text-center">
        Choose Your Kite
      </h1>
      <p className="relative text-white/90 text-sm font-display font-semibold mb-3 text-center">
        14 kites, one for every state in Malaysia. Pick one to represent your team.
      </p>

      <div className="relative w-full max-w-4xl flex-1 min-h-0 overflow-y-auto">
        <WoodPanel>
          <div className="grid grid-cols-7 gap-2">
            {KITE_DESIGNS.map((design) => {
              const isSelected = design.id === selectedId
              return (
                <button
                  key={design.id}
                  type="button"
                  onClick={() => setSelectedId(design.id)}
                  className={`flex flex-col items-center rounded-xl border-2 py-2 transition-colors ${
                    isSelected
                      ? 'border-brand-accent-300 bg-brand-primary-950/60 shadow-[0_0_12px_rgba(245,196,81,0.6)]'
                      : 'border-transparent bg-brand-primary-950/30'
                  }`}
                >
                  <div className="scale-75 -my-2">
                    <Player design={design} />
                  </div>
                  <span className="text-[10px] font-display font-semibold text-brand-primary-100 mt-1 text-center leading-tight">
                    {design.name}
                  </span>
                </button>
              )
            })}
          </div>
        </WoodPanel>
      </div>

      <div className="relative w-full max-w-4xl mt-[2cqmin] flex flex-row-reverse gap-3">
        <Button className="flex-1" onClick={handleRace}>
          Race!
        </Button>
        <Button className="flex-1" variant="ghost" onClick={() => navigate('/menu')}>
          Back
        </Button>
      </div>
    </div>
  )
}
