// ============ EDIT THESE BEFORE SHARING ============
export const CONTACT = {
  phone: '+91 93603 25702',   // shown on the page
  whatsapp: '919360325702',   // digits with country code
}
// ===================================================

export const NAV = [
  ['Work', '#work'],
  ['Solutions', '#solutions'],
  ['About', '#about'],
  ['Specialities', '#special'],
]

export const FILTERS = [
  ['all', 'All'],
  ['web', 'Website'],
  ['3d', '3D'],
  ['shop', 'E-commerce'],
  ['web3', 'Web3'],
  ['auto', 'Automation'],
  ['erp', 'ERP'],
]

// Concept projects. To add a real one: put its screenshot in public/work/ and add an entry here.
export const WORKS = [
  { id: 'urbankicks', name: 'UrbanKicks', cat: 'shop', label: 'E-commerce', tint: '#c8f73a', ink: '#0c0c0d', line: 'Multi-vendor sneaker marketplace with automatic vendor payouts.', stack: ['Next.js', 'Solidity', 'IG Shopping'] },
  { id: 'apex', name: 'Apex Retail', cat: 'erp', label: 'ERP', tint: '#2a6bf2', ink: '#ffffff', line: 'One stock count for every store, with GST returns prepared monthly.', stack: ['Python', 'PostgreSQL', 'GSTN API'] },
  { id: 'lumen', name: 'Lumen', cat: '3d', label: '3D website', tint: '#0b1a4f', ink: '#ffffff', line: 'A product studio site where visitors rotate every object in 3D.', stack: ['Three.js', 'WebGL', 'React'] },
  { id: 'drift', name: 'Drift Motors', cat: 'auto', label: 'Automation', tint: '#1faa59', ink: '#ffffff', line: 'WhatsApp bot that books test drives and assigns each lead.', stack: ['n8n', 'WhatsApp API', 'Sheets'] },
  { id: 'mintgate', name: 'Mintgate', cat: 'web3', label: 'Web3', tint: '#8a5cff', ink: '#ffffff', line: 'A holder-only store unlocked by a wallet pass.', stack: ['Solidity', 'Wallets', 'Next.js'] },
  { id: 'nest', name: 'Nest & Key', cat: 'web', label: 'Website', tint: '#c8552b', ink: '#ffffff', line: 'Property search with a live map, filters and enquiries.', stack: ['Next.js', 'Maps', 'Search'] },
  { id: 'ledgerly', name: 'Ledgerly', cat: 'erp', label: 'ERP', tint: '#0d2a1c', ink: '#ffffff', line: 'GST invoicing with e-invoice and e-way bill in one step.', stack: ['FastAPI', 'GSTN API', 'e-Way Bill'] },
  { id: 'brew', name: 'Brew Lane', cat: 'web', label: 'Website', tint: '#2b1a0e', ink: '#f4ead9', line: 'Café site with table booking confirmed on WhatsApp.', stack: ['React', 'Calendar', 'WhatsApp'] },
  { id: 'pulse', name: 'Pulse Inbox', cat: 'auto', label: 'Automation', tint: '#7c5cff', ink: '#ffffff', line: 'WhatsApp, Instagram and YouTube messages in one team inbox.', stack: ['n8n', 'Meta Graph', 'Dashboard'] },
]

export const DIVISIONS = [
  { id: 'web', name: 'Zera Web', line: 'Sites and stores that sell.', points: ['Professional website', '3D website', 'Web3 commerce', 'Marketplace'] },
  { id: 'auto', name: 'Zera Automate', line: 'Workflows that run themselves.', points: ['WhatsApp and Instagram', 'Lead routing', 'Business workflow'] },
  { id: 'erp', name: 'Zera Core', line: 'Books, stock and tax in order.', points: ['GST and e-way bills', 'Live inventory', 'Owner dashboard'] },
]

// Our business flow: [step, timing]
export const FLOW = [
  ['Order', 'You tell us what you need'],
  ['Quotation', 'On WhatsApp within 24 hours'],
  ['Website creation', '4 to 10 days'],
  ['Final output', 'Your site goes live'],
]

// Our specialities: [big figure or '', title, line, icon]
export const SPECIAL = [
  ['1 year', 'Free support', 'Included with every project.', 'support'],
  ['24 hrs', 'Quotation', 'Sent to you on WhatsApp.', 'quote'],
  ['4–10 days', 'Website delivery', 'From order to final output.', 'fast'],
  ['', 'We study your company', 'The solution is built around how your business works.', 'study'],
  ['', 'What you imagine, live', 'Describe it, and we build it and put it online.', 'spark'],
]

// Shown in the moving "Our clients" strip.
export const CLIENTS = ['Loyola College', 'Larsen & Toubro', 'Jula International', 'Kripkart']

// How many projects the home page shows before "See more".
export const HOME_LIMIT = 6
