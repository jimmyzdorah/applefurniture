
/* =====================================================
   APPLE FURNITURE UGANDA
   COMPLETE SHOPPING CART ENGINE

   Compatible with:
   - shop.js
   - products.js
   - cart.html
   - cart.css

   Shared storage key: appleFurnitureCart
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =================================================
       CONFIGURATION
    ================================================= */

    const CART_KEY = "appleFurnitureCart";

    const $ = selector => document.querySelector(selector);
    const $$ = selector => [...document.querySelectorAll(selector)];

    /* =================================================
       ELEMENTS
    ================================================= */

    const cartItems = $("#cartItems");
    const emptyCart = $("#emptyCart");
    const cartContent = $("#cartContent");

    const itemCount = $("#itemCount");
    const summaryItems = $("#summaryItems");

    const subtotal = $("#subtotal");
    const total = $("#total");

    const clearCartButton = $("#clearCart");
    const checkoutButton = $("#checkoutButton");

    const confirmModal = $("#confirmModal");
    const confirmRemove = $("#confirmRemove");
    const cancelRemove = $("#cancelRemove");
    const modalClose = $("#modalClose");

    /* =================================================
       LOAD CART

       IMPORTANT:
       Uses the same key as shop.js and products.js.
    ================================================= */

    function getCart() {

        try {

            const stored = JSON.parse(
                localStorage.getItem(CART_KEY) || "[]"
            );

            if (!Array.isArray(stored)) {
                return [];
            }

            return stored.filter(item =>
                item &&
                item.id &&
                Number(item.quantity) > 0
            ).map(item => ({
                ...item,
                id: String(item.id),
                name: String(item.name || "Furniture Item"),
                price: Number(item.price) || 0,
                quantity: Math.max(
                    1,
                    Math.floor(Number(item.quantity))
                ),
                image: String(item.image || ""),
                color: String(item.color || ""),
                size: String(item.size || "")
            }));

        } catch (error) {

            console.error(
                "Unable to load furniture cart:",
                error
            );

            return [];
        }
    }

    let cart = getCart();

    /* =================================================
       SAVE CART
    ================================================= */

    function saveCart() {

        try {

            localStorage.setItem(
                CART_KEY,
                JSON.stringify(cart)
            );

            return true;

        } catch (error) {

            console.error(
                "Unable to save furniture cart:",
                error
            );

            return false;
        }
    }

    /* =================================================
       PRICE FORMATTING
    ================================================= */

    function formatPrice(price) {

        return "UGX " +
            Number(price || 0).toLocaleString("en-US");

    }

    function capitalize(value) {

        return String(value || "")
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, character =>
                character.toUpperCase()
            );

    }

    /* =================================================
       SAFE HTML OUTPUT
    ================================================= */

    function escapeHTML(value) {

        return String(value ?? "").replace(
            /[&<>"']/g,
            character => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            })[character]
        );

    }

    /* =================================================
       CART STATE
    ================================================= */

    let pendingRemove = null;

    /* =================================================
       CART RENDERING
    ================================================= */

    function renderCart() {

        if (!cartItems) return;

        cartItems.innerHTML = "";

        const totalItems = cart.reduce(
            (sum, item) =>
                sum + Number(item.quantity || 0),
            0
        );

        const totalPrice = cart.reduce(
            (sum, item) =>
                sum +
                Number(item.price || 0) *
                Number(item.quantity || 0),
            0
        );

        /* ---------------------------------------------
           UPDATE COUNTERS AND TOTALS
        --------------------------------------------- */

        if (itemCount) {
            itemCount.textContent = totalItems;
        }

        if (summaryItems) {

            summaryItems.textContent =
                `${totalItems} ${
                    totalItems === 1 ? "ITEM" : "ITEMS"
                }`;

        }

        if (subtotal) {
            subtotal.textContent =
                formatPrice(totalPrice);
        }

        if (total) {
            total.textContent =
                formatPrice(totalPrice);
        }

        $$(".cart-count").forEach(element => {
            element.textContent = totalItems;
        });

        /* ---------------------------------------------
           EMPTY CART
        --------------------------------------------- */

        if (cart.length === 0) {

            if (emptyCart) {

                emptyCart.classList.add("show");
                emptyCart.classList.remove("hidden");

                emptyCart.style.display = "block";
            }

            if (cartContent) {

                cartContent.classList.remove("show");
                cartContent.classList.add("hidden");

                cartContent.style.display = "none";
            }

            if (checkoutButton) {
                checkoutButton.disabled = true;
            }

            return;
        }

        /* ---------------------------------------------
           SHOW CART CONTENT
        --------------------------------------------- */

        if (emptyCart) {

            emptyCart.classList.remove("show");
            emptyCart.classList.add("hidden");

            emptyCart.style.display = "none";
        }

        if (cartContent) {

            cartContent.classList.remove("hidden");
            cartContent.classList.add("show");

            cartContent.style.display = "";
        }

        if (checkoutButton) {
            checkoutButton.disabled = false;
        }

        /* ---------------------------------------------
           RENDER EACH PRODUCT
        --------------------------------------------- */

        cart.forEach((item, index) => {

            const itemTotal =
                item.price * item.quantity;

            const safeId = escapeHTML(item.id);
            const safeName = escapeHTML(item.name);
            const safeImage = escapeHTML(item.image);

            const safeColor = escapeHTML(
                capitalize(item.color)
            );

            const safeSize = escapeHTML(item.size);

            const variantParts = [];

            if (item.color) {
                variantParts.push(
                    `Colour: ${safeColor}`
                );
            }

            if (item.size) {
                variantParts.push(
                    `Size: ${safeSize}`
                );
            }

            const variantText =
                variantParts.join(" · ");

            const row = document.createElement("article");

            row.className = "cart-item";

            row.innerHTML = `
                <div class="product-info">

                    <a
                        href="product.html?id=${encodeURIComponent(item.id)}"
                        class="product-image"
                    >
                        <img
                            src="${safeImage}"
                            alt="${safeName}"
                            loading="lazy"
                        >
                    </a>

                    <div class="product-details">

                        <small>
                            APPLE FURNITURE
                        </small>

                        <h3>
                            <a href="product.html?id=${encodeURIComponent(item.id)}">
                                ${safeName}
                            </a>
                        </h3>

                        ${
                            variantText
                                ? `<p class="variant">${variantText}</p>`
                                : ""
                        }

                        <button
                            type="button"
                            class="remove-item"
                            data-index="${index}"
                            aria-label="Remove ${safeName} from cart"
                        >
                            REMOVE
                        </button>

                    </div>

                </div>

                <div class="item-quantity">

                    <div class="quantity-control">

                        <button
                            type="button"
                            data-action="decrease"
                            data-index="${index}"
                            aria-label="Decrease quantity of ${safeName}"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            type="button"
                            data-action="increase"
                            data-index="${index}"
                            aria-label="Increase quantity of ${safeName}"
                        >
                            +
                        </button>

                    </div>

                </div>

                <div class="item-total">
                    ${formatPrice(itemTotal)}
                </div>
            `;

            cartItems.appendChild(row);

        });

    }

    /* =================================================
       QUANTITY AND REMOVE BUTTONS

       Event delegation works even after cart re-renders.
    ================================================= */

    cartItems?.addEventListener("click", event => {

        const target = event.target;

        if (!(target instanceof Element)) {
            return;
        }

        /* ---------------------------------------------
           QUANTITY CONTROLS
        --------------------------------------------- */

        const quantityButton =
            target.closest("[data-action]");

        if (quantityButton) {

            const index = Number(
                quantityButton.dataset.index
            );

            const action =
                quantityButton.dataset.action;

            if (
                !Number.isInteger(index) ||
                !cart[index]
            ) {
                return;
            }

            if (action === "increase") {

                cart[index].quantity += 1;

            } else if (action === "decrease") {

                cart[index].quantity -= 1;

                if (cart[index].quantity <= 0) {
                    cart.splice(index, 1);
                }

            }

            saveCart();
            renderCart();

            return;
        }

        /* ---------------------------------------------
           REMOVE BUTTON
        --------------------------------------------- */

        const removeButton =
            target.closest(".remove-item");

        if (removeButton) {

            const index = Number(
                removeButton.dataset.index
            );

            if (
                !Number.isInteger(index) ||
                !cart[index]
            ) {
                return;
            }

            pendingRemove = index;

            openRemoveModal();

        }

    });

    /* =================================================
       REMOVE CONFIRMATION MODAL
    ================================================= */

    function openRemoveModal() {

        if (!confirmModal) return;

        confirmModal.classList.add("open");

        confirmModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("locked");

        cancelRemove?.focus();

    }

    function closeRemoveModal() {

        if (!confirmModal) return;

        confirmModal.classList.remove("open");

        confirmModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove("locked");

        pendingRemove = null;

    }

    confirmRemove?.addEventListener(
        "click",
        () => {

            if (
                pendingRemove !== null &&
                cart[pendingRemove]
            ) {

                cart.splice(pendingRemove, 1);

                saveCart();
                renderCart();

            }

            closeRemoveModal();

        }
    );

    cancelRemove?.addEventListener(
        "click",
        closeRemoveModal
    );

    modalClose?.addEventListener(
        "click",
        closeRemoveModal
    );

    confirmModal?.addEventListener(
        "click",
        event => {

            if (event.target === confirmModal) {
                closeRemoveModal();
            }

        }
    );

    /* =================================================
       CLEAR ENTIRE CART
    ================================================= */

    clearCartButton?.addEventListener(
        "click",
        () => {

            if (cart.length === 0) return;

            const confirmed = window.confirm(
                "Remove all furniture items from your cart?"
            );

            if (!confirmed) return;

            cart = [];

            saveCart();
            renderCart();

        }
    );

    /* =================================================
       CHECKOUT
    ================================================= */

    checkoutButton?.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {
                return;
            }

            window.location.href =
                "checkout.html";

        }
    );

    /* =================================================
       MOBILE NAVIGATION
    ================================================= */

    const menuButton = $(".menu-button");
    const mobileNav = $(".mobile-nav");
    const closeMenu = $(".close-menu");

    function openMobileMenu() {

        if (!mobileNav) return;

        mobileNav.classList.add("open");

        document.body.classList.add("locked");

        menuButton?.setAttribute(
            "aria-expanded",
            "true"
        );

    }

    function closeMobileMenu() {

        if (!mobileNav) return;

        mobileNav.classList.remove("open");

        document.body.classList.remove("locked");

        menuButton?.setAttribute(
            "aria-expanded",
            "false"
        );

    }

    menuButton?.addEventListener(
        "click",
        openMobileMenu
    );

    closeMenu?.addEventListener(
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
       ESCAPE KEY
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") return;

            if (
                confirmModal?.classList.contains("open")
            ) {

                closeRemoveModal();
                return;
            }

            if (
                mobileNav?.classList.contains("open")
            ) {

                closeMobileMenu();

            }

        }
    );

    /* =================================================
       STORAGE SYNC

       Keeps cart updated if another tab changes it.
    ================================================= */

    window.addEventListener("storage", event => {

        if (event.key === CART_KEY) {

            cart = getCart();

            renderCart();

        }

    });

    /* =================================================
       REFRESH WHEN RETURNING TO CART PAGE
    ================================================= */

    window.addEventListener("pageshow", () => {

        cart = getCart();

        renderCart();

    });

    /* =================================================
       INITIALIZE
    ================================================= */

    renderCart();

    console.log(
        "Apple Furniture cart initialized:",
        cart.length,
        "products"
    );

});
