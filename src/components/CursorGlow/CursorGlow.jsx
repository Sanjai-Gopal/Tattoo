import { useEffect, useRef } from 'react'
import './CursorGlow.css'

function CursorGlow() {
  const glowRef = useRef(null)
  const dotRef = useRef(null)
  const glow = useRef({ x: -100, y: -100 })
  const dot = useRef({ x: -100, y: -100 })

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined
    }

    const onMove = (e) => {
      dot.current.x = e.clientX
      dot.current.y = e.clientY
    }
    let raf
    const tick = () => {
      glow.current.x += (dot.current.x - glow.current.x) * 0.18
      glow.current.y += (dot.current.y - glow.current.y) * 0.18
      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${glow.current.x}px, ${glow.current.y}px) translate(-50%, -50%)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${dot.current.x}px, ${dot.current.y}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="cursor-glow" ref={glowRef} aria-hidden="true" />
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  )
}

export default CursorGlow
