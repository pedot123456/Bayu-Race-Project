import { useCallback, useEffect, useRef } from 'react'

const SWIPE_THRESHOLD_PX = 30

// Lane-switch input: touch swipe left/right on the returned handlers, plus
// arrow-key support for desktop testing.
export default function useSwipe({ onLeft, onRight, enabled = true }) {
  const startXRef = useRef(null)

  const onTouchStart = useCallback((e) => {
    startXRef.current = e.touches[0].clientX
  }, [])

  const onTouchEnd = useCallback(
    (e) => {
      if (startXRef.current === null) return
      const deltaX = e.changedTouches[0].clientX - startXRef.current
      startXRef.current = null
      if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return
      if (deltaX < 0) onLeft?.()
      else onRight?.()
    },
    [onLeft, onRight],
  )

  useEffect(() => {
    if (!enabled) return
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') onLeft?.()
      if (e.key === 'ArrowRight' || e.key === 'd') onRight?.()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [enabled, onLeft, onRight])

  return { onTouchStart, onTouchEnd }
}
