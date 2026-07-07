import { useCallback, useEffect, useState } from 'react'

// Wraps the Fullscreen API. On a real monitor, a normal (non-fullscreen)
// browser window loses vertical space to the tab bar/address bar, so the
// visible viewport ends up wider-than-16:9 and the 16:9 stage letterboxes
// with visible side bars even on an exact 16:9 display. True fullscreen
// removes all browser chrome so the stage can fill the monitor edge to
// edge. Must be triggered from a user gesture (click/tap) - browsers
// reject requestFullscreen() calls made outside one.
export default function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(() => Boolean(document.fullscreenElement))

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const enterFullscreen = useCallback(() => {
    document.documentElement.requestFullscreen?.().catch(() => {})
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {})
    } else {
      enterFullscreen()
    }
  }, [enterFullscreen])

  return { isFullscreen, enterFullscreen, toggleFullscreen }
}
