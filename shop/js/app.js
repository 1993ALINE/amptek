/** Amptek Engineering — company info (aligned with website & Facebook page) */
const AMPTEK = {
  name: 'Amptek Engineering',
  shortName: 'Amptek',
  tagline: 'Powering Industry. Protecting Lives.',
  taglineBn: 'শিল্প পরিচালনা। জীবন সুরক্ষা।',
  phone: '01671113616',
  phoneDisplay: '01671-113616',
  email: 'nahidalam85@gmail.com',
  whatsapp: '8801671113616',
  facebook: 'https://www.facebook.com/AmptekEngineering',
  facebookSearch: 'https://www.facebook.com/search/pages?q=Amptek%20Engineering',
  location: 'Bangladesh',
  hours: 'Sat–Thu: 9:00 AM – 6:00 PM',
  emergency: '24/7 Emergency Support',
  intro:
    'Amptek Engineering is a multi-discipline engineering company based in Bangladesh, delivering integrated solutions across Power Systems, Fire Safety, Mechanical Engineering, Industrial Automation and Safety Systems — all under one roof.',
  mission:
    "To be Bangladesh's most trusted engineering partner — delivering safe, efficient and compliant solutions that power industry and protect lives.",
  stats: [
    { num: '15+', label: 'Years Experience' },
    { num: '500+', label: 'Projects Completed' },
    { num: '50+', label: 'Certified Engineers' },
    { num: '5', label: 'Engineering Divisions' },
  ],
  clients: 'RMG factories, pharmaceutical plants, hospitals, data centres & commercial buildings',
  divisions: [
    { id: 'power', name: 'Power Systems', icon: '⚡', desc: 'HT/LT switchgear, BBT, transformers' },
    { id: 'fire', name: 'Fire Safety', icon: '🔥', desc: 'NFPA detection, hydrant, FM-200' },
    { id: 'mechanical', name: 'Mechanical', icon: '⚙️', desc: 'Boiler, HVAC, tank fabrication' },
    { id: 'industrial', name: 'Industrial Automation', icon: '🤖', desc: 'PLC, automation, maintenance' },
    { id: 'safety', name: 'Safety Systems', icon: '🛡️', desc: 'Lightning protection, compliance' },
  ],
};
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
const CART_KEY = 'amptek_cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('[data-cart-count]').forEach(el => {
    el.textContent = count;
    el.style.display = count ? 'flex' : 'none';
  });
}

function addToCart(productId, qty = 1) {
  const product = getProduct(productId);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) existing.qty += qty;
  else cart.push({ id: product.id, qty });
  saveCart(cart);
  showToast(product.quoteOnly ? 'Added to quote list' : `Added: ${product.name.slice(0, 40)}…`);
}

function removeFromCart(productId) {
  saveCart(getCart().filter(i => i.id !== productId));
}

function setQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  if (qty < 1) removeFromCart(productId);
  else {
    item.qty = qty;
    saveCart(cart);
  }
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.style.display = 'block';
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { t.style.display = 'none'; }, 2800);
}

function renderProductCard(p) {
  const pct = discountPercent(p.price, p.oldPrice);
  const badgeHtml = p.badge
    ? `<span class="badge badge-${p.badge}">${p.badge === 'hot' ? 'Popular' : p.badge === 'new' ? 'New' : 'Offer'}</span>`
    : '';
  const priceHtml = p.quoteOnly
    ? '<span class="price-sale" style="font-size:14px">Free quote available</span>'
    : `<span class="price-sale">${formatBDT(p.price)}</span>
       ${p.oldPrice ? `<span class="price-old">${formatBDT(p.oldPrice)}</span>` : ''}
       ${pct ? `<span class="discount-pct">-${pct}%</span>` : ''}`;
  return `
    <article class="product-card" data-id="${p.id}">
      <a href="product.html?id=${p.id}" class="product-img">
        <div class="product-badges">${badgeHtml}</div>
        <span>${p.emoji}</span>
      </a>
      <div class="product-body">
        <a href="product.html?id=${p.id}" class="product-name">${p.name}</a>
        <div class="product-prices">${priceHtml}</div>
        <button type="button" class="btn-add" data-add="${p.id}">${p.quoteOnly ? 'Add to Quote List' : 'Add to Cart'}</button>
      </div>
    </article>`;
}

function renderProductGrid(container, products) {
  const el = typeof container === 'string' ? document.querySelector(container) : container;
  if (!el) return;
  el.innerHTML = products.map(renderProductCard).join('');
  el.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      addToCart(Number(btn.dataset.add));
      btn.textContent = 'Added ✓';
      btn.classList.add('added');
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.classList.remove('added');
      }, 1500);
    });
  });
}

function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const open = btn.classList.contains('open');
      document.querySelectorAll('.faq-q').forEach(b => b.classList.remove('open'));
      document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
      if (!open) {
        btn.classList.add('open');
        btn.nextElementSibling?.classList.add('open');
      }
    });
  });
}

function runSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) return;
  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.includes(q) ||
    (CATEGORIES.find(c => c.id === p.category)?.name || '').toLowerCase().includes(q)
  );
  const grid = document.getElementById('searchResults');
  const section = document.getElementById('searchSection');
  if (!grid || !section) return;
  section.style.display = 'block';
  const title = document.querySelector('#searchSection .section-title');
  if (title) title.textContent = filtered.length
    ? `Search: "${query}" (${filtered.length} items)`
    : `No results for "${query}"`;
  renderProductGrid(grid, filtered.length ? filtered : []);
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
}

function initSearch() {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  if (!form || !input) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    const onIndex = /index\.html$/i.test(location.pathname) || /\/shop\/?$/i.test(location.pathname) || location.pathname.endsWith('/');
    if (onIndex || document.getElementById('searchResults')) {
      runSearch(q);
      if (location.protocol !== 'file:') {
        history.replaceState(null, '', `index.html?search=${encodeURIComponent(q)}#products`);
      }
    } else {
      window.location.href = `index.html?search=${encodeURIComponent(q)}#products`;
    }
  });
}

function applySearchFilter() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('search');
  if (!q) return;
  const input = document.getElementById('searchInput');
  if (input) input.value = q;
  runSearch(q);
}

function filterByCategory(cat) {
  const filtered = cat === 'all' ? PRODUCTS.slice(0, 12) : getByCategory(cat).slice(0, 12);
  renderProductGrid('#allProducts', filtered);
  document.querySelectorAll('.cat-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.category === cat);
  });
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
}

function initCategoryNav() {
  const map = { power: 'power', fire: 'fire', mechanical: 'mechanical', industrial: 'industrial', safety: 'safety', products: 'all' };
  document.querySelectorAll('.main-nav .nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      const cat = map[id];
      if (!cat) return;
      e.preventDefault();
      if (document.getElementById('allProducts')) filterByCategory(cat);
      else window.location.href = `index.html#${id}`;
    });
  });
  document.querySelectorAll('.hub-card[href^="#"]').forEach(card => {
    card.addEventListener('click', e => {
      const id = card.getAttribute('href').slice(1);
      const cat = map[id] || 'power';
      if (!document.getElementById('allProducts')) return;
      e.preventDefault();
      filterByCategory(cat);
    });
  });
}

function bootCheck() {
  if (typeof PRODUCTS !== 'undefined' && PRODUCTS.length) return true;
  const banner = document.createElement('div');
  banner.className = 'setup-warn';
  banner.innerHTML = '<strong>⚠️ Store scripts did not load.</strong> Make sure you are inside the <code>shop</code> folder. Double-click <strong>START-HERE.bat</strong> (install <a href="https://nodejs.org">Node.js</a> if needed), then open <strong>http://localhost:8080</strong>';
  document.body.prepend(banner);
  return false;
}

function renderCartPage() {
  const cart = getCart();
  const empty = document.getElementById('cartEmpty');
  const content = document.getElementById('cartContent');
  if (!empty || !content) return;

  if (!cart.length) {
    empty.style.display = 'block';
    content.style.display = 'none';
    return;
  }
  empty.style.display = 'none';
  content.style.display = 'grid';

  let subtotal = 0;
  const rows = cart.map(item => {
    const p = getProduct(item.id);
    if (!p) return '';
    const line = p.price * item.qty;
    subtotal += line;
    return `
      <div class="cart-row" data-id="${p.id}">
        <div class="cart-thumb">${p.emoji}</div>
        <div>
          <a href="product.html?id=${p.id}" style="font-weight:600;font-size:14px">${p.name}</a>
          <div style="font-size:13px;color:var(--text2);margin-top:4px">${formatBDT(p.price)} each</div>
        </div>
        <div class="qty-control">
          <button type="button" data-qty-minus="${p.id}">−</button>
          <span>${item.qty}</span>
          <button type="button" data-qty-plus="${p.id}">+</button>
        </div>
        <div class="cart-line-total" style="font-weight:700">${formatBDT(line)}</div>
        <button type="button" data-remove="${p.id}" style="border:none;background:none;color:var(--sale);font-size:18px" title="Remove">×</button>
      </div>`;
  }).join('');

  document.getElementById('cartRows').innerHTML = rows;
  const isQuote = cart.every(i => getProduct(i.id)?.quoteOnly);
  document.getElementById('cartSubtotal').textContent = isQuote || !subtotal ? 'Custom quotation' : formatBDT(subtotal);
  document.getElementById('cartDelivery').textContent = isQuote ? 'On survey' : (subtotal >= 5000 ? 'FREE' : formatBDT(120));
  document.getElementById('cartTotal').textContent = isQuote || !subtotal ? 'We will call you' : formatBDT(subtotal + (subtotal >= 5000 ? 0 : 120));

  content.querySelectorAll('[data-qty-minus]').forEach(b =>
    b.addEventListener('click', () => {
      const id = Number(b.dataset.qtyMinus);
      const item = getCart().find(i => i.id === id);
      setQty(id, (item?.qty || 1) - 1);
      renderCartPage();
    })
  );
  content.querySelectorAll('[data-qty-plus]').forEach(b =>
    b.addEventListener('click', () => {
      const id = Number(b.dataset.qtyPlus);
      const item = getCart().find(i => i.id === id);
      setQty(id, (item?.qty || 0) + 1);
      renderCartPage();
    })
  );
  content.querySelectorAll('[data-remove]').forEach(b =>
    b.addEventListener('click', () => {
      removeFromCart(Number(b.dataset.remove));
      renderCartPage();
    })
  );
}

function renderProductDetail() {
  const id = new URLSearchParams(window.location.search).get('id');
  const p = getProduct(id);
  const el = document.getElementById('productDetail');
  if (!el || !p) {
    if (el) el.innerHTML = '<p>Product not found. <a href="index.html">Back to shop</a></p>';
    return;
  }
  const pct = discountPercent(p.price, p.oldPrice);
  document.title = `${p.name} — Amptek`;
  el.innerHTML = `
    <div class="pd-gallery"><span>${p.emoji}</span></div>
    <div class="pd-info">
      <h1>${p.name}</h1>
      <p class="pd-meta">Category: ${CATEGORIES.find(c => c.id === p.category)?.name || p.category} · 100% Genuine · Official Warranty</p>
      <div class="pd-prices product-prices">
        <span class="price-sale">${formatBDT(p.price)}</span>
        ${p.oldPrice ? `<span class="price-old">${formatBDT(p.oldPrice)}</span>` : ''}
        ${pct ? `<span class="discount-pct">Save ${pct}%</span>` : ''}
      </div>
      <button type="button" class="btn-buy" id="pdAddCart">Add to Cart</button>
      <a href="cart.html" class="view-all">View Cart →</a>
      <p style="margin-top:24px;font-size:14px;color:var(--text2);line-height:1.7">
        Contact us for a free site survey and quotation. ${AMPTEK.hours}. ${AMPTEK.emergency}.
        Call <a href="tel:${AMPTEK.phone}">${AMPTEK.phoneDisplay}</a> or email <a href="mailto:${AMPTEK.email}">${AMPTEK.email}</a>.
      </p>
    </div>`;
  document.getElementById('pdAddCart')?.addEventListener('click', () => addToCart(p.id));
}

function injectCompanyInfo() {
  document.querySelectorAll('[data-company-name]').forEach(el => { el.textContent = AMPTEK.name; });
  document.querySelectorAll('[data-company-tagline]').forEach(el => { el.textContent = AMPTEK.tagline; });
  document.querySelectorAll('[data-company-intro]').forEach(el => { el.textContent = AMPTEK.intro; });
  document.querySelectorAll('[data-company-phone]').forEach(el => {
    el.innerHTML = `<a href="tel:${AMPTEK.phone}">${AMPTEK.phoneDisplay}</a>`;
  });
  document.querySelectorAll('[data-company-email]').forEach(el => {
    el.innerHTML = `<a href="mailto:${AMPTEK.email}">${AMPTEK.email}</a>`;
  });
  document.querySelectorAll('[data-facebook-href]').forEach(el => {
    el.href = AMPTEK.facebook;
  });
  const statsEl = document.getElementById('companyStats');
  if (statsEl) {
    statsEl.innerHTML = AMPTEK.stats.map(s =>
      `<div class="stat-pill"><strong>${s.num}</strong><span>${s.label}</span></div>`
    ).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof AMPTEK === 'undefined') {
    console.error('company.js must load before shop scripts');
    return;
  }
  if (!bootCheck()) return;

  injectCompanyInfo();
  updateCartBadge();
  initFAQ();
  initSearch();
  initCategoryNav();
  applySearchFilter();

  if (document.getElementById('mostSold')) renderProductGrid('#mostSold', getMostSold());
  if (document.getElementById('mostDiscount')) renderProductGrid('#mostDiscount', getMostDiscount());
  if (document.getElementById('newArrivals')) renderProductGrid('#newArrivals', getNewArrivals());
  if (document.getElementById('allProducts')) renderProductGrid('#allProducts', PRODUCTS.slice(0, 12));
  if (document.getElementById('cartContent') || document.getElementById('cartEmpty')) renderCartPage();
  if (document.getElementById('productDetail')) renderProductDetail();

  document.querySelectorAll('.cat-chip').forEach(chip => {
    chip.addEventListener('click', () => filterByCategory(chip.dataset.category));
  });
});
