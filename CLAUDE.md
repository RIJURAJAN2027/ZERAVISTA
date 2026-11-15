# Zera Studio website: project notes

Read this first. It is the hand-over from the previous Claude session.

## What this is

The company website for **Zera Studio**, founded by **Riju Rajan**. Tagline: **We build your dream**.

It is a single-page site built with React 19, Vite 6 and GSAP, on a light theme. The layout follows the section structure of orbix.studio, a US design agency the owner chose as a reference. All text, images and branding here are Zera's own. Do not copy Orbix's text, images, fonts, reviews, awards or numbers.

## Where things are

- **Branches:**
  - `claude/jolly-fermi-nqvth4` is the repo's default branch and where work happens.
  - `main` is what GitHub Pages deploys.
  - When the owner asks to publish, fast-forward `main` to the working branch.
- **Deploy:** `.github/workflows/pages.yml` builds and deploys on every push to `main`. The live site is https://jeromjojuk-jkj.github.io/zerabytes/.
  - Pages is switched on, but its Source is "Deploy from a branch". That publishes the raw source files, which show a blank page, and it races the real deploy on every push to `main`.
  - Fix: repo Settings → Pages → Source: **GitHub Actions**.
  - Until then, after each push to `main`, check that "Deploy to GitHub Pages" finished after "pages build and deployment". If it didn't, run "Deploy to GitHub Pages" again.
- **Preview:** https://claude.ai/artifact/DQVZ1AdpdB4s5sQQo7Rk4R is private to the owner's original Claude account.

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

- Email, office address and social media links. The fields exist in `CONTACT` in `src/data.js`; empty ones are hidden.
- A review of the policy pages, which are templates.
- More real client screenshots, to replace the projects marked "Concept" over time.

## What the owner wants

- A premium look with few words. Let images and motion carry the page.
- The dog hero on a white background. The dog follows the pointer; on phones it looks around on its own.
- Nothing that looks AI-made: no sparkle icons, no gradient text, no invented stats or reviews, plain English.
- Fonts: Inter Tight, plus Instrument Serif italic for the tagline.
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
  - A slow strip of what we build (words and small screens) after the hero.
  - The business flow as four steps.
  - An FAQ button in the dock that opens its own panel.
  - A short, black, centred footer.
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
