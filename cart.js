/* =====================================================
   MIREMBE CART
===================================================== */

let cart =
    JSON.parse(
        localStorage.getItem("mirembeCart")
    ) || [];


/* =====================================================
   ELEMENTS
===================================================== */

const cartItems =
    document.getElementById(
        "cartItems"
    );

const emptyCart =
    document.getElementById(
        "emptyCart"
    );

const cartContent =
    document.getElementById(
        "cartContent"
    );

const itemCount =
    document.getElementById(
        "itemCount"
    );

const summaryItems =
    document.getElementById(
        "summaryItems"
    );

const subtotal =
    document.getElementById(
        "subtotal"
    );

const total =
    document.getElementById(
        "total"
    );


/* =====================================================
   FORMAT PRICE
===================================================== */

function formatPrice(price) {

    return (
        "UGX " +
        Number(price)
            .toLocaleString("en-UG")
    );

}


/* =====================================================
   SAVE
===================================================== */

function saveCart() {

    localStorage.setItem(
        "mirembeCart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   RENDER
===================================================== */

function renderCart() {

    cartItems.innerHTML = "";


    /* EMPTY */

    if (cart.length === 0) {

        emptyCart.classList.remove(
            "hidden"
        );

        cartContent.classList.add(
            "hidden"
        );

        itemCount.textContent = "0";

        return;

    }


    emptyCart.classList.add(
        "hidden"
    );

    cartContent.classList.remove(
        "hidden"
    );


    let totalItems = 0;

    let totalPrice = 0;


    cart.forEach(
        (item, index) => {

            totalItems +=
                item.quantity;

            totalPrice +=
                item.price *
                item.quantity;


            const row =
                document.createElement(
                    "article"
                );

            row.className =
                "cart-item";


            row.innerHTML = `

                <div class="product-info">

                    <a
                        href="product.html?id=${item.id}"
                        class="product-image"
                    >

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                        >

                    </a>


                    <div class="product-details">

                        <small>
                            MIREMBE
                        </small>

                        <h3>
                            ${item.name}
                        </h3>

                        <p class="variant">

                            ${
                                item.color
                                    ? `Colour: ${capitalize(item.color)}`
                                    : ""
                            }

                            ${
                                item.size
                                    ? ` · Size: ${item.size}`
                                    : ""
                            }

                        </p>


                        <button
                            class="remove-item"
                            data-index="${index}"
                        >
                            REMOVE
                        </button>

                    </div>

                </div>


                <div class="item-quantity">

                    <div class="quantity-control">

                        <button
                            data-action="decrease"
                            data-index="${index}"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            data-action="increase"
                            data-index="${index}"
                        >
                            +
                        </button>

                    </div>

                </div>


                <div class="item-total">

                    ${formatPrice(
                        item.price *
                        item.quantity
                    )}

                </div>

            `;


            cartItems.appendChild(row);

        }
    );


    itemCount.textContent =
        totalItems;

    summaryItems.textContent =
        `${totalItems} ${
            totalItems === 1
                ? "ITEM"
                : "ITEMS"
        }`;

    subtotal.textContent =
        formatPrice(totalPrice);

    total.textContent =
        formatPrice(totalPrice);


    attachEvents();

}


/* =====================================================
   CAPITALIZE
===================================================== */

function capitalize(value) {

    return value
        .replace(/-/g, " ")
        .replace(/\b\w/g, char =>
            char.toUpperCase()
        );

}


/* =====================================================
   CART EVENTS
===================================================== */

function attachEvents() {


    /* QUANTITY */

    document
        .querySelectorAll(
            "[data-action]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );

                    const action =
                        button.dataset.action;


                    if (
                        action ===
                        "increase"
                    ) {

                        cart[index].quantity++;

                    }


                    if (
                        action ===
                        "decrease"
                    ) {

                        cart[index].quantity--;

                        if (
                            cart[index].quantity <= 0
                        ) {

                            cart.splice(
                                index,
                                1
                            );

                        }

                    }


                    saveCart();

                    renderCart();

                }
            );

        });


    /* REMOVE */

    document
        .querySelectorAll(
            ".remove-item"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    pendingRemove =
                        Number(
                            button.dataset.index
                        );

                    openRemoveModal();

                }
            );

        });

}


/* =====================================================
   REMOVE MODAL
===================================================== */

const confirmModal =
    document.getElementById(
        "confirmModal"
    );

const confirmRemove =
    document.getElementById(
        "confirmRemove"
    );

const cancelRemove =
    document.getElementById(
        "cancelRemove"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );


let pendingRemove = null;


function openRemoveModal() {

    confirmModal.classList.add(
        "open"
    );

    document.body.classList.add(
        "locked"
    );

}


function closeRemoveModal() {

    confirmModal.classList.remove(
        "open"
    );

    document.body.classList.remove(
        "locked"
    );

    pendingRemove = null;

}


confirmRemove.addEventListener(
    "click",
    () => {

        if (
            pendingRemove !== null
        ) {

            cart.splice(
                pendingRemove,
                1
            );

            saveCart();

            renderCart();

        }

        closeRemoveModal();

    }
);


cancelRemove.addEventListener(
    "click",
    closeRemoveModal
);


modalClose.addEventListener(
    "click",
    closeRemoveModal
);


confirmModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            confirmModal
        ) {

            closeRemoveModal();

        }

    }
);


/* =====================================================
   CLEAR CART
===================================================== */

document
    .getElementById("clearCart")
    .addEventListener(
        "click",
        () => {

            if (
                cart.length === 0
            ) return;


            cart = [];

            saveCart();

            renderCart();

        }
    );


/* =====================================================
   CHECKOUT
===================================================== */

document
    .getElementById("checkoutButton")
    .addEventListener(
        "click",
        () => {

            if (
                cart.length === 0
            ) return;


            window.location.href =
                "checkout.html";

        }
    );


/* =====================================================
   MOBILE NAV
===================================================== */

const menuButton =
    document.querySelector(
        ".menu-button"
    );

const mobileNav =
    document.querySelector(
        ".mobile-nav"
    );

const closeMenu =
    document.querySelector(
        ".close-menu"
    );


menuButton.addEventListener(
    "click",
    () => {

        mobileNav.classList.add(
            "open"
        );

        document.body.classList.add(
            "locked"
        );

    }
);


closeMenu.addEventListener(
    "click",
    () => {

        mobileNav.classList.remove(
            "open"
        );

        document.body.classList.remove(
            "locked"
        );

    }
);


/* =====================================================
   INIT
===================================================== */

renderCart();