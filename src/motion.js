// Site-wide motion: smooth scrolling, the heading print-in, the bracket cursor and scroll locking.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = () => window.matchMedia('(min-width: 768px) and (pointer: fine)').matches

/* ---------- smooth scrolling ---------- */
let lenis = null
let locks = 0

export function startSmoothScroll() {
  if (lenis || reduced()) return () => {}
  // Phones keep their own native scrolling.
  if (window.innerWidth < 768 && window.matchMedia('(pointer: coarse)').matches) return () => {}
  const mac = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)
  lenis = new Lenis({ lerp: mac ? 0.1 : 0.08, smoothWheel: true, autoRaf: false })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(500, 33)

  // In-page links glide to their section; hash routes without a section (policies) are left alone.
  const onClick = (event) => {
    const link = event.target.closest?.('a[href^="#"]')
    if (!link) return
    const id = link.getAttribute('href').slice(1)
    const target = id && document.getElementById(id)
    if (!target) return
    event.preventDefault()
    lenis.scrollTo(target, { offset: id === 'top' ? 0 : -20, duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
  }
  document.addEventListener('click', onClick)
  const remeasure = () => { lenis?.resize(); ScrollTrigger.refresh() }
  window.addEventListener('load', remeasure)
  document.fonts?.ready.then(remeasure)

  return () => {
    document.removeEventListener('click', onClick)
    window.removeEventListener('load', remeasure)
    gsap.ticker.remove(tick)
    lenis.destroy()
    lenis = null
  }
}

// Overlays (menu, project popup, policy pages) freeze the page behind them.
export function lockScroll() {
  if (locks++ === 0) { lenis?.stop(); document.documentElement.style.overflow = 'hidden' }
}
export function unlockScroll() {
  locks = Math.max(0, locks - 1)
  if (locks === 0) { lenis?.start(); document.documentElement.style.overflow = '' }
}

/* ---------- headings print in, letter by letter ---------- */
// Each letter fades in from a blur, passes through a colour from this spectrum, then settles.
const PALETTE = [[248, 184, 48], [255, 122, 61], [232, 62, 140], [124, 58, 237]]
const WHITE = [255, 255, 255]
const mix = (a, b, p) => a.map((v, i) => v + (b[i] - v) * p)
const spectrum = (x) => {
  const s = Math.max(0, Math.min(1, x)) * (PALETTE.length - 1)
  const i = Math.min(PALETTE.length - 2, Math.floor(s))
  return mix(PALETTE[i], PALETTE[i + 1], s - i)
}
const rgb = (c) => `rgb(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])})`

function splitLetters(el) {
  el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim())
  const units = []
  const walk = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (!node.textContent.trim()) return
      const frag = document.createDocumentFragment()
      node.textContent.split(/(\s+)/).forEach((token) => {
        if (!token) return
        if (/^\s+$/.test(token)) { frag.appendChild(document.createTextNode(' ')); return }
        const word = document.createElement('span')
        word.className = 'pw'
        word.setAttribute('aria-hidden', 'true')
        for (const ch of token) {
          const letter = document.createElement('span')
          letter.className = 'pc'
          letter.textContent = ch
          word.appendChild(letter)
          units.push(letter)
        }
        frag.appendChild(word)
      })
      node.parentNode.replaceChild(frag, node)
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR') {
      Array.from(node.childNodes).forEach(walk)
    }
  }
  Array.from(el.childNodes).forEach(walk)
  return units
}

function printer(el) {
  const units = splitLetters(el)
  const n = units.length
  const accents = units.map((_, i) => spectrum(n > 1 ? i / (n - 1) : 0))
  let finals = null
  const state = { p: 0 }
  const paint = () => {
    const P = state.p * 1.16
    for (let i = 0; i < n; i++) {
      const t = Math.max(0, Math.min(1, (P - i / n) / 0.16))
      const u = units[i]
      if (u._t === t) continue
      u._t = t
      if (t >= 1) { u.style.opacity = ''; u.style.filter = ''; u.style.color = ''; continue }
      let opacity = 1
      let blur = 0
      let colour
      if (t < 0.35) { const k = t / 0.35; opacity = k; blur = 8 - 6.5 * k; colour = WHITE }
      else if (t < 0.7) { const k = (t - 0.35) / 0.35; colour = mix(WHITE, accents[i], k); blur = 1.5 * (1 - k) }
      else { const k = (t - 0.7) / 0.3; colour = mix(accents[i], finals[i], k) }
      u.style.opacity = opacity
      u.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none'
      u.style.color = rgb(colour)
    }
  }
  return {
    hide() {
      units.forEach((u) => { u._t = undefined; u.style.color = '' })
      finals = units.map((u) => (getComputedStyle(u).color.match(/[\d.]+/g) || [0, 0, 0]).slice(0, 3).map(Number))
      state.p = 0
      paint()
    },
    play(delay = 0) {
      if (!finals) this.hide()
      return gsap.to(state, { p: 1, delay, duration: Math.min(1.9, 0.9 + n * 0.012), ease: 'none', onUpdate: paint, onComplete: () => { state.p = 1; paint() } })
    },
  }
}

const TITLES = 'h1.h1, h2.h1, h2.h2, h3.h2, h2.h-st, p.h-st'

// Splits every big heading once; those below the fold wait hidden and print as they scroll in.
export function startTitlePrint(root = document) {
  if (reduced()) return () => {}
  const tweens = []
  const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return
    io.unobserve(entry.target)
    tweens.push(entry.target._printer.play())
  }), { rootMargin: '0px 0px -12% 0px' })
  root.querySelectorAll(TITLES).forEach((el) => {
    if (!el._printer) el._printer = printer(el)   // split once, even if this runs again
    el._printer.hide()
    if (el.matches('h1')) tweens.push(el._printer.play(0.25))
    else io.observe(el)
  })
  return () => { io.disconnect(); tweens.forEach((t) => t.kill()) }
}

/* ---------- bracket cursor ---------- */
export function startBracketCursor() {
  if (!finePointer() || reduced()) return () => {}
  const left = document.createElement('div')
  const right = document.createElement('div')
  left.className = right.className = 'bracket'
  left.textContent = '['
  right.textContent = ']'
  document.body.append(left, right)
  const both = [left, right]
  gsap.set(both, { xPercent: -50, yPercent: -50, autoAlpha: 0 })
  const to = (el, prop) => gsap.quickTo(el, prop, { duration: 0.12, ease: 'power2.out' })
  const lx = to(left, 'x'), ly = to(left, 'y'), rx = to(right, 'x'), ry = to(right, 'y')
  const interactive = 'a, button, input, textarea, select, summary, [role="button"], [role="tab"], .wheel, .dock, .modal, .policy'
  let entered = false
  let visible = false
  const show = (on) => {
    if (visible === on) return
    visible = on
    gsap.to(both, { autoAlpha: on ? 1 : 0, duration: on ? 0.2 : 0.15, ease: on ? 'power2.out' : 'power2.in', overwrite: 'auto' })
  }
  const onMove = (event) => {
    if (event.pointerType && event.pointerType !== 'mouse') return
    const x = event.clientX, y = event.clientY
    if (!entered) { entered = true; gsap.set(left, { x: x - 20, y: y + 6 }); gsap.set(right, { x: x + 27, y: y + 6 }) }
    lx(x - 20); ly(y + 6); rx(x + 27); ry(y + 6)
    show(!event.target.closest?.(interactive))
  }
  const onLeave = () => { entered = false; show(false) }
  document.addEventListener('pointermove', onMove, { passive: true })
  document.documentElement.addEventListener('mouseleave', onLeave)
  return () => {
    document.removeEventListener('pointermove', onMove)
    document.documentElement.removeEventListener('mouseleave', onLeave)
    gsap.killTweensOf(both)
    left.remove()
    right.remove()
  }
}
