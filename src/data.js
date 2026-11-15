// ============ YOUR DETAILS ============
// Anything left empty is simply not shown on the site.
export const CONTACT = {
  phone: '+91 93603 25702',   // shown on the page
  whatsapp: '919360325702',   // digits with country code
  email: '',                  // e.g. 'hello@yourdomain.com'
  address: '',                // e.g. 'Street, City, State, PIN'
  socials: {                  // full links, e.g. 'https://instagram.com/yourpage'
    Instagram: '',
    LinkedIn: '',
    Facebook: '',
    YouTube: '',
  },
}
// ======================================

export const BRAND = { name: 'Zera', accent: 'Studio', tagline: 'We build your dream', founder: 'Riju Rajan' }

export const NAV = [
  ['Work', '#work'],
  ['Specialities', '#specialities'],
  ['Business flow', '#flow'],
  ['Services', '#services'],
  ['FAQ', '#faq'],
  ['Contact', '#contact'],
]

// Rotating badge above the hero headline.
export const BADGES = ['Quotation in 24 hours', 'Websites in 4 to 10 days', 'One year of free support']

export const CLIENTS = ['Loyola College', 'Larsen & Toubro', 'Jula International', 'Kripkart']

// Works. `live` projects are real client sites and link out; the rest are concept designs.
// Images live in public/work/<name>.jpg.
export const WORKS = [
  { id: 'kripkart', name: 'Kripkart', label: 'E-commerce', live: true, url: 'https://www.kripkart.com/', tint: '#d6f1dd', dot: '#1b6b33',
    line: 'Online store for home gadgets and everyday essentials, from kitchen to car and garden.',
    images: ['kripkart-1', 'kripkart-2', 'kripkart-3'], mobile: 'kripkart-m', fact: ['8', 'Product categories online'] },
  { id: 'jula', name: 'Jula International', label: 'Website', live: true, url: 'https://www.julainternational.com/', tint: '#f0e2cf', dot: '#8a4b1f',
    line: 'Company website for a coir manufacturer and exporter, with a product catalogue and quotation requests.',
    images: ['jula-1', 'jula-2', 'jula-3', 'jula-4'], mobile: 'jula-m', fact: ['5', 'Coir materials catalogued'] },
  { id: 'zerafinance', name: 'Zera Gold Finance', label: 'Website', live: true, url: 'https://www.zerafinance.in/', tint: '#e2daf8', dot: '#3b1a8f',
    line: 'Gold loan website with scheme comparison, a loan calculator and call-back requests.',
    images: ['zerafinance-1', 'zerafinance-2', 'zerafinance-3', 'zerafinance-4'], mobile: 'zerafinance-m', fact: ['4', 'Loan schemes with a live calculator'] },
  { id: 'oakloom', name: 'Oak & Loom', label: '3D website', tint: '#e6ecd9', dot: '#566440',
    line: 'Furniture store where shoppers rotate the product in 3D and switch fabrics.', images: ['oakloom'] },
  { id: 'apex', name: 'Apex Retail', label: 'Dashboard', tint: '#dbe6fb', dot: '#2563eb',
    line: 'Owner dashboard for a three-store retailer: revenue, stock and GST filing on one screen.', images: ['apex'] },
  { id: 'auralis', name: 'Auralis H1', label: '3D website', tint: '#dfe3ee', dot: '#1b1e26',
    line: 'Product launch page built around a 3D model with labelled features.', images: ['auralis'] },
  { id: 'drift', name: 'Drift Motors', label: 'Automation', tint: '#ffe2d6', dot: '#ff6a3d',
    line: 'WhatsApp lead workflow that sorts each enquiry, assigns a salesperson and follows up.', images: ['drift'] },
  { id: 'pulse', name: 'Pulse Inbox', label: 'Social automation', tint: '#e5dffb', dot: '#5b3df0',
    line: 'WhatsApp, Instagram and YouTube messages in one team inbox with automatic replies.', images: ['pulse'] },
  { id: 'ledgerly', name: 'Ledgerly', label: 'ERP', tint: '#daeee2', dot: '#0c2a1c',
    line: 'GST invoicing with e-invoice, e-way bill and payment tracking.', images: ['ledgerly'] },
  { id: 'mitti', name: 'Mitti & Co.', label: 'E-commerce', tint: '#efe1cf', dot: '#b4532f',
    line: 'Ceramics store with a 3D-rendered product catalogue.', images: ['mitti'] },
]

export const STATS = [
  ['24 hrs', 'Quotation on WhatsApp'],
  ['4–10 days', 'Website delivery'],
  ['1 year', 'Free support included'],
  ['3', 'Websites live right now'],
]

// Our specialities: [title, text, illustration key]
export const SPECIALS = [
  ['We Study\nYour Company', 'Before any design, we learn how your business works and build around it.', 'study'],
  ['What You\nImagine, Live', 'Describe what you want. We design it, build it and put it online.', 'imagine'],
  ['Quotation\nIn 24 Hours', 'Send your requirement and get a clear quotation on WhatsApp within a day.', 'quote'],
  ['Websites\nIn 4–10 Days', 'From order to final output, most websites are ready in four to ten days.', 'days'],
  ['One Year Of\nFree Support', 'Every project comes with a year of support after it goes live.', 'support'],
]

// Our business flow: [tab, title, text, chips, illustration key]
export const FLOW = [
  ['Order', 'Order', 'Tell us what you need by call or WhatsApp. We note your business, your goals and your must-haves.', ['Call', 'WhatsApp'], 'order'],
  ['Quotation', 'Quotation in 24 hours', 'Within 24 hours you get a clear quotation on WhatsApp, with scope and timeline.', ['WhatsApp', 'Within 24 hours'], 'quote'],
  ['Website creation', 'Website creation', 'We design and build over four to ten days, and share progress as we go.', ['Design', 'Development', '4 to 10 days'], 'build'],
  ['Final output', 'Final output', 'Your site goes live, and one year of free support begins the same day.', ['Go live', '1 year support'], 'live'],
]

// Services: [title, short line, description, colour, images]
export const SERVICES = [
  ['UI/UX Design\nFor Digital Products', 'Screens people understand at first glance', 'Research, user flows, wireframes and polished interface design for websites, apps and dashboards.', '#f2540b', ['apex', 'pulse', 'ledgerly', 'drift']],
  ['Web Design &\nDevelopment', 'Websites that load fast and sell', 'Company sites, 3D product pages, online stores and marketplaces, designed and built by one team.', '#3d5a80', ['jula-1', 'kripkart-1', 'zerafinance-1', 'oakloom']],
  ['Mobile App Design &\nDevelopment', 'Built for the phone first', 'App design and development for iPhone and Android, and mobile-first websites that feel like apps.', '#0f6f9c', ['kripkart-m', 'jula-m', 'zerafinance-m']],
  ['SaaS & Custom\nSoftware', 'Software shaped around your workflow', 'Dashboards, portals and internal tools built for the way your team already works.', '#a13ab3', ['apex', 'drift', 'pulse', 'ledgerly']],
  ['Business\nAutomation', 'Repetitive work, handled automatically', 'n8n workflows for lead routing, order updates, staff tasks and daily reports.', '#17182b', ['drift', 'pulse']],
  ['Social Media\nAutomation', 'Every message answered', 'WhatsApp Business and Instagram replies, follow-ups and one shared inbox for your team.', '#5b34d6', ['pulse', 'drift']],
  ['ERP Software,\nZera Core', 'Books, stock and tax in order', 'GST invoicing, e-way bills, inventory across stores, payroll and an owner dashboard.', '#0f7a52', ['apex', 'ledgerly']],
  ['AI Integration\nFor Your Product', 'AI where it saves real time', 'Automatic replies, enquiry sorting and summaries built into your product or workflow.', '#c2255c', ['drift', 'pulse', 'apex']],
  ['Brand Identity\nDesign', 'A brand people recognise', 'Logo, colour, type and guidelines that carry across your website, app and documents.', '#1a1a1a', ['brand-2', 'brand-3', 'brand-4']],
]

export const GALLERY = [
  ['kripkart', 'kripkart-1'], ['apex', 'apex'], ['jula', 'jula-2'],
  ['auralis', 'auralis'], ['zerafinance', 'zerafinance-1'], ['drift', 'drift'],
  ['oakloom', 'oakloom'], ['kripkart', 'kripkart-2'], ['pulse', 'pulse'],
  ['jula', 'jula-4'], ['ledgerly', 'ledgerly'], ['zerafinance', 'zerafinance-3'],
]

export const SUPPORT = [
  ['Fault fixes', 'If something we built stops working, we fix it.', 'wrench'],
  ['Kept running', 'We keep your site or system running as delivered.', 'pulse'],
  ['Help when you need it', 'Questions about using what we built are answered.', 'chat'],
  ['One number to reach us', 'Call or WhatsApp the same number you ordered on.', 'phone'],
]

export const FAQ = [
  ['What does Zera Studio build?', 'Websites, online stores, 3D product pages, mobile apps, custom software, business automation, social media automation and ERP. One team handles both design and development.'],
  ['How fast will I get a quotation?', 'Within 24 hours of your enquiry, sent to you on WhatsApp.'],
  ['How long does a website take?', 'Most websites take 4 to 10 days from the time work starts. Larger software and automation projects are scheduled in the quotation.'],
  ['What support is included?', 'Every project includes one year of free support from the day it goes live. It covers fixing faults in what we built and help with using it.'],
  ['Do you study our business first?', 'Yes. We start by understanding how your company works, then design the solution around it.'],
  ['Can you automate WhatsApp and Instagram?', 'Yes. We set up automatic replies, lead routing and follow-ups for WhatsApp Business and Instagram, and bring every conversation into one inbox.'],
  ['Do you build ERP and billing software?', 'Yes. Zera Core covers GST invoicing, e-way bills, inventory, payroll and an owner dashboard.'],
  ['How do we start?', 'Call or WhatsApp us and tell us what you need. You will have a quotation within 24 hours.'],
]

export const TOOLS = ['WhatsApp Business', 'Instagram', 'YouTube', 'n8n workflows', 'Google Sheets', 'GST and e-way bills', 'UPI payments', 'Email', 'Daily reports']
