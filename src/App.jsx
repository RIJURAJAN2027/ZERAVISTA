import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from './Hero.jsx'
import Wheel from './Wheel.jsx'
import { Roll, CountUp } from './bits.jsx'
import { reduced, startSmoothScroll, startTitlePrint, startBracketCursor, lockScroll, unlockScroll } from './motion.js'
import { BRAND, CONTACT, NAV, CLIENTS, WORKS, STATS, SPECIALS, FLOW, SERVICES, GALLERY, SUPPORT, FAQ, TOOLS } from './data.js'
import { POLICIES, UPDATED } from './policies.js'

gsap.registerPlugin(ScrollTrigger)

const BASE = import.meta.env.BASE_URL
const img = (name) => `${BASE}work/${name}.jpg`
const digits = CONTACT.whatsapp.replace(/\D/g, '')
const waLink = `https://wa.me/${digits}?text=${encodeURIComponent("Hi Zera Studio, I'd like a quotation.")}`
const telLink = `tel:+${digits}`
const socials = Object.entries(CONTACT.socials).filter(([, url]) => url)
const byId = (id) => WORKS.find((w) => w.id === id)
const lines = (text) => text.split('\n').map((line, i) => <span className="ln" key={i}>{line}</span>)

/* ---------- icons ---------- */
const svg = (d, extra) => <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.700" strokeLinecap="round" strokeLinejoin="round" {...extra}><path d={d} /></svg>
const I = {
  arrow: svg('M7 17 17 7M9 7h8v8'),
  right: svg('M5 12h14M13 6l6 6-6 6'),
  left: svg('M19 12H5M11 6l-6 6 6 6'),
  plus: svg('M12 5v14M5 12h14'),
  close: svg('M6 6l12 12M18 6 6 18'),
  check: svg('M5 12.500 9.500 17 19 7.500', { strokeWidth: 2.200 }),
  phone: svg('M6.500 3.500h3l1.500 4-2 1.500a12 12 0 0 0 6 6l1.500-2 4 1.500v3a2 2 0 0 1-2.200 2A16.500 16.500 0 0 1 4.500 5.700a2 2 0 0 1 2-2.200z'),
  chat: svg('M21 12a8 8 0 0 1-11.800 7L4 20l1.200-4.700A8 8 0 1 1 21 12z'),
  wrench: svg('M14.500 6.500a4 4 0 0 0-5 5L4 17v3h3l5.500-5.500a4 4 0 0 0 5-5L15 12l-3-3 2.500-2.500z'),
  pulse: svg('M3 12h4l2.500-6 4 12 2.500-6h5'),
  shield: svg('M12 3l8 3v6c0 5-3.400 8.300-8 9.500C7.400 20.300 4 17 4 12V6l8-3z'),
  compass: svg('M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.500 8.500l-2 5-5 2 2-5 5-2z'),
  doc: svg('M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5zM14 3v5h5M9 13h6M9 17h4'),
  code: svg('M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16'),
  rocket: svg('M5 15c-1 1-1.500 4-1.500 4s3-.500 4-1.500M9 15l-1.500-1.500c0-3 2-8.500 9.500-9.500 0 0-.500 7-9 10.500L9 15zM15 9h.01'),
  wa: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round"><path d="M3.500 20.500l1.300-4.200A8.500 8.500 0 1 1 8 19.400z" /><path d="M9 8.600c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.600c.1.3 0 .5-.1.7l-.5.6c-.1.2-.1.4 0 .5.6 1 1.400 1.800 2.400 2.300.2.1.4.1.5 0l.6-.6c.2-.2.5-.2.7-.1l1.500.7c.3.1.4.3.4.6v.4c0 .4-.2.8-.6 1-.6.3-1.600.5-2.900-.1-2-.9-3.600-2.600-4.400-4.500-.5-1.200-.4-2.300.1-2.900z" fill="currentColor" stroke="none" /></svg>
  ),
  laurel: (
    <svg viewBox="0 0 64 40" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.600" strokeLinecap="round"><path d="M14 34C7 28 6 16 13 6M10 27l-5-1M9 20l-5 1M10 13 6 10M50 34c7-6 8-18 1-28M54 27l5-1M55 20l5 1M54 13l4-3" /></svg>
  ),
}

/* ---------- top bar and floating dock ---------- */
function Logo({ onClick }) {
  return (
    <a className="logo" href="#top" onClick={onClick} aria-label={`${BRAND.name} ${BRAND.accent}`}>
      <img src={`${BASE}logo.png`} alt="" width="34" height="34" />
      <span>{BRAND.name} <i>{BRAND.accent}</i></span>
    </a>
  )
}

function TopBar() {
  return (
    <header className="topbar">
      <Logo />
      <a className="btn btn--sm" href="#contact"><Roll>Contact Us</Roll></a>
    </header>
  )
}

function Dock() {
  const [pct, setPct] = useState(0)
  const [light, setLight] = useState(false)
  const [open, setOpen] = useState(false)
  const menu = useRef(null)
  const label = useRef(null)
  const mounted = useRef(false)
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setPct(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0)
      const y = window.innerHeight - 46
      let dark = false
      document.querySelectorAll('[data-dark]').forEach((el) => { const r = el.getBoundingClientRect(); if (r.top <= y && r.bottom >= y) dark = true })
      setLight(dark)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])
  useEffect(() => {
    if (!open) return
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])
  // The label swaps between Menu and Close through a short scramble of dots.
  useEffect(() => {
    const el = label.current
    const next = open ? 'Close' : 'Menu'
    if (!el.textContent || reduced()) { el.textContent = next; return }
    const length = Math.max(el.textContent.length, next.length)
    let frame = 0
    const id = setInterval(() => {
      let text = ''
      for (let i = 0; i < length; i++) text += i < next.length && frame / 18 > i / length ? next[i] : '\u2022'
      el.textContent = text
      if (++frame > 18) { el.textContent = next; clearInterval(id) }
    }, 20)
    return () => { clearInterval(id); el.textContent = next }
  }, [open])
  // The panel grows up out of the bar; its items rise in after it.
  useLayoutEffect(() => {
    const panel = menu.current
    const items = panel.querySelectorAll('[data-mi]')
    if (!mounted.current) { mounted.current = true; gsap.set(panel, { height: 0, autoAlpha: 0 }); return }
    gsap.killTweensOf([panel, ...items])
    if (open) {
      lockScroll()
      gsap.set(panel, { height: 'auto', autoAlpha: 1 })
      const height = panel.offsetHeight
      if (!reduced()) {
        gsap.fromTo(panel, { height: 0, autoAlpha: 0 }, { height, autoAlpha: 1, duration: 0.5, ease: 'power3.out', onComplete: () => gsap.set(panel, { height: 'auto' }) })
        gsap.fromTo(items, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.04, delay: 0.12, ease: 'power2.out' })
      }
      return () => unlockScroll()
    }
    gsap.to(panel, { height: 0, autoAlpha: 0, duration: reduced() ? 0 : 0.35, ease: 'power2.inOut' })
  }, [open])
  return (
    <>
      <div className={`menu-backdrop${open ? ' is-on' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <div className={`dock${light && !open ? ' is-light' : ''}`}>
        <nav className="dock__menu" aria-label="Menu" ref={menu} inert={!open} data-lenis-prevent>
          <div className="dock__menu-in">
            <span className="cap" data-mi>Menu</span>
            {NAV.map(([text, href]) => <a key={href} href={href} data-mi onClick={() => setOpen(false)}><Roll>{text}</Roll><span>{I.arrow}</span></a>)}
            <div className="dock__contact" data-mi>
              <a className="btn btn--sm" href={telLink}>{I.phone} <Roll>Call</Roll></a>
              <a className="btn btn--sm btn--light" href={waLink} target="_blank" rel="noopener">{I.wa} <Roll>WhatsApp</Roll></a>
            </div>
          </div>
        </nav>
        <div className="dock__bar">
          <a className="dock__logo" href="#top" onClick={() => setOpen(false)} aria-label="Back to top"><img src={`${BASE}logo.png`} alt="" width="30" height="30" /></a>
          <span className="dock__pct">{pct}%</span>
          <button className="dock__btn" type="button" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
            <span className="dock__burger" aria-hidden="true"><i /><i /></span><span className="dock__label" ref={label} aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  )
}

/* ---------- clients ---------- */
function Clients() {
  return (
    <section className="clients" aria-label="Our clients">
      <div className="clients__grid">
        {CLIENTS.map((name) => <div className="clients__card" key={name} data-reveal>{name}</div>)}
      </div>
      <p className="t-large center">Our clients</p>
    </section>
  )
}

/* ---------- one team ---------- */
const FLOATS = ['kripkart-1', 'apex', 'jula-m', 'oakloom', 'zerafinance-1', 'kripkart-m']
function OneTeam() {
  return (
    <section className="team" id="about">
      {FLOATS.map((name, i) => <img key={name} className={`team__float team__float--${i + 1}`} src={img(name)} alt="" loading="lazy" data-float={i % 2 ? 60 : -60} />)}
      <div className="team__circle">
        <h2 className="h2">One Team For Your Website, <br className="br-d" />Automation And Software</h2>
        <p className="t-large" data-reveal>Growing businesses lose time juggling separate designers, developers and tools. We do all of it, so your website, your messages and your books stay connected.</p>
        <a className="btn" href={waLink} target="_blank" rel="noopener" data-reveal><Roll>Get a quotation in 24 hours</Roll></a>
        <p className="t-small team__label">We are available on</p>
        <div className="team__socials">
          <a href={telLink} aria-label="Call us">{I.phone}</a>
          <a href={waLink} target="_blank" rel="noopener" aria-label="WhatsApp">{I.wa}</a>
          {socials.map(([name, url]) => <a key={name} href={url} target="_blank" rel="noopener" aria-label={name}>{name[0]}</a>)}
        </div>
      </div>
    </section>
  )
}

/* ---------- works wheel ---------- */
function Works({ onOpen }) {
  return (
    <section className="works" id="work">
      <div className="head">
        <h2 className="h2">Explore Our Latest Work <br className="br-d" />Across Industries</h2>
        <p className="t-large" data-reveal>Live client websites and concept designs, from online stores and company sites to dashboards, automation and 3D product pages.</p>
      </div>
      <Wheel works={WORKS} img={img} icons={I} onOpen={onOpen} />
    </section>
  )
}

/* ---------- statement and stats ---------- */
function Statement() {
  return (
    <section className="statement">
      <p className="h-st">
        We Study Your Company First. Then We Design And Build What You Imagine, Put It Live, And Stay With You For A Full Year After Launch.
      </p>
      <span className="chipf chipf--a">Quotation in 24 hours</span>
      <span className="chipf chipf--b">Built around your business</span>
      <span className="chipf chipf--c">One year of free support</span>
    </section>
  )
}

function Stats() {
  return (
    <section className="stats">
      {STATS.map(([value, label]) => (
        <div className="stats__item" key={label} data-reveal>
          <span className="stats__ic">{I.laurel}</span>
          <CountUp className="h3" value={value} />
          <span className="t-large">{label}</span>
        </div>
      ))}
    </section>
  )
}

/* ---------- small illustrations (drawn in HTML) ---------- */
function Illo({ kind }) {
  if (kind === 'study') {
    return (
      <div className="illo"><div className="mini">
        <div className="mini__head"><b>Your business</b><span className="mini__pill">Mapped</span></div>
        {['Sales channels', 'Daily tasks', 'Tools in use', 'What to automate'].map((row, i) => <div className="mini__row" key={row}><span className={`mini__check${i === 3 ? ' is-off' : ''}`}>{I.check}</span>{row}</div>)}
        <div className="mini__bar"><i style={{ width: '78%' }} /></div>
      </div></div>
    )
  }
  if (kind === 'imagine') {
    return (
      <div className="illo illo--split">
        <div className="mini mini--sketch"><span /><span /><span /><em>Your idea</em></div>
        <span className="illo__arrow">{I.right}</span>
        <div className="mini mini--live"><div className="mini__dots"><i /><i /><i /><span className="mini__pill mini__pill--ok">Live</span></div><div className="mini__hero" /><div className="mini__cols"><i /><i /><i /></div></div>
      </div>
    )
  }
  if (kind === 'quote') {
    return (
      <div className="illo"><div className="mini mini--chat">
        <span className="bub bub--me">I need a website for my store</span>
        <div className="bub bub--quote"><b>Quotation · Zera Studio</b><span>Scope and pages</span><span>Timeline: 4 to 10 days</span><span>Support: 1 year, free</span></div>
        <span className="mini__pill mini__pill--ok">Sent within 24 hours</span>
      </div></div>
    )
  }
  if (kind === 'days') {
    return (
      <div className="illo"><div className="mini">
        <div className="mini__head"><b>Launch timeline</b><span className="mini__pill">On track</span></div>
        <svg className="mini__chart" viewBox="0 0 300 130" aria-hidden="true">
          <path d="M14 112 C 70 108, 96 92, 126 84 S 190 62, 214 44 S 262 22, 286 14" fill="none" stroke="#ff7a3d" strokeWidth="3" strokeLinecap="round" />
          {[[14, 112, 'Order'], [126, 84, 'Quotation'], [214, 44, 'Build'], [286, 14, 'Live']].map(([x, y, t]) => <g key={t}><circle cx={x} cy={y} r="6" fill="#fff" stroke="#ff7a3d" strokeWidth="3" /><text x={x} y={y + 22} textAnchor={x > 250 ? 'end' : x < 30 ? 'start' : 'middle'} fontSize="11" fill="rgba(0,0,0,.6)">{t}</text></g>)}
        </svg>
        <div className="mini__foot"><span>Day 1</span><span>Day 4 to 10</span></div>
      </div></div>
    )
  }
  if (kind === 'support') {
    return (
      <div className="illo"><div className="mini mini--support">
        <span className="mini__ring"><b>365</b><i>days</i></span>
        <div><b>Support active</b><span>Fault fixes and help, free for a year</span><span className="mini__pill mini__pill--ok">Included</span></div>
      </div></div>
    )
  }
  // business-flow panels
  if (kind === 'order') {
    return (
      <div className="illo illo--flow">
        <div className="mini"><div className="mini__head"><b>New enquiry</b><span className="mini__pill">Today</span></div><div className="mini__row"><span className="mini__check">{I.check}</span>Company website</div><div className="mini__row"><span className="mini__check">{I.check}</span>Product catalogue</div><div className="mini__row"><span className="mini__check">{I.check}</span>WhatsApp enquiries</div></div>
        <div className="mini mini--note"><b>We ask about</b><span>Your business</span><span>Your customers</span><span>Your deadline</span></div>
      </div>
    )
  }
  if (kind === 'build') {
    return (
      <div className="illo illo--flow">
        <div className="mini mini--live"><div className="mini__dots"><i /><i /><i /><span className="mini__pill">Preview</span></div><div className="mini__hero" /><div className="mini__cols"><i /><i /><i /></div></div>
        <div className="mini mini--note"><b>Progress</b><span>Design approved</span><span>Pages built</span><span>Your review</span><div className="mini__bar"><i style={{ width: '64%' }} /></div></div>
      </div>
    )
  }
  if (kind === 'live') {
    return (
      <div className="illo illo--flow">
        <div className="mini mini--live"><div className="mini__dots"><i /><i /><i /><span className="mini__pill mini__pill--ok">Live</span></div><div className="mini__hero" /><div className="mini__cols"><i /><i /><i /></div></div>
        <div className="mini mini--support"><span className="mini__ring"><b>365</b><i>days</i></span><div><b>Support begins</b><span>Free for one year</span></div></div>
      </div>
    )
  }
  return null
}

/* ---------- our specialities (black, side-scrolling) ---------- */
function Specials() {
  const section = useRef(null)
  const track = useRef(null)
  useLayoutEffect(() => {
    if (reduced()) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1000px) and (min-height: 640px)', () => {
      const distance = () => Math.max(0, track.current.scrollWidth - window.innerWidth)
      section.current.classList.add('is-pinned')
      const tween = gsap.to(track.current, { x: () => -distance(), ease: 'none', scrollTrigger: { trigger: section.current, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.5, invalidateOnRefresh: true } })
      return () => { tween.scrollTrigger?.kill(); tween.kill(); section.current?.classList.remove('is-pinned'); gsap.set(track.current, { clearProps: 'transform' }) }
    })
    return () => mm.revert()
  }, [])
  return (
    <section className="spec" id="specialities" data-dark ref={section}>
      <div className="spec__track" ref={track}>
        <div className="spec__intro">
          <span className="pill pill--mint">Our specialities</span>
          <h2 className="h-st">We Help Growing Businesses Design, Build, Launch And Automate.</h2>
        </div>
        {SPECIALS.map(([title, text, kind], i) => (
          <article className={`spec__card${i % 2 ? ' spec__card--dark' : ''}`} key={kind}>
            <h3 className="h2">{lines(title)}</h3>
            <p className="t-body">{text}</p>
            <Illo kind={kind} />
          </article>
        ))}
      </div>
    </section>
  )
}

/* ---------- automation ---------- */
function Automation({ onOpen }) {
  const row = [...TOOLS, ...TOOLS]
  return (
    <section className="auto" id="automation">
      <div className="head">
        <h2 className="h2">Business And Social Media <br className="br-d" />Automation, Built In</h2>
        <p className="t-large" data-reveal>We connect WhatsApp, Instagram, your website and your books. Enquiries get answered, leads get assigned and reports arrive on their own.</p>
        <button className="btn" type="button" onClick={() => onOpen(byId('drift'))} data-reveal><Roll>See an automation</Roll></button>
      </div>
      <div className="marq" aria-hidden="true"><div className="marq__track">{row.map((tool, i) => <span className="pill" key={i}><span className="pill__dot" />{tool}</span>)}</div></div>
      <div className="auto__shots">
        {['drift', 'pulse'].map((id) => (
          <button key={id} type="button" className="shot" onClick={() => onOpen(byId(id))} aria-label={`Open ${byId(id).name}`} data-reveal><img src={img(id)} alt="" loading="lazy" width="1200" height="780" /><span className="shot__cap">{byId(id).name} · {byId(id).label}</span></button>
        ))}
      </div>
    </section>
  )
}

/* ---------- our business flow (tabs on a soft panel) ---------- */
const FLOW_ICONS = [I.compass, I.doc, I.code, I.rocket]
function Flow() {
  const [tab, setTab] = useState(0)
  const [auto, setAuto] = useState(true)
  const ref = useRef(null)
  useEffect(() => {
    // Only on wide screens, where the card keeps one height and nothing below it moves.
    if (!auto || reduced() || !window.matchMedia('(min-width: 1000px)').matches) return
    let visible = false
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { threshold: 0.4 })
    io.observe(ref.current)
    const id = setInterval(() => { if (visible) setTab((t) => (t + 1) % FLOW.length) }, 4200)
    return () => { clearInterval(id); io.disconnect() }
  }, [auto])
  const [, title, text, chips, kind] = FLOW[tab]
  return (
    <section className="flow" id="flow" ref={ref}>
      <div className="head">
        <h2 className="h2">Our Business Flow</h2>
        <p className="t-large" data-reveal>Four steps from your first message to a live website.</p>
      </div>
      <div className="flow__panel" data-reveal>
        <div className="flow__tabs" role="tablist" aria-label="Business flow steps">
          {FLOW.map(([name], i) => <button key={name} type="button" role="tab" aria-selected={tab === i} className="flow__tab" onClick={() => { setTab(i); setAuto(false) }}><b>{i + 1}</b>{name}</button>)}
        </div>
        <div className="flow__card" key={tab}>
          <div className="flow__text">
            <span className="flow__ic">{FLOW_ICONS[tab]}</span>
            <h3 className="h5">{title}</h3>
            <p className="t-small">{text}</p>
            <div className="chips">{chips.map((chip) => <span className="chip" key={chip}>{chip}</span>)}</div>
            <a className="btn btn--sm" href={waLink} target="_blank" rel="noopener"><Roll>Get in touch</Roll></a>
          </div>
          <div className="flow__art"><Illo kind={kind} /></div>
        </div>
      </div>
    </section>
  )
}

/* ---------- featured client work: a deck that peels away as you scroll ---------- */
function Cases({ onOpen }) {
  const live = WORKS.filter((w) => w.live)
  const deck = useRef(null)
  useLayoutEffect(() => {
    if (reduced()) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1000px) and (min-height: 700px)', () => {
      const runway = deck.current
      const holder = runway.querySelector('.deck__cards')
      const cards = Array.from(runway.querySelectorAll('.case'))
      const n = cards.length
      if (n < 2) return undefined
      runway.classList.add('is-deck')
      const per = () => window.innerHeight * 1.2
      const size = () => {
        runway.style.height = `${(n - 1) * per() + window.innerHeight}px`
        holder.style.height = `${Math.max(...cards.map((card) => card.offsetHeight))}px`
      }
      size()
      const smooth = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
      const update = (progress) => {
        const max = n - 1
        const p = Math.max(0, Math.min(progress, max))
        let index = Math.floor(p)
        let sub = p - index
        if (index >= max) { index = max - 1; sub = 1 }
        const t = sub > 0.18 ? smooth((sub - 0.18) / 0.82) : 0   // a short pause to read each card
        cards.forEach((card, i) => {
          if (i < index) gsap.set(card, { yPercent: -130, y: 0, scale: 1, autoAlpha: 0, zIndex: 10 + i })
          else if (i === index) gsap.set(card, { yPercent: -t * 130, y: 0, scale: 1, autoAlpha: 1, zIndex: 100 + n - i })
          else {
            const d = Math.max(0, i - index - t)
            gsap.set(card, { yPercent: 0, y: d * 34 - d * (d - 1) * 2, scale: Math.max(0.74, 1 - d * 0.06), autoAlpha: 1, zIndex: 50 - i })
          }
        })
      }
      update(0)
      const proxy = { p: 0 }
      const tween = gsap.to(proxy, {
        p: n - 1, ease: 'none', onUpdate: () => update(proxy.p),
        scrollTrigger: { trigger: runway, start: 'top top', end: () => `+=${(n - 1) * per()}`, scrub: 0.65, invalidateOnRefresh: true, onRefreshInit: size },
      })
      return () => {
        tween.scrollTrigger?.kill(); tween.kill()
        runway.classList.remove('is-deck'); runway.style.height = ''; holder.style.height = ''
        gsap.set(cards, { clearProps: 'transform,opacity,visibility,zIndex' })
      }
    })
    return () => mm.revert()
  }, [])
  return (
    <section className="cases" id="clients-work">
      <div className="head">
        <h2 className="h2">Featured Work, <br className="br-d" />Live Right Now</h2>
        <p className="t-large" data-reveal>Three websites we built that are online today. Open any of them and look around.</p>
        <a className="btn btn--light btn--sm" href="#gallery" data-reveal><Roll>View all work</Roll> {I.arrow}</a>
      </div>
      <div className="deck" ref={deck}>
        <div className="deck__stage">
          <div className="deck__cards">
            {live.map((work) => (
              <article className="case" key={work.id}>
                <button className="case__media" type="button" onClick={() => onOpen(work)} aria-label={`Open ${work.name} screens`} style={{ '--tint': work.tint }}>
                  <img src={img(work.images[0])} alt={`${work.name} home page`} loading="lazy" width="1280" height="832" />
                  {work.mobile && <img className="case__phone" src={img(work.mobile)} alt="" loading="lazy" />}
                </button>
                <div className="case__info">
                  <span className="case__glyph" style={{ background: work.dot }}>{work.name[0]}</span>
                  <h3 className="h5">{work.name}</h3>
                  <span className="t-small case__cat">{work.label} · <span className="tag tag--live tag--inline"><i />Live</span></span>
                  <p className="t-body">{work.line}</p>
                  <div className="case__fact"><b className="h5">{work.fact[0]}</b><span className="t-cap">{work.fact[1]}</span></div>
                  <div className="case__btns">
                    <a className="btn btn--sm" href={work.url} target="_blank" rel="noopener"><Roll>Visit website</Roll> {I.arrow}</a>
                    <button className="btn btn--light btn--sm" type="button" onClick={() => onOpen(work)}><Roll>See screens</Roll></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- founder / quotation / support ---------- */
function Bento() {
  const initials = BRAND.founder.split(' ').map((part) => part[0]).join('')
  return (
    <section className="bento">
      <div className="head"><h2 className="h2">The People And Promises <br className="br-d" />Behind Zera Studio</h2></div>
      <div className="bento__grid">
        <div className="bento__card bento__card--sand" data-reveal>
          <span className="pill pill--dark">Founder</span>
          <div className="bento__founder"><span className="avatar">{initials}</span><div><b className="h5">{BRAND.founder}</b><span className="t-large">Founder, Zera Studio</span></div></div>
        </div>
        <div className="bento__card" data-reveal>
          <span className="bento__ic">{I.doc}</span>
          <b className="h5">Clear quotation.<br />No surprises.</b>
          <span className="t-small">Sent on WhatsApp within 24 hours.</span>
          <a className="btn btn--sm" href={waLink} target="_blank" rel="noopener"><Roll>Get a quotation</Roll></a>
        </div>
        <div className="bento__card bento__card--deep" data-reveal>
          <b className="h3">1 Year</b>
          <span className="t-small">Free support with every project</span>
          <span className="logo logo--white"><img src={`${BASE}logo.png`} alt="" width="30" height="30" /><span>{BRAND.name} <i>{BRAND.accent}</i></span></span>
        </div>
      </div>
    </section>
  )
}

/* ---------- services (stacked colour bands) ---------- */
function Services({ onOpen }) {
  return (
    <section className="svcs" id="services">
      {SERVICES.map(([title, bullet, text, color, shots], i) => (
        <article className="svc" key={title} style={{ '--c': color }} data-dark>
          <div className="svc__in">
            <div className="svc__head"><h2 className="h-st">{lines(title)}</h2><span className="h-st svc__no">/{String(i + 1).padStart(2, '0')}</span></div>
            <div className="svc__panel">
              <div className="svc__row">
                <p className="t-small svc__bullet"><i />{bullet}</p>
                <a className="btn btn--light btn--sm" href={waLink} target="_blank" rel="noopener"><Roll>Get Started</Roll> {I.arrow}</a>
                <p className="t-small svc__text">{text}</p>
              </div>
              <div className={`svc__shots svc__shots--${shots.length}${shots[0].endsWith('-m') ? ' svc__shots--phone' : ''}`}>
                {shots.map((name) => {
                  const work = WORKS.find((w) => w.images.includes(name) || w.mobile === name)
                  return work
                    ? <button key={name} type="button" className="svc__shot" onClick={() => onOpen(work)} aria-label={`Open ${work.name}`}><img src={img(name)} alt="" loading="lazy" /></button>
                    : <span key={name} className="svc__shot"><img src={img(name)} alt="" loading="lazy" /></span>
                })}
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}

/* ---------- gallery ---------- */
function Gallery({ onOpen }) {
  return (
    <section className="gallery" id="gallery">
      <div className="head"><h2 className="h2">Explore Some Of Our <br className="br-d" />Latest Work</h2></div>
      <div className="gallery__grid">
        {GALLERY.map(([id, name]) => {
          const work = byId(id)
          return (
            <button key={name} type="button" className="gallery__item" onClick={() => onOpen(work, work.images.indexOf(name))} aria-label={`Open ${work.name}`}>
              <img src={img(name)} alt="" loading="lazy" />
              <span className="gallery__cap"><b>{work.name}</b>{work.live ? <span className="tag tag--live tag--inline"><i />Live</span> : <span className="tag tag--inline">Concept</span>}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

/* ---------- support ---------- */
function Support() {
  return (
    <section className="support">
      <div className="head">
        <h2 className="h2">One Year Of Free Support, <br className="br-d" />Included</h2>
        <p className="t-large" data-reveal>Every project we deliver comes with a year of support from the day it goes live.</p>
      </div>
      <div className="support__grid">
        {SUPPORT.map(([title, text, icon]) => (
          <div className="support__card" key={title} data-reveal><span className="support__ic">{I[icon]}</span><b>{title}</b><span className="t-small">{text}</span></div>
        ))}
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */
function Faq() {
  const [open, setOpen] = useState(0)
  const initials = BRAND.founder.split(' ').map((part) => part[0]).join('')
  return (
    <section className="faq" id="faq">
      <div className="faq__side">
        <h2 className="h2">Got Questions? <br />We&apos;ve Got Answers</h2>
        <p className="t-large">If you are unsure where to start, reach out and we will walk you through it.</p>
        <a className="faq__card" href={telLink}>
          <span className="avatar avatar--sm">{initials}</span>
          <span><span className="t-cap">Let&apos;s Talk</span><b>Book An Intro Call</b><span className="t-cap">{BRAND.founder}, Founder @ZeraStudio</span></span>
          <span className="faq__go">{I.arrow}</span>
        </a>
      </div>
      <div className="faq__list">
        {FAQ.map(([question, answer], i) => (
          <div className={`faq__item${open === i ? ' is-open' : ''}`} key={question}>
            <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}><span>{question}</span><span className="faq__plus">{I.plus}</span></button>
            <div className="faq__answer"><p className="t-body">{answer}</p></div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- closing call to action and footer ---------- */
function Cta() {
  return (
    <section className="cta" id="contact" data-dark>
      <h2 className="h1">Let&apos;s Build Yours.</h2>
      <p className="cta__tag" data-reveal>{BRAND.tagline}</p>
      <p className="cta__num select" data-reveal>{CONTACT.phone}</p>
      <div className="cta__btns" data-reveal>
        <a className="btn btn--white" href={telLink}>{I.phone} <Roll>Call</Roll></a>
        <a className="btn btn--ghost" href={waLink} target="_blank" rel="noopener">{I.wa} <Roll>WhatsApp</Roll></a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div><Logo /><p className="t-small">We design and build websites, software, automation and ERP for growing businesses.</p></div>
        <span className="footer__tag">{BRAND.tagline}</span>
      </div>
      <div className="footer__main">
        <div className="footer__lead">
          <p className="h5">Quotation in 24 hours.<br />Websites in 4 to 10 days.</p>
          <div className="footer__contact">
            <div><span className="cap">Call us</span><a href={telLink}>{CONTACT.phone}</a></div>
            <div><span className="cap">WhatsApp</span><a href={waLink} target="_blank" rel="noopener">{CONTACT.phone}</a></div>
            {CONTACT.email && <div><span className="cap">Drop us a line</span><span className="select">{CONTACT.email}</span></div>}
          </div>
          <a className="btn" href={waLink} target="_blank" rel="noopener">{I.wa} <Roll>Get a quotation</Roll></a>
        </div>
        <div className="footer__cols">
          <div><span className="cap">Services</span>{SERVICES.map(([title]) => <a key={title} href="#services"><Roll>{title.replace(/\n/g, ' ').replace(/,$/, '')}</Roll></a>)}</div>
          <div><span className="cap">Quick links</span>{NAV.map(([label, href]) => <a key={href} href={href}><Roll>{label}</Roll></a>)}</div>
          <div><span className="cap">Policies</span>{Object.entries(POLICIES).map(([id, policy]) => <a key={id} href={`#${id}`}><Roll>{policy.title}</Roll></a>)}</div>
          {socials.length > 0 && <div><span className="cap">Follow us</span>{socials.map(([name, url]) => <a key={name} href={url} target="_blank" rel="noopener"><Roll>{name}</Roll></a>)}</div>}
        </div>
      </div>
      {CONTACT.address && <div className="footer__loc"><span className="cap">Our location</span><p className="t-small">{CONTACT.address}</p></div>}
      <div className="footer__bar">
        <span>© {new Date().getFullYear()}, Zera Studio | All Rights Reserved.</span>
        <nav aria-label="Policies">{['terms', 'privacy', 'refund'].map((id) => <a key={id} href={`#${id}`}><Roll>{POLICIES[id].title}</Roll></a>)}</nav>
      </div>
    </footer>
  )
}

/* ---------- project popup ---------- */
function WorkModal({ work, start, onStep, onClose }) {
  const [index, setIndex] = useState(start || 0)
  const list = WORKS
  const at = list.findIndex((w) => w.id === work.id)
  const step = (dir) => onStep(list[(at + dir + list.length) % list.length])
  useEffect(() => { setIndex(start || 0) }, [work.id, start])
  useEffect(() => { lockScroll(); return unlockScroll }, [])
  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') onClose(); if (event.key === 'ArrowRight') step(1); if (event.key === 'ArrowLeft') step(-1) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })
  const shots = work.mobile ? [...work.images, work.mobile] : work.images
  const current = shots[Math.min(index, shots.length - 1)]
  const phone = current.endsWith('-m')
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={work.name}>
      <div className="modal__back" onClick={onClose} />
      <div className="modal__panel" data-lenis-prevent>
        <button className="modal__x" type="button" onClick={onClose} aria-label="Close">{I.close}</button>
        <div className={`modal__stage${phone ? ' modal__stage--phone' : ''}`} style={{ '--tint': work.tint }}>
          <img key={current} src={img(current)} alt={`${work.name} screen`} />
          <button className="modal__nav modal__nav--prev" type="button" onClick={() => step(-1)} aria-label="Previous project">{I.left}</button>
          <button className="modal__nav modal__nav--next" type="button" onClick={() => step(1)} aria-label="Next project">{I.right}</button>
        </div>
        {shots.length > 1 && (
          <div className="modal__thumbs">
            {shots.map((name, i) => <button key={name} type="button" className={i === index ? 'is-on' : ''} onClick={() => setIndex(i)} aria-label={`Screen ${i + 1}`}><img src={img(name)} alt="" /></button>)}
          </div>
        )}
        <div className="modal__info">
          <div className="modal__name"><h3 className="h5">{work.name}</h3><span className="chip">{work.label}</span>{work.live ? <span className="tag tag--live tag--inline"><i />Live site</span> : <span className="chip chip--soft">Concept</span>}<span className="t-cap modal__count">{at + 1} / {list.length}</span></div>
          <p className="t-body">{work.line}</p>
          {work.live
            ? <a className="btn btn--sm" href={work.url} target="_blank" rel="noopener">Visit website {I.arrow}</a>
            : <a className="btn btn--sm" href={waLink} target="_blank" rel="noopener" onClick={onClose}>Build something like this</a>}
        </div>
      </div>
    </div>
  )
}

/* ---------- policy pages (open at #privacy, #terms, #refund, #support) ---------- */
function Policy({ id }) {
  const ref = useRef(null)
  const policy = POLICIES[id]
  useLayoutEffect(() => {
    lockScroll()
    ref.current.scrollTop = 0
    const onKey = (event) => { if (event.key === 'Escape') window.location.hash = 'contact' }
    window.addEventListener('keydown', onKey)
    return () => { unlockScroll(); window.removeEventListener('keydown', onKey) }
  }, [id])
  return (
    <div className="policy" ref={ref} role="dialog" aria-modal="true" aria-label={policy.title} data-lenis-prevent>
      <div className="policy__in">
        <div className="policy__bar"><a className="btn btn--light btn--sm" href="#contact">{I.left} Back</a><span className="t-cap">Updated {UPDATED}</span></div>
        <h2 className="h2">{policy.title}</h2>
        <div className="policy__body">
          {policy.sections.map(([heading, text]) => <section key={heading}><h3>{heading}</h3><p className="t-body">{text}</p></section>)}
          <section><h3>Contact</h3><p className="t-body">Zera Studio · Call or WhatsApp <span className="select">{CONTACT.phone}</span></p></section>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [open, setOpen] = useState(null)
  const [hash, setHash] = useState(() => window.location.hash)
  const root = useRef(null)
  const openWork = (work, start = 0) => setOpen({ work, start: Math.max(0, start) })

  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Smooth scrolling and the bracket cursor (desktop with a mouse).
  useEffect(() => {
    const stopScroll = startSmoothScroll()
    const stopCursor = startBracketCursor()
    return () => { stopScroll(); stopCursor() }
  }, [])
  // Headings print in, letter by letter. Runs before paint so nothing flashes.
  useLayoutEffect(() => startTitlePrint(root.current), [])

  // Scroll motion.
  useEffect(() => {
    if (reduced()) return
    let galleryWatch = null
    const context = gsap.context(() => {
      ScrollTrigger.batch('[data-reveal]', { start: 'top 92%', once: true, onEnter: (batch) => gsap.from(batch, { y: 44, duration: 0.9, ease: 'expo.out', stagger: 0.07, clearProps: 'transform' }) })
      gsap.utils.toArray('[data-float]').forEach((el) => {
        gsap.fromTo(el, { y: -Number(el.dataset.float) }, { y: Number(el.dataset.float), ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
      // The hero stays pinned and dissolves into a white haze while the client cards rise over it.
      gsap.timeline({ scrollTrigger: { trigger: '.clients', start: 'top bottom', end: 'top 12%', scrub: true } })
        .to('.hero__copy', { autoAlpha: 0, y: -60, filter: 'blur(6px)', ease: 'none', duration: 0.6 }, 0)
        .to('.hero__film', { autoAlpha: 0, scale: 1.04, filter: 'blur(14px)', ease: 'none', duration: 1 }, 0)
      // Gallery pictures sharpen in from a soft blur, column by column, then catch a light sweep.
      const items = gsap.utils.toArray('.gallery__item')
      const columns = window.innerWidth >= 1000 ? 3 : 2
      galleryWatch = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        galleryWatch.unobserve(entry.target)
        const delay = (items.indexOf(entry.target) % columns) * 0.12
        gsap.to(entry.target, { autoAlpha: 1, filter: 'blur(0px)', y: 0, scale: 1, duration: 1, delay, ease: 'power3.out', clearProps: 'filter,transform' })
        setTimeout(() => entry.target.classList.add('is-sheen'), delay * 1000 + 80)
      }), { rootMargin: '0px 0px -8% 0px', threshold: 0.05 })
      items.forEach((item) => {
        if (item.getBoundingClientRect().top < window.innerHeight * 0.95) return
        gsap.set(item, { autoAlpha: 0.2, filter: 'blur(3px)', y: 35, scale: 0.98 })
        galleryWatch.observe(item)
      })
    }, root)
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => { window.removeEventListener('load', refresh); galleryWatch?.disconnect(); context.revert() }
  }, [])

  return (
    <div ref={root}>
      <TopBar />
      <main>
        <div className="intro">
          <Hero waLink={waLink} telLink={telLink} />
          <Clients />
        </div>
        <OneTeam />
        <Works onOpen={openWork} />
        <Statement />
        <Stats />
        <Specials />
        <Automation onOpen={openWork} />
        <Flow />
        <Cases onOpen={openWork} />
        <Bento />
        <Services onOpen={openWork} />
        <Gallery onOpen={openWork} />
        <Support />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <Dock />
      {POLICIES[hash.slice(1)] && <Policy id={hash.slice(1)} />}
      {open && <WorkModal work={open.work} start={open.start} onStep={(work) => setOpen({ work, start: 0 })} onClose={() => setOpen(null)} />}
    </div>
  )
}
