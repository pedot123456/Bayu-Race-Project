import { DEFAULT_KITE_ID } from '../kiteDesigns.js'

const TEAM_KEY = 'bayuRace.team'
const LEADERBOARD_KEY = 'bayuRace.leaderboard'
const KITE_KEY = 'bayuRace.kiteId'
const MAX_ENTRIES = 20

export function saveTeam(team) {
  localStorage.setItem(TEAM_KEY, JSON.stringify(team))
}

export function getTeam() {
  const raw = localStorage.getItem(TEAM_KEY)
  return raw ? JSON.parse(raw) : null
}

export function saveKiteId(kiteId) {
  localStorage.setItem(KITE_KEY, kiteId)
}

export function getKiteId() {
  return localStorage.getItem(KITE_KEY) ?? DEFAULT_KITE_ID
}

export function getLeaderboard() {
  const raw = localStorage.getItem(LEADERBOARD_KEY)
  return raw ? JSON.parse(raw) : []
}

export function addScore(teamName, score) {
  const entries = getLeaderboard()
  const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`
  entries.push({ id, teamName, score, date: new Date().toISOString() })
  entries.sort((a, b) => b.score - a.score)
  const top = entries.slice(0, MAX_ENTRIES)
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top))
  return top
}
