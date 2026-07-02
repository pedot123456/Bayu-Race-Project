export const LANE_X = [20, 50, 80] // percent, left/center/right
export const LANE_COUNT = LANE_X.length
export const CENTER_LANE = 1

export const OBSTACLE_TYPES = ['tornado', 'bird', 'storm']

export const PLAYER_Y = 78 // percent from top of the play area
export const COLLISION_WINDOW = 9 // +/- percent y counted as a hit

export const INITIAL_SPEED = 34 // percent of screen height per second
export const MAX_SPEED = 78
export const SPEED_RAMP_PER_SEC = 0.5

export const SPAWN_INTERVAL_START = 1300 // ms
export const SPAWN_INTERVAL_MIN = 620
export const SPAWN_RAMP_PER_SEC = 12 // ms shaved off interval per second survived

export const SCORE_PER_SEC = 12
