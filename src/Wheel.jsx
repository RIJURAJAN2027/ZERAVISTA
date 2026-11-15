import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { reduced } from './motion.js'

// Works on an endless wheel: cards sit on an arc around a point far below them.
// Drag (or swipe) to turn it; it coasts and settles on the nearest card.
export default function Wheel({ works, img, icons, onOpen }) {
  const stage = useRef(null)
  const badge = useRef(null)
  const cards = useRef([])
  const api = useRef(null)

  useEffect(() => {
    const el = stage.current
    const list = cards.current
    const n = list.length
    const state = { t: n > 2 ? 1 : 0 }
    let step = 21
    let spacing = 470
    let tween = null

    const render = () => {
      for (let i = 0; i < n; i++) {
        let rel = (((i - state.t) % n) + n) % n
        if (rel > n / 2) rel -= n
        const a = Math.abs(rel)
        const card = list[i]
        card.style.transform = `translateX(-50%) rotate(${(rel * step).toFixed(3)}deg)`
        card.style.zIndex = String(100 - Math.round(a * 10))
        card.style.visibility = a > 2.6 ? 'hidden' : 'visible'
        card.classList.toggle('is-front', a < 0.5)
      }
    }
    const measure = () => {
      const width = list[0].offsetWidth
      const gap = window.innerWidth <= 768 ? 22 : 34
      step = window.innerWidth <= 768 ? 20 : 21
      const radius = (width + gap) / Math.sin((step * Math.PI) / 180)
      spacing = width + gap
      list.forEach((card) => { card.style.transformOrigin = `50% ${radius.toFixed(1)}px` })
      render()
    }
    const go = (target, duration = 0.75) => {
      tween?.kill()
      if (reduced()) { state.t = target; render(); return }
      tween = gsap.to(state, { t: target, duration, ease: 'power3.out', onUpdate: render })
    }
    const nearest = (i) => {
      let rel = (((i - state.t) % n) + n) % n
      if (rel > n / 2) rel -= n
      return state.t + rel
    }
    api.current = {
      step: (dir) => go(Math.round(state.t) + dir),
      focus: (i) => go(Math.round(nearest(i))),
      front: (i) => { let rel = (((i - state.t) % n) + n) % n; if (rel > n / 2) rel -= n; return Math.abs(rel) < 0.5 },
    }

    // Dragging. Touch keeps vertical page scrolling (touch-action: pan-y on the stage).
    let down = false, moved = false, pid = null, startX = 0, startT = 0, lastX = 0, lastTime = 0, velocity = 0
    const onDown = (event) => {
      if (event.button) return
      down = true; moved = false; pid = event.pointerId
      startX = lastX = event.clientX; startT = state.t; lastTime = performance.now(); velocity = 0
      tween?.kill()
    }
    const onMove = (event) => {
      if (badge.current && event.pointerType === 'mouse') {
        const box = el.getBoundingClientRect()
        badge.current.style.transform = `translate(${event.clientX - box.left}px, ${event.clientY - box.top}px)`
      }
      if (!down || event.pointerId !== pid) return
      const dx = event.clientX - startX
      if (!moved && Math.abs(dx) > 6) { moved = true; tween?.kill(); el.classList.add('is-drag'); el.setPointerCapture?.(pid) }
      if (!moved) return
      const now = performance.now()
      velocity = (event.clientX - lastX) / Math.max(1, now - lastTime)
      lastX = event.clientX; lastTime = now
      state.t = startT - dx / spacing
      render()
    }
    const onUp = () => {
      if (!down) return
      down = false
      el.classList.remove('is-drag')
      if (moved) go(Math.round(state.t - (velocity * 260) / spacing))
    }
    const onCancel = () => { if (down && moved) go(Math.round(state.t)); down = false; el.classList.remove('is-drag') }
    // A drag must not also count as a click on the card underneath.
    const onClickCapture = (event) => { if (moved) { event.preventDefault(); event.stopPropagation(); moved = false } }
    // Sideways trackpad swipes turn the wheel too.
    let wheelTimer = null
    const onWheel = (event) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return
      event.preventDefault()
      tween?.kill()
      state.t += event.deltaX / spacing
      render()
      clearTimeout(wheelTimer)
      wheelTimer = setTimeout(() => go(Math.round(state.t), 0.5), 120)
    }
    const enter = (event) => { if (event.pointerType === 'mouse') el.classList.add('is-over') }
    const leave = () => el.classList.remove('is-over')

    measure()
    window.addEventListener('resize', measure)
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onCancel)
    el.addEventListener('click', onClickCapture, true)
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointerleave', leave)
    return () => {
      tween?.kill()
      clearTimeout(wheelTimer)
      window.removeEventListener('resize', measure)
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onCancel)
      el.removeEventListener('click', onClickCapture, true)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])

  // Clicking a side card turns it to the front; clicking the front card opens it.
  // Keyboard focus (Tab) also turns the focused card to the front; a mouse press does not,
  // so it never fights a drag.
  const open = (work, i) => { if (api.current?.front(i)) onOpen(work); else api.current?.focus(i) }

  return (
    <>
      <div className="wheel" ref={stage} aria-roledescription="carousel" aria-label="Our work">
        {works.map((work, i) => (
          <article className="wheel__card" key={work.id} ref={(el) => { cards.current[i] = el }} style={{ '--tint': work.tint }} onFocus={(event) => { if (event.target.matches(':focus-visible')) api.current?.focus(i) }}>
            <span className={`tag${work.live ? ' tag--live' : ''}`}>{work.live ? <><i />Live Now</> : 'Concept'}</span>
            <h3 className="h5">{work.name}</h3>
            <p>{work.line}</p>
            <button className="wheel__shot" type="button" onClick={() => open(work, i)} aria-label={`Open ${work.name}`}>
              <img src={img(work.images[0])} alt="" loading="lazy" draggable="false" width="1280" height="832" />
            </button>
            {work.live
              ? <a className="btn btn--light btn--sm wheel__go" href={work.url} target="_blank" rel="noopener">View Website {icons.arrow}</a>
              : <button className="btn btn--light btn--sm wheel__go" type="button" onClick={() => open(work, i)}>View Project {icons.arrow}</button>}
          </article>
        ))}
        <span className="wheel__badge" ref={badge} aria-hidden="true"><span>{icons.left}Drag{icons.right}</span></span>
      </div>
      <div className="wheel__nav">
        <button type="button" onClick={() => api.current?.step(-1)} aria-label="Previous project">{icons.left}</button>
        <span className="t-small">Drag</span>
        <button type="button" onClick={() => api.current?.step(1)} aria-label="Next project">{icons.right}</button>
      </div>
    </>
  )
}
