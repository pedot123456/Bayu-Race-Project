import { useNavigate } from 'react-router-dom'
import Environment from '../game/entities/Environment.jsx'
import WoodPanel from '../components/ui/WoodPanel.jsx'
import Button from '../components/ui/Button.jsx'
import { getLeaderboard } from '../game/store/localStore.js'

const RANK_STYLES = [
  'border-gold-300 shadow-[0_0_18px_rgba(245,196,81,0.7)] text-gold-300',
  'border-teal-300 shadow-[0_0_12px_rgba(111,224,210,0.5)] text-teal-200',
  'border-orange-400 shadow-[0_0_12px_rgba(255,140,63,0.5)] text-orange-300',
]

export default function LeaderboardScreen() {
  const navigate = useNavigate()
  const entries = getLeaderboard()

  return (
    <div
      className="relative w-full h-full flex flex-col items-center px-6 py-10"
      style={{
        paddingTop: 'max(2.5rem, env(safe-area-inset-top))',
        paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <Environment />

      <h1 className="relative font-display text-[clamp(1.5rem,11cqw,2.25rem)] font-extrabold text-white mb-6 drop-shadow-[0_3px_0_rgba(0,0,0,0.25)]">
        Leaderboard
      </h1>

      <div className="relative w-full max-w-xs flex-1 overflow-y-auto">
        <WoodPanel>
          {entries.length === 0 ? (
            <p className="text-teal-100 text-center py-6">
              No races yet. Be the first team to fly!
            </p>
          ) : (
            <ol className="flex flex-col gap-2">
              {entries.map((entry, i) => (
                <li
                  key={entry.id ?? `${entry.teamName}-${entry.date}-${i}`}
                  className={`flex items-center justify-between rounded-xl bg-teal-950/50 border-2 px-3 py-2 ${
                    RANK_STYLES[i] ?? 'border-wood-600 text-teal-100'
                  }`}
                >
                  <span className="flex items-center gap-2 font-display font-bold">
                    <span className="w-6 text-right">{i + 1}</span>
                    <span className="truncate max-w-[9rem]">{entry.teamName}</span>
                  </span>
                  <span className="font-display font-extrabold">{entry.score} m</span>
                </li>
              ))}
            </ol>
          )}
        </WoodPanel>
      </div>

      <div className="relative w-full max-w-xs mt-6">
        <Button variant="ghost" onClick={() => navigate('/menu')} className="w-full">
          Back Home
        </Button>
      </div>
    </div>
  )
}
