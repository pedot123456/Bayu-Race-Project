import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Environment from './entities/Environment.jsx'
import Player from './entities/Player.jsx'
import Obstacle from './entities/Obstacle.jsx'
import PowerUp from './entities/PowerUp.jsx'
import useGameLoop from './engine/useGameLoop.js'
import useSwipe from './engine/useSwipe.js'
import useSfx from './audio/useSfx.js'
import WoodPanel from '../components/ui/WoodPanel.jsx'
import Button from '../components/ui/Button.jsx'
import { getTeam, getKiteId, addScore, getLeaderboard } from './store/localStore.js'
import { getKiteDesign } from './kiteDesigns.js'
import {
  LANE_X,
  CENTER_LANE,
  OBSTACLE_TYPES,
  POWERUP_SPAWN_CHANCE,
  POWERUP_BONUS,
  PLAYER_Y,
  COLLISION_WINDOW,
  NEAR_MISS_WINDOW,
  NEAR_MISS_BONUS,
  SCORE_MILESTONE,
  SCORE_TIER_GOOD_MIN,
  COUNTDOWN_STEP_MS,
  COUNTDOWN_GO_MS,
  NEW_RECORD_TOAST_MS,
  LEVEL_UP_INTERVAL_SEC,
  LEVEL_SPEED_STEP,
  LEVEL_SPAWN_STEP_MS,
  LEVEL_UP_FLASH_MS,
  INITIAL_SPEED,
  MAX_SPEED,
  SPEED_RAMP_PER_SEC,
  SPAWN_INTERVAL_START,
  SPAWN_INTERVAL_MIN,
  SPAWN_RAMP_PER_SEC,
  SCORE_PER_SEC,
} from './constants.js'

let obstacleSeq = 0
let popupSeq = 0

function freshRuntime() {
  return {
    speed: INITIAL_SPEED,
    spawnInterval: SPAWN_INTERVAL_START,
    spawnTimer: 0,
    elapsed: 0,
    scoreAcc: 0,
  }
}

// Three-tier game-over feedback: a new #1 leaderboard score always wins
// regardless of the raw number, otherwise the message scales with score.
function getPerformanceMessage(finalScore, isTopScore) {
  if (isTopScore) return 'Congratulations! You achieved the highest score!'
  if (finalScore >= SCORE_TIER_GOOD_MIN) return 'Good job!'
  return "Don't give up, try again!"
}

export default function GameCanvas() {
  const navigate = useNavigate()
  const playSfx = useSfx()
  const [status, setStatus] = useState('ready') // ready | countdown | running | gameover
  const [countdownValue, setCountdownValue] = useState(null) // 3 | 2 | 1 | 'GO' | null
  const [lane, setLane] = useState(CENTER_LANE)
  const [obstacles, setObstacles] = useState([])
  const [score, setScore] = useState(0)
  const [hit, setHit] = useState(false)
  const [popups, setPopups] = useState([])
  const [nearMissCount, setNearMissCount] = useState(0)
  const [isNewBest, setIsNewBest] = useState(false)
  const [performanceMessage, setPerformanceMessage] = useState('')
  const [level, setLevel] = useState(1)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [showRecordToast, setShowRecordToast] = useState(false)

  const team = getTeam()
  const kiteDesign = getKiteDesign(getKiteId())
  const runtimeRef = useRef(freshRuntime())
  const laneRef = useRef(lane)
  laneRef.current = lane
  const obstaclesRef = useRef([])
  const endedRef = useRef(false)
  const nearMissIdsRef = useRef(new Set())
  const milestoneRef = useRef(0)
  const levelRef = useRef(1)
  const levelFlashTimeoutRef = useRef(null)
  const previousBestRef = useRef(0)
  const recordBrokenRef = useRef(false)

  useEffect(() => () => clearTimeout(levelFlashTimeoutRef.current), [])

  const triggerLevelUp = useCallback(
    (nextLevel) => {
      playSfx('levelUp')
      setLevel(nextLevel)
      setShowLevelUp(true)
      clearTimeout(levelFlashTimeoutRef.current)
      levelFlashTimeoutRef.current = setTimeout(() => setShowLevelUp(false), LEVEL_UP_FLASH_MS)
    },
    [playSfx],
  )

  const registerNearMiss = useCallback(() => {
    playSfx('nearMiss')
    setNearMissCount((c) => c + 1)
    const id = popupSeq++
    setPopups((p) => [...p, { id, text: `Close one! +${NEAR_MISS_BONUS}`, variant: 'nearMiss' }])
    setTimeout(() => setPopups((p) => p.filter((item) => item.id !== id)), 900)
  }, [playSfx])

  const collectPowerUp = useCallback(() => {
    playSfx('powerup')
    const id = popupSeq++
    setPopups((p) => [...p, { id, text: `+${POWERUP_BONUS} Eco Bonus!`, variant: 'powerup' }])
    setTimeout(() => setPopups((p) => p.filter((item) => item.id !== id)), 900)
  }, [playSfx])

  const moveLeft = useCallback(() => {
    if (status !== 'running') return
    setLane((l) => {
      if (l === 0) return l
      playSfx('whoosh')
      return l - 1
    })
  }, [status, playSfx])

  const moveRight = useCallback(() => {
    if (status !== 'running') return
    setLane((l) => {
      if (l === LANE_X.length - 1) return l
      playSfx('whoosh')
      return l + 1
    })
  }, [status, playSfx])

  const { onTouchStart, onTouchEnd } = useSwipe({
    onLeft: moveLeft,
    onRight: moveRight,
    enabled: status === 'running',
  })

  // Guarded so a stray extra animation frame (the rAF loop in useGameLoop
  // re-schedules itself before it can observe `status` flipping away from
  // 'running') can never record a second leaderboard entry for one race.
  const endGame = useCallback(
    (finalScore) => {
      if (endedRef.current) return
      endedRef.current = true
      const roundedFinal = Math.round(finalScore)
      setHit(true)
      setStatus('gameover')
      playSfx('crash')
      const { isTopScore } = addScore(team?.teamName ?? 'Unregistered', roundedFinal)
      setIsNewBest(isTopScore)
      setPerformanceMessage(getPerformanceMessage(roundedFinal, isTopScore))
      if (isTopScore) setTimeout(() => playSfx('newBest'), 350)
    },
    [team, playSfx],
  )

  const tick = useCallback(
    (dt) => {
      if (endedRef.current) return

      const rt = runtimeRef.current
      rt.elapsed += dt

      // Time-based leveling: every LEVEL_UP_INTERVAL_SEC of survival bumps
      // the level, which steps speed/spawn-rate up on top of the gradual
      // per-second ramp - so the game gets noticeably harder in bursts
      // instead of only ever creeping up smoothly.
      const currentLevel = 1 + Math.floor(rt.elapsed / LEVEL_UP_INTERVAL_SEC)
      if (currentLevel !== levelRef.current) {
        levelRef.current = currentLevel
        triggerLevelUp(currentLevel)
      }

      rt.speed = Math.min(
        MAX_SPEED,
        INITIAL_SPEED + (levelRef.current - 1) * LEVEL_SPEED_STEP + rt.elapsed * SPEED_RAMP_PER_SEC,
      )
      rt.spawnInterval = Math.max(
        SPAWN_INTERVAL_MIN,
        SPAWN_INTERVAL_START -
          (levelRef.current - 1) * LEVEL_SPAWN_STEP_MS -
          rt.elapsed * SPAWN_RAMP_PER_SEC,
      )
      rt.spawnTimer += dt * 1000
      rt.scoreAcc += dt * SCORE_PER_SEC * (rt.speed / INITIAL_SPEED)

      let spawned = null
      if (rt.spawnTimer >= rt.spawnInterval) {
        rt.spawnTimer = 0
        const isPowerUp = Math.random() < POWERUP_SPAWN_CHANCE
        spawned = {
          id: obstacleSeq++,
          lane: Math.floor(Math.random() * LANE_X.length),
          kind: isPowerUp ? 'powerup' : 'obstacle',
          type: isPowerUp ? 'powerup' : OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)],
          y: -10,
        }
      }

      const moved = obstaclesRef.current
        .map((o) => ({ ...o, y: o.y + rt.speed * dt }))
        .filter((o) => o.y < 108)
      const next = spawned ? [...moved, spawned] : moved

      // Sort obstacles from power-ups as we go: a power-up in the hit
      // window is collected (bonus + popup, then removed) instead of
      // ending the race, so it never reaches the collision check below.
      let collided = false
      const survivors = []
      next.forEach((o) => {
        const inHitWindow = o.lane === laneRef.current && Math.abs(o.y - PLAYER_Y) <= COLLISION_WINDOW
        if (inHitWindow) {
          if (o.kind === 'powerup') {
            rt.scoreAcc += POWERUP_BONUS
            collectPowerUp()
            return // consumed - drop it instead of keeping it around
          }
          collided = true
        }
        survivors.push(o)
      })
      obstaclesRef.current = survivors
      setObstacles(survivors)

      // A close call: an obstacle sweeps past the player's row in an
      // adjacent lane without a hit. Small score bonus + a floating
      // callout so a clean dodge actually feels rewarded.
      if (!collided) {
        survivors.forEach((o) => {
          if (
            o.kind !== 'powerup' &&
            o.lane !== laneRef.current &&
            Math.abs(o.y - PLAYER_Y) <= NEAR_MISS_WINDOW &&
            !nearMissIdsRef.current.has(o.id)
          ) {
            nearMissIdsRef.current.add(o.id)
            rt.scoreAcc += NEAR_MISS_BONUS
            registerNearMiss()
          }
        })
      }

      const roundedScore = Math.round(rt.scoreAcc)
      if (roundedScore >= milestoneRef.current + SCORE_MILESTONE) {
        milestoneRef.current = Math.floor(roundedScore / SCORE_MILESTONE) * SCORE_MILESTONE
        playSfx('tick')
      }

      // Live "new record" callout - fires once, mid-run, the instant the
      // live score clears the previous #1 leaderboard entry (captured at
      // race start). A brand-new leaderboard has nothing to beat here, so
      // a first-ever run just gets the "New Best!" tier at game over
      // instead of this toast firing at the first point scored.
      if (!recordBrokenRef.current && previousBestRef.current > 0 && rt.scoreAcc > previousBestRef.current) {
        recordBrokenRef.current = true
        playSfx('newBest')
        setShowRecordToast(true)
        setTimeout(() => setShowRecordToast(false), NEW_RECORD_TOAST_MS)
      }

      setScore(roundedScore)

      if (collided) endGame(rt.scoreAcc)
    },
    [endGame, registerNearMiss, collectPowerUp, playSfx, triggerLevelUp],
  )

  useGameLoop(tick, status === 'running')

  // 3-2-1-GO countdown between "Start Race" and obstacles actually moving.
  useEffect(() => {
    if (status !== 'countdown') return

    if (countdownValue === 'GO') {
      playSfx('go')
      const t = setTimeout(() => setStatus('running'), COUNTDOWN_GO_MS)
      return () => clearTimeout(t)
    }

    playSfx('countdownBeep')
    const t = setTimeout(() => {
      setCountdownValue((v) => (v === 1 ? 'GO' : v - 1))
    }, COUNTDOWN_STEP_MS)
    return () => clearTimeout(t)
  }, [status, countdownValue, playSfx])

  const startGame = () => {
    runtimeRef.current = freshRuntime()
    obstaclesRef.current = []
    nearMissIdsRef.current = new Set()
    milestoneRef.current = 0
    levelRef.current = 1
    previousBestRef.current = getLeaderboard()[0]?.score ?? 0
    recordBrokenRef.current = false
    endedRef.current = false
    clearTimeout(levelFlashTimeoutRef.current)
    setObstacles([])
    setPopups([])
    setNearMissCount(0)
    setIsNewBest(false)
    setPerformanceMessage('')
    setLevel(1)
    setShowLevelUp(false)
    setShowRecordToast(false)
    setScore(0)
    setLane(CENTER_LANE)
    setHit(false)
    setStatus('countdown')
    setCountdownValue(3)
  }

  return (
    <div
      className={`relative w-full h-full select-none overflow-hidden ${hit ? 'animate-shake' : ''}`}
      style={{ touchAction: 'none' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Environment scrolling={status === 'running'} />

      <div className="absolute inset-0">
        {obstacles.map((o) => (
          <div
            key={o.id}
            className="absolute -translate-x-1/2"
            style={{ left: `${LANE_X[o.lane]}%`, top: `${o.y}%` }}
          >
            {o.kind === 'powerup' ? <PowerUp /> : <Obstacle type={o.type} />}
          </div>
        ))}

        <div
          className="absolute -translate-x-1/2 transition-[left] duration-150 ease-out"
          style={{ left: `${LANE_X[lane]}%`, top: `${PLAYER_Y}%` }}
        >
          <Player hit={hit} design={kiteDesign} />
        </div>

        {popups.map((p) => (
          <div
            key={p.id}
            className={`absolute -translate-x-1/2 pointer-events-none font-display font-bold text-[3cqmin] drop-shadow animate-float-up-fade ${
              p.variant === 'powerup' ? 'text-brand-primary-300' : 'text-brand-accent-300'
            }`}
            style={{ left: `${LANE_X[lane]}%`, top: `${PLAYER_Y - 10}%` }}
          >
            {p.text}
          </div>
        ))}
      </div>

      {/* Quick red flash on impact, layered above everything else in the play area. */}
      <div
        className={`absolute inset-0 bg-red-600 pointer-events-none ${hit ? 'animate-flash-hit' : 'opacity-0'}`}
        aria-hidden
      />

      {/* Gold flash + banner when the level steps up, so the player has a
          beat of warning before speed/spawn-rate actually ramps. */}
      <div
        className={`absolute inset-0 bg-brand-accent-300 pointer-events-none ${showLevelUp ? 'animate-flash-hit' : 'opacity-0'}`}
        aria-hidden
      />
      {showLevelUp && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            key={level}
            className="font-display text-[7cqmin] font-extrabold text-white drop-shadow-2xl animate-countdown-pop"
          >
            Level {level}!
          </span>
        </div>
      )}

      {/* Non-blocking mid-run callout - gameplay keeps running underneath. */}
      {showRecordToast && (
        <div
          className="absolute inset-x-0 flex justify-center pointer-events-none z-40"
          style={{ top: 'calc(max(1rem, env(safe-area-inset-top)) + 3.75rem)' }}
        >
          <div className="px-5 py-2 rounded-full bg-brand-accent-400 text-brand-neutral-900 font-display font-extrabold text-[3cqmin] shadow-xl animate-toast-in-out">
            🏆 NEW RECORD BROKEN!
          </div>
        </div>
      )}

      <div
        className="absolute top-0 inset-x-0 p-4 flex items-center justify-between"
        style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
      >
        <div className="flex items-center gap-2">
          <div className="rounded-2xl bg-brand-neutral-800/85 border-2 border-brand-accent-500 px-4 py-2 font-display text-brand-accent-300 text-xl font-bold shadow-lg">
            {score}
          </div>
          <div className="rounded-2xl bg-brand-neutral-800/85 border-2 border-brand-primary-400 px-3 py-2 font-display text-brand-primary-200 text-sm font-bold shadow-lg">
            Lv. {level}
          </div>
        </div>
        <button
          onClick={() => navigate('/menu')}
          className="rounded-full bg-brand-neutral-800/85 border-2 border-brand-accent-500 w-10 h-10 flex items-center justify-center text-brand-accent-300 shadow-lg"
          aria-label="Exit to home"
        >
          ✕
        </button>
      </div>

      {status === 'ready' && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-primary-950/60 p-6">
          <WoodPanel className="max-w-md text-center">
            <h2 className="font-display text-2xl font-bold text-brand-accent-300 mb-3">Ready to Fly?</h2>

            <div className="flex items-center justify-center gap-4 mb-4">
              <BriefingTip icon="↔️" label="Swipe or Arrow Keys" />
              <BriefingTip icon="🚫" label="Dodge Waste" />
              <BriefingTip icon="🍃" label="Collect Power-Ups" />
            </div>

            <p className="text-brand-primary-100 mb-5 text-sm">
              Dodge scrap metal, e-waste, cans and cardboard - and grab glowing eco power-ups for
              bonus points. Keep Malaysia's skies clean!
            </p>
            <Button onClick={startGame}>Start Race</Button>
          </WoodPanel>
        </div>
      )}

      {status === 'countdown' && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-primary-950/40">
          <span
            key={countdownValue}
            className="font-display text-[20cqmin] font-extrabold text-white drop-shadow-2xl animate-countdown-pop"
          >
            {countdownValue}
          </span>
        </div>
      )}

      {status === 'gameover' && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-primary-950/70 p-6">
          <WoodPanel className="max-w-sm text-center">
            <p
              className={`font-display text-sm font-bold tracking-[0.1em] mb-1 ${
                isNewBest ? 'text-brand-accent-300 uppercase animate-pulse' : 'text-brand-primary-200'
              }`}
            >
              {performanceMessage}
            </p>
            <h2 className="font-display text-2xl font-bold text-brand-secondary-400 mb-1">Kite Down!</h2>
            <p className="text-brand-accent-300 font-display text-3xl font-extrabold mb-1">{score} m</p>
            {nearMissCount > 0 && (
              <p className="text-brand-primary-200 text-xs font-semibold mb-4">
                {nearMissCount} close {nearMissCount === 1 ? 'call' : 'calls'} - nice reflexes!
              </p>
            )}
            <div className={`flex flex-col gap-3 ${nearMissCount > 0 ? '' : 'mt-4'}`}>
              <Button onClick={startGame}>Race Again</Button>
              <div className="flex gap-3">
                <Button className="flex-1" variant="secondary" onClick={() => navigate('/leaderboard')}>
                  Leaderboard
                </Button>
                <Button className="flex-1" variant="ghost" onClick={() => navigate('/menu')}>
                  Home
                </Button>
              </div>
            </div>
          </WoodPanel>
        </div>
      )}
    </div>
  )
}

function BriefingTip({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-1 w-20">
      <span className="text-2xl leading-none" aria-hidden>
        {icon}
      </span>
      <span className="text-brand-primary-100 text-[10px] font-display font-semibold uppercase tracking-wide leading-tight">
        {label}
      </span>
    </div>
  )
}
