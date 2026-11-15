// Usage: node shoot.cjs <page> [<page> ...]   -> out/<page>.png
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  for (const name of process.argv.slice(2)) {
    const p = await b.newPage({ viewport: { width: 1200, height: 780 }, deviceScaleFactor: 1 });
    const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.text().slice(0, 200)); });
    const t = Date.now();
    await p.goto(`http://localhost:4180/pages/${name}.html`, { waitUntil: 'networkidle' });
    try { await p.waitForFunction(() => window.__done === true, null, { timeout: 120000 }); } catch (e) { errs.push('timeout waiting for __done'); }
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    await p.screenshot({ path: `out/${name}.png` });
    console.log(name, (Date.now() - t) + 'ms', errs.slice(0, 6));
    await p.close();
  }
  await b.close();
})();
