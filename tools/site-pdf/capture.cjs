// Capture the whole site at 2x with motion off, plus section and split-point positions.
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const out = process.argv[2];
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  await p.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  for (let y = 0; y < 21000; y += 500) { await p.evaluate(y => window.scrollTo(0, y), y); await p.waitForTimeout(100); }
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(1000);
  await p.addStyleTag({ content: '.dock, .cursor, [class*="cursor"] { display: none !important; } img { content-visibility: visible !important; } .svc { position: relative !important; top: auto !important; }' });
  await p.evaluate(async () => { await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))); });
  await p.waitForTimeout(500);
  const data = await p.evaluate(() => {
    const abs = e => { const r = e.getBoundingClientRect(); return [Math.round(r.top + scrollY), Math.round(r.bottom + scrollY)]; };
    const secs = [...document.querySelectorAll('main > section, body footer')].filter(e => getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().height > 0);
    return {
      height: document.documentElement.scrollHeight,
      sections: secs.map(e => ({ cls: e.className.toString().split(' ')[0], box: abs(e),
        // possible split points: tops of large child blocks
        cuts: [...e.querySelectorAll(e.classList.contains('svcs') ? '.svc' : ':scope > *, :scope > * > *, .case')].filter(c => c.getBoundingClientRect().height > 120).map(c => abs(c)[0]) })),
    };
  });
  fs.writeFileSync(out + '.json', JSON.stringify(data));
  await p.screenshot({ path: out + '.png', fullPage: true });
  await b.close();
})();
