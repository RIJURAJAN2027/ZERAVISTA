# Zera Bytes website

The company website for **Zera Bytes**. It opens on a full-screen intro where the dog looks toward the pointer, then scrolls into a filterable Works gallery, Solutions, About, Process and Contact, in blue liquid glass.

Built with Vite, React, Tailwind and GSAP.

## Run it

```bash
npm install
npm run assets
npm run dev
```

`npm run assets` downloads the intro video and poster and checks them against the hashes in `assets.json`. `npm run build` writes the finished site to `dist/`, which any static host can serve.

## Where to edit

```
src/data.js            Contact details, menu, work filters, projects, divisions, process steps
src/App.jsx            Sections, glass navigation, project popup and scroll animations
src/Hero.jsx           The intro screen (headline, paragraph, bottom labels)
src/index.css          Colours (in :root), liquid glass and all section styles
src/gaze-frames.json   Gaze calibration for the supplied video; a different clip needs a new table
public/work/           Project images shown in the Works gallery
tools/render-work-screens.cjs   Script that drew the nine concept screens (needs Playwright)
```

## Before sharing with clients

- In `src/data.js`, fill in `CONTACT` (WhatsApp number, email, booking link). Empty values are hidden.
- The nine projects in the gallery are concept designs and are labelled "Concept". To add a real project, put its screenshot in `public/work/` and add an entry to `WORKS` in `src/data.js`.
