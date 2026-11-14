# Zera Bytes website

The company website for **Zera Bytes**. It opens on a full-screen intro where the dog looks toward the pointer, then scrolls into About, Solutions, Portfolio (by category), Process and Contact, in the blue of the intro film.

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
src/data.js            Contact details, navigation, divisions, portfolio categories, process steps
src/App.jsx            Page sections and the concept builds
src/Hero.jsx           The intro screen (headline, paragraph, bottom labels)
src/index.css          Colours (in :root) and all section styles
src/gaze-frames.json   Gaze calibration for the supplied video; a different clip needs a new table
```

## Before sharing with clients

- In `src/data.js`, fill in `CONTACT` (WhatsApp number, email, booking link). Empty values are hidden, and with all three empty the Contact section says "Contact details coming soon".
- The three concept builds use sample data and are labelled "Concept". Replace them with client projects as you complete them.
