// Renders quote.html to an A4 PDF: node tools/quotation/render.cjs [out.pdf]
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const out = process.argv[2] || 'Zera-Vista-Plans-and-Quotation.pdf';
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'quote.html'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await b.close();
})();
