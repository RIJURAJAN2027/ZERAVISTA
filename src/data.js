// ============ EDIT THESE BEFORE SHARING ============
// Leave a value empty to hide that contact option.
export const CONTACT = {
  whatsapp: '', // digits with country code, e.g. '919876543210'
  email: '',    // e.g. 'hello@yourdomain.com'
  booking: '',  // e.g. a Calendly link
}
// ===================================================

export const NAV = [
  ['Work', '#work'],
  ['Solutions', '#solutions'],
  ['About', '#about'],
  ['Process', '#process'],
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
  { id: 'web', layer: 'Front-end', name: 'Zera Web', line: 'Sites and stores that sell.', points: ['3D company sites', 'Web3 commerce', 'Marketplaces'] },
  { id: 'auto', layer: 'Middleware', name: 'Zera Automate', line: 'Workflows that run themselves.', points: ['WhatsApp and Instagram', 'Lead routing', 'Daily KPI reports'] },
  { id: 'erp', layer: 'Back-end', name: 'Zera Core ERP', line: 'Books, stock and tax in order.', points: ['GST and e-way bills', 'Live inventory', 'Owner dashboard'] },
]

export const FLOW = ['Order', 'WhatsApp update', 'Stock', 'GST invoice', 'Report']

export const PROCESS = [
  ['Audit', 'We map your tools and manual work.'],
  ['Plan', 'A phased plan with a target for each phase.'],
  ['Build', 'Two-week sprints on a live preview.'],
  ['Support', 'Monitoring, fixes and the next phase.'],
]

export const STACK = ['React', 'Next.js', 'Three.js', 'Solidity', 'n8n', 'WhatsApp Business API', 'Meta Graph API', 'Python', 'FastAPI', 'PostgreSQL', 'GSTN API', 'e-Way Bill API']
