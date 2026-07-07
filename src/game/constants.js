export const LANE_X = [20, 50, 80] // percent, left/center/right
export const LANE_COUNT = LANE_X.length
export const CENTER_LANE = 1

export const OBSTACLE_TYPES = ['scrap', 'ewaste', 'bottle', 'can', 'box']

// Eco power-ups spawn instead of an obstacle this often per spawn tick, and
// grant an instant score bonus when collected instead of ending the race.
export const POWERUP_SPAWN_CHANCE = 0.18
export const POWERUP_BONUS = 25

export const PLAYER_Y = 78 // percent from top of the play area
export const COLLISION_WINDOW = 9 // +/- percent y counted as a hit
export const NEAR_MISS_WINDOW = 16 // +/- percent y counted as a close call
export const NEAR_MISS_BONUS = 8 // points awarded for a close call
export const SCORE_MILESTONE = 100 // a tick sound + pulse every N points

// Game-over feedback tiers (see GameCanvas.jsx getPerformanceMessage). A
// new #1 leaderboard score always gets the top message regardless of these.
export const SCORE_TIER_GOOD_MIN = 100

export const COUNTDOWN_STEP_MS = 700
export const COUNTDOWN_GO_MS = 500
export const NEW_RECORD_TOAST_MS = 2200

// Every LEVEL_UP_INTERVAL_SEC of survival, the level ticks up by one and
// the game takes a noticeable step up in difficulty on top of the gradual
// per-second ramp below: LEVEL_SPEED_STEP is added to scroll/fall speed and
// LEVEL_SPAWN_STEP_MS is shaved off the obstacle spawn interval, per level.
export const LEVEL_UP_INTERVAL_SEC = 10
export const LEVEL_SPEED_STEP = 7 // extra speed per level (percent of screen height/sec)
export const LEVEL_SPAWN_STEP_MS = 90 // extra spawn-interval reduction per level
export const LEVEL_UP_FLASH_MS = 1100 // how long the "Level Up!" banner/flash stays up

export const INITIAL_SPEED = 34 // percent of screen height per second
export const MAX_SPEED = 78
export const SPEED_RAMP_PER_SEC = 0.5

export const SPAWN_INTERVAL_START = 1300 // ms
export const SPAWN_INTERVAL_MIN = 620
export const SPAWN_RAMP_PER_SEC = 12 // ms shaved off interval per second survived

export const SCORE_PER_SEC = 12
