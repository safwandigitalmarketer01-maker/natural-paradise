// Natural Paradise – App Logic
// ============================================================

(function () {
  'use strict';

  // ── STATE ────────────────────────────────────────────────
  const state = {
    cart: [],
    wishlist: [],
    recentlyViewed: [],
    coupon: null,
    searchQuery: '',
    activeCategory: 'all',
    activeFamily: null,
    mixer: { top: null, middle: null, base: null, name: '' },
    selectedShade: null,
    countdownTarget: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000),
  };

  const COUPONS = { 'PARADISE10': 10, 'WELCOME15': 15, 'VIP20': 20 };
  const WHATSAPP_NUMBER = '971500000000'; // Replace with real number

  // ── HELPERS ─────────────────────────────────────────────
  function slugify(text) { return text.toLowerCase().replace(/\s+/g, '-'); }
  function formatPrice(n) { return 'AED ' + Number(n).toFixed(2); }

  function getAllProducts() {
    return [...(PRODUCTS.perfumes || []), ...(PRODUCTS.hairColours || [])];
  }

  function getFilteredProducts() {
    let all = getAllProducts();
    if (state.activeCategory !== 'all') {
      all = all.filter(p => p.category === state.activeCategory || p.tag === state.activeCategory);
    }
    if (state.activeFamily) {
      all = all.filter(p => p.family === state.activeFamily);
    }
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      all = all.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.family && p.family.toLowerCase().includes(q)) ||
        ((p.topNotes || []).join(' ').toLowerCase().includes(q)) ||
        ((p.middleNotes || []).join(' ').toLowerCase().includes(q))
      );
    }
    return all;
  }

  function starsHtml(rating) {
    let h = '';
    for (let i = 1; i <= 5; i++) {
      h += `<span class="star${i > rating ? ' empty' : ''}">★</span>`;
    }
    return h;
  }

  function getBadgeClass(badge) {
    const map = { 'Bestseller': 'badge-bestseller', 'New': 'badge-new', 'Limited': 'badge-limited', 'Exclusive': 'badge-exclusive', 'Popular': 'badge-popular', 'Salon Exclusive': 'badge-salon', 'Essential': 'badge-essential' };
    return map[badge] || 'badge-new';
  }

  function saveState() {
    try {
      localStorage.setItem('np_cart', JSON.stringify(state.cart));
      localStorage.setItem('np_wishlist', JSON.stringify(state.wishlist));
      localStorage.setItem('np_recent', JSON.stringify(state.recentlyViewed));
    } catch(e) {}
  }

  function loadState() {
    try {
      state.cart = JSON.parse(localStorage.getItem('np_cart') || '[]');
      state.wishlist = JSON.parse(localStorage.getItem('np_wishlist') || '[]');
      state.recentlyViewed = JSON.parse(localStorage.getItem('np_recent') || '[]');
    } catch(e) {}
  }

  // ── TOAST ────────────────────────────────────────────────
  function showToast(msg, type = 'gold', icon = '✨') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-msg">${msg}</span>`;
    container.appendChild(el);
    requestAnimationFrame(() => { requestAnimationFrame(() => { el.classList.add('show'); }); });
    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 400);
    }, 3200);
  }

  // ── CART ─────────────────────────────────────────────────
  function cartTotal() {
    const sub = state.cart.reduce((a, i) => a + i.price * i.qty, 0);
    // Combo offer: Any 3 items from inspired collection (np-*) for 100 AED
    const inspiredQty = state.cart
      .filter(i => i.id.startsWith('np-'))
      .reduce((a, i) => a + i.qty, 0);
    const comboDiscount = Math.floor(inspiredQty / 3) * 20;

    const baseSub = sub - comboDiscount;
    const disc = state.coupon ? (baseSub * COUPONS[state.coupon] / 100) : 0;
    const ship = baseSub >= 200 ? 0 : 20;
    return { sub, comboDiscount, disc, ship, total: baseSub - disc + ship };
  }

  function addToCart(productId, qty = 1) {
    const p = getAllProducts().find(x => x.id === productId);
    if (!p) return;
    const ex = state.cart.find(x => x.id === productId);
    if (ex) { ex.qty += qty; } else {
      state.cart.push({ id: p.id, name: p.name, price: p.price, image: p.image, qty, size: p.size || '' });
    }
    saveState(); updateCartUI();
    showToast(`<strong>${p.name}</strong> added to cart`, 'gold', '🛒');
  }

  function addCustomToCart(name, notes, price) {
    const id = 'custom-' + Date.now();
    state.cart.push({ id, name: name || 'My Studio Blend', price, image: 'assets/signature_perfume.jpg', qty: 1, size: '50ml', custom: true, notes });
    saveState(); updateCartUI();
    showToast(`<strong>${name || 'Studio Blend'}</strong> added to cart!`, 'success', '🧪');
  }

  function removeFromCart(id) {
    state.cart = state.cart.filter(x => x.id !== id);
    saveState(); updateCartUI();
    showToast('Item removed', 'error', '🗑️');
  }

  function updateQty(id, delta) {
    const item = state.cart.find(x => x.id === id);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    saveState(); updateCartUI();
  }

  function applyCoupon(code) {
    if (COUPONS[code.toUpperCase()]) {
      state.coupon = code.toUpperCase();
      showToast(`Coupon applied! ${COUPONS[state.coupon]}% off 🎉`, 'success', '✅');
    } else {
      showToast('Invalid coupon code', 'error', '❌');
    }
    updateCartUI();
  }

  function updateCartUI() {
    const countEls = document.querySelectorAll('.cart-count');
    const totalQty = state.cart.reduce((a, i) => a + i.qty, 0);
    countEls.forEach(el => { el.textContent = totalQty; el.style.display = totalQty > 0 ? 'flex' : 'none'; });

    const body = document.getElementById('cart-body');
    const footer = document.getElementById('cart-footer');
    if (!body) return;

    if (state.cart.length === 0) {
      body.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">🛒</div><h4>Your cart is empty</h4><p>Add some luxury to your life!</p></div>`;
      if (footer) footer.innerHTML = '';
      return;
    }

    body.innerHTML = state.cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2272%22 height=%2272%22><rect width=%2272%22 height=%2272%22 fill=%22%231a1a1a%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23C5A259%22 font-size=%2220%22>✨</text></svg>'">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}${item.custom ? ' <span style="font-size:0.7rem;color:var(--color-gold)">(Custom)</span>' : ''}</div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
          <div class="cart-qty-control">
            <button class="qty-btn" onclick="window.NP.updateQty('${item.id}', -1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="window.NP.updateQty('${item.id}', 1)">+</button>
          </div>
        </div>
        <button class="cart-remove" onclick="window.NP.removeFromCart('${item.id}')" title="Remove">✕</button>
      </div>
    `).join('');

    const { sub, comboDiscount, disc, ship, total } = cartTotal();
    if (footer) footer.innerHTML = `
      <div class="coupon-row">
        <input class="coupon-input" id="coupon-input" placeholder="Coupon code (e.g. PARADISE10)" value="${state.coupon || ''}">
        <button class="btn btn-ghost btn-sm" onclick="window.NP.applyCoupon(document.getElementById('coupon-input').value)">Apply</button>
      </div>
      <div class="cart-summary">
        <div class="cart-summary-row"><span>Subtotal</span><span>${formatPrice(sub)}</span></div>
        ${comboDiscount > 0 ? `<div class="cart-summary-row" style="color:var(--color-success)"><span>Combo Discount</span><span>−${formatPrice(comboDiscount)}</span></div>` : ''}
        ${disc > 0 ? `<div class="cart-summary-row" style="color:var(--color-success)"><span>Discount (${state.coupon ? COUPONS[state.coupon] : 0}%)</span><span>−${formatPrice(disc)}</span></div>` : ''}
        <div class="cart-summary-row"><span>Shipping</span><span>${ship === 0 ? '<span style="color:var(--color-success)">Free</span>' : formatPrice(ship)}</span></div>
        <div class="cart-summary-row total"><span>Total</span><span class="cart-price">${formatPrice(total)}</span></div>
      </div>
      <div class="cart-checkout-btns">
        <button class="btn btn-primary btn-block" onclick="window.NP.checkout()">Secure Checkout</button>
        <button class="btn btn-whatsapp btn-block" onclick="window.NP.whatsappCheckout()">📱 Order via WhatsApp</button>
      </div>
    `;
  }

  // ── WISHLIST ─────────────────────────────────────────────
  function toggleWishlist(productId) {
    const p = getAllProducts().find(x => x.id === productId);
    if (!p) return;
    const idx = state.wishlist.findIndex(x => x.id === productId);
    if (idx > -1) {
      state.wishlist.splice(idx, 1);
      showToast(`Removed from wishlist`, 'error', '💔');
    } else {
      state.wishlist.push({ id: p.id, name: p.name, price: p.price, image: p.image });
      showToast(`<strong>${p.name}</strong> added to wishlist`, 'gold', '❤️');
    }
    saveState(); updateWishlistUI(); updateProductCards();
  }

  function updateWishlistUI() {
    const countEls = document.querySelectorAll('.wishlist-count');
    countEls.forEach(el => { el.textContent = state.wishlist.length; el.style.display = state.wishlist.length > 0 ? 'flex' : 'none'; });

    const body = document.getElementById('wishlist-body');
    if (!body) return;
    if (state.wishlist.length === 0) {
      body.innerHTML = `<div class="wishlist-empty"><div class="cart-empty-icon">❤️</div><h4>Your wishlist is empty</h4><p>Save items you love for later</p></div>`;
      return;
    }
    body.innerHTML = state.wishlist.map(item => `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}" onerror="this.style.background='#1a1a1a'">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
          <button class="btn btn-ghost btn-sm" style="margin-top:0.4rem" onclick="window.NP.addToCart('${item.id}');window.NP.toggleWishlist('${item.id}')">Move to Cart</button>
        </div>
        <button class="cart-remove" onclick="window.NP.toggleWishlist('${item.id}')" title="Remove">✕</button>
      </div>
    `).join('');
  }

  function isWishlisted(id) { return state.wishlist.some(x => x.id === id); }

  function updateProductCards() {
    document.querySelectorAll('[data-wishlist-btn]').forEach(btn => {
      const id = btn.dataset.productId;
      if (isWishlisted(id)) {
        btn.classList.add('wishlisted');
        btn.title = 'Remove from wishlist';
      } else {
        btn.classList.remove('wishlisted');
        btn.title = 'Add to wishlist';
      }
    });
  }

  // ── RECENTLY VIEWED ──────────────────────────────────────
  function trackView(productId) {
    state.recentlyViewed = state.recentlyViewed.filter(x => x !== productId);
    state.recentlyViewed.unshift(productId);
    if (state.recentlyViewed.length > 6) state.recentlyViewed.pop();
    saveState();
    renderRecentlyViewed();
  }

  function renderRecentlyViewed() {
    const container = document.getElementById('recently-viewed-products');
    if (!container) return;
    const section = document.getElementById('recently-viewed-section');
    if (state.recentlyViewed.length === 0) { if (section) section.style.display = 'none'; return; }
    if (section) section.style.display = '';
    const products = state.recentlyViewed.map(id => getAllProducts().find(p => p.id === id)).filter(Boolean);
    container.innerHTML = products.map(p => renderProductCard(p)).join('');
  }

  // ── PRODUCT CARD RENDERER ────────────────────────────────
  function renderProductCard(product) {
    const save = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    const notes = [...(product.topNotes || []), ...(product.middleNotes || [])].slice(0, 4);
    return `
    <div class="product-card reveal" onclick="window.NP.openProduct('${product.id}')">
      <div class="product-card-image">
        ${product.badge ? `<span class="product-badge ${getBadgeClass(product.badge)}">${product.badge}</span>` : ''}
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.parentElement.style.background='linear-gradient(135deg,#1a1400,#2a2000)';this.style.display='none'">
        <div class="product-card-overlay">
          <button class="card-action-btn${isWishlisted(product.id) ? ' wishlisted' : ''}" onclick="event.stopPropagation();window.NP.toggleWishlist('${product.id}')" data-wishlist-btn data-product-id="${product.id}" title="Add to wishlist">
            <svg viewBox="0 0 24 24" fill="${isWishlisted(product.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button class="card-action-btn" onclick="event.stopPropagation();window.NP.openProduct('${product.id}')" title="Quick view">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
          <button class="card-action-btn" onclick="event.stopPropagation();window.NP.addToCart('${product.id}')" title="Add to cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </button>
        </div>
      </div>
      <div class="product-card-body">
        <span class="product-card-cat">${product.subtitle || product.category}</span>
        <h3 class="product-card-name">${product.name}</h3>
        <p class="product-card-sub">${product.family || product.shade || ''}</p>
        ${notes.length ? `<div class="product-notes">${notes.map(n => `<span class="note-tag">${n}</span>`).join('')}</div>` : ''}
        <div class="product-stars">${starsHtml(product.rating)}<span style="font-size:0.72rem;color:var(--color-text-dim);margin-left:0.4rem">(${product.reviews.length})</span></div>
        <div class="product-card-footer">
          <div class="product-price">
            <span class="price-current">${formatPrice(product.price)}</span>
            ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
            ${save > 0 ? `<span class="price-save">Save ${save}%</span>` : ''}
          </div>
          <div class="product-card-actions">
            <button class="btn btn-outline" onclick="event.stopPropagation();window.NP.addToCart('${product.id}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Add to Cart
            </button>
            <button class="btn btn-primary" onclick="event.stopPropagation();window.NP.buyNow('${product.id}')">Buy Now</button>
          </div>
        </div>
      </div>
    </div>`;
  }

  // ── PRODUCT MODAL ────────────────────────────────────────
  function openProduct(productId) {
    const p = getAllProducts().find(x => x.id === productId);
    if (!p) return;
    trackView(productId);

    const modal = document.getElementById('product-modal');
    const save = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;

    document.getElementById('modal-image').src = p.image;
    document.getElementById('modal-cat').textContent = p.subtitle || p.category;
    document.getElementById('modal-name').textContent = p.name;
    document.getElementById('modal-sub').textContent = p.family || '';
    document.getElementById('modal-price-current').textContent = formatPrice(p.price);
    document.getElementById('modal-price-original').textContent = p.originalPrice ? formatPrice(p.originalPrice) : '';
    document.getElementById('modal-price-save').textContent = save > 0 ? `Save ${save}%` : '';
    document.getElementById('modal-desc').textContent = p.description || '';
    document.getElementById('modal-stars').innerHTML = starsHtml(p.rating);

    // Notes
    const notesEl = document.getElementById('modal-notes');
    if (p.topNotes || p.middleNotes || p.baseNotes) {
      notesEl.innerHTML = `
        ${p.topNotes ? `<div class="notes-group"><div class="notes-group-label">Top Notes</div><div class="notes-row">${p.topNotes.map(n => `<span class="note-tag">${n}</span>`).join('')}</div></div>` : ''}
        ${p.middleNotes ? `<div class="notes-group"><div class="notes-group-label">Heart Notes</div><div class="notes-row">${p.middleNotes.map(n => `<span class="note-tag">${n}</span>`).join('')}</div></div>` : ''}
        ${p.baseNotes ? `<div class="notes-group"><div class="notes-group-label">Base Notes</div><div class="notes-row">${p.baseNotes.map(n => `<span class="note-tag">${n}</span>`).join('')}</div></div>` : ''}
      `;
    } else { notesEl.innerHTML = ''; }

    // Specs
    const specsEl = document.getElementById('modal-specs');
    const specs = [];
    if (p.size)     specs.push({ label: 'Size', value: p.size });
    if (p.longevity)specs.push({ label: 'Longevity', value: p.longevity });
    if (p.sillage)  specs.push({ label: 'Sillage', value: p.sillage });
    if (p.coverage) specs.push({ label: 'Coverage', value: p.coverage });
    if (p.duration) specs.push({ label: 'Duration', value: p.duration });
    if (p.tone)     specs.push({ label: 'Tone', value: p.tone });
    specsEl.innerHTML = specs.map(s => `<div class="spec-item"><div class="spec-label">${s.label}</div><div class="spec-value">${s.value}</div></div>`).join('');

    // Reviews
    const revEl = document.getElementById('modal-reviews');
    revEl.innerHTML = (p.reviews || []).map(r => `
      <div class="review-item">
        <div class="review-header">
          <span class="review-name">${r.name}</span>
          <span class="review-date">${r.date}</span>
        </div>
        <div class="product-stars" style="margin-bottom:0.3rem">${starsHtml(r.rating)}</div>
        <div class="review-text">${r.comment}</div>
      </div>
    `).join('');

    // Button handlers
    document.getElementById('modal-add-cart').onclick = () => addToCart(productId);
    document.getElementById('modal-buy-now').onclick = () => buyNow(productId);
    document.getElementById('modal-whatsapp').onclick = () => whatsappProduct(p);
    document.getElementById('modal-wishlist').onclick = () => { toggleWishlist(productId); };

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal() {
    document.getElementById('product-modal').classList.remove('open');
    document.body.style.overflow = '';
  }

  // ── CHECKOUT / WHATSAPP ──────────────────────────────────
  function buyNow(productId) {
    addToCart(productId);
    closeProductModal();
    openCart();
    setTimeout(() => {
      document.getElementById('cart-footer')?.querySelector('.btn-primary')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 400);
  }

  function checkout() {
    if (state.cart.length === 0) { showToast('Your cart is empty!', 'error', '🛒'); return; }
    showToast('Redirecting to secure checkout…', 'gold', '🔐');
  }

  function whatsappCheckout() {
    if (state.cart.length === 0) { showToast('Your cart is empty!', 'error', '🛒'); return; }
    const { sub, comboDiscount, disc, ship, total } = cartTotal();
    const items = state.cart.map(i => `• ${i.name} (x${i.qty}) — ${formatPrice(i.price * i.qty)}`).join('\n');
    let summary = `💰 Subtotal: ${formatPrice(sub)}\n`;
    if (comboDiscount > 0) summary += `🎁 Combo Offer Discount: -${formatPrice(comboDiscount)}\n`;
    if (disc > 0) summary += `🏷️ Coupon Discount (${state.coupon ? COUPONS[state.coupon] : 0}%): -${formatPrice(disc)}\n`;
    summary += `🚚 Shipping: ${ship === 0 ? 'Free' : formatPrice(ship)}\n`;
    summary += `💵 Total: ${formatPrice(total)}`;
    const msg = encodeURIComponent(`Hello Natural Paradise! 🌿\n\nI'd like to order:\n${items}\n\n${summary}\n\nPlease guide me through the payment process. Thank you!`);
    window.open(`https://wa.me/qr/XNFBAW4ZILWYE1?text=${msg}`, '_blank');
  }

  function whatsappProduct(p) {
    const msg = encodeURIComponent(`Hello Natural Paradise! 🌿\n\nI'm interested in:\n✨ ${p.name}\n💰 Price: ${formatPrice(p.price)}\n\nPlease help me place an order. Thank you!`);
    window.open(`https://wa.me/qr/XNFBAW4ZILWYE1?text=${msg}`, '_blank');
  }

  function whatsappFloat() {
    const msg = encodeURIComponent(`Hello Natural Paradise! 🌿\n\nI'd like to know more about your luxury perfumes and hair colours. Can you assist me?`);
    window.open(`https://wa.me/qr/XNFBAW4ZILWYE1?text=${msg}`, '_blank');
  }

  // ── PANELS ────────────────────────────────────────────────
  function openCart() {
    document.getElementById('cart-panel').classList.add('open');
    document.getElementById('panel-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    document.getElementById('cart-panel').classList.remove('open');
    if (!document.getElementById('wishlist-panel').classList.contains('open')) {
      document.getElementById('panel-overlay').classList.remove('open');
      document.body.style.overflow = '';
    }
  }
  function openWishlist() {
    document.getElementById('wishlist-panel').classList.add('open');
    document.getElementById('panel-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeWishlist() {
    document.getElementById('wishlist-panel').classList.remove('open');
    if (!document.getElementById('cart-panel').classList.contains('open')) {
      document.getElementById('panel-overlay').classList.remove('open');
      document.body.style.overflow = '';
    }
  }
  function closePanelOverlay() {
    closeCart(); closeWishlist();
    document.getElementById('panel-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  // ── PRODUCT GRID RENDER ──────────────────────────────────
  function renderProducts() {
    const container = document.getElementById('products-grid');
    if (!container) return;
    const products = getFilteredProducts();
    if (products.length === 0) {
      container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--color-text-muted)"><div style="font-size:3rem;margin-bottom:1rem">🔍</div><h3 style="font-family:var(--font-serif);color:var(--color-cream)">No products found</h3><p>Try a different search term or category</p></div>`;
      return;
    }
    container.innerHTML = products.map(renderProductCard).join('');
    initReveal();
  }

  // ── SEARCH ────────────────────────────────────────────────
  function handleSearch(query) {
    state.searchQuery = query;
    renderProducts();
    updateSearchResults(query);
  }

  function updateSearchResults(query) {
    const box = document.getElementById('search-results');
    if (!box) return;
    if (!query.trim()) { box.classList.remove('visible'); return; }
    const results = getAllProducts().filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 6);
    if (results.length === 0) { box.classList.remove('visible'); return; }
    box.innerHTML = results.map(p => `
      <div class="search-result-item" onclick="window.NP.openProduct('${p.id}')">
        <img src="${p.image}" alt="${p.name}" onerror="this.style.display='none'">
        <div class="search-result-info">
          <div class="search-result-name">${p.name}</div>
          <div class="search-result-price">${formatPrice(p.price)}</div>
        </div>
      </div>
    `).join('');
    box.classList.add('visible');
  }

  // ── CATEGORY / FAMILY FILTERS ────────────────────────────
  function setCategory(cat) {
    state.activeCategory = cat;
    state.activeFamily = null;
    document.querySelectorAll('.pill[data-cat]').forEach(el => el.classList.toggle('active', el.dataset.cat === cat));
    renderProducts();
  }

  function setFamily(family) {
    state.activeFamily = state.activeFamily === family ? null : family;
    state.activeCategory = 'all';
    document.querySelectorAll('.fragrance-card').forEach(el => el.classList.toggle('active-card', el.dataset.family === state.activeFamily));
    renderProducts();
    document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  // ── CUSTOM PERFUME MIXER ─────────────────────────────────
  function selectNote(tier, noteId) {
    state.mixer[tier] = state.mixer[tier] === noteId ? null : noteId;
    document.querySelectorAll(`.mixing-note-btn[data-tier="${tier}"]`).forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.note === state.mixer[tier]);
    });
    updateMixerBottle();
  }

  function updateMixerBottle() {
    const allNotes = PRODUCTS.mixingNotes;
    const top    = state.mixer.top    ? allNotes.top.find(n => n.id === state.mixer.top) : null;
    const middle = state.mixer.middle ? allNotes.middle.find(n => n.id === state.mixer.middle) : null;
    const base   = state.mixer.base   ? allNotes.base.find(n => n.id === state.mixer.base) : null;

    const topEl    = document.getElementById('mixer-top-note');
    const midEl    = document.getElementById('mixer-mid-note');
    const baseEl   = document.getElementById('mixer-base-note');
    const priceEl  = document.getElementById('mixer-price');

    if (topEl)  { topEl.textContent  = top    ? `${top.icon} ${top.name}`    : '— Select Top Note —';    topEl.className  = `mixing-note-entry${top    ? '' : ' empty'}`; }
    if (midEl)  { midEl.textContent  = middle ? `${middle.icon} ${middle.name}` : '— Select Heart Note —'; midEl.className  = `mixing-note-entry${middle ? '' : ' empty'}`; }
    if (baseEl) { baseEl.textContent = base   ? `${base.icon} ${base.name}`  : '— Select Base Note —';  baseEl.className = `mixing-note-entry${base   ? '' : ' empty'}`; }

    const noteCount = [top, middle, base].filter(Boolean).length;
    const price = 75 + (noteCount * 15);
    if (priceEl) priceEl.innerHTML = `Custom Blend Price: <strong>${formatPrice(price)}</strong>`;
  }

  function addMixToCart() {
    const allNotes = PRODUCTS.mixingNotes;
    const top    = state.mixer.top    ? allNotes.top.find(n => n.id === state.mixer.top) : null;
    const middle = state.mixer.middle ? allNotes.middle.find(n => n.id === state.mixer.middle) : null;
    const base   = state.mixer.base   ? allNotes.base.find(n => n.id === state.mixer.base) : null;

    if (!top && !middle && !base) { showToast('Please select at least one note to create your blend', 'error', '⚠️'); return; }
    const name = (document.getElementById('mixer-name-input')?.value || '').trim() || 'My Custom Blend';
    const noteCount = [top, middle, base].filter(Boolean).length;
    const price = 75 + (noteCount * 15);
    const notesStr = [top, middle, base].filter(Boolean).map(n => n.name).join(', ');
    addCustomToCart(name, notesStr, price);
  }

  // ── SHADE GUIDE ──────────────────────────────────────────
  function selectShade(shadeId) {
    state.selectedShade = shadeId;
    const shade = PRODUCTS.shadeGuide.find(s => s.id === shadeId);
    if (!shade) return;

    document.querySelectorAll('.shade-swatch').forEach(el => el.classList.toggle('selected', el.dataset.shade === shadeId));

    const resultEl = document.getElementById('shade-result');
    if (!resultEl) return;
    resultEl.classList.add('visible');
    document.getElementById('shade-preview-circle').style.background = shade.hex;
    document.getElementById('shade-result-name').textContent = shade.name;
    document.getElementById('shade-result-code').textContent = `Shade ${shade.id} · ${shade.category}`;

    const matching = PRODUCTS.hairColours.find(p => p.shade === shadeId);
    const shopBtn = document.getElementById('shade-shop-btn');
    if (shopBtn) {
      if (matching) {
        shopBtn.style.display = 'inline-flex';
        shopBtn.onclick = () => openProduct(matching.id);
        shopBtn.textContent = `Shop ${shade.name}`;
      } else {
        shopBtn.style.display = 'none';
      }
    }
  }

  // ── COUNTDOWN TIMER ──────────────────────────────────────
  function updateCountdown() {
    const diff = state.countdownTarget - Date.now();
    if (diff <= 0) { return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const pad = n => String(n).padStart(2, '0');
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = pad(val); };
    set('cd-days', d); set('cd-hours', h); set('cd-mins', m); set('cd-secs', s);
  }

  // ── FAQ ───────────────────────────────────────────────────
  function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  }

  // ── HEADER SCROLL ────────────────────────────────────────
  function handleScroll() {
    const header = document.getElementById('site-header');
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
  }

  // ── REVEAL ANIMATION ────────────────────────────────────
  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // ── NEWSLETTER ───────────────────────────────────────────
  function subscribeNewsletter(e) {
    e.preventDefault();
    const input = document.getElementById('newsletter-email');
    if (!input?.value.trim()) { showToast('Please enter your email address', 'error', '📧'); return; }
    showToast(`Welcome to the Natural Paradise family! 🌿`, 'success', '✅');
    if (input) input.value = '';
  }

  // ── HERO IMAGE PARALLAX ──────────────────────────────────
  function initParallax() {
    const heroBg = document.querySelector('.hero-bg img');
    if (!heroBg) return;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBg.style.transform = `scale(1.05) translateY(${y * 0.25}px)`;
      }
    }, { passive: true });
  }

  // ── MOBILE MENU ──────────────────────────────────────────
  function openMobileMenu() {
    document.getElementById('mobile-nav').classList.add('open');
    document.getElementById('mobile-nav-overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu() {
    document.getElementById('mobile-nav').classList.remove('open');
    document.getElementById('mobile-nav-overlay').style.display = 'none';
    document.body.style.overflow = '';
  }

  // ── INIT ─────────────────────────────────────────────────
  function init() {
    loadState();
    renderProducts();
    updateCartUI();
    updateWishlistUI();
    renderRecentlyViewed();
    updateMixerBottle();
    initReveal();
    initParallax();
    setInterval(updateCountdown, 1000);
    updateCountdown();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Close search results on outside click
    document.addEventListener('click', (e) => {
      const sr = document.getElementById('search-results');
      if (sr && !sr.contains(e.target) && !document.querySelector('.search-bar')?.contains(e.target)) {
        sr.classList.remove('visible');
      }
    });

    // Hero image loaded — start reveal
    const heroBgImg = document.querySelector('.hero-bg img');
    if (heroBgImg) {
      heroBgImg.addEventListener('load', () => {
        heroBgImg.style.opacity = '0.45';
      });
    }

    // Announce bar offset header
    const annoBar = document.getElementById('announcement-bar');
    const siteHeader = document.getElementById('site-header');
    if (annoBar && siteHeader) {
      const barH = annoBar.offsetHeight;
      siteHeader.style.top = barH + 'px';
      window.addEventListener('scroll', () => {
        if (window.scrollY > barH) {
          siteHeader.style.top = '0';
        } else {
          siteHeader.style.top = (barH - window.scrollY) + 'px';
        }
      }, { passive: true });
    }
  }

  function switchLabTab(tabName) {
    document.querySelectorAll('.lab-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    document.querySelectorAll('.lab-tab-content').forEach(content => {
      content.classList.toggle('active', content.id === 'lab-tab-' + tabName);
    });
  }

  // ── PUBLIC API ────────────────────────────────────────────
  window.NP = {
    addToCart, removeFromCart, updateQty, applyCoupon,
    toggleWishlist, openProduct, closeProductModal,
    openCart, closeCart, openWishlist, closeWishlist, closePanelOverlay,
    setCategory, setFamily, handleSearch, buyNow,
    checkout, whatsappCheckout, whatsappProduct, whatsappFloat,
    selectNote, addMixToCart,
    selectShade, toggleFaq,
    subscribeNewsletter, openMobileMenu, closeMobileMenu,
    switchLabTab,
  };

  document.addEventListener('DOMContentLoaded', init);
})();
