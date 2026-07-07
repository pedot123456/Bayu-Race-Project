import { useNavigate } from 'react-router-dom'
import Environment from '../game/entities/Environment.jsx'
import Player from '../game/entities/Player.jsx'
import Button from '../components/ui/Button.jsx'
import PartnerLogos from '../components/ui/PartnerLogos.jsx'
import { getTeam, getKiteId } from '../game/store/localStore.js'
import { getKiteDesign } from '../game/kiteDesigns.js'

export default function HomeScreen() {
  const navigate = useNavigate()
  const team = getTeam()
  const kiteDesign = getKiteDesign(getKiteId())

  return (
    <div
      className="relative w-full h-full flex flex-col items-stretch px-[4cqmin] py-[2.5cqmin]"
      style={{
        paddingTop: 'max(2cqmin, env(safe-area-inset-top))',
        paddingBottom: 'max(2cqmin, env(safe-area-inset-bottom))',
      }}
    >
      <Environment />

      <PartnerLogos />

      <div className="relative w-full max-w-6xl mx-auto flex flex-1 min-h-0 items-center justify-between gap-[2cqmin]">
        {/* self-start (instead of inheriting the row's items-center) pins this
            block to the top of the available space, well clear of the wavy
            wind line and hills lower in the Environment art - centering it
            with the kite let it sink low enough to overlap that line. */}
        <div className="self-start flex flex-col items-start gap-3 flex-1 pt-[2cqmin] mb-12">
          <h1 className="font-display text-7xl sm:text-8xl font-black text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.25)] tracking-wide leading-tight">
            Welcome to{' '}
            <span className="whitespace-nowrap">
              Bayu <span className="text-brand-accent-300">Race</span>
            </span>
          </h1>
          <p className="font-display font-medium text-2xl sm:text-3xl text-white/70 max-w-md">
            Ride the wind across the kampung skies
          </p>
        </div>

        {/* The kite is the game's main character, so it anchors the center
            of the screen as the biggest element in the layout - filling
            the dead space a portrait-tuned two-column layout left behind
            in landscape. */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <Player
            design={kiteDesign}
            className="w-[32cqmin] h-[32cqmin] min-w-40 min-h-40 max-w-72 max-h-72"
          />
          <span className="text-brand-accent-200 font-display text-sm font-semibold drop-shadow">
            {kiteDesign.name}
          </span>
        </div>

        <div className="w-full max-w-[15rem] flex-1 flex flex-col items-center gap-3">
          {team && (
            <p className="text-center text-brand-accent-200 font-display font-semibold mb-1 px-4 py-1.5 rounded-full bg-brand-neutral-900/40 shadow-inner">
              Flying for: {team.teamName}
            </p>
          )}
          <Button className="w-full" onClick={() => navigate('/select-kite')}>
            Play
          </Button>
          <Button className="w-full" variant="secondary" onClick={() => navigate('/register')}>
            {team ? 'Edit Team' : 'Register Team'}
          </Button>
          <Button className="w-full" variant="ghost" onClick={() => navigate('/leaderboard')}>
            Leaderboard
          </Button>
        </div>
      </div>
    </div>
  )
}
