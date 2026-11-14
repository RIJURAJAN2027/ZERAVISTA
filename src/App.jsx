import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from './Hero.jsx'
import { CONTACT, NAV, FILTERS, WORKS, DIVISIONS, FLOW, PROCESS, STACK } from './data.js'

gsap.registerPlugin(ScrollTrigger)

const BASE = import.meta.env.BASE_URL
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const digits = CONTACT.whatsapp.replace(/\D/g, '')
const waLink = digits ? `https://wa.me/${digits}?text=${encodeURIComponent("Hi Zera Bytes, I'd like a free systems audit.")}` : ''

/* Pointer-reactive glass: sets --mx/--my for the moving highlight and, with `tilt`, --rx/--ry. */
function glassMove(event) {
  const el = event.currentTarget
  const b = el.getBoundingClientRect()
  const x = (event.clientX - b.left) / b.width
  const y = (event.clientY - b.top) / b.height
  el.style.setProperty('--mx', `${x * 100}%`)
  el.style.setProperty('--my', `${y * 100}%`)
  if (el.dataset.tilt !== undefined && !reduced()) {
    el.style.setProperty('--ry', `${(x - 0.5) * 9}deg`)
    el.style.setProperty('--rx', `${(0.5 - y) * 7}deg`)
  }
}
function glassLeave(event) {
  event.currentTarget.style.setProperty('--rx', '0deg')
  event.currentTarget.style.setProperty('--ry', '0deg')
}
const glassProps = { onPointerMove: glassMove, onPointerLeave: glassLeave }

/* Ripple from the click point on anything with .rip */
function useRipples() {
  useEffect(() => {
    const onDown = (event) => {
      const el = event.target.closest('.rip')
      if (!el || reduced()) return
      const b = el.getBoundingClientRect()
      const dot = document.createElement('span')
      dot.className = 'rip__dot'
      const size = Math.max(b.width, b.height) * 2
      dot.style.cssText = `width:${size}px;height:${size}px;left:${event.clientX - b.left - size / 2}px;top:${event.clientY - b.top - size / 2}px`
      el.appendChild(dot)
      dot.addEventListener('animationend', () => dot.remove())
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [])
}

/* ---------- icons ---------- */
const Icon = {
  web: (
    <svg viewBox="0 0 48 48" className="draw"><path d="M24 5 41 14.5v19L24 43 7 33.5v-19z" /><path d="M7 14.5 24 24l17-9.5M24 24v19" /></svg>
  ),
  auto: (
    <svg viewBox="0 0 48 48" className="draw"><circle cx="10" cy="12" r="5" /><circle cx="38" cy="24" r="5" /><circle cx="10" cy="36" r="5" /><path d="M15 12c11 0 8 12 18 12M15 36c11 0 8-12 18-12" /></svg>
  ),
  erp: (
    <svg viewBox="0 0 48 48" className="draw"><ellipse cx="24" cy="10" rx="16" ry="5" /><path d="M8 10v28c0 2.8 7.2 5 16 5s16-2.2 16-5V10M8 24c0 2.8 7.2 5 16 5s16-2.2 16-5" /></svg>
  ),
  arrow: (
    <svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 11 11 3M4.5 3H11v6.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  wa: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" /><path d="M9 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.1.7l-.5.6c-.1.2-.1.4 0 .5.6 1 1.4 1.8 2.4 2.3.2.1.4.1.5 0l.6-.6c.2-.2.5-.2.7-.1l1.5.7c.3.1.4.3.4.6v.4c0 .4-.2.8-.6 1-.6.3-1.6.5-2.9-.1-2-.9-3.6-2.6-4.4-4.5-.5-1.2-.4-2.3.1-2.9z" fill="currentColor" stroke="none" /></svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 3c5 0 9 3.4 9 7.7s-4 7.7-9 7.7c-1 0-2-.1-2.9-.4L4.5 20l1.2-3.6C4 15 3 13 3 10.7 3 6.4 7 3 12 3z" /></svg>
  ),
  up: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
  ),
}

/* ---------- navigation ---------- */
function Nav() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) setCurrent('#' + e.target.id) }), { rootMargin: '-45% 0px -50% 0px' })
    document.querySelectorAll('main section[id]').forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])
  return (
    <header className="nav">
      <div className="nav__pill glass" {...glassProps}>
        <a className="nav__brand" href="#top" onClick={() => setOpen(false)}>ZERA BYTES</a>
        <nav className="nav__links" aria-label="Sections">
          {NAV.map(([label, href]) => <a key={href} href={href} className={current === href ? 'is-current' : ''}>{label}</a>)}
        </nav>
        <a className="nav__cta rip" href="#contact">Let&apos;s talk</a>
        <button className="nav__menu" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </div>
      {open && (
        <nav className="nav__drawer glass" aria-label="Sections">
          {[...NAV, ['Contact', '#contact']].map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
      )}
    </header>
  )
}

/* ---------- works ---------- */
function Glyph({ work }) {
  return <span className="glyph" style={{ background: work.tint, color: work.ink }} aria-hidden="true">{work.name[0]}</span>
}

function Works({ onOpen }) {
  const [filter, setFilter] = useState('all')
  const barRef = useRef(null)
  const gridRef = useRef(null)
  const first = useRef(true)
  const shown = WORKS.filter((w) => filter === 'all' || w.cat === filter)

  // Slide the glass indicator under the active pill.
  useLayoutEffect(() => {
    const bar = barRef.current
    const active = bar.querySelector('[aria-pressed="true"]')
    bar.style.setProperty('--ix', `${active.offsetLeft}px`)
    bar.style.setProperty('--iw', `${active.offsetWidth}px`)
  }, [filter])

  // Re-deal the cards when the filter changes.
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return }
    if (reduced()) return
    const tween = gsap.fromTo(gridRef.current.children, { opacity: 0, y: 28, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out', stagger: 0.05, clearProps: 'opacity,transform' })
    return () => tween.kill()
  }, [filter])

  return (
    <section className="section works" id="work">
      <div className="wrap">
        <div className="works__head">
          <h2 className="title" data-reveal>Works</h2>
          <div className="filters glass" ref={barRef} role="group" aria-label="Filter works" data-reveal>
            <span className="filters__ind" aria-hidden="true" />
            {FILTERS.map(([key, label]) => (
              <button key={key} type="button" className="filter" aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>
            ))}
          </div>
        </div>
        <div className="grid" ref={gridRef}>
          {shown.map((work) => (
            <button key={work.id} type="button" className="work" data-card data-tilt {...glassProps} onClick={(e) => onOpen(work, e.currentTarget.querySelector('.work__shot'))} aria-label={`${work.name}, ${work.label}. Open details`}>
              <span className="work__frame glass">
                <img className="work__shot" src={`${BASE}work/${work.id}.jpg`} alt="" loading="lazy" width="1200" height="780" />
                <span className="work__go">{Icon.arrow}</span>
              </span>
              <span className="work__meta"><Glyph work={work} /><b>{work.name}</b><i>{work.label}</i></span>
            </button>
          ))}
        </div>
        <p className="fine">Concept projects</p>
      </div>
    </section>
  )
}

function WorkModal({ work, origin, onClose }) {
  const panelRef = useRef(null)
  const backRef = useRef(null)
  const closing = useRef(false)

  const close = () => {
    if (closing.current) return
    closing.current = true
    if (reduced()) { onClose(); return }
    gsap.to(panelRef.current, { y: 40, scale: 0.96, opacity: 0, duration: 0.3, ease: 'power2.in' })
    gsap.to(backRef.current, { opacity: 0, duration: 0.3, onComplete: onClose })
  }

  useLayoutEffect(() => {
    const panel = panelRef.current
    const shot = panel.querySelector('.modal__shot')
    document.documentElement.style.overflow = 'hidden'
    panel.querySelector('.modal__close').focus()
    const onKey = (event) => { if (event.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    let timeline
    if (!reduced()) {
      // Grow the image out of the card that was clicked.
      const from = origin
      const to = shot.getBoundingClientRect()
      timeline = gsap.timeline({ defaults: { ease: 'expo.out' } })
      timeline.fromTo(backRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0)
      timeline.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0)
      if (from) {
        timeline.fromTo(shot, { x: from.left - to.left, y: from.top - to.top, scaleX: from.width / to.width, scaleY: from.height / to.height, transformOrigin: '0 0', borderRadius: 18 }, { x: 0, y: 0, scaleX: 1, scaleY: 1, borderRadius: 14, duration: 0.75 }, 0)
      }
      timeline.from(panel.querySelectorAll('[data-in]'), { y: 22, opacity: 0, duration: 0.6, stagger: 0.06 }, 0.2)
    }
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      if (timeline) timeline.kill()
    }
  }, [])

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={work.name}>
      <div className="modal__back" ref={backRef} onClick={close} />
      <div className="modal__panel glass" ref={panelRef}>
        <button className="modal__close rip" type="button" onClick={close} aria-label="Close">×</button>
        <img className="modal__shot" src={`${BASE}work/${work.id}.jpg`} alt={`${work.name} screen`} width="1200" height="780" />
        <div className="modal__info">
          <div className="modal__name" data-in><Glyph work={work} /><h3>{work.name}</h3><span className="chip">{work.label}</span><span className="chip chip--soft">Concept</span></div>
          <p data-in>{work.line}</p>
          <div className="chips" data-in>{work.stack.map((t) => <span className="chip chip--soft" key={t}>{t}</span>)}</div>
          <a className="btn rip" href="#contact" onClick={close} data-in>Build something like this</a>
        </div>
      </div>
    </div>
  )
}

/* ---------- other sections ---------- */
function Marquee() {
  const row = [...STACK, ...STACK]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">{row.map((t, i) => <span key={i}>{t}</span>)}</div>
    </div>
  )
}

function Solutions() {
  return (
    <section className="section" id="solutions">
      <div className="wrap">
        <h2 className="title" data-reveal>Solutions</h2>
        <div className="sols">
          {DIVISIONS.map((d) => (
            <article className="sol glass" key={d.id} data-card data-tilt {...glassProps}>
              <div className="sol__top"><span className="sol__icon">{Icon[d.id]}</span><span className="mono">{d.layer}</span></div>
              <h3>{d.name}</h3>
              <p>{d.line}</p>
              <ul>{d.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  const words = 'One team builds your storefront, your automation and your ERP. They share the same data from day one.'.split(' ')
  return (
    <section className="section" id="about">
      <div className="wrap">
        <p className="statement" aria-label={words.join(' ')}>
          {words.map((word, i) => <span key={i} data-word aria-hidden="true">{word} </span>)}
        </p>
        <ol className="chain glass" data-reveal {...glassProps}>
          {FLOW.map((step) => <li key={step}><span className="chain__dot" />{step}</li>)}
          <li className="chain__line" aria-hidden="true"><i data-chain /></li>
        </ol>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <h2 className="title" data-reveal>Process</h2>
        <div className="rail" aria-hidden="true"><i data-rail /></div>
        <ol className="process">
          {PROCESS.map(([name, text], i) => (
            <li key={name} data-card><span className="process__n">{String(i + 1).padStart(2, '0')}</span><b>{name}</b><p>{text}</p></li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    try { navigator.clipboard.writeText(CONTACT.email).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }, () => {}) } catch { /* the address stays selectable */ }
  }
  const any = digits || CONTACT.email || CONTACT.booking
  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="contact glass" data-reveal {...glassProps}>
          <h2 className="title">Let&apos;s build yours.</h2>
          <p>Free 30-minute systems audit.</p>
          <div className="contact__row">
            {digits && <a className="btn rip" href={waLink} target="_blank" rel="noopener">WhatsApp</a>}
            {CONTACT.booking && <a className="btn btn--glass rip" href={CONTACT.booking} target="_blank" rel="noopener">Book a call</a>}
            {CONTACT.email && <button className="btn btn--glass rip" type="button" onClick={copy}><span className="select">{copied ? 'Copied' : CONTACT.email}</span></button>}
            {!any && <span className="chip chip--soft">Contact details coming soon</span>}
          </div>
        </div>
      </div>
    </section>
  )
}

function Dock() {
  const [top, setTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setTop(window.scrollY > window.innerHeight)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="dock glass" {...glassProps}>
      <a className="dock__btn rip" href={waLink || '#contact'} {...(waLink ? { target: '_blank', rel: 'noopener' } : {})} aria-label="WhatsApp">{Icon.wa}</a>
      <a className="dock__btn dock__btn--solid rip" href="#contact" aria-label="Contact">{Icon.chat}</a>
      {top && <a className="dock__btn rip" href="#top" aria-label="Back to top">{Icon.up}</a>}
    </div>
  )
}

export default function App() {
  const [open, setOpen] = useState(null)
  const siteRef = useRef(null)
  useRipples()

  // Scroll-driven motion. Transforms only at rest, so content is never hidden if this fails.
  useEffect(() => {
    if (reduced()) return
    const context = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, { y: 60, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
      })
      ScrollTrigger.batch('[data-card]', {
        start: 'top 92%',
        once: true,
        onEnter: (batch) => gsap.from(batch, { y: 70, scale: 0.94, rotateX: 8, duration: 1, ease: 'expo.out', stagger: 0.08, clearProps: 'transform' }),
      })
      gsap.fromTo('[data-word]', { opacity: 0.28 }, { opacity: 1, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: '.statement', start: 'top 80%', end: 'bottom 45%', scrub: true } })
      gsap.fromTo('[data-chain]', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.chain', start: 'top 85%', end: 'top 45%', scrub: true } })
      gsap.fromTo('[data-rail]', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.process', start: 'top 85%', end: 'top 35%', scrub: true } })
      gsap.utils.toArray('.draw').forEach((svg) => {
        const paths = svg.querySelectorAll('path, circle, ellipse')
        paths.forEach((path) => { const len = path.getTotalLength(); path.style.strokeDasharray = len; path.style.strokeDashoffset = len })
        gsap.to(paths, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.out', stagger: 0.12, scrollTrigger: { trigger: svg, start: 'top 88%' } })
      })
      gsap.to('.blob--a', { y: 260, ease: 'none', scrollTrigger: { trigger: siteRef.current, start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.to('.blob--b', { y: -320, ease: 'none', scrollTrigger: { trigger: siteRef.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    }, siteRef)
    return () => context.revert()
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className="site" ref={siteRef}>
          <span className="blob blob--a" aria-hidden="true" />
          <span className="blob blob--b" aria-hidden="true" />
          <span className="blob blob--c" aria-hidden="true" />
          <Works onOpen={(work, shot) => setOpen({ work, origin: shot ? shot.getBoundingClientRect() : null })} />
          <Marquee />
          <Solutions />
          <About />
          <Process />
          <Contact />
          <footer className="footer"><div className="wrap"><span>© {new Date().getFullYear()} Zera Bytes</span><span>Web · Automate · Core ERP</span></div></footer>
        </div>
      </main>
      <Dock />
      {open && <WorkModal work={open.work} origin={open.origin} onClose={() => setOpen(null)} />}
    </>
  )
}
