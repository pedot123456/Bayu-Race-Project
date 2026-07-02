import { useNavigate } from 'react-router-dom'
import Environment from '../game/entities/Environment.jsx'
import Player from '../game/entities/Player.jsx'
import Button from '../components/ui/Button.jsx'
import { getTeam, getKiteId } from '../game/store/localStore.js'
import { getKiteDesign } from '../game/kiteDesigns.js'

export default function HomeScreen() {
  const navigate = useNavigate()
  const team = getTeam()
  const kiteDesign = getKiteDesign(getKiteId())

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-between px-6 py-10"
      style={{
        paddingTop: 'max(2.5rem, env(safe-area-inset-top))',
        paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <Environment />

      <div className="relative text-center mt-6">
        <h1 className="font-display text-[clamp(2rem,14cqw,3.5rem)] font-extrabold text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.25)] tracking-wide">
          Bayu <span className="text-gold-300">Race</span>
        </h1>
        <p className="text-white/90 font-display font-semibold mt-2 text-[clamp(0.8rem,5cqw,1rem)]">
          Ride the wind across the kampung skies
        </p>
      </div>

      <div className="relative flex flex-col items-center gap-1">
        <Player design={kiteDesign} className="w-[25cqw] h-[25cqw] min-w-16 min-h-16 max-w-28 max-h-28" />
        <span className="text-gold-200 font-display text-xs font-semibold drop-shadow">
          {kiteDesign.name}
        </span>
      </div>

      <div className="relative w-full max-w-xs flex flex-col gap-3">
        {team && (
          <p className="text-center text-gold-200 font-display font-semibold mb-1 drop-shadow">
            Flying for: {team.teamName}
          </p>
        )}
        <Button onClick={() => navigate('/select-kite')}>Play</Button>
        <Button variant="secondary" onClick={() => navigate('/register')}>
          {team ? 'Edit Team' : 'Register Team'}
        </Button>
        <Button variant="ghost" onClick={() => navigate('/leaderboard')}>
          Leaderboard
        </Button>
      </div>
    </div>
  )
}
