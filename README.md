# Zera Bytes — Portfolio Site

A light, industrial-style portfolio website (white and concrete grey, visible grid lines, Bento layouts, Inter + JetBrains Mono) for **Zera Bytes**, covering its three divisions: Zera Web & Experiences, Zera Automate and Zera Core ERP.

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
- Case studies are plain HTML in the `#work` section (`article.case`). The UI mockups in each one are built with HTML tables, so you can edit their figures directly.
