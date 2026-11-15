# Zera Studio website

The company website for **Zera Studio**: *We build your dream.*

One page: a hero with the pointer-following dog on a white backdrop, clients, a works carousel, specialities, automation, business flow, featured live work, services, gallery, support, FAQ and contact, plus Privacy, Terms, Refund and Support policy pages (`#privacy`, `#terms`, `#refund`, `#support`).

Built with Vite, React and GSAP.

## Run it

```bash
npm install
npm run dev
```

`npm run build` writes the finished site to `dist/`. Pushing to `main` deploys it to GitHub Pages through `.github/workflows/pages.yml`.

## Where to edit

```
src/data.js       Phone, WhatsApp, email, address, social links, clients, works, specialities, business flow, services, FAQ
src/policies.js   Policy text
src/App.jsx       Sections and interactions
src/Hero.jsx      Hero and the dog motion
src/index.css     Styles
public/work/      Work images (real client screenshots and concept screens)
```

## Before sharing

- Add your email, office address and social links in `src/data.js`. Anything left empty is not shown.
- The policy pages are starting templates. Have them reviewed.

## Tools

- `tools/make-white-dog.py` rebuilds `public/dog-white.mp4` and `src/gaze-frames.json` from the original film. Run `npm run assets` first to download it into `source/`.
- `tools/renders/` holds the sources of the concept screens (3D product pages, dashboards, automation, invoicing). Serve that folder with Three.js 0.170 in `node_modules`, then run `node shoot.cjs <page>`.
