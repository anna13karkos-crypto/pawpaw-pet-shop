import { useEffect, useRef, useState } from 'react'

interface Point {
  x: number
  y: number
}

/**
 * Tracks normalized cursor offset (-1..1) from the center of `ref`,
 * only on pointer:fine desktop devices, and stays at rest otherwise.
 */
export function useParallax(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 })
  const frame = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) {
      setOffset({ x: 0, y: 0 })
      return
    }
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    const el = ref.current
    if (!el) return

    const handleMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1
      if (frame.current) cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        setOffset({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) })
      })
    }

    el.addEventListener('pointermove', handleMove)
    return () => {
      el.removeEventListener('pointermove', handleMove)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [ref, enabled])

  return offset
}
