# Website PDF

Makes `Zera-Vista-Website.pdf`: the whole site, one section per page, with empty bands squeezed out.

```bash
npm run build && npx vite preview --port 4173 &
node tools/site-pdf/capture.cjs /tmp/site/page      # writes page.png and page.json
python3 tools/site-pdf/build.py /tmp/site Zera-Vista-Website.pdf
```

`brand-images.cjs` re-renders `public/work/brand-2..4.jpg` (the Brand Identity service) from the logos in `public/brand/`.
