import { useEffect, useRef, useState } from 'react'

// "KRAMAKALA" (Epic Cinematic Gamelan Nusantara) - see public/audio/README.txt
// if you ever swap this for a different track. encodeURI escapes the
// filename's spaces/parentheses into a valid URL - the file on disk keeps
// its exact original name.
const MUSIC_SRC = encodeURI(
  '/audio/KRAMAKALA (BACKSOUND GAMELAN NUSANTARA ) - Epic Cinematic Gamelan Nusantara.mp3',
)

// Tuned to sit under the SFX and dialogue-weight UI copy rather than
// dominate: loud enough to read as "there's music" on a booth speaker,
// quiet enough that lane-switch whooshes/crashes/countdown beeps still cut
// through clearly on top of it.
const TARGET_VOLUME = 0.35
const FADE_IN_MS = 1500

// Ramps audio.volume from 0 up to `target` over `durationMs` instead of
// snapping straight to it - avoids the track "hitting" at full volume the
// instant autoplay is allowed, which reads as jarring on a first visit.
function fadeIn(audio, target, durationMs) {
  const steps = 30
  const stepMs = durationMs / steps
  let i = 0
  audio.volume = 0
  const timer = setInterval(() => {
    i += 1
    audio.volume = Math.min(target, (target * i) / steps)
    if (i >= steps) clearInterval(timer)
  }, stepMs)
  return () => clearInterval(timer)
}

// Menu screens (Welcome/Home/Leaderboard/Registration/Kite Select) play the
// instrumental track; the Game screen is "active gameplay" and passes
// `enabled: false` so it can pause completely and let the player focus -
// see App.jsx, which derives `enabled` from the current route.
export default function useBackgroundMusic({ enabled = true, volume = TARGET_VOLUME, fadeInMs = FADE_IN_MS } = {}) {
  const audioRef = useRef(null)
  const cancelFadeRef = useRef(() => {})
  const [muted, setMuted] = useState(false)

  // Create the audio element exactly once for the app's lifetime.
  useEffect(() => {
    const audio = new Audio(MUSIC_SRC)
    audio.loop = true
    audio.volume = 0
    audio.preload = 'auto'
    audioRef.current = audio

    return () => {
      cancelFadeRef.current()
      audio.pause()
      audio.src = ''
    }
  }, [])

  // Play (with fade-in) when enabled, pause outright when not. Browsers
  // block unmuted autoplay until the user has interacted with the page, so
  // this also retries on the first pointer/key interaction if the initial
  // play() attempt is rejected.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (!enabled) {
      cancelFadeRef.current()
      audio.pause()
      return undefined
    }

    // Listeners are only attached when an attempt is actually blocked, and
    // removed the instant playback succeeds - otherwise every later click
    // anywhere in the app (e.g. every menu button) would call tryPlay()
    // again and restart the fade from zero, making the track audibly dip
    // and re-swell on every interaction.
    const tryPlay = () => {
      audio
        .play()
        .then(() => {
          window.removeEventListener('pointerdown', unlock)
          window.removeEventListener('keydown', unlock)
          cancelFadeRef.current()
          cancelFadeRef.current = fadeIn(audio, volume, fadeInMs)
        })
        .catch(() => {
          window.addEventListener('pointerdown', unlock)
          window.addEventListener('keydown', unlock)
        })
    }
    const unlock = () => tryPlay()
    tryPlay()

    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [enabled, volume, fadeInMs])

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted
  }, [muted])

  return { muted, toggleMute: () => setMuted((m) => !m) }
}
