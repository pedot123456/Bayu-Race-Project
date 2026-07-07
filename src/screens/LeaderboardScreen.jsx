import { useNavigate } from 'react-router-dom'
import Environment from '../game/entities/Environment.jsx'
import WoodPanel from '../components/ui/WoodPanel.jsx'
import Button from '../components/ui/Button.jsx'
import { getLeaderboard } from '../game/store/localStore.js'

const RANK_STYLES = [
  'border-brand-accent-300 shadow-[0_0_18px_rgba(245,196,81,0.7)] text-brand-accent-300',
  'border-brand-primary-300 shadow-[0_0_12px_rgba(111,224,210,0.5)] text-brand-primary-200',
  'border-brand-secondary-400 shadow-[0_0_12px_rgba(255,140,63,0.5)] text-brand-secondary-300',
]
const RANK_MEDALS = ['🥇', '🥈', '🥉']

export default function LeaderboardScreen() {
  const navigate = useNavigate()
  const entries = getLeaderboard()

  return (
    <div
      className="relative w-full h-full flex flex-col items-center px-[3cqmin] py-[2.5cqmin]"
      style={{
        paddingTop: 'max(1.5cqmin, env(safe-area-inset-top))',
        paddingBottom: 'max(1.5cqmin, env(safe-area-inset-bottom))',
      }}
    >
      <Environment />

      <h1 className="relative font-display text-[clamp(1.25rem,7cqmin,2.25rem)] font-extrabold text-white mb-[2cqmin] drop-shadow-[0_3px_0_rgba(0,0,0,0.25)]">
        Leaderboard
      </h1>

      <div className="relative w-full max-w-3xl flex-1 min-h-0 overflow-y-auto">
        <WoodPanel>
          {entries.length === 0 ? (
            <p className="text-brand-primary-100 text-center py-6">
              No races yet. Be the first team to fly!
            </p>
          ) : (
            <ol className="columns-1 sm:columns-2 gap-4">
              {entries.map((entry, i) => (
                <li
                  key={entry.id ?? `${entry.teamName}-${entry.date}-${i}`}
                  className={`flex items-center justify-between rounded-xl bg-brand-primary-950/50 border-2 px-3 py-2 mb-2 break-inside-avoid ${
                    RANK_STYLES[i] ?? 'border-brand-neutral-600 text-brand-primary-100'
                  }`}
                >
                  <span className="flex items-center gap-2 font-display font-bold">
                    <span className="w-6 text-right">{RANK_MEDALS[i] ?? i + 1}</span>
                    <span className="truncate max-w-[9rem]">{entry.teamName}</span>
                  </span>
                  <span className="font-display font-extrabold">{entry.score} m</span>
                </li>
              ))}
            </ol>
          )}
        </WoodPanel>
      </div>

      <div className="relative w-full max-w-xs mt-[2cqmin]">
        <Button variant="ghost" onClick={() => navigate('/menu')} className="w-full">
          Back Home
        </Button>
      </div>
    </div>
  )
}
