import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { reduced } from './motion.js'

// Label whose letters roll up to a copy of themselves on hover (CSS in index.css, .roll).
export function Roll({ children }) {
  const text = String(children)
  const chars = [...text]
  const line = (cls) => (
    <span className={cls} aria-hidden="true">
      {chars.map((c, i) => <i key={i} style={{ '--i': i }}>{c === ' ' ? ' ' : c}</i>)}
    </span>
  )
  return <span className="roll"><span className="sr-only">{text}</span>{line('roll__a')}{line('roll__b')}</span>
}

// Numbers inside a label (for example "4–10 days") count up from zero when it scrolls into view.
export function CountUp({ value, className }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(value)
  useEffect(() => {
    const parts = value.split(/(\d+)/)
    if (parts.length < 2 || reduced()) return
    const el = ref.current
    if (el.getBoundingClientRect().top < window.innerHeight) return
    const at = (p) => parts.map((part, i) => (i % 2 ? String(Math.floor(Number(part) * p)) : part)).join('')
    setShown(at(0))
    let tween
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const state = { p: 0 }
      tween = gsap.to(state, { p: 1, duration: 2, ease: 'power2.out', onUpdate: () => setShown(at(state.p)), onComplete: () => setShown(value) })
    }, { rootMargin: '0px 0px -15% 0px' })
    io.observe(el)
    return () => { io.disconnect(); tween?.kill() }
  }, [value])
  return <b ref={ref} className={className}>{shown}</b>
}
