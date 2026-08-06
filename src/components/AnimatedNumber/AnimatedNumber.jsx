import { useEffect, useState } from 'react'
import useInView from '../../hooks/useInView'

function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  duration = 2000,
  decimals = 0,
}) {
  const { ref, inView } = useInView({ threshold: 0.4 })
  const [started, setStarted] = useState(false)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView || started) return undefined
    setStarted(true)

    let raf
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setDisplay(value)
      }
    }
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [inView, started, value, duration])

  const text = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString()

  return (
    <span className="animated-number" ref={ref}>
      {prefix}
      {text}
      {suffix}
    </span>
  )
}

export default AnimatedNumber
