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
  showToast(product.quoteOnly ? t('addedQuote') : `${t('added')}: ${getProductName(product).slice(0, 36)}…`);
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
    ? `<span class="badge badge-${p.badge}">${p.badge === 'hot' ? t('badgePopular') : p.badge === 'new' ? t('badgeNew') : t('badgeOffer')}</span>`
    : '';
  const priceHtml = p.quoteOnly
    ? `<span class="price-sale" style="font-size:14px">${t('freeQuote')}</span>`
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
        <a href="product.html?id=${p.id}" class="product-name">${getProductName(p)}</a>
        <div class="product-prices">${priceHtml}</div>
        <button type="button" class="btn-add" data-add="${p.id}">${p.quoteOnly ? t('addQuoteList') : t('addCart')}</button>
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
      const pid = Number(btn.dataset.add);
      const prod = getProduct(pid);
      addToCart(pid);
      btn.textContent = t('added');
      btn.classList.add('added');
      setTimeout(() => {
        btn.textContent = prod?.quoteOnly ? t('addQuoteList') : t('addCart');
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
  banner.innerHTML = '<strong>⚠️ Page scripts did not load.</strong> In PowerShell run <code>.\\START-HERE.bat</code> in this folder (or double-click it). Install <a href="https://nodejs.org">Node.js</a> if needed, then open <strong>http://localhost:8080</strong>';
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
          <a href="product.html?id=${p.id}" style="font-weight:600;font-size:14px">${getProductName(p)}</a>
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
  document.getElementById('cartSubtotal').textContent = isQuote || !subtotal ? t('customQuote') : formatBDT(subtotal);
  document.getElementById('cartDelivery').textContent = isQuote ? t('onSurvey') : (subtotal >= 5000 ? 'FREE' : formatBDT(120));
  document.getElementById('cartTotal').textContent = isQuote || !subtotal ? t('weCallYou') : formatBDT(subtotal + (subtotal >= 5000 ? 0 : 120));

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
    if (el) el.innerHTML = `<p>${typeof t === 'function' ? (getShopLang() === 'bn' ? 'সেবা পাওয়া যায়নি।' : 'Service not found.') : 'Service not found.'} <a href="index.html">${typeof t === 'function' ? t('backHomeLink') : 'Back to home'}</a></p>`;
    return;
  }
  const pct = discountPercent(p.price, p.oldPrice);
  const l = getShopLang();
  const metaCat = getDivisionLabel(p.category);
  const metaExtra = l === 'bn' ? '· ১০০% প্রকৃত · অফিসিয়াল ওয়ারেন্টি' : '· 100% Genuine · Official Warranty';
  const surveyText = l === 'bn'
    ? 'বিনামূল্যে সাইট সার্ভে ও কোটেশনের জন্য যোগাযোগ করুন।'
    : 'Contact us for a free site survey and quotation.';
  document.title = `${getProductName(p)} — Amptek`;
  el.innerHTML = `
    <div class="pd-gallery"><span>${p.emoji}</span></div>
    <div class="pd-info">
      <h1>${getProductName(p)}</h1>
      <p class="pd-meta">${l === 'bn' ? 'বিভাগ' : 'Category'}: ${metaCat} ${metaExtra}</p>
      <div class="pd-prices product-prices">
        <span class="price-sale">${formatBDT(p.price)}</span>
        ${p.oldPrice ? `<span class="price-old">${formatBDT(p.oldPrice)}</span>` : ''}
        ${pct ? `<span class="discount-pct">Save ${pct}%</span>` : ''}
      </div>
      <button type="button" class="btn-buy" id="pdAddCart">${p.quoteOnly ? t('addQuoteList') : t('addCart')}</button>
      <a href="cart.html" class="view-all">${t('quoteList')} →</a>
      <p style="margin-top:24px;font-size:14px;color:var(--text2);line-height:1.7">
        ${surveyText} ${l === 'bn' ? AMPTEK.hoursBn : AMPTEK.hours}. ${l === 'bn' ? AMPTEK.emergencyBn : AMPTEK.emergency}.
        ${l === 'bn' ? 'কল' : 'Call'} <a href="tel:${AMPTEK.phone}">${AMPTEK.phoneDisplay}</a> ${l === 'bn' ? 'বা ইমেইল' : 'or email'} <a href="mailto:${AMPTEK.email}">${AMPTEK.email}</a>.
      </p>
    </div>`;
  document.getElementById('pdAddCart')?.addEventListener('click', () => addToCart(p.id));
}

function renderHubCards() {
  const grid = document.getElementById('hubGrid');
  if (!grid) return;
  const l = getShopLang();
  const hubs = ['hub-1', 'hub-2', 'hub-3', 'hub-4', 'hub-5'];
  grid.innerHTML = AMPTEK.divisions.map((d, i) => {
    const name = l === 'bn' ? d.nameBn : d.name;
    const desc = l === 'bn' ? d.descBn : d.desc;
    return `<a href="#${d.id}" class="hub-card ${hubs[i]}"><h3>${d.icon} ${name}</h3><p>${desc}</p><span class="hub-cta">${t('explore')}</span></a>`;
  }).join('');
}

function refreshProductGrids() {
  if (document.getElementById('mostSold')) renderProductGrid('#mostSold', getMostSold());
  if (document.getElementById('mostDiscount')) renderProductGrid('#mostDiscount', getMostDiscount());
  if (document.getElementById('newArrivals')) renderProductGrid('#newArrivals', getNewArrivals());
  if (document.getElementById('allProducts')) {
    const active = document.querySelector('.cat-chip.active')?.dataset.category || 'all';
    const filtered = active === 'all' ? PRODUCTS.slice(0, 12) : getByCategory(active).slice(0, 12);
    renderProductGrid('#allProducts', filtered);
  }
  const params = new URLSearchParams(window.location.search);
  if (params.get('search') && document.getElementById('searchResults')) runSearch(params.get('search'));
}

function injectCompanyInfo() {
  const l = getShopLang();
  document.querySelectorAll('[data-company-name]').forEach(el => { el.textContent = AMPTEK.name; });
  document.querySelectorAll('[data-company-name-display]').forEach(el => { el.textContent = AMPTEK.nameDisplay; });
  document.querySelectorAll('[data-company-slogan]').forEach(el => { el.textContent = l === 'bn' ? AMPTEK.sloganBn : AMPTEK.slogan; });
  document.querySelectorAll('[data-company-tagline]').forEach(el => { el.textContent = l === 'bn' ? AMPTEK.taglineBn : AMPTEK.tagline; });
  document.querySelectorAll('[data-company-intro]').forEach(el => { el.textContent = l === 'bn' ? AMPTEK.introBn : AMPTEK.intro; });
  document.querySelectorAll('[data-company-address]').forEach(el => { el.textContent = l === 'bn' ? AMPTEK.addressBn : AMPTEK.address; });
  document.querySelectorAll('[data-company-website]').forEach(el => {
    el.innerHTML = `<a href="${AMPTEK.website}" target="_blank" rel="noopener">${AMPTEK.websiteDisplay}</a>`;
  });
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
      `<div class="stat-pill"><strong>${s.num}</strong><span>${l === 'bn' ? s.labelBn : s.label}</span></div>`
    ).join('');
  }
  document.querySelectorAll('.cat-chip[data-category]').forEach(chip => {
    const d = AMPTEK.divisions.find(x => x.id === chip.dataset.category);
    if (!d) return;
    const label = l === 'bn' ? d.nameBn : d.name;
    chip.textContent = `${d.icon} ${label}`;
  });
  const allChip = document.querySelector('.cat-chip[data-category="all"]');
  if (allChip) allChip.textContent = t('all');
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof AMPTEK === 'undefined') {
    console.error('company.js must load before shop scripts');
    return;
  }
  if (!bootCheck()) return;

  if (typeof initShopLang === 'function') initShopLang();
  renderHubCards();
  updateCartBadge();
  initFAQ();
  initSearch();
  initCategoryNav();
  applySearchFilter();
  refreshProductGrids();
  if (document.getElementById('cartContent') || document.getElementById('cartEmpty')) renderCartPage();
  if (document.getElementById('productDetail')) renderProductDetail();

  document.querySelectorAll('.cat-chip').forEach(chip => {
    chip.addEventListener('click', () => filterByCategory(chip.dataset.category));
  });
});
