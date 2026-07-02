import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Environment from './entities/Environment.jsx'
import Player from './entities/Player.jsx'
import Obstacle from './entities/Obstacle.jsx'
import useGameLoop from './engine/useGameLoop.js'
import useSwipe from './engine/useSwipe.js'
import WoodPanel from '../components/ui/WoodPanel.jsx'
import Button from '../components/ui/Button.jsx'
import { getTeam, getKiteId, addScore } from './store/localStore.js'
import { getKiteDesign } from './kiteDesigns.js'
import {
  LANE_X,
  CENTER_LANE,
  OBSTACLE_TYPES,
  PLAYER_Y,
  COLLISION_WINDOW,
  INITIAL_SPEED,
  MAX_SPEED,
  SPEED_RAMP_PER_SEC,
  SPAWN_INTERVAL_START,
  SPAWN_INTERVAL_MIN,
  SPAWN_RAMP_PER_SEC,
  SCORE_PER_SEC,
} from './constants.js'

let obstacleSeq = 0

function freshRuntime() {
  return {
    speed: INITIAL_SPEED,
    spawnInterval: SPAWN_INTERVAL_START,
    spawnTimer: 0,
    elapsed: 0,
    scoreAcc: 0,
  }
}

export default function GameCanvas() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('ready') // ready | running | gameover
  const [lane, setLane] = useState(CENTER_LANE)
  const [obstacles, setObstacles] = useState([])
  const [score, setScore] = useState(0)
  const [hit, setHit] = useState(false)

  const team = getTeam()
  const kiteDesign = getKiteDesign(getKiteId())
  const runtimeRef = useRef(freshRuntime())
  const laneRef = useRef(lane)
  laneRef.current = lane
  const obstaclesRef = useRef([])
  const endedRef = useRef(false)

  const moveLeft = useCallback(() => setLane((l) => Math.max(0, l - 1)), [])
  const moveRight = useCallback(
    () => setLane((l) => Math.min(LANE_X.length - 1, l + 1)),
    [],
  )

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
      setHit(true)
      setStatus('gameover')
      addScore(team?.teamName ?? 'Unregistered', Math.round(finalScore))
    },
    [team],
  )

  const tick = useCallback(
    (dt) => {
      if (endedRef.current) return

      const rt = runtimeRef.current
      rt.elapsed += dt
      rt.speed = Math.min(MAX_SPEED, INITIAL_SPEED + rt.elapsed * SPEED_RAMP_PER_SEC)
      rt.spawnInterval = Math.max(
        SPAWN_INTERVAL_MIN,
        SPAWN_INTERVAL_START - rt.elapsed * SPAWN_RAMP_PER_SEC,
      )
      rt.spawnTimer += dt * 1000
      rt.scoreAcc += dt * SCORE_PER_SEC * (rt.speed / INITIAL_SPEED)

      let spawned = null
      if (rt.spawnTimer >= rt.spawnInterval) {
        rt.spawnTimer = 0
        spawned = {
          id: obstacleSeq++,
          lane: Math.floor(Math.random() * LANE_X.length),
          type: OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)],
          y: -10,
        }
      }

      const moved = obstaclesRef.current
        .map((o) => ({ ...o, y: o.y + rt.speed * dt }))
        .filter((o) => o.y < 108)
      const next = spawned ? [...moved, spawned] : moved
      obstaclesRef.current = next
      setObstacles(next)

      const collided = next.some(
        (o) => o.lane === laneRef.current && Math.abs(o.y - PLAYER_Y) <= COLLISION_WINDOW,
      )

      setScore(Math.round(rt.scoreAcc))

      if (collided) endGame(rt.scoreAcc)
    },
    [endGame],
  )

  useGameLoop(tick, status === 'running')

  const startGame = () => {
    runtimeRef.current = freshRuntime()
    obstaclesRef.current = []
    endedRef.current = false
    setObstacles([])
    setScore(0)
    setLane(CENTER_LANE)
    setHit(false)
    setStatus('running')
  }

  return (
    <div
      className="relative w-full h-full select-none"
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
            <Obstacle type={o.type} />
          </div>
        ))}

        <div
          className="absolute -translate-x-1/2 transition-[left] duration-150 ease-out"
          style={{ left: `${LANE_X[lane]}%`, top: `${PLAYER_Y}%` }}
        >
          <Player hit={hit} design={kiteDesign} />
        </div>
      </div>

      <div
        className="absolute top-0 inset-x-0 p-4 flex items-center justify-between"
        style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
      >
        <div className="rounded-2xl bg-wood-800/85 border-2 border-gold-500 px-4 py-2 font-display text-gold-300 text-xl font-bold shadow-lg">
          {score}
        </div>
        <button
          onClick={() => navigate('/menu')}
          className="rounded-full bg-wood-800/85 border-2 border-gold-500 w-10 h-10 flex items-center justify-center text-gold-300 shadow-lg"
          aria-label="Exit to home"
        >
          ✕
        </button>
      </div>

      {status === 'ready' && (
        <div className="absolute inset-0 flex items-center justify-center bg-teal-950/60 p-6">
          <WoodPanel className="max-w-xs text-center">
            <h2 className="font-display text-2xl font-bold text-gold-300 mb-2">Ready to Fly?</h2>
            <p className="text-teal-100 mb-5 text-sm">
              Swipe left/right (or use arrow keys) to dodge tornadoes, birds and storm clouds.
            </p>
            <Button onClick={startGame}>Start Race</Button>
          </WoodPanel>
        </div>
      )}

      {status === 'gameover' && (
        <div className="absolute inset-0 flex items-center justify-center bg-teal-950/70 p-6">
          <WoodPanel className="max-w-xs text-center">
            <h2 className="font-display text-2xl font-bold text-orange-400 mb-1">Kite Down!</h2>
            <p className="text-gold-300 font-display text-3xl font-extrabold mb-4">{score} m</p>
            <div className="flex flex-col gap-3">
              <Button onClick={startGame}>Race Again</Button>
              <Button variant="secondary" onClick={() => navigate('/leaderboard')}>
                Leaderboard
              </Button>
              <Button variant="ghost" onClick={() => navigate('/menu')}>
                Home
              </Button>
            </div>
          </WoodPanel>
        </div>
      )}
    </div>
  )
}
