# Zera Bytes — Portfolio Site

A dark portfolio website for **Zera Bytes** covering its three divisions: Zera Web & Experiences, Zera Automate and Zera Core ERP.

It's one static HTML file: no build step, no dependencies, no JavaScript libraries.

![Preview](assets/img/preview-desktop.png)

## Run locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080. Any static host works, including GitHub Pages, Netlify, Vercel and Cloudflare Pages.

## Structure

```
index.html              The whole site: markup, styles and scripts in one file
assets/img/             Put project screenshots / renders here
```

## Before sharing with clients

Open `index.html` and edit the block marked `EDIT THESE BEFORE SHARING`:

- `CONTACT.whatsapp`: your WhatsApp number, digits only with country code (e.g. `919876543210`). This turns on the WhatsApp buttons.
- `CONTACT.email`: your real address. The current one is a placeholder.
- `CONTACT.booking`: a Calendly or similar link for "Book a Call".
- Case studies are plain HTML in the `#work` section (`article.case`). The UI mockups are HTML tables, so you can edit their figures directly.

## Intro page (`hero/`)

A single-screen intro where the dog looks toward the pointer. It's a separate Vite + React project.

```bash
cd hero
npm install
npm run assets
npm run build
```

`npm run assets` downloads the video and poster and checks them against the hashes in `assets.json`. The built site lands in `hero/dist`. The "Our work" and "See our work" links point to `../` by default; set `VITE_PORTFOLIO_URL` at build time to send them somewhere else.

Text lives in `hero/src/App.jsx`. The gaze table in `hero/src/gaze-frames.json` is calibrated to the supplied video, so a different clip needs a new table.
