
/* =========================================================
   APPLE FURNITURE
   SHOP CATALOGUE — 60 DEMO PRODUCTS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];

  const CART_KEY = "appleFurnitureCart";

  /* =====================================================
     PRODUCT DATABASE
     All prices are SAMPLE UGX prices.
     Replace with confirmed client prices.
  ===================================================== */

  const image = (id, width = 800) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

  const photos = {
    sofa1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk6tNG-31KywGLVOrmpSDDDBCw6F2z1gfe7LtfOc6hTw&s=10",
    sofa2: "https://furnishio.in/cdn/shop/files/luxe-l-shape-sectional-sofa-01-hero.png?v=1783535429",
    sofa3: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb72L6IfxFQmDzLHdyiHdDG1oZFrb8aZM9S9f0_pab9kUrJVG-Uf4_nTfM&s=10",
    sofa4: image("photo-1600607687939-ce8a6c25118c"),
    sofa5: image("photo-1600607687920-4e2a09cf159d"),
    sofa6: image("photo-1618220179428-22790b461013"),



    bed1: image("photo-1505693416388-ac5ce068fe85"),
    bed2: image("photo-1616594039964-ae9021a400a0"),
    bed3: image("photo-1615874959474-d609969a20ed"),
    bed4: image("photo-1616486338812-3dadae4b4ace"),
    bed5: image("photo-1600566753190-17f0baa2a6c3"),

    dining1: image("photo-1617806118233-18e1de247200"),
    dining2: image("photo-1600607687920-4e2a09cf159d"),
    dining3: image("photo-1600210492486-724fe5c67fb0"),
    dining4: image("photo-1618220179428-22790b461013"),

    office1: image("photo-1497366811353-6870744d04b2"),
    office2: image("photo-1497366754035-f200968a6e72"),
    office3: image("photo-1497366216548-37526070297c"),
    office4: image("photo-1497366858526-0766cadbe8fa"),
    storage1: image("photo-1600566753190-17f0baa2a6c3"),

    storage2: image("photo-1616486338812-3dadae4b4ace"),
    storage3: image("photo-1600607687920-4e2a09cf159d"),
    storage4: image("photo-1600210492486-724fe5c67fb0"),
    
    chair1: image("photo-1598300056393-4aac492f4344"),
    chair2: image("photo-1567538096630-e0c55bd6374c"),
    chair3: image("photo-1503602642458-232111445657"),
    chair4: image("photo-1540574163026-643ea20ade25")
  };

  const rawProducts = [

    /* SOFAS — 10 */
    ["AF001","Haven Three-Seater Sofa","sofas",1850000,"cream","sofa1","new",true],
    ["AF002","Luxe L-Shaped Sectional Sofa","sofas",3950000,"grey","sofa2","featured",true],
    ["AF003","Milano Chesterfield Sofa","sofas",3200000,"brown","sofa3","featured",true],
    ["AF004","Nordic Two-Seater Sofa","sofas",1450000,"charcoal","sofa4","",true],
    ["AF005","The Grand Corner Sofa","sofas",4850000,"cream","sofa5","new",true],
    ["AF006","Urban Fabric Three-Seater","sofas",2150000,"grey","sofa6","",true],
    ["AF007","Classic Leather Sofa Set","sofas",5400000,"brown","sofa3","featured",true],
    ["AF008","Cloud Comfort Loveseat","sofas",1250000,"cream","sofa1","",true],
    ["AF009","Executive Recliner Sofa","sofas",2850000,"black","sofa4","sale",true],
    ["AF010","Modern Modular Sofa","sofas",4200000,"charcoal","sofa5","new",false],

    /* BEDS — 10 */
    ["AF011","Serenity Upholstered Bed","beds",1750000,"cream","bed1","featured",true],
    ["AF012","Royal King Size Bed","beds",2950000,"brown","bed2","new",true],
    ["AF013","Minimalist Platform Bed","beds",1150000,"white","bed3","",true],
    ["AF014","Luxury Tufted Headboard Bed","beds",2450000,"grey","bed4","featured",true],
    ["AF015","Oakwood Queen Bed Frame","beds",1650000,"brown","bed5","",true],
    ["AF016","Contemporary Storage Bed","beds",2850000,"charcoal","bed2","new",true],
    ["AF017","Classic Wooden Double Bed","beds",950000,"brown","bed1","",true],
    ["AF018","Velvet King Bed","beds",3250000,"cream","bed4","featured",true],
    ["AF019","Scandinavian Bed Frame","beds",1450000,"white","bed3","",true],
    ["AF020","Deluxe Bedroom Bed Set","beds",4650000,"grey","bed5","sale",false],

    /* DINING — 10 */
    ["AF021","Gather Six-Seater Dining Set","dining",2450000,"brown","dining1","featured",true],
    ["AF022","Modern Four-Seater Dining Set","dining",1450000,"white","dining2","new",true],
    ["AF023","Royal Eight-Seater Dining Set","dining",4850000,"brown","dining3","featured",true],
    ["AF024","Round Marble Dining Table","dining",1950000,"white","dining4","",true],
    ["AF025","Solid Oak Dining Table","dining",2250000,"brown","dining1","",true],
    ["AF026","Compact Breakfast Table Set","dining",750000,"cream","dining2","new",true],
    ["AF027","Luxury Glass Dining Set","dining",3250000,"black","dining3","",true],
    ["AF028","Contemporary Dining Bench","dining",480000,"grey","dining4","",true],
    ["AF029","Elegant Round Dining Set","dining",1850000,"cream","dining1","featured",true],
    ["AF030","Signature Ten-Seater Dining Set","dining",6200000,"brown","dining3","new",false],

    /* OFFICE — 10 */
    ["AF031","Executive Office Desk","office",1850000,"brown","office1","featured",true],
    ["AF032","Ergonomic Office Chair","office",650000,"black","office2","new",true],
    ["AF033","Modern Home Office Desk","office",850000,"white","office3","",true],
    ["AF034","Director's Leather Chair","office",1250000,"black","office4","featured",true],
    ["AF035","Compact Study Desk","office",420000,"brown","office2","",true],
    ["AF036","Executive Conference Table","office",3450000,"brown","office1","new",true],
    ["AF037","Adjustable Office Chair","office",780000,"grey","office3","",true],
    ["AF038","Premium Office Workstation","office",2150000,"white","office4","featured",true],
    ["AF039","Minimalist Computer Desk","office",550000,"black","office2","",true],
    ["AF040","Corporate Meeting Table","office",2750000,"brown","office1","sale",false],

    /* STORAGE — 10 */
    ["AF041","Modern Sliding Wardrobe","storage",2850000,"white","storage1","featured",true],
    ["AF042","Classic Wooden Wardrobe","storage",1850000,"brown","storage2","",true],
    ["AF043","Six-Drawer Chest","storage",950000,"cream","storage3","new",true],
    ["AF044","Contemporary TV Cabinet","storage",1150000,"brown","storage4","featured",true],
    ["AF045","Open Display Bookshelf","storage",580000,"black","storage2","",true],
    ["AF046","Luxury Walk-In Wardrobe Unit","storage",5450000,"white","storage1","new",false],
    ["AF047","Minimalist Shoe Cabinet","storage",420000,"cream","storage3","",true],
    ["AF048","Modern Sideboard Cabinet","storage",1450000,"brown","storage4","featured",true],
    ["AF049","Three-Door Bedroom Wardrobe","storage",2250000,"grey","storage1","",true],
    ["AF050","Floating Entertainment Unit","storage",1650000,"black","storage4","sale",true],

    /* CHAIRS — 10 */
    ["AF051","Everyday Accent Chair","chairs",650000,"cream","chair1","featured",true],
    ["AF052","Modern Lounge Chair","chairs",850000,"grey","chair2","new",true],
    ["AF053","Nordic Dining Chair","chairs",285000,"brown","chair3","",true],
    ["AF054","Luxury Velvet Armchair","chairs",1150000,"charcoal","chair4","featured",true],
    ["AF055","Classic Wooden Bar Stool","chairs",320000,"brown","chair3","",true],
    ["AF056","Contemporary Wingback Chair","chairs",980000,"cream","chair1","new",true],
    ["AF057","Premium Swivel Chair","chairs",750000,"black","chair2","",true],
    ["AF058","Designer Occasional Chair","chairs",1250000,"white","chair4","featured",true],
    ["AF059","Minimalist Dining Stool","chairs",195000,"brown","chair3","",true],
    ["AF060","Luxury Reclining Armchair","chairs",1850000,"grey","chair1","sale",false]
  ];

  const PRODUCTS = rawProducts.map((item, index) => ({
    id: item[0],
    name: item[1],
    category: item[2],
    price: item[3],
    color: item[4],
    image: photos[item[5]],
    badge: item[6],
    available: item[7],
    featured: item[6] === "featured",
    isNew: item[6] === "new",
    sale: item[6] === "sale",
    order: index
  }));

  const categoryNames = {
    sofas: "Sofas & Seating",
    beds: "Beds & Bedroom",
    dining: "Dining Furniture",
    office: "Office Furniture",
    storage: "Wardrobes & Storage",
    chairs: "Chairs & Stools"
  };

  /* =====================================================
     STATE
  ===================================================== */

  const params = new URLSearchParams(location.search);

  const validTabs = [
    "all", "sofas", "beds", "dining",
    "office", "storage", "chairs",
    "new", "featured"
  ];

  let activeCategory = params.get("category") || "all";

  if (!validTabs.includes(activeCategory)) {
    activeCategory = "all";
  }

  let searchTerm = params.get("search") || "";
  let sortMode = "featured";

  const selectedFilters = {
    category: [],
    color: [],
    availability: [],
    price: ""
  };

  const grid = $("#productsGrid");
  const countElement = $("#productCount");
  const noProducts = $("#noProducts");
  const activeFilters = $("#activeFilters");

  /* =====================================================
     UTILITIES
  ===================================================== */

  function money(amount) {
    return "UGX " + amount.toLocaleString("en-US");
  }

  function escapeHTML(text) {
    return String(text).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function showToast(message) {
    const toast = $(".toast");
    if (!toast) return;

    const text = toast.querySelector("p");

    if (text) text.textContent = message;

    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }

  /* =====================================================
     CART
  ===================================================== */

  function getCart() {
    try {
      const data = JSON.parse(
        localStorage.getItem(CART_KEY) || "[]"
      );

      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  function updateCartCount() {
    const total = getCart().reduce(
      (sum, item) => sum + (Number(item.quantity) || 0),
      0
    );

    $$(".cart-count").forEach(el => {
      el.textContent = total;
    });
  }

  function addToCart(product) {
    const cart = getCart();

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      updateCartCount();
      showToast(product.name + " added to cart");
    } catch {
      showToast("Unable to save your cart");
    }
  }

  /* =====================================================
     PRODUCT CARDS
  ===================================================== */

  function productCard(product) {
    const name = escapeHTML(product.name);
    const category = escapeHTML(categoryNames[product.category]);
    const imageURL = escapeHTML(product.image);

    const badge = product.badge
      ? `<span class="product-badge">${product.badge.toUpperCase()}</span>`
      : "";

    const stockLabel = product.available
      ? ""
      : `<span class="stock-label">Currently unavailable</span>`;

    return `
      <article class="product-card">

        <div class="product-image">

          <a href="product.html?id=${encodeURIComponent(product.id)}">
            <img
              src="${imageURL}"
              alt="${name}"
              loading="lazy"
            >
          </a>

          ${badge}

          <button
            type="button"
            class="quick-add"
            data-id="${product.id}"
            ${!product.available ? "disabled" : ""}
            aria-label="Add ${name} to cart"
          >
            +
          </button>

        </div>

        <div class="product-details">

          <span class="product-category">
            ${category}
          </span>

          <h3>
            <a href="product.html?id=${encodeURIComponent(product.id)}">
              ${name}
            </a>
          </h3>

          <div class="product-price">
            ${money(product.price)}
          </div>

          ${stockLabel}

        </div>

      </article>
    `;
  }

  /* =====================================================
     FILTER LOGIC
  ===================================================== */

  function visibleProducts() {
    const query = searchTerm.toLowerCase().trim();

    let items = PRODUCTS.filter(product => {

      const matchesTab =
        activeCategory === "all" ||
        (activeCategory === "new" && product.isNew) ||
        (activeCategory === "featured" && product.featured) ||
        product.category === activeCategory;

      const matchesSearch =
        !query ||
        (
          product.name + " " +
          product.category + " " +
          categoryNames[product.category]
        ).toLowerCase().includes(query);

      const matchesCategory =
        selectedFilters.category.length === 0 ||
        selectedFilters.category.includes(product.category);

      const matchesColor =
        selectedFilters.color.length === 0 ||
        selectedFilters.color.includes(product.color);

      const matchesAvailability =
        selectedFilters.availability.length === 0 ||
        selectedFilters.availability.some(value => {
          if (value === "available") return product.available;
          if (value === "sale") return product.sale;
          return false;
        });

      let matchesPrice = true;

      if (selectedFilters.price) {
        const [min, max] = selectedFilters.price
          .split("-")
          .map(Number);

        matchesPrice =
          product.price >= min &&
          product.price <= max;
      }

      return (
        matchesTab &&
        matchesSearch &&
        matchesCategory &&
        matchesColor &&
        matchesAvailability &&
        matchesPrice
      );
    });

    if (sortMode === "price-low") {
      items.sort((a, b) => a.price - b.price);
    } else if (sortMode === "price-high") {
      items.sort((a, b) => b.price - a.price);
    } else if (sortMode === "newest") {
      items.sort((a, b) => b.order - a.order);
    } else {
      items.sort((a, b) => {
        return Number(b.featured) - Number(a.featured)
          || a.order - b.order;
      });
    }

    return items;
  }

  /* =====================================================
     RENDER
  ===================================================== */

  function render() {
    if (!grid) return;

    const items = visibleProducts();

    grid.innerHTML = items.map(productCard).join("");

    if (countElement) {
      countElement.textContent =
        items.length + " furniture pieces";
    }

    if (noProducts) {
      noProducts.style.display =
        items.length ? "none" : "block";
    }

    $$(".category").forEach(button => {
      const active =
        button.dataset.category === activeCategory;

      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    renderActiveFilters();
  }

  /* =====================================================
     ACTIVE FILTER CHIPS
  ===================================================== */

  function renderActiveFilters() {
    if (!activeFilters) return;

    const chips = [];

    for (const category of selectedFilters.category) {
      chips.push({
        label: categoryNames[category] || category,
        type: "category",
        value: category
      });
    }

    for (const color of selectedFilters.color) {
      chips.push({
        label: color,
        type: "color",
        value: color
      });
    }

    for (const status of selectedFilters.availability) {
      chips.push({
        label: status === "available" ? "In stock" : "On sale",
        type: "availability",
        value: status
      });
    }

    if (selectedFilters.price) {
      chips.push({
        label: "Price range",
        type: "price",
        value: selectedFilters.price
      });
    }

    activeFilters.innerHTML = chips.map(chip => `
      <button
        type="button"
        class="active-filter-chip"
        data-remove-type="${chip.type}"
        data-remove-value="${escapeHTML(chip.value)}"
      >
        ${escapeHTML(chip.label)} ×
      </button>
    `).join("");
  }

  /* =====================================================
     SYNC DESKTOP / MOBILE FILTERS
  ===================================================== */

  function syncInputs() {
    $$("[data-filter]").forEach(input => {
      const type = input.dataset.filter;

      if (type === "price") {
        input.checked =
          selectedFilters.price === input.value;
      } else {
        input.checked =
          selectedFilters[type].includes(input.value);
      }
    });
  }

  document.addEventListener("change", event => {
    const input = event.target;

    if (!input.matches("[data-filter]")) return;

    const type = input.dataset.filter;
    const value = input.value;

    if (type === "price") {
      selectedFilters.price =
        input.checked ? value : "";
    } else {
      const values = selectedFilters[type];

      if (input.checked) {
        if (!values.includes(value)) values.push(value);
      } else {
        selectedFilters[type] =
          values.filter(item => item !== value);
      }
    }

    syncInputs();
    render();
  });

  /* =====================================================
     REMOVE FILTER CHIPS
  ===================================================== */

  activeFilters?.addEventListener("click", event => {
    const button = event.target.closest("[data-remove-type]");

    if (!button) return;

    const type = button.dataset.removeType;
    const value = button.dataset.removeValue;

    if (type === "price") {
      selectedFilters.price = "";
    } else {
      selectedFilters[type] =
        selectedFilters[type].filter(item => item !== value);
    }

    syncInputs();
    render();
  });

  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  function clearFilters() {
    selectedFilters.category = [];
    selectedFilters.color = [];
    selectedFilters.availability = [];
    selectedFilters.price = "";

    activeCategory = "all";
    searchTerm = "";
    sortMode = "featured";

    const sort = $("#sortProducts");
    if (sort) sort.value = "featured";

    const search = $("#searchInput");
    if (search) search.value = "";

    const url = new URL(location.href);
    url.searchParams.delete("category");
    url.searchParams.delete("search");
    history.replaceState({}, "", url);

    syncInputs();
    render();
  }

  $("#clearFilters")?.addEventListener("click", clearFilters);
  $("#mobileClear")?.addEventListener("click", clearFilters);
  $("#resetEmpty")?.addEventListener("click", clearFilters);

  /* =====================================================
     CATEGORY TABS
  ===================================================== */

  $$(".category").forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;

      const url = new URL(location.href);

      if (activeCategory === "all") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", activeCategory);
      }

      history.replaceState({}, "", url);
      render();
    });
  });

  /* =====================================================
     SORT
  ===================================================== */

  $("#sortProducts")?.addEventListener("change", event => {
    sortMode = event.target.value;
    render();
  });

  /* =====================================================
     SEARCH
  ===================================================== */

  const searchOverlay = $(".search-overlay");
  const searchInput = $("#searchInput");

  $(".search-button")?.addEventListener("click", () => {
    searchOverlay?.classList.add("active");
    searchOverlay?.classList.add("open");
    searchInput?.focus();
  });

  $(".close-search")?.addEventListener("click", () => {
    searchOverlay?.classList.remove("active", "open");
  });

  searchInput?.addEventListener("input", () => {
    searchTerm = searchInput.value;

    const url = new URL(location.href);

    if (searchTerm.trim()) {
      url.searchParams.set("search", searchTerm.trim());
    } else {
      url.searchParams.delete("search");
    }

    history.replaceState({}, "", url);
    render();
  });

  searchInput?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      searchOverlay?.classList.remove("active", "open");
      $("#productsGrid")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });

  /* =====================================================
     PRODUCT ADD TO CART — EVENT DELEGATION
  ===================================================== */

  grid?.addEventListener("click", event => {
    const button = event.target.closest(".quick-add");

    if (!button || button.disabled) return;

    const product = PRODUCTS.find(
      item => item.id === button.dataset.id
    );

    if (product) addToCart(product);
  });

  /* =====================================================
     MOBILE NAVIGATION
  ===================================================== */

  const mobileNav = $(".mobile-nav");

  $(".mobile-menu-button")?.addEventListener("click", () => {
    mobileNav?.classList.add("active", "open");
    document.body.classList.add("menu-open");
  });

  $(".close-mobile")?.addEventListener("click", () => {
    mobileNav?.classList.remove("active", "open");
    document.body.classList.remove("menu-open");
  });

  /* =====================================================
     MOBILE FILTER DRAWER
  ===================================================== */

  const mobileFilters = $(".mobile-filters");
  const filterBackdrop = $(".filter-backdrop");

  function openFilters() {
    mobileFilters?.classList.add("active", "open");
    filterBackdrop?.classList.add("active", "show");
    document.body.classList.add("filters-open");
  }

  function closeFilters() {
    mobileFilters?.classList.remove("active", "open");
    filterBackdrop?.classList.remove("active", "show");
    document.body.classList.remove("filters-open");
  }

  $(".filter-trigger")?.addEventListener("click", openFilters);
  $(".close-filters")?.addEventListener("click", closeFilters);
  $("#applyMobileFilters")?.addEventListener("click", closeFilters);
  filterBackdrop?.addEventListener("click", closeFilters);

  /* =====================================================
     COLLAPSIBLE DESKTOP FILTERS
  ===================================================== */

  $$(".filter-title").forEach(button => {
    button.addEventListener("click", () => {
      const group = button.closest(".filter-group");
      const content = group?.querySelector(".filter-content");
      const indicator = button.querySelector("span");

      if (!content) return;

      const hidden = content.style.display === "none";

      content.style.display = hidden ? "" : "none";

      if (indicator) {
        indicator.textContent = hidden ? "−" : "+";
      }
    });
  });

  /* =====================================================
     ESCAPE KEY
  ===================================================== */

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;

    searchOverlay?.classList.remove("active", "open");
    mobileNav?.classList.remove("active", "open");
    document.body.classList.remove("menu-open");

    closeFilters();
  });

  /* =====================================================
     INITIALIZE
  ===================================================== */

  if (searchInput) searchInput.value = searchTerm;

  syncInputs();
  render();
  updateCartCount();

  window.addEventListener("storage", event => {
    if (event.key === CART_KEY) {
      updateCartCount();
    }
  });

  console.log(
    `Apple Furniture shop loaded: ${PRODUCTS.length} demo products`
  );

});
