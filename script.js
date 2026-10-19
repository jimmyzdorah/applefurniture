
/* =========================================================
   APPLE FURNITURE
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     HELPERS
  ===================================================== */

  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];

  const header = $(".site-header");
  const loader = $(".page-loader");
  const mobileMenu = $(".mobile-menu");
  const menuToggle = $(".menu-toggle");
  const mobileClose = $(".mobile-close");

  const searchOverlay = $(".search-overlay");
  const searchToggle = $(".search-toggle");
  const closeSearchButton = $(".close-search");

  const cartCount = $(".cart-count");
  const toast = $(".toast");

  const CART_KEY = "appleFurnitureCart";

  /* =====================================================
     PAGE LOADER
  ===================================================== */

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader?.classList.add("loaded");
    }, 1200);
  });

  // Also handle pages that have already loaded.
  if (document.readyState === "complete") {
    setTimeout(() => {
      loader?.classList.add("loaded");
    }, 1200);
  }

  /* =====================================================
     HEADER SCROLL
  ===================================================== */

  function updateHeader() {
    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 60
    );
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();

  /* =====================================================
     MOBILE MENU
  ===================================================== */

  function openMenu() {
    if (!mobileMenu) return;

    mobileMenu.classList.add("open");
    document.body.classList.add("menu-open");

    menuToggle?.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    mobileMenu?.classList.remove("open");
    document.body.classList.remove("menu-open");

    menuToggle?.setAttribute("aria-expanded", "false");
  }

  menuToggle?.addEventListener("click", openMenu);
  mobileClose?.addEventListener("click", closeMenu);

  $$(".mobile-menu a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  /* =====================================================
     SEARCH
  ===================================================== */

  function openSearch() {
    if (!searchOverlay) return;

    searchOverlay.classList.add("open");
    document.body.classList.add("search-open");

    setTimeout(() => {
      $(".search-field input")?.focus();
    }, 400);
  }

  function closeSearch() {
    searchOverlay?.classList.remove("open");
    document.body.classList.remove("search-open");
  }

  searchToggle?.addEventListener("click", openSearch);

  closeSearchButton?.addEventListener(
    "click",
    closeSearch
  );

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
      closeSearch();
    }
  });

  const searchInput = $(".search-field input");

  searchInput?.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;

    const query = searchInput.value.trim();

    if (!query) return;

    window.location.href =
      `shop.html?search=${encodeURIComponent(query)}`;
  });

  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  const revealElements = $$(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  /* =====================================================
     STAGGER PRODUCT REVEALS
  ===================================================== */

  $$(".product-card").forEach((card, index) => {
    card.style.transitionDelay =
      `${Math.min(index * 100, 500)}ms`;
  });

  /* =====================================================
     HERO PARALLAX
  ===================================================== */

  const heroImages = $$(".hero-image");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let scrollTicking = false;

  function updateParallax() {
    if (reducedMotion.matches) return;

    const scroll = window.scrollY;

    if (scroll < window.innerHeight) {
      heroImages.forEach((image, index) => {
        const movement =
          scroll * (0.08 + index * 0.025);

        image.style.transform =
          `translateY(${movement}px)`;
      });
    }

    scrollTicking = false;
  }

  window.addEventListener("scroll", () => {
    if (scrollTicking) return;

    scrollTicking = true;
    requestAnimationFrame(updateParallax);
  }, {
    passive: true
  });

  /* =====================================================
     CART STORAGE
  ===================================================== */

  function getCart() {
    try {
      const stored = localStorage.getItem(CART_KEY);

      const parsed = stored
        ? JSON.parse(stored)
        : [];

      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn("Unable to read cart:", error);
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
      );

      updateCartCount();

      return true;
    } catch (error) {
      console.warn("Unable to save cart:", error);
      showToast("Unable to save your cart");
      return false;
    }
  }

  function updateCartCount() {
    const cart = getCart();

    const totalItems = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    if (cartCount) {
      cartCount.textContent = totalItems;
    }
  }

  /* =====================================================
     ADD PRODUCT TO CART
  ===================================================== */

  function addToCart(product) {
    const cart = getCart();

    const existingProduct = cart.find(
      item => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    if (saveCart(cart)) {
      showToast(`${product.name} added to cart`);
    }
  }

  $$(".quick-add").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();

      const card = button.closest(".product-card");

      if (!card) return;

      const product = {
        id: card.dataset.productId,
        name: card.dataset.productName,
        price: Number(
          card.dataset.productPrice || 0
        ),
        image: card.dataset.productImage
      };

      if (!product.id || !product.name) {
        showToast("Product information unavailable");
        return;
      }

      addToCart(product);
    });
  });

  updateCartCount();

  /* =====================================================
     TOAST NOTIFICATIONS
  ===================================================== */

  let toastTimer;

  function showToast(message) {
    if (!toast) return;

    const messageElement = $(".toast-message");

    if (messageElement) {
      messageElement.textContent = message;
    }

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  /* =====================================================
     NEWSLETTER DEMO
  ===================================================== */

  const newsletterForm = $(".newsletter-form");

  newsletterForm?.addEventListener("submit", event => {
    event.preventDefault();

    const input = newsletterForm.querySelector("input");

    if (!input || !input.value.trim()) return;

    // Connect this form to a newsletter service
    // before enabling real subscriptions.
    showToast("Newsletter signup coming soon");

    input.value = "";
  });

  /* =====================================================
     CUSTOM CURSOR
  ===================================================== */

  const cursorDot = $(".cursor-dot");
  const cursorRing = $(".cursor-ring");

  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  if (
    cursorDot &&
    cursorRing &&
    finePointer.matches &&
    !reducedMotion.matches
  ) {
    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;

    window.addEventListener("mousemove", event => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }, {
      passive: true
    });

    function animateCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    $$(
      "a, button, input, .product-image, .color-tile"
    ).forEach(element => {
      element.addEventListener("mouseenter", () => {
        cursorRing.classList.add("hover");
      });

      element.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("hover");
      });
    });
  }

  /* =====================================================
     IMAGE LOAD ANIMATIONS
  ===================================================== */

  $$("img").forEach(image => {
    function markLoaded() {
      image.classList.add("loaded");
    }

    if (image.complete) {
      markLoaded();
    } else {
      image.addEventListener(
        "load",
        markLoaded,
        { once: true }
      );
    }
  });

  /* =====================================================
     SMOOTH ANCHOR SCROLL
  ===================================================== */

  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.getElementById(
        targetId.substring(1)
      );

      if (!target) return;

      event.preventDefault();

      const offset =
        (header?.offsetHeight || 0) + 20;

      const position =
        target.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top: position,
        behavior: reducedMotion.matches
          ? "auto"
          : "smooth"
      });
    });
  });

  /* =====================================================
     CART SYNC BETWEEN TABS
  ===================================================== */

  window.addEventListener("storage", event => {
    if (event.key === CART_KEY) {
      updateCartCount();
    }
  });

  /* =====================================================
     INITIALIZATION COMPLETE
  ===================================================== */

  console.log("Apple Furniture website initialized");

});
