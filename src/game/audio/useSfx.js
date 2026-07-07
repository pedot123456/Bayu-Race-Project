import { useCallback } from 'react'

// All sound effects are synthesized with the Web Audio API instead of
// shipped as files - no assets to record/license/place for lane-switch
// whooshes, score ticks, or the crash thud. One AudioContext is shared
// module-wide (browsers cap how many a page can create).
let sharedCtx = null

function getCtx() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return null
  if (!sharedCtx) sharedCtx = new AudioCtx()
  if (sharedCtx.state === 'suspended') sharedCtx.resume().catch(() => {})
  return sharedCtx
}

function tone(ctx, { freq = 440, endFreq, duration = 0.15, type = 'sine', gain = 0.25, delay = 0 }) {
  const osc = ctx.createOscillator()
  const gainNode = ctx.createGain()
  const t0 = ctx.currentTime + delay
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  if (endFreq) osc.frequency.exponentialRampToValueAtTime(Math.max(endFreq, 1), t0 + duration)
  gainNode.gain.setValueAtTime(gain, t0)
  gainNode.gain.exponentialRampToValueAtTime(0.001, t0 + duration)
  osc.connect(gainNode).connect(ctx.destination)
  osc.start(t0)
  osc.stop(t0 + duration + 0.02)
}

function noiseBurst(ctx, { duration = 0.25, gain = 0.35, delay = 0 }) {
  const size = Math.max(1, Math.floor(ctx.sampleRate * duration))
  const buffer = ctx.createBuffer(1, size, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < size; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / size)
  }
  const source = ctx.createBufferSource()
  source.buffer = buffer
  const gainNode = ctx.createGain()
  const t0 = ctx.currentTime + delay
  gainNode.gain.setValueAtTime(gain, t0)
  gainNode.gain.exponentialRampToValueAtTime(0.001, t0 + duration)
  source.connect(gainNode).connect(ctx.destination)
  source.start(t0)
}

const SOUNDS = {
  whoosh: (ctx) => tone(ctx, { freq: 720, endFreq: 240, duration: 0.12, type: 'sine', gain: 0.14 }),
  tick: (ctx) => tone(ctx, { freq: 880, duration: 0.1, type: 'triangle', gain: 0.18 }),
  nearMiss: (ctx) => {
    tone(ctx, { freq: 987, duration: 0.1, type: 'square', gain: 0.1 })
    tone(ctx, { freq: 1318, duration: 0.12, type: 'square', gain: 0.1, delay: 0.06 })
  },
  countdownBeep: (ctx) => tone(ctx, { freq: 523, duration: 0.15, type: 'sine', gain: 0.25 }),
  go: (ctx) => tone(ctx, { freq: 784, duration: 0.4, type: 'sine', gain: 0.3 }),
  crash: (ctx) => {
    noiseBurst(ctx, { duration: 0.3, gain: 0.4 })
    tone(ctx, { freq: 160, endFreq: 40, duration: 0.35, type: 'sawtooth', gain: 0.3 })
  },
  newBest: (ctx) => {
    tone(ctx, { freq: 523, duration: 0.14, type: 'sine', gain: 0.22 })
    tone(ctx, { freq: 659, duration: 0.14, type: 'sine', gain: 0.22, delay: 0.12 })
    tone(ctx, { freq: 784, duration: 0.22, type: 'sine', gain: 0.24, delay: 0.24 })
  },
  levelUp: (ctx) => {
    tone(ctx, { freq: 440, endFreq: 880, duration: 0.22, type: 'triangle', gain: 0.22 })
    tone(ctx, { freq: 660, duration: 0.16, type: 'triangle', gain: 0.16, delay: 0.16 })
  },
  powerup: (ctx) => {
    tone(ctx, { freq: 587, duration: 0.09, type: 'sine', gain: 0.2 })
    tone(ctx, { freq: 880, duration: 0.14, type: 'sine', gain: 0.2, delay: 0.07 })
  },
}

export default function useSfx() {
  return useCallback((name) => {
    try {
      const ctx = getCtx()
      if (!ctx) return
      SOUNDS[name]?.(ctx)
    } catch {
      // Web Audio unavailable/blocked - sound effects are non-critical.
    }
  }, [])
}
