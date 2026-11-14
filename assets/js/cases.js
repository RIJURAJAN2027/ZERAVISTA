/* ==========================================================
   CASE STUDIES — edit this file to manage the portfolio.

   image: path to a real screenshot / Midjourney render, e.g.
          "assets/img/urbankicks.jpg". Leave null to show the
          built-in vector mockup (`mockup`) instead.

   roi:   PLACEHOLDER FIGURES. Replace with verified, client-
          approved numbers before this site goes public.
   ========================================================== */
window.CASE_STUDIES = [
  {
    id: "urbankicks",
    name: "UrbanKicks Marketplace",
    filter: "web",
    category: "Web3 & eCommerce",
    color: "#22e6ff",
    divisions: "Zera Web + Zera Automate",
    challenge: "Vendor payouts were reconciled by hand every week, and Instagram sales sat in a separate silo from the main store.",
    solution: "A custom multi-vendor marketplace with smart-contract vendor payouts, a 3D product showcase, and Instagram Shopping synced to one catalogue.",
    stack: ["Three.js", "React", "Next.js", "Solidity", "IG Shopping API", "n8n"],
    roi: [
      { v: "0 hrs", k: "manual payout reconciliation" },
      { v: "+38%", k: "IG-attributed revenue" },
      { v: "T+0", k: "vendor settlement" }
    ],
    image: null,
    mockup: "web",
    mediaLabel: "3D homepage + mobile app view"
  },
  {
    id: "apex",
    name: "Apex Retail",
    filter: "erp",
    category: "ERP & Finance",
    color: "#4c7dff",
    divisions: "Zera Core ERP",
    challenge: "Stock counts didn't match across three stores, and GST deadlines were missed during busy months.",
    solution: "Zera Core ERP rolled out with live inventory sync across all locations and an automated monthly GST pipeline from invoice to return.",
    stack: ["Python", "FastAPI", "PostgreSQL", "GSTN API", "React", "e-Way Bill API"],
    roi: [
      { v: "99.6%", k: "inventory accuracy" },
      { v: "0", k: "missed GST filings" },
      { v: "-70%", k: "month-end close time" }
    ],
    image: null,
    mockup: "erp",
    mediaLabel: "Unified GST + inventory dashboard"
  },
  {
    id: "drift",
    name: "Drift Motors",
    filter: "auto",
    category: "Workflow Automation",
    color: "#9d5cff",
    divisions: "Zera Automate",
    challenge: "WhatsApp leads went unanswered after hours, and staff tasks were handed out ad hoc over chat.",
    solution: "An n8n pipeline that qualifies WhatsApp leads, routes them to staff dashboards with SLAs, and sends automated follow-ups until each lead is closed.",
    stack: ["n8n", "WhatsApp Business API", "Node.js", "PostgreSQL", "Google Sheets"],
    roi: [
      { v: "<2 min", k: "first response time" },
      { v: "+2.4x", k: "test drives booked" },
      { v: "100%", k: "leads assigned" }
    ],
    image: null,
    mockup: "auto",
    mediaLabel: "n8n flow + WhatsApp chatbot"
  }
];

/* ---------- Vector mockups (visual proof placeholders) ---------- */
window.CASE_MOCKUPS = {
  web: `
<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="w-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22e6ff"/><stop offset="1" stop-color="#9d5cff"/></linearGradient>
    <radialGradient id="w-r" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#22e6ff" stop-opacity=".45"/><stop offset="1" stop-color="#22e6ff" stop-opacity="0"/></radialGradient>
  </defs>
  <!-- browser -->
  <g transform="translate(60 60)">
    <rect width="560" height="360" rx="14" fill="#0b0e1c" stroke="#ffffff22"/>
    <rect width="560" height="34" rx="14" fill="#11152a"/><rect y="20" width="560" height="14" fill="#11152a"/>
    <circle cx="20" cy="17" r="5" fill="#ff5f7a"/><circle cx="38" cy="17" r="5" fill="#ffc94d"/><circle cx="56" cy="17" r="5" fill="#3ef0a8"/>
    <rect x="160" y="9" width="240" height="16" rx="8" fill="#ffffff10"/>
    <text x="28" y="66" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="15" fill="#fff">URBAN<tspan fill="#22e6ff">KICKS</tspan></text>
    <g font-family="Inter, sans-serif" font-size="10" fill="#9aa3bd"><text x="330" y="66">Drops</text><text x="380" y="66">Vendors</text><text x="440" y="66">Web3</text><rect x="482" y="54" width="54" height="18" rx="9" fill="url(#w-g)"/><text x="492" y="66" fill="#050611" font-weight="600">Connect</text></g>
    <text x="28" y="130" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="32" fill="#fff">Step into</text>
    <text x="28" y="166" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="32" fill="url(#w-g)">the next drop.</text>
    <rect x="28" y="188" width="150" height="8" rx="4" fill="#ffffff18"/><rect x="28" y="204" width="120" height="8" rx="4" fill="#ffffff12"/>
    <rect x="28" y="232" width="110" height="32" rx="16" fill="url(#w-g)"/><text x="48" y="252" font-family="Inter, sans-serif" font-weight="600" font-size="11" fill="#050611">Shop the 3D drop</text>
    <!-- 3D sneaker stage -->
    <ellipse cx="400" cy="200" rx="130" ry="130" fill="url(#w-r)"/>
    <ellipse cx="400" cy="270" rx="120" ry="22" fill="none" stroke="#22e6ff" stroke-opacity=".6"/>
    <ellipse cx="400" cy="270" rx="90" ry="15" fill="none" stroke="#9d5cff" stroke-opacity=".5"/>
    <g transform="translate(310 160) rotate(-10)">
      <path d="M10 70 C 20 30, 60 20, 90 30 L 120 38 C 150 46, 175 60, 180 80 L 182 92 L 8 92 Z" fill="#141a33" stroke="url(#w-g)" stroke-width="2.5"/>
      <path d="M6 92 H 184 Q 186 104 176 106 H 14 Q 4 104 6 92Z" fill="#eef1fb"/>
      <path d="M40 48 L 70 70 M 55 40 L 85 64 M 70 35 L 98 58" stroke="#22e6ff" stroke-width="2" stroke-linecap="round"/>
      <path d="M118 44 C 140 60, 150 76, 168 84" stroke="#9d5cff" stroke-width="3" fill="none"/>
    </g>
    <g font-family="JetBrains Mono, monospace" font-size="9" fill="#9aa3bd"><rect x="470" y="110" width="70" height="40" rx="8" fill="#ffffff08" stroke="#ffffff1a"/><text x="478" y="126">0.042 ETH</text><text x="478" y="141" fill="#3ef0a8">● token-gated</text></g>
    <!-- product strip -->
    <g transform="translate(28 296)">
      <rect width="120" height="44" rx="10" fill="#ffffff08" stroke="#ffffff14"/><rect x="132" width="120" height="44" rx="10" fill="#ffffff08" stroke="#ffffff14"/><rect x="264" width="120" height="44" rx="10" fill="#ffffff08" stroke="#ffffff14"/><rect x="396" width="108" height="44" rx="10" fill="#22e6ff12" stroke="#22e6ff55"/>
      <text x="410" y="27" font-family="Inter, sans-serif" font-size="10" fill="#22e6ff">+124 vendors</text>
    </g>
  </g>
  <!-- phone -->
  <g transform="translate(580 120)">
    <rect width="170" height="330" rx="26" fill="#070915" stroke="url(#w-g)" stroke-width="2"/>
    <rect x="62" y="10" width="46" height="8" rx="4" fill="#ffffff20"/>
    <rect x="14" y="34" width="142" height="130" rx="14" fill="#11152a"/>
    <ellipse cx="85" cy="100" rx="50" ry="50" fill="url(#w-r)"/>
    <path d="M40 118 C 48 94, 74 88, 92 92 L 110 96 C 126 100, 134 110, 136 122 L 38 122 Z" fill="#141a33" stroke="#22e6ff" stroke-width="1.5"/>
    <rect x="38" y="122" width="98" height="7" rx="3" fill="#eef1fb"/>
    <text x="16" y="186" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700" fill="#fff">Aero Drift V2</text>
    <text x="16" y="204" font-family="Inter, sans-serif" font-size="10" fill="#9aa3bd">by @kicklab · IG Shop</text>
    <text x="16" y="226" font-family="Space Grotesk, sans-serif" font-size="16" font-weight="700" fill="#22e6ff">₹8,499</text>
    <rect x="14" y="244" width="142" height="34" rx="17" fill="url(#w-g)"/><text x="58" y="265" font-family="Inter, sans-serif" font-weight="600" font-size="11" fill="#050611">Buy now</text>
    <rect x="14" y="288" width="142" height="26" rx="13" fill="none" stroke="#ffffff30"/><text x="44" y="305" font-family="Inter, sans-serif" font-size="10" fill="#c9d0e6">Pay with wallet</text>
  </g>
</svg>`,

  erp: `
<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="e-g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#22e6ff"/><stop offset="1" stop-color="#9d5cff"/></linearGradient>
    <linearGradient id="e-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22e6ff" stop-opacity=".35"/><stop offset="1" stop-color="#22e6ff" stop-opacity="0"/></linearGradient>
  </defs>
  <g transform="translate(40 40)">
    <rect width="720" height="420" rx="16" fill="#0a0d1b" stroke="#ffffff1f"/>
    <!-- sidebar -->
    <rect width="140" height="420" rx="16" fill="#0e1224"/><rect x="124" width="16" height="420" fill="#0e1224"/>
    <text x="20" y="36" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="13" fill="#fff">Zera<tspan fill="#22e6ff">Core</tspan></text>
    <g font-family="Inter, sans-serif" font-size="11" fill="#9aa3bd">
      <rect x="12" y="58" width="116" height="28" rx="8" fill="#22e6ff18"/><text x="24" y="76" fill="#22e6ff">Overview</text>
      <text x="24" y="110">Inventory</text><text x="24" y="138">GST &amp; Tax</text><text x="24" y="166">Invoices</text><text x="24" y="194">Payroll</text><text x="24" y="222">Supply chain</text>
    </g>
    <!-- header -->
    <text x="164" y="38" font-family="Space Grotesk, sans-serif" font-weight="600" font-size="16" fill="#fff">Apex Retail · All stores</text>
    <rect x="590" y="22" width="110" height="24" rx="12" fill="#3ef0a81a" stroke="#3ef0a866"/><text x="604" y="38" font-family="JetBrains Mono, monospace" font-size="10" fill="#3ef0a8">● GSTR-3B filed</text>
    <!-- KPI cards -->
    <g font-family="Inter, sans-serif">
      <g transform="translate(164 62)"><rect width="128" height="70" rx="12" fill="#ffffff07" stroke="#ffffff14"/><text x="14" y="24" font-size="10" fill="#9aa3bd">Cash flow (MTD)</text><text x="14" y="50" font-family="Space Grotesk" font-weight="700" font-size="19" fill="#fff">₹18.4L</text><text x="86" y="50" font-size="10" fill="#3ef0a8">+12%</text></g>
      <g transform="translate(304 62)"><rect width="128" height="70" rx="12" fill="#ffffff07" stroke="#ffffff14"/><text x="14" y="24" font-size="10" fill="#9aa3bd">GST liability</text><text x="14" y="50" font-family="Space Grotesk" font-weight="700" font-size="19" fill="#fff">₹2.31L</text><text x="86" y="50" font-size="10" fill="#22e6ff">Auto</text></g>
      <g transform="translate(444 62)"><rect width="128" height="70" rx="12" fill="#ffffff07" stroke="#ffffff14"/><text x="14" y="24" font-size="10" fill="#9aa3bd">Stock accuracy</text><text x="14" y="50" font-family="Space Grotesk" font-weight="700" font-size="19" fill="#fff">99.6%</text></g>
      <g transform="translate(584 62)"><rect width="116" height="70" rx="12" fill="#ffffff07" stroke="#ffffff14"/><text x="14" y="24" font-size="10" fill="#9aa3bd">e-Way bills</text><text x="14" y="50" font-family="Space Grotesk" font-weight="700" font-size="19" fill="#fff">142</text></g>
    </g>
    <!-- revenue chart -->
    <g transform="translate(164 148)">
      <rect width="340" height="252" rx="12" fill="#ffffff05" stroke="#ffffff14"/>
      <text x="16" y="26" font-family="Inter, sans-serif" font-size="11" fill="#c9d0e6">Revenue vs. GST payable</text>
      <g stroke="#ffffff0d"><line x1="16" y1="80" x2="324" y2="80"/><line x1="16" y1="130" x2="324" y2="130"/><line x1="16" y1="180" x2="324" y2="180"/><line x1="16" y1="228" x2="324" y2="228"/></g>
      <path d="M16 200 L 60 180 L 104 188 L 148 150 L 192 160 L 236 118 L 280 104 L 324 70 L 324 228 L 16 228 Z" fill="url(#e-a)"/>
      <path d="M16 200 L 60 180 L 104 188 L 148 150 L 192 160 L 236 118 L 280 104 L 324 70" fill="none" stroke="#22e6ff" stroke-width="2.5"/>
      <path d="M16 214 L 60 208 L 104 210 L 148 198 L 192 200 L 236 188 L 280 184 L 324 172" fill="none" stroke="#9d5cff" stroke-width="2" stroke-dasharray="5 4"/>
      <circle cx="324" cy="70" r="4" fill="#22e6ff"/>
    </g>
    <!-- inventory by store -->
    <g transform="translate(516 148)" font-family="Inter, sans-serif">
      <rect width="184" height="252" rx="12" fill="#ffffff05" stroke="#ffffff14"/>
      <text x="16" y="26" font-size="11" fill="#c9d0e6">Live inventory · 3 stores</text>
      <g font-size="10" fill="#9aa3bd">
        <text x="16" y="60">Store A · Mumbai</text><rect x="16" y="68" width="152" height="8" rx="4" fill="#ffffff10"/><rect x="16" y="68" width="128" height="8" rx="4" fill="url(#e-g)"/>
        <text x="16" y="100">Store B · Pune</text><rect x="16" y="108" width="152" height="8" rx="4" fill="#ffffff10"/><rect x="16" y="108" width="96" height="8" rx="4" fill="url(#e-g)"/>
        <text x="16" y="140">Store C · Nashik</text><rect x="16" y="148" width="152" height="8" rx="4" fill="#ffffff10"/><rect x="16" y="148" width="140" height="8" rx="4" fill="url(#e-g)"/>
        <text x="16" y="180">Online storefront</text><rect x="16" y="188" width="152" height="8" rx="4" fill="#ffffff10"/><rect x="16" y="188" width="72" height="8" rx="4" fill="url(#e-g)"/>
      </g>
      <rect x="16" y="210" width="152" height="26" rx="8" fill="#22e6ff12" stroke="#22e6ff44"/><text x="28" y="227" font-family="JetBrains Mono, monospace" font-size="9" fill="#22e6ff">⟳ synced 4s ago</text>
    </g>
  </g>
</svg>`,

  auto: `
<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="a-g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#22e6ff"/><stop offset="1" stop-color="#9d5cff"/></linearGradient>
    <pattern id="a-dots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#ffffff14"/></pattern>
  </defs>
  <rect width="800" height="500" fill="url(#a-dots)"/>
  <!-- edges -->
  <g fill="none" stroke="url(#a-g)" stroke-width="2.5" stroke-linecap="round">
    <path d="M150 170 C 190 170, 190 170, 220 170"/>
    <path d="M330 170 C 360 170, 350 110, 390 110"/>
    <path d="M330 170 C 360 170, 350 240, 390 240"/>
    <path d="M500 110 C 520 110, 500 180, 300 330" stroke-dasharray="6 5" opacity=".6"/>
    <path d="M500 240 C 530 240, 520 330, 300 360" stroke-dasharray="6 5" opacity=".6"/>
  </g>
  <g font-family="Inter, sans-serif" font-size="11">
    <!-- trigger -->
    <g transform="translate(40 140)"><rect width="110" height="60" rx="14" fill="#0e1224" stroke="#3ef0a8"/><circle cx="24" cy="30" r="12" fill="#3ef0a822"/><path d="M18 34 l4-10 h6 l-3 7 h5 l-8 11 z" fill="#3ef0a8"/><text x="42" y="27" fill="#fff" font-weight="600">WhatsApp</text><text x="42" y="42" fill="#9aa3bd" font-size="9">Trigger</text></g>
    <!-- AI qualify -->
    <g transform="translate(220 140)"><rect width="110" height="60" rx="14" fill="#0e1224" stroke="#22e6ff"/><circle cx="24" cy="30" r="12" fill="#22e6ff22"/><circle cx="24" cy="30" r="5" fill="none" stroke="#22e6ff" stroke-width="2"/><text x="42" y="27" fill="#fff" font-weight="600">Qualify</text><text x="42" y="42" fill="#9aa3bd" font-size="9">Intent + budget</text></g>
    <!-- route -->
    <g transform="translate(390 80)"><rect width="110" height="60" rx="14" fill="#0e1224" stroke="#9d5cff"/><circle cx="24" cy="30" r="12" fill="#9d5cff22"/><path d="M18 30h12M24 24v12" stroke="#9d5cff" stroke-width="2"/><text x="42" y="27" fill="#fff" font-weight="600">Assign</text><text x="42" y="42" fill="#9aa3bd" font-size="9">Sales dashboard</text></g>
    <g transform="translate(390 210)"><rect width="110" height="60" rx="14" fill="#0e1224" stroke="#4c7dff"/><circle cx="24" cy="30" r="12" fill="#4c7dff22"/><path d="M19 30a5 5 0 1 0 10 0" stroke="#4c7dff" stroke-width="2" fill="none"/><text x="42" y="27" fill="#fff" font-weight="600">Follow-up</text><text x="42" y="42" fill="#9aa3bd" font-size="9">Wait 24h · retry</text></g>
    <text x="40" y="60" font-family="JetBrains Mono, monospace" font-size="11" fill="#9aa3bd">n8n · drift-lead-router</text>
    <rect x="40" y="70" width="86" height="20" rx="10" fill="#3ef0a81a" stroke="#3ef0a866"/><text x="52" y="84" font-family="JetBrains Mono, monospace" font-size="9" fill="#3ef0a8">● active</text>
    <!-- staff dashboard -->
    <g transform="translate(40 300)"><rect width="260" height="160" rx="14" fill="#0b0e1c" stroke="#ffffff1f"/><text x="16" y="26" fill="#c9d0e6">Staff queue · today</text>
      <g font-size="10"><rect x="16" y="40" width="228" height="30" rx="8" fill="#ffffff07"/><text x="28" y="59" fill="#fff">Rahul K. · SUV test drive</text><text x="196" y="59" fill="#3ef0a8">1m</text>
      <rect x="16" y="76" width="228" height="30" rx="8" fill="#ffffff07"/><text x="28" y="95" fill="#fff">Priya S. · EMI enquiry</text><text x="196" y="95" fill="#22e6ff">4m</text>
      <rect x="16" y="112" width="228" height="30" rx="8" fill="#ffffff07"/><text x="28" y="131" fill="#fff">Arjun M. · Service slot</text><text x="190" y="131" fill="#c4a2ff">auto</text></g></g>
  </g>
  <!-- WhatsApp phone -->
  <g transform="translate(560 40)" font-family="Inter, sans-serif" font-size="10">
    <rect width="200" height="420" rx="28" fill="#070915" stroke="url(#a-g)" stroke-width="2"/>
    <rect x="12" y="14" width="176" height="44" rx="14" fill="#11152a"/><circle cx="34" cy="36" r="11" fill="url(#a-g)"/><text x="52" y="33" fill="#fff" font-weight="600">Drift Motors</text><text x="52" y="47" fill="#3ef0a8" font-size="9">online · bot</text>
    <rect x="70" y="76" width="116" height="34" rx="12" fill="#1f6f5a"/><text x="80" y="97" fill="#eafff6">Price of Drift X?</text>
    <rect x="14" y="122" width="150" height="58" rx="12" fill="#161b33"/><text x="24" y="141" fill="#eef1fb">Hi! Drift X starts at</text><text x="24" y="155" fill="#eef1fb">₹11.9L. Want a test</text><text x="24" y="169" fill="#eef1fb">drive this week?</text>
    <rect x="14" y="190" width="80" height="24" rx="12" fill="none" stroke="#22e6ff"/><text x="30" y="206" fill="#22e6ff">Book slot</text>
    <rect x="100" y="190" width="70" height="24" rx="12" fill="none" stroke="#ffffff40"/><text x="114" y="206" fill="#c9d0e6">EMI plan</text>
    <rect x="96" y="226" width="90" height="30" rx="12" fill="#1f6f5a"/><text x="108" y="245" fill="#eafff6">Book slot</text>
    <rect x="14" y="268" width="160" height="58" rx="12" fill="#161b33"/><text x="24" y="287" fill="#eef1fb">Done ✅ Sat 11:00 AM.</text><text x="24" y="301" fill="#eef1fb">Rahul from our team</text><text x="24" y="315" fill="#eef1fb">will call you shortly.</text>
    <rect x="12" y="372" width="176" height="34" rx="17" fill="#11152a"/><text x="28" y="393" fill="#626b86">Type a message</text>
  </g>
</svg>`
};
