// ============ EDIT THESE BEFORE SHARING ============
// Leave a value empty to hide that contact option.
export const CONTACT = {
  whatsapp: '', // digits with country code, e.g. '919876543210'
  email: '',    // e.g. 'hello@yourdomain.com'
  booking: '',  // e.g. a Calendly link
}
// ===================================================

export const NAV = [
  ['About', '#about'],
  ['Solutions', '#solutions'],
  ['Portfolio', '#portfolio'],
  ['Process', '#process'],
  ['Contact', '#contact'],
]

export const DIVISIONS = [
  {
    id: 'web',
    layer: 'Front-end',
    role: 'What your customers see',
    name: 'Zera Web & Experiences',
    summary: 'Websites and online stores that bring in customers.',
    items: [
      ['Immersive company sites', '3D product and brand sites built with WebGL and Three.js.'],
      ['Web3 and next-gen commerce', 'Holder-only storefronts, wallet checkout and crypto payments.'],
      ['Marketplaces', 'Multi-vendor platforms built to scale, with Instagram Shopping built in.'],
    ],
    stack: ['React', 'Next.js', 'Three.js', 'Solidity'],
  },
  {
    id: 'auto',
    layer: 'Middleware',
    role: 'What runs in between',
    name: 'Zera Automate',
    summary: 'n8n workflows that take repetitive work off your team.',
    items: [
      ['Omnichannel dashboard', 'WhatsApp Business, Instagram and YouTube analytics in one place.'],
      ['Social commerce', 'Automatic DM replies, lead routing and customer onboarding.'],
      ['Internal operations', 'Staff task assignment, HR tracking and a daily KPI report.'],
    ],
    stack: ['n8n', 'WhatsApp Business API', 'Meta Graph API'],
  },
  {
    id: 'erp',
    layer: 'Back-end',
    role: 'What keeps the books',
    name: 'Zera Core ERP',
    summary: 'Compliance, stock and cash in one system.',
    items: [
      ['Financial compliance', 'GST invoices, e-way bills and income tax data, prepared automatically.'],
      ['Resource management', 'Live inventory shared by every store and online channel.'],
      ['Business intelligence', 'Cash flow, payroll and supply chain on one dashboard.'],
    ],
    stack: ['Python', 'PostgreSQL', 'GSTN API'],
  },
]

// Portfolio catalogue. `thumb` picks the layout sketch drawn on the card.
export const CATALOGUE = {
  web: {
    label: 'Websites',
    division: 'Zera Web & Experiences',
    intro: 'Ten kinds of website we design and build. Each sketch shows the typical page layout.',
    items: [
      { thumb: 'cube', name: '3D and immersive sites', text: 'Products and spaces visitors can rotate and explore in the browser.', tags: ['Three.js', 'WebGL'] },
      { thumb: 'corporate', name: 'Company websites', text: 'Who you are, what you do and how to reach you, in a site that loads fast.', tags: ['Next.js', 'CMS'] },
      { thumb: 'shop', name: 'Online stores', text: 'Catalogue, cart and checkout with UPI, cards and cash on delivery.', tags: ['React', 'Payments'] },
      { thumb: 'market', name: 'Multi-vendor marketplaces', text: 'Many sellers, one storefront, with automatic vendor payouts.', tags: ['Next.js', 'PostgreSQL'] },
      { thumb: 'web3', name: 'Web3 and token-gated stores', text: 'Wallet login, holder-only products and crypto payments.', tags: ['Solidity', 'Wallets'] },
      { thumb: 'landing', name: 'Landing and campaign pages', text: 'One page with one goal, built for ads and product launches.', tags: ['React', 'Analytics'] },
      { thumb: 'social', name: 'Instagram shopping sites', text: 'A store that shares its catalogue and stock with Instagram Shopping.', tags: ['IG Shopping API'] },
      { thumb: 'booking', name: 'Booking and appointment sites', text: 'Clinics, salons and service businesses taking bookings and payments online.', tags: ['Calendar', 'WhatsApp'] },
      { thumb: 'listing', name: 'Property and listing sites', text: 'Searchable listings with a map, filters and enquiry forms.', tags: ['Maps', 'Search'] },
      { thumb: 'portal', name: 'Customer portals and web apps', text: 'Logins where customers track orders, invoices and support requests.', tags: ['React', 'APIs'] },
    ],
  },
  auto: {
    label: 'Automation',
    division: 'Zera Automate',
    intro: 'Eight workflows we set up in n8n. Each card shows the steps in order.',
    items: [
      { flow: ['WhatsApp', 'Reply', 'Log lead'], name: 'WhatsApp Business bots', text: 'Answers common questions and takes bookings at any hour.', tags: ['WhatsApp Business API'] },
      { flow: ['Instagram DM', 'Reply', 'Tag'], name: 'Instagram DM automation', text: 'Replies to DMs and comments, and tags buyers for follow-up.', tags: ['Meta Graph API'] },
      { flow: ['New lead', 'Qualify', 'Assign'], name: 'Lead routing', text: 'Sends each enquiry to the right salesperson with a reminder.', tags: ['n8n'] },
      { flow: ['Sign-up', 'Welcome', 'Documents'], name: 'Customer onboarding', text: 'Welcome messages, forms and document collection without manual chasing.', tags: ['n8n', 'Forms'] },
      { flow: ['WhatsApp', 'Instagram', 'One inbox'], name: 'Omnichannel dashboard', text: 'Every conversation in one screen for the whole team.', tags: ['Dashboard'] },
      { flow: ['Task', 'Assign', 'Remind'], name: 'Staff task assignment', text: 'Tasks handed out and tracked automatically, with HR records kept up to date.', tags: ['n8n', 'Sheets'] },
      { flow: ['Sales', 'Stock', '9am report'], name: 'Daily KPI reports', text: 'A morning summary of sales, stock and pending work on WhatsApp or email.', tags: ['Reports'] },
      { flow: ['YouTube', 'Stats', 'Weekly report'], name: 'YouTube analytics', text: 'Channel numbers collected and summarised every week.', tags: ['YouTube API'] },
    ],
  },
  erp: {
    label: 'ERP software',
    division: 'Zera Core ERP',
    intro: 'Ten modules of Zera Core ERP. Take the ones you need now and add more later.',
    items: [
      { rows: [['Invoice', 'IRN issued'], ['Credit note', 'IRN issued']], name: 'GST invoicing and e-invoices', text: 'Tax invoices with HSN codes, CGST, SGST and IGST worked out for you.', tags: ['GSTN API'] },
      { rows: [['Dispatch', 'EWB ready'], ['Return', 'EWB ready']], name: 'e-Way bills', text: 'Generated from the invoice before goods leave the store.', tags: ['e-Way Bill API'] },
      { rows: [['GSTR-1', 'Filed'], ['GSTR-3B', 'Ready']], name: 'GST returns', text: 'Monthly returns prepared from your invoices, ready to review and file.', tags: ['GSTN API'] },
      { rows: [['Sales', 'Summarised'], ['TDS', 'Summarised']], name: 'Income tax data', text: 'Year-end figures organised for your chartered accountant.', tags: ['Reports'] },
      { rows: [['SKU count', 'Live'], ['Low stock', 'Alert']], name: 'Inventory', text: 'Stock levels updated with every sale, purchase and return.', tags: ['PostgreSQL'] },
      { rows: [['Store A', 'Synced'], ['Online', 'Synced']], name: 'Multi-store stock sync', text: 'One stock count shared by every branch and your online store.', tags: ['Sync'] },
      { rows: [['Purchase order', 'Sent'], ['Delivery', 'Due']], name: 'Purchases and suppliers', text: 'Purchase orders, supplier bills and delivery tracking.', tags: ['Supply chain'] },
      { rows: [['Attendance', 'Logged'], ['Payslips', 'Issued']], name: 'Payroll and HR', text: 'Attendance, salaries and payslips in one place.', tags: ['Payroll'] },
      { rows: [['Receivables', 'Tracked'], ['Bank', 'Matched']], name: 'Cash flow and accounts', text: 'What you are owed, what you owe, and what is in the bank.', tags: ['Accounts'] },
      { rows: [['Sales today', 'Live'], ['Tax due', 'Live']], name: 'Owner dashboard', text: 'Sales, stock, payroll and tax due on a single screen.', tags: ['BI'] },
    ],
  },
}

export const FLOW = [
  ['Zera Web', 'Customer pays', 'On your site, marketplace or Instagram.'],
  ['Zera Automate', 'Customer is updated', 'Confirmation and delivery updates on WhatsApp.'],
  ['Zera Core ERP', 'Stock goes down', 'Every store and channel shows the new count.'],
  ['Zera Core ERP', 'GST invoice is raised', 'Invoice number, e-way bill and GSTR-1 entry created.'],
  ['Dashboard', 'You see the totals', 'Sales, stock and tax due in the morning report.'],
]

export const PROCESS = [
  ['Systems audit', 'We map your sales channels, tools and manual tasks, and work out what each manual step costs you.'],
  ['Plan', 'A phased plan across Web, Automate and ERP, with a measurable target for each phase.'],
  ['Build and launch', 'Two-week sprints on a live preview, connected to the tools you already use.'],
  ['Support', 'Monitoring and fixes after launch, and a plan for the next phase when you are ready.'],
]
