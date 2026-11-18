# Zera Vista website: project notes

Read this first. It is the hand-over from the previous Claude session.

## What this is

The company website for **Zera Vista**, founded by **Riju Rajan**. Tagline: **We build your dream**.

It is a single-page site built with React 19, Vite 6 and GSAP, on a light theme. The layout follows the section structure of orbix.studio, a US design agency the owner chose as a reference. All text, images and branding here are Zera's own. Do not copy Orbix's text, images, fonts, reviews, awards or numbers.

## Where things are

- **Repo:** https://github.com/RIJURAJAN2027/ZERAVISTA. Start every new session from this repo.
  - The site moved here from `jeromjojuk-jkj/zerabytes` on 16 Nov 2026, with its full history. The old repo and its old live site (https://jeromjojuk-jkj.github.io/zerabytes/) were left as they were. Don't work there.
- **Branches:**
  - `main` is the default branch and what GitHub Pages deploys.
  - Work happens on the session's own branch.
  - When the owner asks to publish, fast-forward `main` to the working branch.
- **Deploy:** `.github/workflows/pages.yml` builds and deploys on every push to `main`. The live site will be https://rijurajan2027.github.io/ZERAVISTA/.
  - The site appears only after the owner turns Pages on: repo Settings → Pages → Source: **GitHub Actions**. Then run "Deploy to GitHub Pages" from the Actions tab once.
  - Never set Source to "Deploy from a branch". That publishes the raw source files, which show a blank page.
- **Hostinger:** `.github/workflows/hostinger.yml` builds on every push to `main` and force-pushes the finished files (`dist/`) to the `hostinger` branch. Never edit that branch by hand.
  - Owner's one-time setup in hPanel → Advanced → Git: repository `https://github.com/RIJURAJAN2027/ZERAVISTA.git`, branch `hostinger`, install path empty (`public_html`). Then turn on Auto Deployment and add its webhook URL to GitHub (Settings → Webhooks).
- **Preview:** https://claude.ai/artifact/6hCNPMVY1baB3r52HAavZ8 (private to the owner). It is the built `dist/` folder, published with all its files.

## Run it

```bash
npm install
npm run dev     # local preview
npm run build   # writes dist/
```

## Owner's content (all in `src/data.js`)

- **Phone / WhatsApp:** +91 93603 25702
- **Clients:** Loyola College, Larsen & Toubro, Jula International, Kripkart
- **Live client work:** kripkart.com, julainternational.com, zerafinance.in. These are shown with real screenshots in `public/work/`.
- **Business flow:**
  1. Order
  2. Quotation on WhatsApp within 24 hours
  3. Website creation in 4–10 days
  4. Final output
- **Specialities:**
  - We study your company first
  - What you imagine, live
  - Quotation in 24 hours
  - Websites in 4–10 days
  - One year of free support
- **Services:** UI/UX design, web design and development, mobile apps, SaaS and custom software, business automation (n8n), social media automation (WhatsApp and Instagram), ERP (Zera Core), AI integration, brand identity.
- **Policy pages:** `src/policies.js`, opened at `#privacy`, `#terms`, `#refund` and `#support`.

## Still missing (ask the owner)

- Email, office address and other social links. The fields exist in `CONTACT` in `src/data.js`; empty ones are hidden. Instagram is set: https://www.instagram.com/zeravista/ (team buttons, under the gallery, footer contacts, phone glass bar).
- A review of the policy pages, which are templates.
- More real client screenshots, to replace the projects marked "Concept" over time.

## Brand

- The company was renamed from Zera Studio to **Zera Vista** on 16 Nov 2026. Write it as "Zera Vista"; the logo itself is lowercase.
- Logos are the owner's own files, cleaned to transparent PNGs in `public/brand/`:
  - `horizontal`: mark and name side by side. The site's top bar and footer use this one.
  - `stacked`: mark above the name.
  - `wordmark`: the name alone.
  - `mark`: the symbol alone.
  
  Each has a `-white` version for dark backgrounds. `public/logo.png` is the mark (dock, hero tagline) and `public/favicon.png` is the mark on white.
- The black dock shows the white mark and switches to the dark mark when the dock turns white.

## Plans and quotation PDF

- Source: `tools/quotation/quote.html`. Render it with `node tools/quotation/render.cjs out.pdf`. It uses the site's fonts, colours and `public/` images.
- The website offers this PDF as `public/Zera-Vista-Quotation.pdf` (menu, contact section, footer, phone glass bar). After re-rendering the PDF, copy it there too.
- Word version: `node tools/quotation/make-docx.cjs` writes `Zera-Vista-Plans-and-Quotation.docx` (Arial and Georgia, so it opens the same on any computer). Its content is a copy of `quote.html`: change both when prices or text change.
- Prices from the owner:
  - Websites: ₹4,000, ₹6,000 or ₹8,000 (one-time), with domain, hosting and SEO included for the first year.
  - E-commerce websites: priced on the client's customisation.
  - Software plans:
    - Business Orders: ₹15 per day, paid once a year.
    - Ready Software (pre-built): ₹25 per day, paid once a year.
    - Custom Software: ₹40,000, one-time.
    - Advanced Growth (full software control): ₹60,000, one-time.
  - Every software plan, once customisation is finished, includes a demo login, a Zoom walkthrough and a built-in SOP in Tamil and English.
  - Social media automation: ₹4,000 for one account, ₹8,000 for all accounts.
- The cover shows the large logo mark, not the dog (owner removed it). The owner also asked for no "Quotation in 24 hours" pill, no top-right label and no founder/phone line on the cover.
- Not yet confirmed by the owner:
  - Whether the automation prices are one-time or recurring.
  - The page counts and delivery days per website plan.
  - The terms.

## What the owner wants

- A premium look with few words. Let images and motion carry the page.
- The dog hero on a white background. The dog follows the pointer; on phones it looks around on its own.
- Nothing that looks AI-made: no sparkle icons, no gradient text, no invented stats or reviews, plain English.
- Fonts: Inter Tight, plus Instrument Serif italic for the tagline on PC. On phones the tagline is small Inter Tight.
- Concept projects stay labelled "Concept". Real client sites are labelled "Live" and link out.
- Short, plain explanations. Push to `main` only when the owner asks.

## Motion

The motion follows the reference site's behaviour, written in our own code with Zera's colours:

- Smooth scrolling with Lenis, synced to GSAP ScrollTrigger. Phones keep native scrolling.
- Big headings print in letter by letter: blur, then a colour wave, then the final colour.
- Bracket cursor `[ ]` on desktop. It hides over links, buttons and the works wheel.
- Button labels roll up on hover (`Roll` in `src/bits.jsx`).
- The hero stays pinned and fades to white as the client cards rise over it (PC only).
- Works sit on an endless wheel: drag, swipe, sideways trackpad, arrow buttons or Tab.
- Featured work is a deck of cards that peel away on scroll (desktop, 1000px+ wide).
- The menu grows out of the dock, with a scrambled Menu/Close label and a blurred backdrop.
- Numbers count up, and gallery images sharpen in with a light sweep.
- Everything respects reduced-motion settings.

Two rules learned the hard way:
- The print effect wraps letters in `span.pw` and `span.pc`. Never style headings with a bare `h2 span` selector; use a class (two-line titles use `.ln`).
- Card focus on the wheel reacts to keyboard focus only (`:focus-visible`), or it fights a mouse drag.

## Phone layout (760px wide and below)

The owner wants a shorter phone page and the PC version left exactly as it is.

- **Hidden on phones:**
  - Top bar and the hero's "We build your dream" row.
  - Client cards and the hero fade.
  - Statement chips and the stats row.
  - Founder and promise cards ("The People And Promises").
  - The Brand Identity service.
  - The FAQ section and its menu link.
  - The PC footer.
- **Phone only:**
  - Nothing runs under the dog: the owner removed the moving text strip that was there.
  - "We build your dream" is small and in Inter Tight (not the serif) wherever it shows.
  - "One Year Of Free Support" is one small box with four small tiles.
  - The business flow as four steps.
  - A clear "liquid glass" bar replaces the black dock bar: Contact, Quotation, Instagram, Menu. No colour of its own; icons turn white over dark sections. FAQ opens from inside the menu.
  - A short, black, centred footer.
- **Phone motion:**
  - The hero arrives: the badge drops in, the dog rises, then the buttons and the glass bar.
  - The dog film is played for an instant and paused (muted, playsinline) so iPhones load its frames; without that the dog stays a still picture on phones.
  - Specialities stack like cards; a covered card shrinks and darkens.
  - Service bands slide over each other.
  - Featured-work screens slide up into their frames.
  - Flow steps slide in with their numbers popping.
  - Footer lines rise in.
  - The stacking needs a screen at least 640px tall.
- **How it is built:** `.m-only` shows an element on phones only and `.d-only` hides it on phones. The phone rules are at the end of `src/index.css`.
- **After any phone change:** compare full-page PC screenshots before and after to prove PC did not move.

## Files

```
src/data.js              All content
src/App.jsx              Sections, popup, dock menu, featured-work deck, policy pages
src/Hero.jsx             Hero; seeks the dog film using src/gaze-frames.json
src/Wheel.jsx            Endless drag wheel for the works
src/motion.js            Smooth scroll, scroll locking, heading print, bracket cursor
src/bits.jsx             Roll (hover label) and CountUp
src/index.css            Styles
public/dog-white.mp4     Dog film on white: 74 frames, every frame a keyframe, for instant seeking
public/work/             Work images
tools/make-white-dog.py  Rebuilds the dog film and gaze table from the original film
tools/renders/           Sources of the concept screens (Three.js and HTML), rendered with shoot.cjs
```

To rebuild the dog film, run `npm run assets` first. It downloads the original into `source/`. Never re-encode `public/dog-white.mp4` with normal settings: seeking needs every frame to be a keyframe, and the gaze table timings must match the film. Regenerate both with the tool.
