const CATEGORIES = AMPTEK.divisions.map(d => ({
  id: d.id,
  name: d.name,
  nameBn: d.nameBn,
  icon: d.icon,
}));

const PRODUCTS = [
  { id: 1, name: 'HT/LT Switchgear — Design, Supply & Installation', nameBn: 'HT/LT সুইচগিয়ার — ডিজাইন, সরবরাহ ও স্থাপন', category: 'power', price: 0, badge: 'hot', emoji: '⚡', quoteOnly: true },
  { id: 2, name: 'Bus Bar Trunking (BBT) Systems up to 5000A', nameBn: 'বাস বার ট্রাংকিং (BBT) সিস্টেম ৫০০০A পর্যন্ত', category: 'power', price: 0, badge: 'hot', emoji: '🔌', quoteOnly: true },
  { id: 3, name: 'Power Transformers — Supply & Commissioning', nameBn: 'পাওয়ার ট্রান্সফরমার — সরবরাহ ও কমিশনিং', category: 'power', price: 0, badge: 'new', emoji: '🔋', quoteOnly: true },
  { id: 4, name: 'NFPA Fire Detection & Alarm Systems', nameBn: 'NFPA ফায়ার ডিটেকশন ও অ্যালার্ম সিস্টেম', category: 'fire', price: 0, badge: 'hot', emoji: '🔥', quoteOnly: true },
  { id: 5, name: 'Fire Hydrant & Hose Reel Systems', nameBn: 'ফায়ার হাইড্রান্ট ও হোজ রিল সিস্টেম', category: 'fire', price: 0, badge: 'hot', emoji: '💧', quoteOnly: true },
  { id: 6, name: 'FM-200 Clean Agent Suppression', nameBn: 'FM-200 ক্লিন এজেন্ট সাপ্রেশন', category: 'fire', price: 0, badge: 'new', emoji: '🧯', quoteOnly: true },
  { id: 7, name: 'Boiler Solutions & Steam Systems', nameBn: 'বয়লার সমাধান ও স্টিম সিস্টেম', category: 'mechanical', price: 0, badge: 'hot', emoji: '⚙️', quoteOnly: true },
  { id: 8, name: 'HVAC Design, Supply & Installation', nameBn: 'এইচভিএসি ডিজাইন, সরবরাহ ও স্থাপন', category: 'mechanical', price: 0, badge: 'hot', emoji: '❄️', quoteOnly: true },
  { id: 9, name: 'Tank Fabrication & Piping', nameBn: 'ট্যাংক ফ্যাব্রিকেশন ও পাইপিং', category: 'mechanical', price: 0, badge: 'new', emoji: '🛢️', quoteOnly: true },
  { id: 10, name: 'PLC Programming & Industrial Automation', nameBn: 'পিএলসি প্রোগ্রামিং ও ইন্ডাস্ট্রিয়াল অটোমেশন', category: 'industrial', price: 0, badge: 'hot', emoji: '🤖', quoteOnly: true },
  { id: 11, name: 'Machine Maintenance & AMC', nameBn: 'মেশিন মেইনটেন্যান্স ও AMC', category: 'industrial', price: 0, badge: 'new', emoji: '🔧', quoteOnly: true },
  { id: 12, name: 'Lightning Protection Systems', nameBn: 'লাইটনিং প্রটেকশন সিস্টেম', category: 'safety', price: 0, badge: 'hot', emoji: '⚡', quoteOnly: true },
  { id: 13, name: 'Safety Compliance Auditing', nameBn: 'সেফটি কমপ্লায়েন্স অডিটিং', category: 'safety', price: 0, badge: 'new', emoji: '📋', quoteOnly: true },
  { id: 14, name: 'Free Site Survey & Engineering Consultation', nameBn: 'বিনামূল্যে সাইট সার্ভে ও ইঞ্জিনিয়ারিং পরামর্শ', category: 'power', price: 0, badge: 'new', emoji: '📐', quoteOnly: true },
  { id: 15, name: 'Annual Maintenance Contract (AMC)', nameBn: 'বার্ষিক মেইনটেন্যান্স কন্ট্রাক্ট (AMC)', category: 'industrial', price: 0, badge: 'sale', emoji: '📅', quoteOnly: true },
  { id: 16, name: 'Emergency Mobilisation — 24/7 Response', nameBn: 'জরুরি মোবিলাইজেশন — ২৪/৭ রেসপন্স', category: 'safety', price: 0, badge: 'hot', emoji: '🚨', quoteOnly: true },
];

function getProductName(p) {
  const l = typeof getShopLang === 'function' ? getShopLang() : 'en';
  return l === 'bn' && p.nameBn ? p.nameBn : p.name;
}

function getDivisionLabel(catId) {
  const d = AMPTEK.divisions.find(x => x.id === catId);
  if (!d) return catId;
  const l = typeof getShopLang === 'function' ? getShopLang() : 'en';
  return l === 'bn' ? d.nameBn : d.name;
}

function formatBDT(amount) {
  if (!amount) return typeof t === 'function' ? t('freeQuote') : 'Quote on request';
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
