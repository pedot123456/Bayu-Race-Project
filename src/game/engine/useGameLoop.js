import { useEffect, useRef } from 'react'

// Drives a requestAnimationFrame loop and calls `onTick(deltaSeconds)` each
// frame while `isActive` is true. Delta is clamped to avoid huge jumps when
// the tab regains focus after being backgrounded.
export default function useGameLoop(onTick, isActive) {
  const onTickRef = useRef(onTick)
  const frameRef = useRef()
  const lastTimeRef = useRef()

  useEffect(() => {
    onTickRef.current = onTick
  }, [onTick])

  useEffect(() => {
    if (!isActive) {
      lastTimeRef.current = undefined
      return
    }

    const tick = (time) => {
      if (lastTimeRef.current !== undefined) {
        const deltaSeconds = Math.min((time - lastTimeRef.current) / 1000, 0.1)
        onTickRef.current(deltaSeconds)
      }
      lastTimeRef.current = time
      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frameRef.current)
      lastTimeRef.current = undefined
    }
  }, [isActive])
}
