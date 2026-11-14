import { useEffect, useState } from 'react'
import Hero from './Hero.jsx'
import { CONTACT, NAV, DIVISIONS, CATALOGUE, FLOW, PROCESS } from './data.js'

/* ---------- layout sketches for the website catalogue ---------- */
const r = (x, y, w, h, c, rx = 1.5) => ['r', x, y, w, h, c, rx]
const c = (x, y, rad, cls) => ['c', x, y, rad, cls]
const p = (pts, cls) => ['p', pts, cls]
const grid = (xs, ys, w, h, cls) => xs.flatMap((x) => ys.map((y) => r(x, y, w, h, cls)))

const SKETCH = {
  cube: [r(12, 30, 40, 6, 'c'), r(12, 42, 30, 4, 'b'), r(12, 50, 34, 4, 'b'), r(12, 64, 26, 9, 'a'),
    p('110,28 135,40 110,52 85,40', 'a'), p('85,40 110,52 110,80 85,68', 'c'), p('135,40 110,52 110,80 135,68', 'b')],
  corporate: [r(12, 22, 50, 7, 'c'), r(12, 34, 40, 4, 'b'), r(12, 42, 44, 4, 'b'), r(12, 54, 24, 8, 'a'), r(92, 20, 56, 42, 'b'),
    ...grid([12, 60, 108], [74], 40, 16, 'b')],
  shop: [...grid([12, 62, 112], [20, 60], 36, 22, 'b'), ...grid([12, 62, 112], [45, 85], 22, 3, 'c'), ...grid([12, 62, 112], [50, 90], 12, 3, 'a')],
  market: [r(12, 20, 28, 70, 'b'), ...grid([48, 102], [20, 58], 46, 32, 'b'), c(56, 28, 4, 'a'), c(110, 28, 4, 'a'), c(56, 66, 4, 'a'), c(110, 66, 4, 'a')],
  web3: [r(108, 18, 40, 8, 'a', 4), c(50, 58, 24, 'b'), c(50, 58, 13, 'a'), r(86, 40, 50, 6, 'c'), r(86, 52, 38, 4, 'b'), r(86, 66, 34, 10, 'a')],
  landing: [r(40, 22, 80, 7, 'c'), r(52, 34, 56, 4, 'b'), r(62, 44, 36, 9, 'a'), r(40, 60, 80, 30, 'b'), r(46, 66, 68, 6, 'w'), r(46, 77, 68, 6, 'w')],
  social: [r(18, 18, 44, 76, 'b', 5), ...grid([23, 42], [26, 45, 64], 15, 15, 'a'), r(76, 24, 68, 6, 'c'), r(76, 36, 52, 4, 'b'), ...grid([76, 112], [50], 32, 32, 'b')],
  booking: [...grid([12, 25, 38, 51, 64, 77, 90], [22, 35, 48, 61], 11, 11, 'b'), r(38, 35, 11, 11, 'a'), r(77, 48, 11, 11, 'a'), r(25, 61, 11, 11, 'c'),
    r(112, 22, 36, 60, 'b'), r(116, 70, 28, 8, 'a')],
  listing: [r(12, 20, 70, 70, 'b'), c(35, 45, 4, 'a'), c(60, 62, 4, 'a'), c(50, 32, 4, 'c'), ...grid([90], [20, 45, 70], 58, 20, 'b'), ...grid([94], [24, 49, 74], 12, 12, 'a')],
  portal: [r(12, 20, 24, 70, 'c'), ...grid([44, 80, 116], [20], 31, 16, 'b'),
    r(48, 70, 10, 18, 'a'), r(64, 58, 10, 30, 'a'), r(80, 64, 10, 24, 'a'), r(96, 48, 10, 40, 'a'), r(112, 54, 10, 34, 'a'), r(128, 44, 10, 44, 'a')],
}

function Sketch({ kind }) {
  return (
    <svg className="sketch" viewBox="0 0 160 100" role="img" aria-label="Layout sketch">
      <rect className="sk-frame" x="0.5" y="0.5" width="159" height="99" rx="5" />
      <path className="sk-line" d="M0.5 12.5h159" />
      <circle className="sk-dot" cx="8" cy="6.5" r="1.6" /><circle className="sk-dot" cx="14" cy="6.5" r="1.6" /><circle className="sk-dot" cx="20" cy="6.5" r="1.6" />
      {SKETCH[kind].map((s, i) =>
        s[0] === 'r' ? <rect key={i} className={`sk-${s[5]}`} x={s[1]} y={s[2]} width={s[3]} height={s[4]} rx={s[6]} />
        : s[0] === 'c' ? <circle key={i} className={`sk-${s[4]}`} cx={s[1]} cy={s[2]} r={s[3]} />
        : <polygon key={i} className={`sk-${s[2]}`} points={s[1]} />)}
    </svg>
  )
}

function CardVisual({ item }) {
  if (item.thumb) return <Sketch kind={item.thumb} />
  if (item.flow) {
    return (
      <ol className="mini-flow" aria-label="Workflow steps">
        {item.flow.map((step) => <li key={step}>{step}</li>)}
      </ol>
    )
  }
  return (
    <table className="mini-table">
      <tbody>
        {item.rows.map(([k, v]) => <tr key={k}><td>{k}</td><td><span className="ok">{v}</span></td></tr>)}
      </tbody>
    </table>
  )
}

/* ---------- navigation ---------- */
function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight - 90)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])
  return (
    <header className={`nav${solid || open ? ' is-solid' : ''}`}>
      <div className="nav__in">
        <a className="nav__brand" href="#top" onClick={() => setOpen(false)}>ZERA BYTES</a>
        <nav className="nav__links" aria-label="Sections">
          {NAV.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <button className="nav__menu" type="button" aria-expanded={open} aria-controls="nav-drawer" onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      {open && (
        <nav className="nav__drawer" id="nav-drawer" aria-label="Sections">
          {NAV.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
      )}
    </header>
  )
}

/* ---------- sections ---------- */
function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <p className="eyebrow">About the company</p>
        <div className="about">
          <h2 className="title">Zera Bytes builds the digital systems small and medium businesses run on.</h2>
          <div className="about__text">
            <p>Most growing businesses end up with a website from one vendor, a billing tool from another, and WhatsApp doing the rest. Nothing talks to anything else, so people re-type the same order three times.</p>
            <p>We build all three parts ourselves: the storefront, the automation and the ERP. They share the same data, so you can start with the one you need today and add the others later without rebuilding.</p>
          </div>
        </div>
        <div className="org" aria-label="How Zera Bytes is organised">
          <div className="org__top">Zera Bytes</div>
          <div className="org__row">
            {DIVISIONS.map((d) => (
              <a className="org__cell" key={d.id} href="#solutions">
                <span className="mono">{d.layer}</span>
                <b>{d.name}</b>
                <span>{d.role}</span>
              </a>
            ))}
          </div>
          <div className="org__base">One shared data layer: customers, orders, stock and invoices</div>
        </div>
      </div>
    </section>
  )
}

function Solutions() {
  return (
    <section className="section section--sky" id="solutions">
      <div className="wrap">
        <p className="eyebrow">Solutions</p>
        <div className="head">
          <h2 className="title">Three divisions, one connected system.</h2>
          <p>Each division solves a different part of the business. Clients usually start with one and grow into the full set.</p>
        </div>
        <div className="cols">
          {DIVISIONS.map((d) => (
            <article className="col" key={d.id}>
              <span className="mono">{d.layer} · {d.role}</span>
              <h3>{d.name}</h3>
              <p className="col__sum">{d.summary}</p>
              <ul>
                {d.items.map(([name, text]) => <li key={name}><b>{name}</b><span>{text}</span></li>)}
              </ul>
              <div className="tags">{d.stack.map((t) => <span key={t}>{t}</span>)}</div>
            </article>
          ))}
        </div>

        <h3 className="subtitle">What happens after a customer pays</h3>
        <ol className="flow">
          {FLOW.map(([who, what, detail]) => (
            <li key={what}><span className="mono">{who}</span><b>{what}</b><span>{detail}</span></li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Demos() {
  return (
    <div className="demos">
      <article className="demo">
        <div className="ui">
          <div className="ui__bar"><span className="mono">Vendor payouts · today</span><span className="mono">Smart contract</span></div>
          <div className="ui__scroll">
            <table>
              <thead><tr><th>Vendor</th><th className="num">Orders</th><th className="num">Payout</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td>@kicklab</td><td className="num">14</td><td className="num">₹1,07,086</td><td><span className="ok">Settled</span></td></tr>
                <tr><td>@solestudio</td><td className="num">9</td><td className="num">₹50,625</td><td><span className="ok">Settled</span></td></tr>
                <tr><td>@runnersrow</td><td className="num">3</td><td className="num">₹21,870</td><td><span className="wait">In escrow</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="demo__text">
          <span className="mono">Concept · Marketplace + Web3</span>
          <h4>UrbanKicks Marketplace</h4>
          <p><b>Problem:</b> vendor payouts worked out by hand, and Instagram sales tracked apart from the website.</p>
          <p><b>Solution:</b> a multi-vendor marketplace where a smart contract pays each vendor, with Instagram Shopping on the same catalogue.</p>
        </div>
      </article>

      <article className="demo">
        <div className="ui">
          <div className="ui__bar"><span className="mono">Stock · all locations</span><span className="ok">Synced</span></div>
          <div className="ui__scroll">
            <table>
              <thead><tr><th>SKU</th><th className="num">Store 1</th><th className="num">Store 2</th><th className="num">Store 3</th><th className="num">Online</th></tr></thead>
              <tbody>
                <tr><td>AD-RUN-09</td><td className="num">41</td><td className="num">18</td><td className="num">27</td><td className="num">86</td></tr>
                <tr><td>BP-LTH-02</td><td className="num">11</td><td className="num">6</td><td className="num">9</td><td className="num">26</td></tr>
                <tr><td>SC-KIT-01</td><td className="num">64</td><td className="num">30</td><td className="num">0</td><td className="num">94</td></tr>
              </tbody>
            </table>
          </div>
          <div className="ui__bar ui__bar--end"><span className="mono">GST returns</span><span className="ui__chips"><span className="ok">GSTR-1 filed</span><span className="wait">GSTR-3B ready</span></span></div>
        </div>
        <div className="demo__text">
          <span className="mono">Concept · ERP + GST</span>
          <h4>Apex Retail</h4>
          <p><b>Problem:</b> stock counts that did not match across three stores, and GST returns going in late.</p>
          <p><b>Solution:</b> Zera Core ERP with one stock count for every store and a monthly GST run from invoices to a ready return.</p>
        </div>
      </article>

      <article className="demo">
        <div className="ui ui--split">
          <div className="chat">
            <div className="msg msg--me">Price of Drift X?</div>
            <div className="msg">Drift X starts at ₹11.9L ex-showroom. Would you like a test drive this week?</div>
            <div className="msg msg--me">Saturday 11am</div>
            <div className="msg">Booked for Sat 11:00. Rahul will call to confirm.</div>
          </div>
          <div className="ui__scroll">
            <table>
              <thead><tr><th>Lead</th><th>Interest</th><th>Owner</th></tr></thead>
              <tbody>
                <tr><td>+91 98•• 4410</td><td>Test drive</td><td>Rahul</td></tr>
                <tr><td>+91 99•• 0287</td><td>EMI enquiry</td><td>Priya</td></tr>
                <tr><td>+91 90•• 7731</td><td>Service slot</td><td>Arjun</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="demo__text">
          <span className="mono">Concept · WhatsApp automation</span>
          <h4>Drift Motors</h4>
          <p><b>Problem:</b> WhatsApp enquiries unanswered after hours, and leads handed to staff informally.</p>
          <p><b>Solution:</b> an n8n workflow that replies on WhatsApp, logs each lead to a sheet, assigns a salesperson and follows up.</p>
        </div>
      </article>
    </div>
  )
}

function Portfolio() {
  const [tab, setTab] = useState('web')
  const group = CATALOGUE[tab]
  return (
    <section className="section" id="portfolio">
      <div className="wrap">
        <p className="eyebrow">Portfolio</p>
        <div className="head">
          <h2 className="title">What we build, by category.</h2>
          <p>Pick a category to see what we make in it. Below the catalogue are three concept builds that show the work in detail.</p>
        </div>

        <div className="tabs" role="group" aria-label="Portfolio category">
          {Object.entries(CATALOGUE).map(([key, g]) => (
            <button key={key} type="button" className="tab" aria-pressed={tab === key} onClick={() => setTab(key)}>
              {g.label} <span>{g.items.length}</span>
            </button>
          ))}
        </div>
        <p className="tabs__intro"><b>{group.division}.</b> {group.intro}</p>

        <div className={`catalogue catalogue--${tab}`}>
          {group.items.map((item) => (
            <article className="card" key={item.name}>
              <div className="card__visual"><CardVisual item={item} /></div>
              <h3>{item.name}</h3>
              <p>{item.text}</p>
              <div className="tags">{item.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </article>
          ))}
        </div>

        <h3 className="subtitle">Concept builds</h3>
        <p className="note">These three are demonstration projects with sample data. They show how we approach a typical problem in each division.</p>
        <Demos />
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="section section--sky" id="process">
      <div className="wrap">
        <p className="eyebrow">Process</p>
        <div className="head">
          <h2 className="title">How a project runs.</h2>
          <p>A fixed scope for each phase, a working preview from the first sprint, and your data stays yours.</p>
        </div>
        <ol className="process">
          {PROCESS.map(([name, text]) => <li key={name}><b>{name}</b><p>{text}</p></li>)}
        </ol>
      </div>
    </section>
  )
}

function Contact() {
  const digits = CONTACT.whatsapp.replace(/\D/g, '')
  const [copied, setCopied] = useState(false)
  const copy = () => {
    try { navigator.clipboard.writeText(CONTACT.email).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }, () => {}) } catch { /* the address stays selectable */ }
  }
  const any = digits || CONTACT.email || CONTACT.booking
  return (
    <section className="section section--blue" id="contact">
      <div className="wrap contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="title">Book a free 30-minute systems audit.</h2>
          <p className="contact__lede">Bring the process that takes up most of your week. We will show you which parts can be automated and what it would take to build.</p>
        </div>
        <div className="opts">
          {digits && (
            <div className="opt"><div><b>WhatsApp</b><span>+{digits}</span></div>
              <a className="btn" href={`https://wa.me/${digits}?text=${encodeURIComponent("Hi Zera Bytes, I'd like a free systems audit.")}`} target="_blank" rel="noopener">Open chat</a></div>
          )}
          {CONTACT.email && (
            <div className="opt"><div><b>Email</b><span className="select">{CONTACT.email}</span></div>
              <button className="btn btn--line" type="button" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button></div>
          )}
          {CONTACT.booking && (
            <div className="opt"><div><b>Schedule a call</b><span>Pick a time that suits you</span></div>
              <a className="btn btn--line" href={CONTACT.booking} target="_blank" rel="noopener">Book</a></div>
          )}
          {!any && <div className="opt"><div><b>Contact details coming soon</b><span>WhatsApp, email and booking link will appear here.</span></div></div>}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Solutions />
        <Portfolio />
        <Process />
        <Contact />
      </main>
      <footer className="footer">
        <div className="wrap">
          <span>© {new Date().getFullYear()} Zera Bytes</span>
          <span>Web &amp; Experiences · Automate · Core ERP</span>
        </div>
      </footer>
    </>
  )
}
