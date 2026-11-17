// Builds the plans and quotation as an editable Word file.
// Usage: node tools/quotation/make-docx.cjs [out.docx]
// Content matches quote.html; fonts are Arial and Georgia so it looks right on any computer.
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType, ShadingType,
  BorderStyle, AlignmentType, VerticalAlign, LevelFormat, PageBreak, Footer, Header, TabStopType,
  TableLayoutType, HeightRule,
} = require('docx');

const ROOT = path.join(__dirname, '..', '..');
const img = (p) => fs.readFileSync(path.join(ROOT, 'public', p));
const OUT = process.argv[2] || path.join(ROOT, 'Zera-Vista-Plans-and-Quotation.docx');

const SANS = 'Arial', SERIF = 'Georgia';
const INK = '000000', MUTED = '808080', SOFT_TXT = '555555', SOFT = 'F1F1F0', LINE = 'E2E2E2', ACCENT = 'FF7A3D';
const W = 10092;            // A4 width minus 16 mm margins, in DXA
const NONE = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const NO_BORDERS = { top: NONE, bottom: NONE, left: NONE, right: NONE, insideHorizontal: NONE, insideVertical: NONE };
const hair = (c = LINE) => ({ style: BorderStyle.SINGLE, size: 4, color: c });

// ---------- small builders ----------
const t = (text, o = {}) => new TextRun({ text, font: o.serif ? SERIF : SANS, italics: !!o.serif || o.italics, bold: o.bold,
  size: o.size || 19, color: o.color || INK, characterSpacing: o.spacing });
const p = (runs, o = {}) => new Paragraph({ children: Array.isArray(runs) ? runs : [runs], alignment: o.align,
  spacing: { before: o.before || 0, after: o.after ?? 80, line: o.line }, keepNext: o.keepNext, border: o.border,
  tabStops: o.tabs, numbering: o.numbering });
const cap = (text, o = {}) => p(t(text.toUpperCase(), { size: 14, color: o.color || MUTED, spacing: 20 }), { after: o.after ?? 140, before: o.before });
const h2 = (text, serifTail) => p([t(text, { size: 44, bold: false }), ...(serifTail ? [t(' ' + serifTail, { serif: true, size: 46 })] : [])], { after: 160 });
const lead = (text) => p(t(text, { size: 21, color: SOFT_TXT }), { after: 240, line: 300 });
const tick = (text, o = {}) => p(t(text, { size: 17, color: o.color || '333333' }), { after: 50, numbering: { reference: 'ticks', level: 0 } });
const spacer = (after = 120) => p(t(''), { after });
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

function cell(children, o = {}) {
  return new TableCell({
    children, width: { size: o.w, type: WidthType.DXA }, verticalAlign: o.valign || VerticalAlign.TOP, columnSpan: o.span,
    shading: o.fill ? { fill: o.fill, type: ShadingType.CLEAR, color: 'auto' } : undefined,
    margins: { top: o.pad ?? 160, bottom: o.pad ?? 160, left: o.padX ?? 180, right: o.padX ?? 180 },
    borders: o.borders || { top: NONE, bottom: NONE, left: NONE, right: NONE },
  });
}
function table(widths, rows, o = {}) {
  return new Table({ width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: widths,
    layout: TableLayoutType.FIXED, borders: o.borders || NO_BORDERS, rows });
}
// cards side by side with a gap column between them
function cardRow(cards, gap = 200, o = {}) {
  const n = cards.length, cw = Math.floor((W - gap * (n - 1)) / n);
  const widths = []; cards.forEach((_, i) => { widths.push(cw); if (i < n - 1) widths.push(gap); });
  widths[widths.length - 1] += W - widths.reduce((a, b) => a + b, 0);
  const cells = []; cards.forEach((c, i) => {
    cells.push(cell(c.children, { w: widths[i * 2], fill: c.fill || 'FFFFFF', borders: c.fill && c.fill !== 'FFFFFF' ? undefined : { top: hair(), bottom: hair(), left: hair(), right: hair() }, pad: o.pad ?? 200, padX: o.padX ?? 200 }));
    if (i < n - 1) cells.push(cell([p(t(''))], { w: widths[i * 2 + 1], pad: 0, padX: 0 }));
  });
  return table(widths, [new TableRow({ children: cells, cantSplit: true })]);
}

// ---------- plan card contents ----------
function planCard({ name, tag, price, unit, line, items, foot, note, dark }) {
  const fg = dark ? 'FFFFFF' : INK, sub = dark ? 'BFBFBF' : SOFT_TXT, mute = dark ? '999999' : MUTED;
  const head = [t(name, { size: 24, color: fg })];
  if (tag) head.push(t('   ' + tag, { size: 15, color: dark ? 'D0D0D0' : ACCENT }));
  const kids = [
    p(head, { after: 160 }),
    p([t(price, { size: 48, color: fg }), ...(unit ? [t('  ' + unit, { size: 15, color: mute })] : [])], { after: 100 }),
    p(t(line, { size: 17, color: sub }), { after: 160, line: 260, border: { bottom: { ...hair(dark ? '333333' : LINE), space: 8 } } }),
    ...items.map((i) => tick(i, { color: dark ? 'E6E6E6' : '333333' })),
  ];
  if (note) kids.push(p(t(note, { size: 16, color: INK }), { before: 120, after: 0 }));
  if (foot) kids.push(p(t(foot, { size: 15, color: mute }), { before: 160, after: 0 }));
  return { children: kids, fill: dark ? '0B0B0B' : 'FFFFFF' };
}

// ---------- header / footer ----------
const header = (label) => new Header({ children: [
  p([new ImageRun({ type: 'png', data: img('brand/horizontal.png'), transformation: { width: 118, height: 22 } }),
    t('\t' + label, { size: 15, color: MUTED })], { after: 240, tabs: [{ type: TabStopType.RIGHT, position: W }] }),
] });
const footer = new Footer({ children: [
  p([t('Zera Vista', { size: 15, color: MUTED }), t('\t+91 93603 25702', { size: 15, color: MUTED })],
    { tabs: [{ type: TabStopType.RIGHT, position: W }], border: { top: { ...hair(), space: 6 } } }),
] });
const section = (label, children) => ({
  properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1000, bottom: 900, left: 907, right: 907, header: 560, footer: 480 } } },
  headers: { default: header(label) }, footers: { default: footer }, children,
});

// ---------- 1. cover ----------
const cover = {
  properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 800, bottom: 900, left: 907, right: 907 } } },
  children: [
    p(new ImageRun({ type: 'png', data: img('brand/horizontal.png'), transformation: { width: 175, height: 32 } }), { after: 1500 }),
    p(new ImageRun({ type: 'png', data: img('brand/mark.png'), transformation: { width: 330, height: 313 } }), { align: AlignmentType.CENTER, after: 2300 }),
    p(t('Plans and quotation', { size: 84 }), { after: 60, line: 240 }),
    p(t('We build your dream.', { serif: true, size: 52 }), { after: 500 }),
    table([4200, 300, 2600, 300, 2692], [
      new TableRow({ children: [
        cell([cap('Prepared for', { after: 300 })], { w: 4200, pad: 120, padX: 0, borders: { top: hair(), bottom: hair('999999'), left: NONE, right: NONE } }),
        cell([p(t(''))], { w: 300, pad: 0, padX: 0 }),
        cell([cap('Date', { after: 300 })], { w: 2600, pad: 120, padX: 0, borders: { top: hair(), bottom: hair('999999'), left: NONE, right: NONE } }),
        cell([p(t(''))], { w: 300, pad: 0, padX: 0 }),
        cell([cap('Quotation no.', { after: 60 }), p(t('ZV-', { size: 21 }), { after: 0 })], { w: 2692, pad: 120, padX: 0, borders: { top: hair(), bottom: hair('999999'), left: NONE, right: NONE } }),
      ] }),
    ]),
  ],
};

// ---------- 2. about ----------
const step = (n, title, text) => ({ children: [
  p(t(n, { size: 15, color: MUTED }), { after: 700 }), p(t(title, { size: 24 }), { after: 60 }), p(t(text, { size: 16, color: SOFT_TXT }), { after: 0, line: 250 }),
] });
const shot = (file, name, tagText) => ({ children: [
  p(new ImageRun({ type: 'jpg', data: img('work/' + file), transformation: { width: 205, height: 133 } }), { after: 120 }),
  p([t(name, { size: 17 }), t('   ● ', { size: 13, color: '16A34A' }), t(tagText, { size: 15, color: SOFT_TXT })], { after: 0 }),
] });
const about = section('01 · About us', [
  cap('Who we are'),
  h2('We design and build websites, software and automation for growing businesses.', 'You imagine it, we make it live.'),
  spacer(300),
  cardRow([step('01', 'Order', 'Tell us what you need on call or WhatsApp.'), step('02', 'Quotation', 'A clear quotation on WhatsApp within 24 hours.'),
    step('03', 'Creation', 'Your website is built in 4 to 10 days.'), step('04', 'Final output', 'It goes live, and we stay with you for a year.')], 140, { pad: 180, padX: 170 }),
  spacer(500),
  table(Array(5).fill(W / 5), [new TableRow({ children: [
    ['01', 'We study your company first'], ['02', 'What you imagine, live'], ['03', 'Quotation in 24 hours'], ['04', 'Websites in 4 to 10 days'], ['05', 'One year of free support'],
  ].map(([n, s]) => cell([p(t(n, { size: 14, color: MUTED }), { after: 60 }), p(t(s, { size: 18 }), { after: 0, line: 250 })], { w: W / 5, pad: 140, padX: 0, borders: { top: hair(), bottom: NONE, left: NONE, right: NONE } })) })]),
  spacer(700),
  cap('Live client work', { after: 140 }),
  cardRow([shot('kripkart-1.jpg', 'Kripkart', 'Live · kripkart.com'), shot('jula-1.jpg', 'Jula International', 'Live'), shot('zerafinance-1.jpg', 'Zera Finance', 'Live')], 160, { pad: 0, padX: 0 }),
  spacer(700),
  cap('Trusted by', { after: 120 }),
  p([t('Loyola College', { size: 20 }), t('     ·     ', { size: 20, color: MUTED }), t('Larsen & Toubro', { size: 20 }), t('     ·     ', { size: 20, color: MUTED }),
    t('Jula International', { size: 20 }), t('     ·     ', { size: 20, color: MUTED }), t('Kripkart', { size: 20 })]),
]);

// ---------- 3. website plans ----------
const plans = section('02 · Website plans', [
  cap('Website plans'),
  h2('A complete website,', 'ready to go live.'),
  lead('Every plan includes your domain, hosting and SEO for the first year. One price, no hidden setup costs.'),
  cardRow([
    planCard({ name: 'Starter', price: '₹4,000', unit: 'one-time', line: 'For shops, freelancers and new businesses that need a clean presence online.',
      items: ['Up to 5 pages', 'Mobile-friendly design', '.com or .in domain for 1 year', 'Hosting for 1 year', 'SSL security (https)', 'Basic SEO setup', 'Google Search Console', 'WhatsApp and call buttons', 'Contact form and Google Map', '1 year of free support'], foot: 'Ready in 4 to 6 days' }),
    planCard({ name: 'Business', tag: 'Recommended', dark: true, price: '₹6,000', unit: 'one-time', line: 'For growing businesses that want customers to find them on Google.',
      items: ['Up to 10 pages', 'Everything in Starter', 'Design based on a study of your company', 'On-page SEO for every page', 'Google Business Profile setup', 'Products or services showcase', 'Photo gallery', 'Google Analytics', 'Speed optimisation', 'Social media links'], foot: 'Ready in 5 to 8 days' }),
    planCard({ name: 'Premium', price: '₹8,000', unit: 'one-time', line: 'For brands that want a premium look, motion and a site they can update.',
      items: ['Up to 15 pages', 'Everything in Business', 'Premium design with motion', 'Admin panel to edit content', 'Blog or product catalogue', 'Advanced SEO with keyword research', 'Rich results setup (schema)', 'Enquiry form sent to WhatsApp', 'Priority support', 'Training to manage your site'],
      note: 'E-commerce websites are priced on your customisation.', foot: 'Ready in 7 to 10 days' }),
  ], 160),
  spacer(600),
  cap('Included in every website', { after: 120 }),
  cardRow([['Domain', 'Your own name, for 1 year'], ['Hosting', 'Fast, secure, for 1 year'], ['SSL', 'The padlock in the browser'], ['SEO', 'Set up to rank on Google'], ['Mobile', 'Works on every phone'], ['Support', 'Free for 1 year']]
    .map(([a, b]) => ({ fill: SOFT, children: [p(t(a, { size: 18 }), { after: 40 }), p(t(b, { size: 15, color: SOFT_TXT }), { after: 0, line: 240 })] })), 100, { pad: 140, padX: 140 }),
]);

// ---------- 4. compare ----------
const Y = '✓', N = '—';
const cmpRows = [
  ['grp', 'Website'], ['Pages', 'Up to 5', 'Up to 10', 'Up to 15'], ['Mobile-friendly design', Y, Y, Y], ['Design study of your company', N, Y, Y],
  ['Motion and premium design', N, N, Y], ['Admin panel to edit content', N, N, Y], ['Delivery', '4 to 6 days', '5 to 8 days', '7 to 10 days'],
  ['grp', 'Domain and hosting'], ['Domain (.com or .in), 1 year', Y, Y, Y], ['Hosting, 1 year', Y, Y, Y], ['SSL security', Y, Y, Y],
  ['grp', 'SEO and growth'], ['Titles, descriptions, sitemap', Y, Y, Y], ['Google Search Console', Y, Y, Y], ['Google Business Profile', N, Y, Y],
  ['Google Analytics', N, Y, Y], ['Keyword research and rich results', N, N, Y], ['grp', 'Support'], ['Free support', '1 year', '1 year', '1 year, priority'],
];
const CW = [3492, 2200, 2200, 2200];
const cmp = table(CW, [
  new TableRow({ tableHeader: true, children: ['', 'Starter · ₹4,000', 'Business · ₹6,000', 'Premium · ₹8,000'].map((h, i) =>
    cell([p(t(h.toUpperCase(), { size: 13, color: MUTED, spacing: 15 }), { after: 0 })], { w: CW[i], pad: 70, padX: 80, borders: { top: NONE, left: NONE, right: NONE, bottom: hair() } })) }),
  ...cmpRows.map((r) => r[0] === 'grp'
    ? new TableRow({ children: [cell([p(t(r[1], { size: 17, bold: true }), { after: 0 })], { w: W, span: 4, pad: 130, padX: 80, borders: { top: NONE, left: NONE, right: NONE, bottom: hair('9A9A9A') } })] })
    : new TableRow({ children: r.map((v, i) => cell([p(t(v, { size: 16, color: i === 0 ? SOFT_TXT : v === N ? 'BBBBBB' : INK }), { after: 0 })], { w: CW[i], pad: 95, padX: 80, borders: { top: NONE, left: NONE, right: NONE, bottom: hair() } })) })),
]);
const compare = section('03 · Compare plans', [
  cap('Compare'), h2('Side by side.'), spacer(120), cmp, spacer(600),
  cardRow([
    ['Domain', 'Your name on the internet', 'Like yourbusiness.com or yourbusiness.in. We register it in your business name, so it always belongs to you.'],
    ['Hosting', 'Where your website lives', 'A fast, secure server that keeps your site open day and night, with SSL and regular backups.'],
    ['SEO', 'So customers find you', 'We set up your pages, titles and Google tools so your business shows up when people search for it.'],
  ].map(([c, h, b]) => ({ children: [cap(c, { after: 80 }), p(t(h, { size: 22 }), { after: 80 }), p(t(b, { size: 16, color: SOFT_TXT }), { after: 0, line: 250 })] })), 160),
]);

// ---------- 5. software ----------
const software = section('04 · Business software', [
  cap('Business software · Zera Core'),
  h2('Run your orders, stock and team', 'from one place.'),
  lead('Start small for a few rupees a day, or own a complete system built around how your company works. Daily plans are paid once a year; Custom and Advanced Growth are one-time.'),
  cardRow([
    planCard({ name: 'Business Orders', tag: 'Low cost', price: '₹15', unit: 'per day · paid yearly', line: 'Take and track customer orders online, without a big upfront cost.',
      items: ['Online order taking and tracking', 'Order alerts on WhatsApp', 'Daily sales view and reports', 'Customer list and order history', 'Bills shared on WhatsApp', 'Works on phone and computer', 'Hosting, updates and support included'] }),
    planCard({ name: 'Ready Software', tag: 'Pre-built', price: '₹25', unit: 'per day · paid yearly', line: 'Our proven software, set up for your business and ready in days.',
      items: ['Orders, billing, stock and customers', 'New server and new hosting', 'Your logo and business details', 'Staff logins and reports', 'Updates and support all year', 'Data backups'] }),
  ], 160, { pad: 170 }),
  spacer(140),
  cardRow([
    planCard({ name: 'Custom Software', tag: 'Customised', price: '₹40,000', unit: 'one-time', line: 'Software shaped around your exact process, with research and development.',
      items: ['Everything in Ready Software', 'We study your workflow first (R&D)', 'Custom screens, fields and reports', 'New server, new hosting, new setup', 'Changes and new features through the year', 'One-time payment'] }),
    planCard({ name: 'Advanced Growth', tag: 'Full control', dark: true, price: '₹60,000', unit: 'one-time', line: 'The complete system, fully in your hands. For companies ready to scale.',
      items: ['Everything in Custom Software', 'Full software control with you', 'Your own dedicated server', 'Admin access to every part of the system', 'Automation and AI where it helps', 'Priority research and development'] }),
  ], 160, { pad: 170 }),
  spacer(140),
  cardRow([
    { fill: SOFT, children: [cap('Every software plan includes', { after: 100 }), p(t('New server  ·  New hosting  ·  Research and development  ·  Data backups  ·  Support', { size: 16 }), { after: 0, line: 280 })] },
    { fill: SOFT, children: [cap('Once your customisation is finished', { after: 100 }),
      tick('Demo login to check everything yourself'), tick('Zoom call where we walk you through it'), tick('Built-in SOP (step-by-step guide) in Tamil and English')] },
  ], 0, { pad: 160 }),
]);

// ---------- 6. automation ----------
const automation = section('05 · Social media automation', [
  cap('Social media automation'),
  h2('Reply, post and follow up,', 'even while you sleep.'),
  lead('We connect your WhatsApp, Instagram and other accounts so routine messages and posts run on their own.'),
  cardRow([
    planCard({ name: 'Single Platform', tag: 'One account', price: '₹4,000', line: 'Automation for one of your own social media accounts, such as WhatsApp or Instagram.',
      items: ['Instant auto-replies to messages', 'Answers to common questions', 'Enquiries collected in one list', 'Welcome and follow-up messages', 'Setup and testing by our team'] }),
    planCard({ name: 'All Platforms', tag: 'Every account', dark: true, price: '₹8,000', line: 'Automation across every social media account your business uses.',
      items: ['Everything in Single Platform, on every account', 'WhatsApp, Instagram, Facebook and more', 'Scheduled posts', 'All enquiries in one place', 'Leads sent to your team on WhatsApp', 'Built on n8n business automation'] }),
  ], 160),
  spacer(700),
  cap('How it works', { after: 120 }),
  cardRow([step('01', 'Connect', 'We link your business accounts securely.'), step('02', 'Set up', 'We write the replies and flows with you.'), step('03', 'Go live', 'We test everything, then it runs on its own.')], 160, { pad: 180 }),
  spacer(700),
  cap('What it changes', { after: 120 }),
  cardRow([['No missed customers', 'Every message gets a reply, day or night.'], ['Time back', 'Your team stops typing the same answers again and again.'], ['More sales', 'Fast replies turn more enquiries into orders.']]
    .map(([a, b]) => ({ fill: SOFT, children: [p(t(a, { size: 18 }), { after: 50 }), p(t(b, { size: 16, color: SOFT_TXT }), { after: 0, line: 250 })] })), 120, { pad: 160 }),
]);

// ---------- 7. quotation ----------
const QW = [500, 5592, 2000, 2000];
const qb = { top: NONE, left: NONE, right: NONE, bottom: hair() };
const qRow = (item, sub, price) => new TableRow({ cantSplit: true, children: [
  cell([p(t('☐', { size: 20, color: '777777' }), { after: 0 })], { w: QW[0], pad: 60, padX: 60, borders: qb }),
  cell([p(t(item, { size: 18 }), { after: 0 }), ...(sub ? [p(t(sub, { size: 14, color: MUTED }), { after: 0 })] : [])], { w: QW[1], pad: 60, padX: 60, borders: qb }),
  cell([p(t(price, { size: 18 }), { after: 0, align: AlignmentType.RIGHT })], { w: QW[2], pad: 60, padX: 60, borders: qb }),
  cell([p(t(''), { after: 0 })], { w: QW[3], pad: 60, padX: 60, borders: qb }),
] });
const qGrp = (text) => new TableRow({ children: [cell([p(t(text.toUpperCase(), { size: 13, color: MUTED, spacing: 15 }), { after: 0 })], { w: W, span: 4, pad: 70, padX: 60, borders: { top: NONE, left: NONE, right: NONE, bottom: NONE } })] });
const quote = table(QW, [
  new TableRow({ tableHeader: true, children: ['', 'Item', 'Price', 'Amount'].map((h, i) => cell([p(t(h.toUpperCase(), { size: 13, color: MUTED, spacing: 15 }), { after: 0, align: i > 1 ? AlignmentType.RIGHT : undefined })], { w: QW[i], pad: 60, padX: 60, borders: { top: NONE, left: NONE, right: NONE, bottom: hair('555555') } })) }),
  qGrp('Websites · domain, hosting and SEO included'),
  qRow('Starter website', 'Up to 5 pages', '₹4,000'), qRow('Business website', 'Up to 10 pages', '₹6,000'), qRow('Premium website', 'Up to 15 pages', '₹8,000'),
  qRow('E-commerce website', 'Online store, built to your needs', 'On customisation'),
  qGrp('Business software'),
  qRow('Business Orders', 'Orders, bills and customers · paid yearly', '₹15 / day'), qRow('Ready Software', 'Pre-built · paid yearly', '₹25 / day'),
  qRow('Custom Software', 'Customised', '₹40,000 one-time'), qRow('Advanced Growth', 'Full software control', '₹60,000 one-time'),
  qGrp('Social media automation'),
  qRow('Single platform', '', '₹4,000'), qRow('All platforms', '', '₹8,000'),
  new TableRow({ children: [
    cell([p(t(''), { after: 0 })], { w: QW[0], pad: 90, padX: 60, borders: { top: hair('555555'), bottom: NONE, left: NONE, right: NONE } }),
    cell([p(t('Total', { size: 21, bold: true }), { after: 0 })], { w: QW[1], pad: 90, padX: 60, borders: { top: hair('555555'), bottom: NONE, left: NONE, right: NONE } }),
    cell([p(t(''), { after: 0 })], { w: QW[2], pad: 90, padX: 60, borders: { top: hair('555555'), bottom: NONE, left: NONE, right: NONE } }),
    cell([p(t(''), { after: 0 })], { w: QW[3], pad: 90, padX: 60, borders: { top: hair('555555'), bottom: hair('999999'), left: NONE, right: NONE } }),
  ] }),
]);
const terms = [
  'All prices are in Indian rupees.',
  'Website prices include domain, hosting and SEO for the first year.',
  'Daily software plans are paid yearly; Custom and Advanced Growth are one-time. All include a demo login, Zoom walkthrough and SOP in Tamil and English.',
  'You share your logo, text and photos; we can help write them.',
  'Delivery time starts once we have your content.',
  'This quotation is valid for 30 days from the date above.',
];
const sign = (label) => [p(t(''), { after: 520 }), p(t(label, { size: 14, color: MUTED }), { after: 0, border: { top: { ...hair('999999'), space: 4 } } })];
const quotation = section('06 · Quotation', [
  cap('Quotation'), h2('Choose what you need.'), spacer(60), quote, spacer(240),
  table([5600, 400, 1946, 200, 1946], [new TableRow({ cantSplit: true, children: [
    cell([cap('Terms', { after: 80 }), ...terms.map((x) => p(t(x, { size: 15, color: SOFT_TXT }), { after: 40, line: 240, numbering: { reference: 'terms', level: 0 } }))], { w: 5600, pad: 0, padX: 0 }),
    cell([p(t(''))], { w: 400, pad: 0, padX: 0 }),
    cell([cap('Accepted by', { after: 0 }), ...sign('Client signature')], { w: 1946, pad: 0, padX: 0 }),
    cell([p(t(''))], { w: 200, pad: 0, padX: 0 }),
    cell([cap(' ', { after: 0 }), ...sign('For Zera Vista')], { w: 1946, pad: 0, padX: 0 }),
  ] })]),
  spacer(260),
  table([6000, 4092], [new TableRow({ cantSplit: true, children: [
    cell([p(new ImageRun({ type: 'png', data: img('brand/horizontal-white.png'), transformation: { width: 140, height: 26 } }), { after: 140 }),
      p(t('We build your dream.', { serif: true, size: 40, color: 'FFFFFF' }), { after: 0 })], { w: 6000, fill: '000000', pad: 300, padX: 300, valign: VerticalAlign.BOTTOM }),
    cell([p(t('+91 93603 25702', { size: 26, color: 'FFFFFF' }), { after: 40, align: AlignmentType.RIGHT }),
      p(t('Call or WhatsApp', { size: 16, color: 'C8C8C8' }), { after: 0, align: AlignmentType.RIGHT }),
      p(t('Quotation in 24 hours', { size: 16, color: 'C8C8C8' }), { after: 0, align: AlignmentType.RIGHT })], { w: 4092, fill: '000000', pad: 300, padX: 300, valign: VerticalAlign.BOTTOM }),
  ] })]),
]);

const doc = new Document({
  creator: 'Zera Vista', title: 'Zera Vista · Plans and Quotation',
  styles: { default: { document: { run: { font: SANS, size: 19, color: INK } } } },
  numbering: { config: [
    { reference: 'ticks', levels: [{ level: 0, format: LevelFormat.BULLET, text: '✓', alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 300, hanging: 260 } }, run: { font: SANS, size: 15, color: '8A8A8A' } } }] },
    { reference: 'terms', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 300, hanging: 300 } }, run: { font: SANS, size: 15, color: SOFT_TXT } } }] },
  ] },
  sections: [cover, about, plans, compare, software, automation, quotation],
});
Packer.toBuffer(doc).then((b) => { fs.writeFileSync(OUT, b); console.log('wrote', OUT); });
