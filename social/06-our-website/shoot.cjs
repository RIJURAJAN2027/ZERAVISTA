// Takes real screenshots of the Zera Vista website (run `npm run build && npx vite preview --port 4173` first).
const { chromium, devices } = require('playwright');
const path = require('path');
const out = (n) => path.join(__dirname, 'shots', n);
(async () => {
  const b = await chromium.launch();
  // PC
  const pc = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await pc.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await pc.addStyleTag({ content: '.bracket { display: none !important; }' });
  await pc.mouse.move(820, 300); await pc.waitForTimeout(3500);
  await pc.screenshot({ path: out('pc-hero.png') });
  const go = async (sel, dy = 0) => { const y = await pc.evaluate(([s, d]) => document.querySelector(s).getBoundingClientRect().top + scrollY + d, [sel, dy]); await pc.evaluate((y) => window.scrollTo(0, y), y); await pc.waitForTimeout(2200); };
  await go('#work', 80); await pc.screenshot({ path: out('pc-work.png') });
  await go('#services', 0); await pc.screenshot({ path: out('pc-services.png') });
  await go('#gallery', 0); await pc.screenshot({ path: out('pc-gallery.png') });
  // Phone
  const ctx = await b.newContext({ ...devices['iPhone 13'] });
  const ph = await ctx.newPage();
  await ph.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await ph.waitForTimeout(3500);
  await ph.screenshot({ path: out('ph-hero.png') });
  const pgo = async (sel, dy = 0) => { const y = await ph.evaluate(([s, d]) => document.querySelector(s).getBoundingClientRect().top + scrollY + d, [sel, dy]); await ph.evaluate((y) => window.scrollTo(0, y), y); await ph.waitForTimeout(2200); };
  await pgo('#services', 60); await ph.screenshot({ path: out('ph-services.png') });
  await pgo('#work', 0); await ph.screenshot({ path: out('ph-work.png') });
  await ph.click('.gbar button'); await ph.waitForTimeout(1200); await ph.screenshot({ path: out('ph-menu.png') });
  await b.close();
})();
