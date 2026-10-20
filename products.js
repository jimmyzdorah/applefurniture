
/* =====================================================
   APPLE FURNITURE UGANDA
   PRODUCT DETAILS ENGINE — CORRECTED VERSION

   Works with:
   - product.html
   - shop.js / window.SHOP_PRODUCTS
   - product.css
   - appleFurnitureCart
   - appleFurnitureWishlist

   IMPORTANT:
   Load shop.js BEFORE products.js in product.html.
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =================================================
       CONFIGURATION
    ================================================= */

    const CART_KEY = "appleFurnitureCart";
    const WISHLIST_KEY = "appleFurnitureWishlist";

    const $ = selector => document.querySelector(selector);
    const $$ = selector => [...document.querySelectorAll(selector)];

    const formatPrice = value =>
        "UGX " + Number(value || 0).toLocaleString("en-US");

    const titleCase = value =>
        String(value || "")
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, letter => letter.toUpperCase());

    const colorMap = {
        cream: "#ded3c2",
        ivory: "#f1eadf",
        white: "#f5f3ef",
        grey: "#999892",
        gray: "#999892",
        charcoal: "#30302d",
        black: "#222222",
        brown: "#725845",
        walnut: "#73513b",
        beige: "#c9b79d",
        tan: "#b78e6b",
        green: "#65765d",
        blue: "#526b80",
        gold: "#b49361"
    };

    const categoryNames =
        window.SHOP_CATEGORY_NAMES || {
            sofas: "Sofas & Seating",
            beds: "Beds & Bedroom",
            dining: "Dining Furniture",
            office: "Office Furniture",
            storage: "Wardrobes & Storage",
            chairs: "Chairs & Stools"
        };

    /* =================================================
       SAFE LOCAL STORAGE
    ================================================= */

    function readStorage(key) {

        try {
            const result = JSON.parse(
                localStorage.getItem(key) || "[]"
            );

            return Array.isArray(result) ? result : [];

        } catch (error) {

            console.warn("Storage read error:", error);
            return [];

        }
    }

    function saveStorage(key, value) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

            return true;

        } catch (error) {

            console.error("Storage save error:", error);
            return false;

        }
    }

    /* =================================================
       NORMALIZE PRODUCT IMAGES

       Supports:
       - image: "https://..."
       - images: ["https://...", "..."]

       Preserves original image URLs from shop.js.
    ================================================= */

    function normalizeImages(item) {

        const candidates = [];

        if (Array.isArray(item.images)) {
            candidates.push(...item.images);
        }

        if (typeof item.image === "string") {
            candidates.push(item.image);
        }

        const validImages = candidates
            .filter(url =>
                typeof url === "string" &&
                url.trim() !== ""
            )
            .map(url => url.trim());

        return [...new Set(validImages)];
    }

    /* =================================================
       NORMALIZE PRODUCT CATALOGUE
    ================================================= */

    const sourceProducts =
        Array.isArray(window.SHOP_PRODUCTS)
            ? window.SHOP_PRODUCTS
            : [];

    const products = sourceProducts.map(item => {

        const images = normalizeImages(item);

        const colors = Array.isArray(item.colors)
            ? item.colors.filter(Boolean)
            : item.color
                ? [item.color]
                : [];

        const sizes = Array.isArray(item.sizes)
            ? item.sizes.filter(Boolean)
            : [];

        const hasStockNumber =
            item.stock !== undefined &&
            item.stock !== null &&
            item.stock !== "";

        const stock = hasStockNumber
            ? Math.max(0, Number(item.stock) || 0)
            : null;

        const available =
            item.available !== false &&
            (stock === null || stock > 0);

        return {

            ...item,

            id: String(item.id || ""),

            name: String(
                item.name || "Furniture Product"
            ),

            category: String(
                item.category || "furniture"
            ),

            price: Number(item.price) || 0,

            oldPrice:
                item.oldPrice !== undefined &&
                item.oldPrice !== null
                    ? Number(item.oldPrice)
                    : null,

            image: images[0] || "",

            images,

            colors,

            sizes,

            stock,

            available,

            description:
                item.description ||
                "Discover furniture selected to bring comfort, beauty and character into your living space.",

            badge:
                item.badge ||
                (item.newest ? "new" : "")

        };

    });

    /* =================================================
       FIND PRODUCT FROM URL
    ================================================= */

    const params = new URLSearchParams(
        window.location.search
    );

    const requestedId = params.get("id");

    const product = products.find(item =>
        item.id.toLowerCase() ===
        String(requestedId || "").toLowerCase()
    );

    /* =================================================
       PAGE ELEMENTS
    ================================================= */

    const mainImage = $("#mainProductImage");
    const thumbnails = $("#galleryThumbnails");

    const productName = $("#productName");
    const productCategory = $("#productCategory");
    const productPrice = $("#productPrice");
    const productDescription = $("#productDescription");
    const productBadge = $("#productBadge");

    const stockText = $("#stockText");
    const stockStatus =
        $("#stockStatus") || $(".stock-status");

    const colorSection = $("#colorSection");
    const colorOptions = $("#colorOptions");
    const selectedColorText = $("#selectedColor");

    const sizeSection = $("#sizeSection");
    const sizeOptions = $("#sizeOptions");
    const selectedSizeText = $("#selectedSize");

    const quantityText = $("#quantity");

    const addCartButton = $("#addCart");
    const buyNowButton = $("#buyNow");
    const wishlistButton = $("#wishlist");

    const relatedContainer = $("#relatedProducts");

    const toast = $(".toast");

    /* =================================================
       PAGE STATE
    ================================================= */

    let selectedColor = product?.colors[0] || "";
    let selectedSize = product?.sizes[0] || "";

    let quantity = 1;
    let currentImage = 0;

    let toastTimer;

    /* =================================================
       CART COUNTER
    ================================================= */

    function updateCartCount() {

        const cart = readStorage(CART_KEY);

        const total = cart.reduce(
            (sum, item) =>
                sum + (Number(item.quantity) || 0),
            0
        );

        $$(".cart-count").forEach(element => {
            element.textContent = total;
        });

    }

    /* =================================================
       TOAST NOTIFICATION
    ================================================= */

    function showToast(message) {

        if (!toast) {
            console.log(message);
            return;
        }

        const text = toast.querySelector("p");

        if (text) {
            text.textContent = message;
        }

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2800);

    }

    /* =================================================
       PRODUCT NOT FOUND
    ================================================= */

    function showProductNotFound() {

        document.title =
            "Product Not Found | Apple Furniture Uganda";

        if (productName) {
            productName.textContent =
                "Product not found";
        }

        if (productCategory) {
            productCategory.textContent =
                "APPLE FURNITURE";
        }

        if (productDescription) {

            productDescription.textContent =
                products.length
                    ? "This furniture item could not be found. Please return to our shop to browse available products."
                    : "The furniture catalogue could not be loaded. Make sure shop.js is included before products.js.";

        }

        if (productPrice) {
            productPrice.textContent = "";
        }

        if (mainImage) {
            mainImage.removeAttribute("src");
            mainImage.style.display = "none";
        }

        if (thumbnails) {
            thumbnails.innerHTML = "";
        }

        if (productBadge) {
            productBadge.hidden = true;
            productBadge.style.display = "none";
        }

        if (stockText) {
            stockText.textContent = "Unavailable";
        }

        if (colorSection) {
            colorSection.hidden = true;
            colorSection.style.display = "none";
        }

        if (sizeSection) {
            sizeSection.hidden = true;
            sizeSection.style.display = "none";
        }

        if (addCartButton) {
            addCartButton.disabled = true;
        }

        if (buyNowButton) {
            buyNowButton.disabled = true;
        }

        if (wishlistButton) {
            wishlistButton.disabled = true;
        }

        $$(".gallery-arrow, .image-expand")
            .forEach(button => {
                button.disabled = true;
                button.style.display = "none";
            });

        if (relatedContainer) {

            relatedContainer.innerHTML = "";

            const link = document.createElement("a");

            link.href = "shop.html";

            link.textContent =
                "Return to the furniture shop ↗";

            relatedContainer.appendChild(link);

        }

    }

    /* =================================================
       LOAD PRODUCT DETAILS
    ================================================= */

    function loadProduct() {

        if (!product) {
            showProductNotFound();
            return;
        }

        document.title =
            `${product.name} | Apple Furniture Uganda`;

        if (productName) {
            productName.textContent = product.name;
        }

        if (productCategory) {

            productCategory.textContent =
                (
                    categoryNames[product.category] ||
                    titleCase(product.category)
                ).toUpperCase();

        }

        if (productDescription) {
            productDescription.textContent =
                product.description;
        }

        const breadcrumbName = $("#breadcrumbName");

        if (breadcrumbName) {
            breadcrumbName.textContent = product.name;
        }

        const reference = $("#productReference");

        if (reference) {
            reference.textContent =
                `PRODUCT REF: ${product.id}`;
        }

        /* PRICE */

        if (productPrice) {

            productPrice.innerHTML = "";

            if (
                product.oldPrice &&
                product.oldPrice > product.price
            ) {

                const oldPrice =
                    document.createElement("span");

                oldPrice.className = "old-price";

                oldPrice.textContent =
                    formatPrice(product.oldPrice);

                productPrice.appendChild(oldPrice);

                productPrice.appendChild(
                    document.createTextNode(
                        " " + formatPrice(product.price)
                    )
                );

            } else {

                productPrice.textContent =
                    formatPrice(product.price);

            }

        }

        /* BADGE */

        if (productBadge) {

            if (product.badge) {

                productBadge.textContent =
                    String(product.badge).toUpperCase();

                productBadge.hidden = false;
                productBadge.style.display = "";

            } else {

                productBadge.hidden = true;
                productBadge.style.display = "none";

            }

        }

        /* STOCK */

        stockStatus?.classList.remove(
            "sold",
            "out-of-stock",
            "in-stock"
        );

        if (!product.available) {

            if (stockText) {
                stockText.textContent =
                    "Currently unavailable";
            }

            stockStatus?.classList.add(
                "sold",
                "out-of-stock"
            );

            if (addCartButton) {
                addCartButton.disabled = true;
            }

            if (buyNowButton) {
                buyNowButton.disabled = true;
            }

        } else {

            if (stockText) {

                stockText.textContent =
                    product.stock !== null &&
                    product.stock <= 3
                        ? `Only ${product.stock} available`
                        : "Available";

            }

            stockStatus?.classList.add("in-stock");

            if (addCartButton) {
                addCartButton.disabled = false;
            }

            if (buyNowButton) {
                buyNowButton.disabled = false;
            }

        }

        renderGallery();
        renderColors();
        renderSizes();
        renderRelated();
        updateWishlistButton();

    }

    /* =================================================
       IMAGE GALLERY — CORRECTED

       Uses the SAME image URLs as shop.js.
    ================================================= */

    function renderGallery() {

        if (!mainImage || !thumbnails || !product) {
            return;
        }

        thumbnails.innerHTML = "";

        currentImage = 0;

        if (!product.images.length) {

            mainImage.removeAttribute("src");

            mainImage.alt =
                "Product image unavailable";

            $$(".gallery-arrow, .image-expand")
                .forEach(button => {
                    button.style.display = "none";
                });

            thumbnails.style.display = "none";

            console.warn(
                "No image URL found for product:",
                product.id
            );

            return;
        }

        mainImage.style.display = "";

        mainImage.src = product.images[0];

        mainImage.alt = product.name;

        mainImage.loading = "eager";

        mainImage.decoding = "async";

        mainImage.onerror = function () {

            console.error(
                "Failed to load product image:",
                this.src
            );

        };

        thumbnails.style.display =
            product.images.length > 1
                ? ""
                : "none";

        $$(".gallery-arrow").forEach(button => {

            button.style.display =
                product.images.length > 1
                    ? ""
                    : "none";

        });

        $(".image-expand")?.style.setProperty(
            "display",
            ""
        );

        product.images.forEach((imageURL, index) => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className = "thumbnail";

            button.setAttribute(
                "aria-label",
                `View image ${index + 1} of ${product.name}`
            );

            if (index === currentImage) {
                button.classList.add("active");
            }

            const image =
                document.createElement("img");

            image.src = imageURL;

            image.alt =
                `${product.name} - image ${index + 1}`;

            image.loading = "lazy";

            button.appendChild(image);

            button.addEventListener("click", () => {
                changeImage(index);
            });

            thumbnails.appendChild(button);

        });

        console.log(
            "Product image loaded:",
            product.id,
            product.images[0]
        );

    }

    function changeImage(index) {

        if (
            !product ||
            !product.images.length ||
            !mainImage
        ) {
            return;
        }

        const length = product.images.length;

        currentImage =
            (index + length) % length;

        const gallery = $(".gallery-main");

        gallery?.classList.add("changing");

        mainImage.src =
            product.images[currentImage];

        $$(".thumbnail").forEach((button, i) => {

            button.classList.toggle(
                "active",
                i === currentImage
            );

        });

        requestAnimationFrame(() => {

            gallery?.classList.remove("changing");

        });

    }

    $(".gallery-prev")?.addEventListener(
        "click",
        () => {
            changeImage(currentImage - 1);
        }
    );

    $(".gallery-next")?.addEventListener(
        "click",
        () => {
            changeImage(currentImage + 1);
        }
    );

    /* =================================================
       COLOUR OPTIONS
    ================================================= */

    function renderColors() {

        if (
            !product ||
            !colorOptions ||
            !colorSection
        ) {
            return;
        }

        colorOptions.innerHTML = "";

        if (!product.colors.length) {

            colorSection.hidden = true;
            colorSection.style.display = "none";

            return;
        }

        colorSection.hidden = false;
        colorSection.style.display = "";

        product.colors.forEach(color => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className = "color-choice";

            button.title = titleCase(color);

            button.setAttribute(
                "aria-label",
                `Select ${titleCase(color)} finish`
            );

            button.setAttribute(
                "aria-pressed",
                String(color === selectedColor)
            );

            button.style.background =
                colorMap[String(color).toLowerCase()] ||
                "#b7aaa0";

            if (color === selectedColor) {
                button.classList.add("active");
            }

            button.addEventListener("click", () => {

                selectedColor = color;

                renderColors();

            });

            colorOptions.appendChild(button);

        });

        if (selectedColorText) {

            selectedColorText.textContent =
                titleCase(selectedColor);

        }

    }

    /* =================================================
       SIZE / CONFIGURATION OPTIONS
    ================================================= */

    function renderSizes() {

        if (
            !product ||
            !sizeOptions ||
            !sizeSection
        ) {
            return;
        }

        sizeOptions.innerHTML = "";

        if (!product.sizes.length) {

            sizeSection.hidden = true;
            sizeSection.style.display = "none";

            return;
        }

        sizeSection.hidden = false;
        sizeSection.style.display = "";

        product.sizes.forEach(size => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className = "size-choice";

            button.textContent = size;

            button.setAttribute(
                "aria-pressed",
                String(size === selectedSize)
            );

            if (size === selectedSize) {
                button.classList.add("active");
            }

            button.addEventListener("click", () => {

                selectedSize = size;

                renderSizes();

            });

            sizeOptions.appendChild(button);

        });

        if (selectedSizeText) {
            selectedSizeText.textContent =
                selectedSize;
        }

    }

    /* =================================================
       QUANTITY
    ================================================= */

    function updateQuantity() {

        if (quantityText) {
            quantityText.textContent = quantity;
        }

        const decrease = $("#decreaseQuantity");
        const increase = $("#increaseQuantity");

        if (decrease) {
            decrease.disabled = quantity <= 1;
        }

        if (increase) {

            increase.disabled =
                !product?.available ||
                (
                    product.stock !== null &&
                    quantity >= product.stock
                );

        }

    }

    $("#increaseQuantity")?.addEventListener(
        "click",
        () => {

            if (!product?.available) return;

            if (
                product.stock !== null &&
                quantity >= product.stock
            ) {
                return;
            }

            quantity++;

            updateQuantity();

        }
    );

    $("#decreaseQuantity")?.addEventListener(
        "click",
        () => {

            if (quantity <= 1) return;

            quantity--;

            updateQuantity();

        }
    );

    /* =================================================
       ADD PRODUCT TO CART
    ================================================= */

    function addProductToCart() {

        if (!product || !product.available) {

            showToast(
                "This furniture item is currently unavailable."
            );

            return false;
        }

        const cart = readStorage(CART_KEY);

        const existing = cart.find(item =>

            String(item.id) === product.id &&

            String(item.color || "") === selectedColor &&

            String(item.size || "") === selectedSize

        );

        const existingQuantity =
            Number(existing?.quantity) || 0;

        if (
            product.stock !== null &&
            existingQuantity + quantity > product.stock
        ) {

            showToast(
                `Only ${product.stock} available for this item.`
            );

            return false;
        }

        if (existing) {

            existing.quantity =
                existingQuantity + quantity;

        } else {

            const cartItem = {

                id: product.id,

                name: product.name,

                category: product.category,

                price: product.price,

                image: product.images[0] || product.image,

                quantity: quantity

            };

            if (selectedColor) {
                cartItem.color = selectedColor;
            }

            if (selectedSize) {
                cartItem.size = selectedSize;
            }

            cart.push(cartItem);

        }

        if (!saveStorage(CART_KEY, cart)) {

            showToast(
                "Unable to save your cart. Please try again."
            );

            return false;
        }

        updateCartCount();

        showToast(
            `${product.name} added to your cart`
        );

        return true;

    }

    addCartButton?.addEventListener("click", () => {
        addProductToCart();
    });

    /* =================================================
       BUY NOW
    ================================================= */

    buyNowButton?.addEventListener("click", () => {

        if (addProductToCart()) {
            window.location.href = "checkout.html";
        }

    });

    /* =================================================
       WISHLIST
    ================================================= */

    function updateWishlistButton() {

        if (!product || !wishlistButton) return;

        const wishlist = readStorage(WISHLIST_KEY);

        const isSaved = wishlist.includes(product.id);

        wishlistButton.classList.toggle(
            "active",
            isSaved
        );

        wishlistButton.textContent =
            isSaved ? "♥" : "♡";

        wishlistButton.setAttribute(
            "aria-label",
            isSaved
                ? "Remove from wishlist"
                : "Add to wishlist"
        );

    }

    wishlistButton?.addEventListener("click", () => {

        if (!product) return;

        const wishlist = readStorage(WISHLIST_KEY);

        const index = wishlist.indexOf(product.id);

        if (index >= 0) {
            wishlist.splice(index, 1);
        } else {
            wishlist.push(product.id);
        }

        if (saveStorage(WISHLIST_KEY, wishlist)) {

            updateWishlistButton();

            showToast(
                index >= 0
                    ? "Removed from wishlist"
                    : "Added to wishlist"
            );

        }

    });

    /* =================================================
       RELATED PRODUCTS
    ================================================= */

    function renderRelated() {

        if (!product || !relatedContainer) return;

        let related = products.filter(item =>

            item.id !== product.id &&

            item.category === product.category

        );

        if (related.length < 4) {

            const others = products.filter(item =>

                item.id !== product.id &&

                item.category !== product.category

            );

            related = [
                ...related,
                ...others
            ];

        }

        related = related.slice(0, 4);

        relatedContainer.innerHTML = "";

        related.forEach(item => {

            const card =
                document.createElement("a");

            card.href =
                `product.html?id=${encodeURIComponent(item.id)}`;

            card.className = "related-card";

            const imageWrap =
                document.createElement("div");

            imageWrap.className = "related-image";

            const image =
                document.createElement("img");

            image.src =
                item.images[0] || item.image || "";

            image.alt = item.name;

            image.loading = "lazy";

            imageWrap.appendChild(image);

            const info =
                document.createElement("div");

            info.className = "related-info";

            const textWrap =
                document.createElement("div");

            const category =
                document.createElement("small");

            category.textContent =
                (
                    categoryNames[item.category] ||
                    titleCase(item.category)
                ).toUpperCase();

            const name =
                document.createElement("h3");

            name.textContent = item.name;

            textWrap.appendChild(category);
            textWrap.appendChild(name);

            const price =
                document.createElement("span");

            price.className = "related-price";

            price.textContent =
                formatPrice(item.price);

            info.appendChild(textWrap);
            info.appendChild(price);

            card.appendChild(imageWrap);
            card.appendChild(info);

            relatedContainer.appendChild(card);

        });

    }

    /* =================================================
       PRODUCT INFORMATION ACCORDIONS
    ================================================= */

    $$(".info-trigger").forEach(button => {

        button.setAttribute(
            "aria-expanded",
            "false"
        );

        button.addEventListener("click", () => {

            const item =
                button.closest(".info-item");

            if (!item) return;

            const alreadyOpen =
                item.classList.contains("open");

            $$(".info-item").forEach(other => {

                other.classList.remove("open");

                const trigger =
                    other.querySelector(".info-trigger");

                trigger?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

            if (!alreadyOpen) {

                item.classList.add("open");

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });

    /* =================================================
       IMAGE LIGHTBOX
    ================================================= */

    const lightbox = $(".lightbox");
    const lightboxImage = $("#lightboxImage");

    function closeLightbox() {

        lightbox?.classList.remove("open");

        document.body.classList.remove("locked");

    }

    $(".image-expand")?.addEventListener(
        "click",
        () => {

            if (
                !product ||
                !product.images.length ||
                !lightbox ||
                !lightboxImage
            ) {
                return;
            }

            lightboxImage.src =
                product.images[currentImage];

            lightboxImage.alt = product.name;

            lightbox.classList.add("open");

            document.body.classList.add("locked");

        }
    );

    $(".close-lightbox")?.addEventListener(
        "click",
        closeLightbox
    );

    lightbox?.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

    /* =================================================
       SEARCH OVERLAY
    ================================================= */

    const searchOverlay = $(".search-overlay");
    const searchInput = $("#searchInput");

    function closeSearch() {

        searchOverlay?.classList.remove(
            "open",
            "active"
        );

    }

    $(".search-button")?.addEventListener(
        "click",
        () => {

            searchOverlay?.classList.add(
                "open",
                "active"
            );

            setTimeout(() => {
                searchInput?.focus();
            }, 150);

        }
    );

    $(".close-search")?.addEventListener(
        "click",
        closeSearch
    );

    searchInput?.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                searchInput.value.trim()
            ) {

                window.location.href =
                    "shop.html?search=" +
                    encodeURIComponent(
                        searchInput.value.trim()
                    );

            }

        }
    );

    /* =================================================
       MOBILE NAVIGATION
    ================================================= */

    const menuButton = $(".menu-button");
    const mobileNav = $(".mobile-nav");

    function closeMobileMenu() {

        mobileNav?.classList.remove(
            "open",
            "active"
        );

        document.body.classList.remove("locked");

        menuButton?.setAttribute(
            "aria-expanded",
            "false"
        );

    }

    menuButton?.addEventListener(
        "click",
        () => {

            mobileNav?.classList.add(
                "open",
                "active"
            );

            document.body.classList.add("locked");

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }
    );

    $(".close-menu")?.addEventListener(
        "click",
        closeMobileMenu
    );

    $$(".mobile-nav a").forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });

    /* =================================================
       KEYBOARD SUPPORT
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                if (
                    lightbox?.classList.contains("open")
                ) {
                    closeLightbox();
                    return;
                }

                if (
                    searchOverlay?.classList.contains("open")
                ) {
                    closeSearch();
                    return;
                }

                if (
                    mobileNav?.classList.contains("open")
                ) {
                    closeMobileMenu();
                    return;
                }

            }

            const target = event.target;

            if (
                target instanceof HTMLElement &&
                target.closest(
                    "input, textarea, select, [contenteditable]"
                )
            ) {
                return;
            }

            if (
                !product ||
                product.images.length < 2
            ) {
                return;
            }

            if (event.key === "ArrowLeft") {
                changeImage(currentImage - 1);
            }

            if (event.key === "ArrowRight") {
                changeImage(currentImage + 1);
            }

        }
    );

    /* =================================================
       SYNC STORAGE BETWEEN TABS
    ================================================= */

    window.addEventListener("storage", event => {

        if (event.key === CART_KEY) {
            updateCartCount();
        }

        if (event.key === WISHLIST_KEY) {
            updateWishlistButton();
        }

    });

    /* =================================================
       INITIALIZE
    ================================================= */

    updateCartCount();

    loadProduct();

    updateQuantity();

    console.log(
        "Apple Furniture product page initialized"
    );

    console.log(
        "Catalogue products:",
        products.length
    );

    console.log(
        "Requested product:",
        requestedId
    );

    console.log(
        "Selected product:",
        product || "Not found"
    );

    if (product) {

        console.log(
            "Product images:",
            product.images
        );

    }

});
