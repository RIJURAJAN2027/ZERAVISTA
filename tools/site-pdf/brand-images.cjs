const { chromium } = require('playwright');
const fs = require('fs');
const P = new Proxy({}, { get: (_, f) => 'data:image/png;base64,' + fs.readFileSync('/home/user/zerabytes/public/brand/' + f).toString('base64') });
const head = `<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500&family=Instrument+Serif:ital@1&display=swap" rel="stylesheet"><style>*{margin:0;box-sizing:border-box}body{width:1200px;height:780px;overflow:hidden;font-family:'Inter Tight',sans-serif;display:flex;align-items:center;justify-content:center}</style>`;
const pages = {
  'brand-2': `<body style="background:#f1f1f0"><img src="${P['mark.png']}" style="width:330px">`,
  'brand-3': `<body style="background:#fff"><img src="${P['stacked.png']}" style="width:470px">`,
  'brand-4': `<body style="background:#fff;display:block;padding:56px 60px">
    <img src="${P['horizontal.png']}" style="height:46px;display:block">
    <div style="display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:16px;margin-top:34px;height:400px">
      ${[['Ink','#000000','#fff'],['Graphite','#646464','#fff'],['Paper','#F1F1F0','#000'],['White','#FFFFFF','#000']].map(([n,c,t])=>`<div style="background:${c};color:${t};border-radius:22px;padding:24px;display:flex;flex-direction:column;justify-content:flex-end;${c==='#FFFFFF'?'border:1px solid #e4e4e4;':''}"><div style="font-size:26px;font-weight:500">${n}</div><div style="font-size:17px;opacity:.65;margin-top:4px">${c}</div></div>`).join('')}
    </div>
    <div style="border-top:1px solid #e6e6e6;margin-top:32px;padding-top:26px;display:flex;align-items:baseline;justify-content:space-between">
      <div style="display:flex;align-items:baseline;gap:26px"><span style="font-size:84px;font-weight:500;letter-spacing:-.03em;line-height:1">Aa</span><span style="font-family:'Instrument Serif';font-style:italic;font-size:58px;line-height:1">We build your dream</span></div>
      <span style="font-size:17px;color:#777">Inter Tight · Instrument Serif</span>
    </div>`,
};
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 780 } });
  for (const [name, body] of Object.entries(pages)) {
    await p.setContent(head + body, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: `/home/user/zerabytes/public/work/${name}.jpg`, type: 'jpeg', quality: 90 });
  }
  await b.close();
})();
