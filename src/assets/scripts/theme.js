/* ==========================================================================
   GreenBird Salla Twilight Theme — Interactive Store Engine
   ========================================================================== */
(function () {
  const DATA = window.GB_STORE_DATA || {};
  const STORAGE_CART = "gb_salla_cart_v1";
  const STORAGE_WISH = "gb_salla_wishlist_v1";
  const STORAGE_LANG = "gb_salla_lang_v1";

  const state = {
    lang: document.documentElement.lang || localStorage.getItem(STORAGE_LANG) || "ar",
    locales: {},
    heroColor: "orange",
    heroSize: 42,
    autoplay: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    autoplayTimer: null,
    cart: JSON.parse(localStorage.getItem(STORAGE_CART) || "[]"),
    wishlist: JSON.parse(localStorage.getItem(STORAGE_WISH) || "[]"),
    couponDiscount: 0,
    lastOrder: JSON.parse(localStorage.getItem("gb_last_order_v1") || "null"),
    filters: { category: "all", maxPrice: 100, color: "all", size: "all", sort: "newest", query: "", minRating: 0, onSale: false, isNew: false, bestseller: false }
  };

  const t = (path) => {
    const dict = state.locales[state.lang] || {};
    return path.split(".").reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : null), dict) || path;
  };

  const SAR_ICON = `<svg class="gb-sar-icon" viewBox="0 0 1124.14 1256.39" fill="currentColor" aria-label="SAR"><path d="M699.62 1113.02h0c-20.06 44.48-33.32 92.75-38.4 143.37l424.51-90.24c20.06-44.47 33.31-92.75 38.4-143.37l-424.51 90.24ZM1085.73 895.8c20.06-44.47 33.32-92.75 38.4-143.37l-330.68 70.33v-135.2l292.27-62.11c20.06-44.47 33.32-92.75 38.4-143.37l-330.68 70.27V66.13c-50.67 28.45-95.67 66.32-132.25 110.99v403.35l-132.25 28.11V0c-50.67 28.44-95.67 66.32-132.25 110.99v525.69l-295.91 62.88c-20.06 44.47-33.33 92.75-38.42 143.37l334.33-71.05v170.26l-358.3 76.14c-20.06 44.47-33.32 92.75-38.4 143.37l375.04-79.7c30.53-6.35 56.77-24.4 73.83-49.24l68.78-101.97v-.02c7.14-10.55 11.3-23.27 11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/></svg>`;
  const formatMoney = (val) => `<span class="gb-price-val">${Number(val).toFixed(2)} ${SAR_ICON}</span>`;

  const ICON_HEART = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.5s-7.5-4.7-9.5-9C.9 8.1 3 4.5 6.8 4.5c2.1 0 3.9 1.1 5.2 2.8 1.3-1.7 3.1-2.8 5.2-2.8 3.8 0 5.9 3.6 4.3 7-2 4.3-9.5 9-9.5 9Z"/></svg>`;
  const ICONS = {
    target: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>`,
    trend: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/></svg>`,
    shield: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
    bolt: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    layers: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 9 4.5-9 4.5-9-4.5L12 2z"/><path d="m3 12 9 4.5 9-4.5"/><path d="m3 17.5 9 4.5 9-4.5"/></svg>`,
    award: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    mail: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    phone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    clock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
    pin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    chevron: `<svg class="gb-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`
  };

  const showToast = (msg) => {
    const el = document.getElementById("gb-toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("is-visible");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("is-visible"), 2600);
  };

  /* ------------------------------------------------------------------------
     Salla Cart & Wishlist Integration (Real Twilight API + Local Fallback)
     ------------------------------------------------------------------------ */
  const persistCart = () => {
    localStorage.setItem(STORAGE_CART, JSON.stringify(state.cart));
    renderBadges();
    renderCartDrawer();
    if (window.location.hash === "#/cart") {
      const dyn = document.getElementById("gb-dynamic-view");
      if (dyn) renderCartPage(dyn);
    }
  };

  const persistWishlist = () => {
    localStorage.setItem(STORAGE_WISH, JSON.stringify(state.wishlist));
    renderBadges();
    renderWishlistDrawer();
    syncWishlistButtons();
  };

  const addToCart = async (productId, size = 42, color = null, qty = 1) => {
    const product = (DATA.products || []).find((p) => p.id === productId);
    if (!product) return;
    const chosenColor = color || product.colors[0] || "orange";

    if (window.salla && window.salla.cart && typeof window.salla.cart.addItem === "function") {
      try {
        await window.salla.cart.addItem({ id: product.id, quantity: qty, options: { size, color: chosenColor } });
      } catch (_) {}
    }

    const existing = state.cart.find((i) => i.id === product.id && i.size === size && i.color === chosenColor);
    if (existing) {
      existing.qty += qty;
    } else {
      state.cart.push({ id: product.id, size, color: chosenColor, qty });
    }
    persistCart();

    const btn = document.getElementById("gb-cart-trigger");
    if (btn) {
      btn.classList.remove("is-pulsing");
      void btn.offsetWidth;
      btn.classList.add("is-pulsing");
    }
    showToast(t("product.added"));
  };

  const toggleWishlist = async (productId) => {
    if (window.salla && window.salla.wishlist && typeof window.salla.wishlist.toggle === "function") {
      try {
        await window.salla.wishlist.toggle(productId);
      } catch (_) {}
    }
    const idx = state.wishlist.indexOf(productId);
    if (idx >= 0) state.wishlist.splice(idx, 1);
    else state.wishlist.push(productId);
    persistWishlist();
  };

  const renderBadges = () => {
    const cartCount = state.cart.reduce((s, i) => s + i.qty, 0);
    const cartBadge = document.getElementById("gb-cart-count");
    if (cartBadge) {
      cartBadge.textContent = cartCount;
      cartBadge.hidden = false;
      cartBadge.classList.toggle("has-items", cartCount > 0);
    }
    const wishCount = state.wishlist.length;
    const wishBadge = document.getElementById("gb-wishlist-count");
    if (wishBadge) {
      wishBadge.textContent = wishCount;
      wishBadge.hidden = wishCount === 0;
    }
  };

  const syncWishlistButtons = () => {
    document.querySelectorAll("[data-wish-id]").forEach((btn) => {
      const active = state.wishlist.includes(btn.dataset.wishId);
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
  };

  /* ------------------------------------------------------------------------
     Hero Variant & Dynamic Theme Switcher (Synchronized 500-1000ms)
     ------------------------------------------------------------------------ */
  const setHeroColor = (colorKey, fromUser = false) => {
    const variant = (DATA.heroVariants || {})[colorKey];
    if (!variant) return;
    if (fromUser) pauseAutoplay();

    state.heroColor = colorKey;
    const panel = document.getElementById("gb-hero-panel");
    const img = document.getElementById("gb-hero-image");
    if (panel) panel.setAttribute("data-variant", colorKey);

    if (img) {
      img.classList.add("is-switching");
      setTimeout(() => {
        img.src = variant.image;
        img.alt = `Under Armour Basketball Shoe - ${variant.label[state.lang] || colorKey}`;
        img.classList.remove("is-switching");
      }, 280);
    }

    document.querySelectorAll("#gb-hero-colors .gb-color-swatch, #gb-hero-thumbs .gb-thumb-btn").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.color === colorKey);
    });
  };

  const startAutoplay = () => {
    clearInterval(state.autoplayTimer);
    if (!state.autoplay) return;
    const keys = Object.keys(DATA.heroVariants || {});
    if (keys.length < 2) return;
    state.autoplayTimer = setInterval(() => {
      const next = keys[(keys.indexOf(state.heroColor) + 1) % keys.length];
      setHeroColor(next, false);
    }, 3200);
  };

  const pauseAutoplay = () => {
    state.autoplay = false;
    clearInterval(state.autoplayTimer);
    const btn = document.getElementById("gb-autoplay-toggle");
    const label = document.getElementById("gb-autoplay-label");
    if (btn) btn.setAttribute("aria-pressed", "false");
    if (label) label.textContent = t("hero.autoplay_off");
  };

  /* ------------------------------------------------------------------------
     Product Card Renderer
     ------------------------------------------------------------------------ */
  const renderProductCard = (p) => {
    const catObj = (DATA.categories || []).find((c) => c.slug === p.category);
    const catName = catObj ? catObj.name[state.lang] : p.category;
    const wished = state.wishlist.includes(p.id);
    const badgeHtml = p.discount
      ? `<span class="gb-card-badge">${t("product.discount_badge")} ${p.discount}%</span>`
      : p.isNew
      ? `<span class="gb-card-badge is-new">${t("product.new_badge")}</span>`
      : `<span></span>`;

    return `
      <article class="gb-product-card">
        <div class="gb-card-top-bar">
          ${badgeHtml}
          <button type="button" class="gb-wish-btn ${wished ? "is-active" : ""}" data-wish-id="${p.id}" aria-label="${t("product.add_wishlist")}">
            ${ICON_HEART}
          </button>
        </div>
        <a href="#/product/${p.slug}" class="gb-card-media">
          <img src="${p.image}" alt="${p.name[state.lang]}" loading="lazy" />
        </a>
        <span class="gb-card-cat">${catName}</span>
        <a href="#/product/${p.slug}" class="gb-card-title">${p.name[state.lang]}</a>
        <div class="gb-card-bottom">
          <div class="gb-card-prices">
            <span class="gb-card-price">${formatMoney(p.price)}</span>
            ${p.oldPrice ? `<span class="gb-card-old">${formatMoney(p.oldPrice)}</span>` : ""}
          </div>
          <button type="button" class="gb-add-mini-btn" data-add-id="${p.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 7h12l1 12H5L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>
            <span>${t("product.add_to_cart")}</span>
          </button>
        </div>
      </article>
    `;
  };

  /* ------------------------------------------------------------------------
     Homepage Sections Population
     ------------------------------------------------------------------------ */
  const renderHomeSections = () => {
    const cfg = window.SALLA_THEME_CONFIG || {};
    const products = DATA.products || [];

    const sectionToggleMap = {
      "section-categories": cfg.showCategories !== false,
      "section-featured": cfg.showFeatured !== false,
      "section-promo": cfg.showPromo !== false,
      "section-bestsellers": cfg.showBestsellers !== false,
      "section-new-arrivals": cfg.showNewArrivals !== false,
      "section-features": cfg.showFeatures !== false,
      "section-testimonials": cfg.showTestimonials !== false,
      "section-newsletter": cfg.showNewsletter !== false
    };
    Object.entries(sectionToggleMap).forEach(([id, visible]) => {
      const el = document.getElementById(id);
      if (el) el.style.display = visible ? "" : "none";
    });

    const heroSec = document.querySelector(".gb-hero-section");
    if (heroSec) heroSec.style.display = cfg.heroShow === false ? "none" : "";

    // Empty store graceful state
    const existingEmpty = document.getElementById("gb-empty-store-state");
    if (existingEmpty) existingEmpty.remove();
    if (!products.length) {
      const dyn = document.getElementById("gb-dynamic-view");
      if (dyn) {
        ["section-categories", "section-featured", "section-promo", "section-bestsellers", "section-new-arrivals"].forEach((id) => {
          const el = document.getElementById(id);
          if (el) el.style.display = "none";
        });
        const emptyBox = document.createElement("section");
        emptyBox.id = "gb-empty-store-state";
        emptyBox.className = "gb-view-panel";
        emptyBox.style.textAlign = "center";
        emptyBox.innerHTML = `<h2 class="gb-section-title" style="margin-bottom:8px">${t("empty_store.title")}</h2><p class="gb-section-subtitle" style="margin-bottom:22px">${t("empty_store.subtitle")}</p><a href="#/about" class="gb-cta-capsule">${t("empty_store.cta")}</a>`;
        dyn.prepend(emptyBox);
      }
      return;
    }

    const catStrip = document.getElementById("gb-categories-strip");
    if (catStrip) {
      catStrip.innerHTML = (DATA.categories || [])
        .map((cat) => {
          const count = products.filter((p) =>
            cat.slug === "offers" ? p.discount > 0 : p.category === cat.slug
          ).length;
          return `
            <a href="#/${cat.slug === "offers" ? "offers" : "category/" + cat.slug}" class="gb-cat-card">
              <div class="gb-cat-thumb"><img src="${cat.image}" alt="${cat.name[state.lang]}" loading="lazy" /></div>
              <div class="gb-cat-name">${cat.name[state.lang]}</div>
              <div class="gb-cat-count">${count} ${t("categories.items_count")}</div>
            </a>
          `;
        })
        .join("");
    }

    const featured = document.getElementById("gb-featured-grid");
    if (featured) {
      featured.innerHTML = products.filter((p) => p.featured).slice(0, cfg.featuredCount || 4).map(renderProductCard).join("");
    }

    const bestsellers = document.getElementById("gb-bestsellers-grid");
    if (bestsellers) {
      bestsellers.innerHTML = products.filter((p) => p.bestseller).slice(0, cfg.bestsellersCount || 4).map(renderProductCard).join("");
    }

    const newArrivals = document.getElementById("gb-new-arrivals-grid");
    if (newArrivals) {
      newArrivals.innerHTML = products.filter((p) => p.isNew).slice(0, cfg.newArrivalsCount || 4).map(renderProductCard).join("");
    }

    const testimonials = document.getElementById("gb-testimonials-grid");
    if (testimonials) {
      testimonials.innerHTML = (DATA.testimonials || [])
        .map(
          (item) => `
          <article class="gb-glass-card gb-testimonial-card">
            <div class="gb-stars">${"★".repeat(item.rating)}</div>
            <p class="gb-quote">"${item.quote[state.lang]}"</p>
            <div class="gb-author-row">
              <img src="${item.avatar}" alt="${item.name[state.lang]}" class="gb-author-avatar" />
              <div>
                <strong>${item.name[state.lang]}</strong>
                <div style="font-size:0.78rem;color:var(--text-muted)">${item.role[state.lang]}</div>
              </div>
            </div>
          </article>
        `
        )
        .join("");
    }
  };

  /* ------------------------------------------------------------------------
     Internal Views: Catalog / Category Filter, Product Detail, About, Contact
     ------------------------------------------------------------------------ */
  const renderCatalogView = (container, initialCategory = "all") => {
    if (initialCategory) state.filters.category = initialCategory;

    const COLOR_MAP = [
      { key: "orange", hex: "#FF6B1A" },
      { key: "black", hex: "#222328" },
      { key: "white", hex: "#F1F5F9" },
      { key: "pink", hex: "#EC4899" },
      { key: "red", hex: "#EF4444" },
      { key: "green", hex: "#10B981" },
      { key: "blue", hex: "#3B82F6" },
      { key: "gold", hex: "#FBBF24" }
    ];

    const applyFilters = () => {
      let list = [...(DATA.products || [])];
      if (state.filters.category === "offers") list = list.filter((p) => p.discount > 0);
      else if (state.filters.category !== "all") list = list.filter((p) => p.category === state.filters.category);
      if (state.filters.color !== "all") list = list.filter((p) => p.colors.includes(state.filters.color));
      if (state.filters.size !== "all") list = list.filter((p) => p.sizes.includes(Number(state.filters.size)));
      if (state.filters.minRating > 0) list = list.filter((p) => p.rating >= state.filters.minRating);
      if (state.filters.onSale) list = list.filter((p) => p.discount > 0);
      if (state.filters.isNew) list = list.filter((p) => p.isNew);
      if (state.filters.bestseller) list = list.filter((p) => p.bestseller);
      if (state.filters.query) {
        const q = state.filters.query.toLowerCase();
        list = list.filter((p) => p.name.ar.toLowerCase().includes(q) || p.name.en.toLowerCase().includes(q));
      }
      list = list.filter((p) => p.price <= state.filters.maxPrice);

      if (state.filters.sort === "price_asc") list.sort((a, b) => a.price - b.price);
      else if (state.filters.sort === "price_desc") list.sort((a, b) => b.price - a.price);
      else if (state.filters.sort === "bestseller") list.sort((a, b) => Number(b.bestseller) - Number(a.bestseller));

      const grid = document.getElementById("gb-catalog-grid");
      const countEl = document.getElementById("gb-catalog-count");
      if (countEl) countEl.textContent = `${t("catalog.showing")} ${list.length} ${t("catalog.products_of")} ${(DATA.products || []).length}`;
      if (grid) {
        grid.innerHTML = list.length
          ? list.map(renderProductCard).join("")
          : `<div class="gb-glass-card" style="grid-column:1/-1;text-align:center">${t("catalog.no_results")}</div>`;
      }
    };

    const getCatCount = (slug) =>
      slug === "all"
        ? (DATA.products || []).length
        : slug === "offers"
        ? (DATA.products || []).filter((p) => p.discount > 0).length
        : (DATA.products || []).filter((p) => p.category === slug).length;

    container.innerHTML = `
      <div class="gb-view-panel">
        <div class="gb-section-head">
          <div>
            <h1 class="gb-section-title">${
              state.filters.category === "all"
                ? t("catalog.title")
                : (DATA.categories.find((c) => c.slug === state.filters.category)?.name[state.lang] || t("catalog.title"))
            }</h1>
            <p class="gb-section-subtitle" id="gb-catalog-count"></p>
          </div>
          <div class="gb-catalog-controls">
            <button type="button" class="gb-mobile-filter-toggle" id="gb-toggle-sidebar-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              <span>${t("catalog.toggle_filters")}</span>
            </button>
            <div class="gb-sort-wrap" id="gb-sort-wrap">
              <button type="button" class="gb-sort-trigger" id="gb-sort-trigger" aria-haspopup="true" aria-expanded="false">
                <span id="gb-sort-label">${t(`catalog.sort_${state.filters.sort}`)}</span>
                <svg class="gb-select-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div class="gb-lang-popover gb-sort-menu" id="gb-sort-menu" role="menu" aria-hidden="true">
                <button type="button" class="gb-lang-option ${state.filters.sort === "newest" ? "is-active" : ""}" data-sort-val="newest">${t("catalog.sort_newest")}</button>
                <button type="button" class="gb-lang-option ${state.filters.sort === "bestseller" ? "is-active" : ""}" data-sort-val="bestseller">${t("catalog.sort_bestseller")}</button>
                <button type="button" class="gb-lang-option ${state.filters.sort === "price_asc" ? "is-active" : ""}" data-sort-val="price_asc">${t("catalog.sort_price_asc")}</button>
                <button type="button" class="gb-lang-option ${state.filters.sort === "price_desc" ? "is-active" : ""}" data-sort-val="price_desc">${t("catalog.sort_price_desc")}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="gb-catalog-layout">
          <aside class="gb-filter-sidebar" id="gb-filter-sidebar">
            <div class="gb-filter-header">
              <span class="gb-filter-title">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                <span>${t("catalog.filters")}</span>
              </span>
              <button type="button" class="gb-filter-reset-link" id="gb-reset-filters">${t("catalog.clear_filters")}</button>
            </div>

            <div class="gb-filter-group">
              <div class="gb-sidebar-search">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
                <input type="search" id="gb-sidebar-search-input" value="${state.filters.query}" placeholder="${t("catalog.search_placeholder")}" />
              </div>
            </div>

            <div class="gb-filter-group">
              <h4><span>${t("catalog.category")}</span></h4>
              <div class="gb-cat-filter-list">
                <button type="button" class="gb-cat-filter-row ${state.filters.category === "all" ? "is-active" : ""}" data-cat="all">
                  <span>${t("categories.all")}</span>
                  <span class="gb-cat-count-pill">${getCatCount("all")}</span>
                </button>
                ${(DATA.categories || [])
                  .map(
                    (c) => `<button type="button" class="gb-cat-filter-row ${state.filters.category === c.slug ? "is-active" : ""}" data-cat="${c.slug}">
                      <span>${c.name[state.lang]}</span>
                      <span class="gb-cat-count-pill">${getCatCount(c.slug)}</span>
                    </button>`
                  )
                  .join("")}
              </div>
            </div>

            <div class="gb-filter-group">
              <h4><span>${t("catalog.max_price")}</span><strong id="gb-price-val" style="color:var(--accent-gold)">${formatMoney(state.filters.maxPrice)}</strong></h4>
              <input type="range" class="gb-range-slider" min="40" max="100" value="${state.filters.maxPrice}" id="gb-price-range" />
            </div>

            <div class="gb-filter-group">
              <h4><span>${t("catalog.color")}</span></h4>
              <div class="gb-filter-colors">
                <button type="button" class="gb-chip-btn ${state.filters.color === "all" ? "is-active" : ""}" data-fcolor="all">${t("catalog.rating_all")}</button>
                ${COLOR_MAP.map(
                  (c) => `<button type="button" class="gb-fcolor-btn ${state.filters.color === c.key ? "is-active" : ""}" data-fcolor="${c.key}" style="--fswatch:${c.hex}" aria-label="${c.key}"></button>`
                ).join("")}
              </div>
            </div>

            <div class="gb-filter-group">
              <h4><span>${t("catalog.size")}</span></h4>
              <div class="gb-filter-chips">
                <button type="button" class="gb-chip-btn ${state.filters.size === "all" ? "is-active" : ""}" data-fsize="all">${t("catalog.rating_all")}</button>
                ${[39, 40, 41, 42, 43, 44, 45]
                  .map((s) => `<button type="button" class="gb-chip-btn ${String(state.filters.size) === String(s) ? "is-active" : ""}" data-fsize="${s}">${s}</button>`)
                  .join("")}
              </div>
            </div>

            <div class="gb-filter-group">
              <h4><span>${t("catalog.min_rating")}</span></h4>
              <div class="gb-filter-chips">
                <button type="button" class="gb-chip-btn ${state.filters.minRating === 0 ? "is-active" : ""}" data-frating="0">${t("catalog.rating_all")}</button>
                <button type="button" class="gb-chip-btn ${state.filters.minRating === 4.7 ? "is-active" : ""}" data-frating="4.7">★ 4.7+</button>
                <button type="button" class="gb-chip-btn ${state.filters.minRating === 4.9 ? "is-active" : ""}" data-frating="4.9">★ 4.9+</button>
              </div>
            </div>

            <div class="gb-filter-group">
              <h4><span>${t("catalog.quick_toggles")}</span></h4>
              <div class="gb-toggle-list">
                <label class="gb-toggle-row"><span>${t("catalog.on_sale_only")}</span><input type="checkbox" id="gb-f-sale" ${state.filters.onSale ? "checked" : ""} /></label>
                <label class="gb-toggle-row"><span>${t("catalog.new_only")}</span><input type="checkbox" id="gb-f-new" ${state.filters.isNew ? "checked" : ""} /></label>
                <label class="gb-toggle-row"><span>${t("catalog.bestseller_only")}</span><input type="checkbox" id="gb-f-best" ${state.filters.bestseller ? "checked" : ""} /></label>
              </div>
            </div>
          </aside>
          <div class="gb-product-grid gb-catalog-grid" id="gb-catalog-grid"></div>
        </div>
      </div>
    `;

    document.getElementById("gb-toggle-sidebar-btn")?.addEventListener("click", () => {
      document.getElementById("gb-filter-sidebar")?.classList.toggle("is-open");
    });
    document.getElementById("gb-sidebar-search-input")?.addEventListener("input", (e) => {
      state.filters.query = e.target.value.trim();
      applyFilters();
    });
    container.querySelectorAll("[data-cat]").forEach((btn) =>
      btn.addEventListener("click", () => {
        state.filters.category = btn.dataset.cat;
        container.querySelectorAll("[data-cat]").forEach((b) => b.classList.toggle("is-active", b === btn));
        applyFilters();
      })
    );
    container.querySelectorAll("[data-fcolor]").forEach((btn) =>
      btn.addEventListener("click", () => {
        state.filters.color = btn.dataset.fcolor;
        container.querySelectorAll("[data-fcolor]").forEach((b) => b.classList.toggle("is-active", b === btn));
        applyFilters();
      })
    );
    container.querySelectorAll("[data-fsize]").forEach((btn) =>
      btn.addEventListener("click", () => {
        state.filters.size = btn.dataset.fsize;
        container.querySelectorAll("[data-fsize]").forEach((b) => b.classList.toggle("is-active", b === btn));
        applyFilters();
      })
    );
    container.querySelectorAll("[data-frating]").forEach((btn) =>
      btn.addEventListener("click", () => {
        state.filters.minRating = Number(btn.dataset.frating);
        container.querySelectorAll("[data-frating]").forEach((b) => b.classList.toggle("is-active", b === btn));
        applyFilters();
      })
    );
    document.getElementById("gb-f-sale")?.addEventListener("change", (e) => { state.filters.onSale = e.target.checked; applyFilters(); });
    document.getElementById("gb-f-new")?.addEventListener("change", (e) => { state.filters.isNew = e.target.checked; applyFilters(); });
    document.getElementById("gb-f-best")?.addEventListener("change", (e) => { state.filters.bestseller = e.target.checked; applyFilters(); });

    const range = document.getElementById("gb-price-range");
    if (range) {
      range.addEventListener("input", () => {
        state.filters.maxPrice = Number(range.value);
        document.getElementById("gb-price-val").innerHTML = formatMoney(state.filters.maxPrice);
        applyFilters();
      });
    }
    const sortTrigger = document.getElementById("gb-sort-trigger");
    const sortMenu = document.getElementById("gb-sort-menu");
    if (sortTrigger && sortMenu) {
      sortTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = sortMenu.classList.toggle("is-open");
        sortMenu.setAttribute("aria-hidden", String(!open));
        sortTrigger.setAttribute("aria-expanded", String(open));
      });
      sortMenu.querySelectorAll("[data-sort-val]").forEach((opt) => {
        opt.addEventListener("click", () => {
          state.filters.sort = opt.dataset.sortVal;
          document.getElementById("gb-sort-label").textContent = opt.textContent;
          sortMenu.querySelectorAll("[data-sort-val]").forEach((o) => o.classList.toggle("is-active", o === opt));
          sortMenu.classList.remove("is-open");
          sortMenu.setAttribute("aria-hidden", "true");
          sortTrigger.setAttribute("aria-expanded", "false");
          applyFilters();
        });
      });
      document.addEventListener("click", (e) => {
        if (!e.target.closest("#gb-sort-wrap")) {
          sortMenu.classList.remove("is-open");
          sortMenu.setAttribute("aria-hidden", "true");
          sortTrigger.setAttribute("aria-expanded", "false");
        }
      });
    }
    document.getElementById("gb-reset-filters")?.addEventListener("click", () => {
      state.filters = { category: "all", maxPrice: 100, color: "all", size: "all", sort: "newest", query: "", minRating: 0, onSale: false, isNew: false, bestseller: false };
      renderCatalogView(container, "all");
    });

    applyFilters();
  };

  const renderProductDetailView = (container, slug) => {
    const product = (DATA.products || []).find((p) => p.slug === slug) || DATA.products[0];
    let selectedSize = product.sizes[0] || 42;
    let selectedColor = product.colors[0] || "orange";
    let qty = 1;
    const related = (DATA.products || []).filter((p) => p.id !== product.id).slice(0, 4);
    const catObj = DATA.categories.find((c) => c.slug === product.category);
    const catName = catObj ? catObj.name[state.lang] : product.category;
    const installmentAmt = formatMoney(product.price / 4);

    const COLOR_HEX = {
      orange: "#FF6B1A",
      black: "#222328",
      white: "#F1F5F9",
      pink: "#EC4899",
      red: "#EF4444",
      green: "#10B981",
      emerald: "#10B981",
      blue: "#3B82F6",
      gold: "#FBBF24"
    };

    const longParas = (product.longDescription && product.longDescription[state.lang]) || [
      product.description[state.lang],
      state.lang === "ar"
        ? `تم تطوير ${product.name.ar} بمعايير جودة دقيقة تضمن الراحة طوال اليوم، مع تهوية متوازنة وتصميم عصري يناسب الأداء الرياضي والإطلالات اليومية.`
        : `${product.name.en} is crafted to strict quality standards for all-day comfort, balanced breathability, and versatile performance.`
    ];

    const renderFullDescHtml = () => `
      <div style="display:flex;flex-direction:column;gap:14px">
        ${longParas.map((p) => `<p class="gb-pdp-desc">${p}</p>`).join("")}
        <div class="gb-glass-card" style="padding:16px 18px;margin-top:4px">
          <strong style="display:block;color:var(--accent-gold);margin-bottom:6px;font-size:0.92rem">${t("product.care_title")}</strong>
          <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7">${t("product.care_desc")}</p>
        </div>
      </div>
    `;

    container.innerHTML = `
      <div class="gb-view-panel">
        <nav class="gb-pdp-breadcrumb" aria-label="Breadcrumb">
          <a href="#/">${t("nav.home")}</a>
          <span>›</span>
          <a href="#/category/${product.category}">${catName}</a>
          <span>›</span>
          <span style="color:var(--text-primary)">${product.name[state.lang]}</span>
        </nav>

        <div class="gb-pdp-grid">
          <div class="gb-pdp-stage">
            <div class="gb-pdp-stage-top">
              ${
                product.discount
                  ? `<span class="gb-card-badge">${t("product.discount_badge")} ${product.discount}%</span>`
                  : product.isNew
                  ? `<span class="gb-card-badge is-new">${t("product.new_badge")}</span>`
                  : `<span></span>`
              }
              <button type="button" class="gb-wish-btn ${state.wishlist.includes(product.id) ? "is-active" : ""}" data-wish-id="${product.id}" aria-label="${t("product.add_wishlist")}">${ICON_HEART}</button>
            </div>
            <img src="${product.gallery[0]}" alt="${product.name[state.lang]}" class="gb-pdp-main-img" id="gb-pdp-img" />
            <div class="gb-pdp-thumbs">
              ${product.gallery
                .map(
                  (img, idx) =>
                    `<button type="button" class="gb-thumb-btn ${idx === 0 ? "is-active" : ""}" data-pdp-img="${img}"><img src="${img}" alt="" /></button>`
                )
                .join("")}
            </div>
          </div>

          <div class="gb-pdp-info">
            <div class="gb-pdp-meta-row">
              <span class="gb-hero-category-pill" style="margin-bottom:0"><span class="gb-dot"></span><span>${catName}</span></span>
              <span class="gb-stock-pill">● ${t("product.in_stock")}</span>
            </div>

            <h1 class="gb-pdp-title">${product.name[state.lang]}</h1>

            <div style="display:flex;align-items:center;flex-wrap:wrap;gap:14px">
              <span class="gb-stars">${"★".repeat(Math.round(product.rating))}</span>
              <span style="font-size:0.86rem;color:var(--text-secondary)">${product.rating} (${product.reviews} ${t("product.reviews_count")})</span>
              <span style="font-size:0.8rem;color:var(--text-muted)">${t("product.sku_label")}: GB-${product.id.toUpperCase()}</span>
            </div>

            <div class="gb-price-row">
              <span class="gb-price-current">${formatMoney(product.price)}</span>
              ${product.oldPrice ? `<span class="gb-price-old" style="margin-top:0">${formatMoney(product.oldPrice)}</span>` : ""}
              ${product.discount ? `<span class="gb-discount-pill">${product.discount}% ${t("hero.discount_suffix")}</span>` : ""}
            </div>

            <div class="gb-installment-box">
              <span>${t("product.installment_prefix")} <strong style="color:var(--accent-gold)">${installmentAmt}</strong> ${t("product.installment_suffix")}</span>
              <div style="display:flex;gap:6px">
                <span class="gb-pay-badge gb-pay-tabby" style="height:24px;padding:2px 8px;font-size:0.72rem;font-weight:900;color:#0b1915">tabby</span>
                <span class="gb-pay-badge gb-pay-tamara" style="height:24px;padding:2px 8px;font-size:0.72rem;font-weight:900;color:#181412">tamara</span>
              </div>
            </div>

            <p class="gb-pdp-desc">${product.description[state.lang]}</p>

            <div class="gb-control-group">
              <span class="gb-control-label">${t("product.color")}</span>
              <div class="gb-color-swatches">
                ${product.colors
                  .map(
                    (c, i) =>
                      `<button type="button" class="gb-color-swatch ${i === 0 ? "is-active" : ""}" data-pdp-color="${c}" data-pdp-color-idx="${i}" style="--swatch:${COLOR_HEX[c] || "#FF6B1A"}" aria-label="${c}"></button>`
                  )
                  .join("")}
              </div>
            </div>

            <div class="gb-control-group">
              <div class="gb-pdp-size-head">
                <span class="gb-control-label">${t("product.size")}</span>
                <button type="button" class="gb-size-guide-btn" id="gb-size-guide-toggle">${t("product.size_guide")}</button>
              </div>
              <div class="gb-size-guide-note" id="gb-size-guide-note" hidden>${t("product.size_guide_tip")}</div>
              <div class="gb-size-grid" style="display:flex;flex-wrap:wrap;gap:10px">
                ${product.sizes
                  .map((s, i) => `<button type="button" class="gb-size-btn ${i === 0 ? "is-active" : ""}" data-pdp-size="${s}">${s}</button>`)
                  .join("")}
              </div>
            </div>

            <div class="gb-pdp-actions">
              <div class="gb-pdp-qty" aria-label="${t("product.quantity")}">
                <button type="button" class="gb-qty-btn" id="gb-pdp-qty-minus">−</button>
                <span id="gb-pdp-qty-val">1</span>
                <button type="button" class="gb-qty-btn" id="gb-pdp-qty-plus">+</button>
              </div>
              <button type="button" class="gb-cta-capsule" id="gb-pdp-add">${t("product.add_to_cart")}</button>
              <button type="button" class="gb-hero-secondary-btn" id="gb-pdp-buy">${t("product.buy_now")}</button>
            </div>

            <div class="gb-pdp-trust">
              <div class="gb-trust-chip">${t("product.trust_fast")}</div>
              <div class="gb-trust-chip">${t("product.trust_return")}</div>
              <div class="gb-trust-chip">${t("product.trust_authentic")}</div>
            </div>
          </div>
        </div>

        <!-- Product Details Tabs -->
        <div class="gb-pdp-tabs-panel">
          <div class="gb-tabs-bar">
            <button type="button" class="gb-tab-btn is-active" data-pdp-tab="desc">${t("product.full_desc_tab")}</button>
            <button type="button" class="gb-tab-btn" data-pdp-tab="specs">${t("product.specs")}</button>
            <button type="button" class="gb-tab-btn" data-pdp-tab="reviews">${t("product.reviews_tab")} (${product.reviews})</button>
            <button type="button" class="gb-tab-btn" data-pdp-tab="shipping">${t("product.shipping_tab")}</button>
          </div>
          <div id="gb-pdp-tab-content">
            ${renderFullDescHtml()}
          </div>
        </div>
      </div>

      <section class="gb-section" style="margin-top:40px">
        <div class="gb-section-head"><h2 class="gb-section-title">${t("product.related_title")}</h2></div>
        <div class="gb-product-grid">${related.map(renderProductCard).join("")}</div>
      </section>
    `;

    container.querySelectorAll("[data-pdp-img]").forEach((btn) =>
      btn.addEventListener("click", () => {
        document.getElementById("gb-pdp-img").src = btn.dataset.pdpImg;
        container.querySelectorAll("[data-pdp-img]").forEach((b) => b.classList.toggle("is-active", b === btn));
      })
    );
    container.querySelectorAll("[data-pdp-color]").forEach((btn) =>
      btn.addEventListener("click", () => {
        selectedColor = btn.dataset.pdpColor;
        container.querySelectorAll("[data-pdp-color]").forEach((b) => b.classList.toggle("is-active", b === btn));
        const idx = Number(btn.dataset.pdpColorIdx);
        if (product.gallery[idx]) {
          document.getElementById("gb-pdp-img").src = product.gallery[idx];
          container.querySelectorAll("[data-pdp-img]").forEach((b, i) => b.classList.toggle("is-active", i === idx));
        }
      })
    );
    container.querySelectorAll("[data-pdp-size]").forEach((btn) =>
      btn.addEventListener("click", () => {
        selectedSize = Number(btn.dataset.pdpSize);
        container.querySelectorAll("[data-pdp-size]").forEach((b) => b.classList.toggle("is-active", b === btn));
      })
    );
    document.getElementById("gb-size-guide-toggle")?.addEventListener("click", () => {
      const note = document.getElementById("gb-size-guide-note");
      if (note) note.hidden = !note.hidden;
    });
    document.getElementById("gb-pdp-qty-minus")?.addEventListener("click", () => {
      if (qty > 1) { qty -= 1; document.getElementById("gb-pdp-qty-val").textContent = qty; }
    });
    document.getElementById("gb-pdp-qty-plus")?.addEventListener("click", () => {
      qty += 1; document.getElementById("gb-pdp-qty-val").textContent = qty;
    });
    container.querySelectorAll("[data-pdp-tab]").forEach((btn) =>
      btn.addEventListener("click", () => {
        container.querySelectorAll("[data-pdp-tab]").forEach((b) => b.classList.toggle("is-active", b === btn));
        const box = document.getElementById("gb-pdp-tab-content");
        if (!box) return;
        const tab = btn.dataset.pdpTab;
        if (tab === "desc") {
          box.innerHTML = renderFullDescHtml();
        } else if (tab === "specs") {
          box.innerHTML = `<ul class="gb-specs-list">${(product.specs[state.lang] || []).map((s) => `<li>✓ ${s}</li>`).join("")}</ul>`;
        } else if (tab === "reviews") {
          box.innerHTML = `<div class="gb-testimonials-grid">${(DATA.testimonials || [])
            .map((item) => `<article class="gb-glass-card gb-testimonial-card"><div class="gb-stars">${"★".repeat(item.rating)}</div><p class="gb-quote">"${item.quote[state.lang]}"</p><strong>${item.name[state.lang]}</strong></article>`)
            .join("")}</div>`;
        } else {
          box.innerHTML = `<p class="gb-pdp-desc">${t("product.shipping_tab_desc")}</p>`;
        }
      })
    );
    document.getElementById("gb-pdp-add")?.addEventListener("click", () => addToCart(product.id, selectedSize, selectedColor, qty));
    document.getElementById("gb-pdp-buy")?.addEventListener("click", async () => {
      await addToCart(product.id, selectedSize, selectedColor, qty);
      openDrawer("gb-cart-drawer");
    });
  };

  /* ------------------------------------------------------------------------
     Cart & Wishlist Drawers + Live Search
     ------------------------------------------------------------------------ */
  const renderCartDrawer = () => {
    const body = document.getElementById("gb-cart-items");
    const foot = document.getElementById("gb-cart-footer");
    if (!body || !foot) return;

    if (!state.cart.length) {
      body.innerHTML = `<div style="text-align:center;padding:40px 12px"><h3>${t("cart.empty_title")}</h3><p style="color:var(--text-muted);margin:8px 0 18px">${t("cart.empty_desc")}</p><a href="#/shop" class="gb-cta-capsule" data-close-drawer>${t("cart.browse")}</a></div>`;
      foot.innerHTML = "";
      return;
    }

    let subtotal = 0;
    body.innerHTML = state.cart
      .map((item, idx) => {
        const p = (DATA.products || []).find((x) => x.id === item.id);
        if (!p) return "";
        subtotal += p.price * item.qty;
        return `
          <div class="gb-cart-item">
            <img src="${p.image}" alt="${p.name[state.lang]}" />
            <div style="flex:1">
              <strong style="font-size:0.9rem">${p.name[state.lang]}</strong>
              <div style="font-size:0.78rem;color:var(--text-muted)">${t("product.size")}: ${item.size}</div>
              <div class="gb-qty-row">
                <button type="button" class="gb-qty-btn" data-qty="${idx}:-1">-</button>
                <span>${item.qty}</span>
                <button type="button" class="gb-qty-btn" data-qty="${idx}:1">+</button>
                <button type="button" style="font-size:0.76rem;color:#fca5a5;margin-inline-start:10px" data-rem="${idx}">${t("cart.remove")}</button>
              </div>
            </div>
            <strong>${formatMoney(p.price * item.qty)}</strong>
          </div>
        `;
      })
      .join("");

    foot.innerHTML = `
      <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span>${t("cart.subtotal")}</span><strong>${formatMoney(subtotal)}</strong></div>
      <div style="display:flex;justify-content:space-between;margin-bottom:14px;color:var(--accent-emerald)"><span>${t("cart.shipping")}</span><strong>${t("cart.shipping_free")}</strong></div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <a href="#/checkout" class="gb-cta-capsule" style="width:100%" data-close-drawer>${t("cart.checkout")}</a>
        <a href="#/cart" class="gb-hero-secondary-btn" style="width:100%" data-close-drawer>${t("cart.view_full_cart")}</a>
      </div>
    `;
  };

  const renderWishlistDrawer = () => {
    const body = document.getElementById("gb-wishlist-items");
    if (!body) return;
    if (!state.wishlist.length) {
      body.innerHTML = `<div style="text-align:center;padding:40px 12px"><h3>${t("wishlist.empty_title")}</h3><p style="color:var(--text-muted);margin-top:8px">${t("wishlist.empty_desc")}</p></div>`;
      return;
    }
    body.innerHTML = state.wishlist
      .map((id) => {
        const p = (DATA.products || []).find((x) => x.id === id);
        if (!p) return "";
        return `
          <div class="gb-cart-item">
            <img src="${p.image}" alt="${p.name[state.lang]}" />
            <div style="flex:1">
              <a href="#/product/${p.slug}" data-close-drawer><strong>${p.name[state.lang]}</strong></a>
              <div style="color:var(--accent-gold);font-weight:800">${formatMoney(p.price)}</div>
            </div>
            <button type="button" class="gb-add-mini-btn" data-add-id="${p.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 7h12l1 12H5L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>
            <span>${t("product.add_to_cart")}</span>
          </button>
          </div>
        `;
      })
      .join("");
  };

  const openDrawer = (id) => {
    document.getElementById(id)?.classList.add("is-open");
    document.getElementById(id)?.setAttribute("aria-hidden", "false");
  };

  const closeAllOverlays = () => {
    document.querySelectorAll(".gb-drawer, .gb-search-modal").forEach((el) => {
      el.classList.remove("is-open");
      el.setAttribute("aria-hidden", "true");
    });
  };

  /* ------------------------------------------------------------------------
     Router & Language Switcher
     ------------------------------------------------------------------------ */
  const homeOriginalHtml = document.getElementById("gb-dynamic-view")?.innerHTML || "";

  const handleRoute = () => {
    const hash = window.location.hash || "#/";
    const heroSec = document.querySelector(".gb-hero-section");
    const dyn = document.getElementById("gb-dynamic-view");
    if (!dyn) return;

    document.querySelectorAll(".gb-pill-item, .gb-mobile-nav-link").forEach((a) => {
      const target = a.getAttribute("href");
      a.classList.toggle("is-active", target === hash || (hash.startsWith("#/category") && target === "#/categories"));
    });
    closeAllOverlays();

    if (hash === "#/" || hash === "") {
      if (heroSec) heroSec.style.display = "";
      dyn.innerHTML = homeOriginalHtml;
      syncI18nTexts();
      renderHomeSections();
    } else if (hash.startsWith("#/product/")) {
      if (heroSec) heroSec.style.display = "none";
      renderProductDetailView(dyn, hash.replace("#/product/", ""));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (hash === "#/shop" || hash === "#/categories" || hash === "#/offers" || hash.startsWith("#/category/")) {
      if (heroSec) heroSec.style.display = "none";
      const cat = hash === "#/offers" ? "offers" : hash.startsWith("#/category/") ? hash.replace("#/category/", "") : "all";
      renderCatalogView(dyn, cat);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (hash === "#/cart") {
      if (heroSec) heroSec.style.display = "none";
      renderCartPage(dyn);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (hash === "#/checkout") {
      if (heroSec) heroSec.style.display = "none";
      renderCheckoutPage(dyn);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (hash === "#/thank-you") {
      if (heroSec) heroSec.style.display = "none";
      renderThankYouPage(dyn);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (hash === "#/about") {
      if (heroSec) heroSec.style.display = "none";
      renderAboutView(dyn);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (hash === "#/contact") {
      if (heroSec) heroSec.style.display = "none";
      renderContactView(dyn);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getCartTotals = () => {
    const subtotal = state.cart.reduce((sum, item) => {
      const p = (DATA.products || []).find((x) => x.id === item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
    const discount = subtotal * state.couponDiscount;
    const total = Math.max(0, subtotal - discount);
    return { subtotal, discount, total };
  };

  const renderCartPage = (container) => {
    if (!state.cart.length) {
      container.innerHTML = `
        <div class="gb-view-panel" style="text-align:center;padding:60px 24px">
          <div class="gb-feature-icon" style="margin:0 auto 18px">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 7h12l1.2 12.5a1.5 1.5 0 0 1-1.5 1.5H6.3a1.5 1.5 0 0 1-1.5-1.5L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>
          </div>
          <h1 class="gb-section-title" style="margin-bottom:8px">${t("cart.empty_title")}</h1>
          <p class="gb-section-subtitle" style="margin-bottom:24px">${t("cart.empty_desc")}</p>
          <a href="#/shop" class="gb-cta-capsule">${t("cart.browse")}</a>
        </div>
      `;
      return;
    }

    const { subtotal, discount, total } = getCartTotals();
    container.innerHTML = `
      <div class="gb-view-panel">
        <nav class="gb-pdp-breadcrumb" aria-label="Breadcrumb">
          <a href="#/">${t("nav.home")}</a><span>›</span><span style="color:var(--text-primary)">${t("cart.title")}</span>
        </nav>
        <h1 class="gb-section-title" style="margin-bottom:18px">${t("cart.title")}</h1>
        <div class="gb-shipping-banner">✓ ${t("cart.free_shipping_unlocked")}</div>

        <div class="gb-checkout-grid">
          <div style="display:flex;flex-direction:column;gap:14px">
            ${state.cart
              .map((item, idx) => {
                const p = (DATA.products || []).find((x) => x.id === item.id);
                if (!p) return "";
                return `
                  <article class="gb-cart-page-item">
                    <a href="#/product/${p.slug}"><img src="${p.image}" alt="${p.name[state.lang]}" /></a>
                    <div>
                      <a href="#/product/${p.slug}" style="font-weight:800;font-size:1rem">${p.name[state.lang]}</a>
                      <div style="font-size:0.82rem;color:var(--text-muted);margin:4px 0 10px">${t("product.size")}: ${item.size}</div>
                      <div class="gb-qty-row" style="margin-top:0">
                        <button type="button" class="gb-qty-btn" data-qty="${idx}:-1">−</button>
                        <span>${item.qty}</span>
                        <button type="button" class="gb-qty-btn" data-qty="${idx}:1">+</button>
                        <button type="button" style="font-size:0.8rem;color:#fca5a5;margin-inline-start:12px" data-rem="${idx}">${t("cart.remove")}</button>
                      </div>
                    </div>
                    <strong style="font-size:1.05rem">${formatMoney(p.price * item.qty)}</strong>
                  </article>
                `;
              })
              .join("")}
          </div>

          <aside class="gb-summary-card">
            <h2 style="font-size:1.15rem;font-weight:800">${t("checkout.order_summary")}</h2>
            <form class="gb-coupon-row" id="gb-coupon-form">
              <input type="text" id="gb-coupon-input" placeholder="${t("cart.coupon_placeholder")}" />
              <button type="submit" class="gb-hero-secondary-btn" style="min-height:40px;padding:0 16px;font-size:0.82rem">${t("cart.coupon_apply")}</button>
            </form>
            <div class="gb-summary-line"><span>${t("cart.subtotal")}</span><strong>${formatMoney(subtotal)}</strong></div>
            ${discount > 0 ? `<div class="gb-summary-line" style="color:var(--accent-emerald)"><span>${t("cart.discount")} (10%)</span><strong>-${formatMoney(discount)}</strong></div>` : ""}
            <div class="gb-summary-line" style="color:var(--accent-emerald)"><span>${t("cart.shipping")}</span><strong>${t("cart.shipping_free")}</strong></div>
            <div class="gb-summary-line gb-summary-total"><span>${t("cart.total")}</span><span>${formatMoney(total)}</span></div>
            <a href="#/checkout" class="gb-cta-capsule" style="width:100%">${t("cart.checkout")}</a>
            <a href="#/shop" class="gb-hero-secondary-btn" style="width:100%">${t("cart.continue_shopping")}</a>
          </aside>
        </div>
      </div>
    `;

    document.getElementById("gb-coupon-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const code = document.getElementById("gb-coupon-input")?.value.trim().toUpperCase();
      if (code === "GREEN10") {
        state.couponDiscount = 0.1;
        showToast(t("cart.coupon_applied"));
        renderCartPage(container);
      } else {
        showToast(t("cart.coupon_invalid"));
      }
    });
  };

  const renderCheckoutPage = (container) => {
    if (!state.cart.length) {
      window.location.hash = "#/cart";
      return;
    }
    const { subtotal, discount, total } = getCartTotals();
    let selectedPay = "mada";

    container.innerHTML = `
      <div class="gb-view-panel">
        <nav class="gb-pdp-breadcrumb" aria-label="Breadcrumb">
          <a href="#/">${t("nav.home")}</a><span>›</span><a href="#/cart">${t("cart.title")}</a><span>›</span><span style="color:var(--text-primary)">${t("checkout.title")}</span>
        </nav>
        <h1 class="gb-section-title" style="margin-bottom:24px">${t("checkout.title")}</h1>

        <form class="gb-checkout-grid" id="gb-checkout-form">
          <div style="display:flex;flex-direction:column;gap:22px">
            <div class="gb-glass-card" style="display:flex;flex-direction:column;gap:14px">
              <h2 style="font-size:1.1rem;font-weight:800">${t("checkout.shipping_info")}</h2>
              <div class="gb-form-grid">
                <input class="gb-input" name="fullName" type="text" required placeholder="${t("checkout.full_name")}" />
                <input class="gb-input" name="phone" type="tel" required placeholder="${t("checkout.phone")}" />
              </div>
              <div class="gb-form-grid">
                <input class="gb-input" name="email" type="email" required placeholder="${t("checkout.email")}" />
                <select class="gb-input" name="city" aria-label="${t("checkout.city")}">
                  <option value="${t("checkout.city_riyadh")}">${t("checkout.city_riyadh")}</option>
                  <option value="${t("checkout.city_jeddah")}">${t("checkout.city_jeddah")}</option>
                  <option value="${t("checkout.city_dammam")}">${t("checkout.city_dammam")}</option>
                  <option value="${t("checkout.city_makkah")}">${t("checkout.city_makkah")}</option>
                  <option value="${t("checkout.city_madinah")}">${t("checkout.city_madinah")}</option>
                </select>
              </div>
              <input class="gb-input" name="address" type="text" required placeholder="${t("checkout.address")}" />
            </div>

            <div class="gb-glass-card" style="display:flex;flex-direction:column;gap:14px">
              <h2 style="font-size:1.1rem;font-weight:800">${t("checkout.delivery_method")}</h2>
              <div class="gb-pay-options">
                <label class="gb-pay-option is-active"><input type="radio" name="delivery" value="express" checked /><span>${t("checkout.delivery_express")}</span></label>
                <label class="gb-pay-option"><input type="radio" name="delivery" value="pickup" /><span>${t("checkout.delivery_pickup")}</span></label>
              </div>
            </div>

            <div class="gb-glass-card" style="display:flex;flex-direction:column;gap:14px">
              <h2 style="font-size:1.1rem;font-weight:800">${t("checkout.payment_method")}</h2>
              <div class="gb-pay-options" id="gb-pay-options">
                <label class="gb-pay-option is-active" data-pay="mada"><input type="radio" name="payment" value="mada" checked /><span>${t("checkout.pay_mada")}</span></label>
                <label class="gb-pay-option" data-pay="card"><input type="radio" name="payment" value="card" /><span>${t("checkout.pay_card")}</span></label>
                <label class="gb-pay-option" data-pay="apple"><input type="radio" name="payment" value="apple" /><span>${t("checkout.pay_apple")}</span></label>
                <label class="gb-pay-option" data-pay="tabby"><input type="radio" name="payment" value="tabby" /><span>${t("checkout.pay_tabby")}</span></label>
                <label class="gb-pay-option" data-pay="tamara"><input type="radio" name="payment" value="tamara" /><span>${t("checkout.pay_tamara")}</span></label>
                <label class="gb-pay-option" data-pay="cod"><input type="radio" name="payment" value="cod" /><span>${t("checkout.pay_cod")}</span></label>
              </div>
              <div id="gb-card-fields" hidden style="display:none;flex-direction:column;gap:10px;margin-top:6px">
                <input class="gb-input" type="text" placeholder="${t("checkout.card_number")}" />
                <div class="gb-form-grid">
                  <input class="gb-input" type="text" placeholder="${t("checkout.card_expiry")}" />
                  <input class="gb-input" type="text" placeholder="${t("checkout.card_cvv")}" />
                </div>
              </div>
            </div>
          </div>

          <aside class="gb-summary-card">
            <h2 style="font-size:1.15rem;font-weight:800">${t("checkout.order_summary")}</h2>
            <div style="display:flex;flex-direction:column;gap:10px;max-height:240px;overflow-y:auto">
              ${state.cart
                .map((item) => {
                  const p = (DATA.products || []).find((x) => x.id === item.id);
                  if (!p) return "";
                  return `<div style="display:flex;align-items:center;gap:10px;font-size:0.84rem"><img src="${p.image}" alt="" style="width:48px;height:40px;object-fit:contain" /><div style="flex:1"><strong>${p.name[state.lang]}</strong><div style="color:var(--text-muted)">×${item.qty} (${item.size})</div></div><strong>${formatMoney(p.price * item.qty)}</strong></div>`;
                })
                .join("")}
            </div>
            <div class="gb-summary-line"><span>${t("cart.subtotal")}</span><strong>${formatMoney(subtotal)}</strong></div>
            ${discount > 0 ? `<div class="gb-summary-line" style="color:var(--accent-emerald)"><span>${t("cart.discount")}</span><strong>-${formatMoney(discount)}</strong></div>` : ""}
            <div class="gb-summary-line" style="color:var(--accent-emerald)"><span>${t("cart.shipping")}</span><strong>${t("cart.shipping_free")}</strong></div>
            <div class="gb-summary-line gb-summary-total"><span>${t("cart.total")}</span><span>${formatMoney(total)}</span></div>
            <button type="submit" class="gb-cta-capsule" style="width:100%">${t("checkout.place_order")}</button>
            <p style="font-size:0.76rem;color:var(--text-muted);text-align:center">${t("checkout.secure_note")}</p>
          </aside>
        </form>
      </div>
    `;

    container.querySelectorAll("#gb-pay-options [data-pay]").forEach((opt) => {
      opt.addEventListener("click", () => {
        selectedPay = opt.dataset.pay;
        container.querySelectorAll("#gb-pay-options [data-pay]").forEach((o) => o.classList.toggle("is-active", o === opt));
        const cf = document.getElementById("gb-card-fields");
        if (cf) cf.style.display = selectedPay === "card" || selectedPay === "mada" ? "flex" : "none";
      });
    });

    document.getElementById("gb-checkout-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const payLabel = t(`checkout.pay_${selectedPay}`);
      const order = {
        id: `GB-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString(state.lang === "ar" ? "ar-SA" : "en-US"),
        customer: fd.get("fullName"),
        city: fd.get("city"),
        address: fd.get("address"),
        payment: payLabel,
        items: [...state.cart],
        subtotal,
        discount,
        total
      };
      state.lastOrder = order;
      localStorage.setItem("gb_last_order_v1", JSON.stringify(order));
      state.cart = [];
      state.couponDiscount = 0;
      persistCart();
      window.location.hash = "#/thank-you";
    });
  };

  const renderThankYouPage = (container) => {
    const order = state.lastOrder || {
      id: "GB-202699",
      date: new Date().toLocaleDateString(state.lang === "ar" ? "ar-SA" : "en-US"),
      customer: "GreenBird Guest",
      city: t("checkout.city_riyadh"),
      address: t("contact.info_loc_val"),
      payment: t("checkout.pay_mada"),
      items: [{ id: "ua-basketball-pro", size: 42, qty: 1 }],
      total: 49.95
    };

    container.innerHTML = `
      <div class="gb-view-panel">
        <div class="gb-thankyou-hero">
          <div class="gb-success-ring" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
          <span class="gb-hero-category-pill"><span class="gb-dot"></span><span>${t("thankyou.badge")}</span></span>
          <h1 class="gb-section-title" style="margin-bottom:8px">${t("thankyou.title")}</h1>
          <p class="gb-section-subtitle">${t("thankyou.subtitle")}</p>
        </div>

        <div class="gb-order-steps">
          <div class="gb-order-step is-done">✓ ${t("thankyou.step_confirmed")}</div>
          <div class="gb-order-step is-current">● ${t("thankyou.step_preparing")}</div>
          <div class="gb-order-step">${t("thankyou.step_shipping")}</div>
          <div class="gb-order-step">${t("thankyou.step_delivered")}</div>
        </div>

        <div class="gb-stats-grid" style="margin-bottom:24px">
          <div class="gb-glass-card gb-stat-card" style="padding:18px"><span class="gb-stat-label">${t("thankyou.order_no")}</span><strong class="gb-stat-num" style="font-size:1.25rem;margin-top:6px" dir="ltr">#${order.id}</strong></div>
          <div class="gb-glass-card gb-stat-card" style="padding:18px"><span class="gb-stat-label">${t("thankyou.order_date")}</span><strong class="gb-stat-num" style="font-size:1.1rem;margin-top:6px">${order.date}</strong></div>
          <div class="gb-glass-card gb-stat-card" style="padding:18px"><span class="gb-stat-label">${t("thankyou.payment_used")}</span><strong class="gb-stat-num" style="font-size:1rem;margin-top:6px">${order.payment}</strong></div>
          <div class="gb-glass-card gb-stat-card" style="padding:18px"><span class="gb-stat-label">${t("cart.total")}</span><strong class="gb-stat-num" style="font-size:1.25rem;margin-top:6px">${formatMoney(order.total)}</strong></div>
        </div>

        <div class="gb-glass-card" style="margin-bottom:24px">
          <h2 style="font-size:1.08rem;font-weight:800;margin-bottom:14px">${t("thankyou.items_title")}</h2>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${(order.items || [])
              .map((item) => {
                const p = (DATA.products || []).find((x) => x.id === item.id);
                if (!p) return "";
                return `<div class="gb-cart-item"><img src="${p.image}" alt="" /><div style="flex:1"><strong>${p.name[state.lang]}</strong><div style="font-size:0.78rem;color:var(--text-muted)">${t("product.size")}: ${item.size} • ${t("product.quantity")}: ${item.qty}</div></div><strong>${formatMoney(p.price * item.qty)}</strong></div>`;
              })
              .join("")}
          </div>
          <div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.1);font-size:0.86rem;color:var(--text-secondary)">
            <strong>${t("thankyou.shipping_to")}:</strong> ${order.city} — ${order.address}
          </div>
        </div>

        <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px">
          <a href="#/shop" class="gb-cta-capsule">${t("cart.continue_shopping")}</a>
          <button type="button" class="gb-hero-secondary-btn" id="gb-print-order-btn">${t("thankyou.print_invoice")}</button>
          <a href="#/" class="gb-hero-secondary-btn">${t("thankyou.back_home")}</a>
        </div>
      </div>
    `;

    document.getElementById("gb-print-order-btn")?.addEventListener("click", () => window.print());
  };

  const renderAboutView = (container) => {
    container.innerHTML = `
      <div class="gb-store-sections">
        <!-- About Hero -->
        <section class="gb-view-panel gb-about-hero">
          <div>
            <span class="gb-hero-category-pill"><span class="gb-dot"></span><span>${t("about.badge")}</span></span>
            <h1 class="gb-hero-title" style="font-size:clamp(1.9rem,3.2vw,2.8rem)">${t("about.title")}</h1>
            <p style="font-size:1.1rem;font-weight:700;color:var(--accent-gold);margin-bottom:12px">${t("about.subtitle")}</p>
            <p class="gb-hero-desc">${t("about.body")}</p>
            <a href="#/shop" class="gb-cta-capsule">${t("about.cta")}</a>
          </div>
          <div class="gb-promo-visual">
            <img src="assets/images/products/gold-elite.png" alt="GreenBird Footwear" class="gb-promo-shoe" />
          </div>
        </section>

        <!-- Stats Strip -->
        <section class="gb-stats-grid">
          <div class="gb-glass-card gb-stat-card"><strong class="gb-stat-num">${t("about.stats.customers_num")}</strong><span class="gb-stat-label">${t("about.stats.customers_label")}</span></div>
          <div class="gb-glass-card gb-stat-card"><strong class="gb-stat-num">${t("about.stats.models_num")}</strong><span class="gb-stat-label">${t("about.stats.models_label")}</span></div>
          <div class="gb-glass-card gb-stat-card"><strong class="gb-stat-num">${t("about.stats.rating_num")}</strong><span class="gb-stat-label">${t("about.stats.rating_label")}</span></div>
          <div class="gb-glass-card gb-stat-card"><strong class="gb-stat-num">${t("about.stats.delivery_num")}</strong><span class="gb-stat-label">${t("about.stats.delivery_label")}</span></div>
        </section>

        <!-- Vision & Mission -->
        <section class="gb-split-2">
          <article class="gb-glass-card gb-feature-card">
            <div class="gb-feature-icon" aria-hidden="true">${ICONS.target}</div>
            <h3>${t("about.vision_title")}</h3>
            <p>${t("about.vision_desc")}</p>
          </article>
          <article class="gb-glass-card gb-feature-card">
            <div class="gb-feature-icon" aria-hidden="true">${ICONS.trend}</div>
            <h3>${t("about.mission_title")}</h3>
            <p>${t("about.mission_desc")}</p>
          </article>
        </section>

        <!-- Core Values -->
        <section>
          <div class="gb-section-head"><h2 class="gb-section-title">${t("about.values_title")}</h2></div>
          <div class="gb-features-grid">
            <article class="gb-glass-card gb-feature-card"><div class="gb-feature-icon" aria-hidden="true">${ICONS.shield}</div><h3>${t("about.val1_title")}</h3><p>${t("about.val1_desc")}</p></article>
            <article class="gb-glass-card gb-feature-card"><div class="gb-feature-icon" aria-hidden="true">${ICONS.bolt}</div><h3>${t("about.val2_title")}</h3><p>${t("about.val2_desc")}</p></article>
            <article class="gb-glass-card gb-feature-card"><div class="gb-feature-icon" aria-hidden="true">${ICONS.layers}</div><h3>${t("about.val3_title")}</h3><p>${t("about.val3_desc")}</p></article>
            <article class="gb-glass-card gb-feature-card"><div class="gb-feature-icon" aria-hidden="true">${ICONS.award}</div><h3>${t("about.val4_title")}</h3><p>${t("about.val4_desc")}</p></article>
          </div>
        </section>

        <!-- Journey Timeline -->
        <section class="gb-view-panel">
          <h2 class="gb-section-title" style="margin-bottom:20px">${t("about.timeline_title")}</h2>
          <div class="gb-timeline-grid">
            <article class="gb-glass-card">
              <span class="gb-milestone-year">${t("about.m1_year")}</span>
              <h3 style="margin-bottom:6px">${t("about.m1_title")}</h3>
              <p style="color:var(--text-secondary);font-size:0.9rem">${t("about.m1_desc")}</p>
            </article>
            <article class="gb-glass-card">
              <span class="gb-milestone-year">${t("about.m2_year")}</span>
              <h3 style="margin-bottom:6px">${t("about.m2_title")}</h3>
              <p style="color:var(--text-secondary);font-size:0.9rem">${t("about.m2_desc")}</p>
            </article>
            <article class="gb-glass-card">
              <span class="gb-milestone-year">${t("about.m3_year")}</span>
              <h3 style="margin-bottom:6px">${t("about.m3_title")}</h3>
              <p style="color:var(--text-secondary);font-size:0.9rem">${t("about.m3_desc")}</p>
            </article>
          </div>
        </section>
      </div>
    `;
  };

  const renderContactView = (container) => {
    container.innerHTML = `
      <div class="gb-store-sections">
        <section class="gb-view-panel">
          <span class="gb-hero-category-pill"><span class="gb-dot"></span><span>${t("contact.badge")}</span></span>
          <h1 class="gb-section-title">${t("contact.title")}</h1>
          <p class="gb-section-subtitle" style="margin-bottom:28px">${t("contact.subtitle")}</p>

          <div class="gb-contact-grid">
            <!-- Direct Contact Form -->
            <form id="gb-contact-form" style="display:flex;flex-direction:column;gap:14px">
              <h2 style="font-size:1.2rem;font-weight:800;margin-bottom:4px">${t("contact.form_title")}</h2>
              <div class="gb-form-grid">
                <input class="gb-input" type="text" required placeholder="${t("contact.name")}" />
                <input class="gb-input" type="email" required placeholder="${t("contact.email")}" />
              </div>
              <div class="gb-form-grid">
                <input class="gb-input" type="tel" required placeholder="${t("contact.phone")}" />
                <input class="gb-input" type="text" placeholder="${t("contact.order_no")}" />
              </div>
              <select class="gb-input" aria-label="${t("contact.subject")}">
                <option value="order">${t("contact.subject_order")}</option>
                <option value="size">${t("contact.subject_size")}</option>
                <option value="return">${t("contact.subject_return")}</option>
                <option value="partner">${t("contact.subject_partner")}</option>
              </select>
              <textarea class="gb-textarea" required rows="4" placeholder="${t("contact.message")}"></textarea>
              <div>
                <button type="submit" class="gb-cta-capsule">${t("contact.send")}</button>
              </div>
            </form>

            <!-- Contact Info Cards -->
            <div class="gb-info-stack">
              <div class="gb-info-card">
                <div class="gb-info-icon" aria-hidden="true">${ICONS.mail}</div>
                <div>
                  <strong>${t("contact.info_email_title")}</strong>
                  <div style="color:var(--text-secondary);font-size:0.9rem;margin-top:2px">${t("contact.info_email_val")}</div>
                </div>
              </div>
              <div class="gb-info-card">
                <div class="gb-info-icon" aria-hidden="true">${ICONS.phone}</div>
                <div>
                  <strong>${t("contact.info_phone_title")}</strong>
                  <span class="gb-live-tag">${t("contact.live_badge")}</span>
                  <div style="color:var(--text-secondary);font-size:0.9rem;margin-top:2px" dir="ltr">${t("contact.info_phone_val")}</div>
                </div>
              </div>
              <div class="gb-info-card">
                <div class="gb-info-icon" aria-hidden="true">${ICONS.clock}</div>
                <div>
                  <strong>${t("contact.info_hours_title")}</strong>
                  <div style="color:var(--text-secondary);font-size:0.9rem;margin-top:2px">${t("contact.info_hours_val")}</div>
                </div>
              </div>
              <div class="gb-info-card">
                <div class="gb-info-icon" aria-hidden="true">${ICONS.pin}</div>
                <div>
                  <strong>${t("contact.info_loc_title")}</strong>
                  <div style="color:var(--text-secondary);font-size:0.9rem;margin-top:2px">${t("contact.info_loc_val")}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Interactive FAQ Accordion -->
        <section class="gb-view-panel">
          <h2 class="gb-section-title" style="margin-bottom:18px">${t("contact.faq_title")}</h2>
          <div class="gb-faq-list" id="gb-faq-list">
            ${[1, 2, 3, 4]
              .map(
                (i) => `
              <div class="gb-faq-item ${i === 1 ? "is-open" : ""}">
                <button type="button" class="gb-faq-q">
                  <span>${t(`contact.faq${i}_q`)}</span>
                  ${ICONS.chevron}
                </button>
                <div class="gb-faq-a">${t(`contact.faq${i}_a`)}</div>
              </div>
            `
              )
              .join("")}
          </div>
        </section>
      </div>
    `;

    document.getElementById("gb-contact-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast(t("contact.sent_success"));
      e.target.reset();
    });

    container.querySelectorAll(".gb-faq-q").forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.closest(".gb-faq-item")?.classList.toggle("is-open");
      });
    });
  };

  const syncI18nTexts = () => {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
  };

  const applyLanguage = async (lang) => {
    state.lang = lang;
    localStorage.setItem(STORAGE_LANG, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    if (!state.locales[lang]) {
      try {
        const res = await fetch(`locales/${lang}.json`);
        state.locales[lang] = await res.json();
      } catch (_) {}
    }

    syncI18nTexts();
    document.title = `${t("meta.store_name")} — ${t("meta.store_tagline")}`;
    // Sync static header nav & hero text when switching languages
    const navKeys = { "#/": "nav.home", "#/shop": "nav.shop", "#/categories": "nav.categories", "#/offers": "nav.offers", "#/about": "nav.about", "#/contact": "nav.contact" };
    document.querySelectorAll(".gb-pill-item").forEach((a) => {
      const k = navKeys[a.getAttribute("href")];
      if (k) a.textContent = t(k);
    });
    document.querySelectorAll(".gb-mobile-nav-link").forEach((a) => {
      const k = navKeys[a.getAttribute("href")];
      const lbl = a.querySelector(".gb-mnav-label");
      if (k && lbl) lbl.textContent = t(k);
    });
    document.querySelectorAll("[data-lang-opt]").forEach((seg) => {
      seg.classList.toggle("is-active", seg.dataset.langOpt === lang);
    });
    document.querySelectorAll("[data-set-lang]").forEach((opt) => {
      opt.classList.toggle("is-active", opt.dataset.setLang === lang);
    });
    const miniCode = document.getElementById("gb-lang-mini-code");
    if (miniCode) miniCode.textContent = lang.toUpperCase();
    const heroTitle = document.getElementById("gb-hero-title");
    if (heroTitle) {
      heroTitle.innerHTML = lang === "ar" ? "حذاء كرة سلة<br />أندر آرمر الاحترافي" : "Under Armour<br />Basketball Shoe";
    }
    const heroDesc = document.getElementById("gb-hero-desc");
    const heroProduct = (DATA.products || []).find((p) => p.id === "ua-basketball-pro");
    if (heroDesc && heroProduct) heroDesc.textContent = heroProduct.description[lang];
    const heroAdd = document.querySelector("#gb-hero-quick-add span");
    if (heroAdd) heroAdd.textContent = t("product.add_to_cart");
    const heroCtaSpan = document.querySelector("#gb-hero-cta span");
    if (heroCtaSpan) heroCtaSpan.textContent = lang === "ar" ? "تسوق الآن" : "Shop Now";
    const heroCatSpan = document.querySelector(".gb-hero-category-pill span:last-child");
    if (heroCatSpan) heroCatSpan.textContent = t("categories.basketball");
    const autoLabel = document.getElementById("gb-autoplay-label");
    if (autoLabel) autoLabel.textContent = t(state.autoplay ? "hero.autoplay_on" : "hero.autoplay_off");

    renderHomeSections();
    renderCartDrawer();
    renderWishlistDrawer();
    handleRoute();
  };

  /* ------------------------------------------------------------------------
     Init & Event Delegation
     ------------------------------------------------------------------------ */
  const initCountdown = () => {
    const target = Date.now() + 3 * 86400000 + 14 * 3600000;
    setInterval(() => {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = String(v).padStart(2, "0"); };
      set("cd-days", d); set("cd-hours", h); set("cd-mins", m); set("cd-secs", s);
    }, 1000);
  };

  const applyBuyerTestOverrides = () => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("test");
    if (!mode) return;
    window.SALLA_THEME_CONFIG = window.SALLA_THEME_CONFIG || {};
    if (mode === "empty") {
      DATA.products = [];
      DATA.categories = [];
      window.SALLA_THEME_CONFIG.heroShow = false;
    } else if (mode === "hide_3") {
      window.SALLA_THEME_CONFIG.showPromo = false;
      window.SALLA_THEME_CONFIG.showTestimonials = false;
      window.SALLA_THEME_CONFIG.showNewsletter = false;
    } else if (mode === "custom_brand") {
      document.documentElement.style.setProperty("--bg-top", "#0F766E");
      document.documentElement.style.setProperty("--bg-bottom", "#14B8A6");
      const title = document.getElementById("gb-hero-title");
      if (title) title.textContent = "متجر النخبة الرياضي";
      const ctaSpan = document.querySelector("#gb-hero-cta span");
      if (ctaSpan) ctaSpan.textContent = "اكتشف الآن";
    }
  };

  const init = async () => {
    applyBuyerTestOverrides();
    try {
      const [ar, en] = await Promise.all([fetch("locales/ar.json").then((r) => r.json()), fetch("locales/en.json").then((r) => r.json())]);
      state.locales = { ar, en };
    } catch (_) {}

    renderBadges();
    renderHomeSections();
    renderCartDrawer();
    renderWishlistDrawer();
    startAutoplay();
    initCountdown();
    handleRoute();

    window.addEventListener("hashchange", handleRoute);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAllOverlays();
    });

    document.addEventListener("click", (e) => {
      const colorBtn = e.target.closest("#gb-hero-colors [data-color], #gb-hero-thumbs [data-color]");
      if (colorBtn) return setHeroColor(colorBtn.dataset.color, true);

      const sizeBtn = e.target.closest("#gb-hero-sizes [data-size]");
      if (sizeBtn) {
        state.heroSize = Number(sizeBtn.dataset.size);
        document.querySelectorAll("#gb-hero-sizes .gb-size-btn").forEach((b) => b.classList.toggle("is-active", b === sizeBtn));
        return;
      }

      if (e.target.closest("#gb-hero-quick-add")) return addToCart("ua-basketball-pro", state.heroSize, state.heroColor, 1);
      if (e.target.closest("#gb-autoplay-toggle")) {
        state.autoplay = !state.autoplay;
        e.target.closest("#gb-autoplay-toggle").setAttribute("aria-pressed", String(state.autoplay));
        document.getElementById("gb-autoplay-label").textContent = t(state.autoplay ? "hero.autoplay_on" : "hero.autoplay_off");
        if (state.autoplay) startAutoplay();
        else clearInterval(state.autoplayTimer);
        return;
      }

      const addBtn = e.target.closest("[data-add-id]");
      if (addBtn) {
        addToCart(addBtn.dataset.addId, 42, null, 1);
        addBtn.classList.add("is-added");
        setTimeout(() => addBtn.classList.remove("is-added"), 950);
        return;
      }

      const wishBtn = e.target.closest("[data-wish-id]");
      if (wishBtn) return toggleWishlist(wishBtn.dataset.wishId);

      const qtyBtn = e.target.closest("[data-qty]");
      if (qtyBtn) {
        const [idx, delta] = qtyBtn.dataset.qty.split(":").map(Number);
        if (state.cart[idx]) {
          state.cart[idx].qty += delta;
          if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
          persistCart();
        }
        return;
      }

      const remBtn = e.target.closest("[data-rem]");
      if (remBtn) {
        state.cart.splice(Number(remBtn.dataset.rem), 1);
        persistCart();
        return;
      }

      if (e.target.closest("#gb-cart-trigger")) return openDrawer("gb-cart-drawer");
      if (e.target.closest("#gb-wishlist-trigger")) return openDrawer("gb-wishlist-drawer");
      if (e.target.closest("#gb-search-trigger")) {
        openDrawer("gb-search-modal");
        setTimeout(() => document.getElementById("gb-live-search-input")?.focus(), 60);
        return;
      }
      if (e.target.closest("[data-close-drawer]") || e.target.closest("[data-close-search]")) return closeAllOverlays();
      if (e.target.closest("#gb-checkout-btn")) return showToast(t("cart.checkout_notice"));
      if (e.target.closest("#gb-lang-toggle")) {
        const pop = document.getElementById("gb-lang-popover");
        const btn = document.getElementById("gb-lang-toggle");
        if (pop) {
          const open = pop.classList.toggle("is-open");
          pop.setAttribute("aria-hidden", String(!open));
          btn?.setAttribute("aria-expanded", String(open));
        }
        return;
      }
      const setLangBtn = e.target.closest("[data-set-lang]");
      if (setLangBtn) {
        document.getElementById("gb-lang-popover")?.classList.remove("is-open");
        document.getElementById("gb-lang-toggle")?.setAttribute("aria-expanded", "false");
        return applyLanguage(setLangBtn.dataset.setLang);
      }
      if (!e.target.closest(".gb-lang-wrap")) {
        document.getElementById("gb-lang-popover")?.classList.remove("is-open");
        document.getElementById("gb-lang-toggle")?.setAttribute("aria-expanded", "false");
      }
      if (e.target.closest("#gb-drawer-lang-toggle")) return applyLanguage(state.lang === "ar" ? "en" : "ar");
      if (e.target.closest("#gb-mobile-menu-trigger")) {
        const drawer = document.getElementById("gb-mobile-drawer");
        if (drawer?.classList.contains("is-open")) closeAllOverlays();
        else openDrawer("gb-mobile-drawer");
        return;
      }
    });

    document.getElementById("gb-live-search-input")?.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      const box = document.getElementById("gb-live-search-results");
      if (!box) return;
      if (!q) {
        box.innerHTML = `<p style="color:var(--text-muted);padding:10px">${t("header.search_empty")}</p>`;
        return;
      }
      const hits = (DATA.products || []).filter(
        (p) =>
          p.name.ar.toLowerCase().includes(q) ||
          p.name.en.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.colors.some((c) => c.toLowerCase().includes(q))
      );
      box.innerHTML = hits.length
        ? hits
            .map(
              (p) => `
          <a href="#/product/${p.slug}" class="gb-cart-item" data-close-search>
            <img src="${p.image}" alt="${p.name[state.lang]}" />
            <div style="flex:1"><strong>${p.name[state.lang]}</strong></div>
            <strong>${formatMoney(p.price)}</strong>
          </a>`
            )
            .join("")
        : `<p style="color:var(--text-muted);padding:10px">${t("header.search_no_results")}</p>`;
    });

    document.getElementById("gb-newsletter-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast(t("newsletter.success"));
      e.target.reset();
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
