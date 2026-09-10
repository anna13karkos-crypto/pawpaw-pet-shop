(() => {
  'use strict';

  /* ============================================================
     Data
     ============================================================ */
  const PRODUCTS = [
    {
      id: 'p1', name: 'Grain-Free Salmon Kibble', category: 'food', pet: 'dog',
      price: 42.99, rating: 4.8, reviews: 312,
      img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=600&q=80',
      badge: 'Bestseller'
    },
    {
      id: 'p2', name: 'Ocean Whitefish Cat Pâté', category: 'food', pet: 'cat',
      price: 34.99, rating: 4.7, reviews: 198,
      img: 'https://images.unsplash.com/photo-1601758064878-c9e7e5f7d0e9?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p3', name: 'Plush Squeaky Bone Toy', category: 'toys', pet: 'dog',
      price: 12.99, rating: 4.6, reviews: 421,
      img: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p4', name: 'Feather Wand Cat Teaser', category: 'toys', pet: 'cat',
      price: 9.99, rating: 4.5, reviews: 267,
      img: 'https://images.unsplash.com/photo-1618335829737-2228915674e0?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p5', name: 'Orthopedic Memory Foam Bed', category: 'beds', pet: 'dog',
      price: 89.99, rating: 4.9, reviews: 156,
      img: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=600&q=80',
      badge: 'Top Rated'
    },
    {
      id: 'p6', name: 'Cozy Cave Cat Bed', category: 'beds', pet: 'cat',
      price: 54.99, rating: 4.7, reviews: 133,
      img: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p7', name: 'Adjustable Leather Leash', category: 'care', pet: 'dog',
      price: 24.99, rating: 4.6, reviews: 210,
      img: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p8', name: 'Self-Cleaning Litter Box', category: 'care', pet: 'cat',
      price: 119.99, rating: 4.8, reviews: 402,
      img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
      badge: 'New'
    },
    {
      id: 'p9', name: 'Natural Oatmeal Pet Shampoo', category: 'care', pet: 'dog',
      price: 16.99, rating: 4.5, reviews: 178,
      img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p10', name: 'Interactive Puzzle Feeder', category: 'toys', pet: 'dog',
      price: 19.99, rating: 4.7, reviews: 289,
      img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p11', name: 'Freeze-Dried Chicken Treats', category: 'dogs', pet: 'dog',
      price: 14.99, rating: 4.9, reviews: 356,
      img: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=600&q=80',
      badge: 'Bestseller'
    },
    {
      id: 'p12', name: 'Scratch-Resistant Wall Post', category: 'cats', pet: 'cat',
      price: 44.99, rating: 4.6, reviews: 121,
      img: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const money = n => `$${n.toFixed(2)}`;

  /* ============================================================
     State (persisted)
     ============================================================ */
  const store = {
    load(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch { return fallback; }
    },
    save(key, val) {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* ignore */ }
    }
  };

  let favorites = new Set(store.load('pawpaw_favorites', []));
  let cart = store.load('pawpaw_cart', []); // [{id, qty}]

  const persistFavorites = () => store.save('pawpaw_favorites', [...favorites]);
  const persistCart = () => store.save('pawpaw_cart', cart);

  const filterState = { category: 'all', query: '', favoritesOnly: false };

  /* ============================================================
     Star rating renderer
     ============================================================ */
  const STAR_FULL = '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.6 5.5 6 .7-4.4 4.1 1.2 6-5.4-3-5.4 3 1.2-6L1.4 7.7l6-.7Z"/></svg>';
  const STAR_HALF = '<svg viewBox="0 0 20 20"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path fill="url(#half)" stroke="currentColor" stroke-width="0.6" d="M10 1.5l2.6 5.5 6 .7-4.4 4.1 1.2 6-5.4-3-5.4 3 1.2-6L1.4 7.7l6-.7Z"/></svg>';
  const STAR_EMPTY = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M10 1.5l2.6 5.5 6 .7-4.4 4.1 1.2 6-5.4-3-5.4 3 1.2-6L1.4 7.7l6-.7Z"/></svg>';

  function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    let out = '';
    for (let i = 0; i < full; i++) out += STAR_FULL;
    if (half) out += STAR_HALF;
    while (out.split('<svg').length - 1 < 5) out += STAR_EMPTY;
    return out;
  }

  document.querySelectorAll('.stars[data-rating]').forEach(el => {
    el.innerHTML = renderStars(parseFloat(el.dataset.rating));
  });

  /* ============================================================
     Image fallback (graceful degrade if a remote photo fails)
     ============================================================ */
  function fallbackSvg(kind) {
    const emoji = kind === 'cat' ? '🐱' : kind === 'dog' ? '🐶' : '🐾';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="#F1E4FA"/><text x="50%" y="54%" font-size="120" text-anchor="middle" dominant-baseline="middle">${emoji}</text></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }
  function applyFallback(img) {
    if (img.classList.contains('img-error')) return;
    img.classList.add('img-error');
    img.src = fallbackSvg(img.dataset.fallback || 'paw');
  }
  function attachFallback(img) {
    img.addEventListener('error', () => applyFallback(img), { once: true });
    // Safety net: some networks hang on a broken image request instead of
    // erroring quickly, so also fall back if it simply never finishes loading.
    setTimeout(() => {
      if (!img.complete || img.naturalWidth === 0) applyFallback(img);
    }, 5000);
  }
  document.querySelectorAll('img[data-fallback]').forEach(attachFallback);

  /* ============================================================
     Toasts
     ============================================================ */
  const toastStack = document.getElementById('toastStack');
  const TOAST_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  function showToast(message) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `${TOAST_ICON}<span>${message}</span>`;
    toastStack.appendChild(el);
    setTimeout(() => {
      el.classList.add('is-leaving');
      el.addEventListener('animationend', () => el.remove(), { once: true });
    }, 2600);
  }

  /* ============================================================
     Header scroll state + mobile menu
     ============================================================ */
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const menuToggle = document.getElementById('menuToggle');
  menuToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('mobile-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  document.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', () => {
      header.classList.remove('mobile-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ============================================================
     Smooth scroll (accounts for sticky header height)
     ============================================================ */
  function scrollToSelector(sel) {
    const target = document.querySelector(sel);
    if (!target) return;
    const headerH = header.offsetHeight;
    const y = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', e => {
      const explicit = el.dataset.scrollTarget;
      const href = el.getAttribute('href');
      const sel = explicit || (href && href.startsWith('#') ? href : null);
      if (sel && sel !== '#') {
        e.preventDefault();
        scrollToSelector(sel === '#top' ? 'body' : sel);
      }
    });
  });

  /* ============================================================
     Search
     ============================================================ */
  const searchWrap = document.getElementById('searchWrap');
  const searchToggle = document.getElementById('searchToggle');
  const searchInput = document.getElementById('searchInput');

  searchToggle.addEventListener('click', () => {
    const isOpen = searchWrap.classList.toggle('is-open');
    searchToggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) { searchInput.focus(); }
    else { searchInput.value = ''; filterState.query = ''; renderProducts(); }
  });
  searchInput.addEventListener('input', () => {
    filterState.query = searchInput.value.trim().toLowerCase();
    filterState.favoritesOnly = false;
    renderProducts();
  });
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') scrollToSelector('#products');
    if (e.key === 'Escape') { searchWrap.classList.remove('is-open'); searchInput.value = ''; filterState.query = ''; renderProducts(); }
  });

  /* ============================================================
     Category filters (category cards, header links, footer links, pills)
     ============================================================ */
  const filterRow = document.getElementById('filterRow');

  function setCategory(cat) {
    filterState.category = cat;
    filterState.favoritesOnly = false;
    filterRow.querySelectorAll('.filter-pill').forEach(p => {
      p.classList.toggle('is-active', p.dataset.filter === cat);
    });
    renderProducts();
  }

  filterRow.addEventListener('click', e => {
    const btn = e.target.closest('.filter-pill');
    if (!btn) return;
    setCategory(btn.dataset.filter);
    scrollToSelector('#products');
  });

  document.querySelectorAll('[data-filter]').forEach(el => {
    if (el.closest('#filterRow')) return;
    el.addEventListener('click', () => {
      setCategory(el.dataset.filter);
      scrollToSelector('#products');
    });
  });

  document.querySelectorAll('[data-filter-link]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      setCategory(el.dataset.filterLink);
      scrollToSelector('#products');
      header.classList.remove('mobile-open');
    });
  });

  /* ============================================================
     Favorites
     ============================================================ */
  const favToggle = document.getElementById('favToggle');
  const favCount = document.getElementById('favCount');

  function updateFavCount() {
    const n = favorites.size;
    favCount.hidden = n === 0;
    favCount.textContent = n;
  }

  favToggle.addEventListener('click', () => {
    filterState.favoritesOnly = !filterState.favoritesOnly;
    favToggle.classList.toggle('is-active', filterState.favoritesOnly);
    if (filterState.favoritesOnly) {
      filterState.category = 'all';
      filterRow.querySelectorAll('.filter-pill').forEach(p => p.classList.toggle('is-active', p.dataset.filter === 'all'));
    }
    renderProducts();
    scrollToSelector('#products');
  });

  function toggleFavorite(id) {
    if (favorites.has(id)) favorites.delete(id);
    else { favorites.add(id); showToast('Added to favorites ❤️'); }
    persistFavorites();
    updateFavCount();
    document.querySelectorAll(`.fav-btn[data-id="${id}"]`).forEach(btn => {
      btn.classList.toggle('is-active', favorites.has(id));
    });
    if (filterState.favoritesOnly) renderProducts();
  }

  /* ============================================================
     Cart
     ============================================================ */
  const cartDrawer = document.getElementById('cartDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const cartToggle = document.getElementById('cartToggle');
  const cartClose = document.getElementById('cartClose');
  const cartCountEl = document.getElementById('cartCount');
  const cartItemsEl = document.getElementById('cartItems');
  const cartEmptyEl = document.getElementById('cartEmpty');
  const cartFooterEl = document.getElementById('cartFooter');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartTotalEl = document.getElementById('cartTotal');

  function openDrawer() {
    cartDrawer.classList.add('is-open');
    drawerOverlay.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    cartDrawer.classList.remove('is-open');
    drawerOverlay.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  cartToggle.addEventListener('click', openDrawer);
  cartClose.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
  document.querySelectorAll('[data-close-drawer]').forEach(el => el.addEventListener('click', closeDrawer));

  const REMOVE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg>';

  function addToCart(id) {
    const line = cart.find(c => c.id === id);
    if (line) line.qty += 1;
    else cart.push({ id, qty: 1 });
    persistCart();
    renderCart();
    const product = PRODUCTS.find(p => p.id === id);
    showToast(`${product.name} added to cart`);
  }
  function updateQty(id, delta) {
    const line = cart.find(c => c.id === id);
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) cart = cart.filter(c => c.id !== id);
    persistCart();
    renderCart();
  }
  function removeFromCart(id) {
    cart = cart.filter(c => c.id !== id);
    persistCart();
    renderCart();
  }

  function renderCart() {
    const totalQty = cart.reduce((sum, c) => sum + c.qty, 0);
    cartCountEl.hidden = totalQty === 0;
    cartCountEl.textContent = totalQty;

    if (cart.length === 0) {
      cartItemsEl.innerHTML = '';
      cartEmptyEl.hidden = false;
      cartFooterEl.hidden = true;
      return;
    }
    cartEmptyEl.hidden = true;
    cartFooterEl.hidden = false;

    let subtotal = 0;
    cartItemsEl.innerHTML = cart.map(line => {
      const p = PRODUCTS.find(pr => pr.id === line.id);
      if (!p) return '';
      const lineTotal = p.price * line.qty;
      subtotal += lineTotal;
      return `
        <div class="cart-item" data-id="${p.id}">
          <img src="${p.img}" data-fallback="${p.pet}" alt="${p.name}">
          <div class="cart-item-info">
            <h4>${p.name}</h4>
            <span class="cart-item-price">${money(p.price)} each</span>
            <div class="cart-item-row">
              <div class="qty-control">
                <button type="button" data-qty="-1" aria-label="Decrease quantity">−</button>
                <span>${line.qty}</span>
                <button type="button" data-qty="1" aria-label="Increase quantity">+</button>
              </div>
              <button type="button" class="remove-btn" data-remove aria-label="Remove ${p.name}">${REMOVE_ICON}</button>
            </div>
          </div>
        </div>`;
    }).join('');

    cartItemsEl.querySelectorAll('img[data-fallback]').forEach(attachFallback);

    cartSubtotalEl.textContent = money(subtotal);
    cartTotalEl.textContent = money(subtotal);
  }

  cartItemsEl.addEventListener('click', e => {
    const item = e.target.closest('.cart-item');
    if (!item) return;
    const id = item.dataset.id;
    const qtyBtn = e.target.closest('[data-qty]');
    const removeBtn = e.target.closest('[data-remove]');
    if (qtyBtn) updateQty(id, parseInt(qtyBtn.dataset.qty, 10));
    if (removeBtn) removeFromCart(id);
  });

  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) return;
    showToast('Checkout is a demo — thanks for shopping PawPaw! 🐾');
  });

  /* ============================================================
     Product rendering
     ============================================================ */
  const productGrid = document.getElementById('productGrid');
  const emptyState = document.getElementById('emptyState');
  const ADD_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6 5 2H2"/></svg>';
  const HEART_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>';

  function matchesFilters(p) {
    if (filterState.favoritesOnly && !favorites.has(p.id)) return false;
    if (!filterState.favoritesOnly && filterState.category !== 'all') {
      const cat = filterState.category;
      const petSingular = cat === 'dogs' ? 'dog' : cat === 'cats' ? 'cat' : null;
      const matchesCat = p.category === cat || (petSingular !== null && p.pet === petSingular);
      if (!matchesCat) return false;
    }
    if (filterState.query) {
      const q = filterState.query;
      if (!p.name.toLowerCase().includes(q) && !p.category.includes(q) && !p.pet.includes(q)) return false;
    }
    return true;
  }

  function productCard(p) {
    return `
      <article class="product-card" data-id="${p.id}">
        <div class="product-media">
          ${p.badge ? `<span class="badge-tag">${p.badge}</span>` : ''}
          <button type="button" class="fav-btn${favorites.has(p.id) ? ' is-active' : ''}" data-id="${p.id}" aria-label="Toggle favorite for ${p.name}">${HEART_ICON}</button>
          <img src="${p.img}" data-fallback="${p.pet}" alt="${p.name}" loading="lazy">
        </div>
        <div class="product-body">
          <span class="product-category">${p.category}</span>
          <h3 class="product-name">${p.name}</h3>
          <div class="product-rating">
            <span class="stars" data-rating="${p.rating}">${renderStars(p.rating)}</span>
            <span>${p.rating} (${p.reviews})</span>
          </div>
          <div class="product-footer">
            <span class="product-price">${money(p.price)}</span>
            <button type="button" class="add-cart-btn" data-id="${p.id}">${ADD_ICON}<span>Add</span></button>
          </div>
        </div>
      </article>`;
  }

  function renderProducts() {
    const list = PRODUCTS.filter(matchesFilters);
    emptyState.hidden = list.length !== 0;
    productGrid.innerHTML = list.map(productCard).join('');
    productGrid.querySelectorAll('img[data-fallback]').forEach(attachFallback);
    observeReveal(productGrid.querySelectorAll('.product-card'));
  }

  productGrid.addEventListener('click', e => {
    const favBtn = e.target.closest('.fav-btn');
    const addBtn = e.target.closest('.add-cart-btn');
    if (favBtn) { toggleFavorite(favBtn.dataset.id); return; }
    if (addBtn) {
      addToCart(addBtn.dataset.id);
      addBtn.classList.add('is-added');
      const label = addBtn.querySelector('span');
      const prev = label.textContent;
      label.textContent = 'Added';
      setTimeout(() => { addBtn.classList.remove('is-added'); label.textContent = prev; }, 1200);
    }
  });

  /* ============================================================
     Promo code
     ============================================================ */
  document.getElementById('promoBtn').addEventListener('click', () => {
    const code = 'PAWPAW20';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    showToast(`Code ${code} copied — 20% off applied at checkout!`);
  });

  /* ============================================================
     Newsletter
     ============================================================ */
  document.getElementById('newsletterForm').addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('newsletterEmail');
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    if (!valid) {
      input.style.borderColor = '#C33';
      input.focus();
      showToast('Please enter a valid email address');
      return;
    }
    input.style.borderColor = '';
    showToast('Welcome to the PawPaw family! 🐾');
    input.value = '';
  });

  /* ============================================================
     Scroll reveal
     ============================================================ */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function observeReveal(nodeList) {
    nodeList.forEach(el => revealObserver.observe(el));
  }
  observeReveal(document.querySelectorAll('.reveal'));

  /* ============================================================
     Init
     ============================================================ */
  document.getElementById('year').textContent = new Date().getFullYear();
  updateFavCount();
  renderProducts();
  renderCart();
})();
