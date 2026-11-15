// Small UI kit for the rendered dashboard screens: line icons, Indian number format, SVG charts.
const P = {
  home: 'M3 11l9-7 9 7M5 9.500V20h5v-6h4v6h5V9.500',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  box: 'M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8',
  cart: 'M3 4h2.500l2.200 11h10.600L20.500 7H7M9.500 19.500h.01M17 19.500h.01',
  receipt: 'M6 3h12v18l-3-2-3 2-3-2-3 2V3zM9 8h6M9 12h6M9 16h3',
  percent: 'M19 5L5 19M7.500 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM16.500 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  users: 'M16 20v-1.500a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20M9.500 10.500a3.500 3.500 0 1 0 0-7 3.500 3.500 0 0 0 0 7zM21 20v-1.500a4 4 0 0 0-3-3.870M15.500 3.630a3.500 3.500 0 0 1 0 6.740',
  wallet: 'M3 7.500A2.500 2.500 0 0 1 5.500 5H18v4M3 7.500V17a2 2 0 0 0 2 2h15V9H5.500A2.500 2.500 0 0 1 3 6.500M16.500 14h.01',
  file: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5zM14 3v5h5M9 13h6M9 17h4',
  settings: 'M12 15.500a3.500 3.500 0 1 0 0-7 3.500 3.500 0 0 0 0 7zM19.400 13.500l1.600 1-2 3.400-1.800-.700a7 7 0 0 1-1.700 1l-.300 1.800h-4l-.300-1.800a7 7 0 0 1-1.700-1l-1.800.700-2-3.400 1.600-1a7 7 0 0 1 0-2l-1.600-1 2-3.400 1.800.700a7 7 0 0 1 1.700-1L10 5h4l.300 1.800a7 7 0 0 1 1.700 1l1.800-.700 2 3.400-1.600 1a7 7 0 0 1 0 2z',
  bell: 'M18 9a6 6 0 1 0-12 0c0 6-2.500 7.500-2.500 7.500h17S18 15 18 9zM10 20a2.200 2.200 0 0 0 4 0',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-3.500-3.500',
  plus: 'M12 5v14M5 12h14',
  cal: 'M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 10h16M8 3v4M16 3v4',
  down: 'M6 9l6 6 6-6',
  up: 'M6 15l6-6 6 6',
  arrowUp: 'M7 17L17 7M9 7h8v8',
  arrowDown: 'M7 7l10 10M17 9v8H9',
  truck: 'M2 6h12v10H2zM14 9h4l4 4v3h-8M6.500 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17.500 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  store: 'M4 9l1.500-5h13L20 9M4 9v11h16V9M4 9a2.700 2.700 0 0 0 5.300 0 2.700 2.700 0 0 0 5.400 0A2.700 2.700 0 0 0 20 9M9 20v-6h6v6',
  check: 'M5 12.500l4.500 4.500L19 7.500',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3.500 2',
  filter: 'M3 5h18l-7 8.500V19l-4 1.500v-7L3 5z',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  download: 'M12 4v11M7 11l5 5 5-5M5 20h14',
  send: 'M21 3L10 14M21 3l-7 18-4-7-7-4 18-7z',
  chat: 'M21 12a8 8 0 0 1-11.800 7L4 20l1.200-4.700A8 8 0 1 1 21 12z',
  phone: 'M6.500 3.500h3l1.500 4-2 1.500a12 12 0 0 0 6 6l1.500-2 4 1.500v3a2 2 0 0 1-2.200 2A16.500 16.500 0 0 1 4.500 5.700a2 2 0 0 1 2-2.200z',
  zap: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z',
  branch: 'M6 4v10M6 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM18 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM18 10c0 5-12 2-12 8',
  sheet: 'M4 4h16v16H4zM4 10h16M4 15h16M10 4v16',
  tag: 'M3 12V4h8l10 10-8 8L3 12zM7.500 8h.01',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  play: 'M7 4l13 8-13 8V4z',
  star: 'M12 3l2.700 5.800 6.300.800-4.600 4.300 1.200 6.200L12 17l-5.600 3.100 1.200-6.200L3 9.600l6.300-.800L12 3z',
  lock: 'M6 11h12v9H6zM8.500 11V7.500a3.500 3.500 0 0 1 7 0V11',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.500 2.700 3.800 5.700 3.800 9s-1.300 6.300-3.800 9c-2.500-2.700-3.800-5.700-3.800-9s1.300-6.300 3.800-9z',
  layers: 'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5',
  qr: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z',
  heart: 'M12 20s-7-4.400-7-9.500A4 4 0 0 1 12 8a4 4 0 0 1 7 2.500C19 15.600 12 20 12 20z',
  bag: 'M5 8h14l-1 12H6L5 8zM9 8V6a3 3 0 0 1 6 0v2',
  menu: 'M4 7h16M4 12h16M4 17h16',
  x: 'M6 6l12 12M18 6L6 18',
  eye: 'M2 12s3.600-7 10-7 10 7 10 7-3.600 7-10 7-10-7-10-7zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  paperclip: 'M20 11.500l-8.500 8.500a5 5 0 0 1-7-7L13 4.500a3.300 3.300 0 0 1 4.700 4.700L9.500 17.500a1.700 1.700 0 0 1-2.400-2.400L15 7.200',
  smile: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.500 14.500a4.500 4.500 0 0 0 7 0M9 9.500h.01M15 9.500h.01',
  mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5.500 11.500a6.500 6.500 0 0 0 13 0M12 18v3',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z',
  code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
  database: 'M12 8c4.400 0 8-1.300 8-3s-3.600-3-8-3-8 1.300-8 3 3.600 3 8 3zM4 5v14c0 1.700 3.600 3 8 3s8-1.300 8-3V5M4 12c0 1.700 3.600 3 8 3s8-1.300 8-3',
  timer: 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM12 10v4l2.500 1.500M9 2h6',
  shield: 'M12 3l8 3v6c0 5-3.400 8.300-8 9.500C7.400 20.300 4 17 4 12V6l8-3z',
  rupee: 'M7 4h10M7 8.500h10M7 4c5 0 7 1.500 7 4.500S12 13 7 13l7 7',
};
export function icon(name, size = 18, stroke = 1.7) {
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"><path d="${P[name] || ''}"/></svg>`;
}
// Replace every <i data-ic="name" [data-s="size"]> with its icon.
export function hydrateIcons(root = document) {
  root.querySelectorAll('[data-ic]').forEach((el) => { el.innerHTML = icon(el.dataset.ic, +(el.dataset.s || 18), +(el.dataset.w || 1.7)); el.style.display = 'inline-flex'; });
}
export function inr(n, decimals = 0) {
  const neg = n < 0; n = Math.abs(n); const [i, d] = n.toFixed(decimals).split('.');
  let last3 = i.slice(-3), rest = i.slice(0, -3);
  if (rest) last3 = ',' + last3;
  const out = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + last3;
  return (neg ? '-' : '') + '₹' + out + (d ? '.' + d : '');
}
// Smooth path through points (monotone-ish cubic).
export function smooth(points) {
  if (points.length < 2) return '';
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i], p1 = points[i], p2 = points[i + 1], p3 = points[i + 2] || p2, t = 0.18;
    const c1 = [p1[0] + (p2[0] - p0[0]) * t, p1[1] + (p2[1] - p0[1]) * t], c2 = [p2[0] - (p3[0] - p1[0]) * t, p2[1] - (p3[1] - p1[1]) * t];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}
export function spark(values, w = 96, h = 30, color = '#2f66d2', fill = true) {
  const min = Math.min(...values), max = Math.max(...values), pad = 3;
  const pts = values.map((v, i) => [pad + (i / (values.length - 1)) * (w - pad * 2), h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2)]);
  const line = smooth(pts);
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${fill ? `<path d="${line} L${w - pad} ${h} L${pad} ${h} Z" fill="${color}" opacity=".12"/>` : ''}<path d="${line}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/></svg>`;
}
// Line/area chart with grid, axis labels and an optional highlighted point.
export function lineChart({ w, h, series, labels, yTicks, yFmt = (v) => v, max, mark, pad = { l: 46, r: 14, t: 12, b: 28 }, grid = '#eceef2', text = '#8a90a0' }) {
  const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b; const n = labels.length;
  const X = (i) => pad.l + (i / (n - 1)) * iw, Y = (v) => pad.t + ih - (v / max) * ih;
  let s = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block">`;
  for (const t of yTicks) s += `<line x1="${pad.l}" x2="${w - pad.r}" y1="${Y(t)}" y2="${Y(t)}" stroke="${grid}"/><text x="${pad.l - 10}" y="${Y(t) + 4}" text-anchor="end" font-size="11" fill="${text}">${yFmt(t)}</text>`;
  labels.forEach((l, i) => { if (l) s += `<text x="${X(i)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="${text}">${l}</text>`; });
  for (const se of series) {
    const pts = se.data.map((v, i) => [X(i), Y(v)]); const line = smooth(pts);
    if (se.area) s += `<path d="${line} L${X(se.data.length - 1)} ${Y(0)} L${X(0)} ${Y(0)} Z" fill="${se.color}" opacity="${se.area}"/>`;
    s += `<path d="${line}" fill="none" stroke="${se.color}" stroke-width="${se.width || 2.4}" ${se.dash ? `stroke-dasharray="${se.dash}"` : ''} stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  if (mark) {
    const x = X(mark.i), y = Y(series[0].data[mark.i]);
    s += `<line x1="${x}" x2="${x}" y1="${pad.t}" y2="${Y(0)}" stroke="${series[0].color}" stroke-dasharray="3 4" opacity=".5"/><circle cx="${x}" cy="${y}" r="6" fill="#fff" stroke="${series[0].color}" stroke-width="3"/>`;
    const bw = mark.w || 132, bx = Math.min(x + 12, w - pad.r - bw), by = Math.max(y - 58, pad.t);
    s += `<g><rect x="${bx}" y="${by}" width="${bw}" height="46" rx="8" fill="#111827"/><text x="${bx + 12}" y="${by + 18}" font-size="11" fill="#9ca3af">${mark.title}</text><text x="${bx + 12}" y="${by + 35}" font-size="13.500" font-weight="600" fill="#fff">${mark.value}</text></g>`;
  }
  return s + '</svg>';
}
export function barChart({ w, h, data, labels, max, color = '#2f66d2', soft = '#dbe6fb', hi = -1, pad = { l: 8, r: 8, t: 8, b: 24 }, text = '#8a90a0', radius = 5, gap = 0.36 }) {
  const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b, n = data.length, bw = (iw / n) * (1 - gap);
  let s = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block">`;
  data.forEach((v, i) => { const x = pad.l + (i + 0.5) * (iw / n) - bw / 2, bh = (v / max) * ih; s += `<rect x="${x}" y="${pad.t + ih - bh}" width="${bw}" height="${bh}" rx="${radius}" fill="${i === hi ? color : soft}"/>`; if (labels) s += `<text x="${x + bw / 2}" y="${h - 7}" text-anchor="middle" font-size="11" fill="${text}">${labels[i]}</text>`; });
  return s + '</svg>';
}
export function donut(parts, size = 150, thickness = 22, center = '') {
  const r = (size - thickness) / 2, c = 2 * Math.PI * r, total = parts.reduce((a, p) => a + p.v, 0); let off = 0;
  let s = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><g transform="rotate(-90 ${size / 2} ${size / 2})">`;
  for (const p of parts) { const len = (p.v / total) * c; s += `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${p.c}" stroke-width="${thickness}" stroke-dasharray="${Math.max(len - 3, 0)} ${c - Math.max(len - 3, 0)}" stroke-dashoffset="${-off}"/>`; off += len; }
  return s + `</g>${center}</svg>`;
}
export const $ = (s, r = document) => r.querySelector(s);
