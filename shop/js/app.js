const CATEGORIES = [
  { id: 'solar', name: 'Solar & Green Energy', icon: '☀️' },
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'mobile', name: 'Mobile & Gadgets', icon: '📲' },
  { id: 'computing', name: 'Laptops & PCs', icon: '💻' },
  { id: 'audio', name: 'Audio & Headphones', icon: '🎧' },
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
  { id: 'smart', name: 'Smart Home', icon: '🏠' },
  { id: 'accessories', name: 'Accessories', icon: '🔌' },
];

const PRODUCTS = [
  { id: 1, name: 'Jinko Tiger Neo 625W Bifacial Solar Panel (Pre-Order)', category: 'solar', price: 15499, oldPrice: 16500, badge: 'hot', emoji: '☀️' },
  { id: 2, name: 'GearUP 12V 100Ah LiFePO4 Lithium Battery with Bluetooth BMS', category: 'solar', price: 29000, oldPrice: 35000, badge: 'hot', emoji: '🔋' },
  { id: 3, name: 'EcoFlow E980 Portable Power Station 980Wh', category: 'solar', price: 49900, oldPrice: 55900, badge: 'hot', emoji: '⚡' },
  { id: 4, name: 'GearUP 800W Pure Sine Wave Inverter for 12V Battery', category: 'solar', price: 14000, oldPrice: 15900, badge: 'hot', emoji: '🔌' },
  { id: 5, name: 'EcoFlow DELTA Pro 3600W Portable Solar Power Station', category: 'solar', price: 169000, oldPrice: 224900, badge: 'hot', emoji: '⚡' },
  { id: 6, name: 'Hex Flange Self Drilling Screw for Solar (2 Pcs)', category: 'solar', price: 50, oldPrice: 99, badge: 'sale', emoji: '🔩' },
  { id: 7, name: 'Aluminum End Clamp for Solar Mounting (2 Pcs)', category: 'solar', price: 600, oldPrice: 890, badge: 'sale', emoji: '📐' },
  { id: 8, name: 'TOMZN 2 Pole AC SPD Surge Protective Device 275V', category: 'solar', price: 1100, oldPrice: 1500, badge: 'sale', emoji: '⚡' },
  { id: 9, name: 'TOMZN WiFi Automatic Transfer Switch 125A', category: 'solar', price: 5500, oldPrice: 7000, badge: 'new', emoji: '🔄' },
  { id: 10, name: 'GearUP 2KW Hybrid Inverter + 100Ah Battery Combo', category: 'solar', price: 55000, oldPrice: 60000, badge: 'new', emoji: '📦' },
  { id: 11, name: 'Samsung Galaxy A55 5G (8GB/256GB)', category: 'mobile', price: 42999, oldPrice: 45999, badge: 'hot', emoji: '📱' },
  { id: 12, name: 'Xiaomi Redmi Note 13 Pro', category: 'mobile', price: 32999, oldPrice: 35999, badge: 'sale', emoji: '📱' },
  { id: 13, name: 'Apple AirPods Pro (2nd Gen)', category: 'audio', price: 24999, oldPrice: 27999, badge: 'hot', emoji: '🎧' },
  { id: 14, name: 'Sony WH-1000XM5 Wireless Headphones', category: 'audio', price: 34999, oldPrice: 38999, badge: 'sale', emoji: '🎧' },
  { id: 15, name: 'ASUS TUF Gaming F15 RTX 4050 Laptop', category: 'computing', price: 124999, oldPrice: 134999, badge: 'hot', emoji: '💻' },
  { id: 16, name: 'Lenovo IdeaPad Slim 3 Core i5', category: 'computing', price: 54999, oldPrice: 59999, badge: 'new', emoji: '💻' },
  { id: 17, name: 'Logitech G502 Hero Gaming Mouse', category: 'gaming', price: 4999, oldPrice: 5999, badge: 'sale', emoji: '🖱️' },
  { id: 18, name: 'Redragon K617 Fizz Gaming Keyboard', category: 'gaming', price: 2999, oldPrice: 3499, badge: 'hot', emoji: '⌨️' },
  { id: 19, name: 'Xiaomi Smart Air Purifier 4', category: 'smart', price: 18999, oldPrice: 21999, badge: 'new', emoji: '🌬️' },
  { id: 20, name: 'TP-Link Tapo Smart WiFi Plug (2-Pack)', category: 'smart', price: 2499, oldPrice: 2999, badge: 'sale', emoji: '🔌' },
  { id: 21, name: 'Anker 65W GaN USB-C Charger', category: 'accessories', price: 3499, oldPrice: 3999, badge: 'hot', emoji: '🔋' },
  { id: 22, name: 'Baseus 20000mAh Power Bank 65W', category: 'accessories', price: 3999, oldPrice: 4499, badge: 'sale', emoji: '🔋' },
  { id: 23, name: 'Canon EOS R50 Mirrorless Camera Kit', category: 'electronics', price: 89999, oldPrice: 94999, badge: 'new', emoji: '📷' },
  { id: 24, name: 'JBL Flip 6 Portable Bluetooth Speaker', category: 'audio', price: 11999, oldPrice: 13999, badge: 'hot', emoji: '🔊' },
];

function formatBDT(amount) {
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
  return [...PRODUCTS]
    .sort((a, b) => discountPercent(b.price, b.oldPrice) - discountPercent(a.price, a.oldPrice))
    .slice(0, 6);
}

function getNewArrivals() {
  return PRODUCTS.filter(p => p.badge === 'new').slice(0, 6);
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
  showToast(`Added: ${product.name.slice(0, 40)}…`);
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
    ? `<span class="badge badge-${p.badge}">${p.badge === 'hot' ? 'HOT' : p.badge === 'new' ? 'NEW' : `-${pct}%`}</span>`
    : (pct ? `<span class="badge badge-sale">-${pct}%</span>` : '');
  return `
    <article class="product-card" data-id="${p.id}">
      <a href="product.html?id=${p.id}" class="product-img">
        <div class="product-badges">${badgeHtml}</div>
        <span>${p.emoji}</span>
      </a>
      <div class="product-body">
        <a href="product.html?id=${p.id}" class="product-name">${p.name}</a>
        <div class="product-prices">
          <span class="price-sale">${formatBDT(p.price)}</span>
          ${p.oldPrice ? `<span class="price-old">${formatBDT(p.oldPrice)}</span>` : ''}
          ${pct ? `<span class="discount-pct">-${pct}%</span>` : ''}
        </div>
        <button type="button" class="btn-add" data-add="${p.id}">Add to Cart</button>
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
  const map = { solar: 'solar', electronics: 'electronics', mobile: 'mobile', computing: 'computing', gaming: 'gaming', audio: 'audio', smart: 'smart', products: 'all' };
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
      const cat = map[id] || 'solar';
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
  const delivery = subtotal >= 5000 ? 0 : 120;
  document.getElementById('cartSubtotal').textContent = formatBDT(subtotal);
  document.getElementById('cartDelivery').textContent = delivery ? formatBDT(delivery) : 'FREE';
  document.getElementById('cartTotal').textContent = formatBDT(subtotal + delivery);

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
        Cash on delivery, bKash, Nagad, and card payments accepted. Free delivery on orders over ৳5,000.
        Delivery in 2–5 business days across Bangladesh.
      </p>
    </div>`;
  document.getElementById('pdAddCart')?.addEventListener('click', () => addToCart(p.id));
}

document.addEventListener('DOMContentLoaded', () => {
  if (!bootCheck()) return;

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
