// Renders each slide of post.html to a 1080x1350 JPG (Instagram portrait).
// Usage: node social/01-premium-websites/render.cjs
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await p.goto('file://' + path.join(__dirname, 'post.html'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const n = await p.$$eval('.slide', (s) => s.length);
  for (let i = 1; i <= n; i++) {
    const el = await p.$('#s' + i);
    await el.screenshot({ path: path.join(__dirname, `slide-${i}.jpg`), type: 'jpeg', quality: 95 });
  }
  await b.close();
})();
