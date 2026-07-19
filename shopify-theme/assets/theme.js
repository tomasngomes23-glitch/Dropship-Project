// Velory theme JS — vanilla replacements for what Framer Motion did in the
// React version. Each section below is self-contained; sections wire up
// their own extra behavior (cart, accordion, counters, etc.) but share the
// two globals here: cursor glow + scroll-reveal.

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
   * Scroll-reveal: replaces Framer Motion's `whileInView` fade/slide-up.
   * Any element with [data-reveal] starts hidden (via CSS) and gets
   * .is-visible added the first time it scrolls into view. An optional
   * data-reveal-delay="150" (ms) staggers entrances, matching the index*
   * delay pattern used throughout the React components.
   * ------------------------------------------------------------------- */
  function initScrollReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var delay = el.getAttribute("data-reveal-delay");
          if (delay) el.style.setProperty("--reveal-delay", delay + "ms");
          el.classList.add("is-visible");
          observer.unobserve(el);
        });
      },
      { rootMargin: "-80px 0px", threshold: 0.05 },
    );

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------------------------------------------------------------------
   * Cursor glow: soft radial-gradient blob that trails the mouse with lag,
   * desktop/fine-pointer only. Ported near-verbatim from CursorGlow.tsx —
   * same rAF + lerp technique, just direct DOM instead of a React ref.
   * ------------------------------------------------------------------- */
  function initCursorGlow() {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    var el = document.querySelector("[data-cursor-glow]");
    if (!el) return;

    var raf = 0;
    var x = window.innerWidth / 2;
    var y = window.innerHeight / 2;
    var targetX = x;
    var targetY = y;

    function onMove(e) {
      targetX = e.clientX;
      targetY = e.clientY;
    }

    function tick() {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      el.style.transform = "translate3d(" + x + "px, " + y + "px, 0) translate(-50%, -50%)";
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
  }

  /* ---------------------------------------------------------------------
   * Money formatting — mirrors Shopify's shop.money_format (e.g. "{{amount}}
   * kr"), so cart numbers rendered by JS match what Liquid renders on load.
   * ------------------------------------------------------------------- */
  function formatMoney(cents, format) {
    format = format || (window.theme && window.theme.moneyFormat) || "{{amount}} kr";
    var value = (cents / 100).toFixed(2);
    var noDecimals = Math.round(cents / 100).toString();
    var withComma = value.replace(".", ",");
    var noDecimalsWithComma = noDecimals;
    return format
      .replace(/\{\{\s*amount_no_decimals_with_comma_separator\s*\}\}/g, noDecimalsWithComma)
      .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/g, withComma)
      .replace(/\{\{\s*amount_no_decimals\s*\}\}/g, noDecimals)
      .replace(/\{\{\s*amount\s*\}\}/g, value);
  }

  /* ---------------------------------------------------------------------
   * Header: adds a blurred background past 8px of scroll — replaces the
   * `scrolled` state + conditional className in Navbar.tsx.
   * ------------------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.querySelector("[data-header]");
    if (!header) return;
    function onScroll() {
      var scrolled = window.scrollY > 8;
      header.classList.toggle("bg-neutral-950/85", scrolled);
      header.classList.toggle("backdrop-blur-lg", scrolled);
      header.classList.toggle("border-b", scrolled);
      header.classList.toggle("border-white/10", scrolled);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------------------
   * Sticky buy bar: visible once scrolled past the hero, hidden again once
   * the footer scrolls into view — same thresholds as StickyBuyBar.tsx.
   * ------------------------------------------------------------------- */
  function initStickyBar() {
    var bar = document.querySelector("[data-sticky-bar]");
    if (!bar) return;
    var footer = document.querySelector("footer");

    function onScroll() {
      var pastHero = window.scrollY > 700;
      var overFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      var visible = pastHero && !overFooter;
      if (visible) {
        bar.setAttribute("data-open", "");
      } else {
        bar.removeAttribute("data-open");
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  /* ---------------------------------------------------------------------
   * Sparkle burst — 12-particle fly-out effect on Add to Cart, ported from
   * SparkleBurst.tsx (same trig-based random positions/colors/timing).
   * ------------------------------------------------------------------- */
  var SPARKLE_COLORS = ["#5eead4", "#a855f7", "#f472b6", "#facc15", "#38bdf8"];

  function fireSparkleBurst(originEl) {
    if (!originEl) return;
    var rect = originEl.getBoundingClientRect();
    var originX = rect.left + rect.width / 2;
    var originY = rect.top + rect.height / 2;

    for (var i = 0; i < 12; i++) {
      var angle = (Math.PI * 2 * i) / 12 + (Math.random() - 0.5) * 0.4;
      var distance = 60 + Math.random() * 60;
      var tx = Math.cos(angle) * distance;
      var ty = Math.sin(angle) * distance;
      var delay = Math.random() * 0.15;
      var color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];

      var span = document.createElement("span");
      span.setAttribute("aria-hidden", "true");
      span.style.cssText =
        "position:fixed;left:" +
        originX +
        "px;top:" +
        originY +
        "px;width:6px;height:6px;border-radius:9999px;pointer-events:none;z-index:60;" +
        "background:" +
        color +
        ";--tx:" +
        tx +
        "px;--ty:" +
        ty +
        "px;animation:sparkle-out 0.6s ease-out " +
        delay +
        "s forwards;";
      document.body.appendChild(span);
      span.addEventListener("animationend", function () {
        this.remove();
      });
    }
  }

  /* ---------------------------------------------------------------------
   * Cart: native AJAX Cart API (/cart/add.js, /cart/change.js, /cart.js)
   * replaces the entire Storefront-API CartContext.tsx. Quantity naturally
   * accumulates per variant on repeated /cart/add.js calls, same as the
   * React version's manual qtyRef accumulation — no extra bookkeeping
   * needed here.
   * ------------------------------------------------------------------- */
  function initCart() {
    var backdrop = document.querySelector("[data-cart-backdrop]");
    var drawer = document.querySelector("[data-cart-drawer]");
    if (!drawer) return;

    function openCart() {
      if (backdrop) backdrop.setAttribute("data-open", "");
      drawer.setAttribute("data-open", "");
      document.body.style.overflow = "hidden";
    }

    function closeCart() {
      if (backdrop) backdrop.removeAttribute("data-open");
      drawer.removeAttribute("data-open");
      document.body.style.overflow = "";
    }

    function renderCart(cart) {
      var badge = document.querySelector("[data-cart-count]");
      if (badge) {
        badge.textContent = cart.item_count;
        badge.classList.toggle("hidden", cart.item_count === 0);
      }

      var empty = document.querySelector("[data-cart-empty]");
      var filled = document.querySelector("[data-cart-filled]");
      if (empty) empty.classList.toggle("hidden", cart.item_count > 0);
      if (filled) filled.classList.toggle("hidden", cart.item_count === 0);
      if (cart.item_count === 0) return;

      var line = cart.items[0];
      var qtyLabel = document.querySelector("[data-cart-qty-label]");
      if (qtyLabel) qtyLabel.textContent = cart.item_count === 1 ? "Single" : "Qty: " + cart.item_count;

      var priceEl = document.querySelector("[data-cart-price]");
      if (priceEl) priceEl.textContent = formatMoney(cart.total_price);

      var subtotalEl = document.querySelector("[data-cart-subtotal]");
      if (subtotalEl) subtotalEl.textContent = formatMoney(cart.total_price);

      var hasSavings = cart.original_total_price > cart.total_price;
      var compareEl = document.querySelector("[data-cart-compare]");
      if (compareEl) {
        compareEl.textContent = formatMoney(cart.original_total_price);
        compareEl.classList.toggle("hidden", !hasSavings);
      }
      var savingsEl = document.querySelector("[data-cart-savings]");
      if (savingsEl) {
        savingsEl.textContent = formatMoney(cart.original_total_price - cart.total_price);
        savingsEl.closest("div").classList.toggle("hidden", !hasSavings);
      }
    }

    function fetchCart() {
      return fetch("/cart.js").then(function (r) {
        return r.json();
      });
    }

    function addToCart(variantId, quantity, triggerEl) {
      return fetch("/cart/add.js", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ items: [{ id: variantId, quantity: quantity }] }),
      })
        .then(function () {
          if (triggerEl) fireSparkleBurst(triggerEl);
          return fetchCart();
        })
        .then(function (cart) {
          renderCart(cart);
          openCart();
        })
        .catch(function (err) {
          console.error("Add to cart failed", err);
        });
    }

    function clearCart() {
      fetch("/cart/clear.js", { method: "POST", headers: { Accept: "application/json" } })
        .then(function (r) {
          return r.json();
        })
        .then(renderCart);
    }

    document.addEventListener("click", function (e) {
      var addBtn = e.target.closest("[data-add-to-cart]");
      if (addBtn) {
        var variantId = addBtn.getAttribute("data-variant-id");
        var quantity = parseInt(addBtn.getAttribute("data-quantity") || "1", 10);
        if (variantId) addToCart(variantId, quantity, addBtn);
        return;
      }

      if (e.target.closest("[data-cart-toggle]")) {
        openCart();
        return;
      }

      if (e.target.closest("[data-cart-close]") || e.target === backdrop) {
        closeCart();
        return;
      }

      if (e.target.closest("[data-cart-clear]")) {
        clearCart();
      }
    });

    // Keep the header badge in sync with whatever the cart already holds
    // when the page loads (e.g. after a full navigation/reload).
    fetchCart().then(renderCart);
  }

  /* ---------------------------------------------------------------------
   * Hero bundle selector — clicking Buy 1/2/3 swaps the displayed price,
   * compare-at, savings badge, and the Add to Cart button's quantity.
   * Mirrors Hero.tsx's `selected` state, just without React re-rendering.
   * ------------------------------------------------------------------- */
  var SELECTED_CLASSES = ["border-teal-400", "bg-teal-400/10", "shadow-[0_0_0_1px_rgba(45,212,191,0.5)]"];
  var DEFAULT_CLASSES = ["border-white/10", "bg-white/[0.03]", "hover:border-white/25"];

  function initBundleSelector() {
    var buttons = document.querySelectorAll("[data-bundle-btn]");
    if (!buttons.length) return;

    var priceDisplay = document.querySelector("[data-price-display]");
    var compareDisplay = document.querySelector("[data-compare-display]");
    var saveBadge = document.querySelector("[data-save-badge]");
    var ctaPrice = document.querySelector("[data-cta-price]");
    var addToCartBtn = document.querySelector("[data-add-to-cart]");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.classList.remove.apply(b.classList, SELECTED_CLASSES);
          b.classList.add.apply(b.classList, DEFAULT_CLASSES);
        });
        btn.classList.remove.apply(btn.classList, DEFAULT_CLASSES);
        btn.classList.add.apply(btn.classList, SELECTED_CLASSES);

        var price = formatMoney(parseInt(btn.getAttribute("data-price"), 10));
        if (priceDisplay) priceDisplay.textContent = price;
        if (ctaPrice) ctaPrice.textContent = price;
        if (compareDisplay) compareDisplay.textContent = formatMoney(parseInt(btn.getAttribute("data-compare"), 10));
        if (saveBadge) saveBadge.textContent = btn.getAttribute("data-save-label");
        if (addToCartBtn) addToCartBtn.setAttribute("data-quantity", btn.getAttribute("data-qty"));
      });
    });
  }

  /* ---------------------------------------------------------------------
   * Stats count-up — replaces StatsSection.tsx's Counter (useInView + rAF,
   * same 1200ms cubic ease-out).
   * ------------------------------------------------------------------- */
  function initCounters() {
    var counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    function animateCounter(el) {
      var target = parseInt(el.getAttribute("data-counter-target"), 10) || 0;
      var duration = 1200;
      var start = performance.now();

      function tick(now) {
        var progress = Math.min((now - start) / duration, 1);
        var value = Math.round(target * (1 - Math.pow(1 - progress, 3)));
        el.textContent = value + "%";
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "-40px 0px" },
    );
    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------------------------------------------------------------------
   * FAQ accordion — one item open at a time, first one open by default.
   * Height animation is pure CSS (accordion-rows grid-template-rows
   * trick); this just toggles data-open and the border/icon states.
   * ------------------------------------------------------------------- */
  function initFaqAccordion() {
    var items = document.querySelectorAll("[data-faq-item]");
    if (!items.length) return;

    items.forEach(function (item) {
      var trigger = item.querySelector("[data-faq-trigger]");
      var panel = item.querySelector("[data-faq-panel]");
      var icon = item.querySelector("[data-faq-icon]");

      trigger.addEventListener("click", function () {
        var isOpen = panel.hasAttribute("data-open");

        items.forEach(function (other) {
          var otherPanel = other.querySelector("[data-faq-panel]");
          var otherIcon = other.querySelector("[data-faq-icon]");
          otherPanel.removeAttribute("data-open");
          otherIcon.classList.remove("rotate-45");
          other.classList.remove("border-teal-400/30");
          other.classList.add("border-white/10");
        });

        if (!isOpen) {
          panel.setAttribute("data-open", "");
          icon.classList.add("rotate-45");
          item.classList.remove("border-white/10");
          item.classList.add("border-teal-400/30");
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initScrollReveal();
    initCursorGlow();
    initHeaderScroll();
    initStickyBar();
    initCart();
    initBundleSelector();
    initCounters();
    initFaqAccordion();
  });
})();
