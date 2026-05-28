const CART_KEY = 'shopbd_cart';

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

function initSearch() {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  if (!form || !input) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const q = input.value.trim().toLowerCase();
    if (!q) return;
    window.location.href = `index.html?search=${encodeURIComponent(q)}#products`;
  });
}

function applySearchFilter() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('search')?.toLowerCase();
  if (!q) return;
  const input = document.getElementById('searchInput');
  if (input) input.value = params.get('search');
  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.includes(q)
  );
  const grid = document.getElementById('searchResults');
  const section = document.getElementById('searchSection');
  if (grid && section && filtered.length) {
    section.style.display = 'block';
    document.querySelector('#searchSection .section-title').textContent =
      `Search: "${params.get('search')}" (${filtered.length} items)`;
    renderProductGrid(grid, filtered);
  }
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
  document.title = `${p.name} — ShopBD`;
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
  updateCartBadge();
  initFAQ();
  initSearch();
  applySearchFilter();

  if (document.getElementById('mostSold')) renderProductGrid('#mostSold', getMostSold());
  if (document.getElementById('mostDiscount')) renderProductGrid('#mostDiscount', getMostDiscount());
  if (document.getElementById('newArrivals')) renderProductGrid('#newArrivals', getNewArrivals());
  if (document.getElementById('allProducts')) renderProductGrid('#allProducts', PRODUCTS.slice(0, 12));
  if (document.getElementById('cartContent') || document.getElementById('cartEmpty')) renderCartPage();
  if (document.getElementById('productDetail')) renderProductDetail();

  document.querySelectorAll('.cat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cat = chip.dataset.category;
      const filtered = cat === 'all' ? PRODUCTS.slice(0, 12) : getByCategory(cat).slice(0, 12);
      renderProductGrid('#allProducts', filtered);
      document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });
});
