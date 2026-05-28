const CATEGORIES = AMPTEK.divisions.map(d => ({
  id: d.id,
  name: d.name,
  icon: d.icon,
}));

/** Engineering services & solutions (request quote via cart) */
const PRODUCTS = [
  { id: 1, name: 'HT/LT Switchgear — Design, Supply & Installation', category: 'power', price: 0, oldPrice: null, badge: 'hot', emoji: '⚡', quoteOnly: true },
  { id: 2, name: 'Bus Bar Trunking (BBT) Systems up to 5000A', category: 'power', price: 0, oldPrice: null, badge: 'hot', emoji: '🔌', quoteOnly: true },
  { id: 3, name: 'Power Transformers — Supply & Commissioning', category: 'power', price: 0, oldPrice: null, badge: 'new', emoji: '🔋', quoteOnly: true },
  { id: 4, name: 'NFPA Fire Detection & Alarm Systems', category: 'fire', price: 0, oldPrice: null, badge: 'hot', emoji: '🔥', quoteOnly: true },
  { id: 5, name: 'Fire Hydrant & Hose Reel Systems', category: 'fire', price: 0, oldPrice: null, badge: 'hot', emoji: '💧', quoteOnly: true },
  { id: 6, name: 'FM-200 Clean Agent Suppression', category: 'fire', price: 0, oldPrice: null, badge: 'new', emoji: '🧯', quoteOnly: true },
  { id: 7, name: 'Boiler Solutions & Steam Systems', category: 'mechanical', price: 0, oldPrice: null, badge: 'hot', emoji: '⚙️', quoteOnly: true },
  { id: 8, name: 'HVAC Design, Supply & Installation', category: 'mechanical', price: 0, oldPrice: null, badge: 'hot', emoji: '❄️', quoteOnly: true },
  { id: 9, name: 'Tank Fabrication & Piping', category: 'mechanical', price: 0, oldPrice: null, badge: 'new', emoji: '🛢️', quoteOnly: true },
  { id: 10, name: 'PLC Programming & Industrial Automation', category: 'industrial', price: 0, oldPrice: null, badge: 'hot', emoji: '🤖', quoteOnly: true },
  { id: 11, name: 'Machine Maintenance & AMC', category: 'industrial', price: 0, oldPrice: null, badge: 'new', emoji: '🔧', quoteOnly: true },
  { id: 12, name: 'Lightning Protection Systems', category: 'safety', price: 0, oldPrice: null, badge: 'hot', emoji: '⚡', quoteOnly: true },
  { id: 13, name: 'Safety Compliance Auditing', category: 'safety', price: 0, oldPrice: null, badge: 'new', emoji: '📋', quoteOnly: true },
  { id: 14, name: 'Free Site Survey & Engineering Consultation', category: 'power', price: 0, oldPrice: null, badge: 'new', emoji: '📐', quoteOnly: true },
  { id: 15, name: 'Annual Maintenance Contract (AMC)', category: 'industrial', price: 0, oldPrice: null, badge: 'sale', emoji: '📅', quoteOnly: true },
  { id: 16, name: 'Emergency Mobilisation — 24/7 Response', category: 'safety', price: 0, oldPrice: null, badge: 'hot', emoji: '🚨', quoteOnly: true },
];

function formatBDT(amount) {
  if (!amount) return 'Quote on request';
  return '৳' + amount.toLocaleString('en-BD');
}

function discountPercent(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

function getProduct(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}

function getByCategory(catId) {
  return PRODUCTS.filter(p => p.category === catId);
}

function getMostSold() {
  return PRODUCTS.filter(p => p.badge === 'hot').slice(0, 6);
}

function getMostDiscount() {
  return PRODUCTS.filter(p => p.badge === 'new').slice(0, 6);
}

function getNewArrivals() {
  return PRODUCTS.filter(p => p.badge === 'new' || p.badge === 'sale').slice(0, 6);
}
