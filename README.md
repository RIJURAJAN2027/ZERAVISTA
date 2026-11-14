# Zera Bytes — Portfolio Site

A dark, glassmorphism portfolio website for **Zera Bytes**, covering its three divisions: Zera Web & Experiences, Zera Automate and Zera Core ERP.

It's a static site with no build step and no dependencies to install. Three.js r128 is vendored in `assets/vendor/`.

![Preview](assets/img/preview-desktop.png)

## Run locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080. Any static host works, including GitHub Pages, Netlify, Vercel and Cloudflare Pages.

## Structure

```
index.html              The whole site: markup, styles and scripts in one file
assets/vendor/          three.min.js (r128), used for the 3D hero background
assets/img/             Put project screenshots / renders here
```

## Before sharing with clients

Open `index.html` and edit the block marked `EDIT THESE BEFORE SHARING`:

- `CONTACT.whatsapp`: your WhatsApp number, digits only with country code (e.g. `919876543210`). This turns on the WhatsApp buttons.
- `CONTACT.email`: your real address. The current one is a placeholder.
- `CONTACT.booking`: a Calendly or similar link for "Book a Call".
- `CASES`: each project's text, stack and outcomes. Set `image` to a real screenshot to replace the drawn mockup.
