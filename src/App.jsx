import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from './Hero.jsx'
import { CONTACT, NAV, FILTERS, WORKS, DIVISIONS, FLOW, SPECIAL, CLIENTS, HOME_LIMIT } from './data.js'
import { POLICIES, UPDATED } from './policies.js'

gsap.registerPlugin(ScrollTrigger)

const BASE = import.meta.env.BASE_URL
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const digits = CONTACT.whatsapp.replace(/\D/g, '')
const waLink = `https://wa.me/${digits}?text=${encodeURIComponent("Hi Zera Bytes, I'd like a quotation.")}`
const telLink = `tel:+${digits}`

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
  call: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" /></svg>
  ),
  support: (
    <svg viewBox="0 0 48 48" className="draw"><path d="M24 6 39 12v11c0 9-6 16-15 19C15 39 9 32 9 23V12z" /><path d="M17 24l5 5 9-10" /></svg>
  ),
  quote: (
    <svg viewBox="0 0 48 48" className="draw"><path d="M8 10h32v22H22l-9 8v-8H8z" /><path d="M16 18h16M16 24h10" /></svg>
  ),
  fast: (
    <svg viewBox="0 0 48 48" className="draw"><circle cx="24" cy="26" r="15" /><path d="M24 26V16M19 5h10M35 13l3-3" /></svg>
  ),
  study: (
    <svg viewBox="0 0 48 48" className="draw"><circle cx="21" cy="21" r="12" /><path d="M30 30l11 11M16 21h10M21 16v10" /></svg>
  ),
  spark: (
    <svg viewBox="0 0 48 48" className="draw"><path d="M24 5c-8 0-13 6-13 12 0 5 3 8 6 11v5h14v-5c3-3 6-6 6-11 0-6-5-12-13-12z" /><path d="M19 39h10M21 44h6" /></svg>
  ),
  back: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
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
        <a className="nav__brand" href="#top" onClick={() => setOpen(false)} aria-label="Zera Bytes"><img src={`${BASE}logo.png`} alt="" width="36" height="36" /><span>zera bytes</span></a>
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

function FilterBar({ filter, setFilter }) {
  const barRef = useRef(null)
  // Slide the glass indicator under the active pill.
  useLayoutEffect(() => {
    const bar = barRef.current
    const active = bar.querySelector('[aria-pressed="true"]')
    bar.style.setProperty('--ix', `${active.offsetLeft}px`)
    bar.style.setProperty('--iw', `${active.offsetWidth}px`)
  }, [filter])
  return (
    <div className="filters glass" ref={barRef} role="group" aria-label="Filter works">
      <span className="filters__ind" aria-hidden="true" />
      {FILTERS.map(([key, label]) => (
        <button key={key} type="button" className="filter" aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>
      ))}
    </div>
  )
}

function WorkGrid({ items, filter, onOpen, animateCards }) {
  const gridRef = useRef(null)
  const first = useRef(true)
  // Re-deal the cards when the filter changes.
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return }
    if (reduced()) return
    const tween = gsap.fromTo(gridRef.current.children, { opacity: 0, y: 28, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out', stagger: 0.05, clearProps: 'opacity,transform' })
    return () => tween.kill()
  }, [filter])
  return (
    <div className="grid" ref={gridRef}>
      {items.map((work) => (
        <button key={work.id} type="button" className="work" {...(animateCards ? { 'data-card': '' } : {})} data-tilt {...glassProps} onClick={(e) => onOpen(work, e.currentTarget.querySelector('.work__shot'))} aria-label={`${work.name}, ${work.label}. Open details`}>
          <span className="work__frame glass">
            <img className="work__shot" src={`${BASE}work/${work.id}.jpg`} alt="" loading="lazy" width="1200" height="780" />
            <span className="work__go">{Icon.arrow}</span>
          </span>
          <span className="work__meta"><Glyph work={work} /><b>{work.name}</b><i>{work.label}</i></span>
        </button>
      ))}
    </div>
  )
}

const pick = (filter) => WORKS.filter((w) => filter === 'all' || w.cat === filter)

function Works({ filter, setFilter, onOpen }) {
  return (
    <section className="section works" id="work">
      <div className="wrap">
        <div className="works__head">
          <h2 className="title" data-reveal>Works</h2>
          <div data-reveal><FilterBar filter={filter} setFilter={setFilter} /></div>
        </div>
        <WorkGrid items={pick(filter).slice(0, HOME_LIMIT)} filter={filter} onOpen={onOpen} animateCards />
        <div className="works__more"><a className="btn rip" href="#all-works">See more {Icon.arrow}</a></div>
      </div>
    </section>
  )
}

/* Full-screen page with every project. Opens at #all-works. */
function AllWorks({ filter, setFilter, onOpen }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    let tween
    if (!reduced()) tween = gsap.fromTo(ref.current, { clipPath: 'circle(0% at 50% 100%)' }, { clipPath: 'circle(150% at 50% 100%)', duration: 0.9, ease: 'expo.out', clearProps: 'clipPath' })
    const onKey = (event) => { if (event.key === 'Escape' && !document.querySelector('.modal')) window.location.hash = 'work' }
    window.addEventListener('keydown', onKey)
    return () => { document.documentElement.style.overflow = ''; window.removeEventListener('keydown', onKey); if (tween) tween.kill() }
  }, [])
  const items = pick(filter)
  return (
    <div className="all" ref={ref} role="dialog" aria-modal="true" aria-label="All works">
      <div className="wrap">
        <div className="all__bar">
          <a className="all__back glass rip" href="#work">{Icon.back}<span>Back</span></a>
          <span className="mono">{items.length} {items.length === 1 ? 'project' : 'projects'}</span>
        </div>
        <div className="works__head">
          <h2 className="title">All works</h2>
          <FilterBar filter={filter} setFilter={setFilter} />
        </div>
        <WorkGrid items={items} filter={filter} onOpen={onOpen} />
        <p className="fine">Concept projects</p>
      </div>
    </div>
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
function Clients() {
  const row = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS]
  return (
    <section className="clients" aria-label="Our clients">
      <p className="mono clients__label">Our clients</p>
      <div className="marquee">
        <div className="marquee__track">{row.map((name, i) => <span key={i} aria-hidden={i >= CLIENTS.length}>{name}</span>)}</div>
      </div>
    </section>
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
              <div className="sol__top"><span className="sol__icon">{Icon[d.id]}</span></div>
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
  const words = 'We study your company first. Then we build what you imagine and make it live.'.split(' ')
  return (
    <section className="section" id="about">
      <div className="wrap">
        <p className="statement" aria-label={words.join(' ')}>
          {words.map((word, i) => <span key={i} data-word aria-hidden="true">{word} </span>)}
        </p>
        <h2 className="title title--sm" data-reveal>Our business flow</h2>
        <ol className="chain glass" data-reveal {...glassProps}>
          {FLOW.map(([step, when]) => <li key={step}><span className="chain__dot" /><span><b>{step}</b><i>{when}</i></span></li>)}
          <li className="chain__line" aria-hidden="true"><i data-chain /></li>
        </ol>
      </div>
    </section>
  )
}

function Special() {
  return (
    <section className="section" id="special">
      <div className="wrap">
        <h2 className="title" data-reveal>Our specialities</h2>
        <div className="specials">
          {SPECIAL.map(([figure, name, line, icon]) => (
            <article className={`special glass${figure ? ' special--fig' : ''}`} key={name} data-card data-tilt {...glassProps}>
              <span className="sol__icon">{Icon[icon]}</span>
              {figure && <span className="special__fig">{figure}</span>}
              <h3>{name}</h3>
              <p>{line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="contact glass" data-reveal {...glassProps}>
          <h2 className="title">Let&apos;s build yours.</h2>
          <p className="contact__num select">{CONTACT.phone}</p>
          <div className="contact__row">
            <a className="btn rip" href={telLink}>{Icon.call} Call</a>
            <a className="btn btn--glass rip" href={waLink} target="_blank" rel="noopener">{Icon.wa} WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Full-screen policy page. Opens at #privacy, #terms, #refund or #support. */
function Policy({ id }) {
  const ref = useRef(null)
  const policy = POLICIES[id]
  useLayoutEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    ref.current.scrollTop = 0
    let tween
    if (!reduced()) tween = gsap.fromTo(ref.current, { clipPath: 'circle(0% at 50% 100%)' }, { clipPath: 'circle(150% at 50% 100%)', duration: 0.9, ease: 'expo.out', clearProps: 'clipPath' })
    const onKey = (event) => { if (event.key === 'Escape') window.location.hash = 'contact' }
    window.addEventListener('keydown', onKey)
    return () => { document.documentElement.style.overflow = ''; window.removeEventListener('keydown', onKey); if (tween) tween.kill() }
  }, [id])
  return (
    <div className="all" ref={ref} role="dialog" aria-modal="true" aria-label={policy.title}>
      <div className="wrap policy">
        <div className="all__bar">
          <a className="all__back glass rip" href="#contact">{Icon.back}<span>Back</span></a>
          <span className="mono">Updated {UPDATED}</span>
        </div>
        <h2 className="title title--sm">{policy.title}</h2>
        <div className="policy__body glass">
          {policy.sections.map(([heading, text]) => <section key={heading}><h3>{heading}</h3><p>{text}</p></section>)}
          <section><h3>Contact</h3><p>Zera Bytes · Call or WhatsApp <span className="select">{CONTACT.phone}</span></p></section>
        </div>
      </div>
    </div>
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
      <a className="dock__btn rip" href={waLink} target="_blank" rel="noopener" aria-label="WhatsApp">{Icon.wa}</a>
      <a className="dock__btn dock__btn--solid rip" href={telLink} aria-label={`Call ${CONTACT.phone}`}>{Icon.call}</a>
      {top && <a className="dock__btn rip" href="#top" aria-label="Back to top">{Icon.up}</a>}
    </div>
  )
}

export default function App() {
  const [open, setOpen] = useState(null)
  const [filter, setFilter] = useState('all')
  const [hash, setHash] = useState(() => window.location.hash)
  const siteRef = useRef(null)
  const openWork = (work, shot) => setOpen({ work, origin: shot ? shot.getBoundingClientRect() : null })
  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
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
      gsap.utils.toArray('.draw').forEach((svg) => {
        const paths = svg.querySelectorAll('path, circle, ellipse')
        paths.forEach((path) => { const len = path.getTotalLength(); path.style.strokeDasharray = len; path.style.strokeDashoffset = len })
        gsap.to(paths, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.out', stagger: 0.12, scrollTrigger: { trigger: svg, start: 'top 88%' } })
      })
    }, siteRef)
    return () => context.revert()
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className="site" ref={siteRef}>
          <Works filter={filter} setFilter={setFilter} onOpen={openWork} />
          <Clients />
          <Solutions />
          <About />
          <Special />
          <Contact />
          <footer className="footer"><div className="wrap"><span className="footer__brand"><img src={`${BASE}logo.png`} alt="" width="28" height="28" />© {new Date().getFullYear()} Zera Bytes · We build your dream</span><nav aria-label="Policies">{Object.entries(POLICIES).map(([id, policy]) => <a key={id} href={`#${id}`}>{policy.title}</a>)}</nav></div></footer>
        </div>
      </main>
      <Dock />
      {POLICIES[hash.slice(1)] && <Policy id={hash.slice(1)} />}
      {hash === '#all-works' && <AllWorks filter={filter} setFilter={setFilter} onOpen={openWork} />}
      {open && <WorkModal work={open.work} origin={open.origin} onClose={() => setOpen(null)} />}
    </>
  )
}
