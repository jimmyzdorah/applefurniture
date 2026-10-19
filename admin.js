/* =====================================================
   MIREMBE ADMIN
===================================================== */


/* =====================================================
   STORAGE
===================================================== */

let products =
    JSON.parse(
        localStorage.getItem(
            "mirembeProducts"
        )
    ) || [];

let orders =
    JSON.parse(
        localStorage.getItem(
            "mirembeOrders"
        )
    ) || [];


/* =====================================================
   DEMO PRODUCTS
===================================================== */

if (!products.length) {

    products = [

        {
            id: "P001",
            name: "Royal Satin Bedding",
            category: "beddings",
            price: 185000,
            stock: 12,
            size: "6×6",
            description:
                "Luxurious satin bedding designed for a refined bedroom.",
            image:
                "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
            colours:
                ["cream","beige","brown"],
            available: true
        },


        {
            id: "P002",
            name: "Linen Dream Curtains",
            category: "curtains",
            price: 220000,
            stock: 5,
            size: "Custom",
            description:
                "Soft premium curtains with an elegant natural finish.",
            image:
                "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
            colours:
                ["white","cream","grey"],
            available: true
        },


        {
            id: "P003",
            name: "Classic Comfort Duvet",
            category: "duvets",
            price: 165000,
            stock: 3,
            size: "6×6",
            description:
                "Soft, warm and beautifully finished for everyday comfort.",
            image:
                "https://images.unsplash.com/photo-1584100936595-c0654b55a2a2?auto=format&fit=crop&w=900&q=80",
            colours:
                ["white","cream","pink"],
            available: true
        },


        {
            id: "P004",
            name: "Cloud Soft Pillows",
            category: "pillows",
            price: 65000,
            stock: 18,
            size: "Standard",
            description:
                "Plush pillows made for deeper, softer rest.",
            image:
                "https://images.unsplash.com/photo-1584100936595-c0654b55a2a2?auto=format&fit=crop&w=900&q=80",
            colours:
                ["white","cream"],
            available: true
        }

    ];

    saveProducts();

}


/* =====================================================
SAVE
===================================================== */

function saveProducts() {

    localStorage.setItem(
        "mirembeProducts",
        JSON.stringify(products)
    );

}


function saveOrders() {

    localStorage.setItem(
        "mirembeOrders",
        JSON.stringify(orders)
    );

}


/* =====================================================
HELPERS
===================================================== */

function money(value) {

    return (
        "UGX " +
        Number(value)
            .toLocaleString("en-UG")
    );

}


function capitalize(value) {

    return value
        .replace(/-/g," ")
        .replace(
            /\b\w/g,
            c => c.toUpperCase()
        );

}


function statusLabel(status) {

    return capitalize(status);

}


/* =====================================================
NAVIGATION
===================================================== */

const navItems =
    document.querySelectorAll(
        ".nav-item"
    );

const sections =
    document.querySelectorAll(
        ".admin-section"
    );

const pageTitle =
    document.getElementById(
        "pageTitle"
    );


navItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            const section =
                item.dataset.section;

            switchSection(section);

        }
    );

});


document
    .querySelectorAll("[data-go]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                switchSection(
                    button.dataset.go
                );

            }
        );

    });


function switchSection(name) {

    sections.forEach(section => {

        section.classList.toggle(
            "active",
            section.id === name
        );

    });


    navItems.forEach(item => {

        item.classList.toggle(
            "active",
            item.dataset.section === name
        );

    });


    const active =
        document.querySelector(
            `.nav-item[data-section="${name}"]`
        );


    if (active) {

        pageTitle.textContent =
            active.textContent
                .replace(/\d+/g,"")
                .replace(/\s+/g," ")
                .trim();

    }


    renderEverything();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    document
        .getElementById("sidebar")
        .classList.remove("open");

}


/* =====================================================
MOBILE MENU
===================================================== */

document
    .getElementById("menuToggle")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("sidebar")
                .classList.add("open");

        }
    );


document
    .getElementById("mobileClose")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("sidebar")
                .classList.remove("open");

        }
    );


/* =====================================================
OVERVIEW
===================================================== */

function renderOverview() {

    const today =
        new Date()
            .toISOString()
            .slice(0,10);


    const todayOrders =
        orders.filter(order =>
            order.createdAt &&
            order.createdAt.slice(0,10) === today
        );


    const pending =
        orders.filter(order =>
            [
                "new",
                "preparing",
                "out-for-delivery"
            ].includes(order.status)
        );


    const low =
        products.filter(product =>
            product.stock <= 5
        );


    document.getElementById(
        "todayOrders"
    ).textContent =
        todayOrders.length;


    document.getElementById(
        "pendingOrders"
    ).textContent =
        pending.length;


    document.getElementById(
        "totalProducts"
    ).textContent =
        products.length;


    document.getElementById(
        "lowStock"
    ).textContent =
        low.length;


    document.getElementById(
        "sidebarOrderCount"
    ).textContent =
        pending.length;


    renderRecentOrders();

    renderStockWatch();

}


/* =====================================================
RECENT ORDERS
===================================================== */

function renderRecentOrders() {

    const container =
        document.getElementById(
            "recentOrders"
        );


    const recent =
        [...orders]
            .reverse()
            .slice(0,5);


    if (!recent.length) {

        container.innerHTML = `
            <div class="empty-state">
                No orders yet.
            </div>
        `;

        return;

    }


    container.innerHTML =
        recent.map(order => `

            <div
                class="recent-order"
                data-order-id="${order.orderNumber}"
            >

                <span class="recent-order-number">
                    ${order.orderNumber}
                </span>

                <div class="recent-order-customer">

                    <strong>
                        ${order.customer.name}
                    </strong>

                    <small>
                        ${order.items.length}
                        ${
                            order.items.length === 1
                                ? "item"
                                : "items"
                        }
                        ·
                        ${money(order.subtotal)}
                    </small>

                </div>

                <span
                    class="status-pill status-${order.status}"
                >
                    ${statusLabel(order.status)}
                </span>

            </div>

        `).join("");


    container
        .querySelectorAll(".recent-order")
        .forEach(row => {

            row.addEventListener(
                "click",
                () => {

                    openOrder(
                        row.dataset.orderId
                    );

                }
            );

        });

}


/* =====================================================
STOCK WATCH
===================================================== */

function renderStockWatch() {

    const container =
        document.getElementById(
            "stockWatch"
        );


    const watched =
        [...products]
            .sort(
                (a,b) =>
                    a.stock - b.stock
            )
            .slice(0,5);


    container.innerHTML =
        watched.map(product => {

            const percent =
                Math.min(
                    100,
                    (product.stock / 20) * 100
                );


            return `

                <div class="stock-row">

                    <div class="stock-product">

                        <strong>
                            ${product.name}
                        </strong>

                        <small>
                            ${capitalize(product.category)}
                        </small>

                    </div>

                    <div class="stock-number">
                        ${product.stock}
                    </div>

                    <div class="stock-bar">
                        <span
                            style="width:${percent}%"
                        ></span>
                    </div>

                </div>

            `;

        }).join("");

}


/* =====================================================
ORDERS
===================================================== */

let currentOrderFilter = "all";


document
    .querySelectorAll("[data-order-filter]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        "[data-order-filter]"
                    )
                    .forEach(btn =>
                        btn.classList.remove(
                            "active"
                        )
                    );


                button.classList.add(
                    "active"
                );


                currentOrderFilter =
                    button.dataset.orderFilter;


                renderOrders();

            }
        );

    });


document
    .getElementById("orderSearch")
    .addEventListener(
        "input",
        renderOrders
    );


function renderOrders() {

    const body =
        document.getElementById(
            "ordersTableBody"
        );


    const search =
        document
            .getElementById("orderSearch")
            .value
            .toLowerCase();


    let filtered =
        [...orders]
            .reverse();


    if (
        currentOrderFilter !==
        "all"
    ) {

        filtered =
            filtered.filter(
                order =>
                    order.status ===
                    currentOrderFilter
            );

    }


    if (search) {

        filtered =
            filtered.filter(order =>

                (
                    order.orderNumber +
                    order.customer.name +
                    order.customer.phone
                )
                .toLowerCase()
                .includes(search)

            );

    }


    if (!filtered.length) {

        body.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="empty-state">
                        No orders found.
                    </div>
                </td>
            </tr>
        `;

        return;

    }


    body.innerHTML =
        filtered.map(order => `

            <tr>

                <td>
                    <span class="order-id">
                        ${order.orderNumber}
                    </span>
                </td>


                <td>

                    <div class="customer-cell">

                        <strong>
                            ${order.customer.name}
                        </strong>

                        <small>
                            ${order.customer.phone}
                        </small>

                    </div>

                </td>


                <td>
                    ${order.items.length}
                    ${
                        order.items.length === 1
                            ? "item"
                            : "items"
                    }
                </td>


                <td>

                    <span class="order-total">
                        ${money(order.subtotal)}
                    </span>

                </td>


                <td>

                    <span
                        class="status-pill status-${order.status}"
                    >
                        ${statusLabel(order.status)}
                    </span>

                </td>


                <td>

                    <button
                        class="table-action"
                        data-order="${order.orderNumber}"
                    >
                        →
                    </button>

                </td>

            </tr>

        `).join("");


    body
        .querySelectorAll(
            "[data-order]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openOrder(
                        button.dataset.order
                    );

                }
            );

        });

}


/* =====================================================
OPEN ORDER
===================================================== */

function openOrder(orderNumber) {

    const order =
        orders.find(
            item =>
                item.orderNumber ===
                orderNumber
        );


    if (!order) return;


    const details =
        document.getElementById(
            "orderDetails"
        );


    details.innerHTML = `

        <div class="order-detail-head">

            <div>

                <span class="eyebrow">
                    CUSTOMER ORDER
                </span>

                <h2>
                    ${order.orderNumber}
                </h2>

            </div>

            <div class="order-detail-total">
                ${money(order.subtotal)}
            </div>

        </div>


        <div class="order-detail-grid">

            <div class="detail-block">

                <span>CUSTOMER</span>

                <strong>
                    ${order.customer.name}
                </strong>

                <p>
                    ${order.customer.phone}

                    ${
                        order.customer.whatsapp
                            ? "<br>" +
                              order.customer.whatsapp
                            : ""
                    }

                    ${
                        order.customer.email
                            ? "<br>" +
                              order.customer.email
                            : ""
                    }
                </p>

            </div>


            <div class="detail-block">

                <span>DELIVERY</span>

                <strong>
                    ${order.delivery.area},
                    ${order.delivery.district}
                </strong>

                <p>
                    ${order.delivery.address}

                    ${
                        order.delivery.notes
                            ? "<br><br>" +
                              order.delivery.notes
                            : ""
                    }
                </p>

            </div>

        </div>


        <div class="order-products">

            <span class="eyebrow">
                ITEMS
            </span>


            ${order.items.map(item => `

                <div class="order-product-row">

                    <div>

                        <strong>
                            ${item.name}
                        </strong>

                        <small>

                            Qty:
                            ${item.quantity}

                            ${
                                item.color
                                    ? " · " +
                                      capitalize(item.color)
                                    : ""
                            }

                        </small>

                    </div>


                    <strong>
                        ${money(
                            item.price *
                            item.quantity
                        )}
                    </strong>

                </div>

            `).join("")}

        </div>


        <div class="order-status-control">

            <span>
                ORDER STATUS
            </span>

            <select
                class="order-status-select"
                id="orderStatusSelect"
                data-order-id="${order.orderNumber}"
            >

                <option
                    value="new"
                    ${order.status === "new" ? "selected" : ""}
                >
                    New order
                </option>

                <option
                    value="preparing"
                    ${order.status === "preparing" ? "selected" : ""}
                >
                    Preparing
                </option>

                <option
                    value="out-for-delivery"
                    ${order.status === "out-for-delivery" ? "selected" : ""}
                >
                    Out for delivery
                </option>

                <option
                    value="delivered"
                    ${order.status === "delivered" ? "selected" : ""}
                >
                    Delivered
                </option>

            </select>

        </div>

    `;


    document
        .getElementById("orderModal")
        .classList.add("show");


    document
        .getElementById(
            "orderStatusSelect"
        )
        .addEventListener(
            "change",
            event => {

                updateOrderStatus(
                    orderNumber,
                    event.target.value
                );

            }
        );

}


/* =====================================================
UPDATE ORDER
===================================================== */

function updateOrderStatus(
    orderNumber,
    status
) {

    const order =
        orders.find(
            item =>
                item.orderNumber ===
                orderNumber
        );


    if (!order) return;


    order.status = status;


    saveOrders();

    renderEverything();

    showToast(
        "Order status updated."
    );

}


/* =====================================================
PRODUCT SEARCH
===================================================== */

document
    .getElementById("productSearch")
    .addEventListener(
        "input",
        renderProducts
    );


document
    .getElementById("categoryFilter")
    .addEventListener(
        "change",
        renderProducts
    );


function renderProducts() {

    const container =
        document.getElementById(
            "productsGrid"
        );


    const search =
        document
            .getElementById("productSearch")
            .value
            .toLowerCase();


    const category =
        document
            .getElementById("categoryFilter")
            .value;


    let filtered =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "all" ||
                product.category === category;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    if (!filtered.length) {

        container.innerHTML = `
            <div class="empty-state">
                No products found.
            </div>
        `;

        return;

    }


    container.innerHTML =
        filtered.map(product => `

            <article class="product-admin-card">

                <div class="product-admin-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <span
                        class="product-availability ${
                            product.available
                                ? ""
                                : "off"
                        }"
                    >
                        ${
                            product.available
                                ? "AVAILABLE"
                                : "HIDDEN"
                        }
                    </span>

                </div>


                <div class="product-admin-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${capitalize(product.category)}
                        ·
                        ${
                            product.size ||
                            "Standard"
                        }
                    </p>


                    <div class="product-admin-bottom">

                        <strong
                            class="product-price"
                        >
                            ${money(product.price)}
                        </strong>

                        <span class="product-stock">
                            ${product.stock} in stock
                        </span>

                    </div>


                    <div class="product-admin-actions">

                        <button
                            data-edit-product="${product.id}"
                        >
                            Edit
                        </button>

                        <button
                            data-toggle-product="${product.id}"
                        >
                            ${
                                product.available
                                    ? "Hide"
                                    : "Show"
                            }
                        </button>

                    </div>

                </div>

            </article>

        `).join("");


    container
        .querySelectorAll(
            "[data-edit-product]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openProductModal(
                        button.dataset.editProduct
                    );

                }
            );

        });


    container
        .querySelectorAll(
            "[data-toggle-product]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    toggleProduct(
                        button.dataset.toggleProduct
                    );

                }
            );

        });

}


/* =====================================================
PRODUCT MODAL
===================================================== */

const productModal =
    document.getElementById(
        "productModal"
    );


function openProductModal(id = null) {

    const form =
        document.getElementById(
            "productForm"
        );


    form.reset();


    document.getElementById(
        "editProductId"
    ).value = "";


    document.getElementById(
        "productAvailable"
    ).checked = true;


    document.getElementById(
        "productModalTitle"
    ).textContent =
        "Add product.";


    document.getElementById(
        "imagePreview"
    ).innerHTML = `
        <span>+</span>
        <small>PRODUCT IMAGE</small>
    `;


    document
        .querySelectorAll(
            "#colourOptions input"
        )
        .forEach(input => {

            input.checked = false;

        });


    if (id) {

        const product =
            products.find(
                item =>
                    item.id === id
            );


        if (!product) return;


        document.getElementById(
            "productModalTitle"
        ).textContent =
            "Edit product.";


        document.getElementById(
            "editProductId"
        ).value =
            product.id;


        document.getElementById(
            "productName"
        ).value =
            product.name;


        document.getElementById(
            "productCategory"
        ).value =
            product.category;


        document.getElementById(
            "productPrice"
        ).value =
            product.price;


        document.getElementById(
            "productStock"
        ).value =
            product.stock;


        document.getElementById(
            "productSize"
        ).value =
            product.size || "";


        document.getElementById(
            "productDescription"
        ).value =
            product.description || "";


        document.getElementById(
            "productAvailable"
        ).checked =
            product.available;


        document
            .querySelectorAll(
                "#colourOptions input"
            )
            .forEach(input => {

                input.checked =
                    (
                        product.colours ||
                        []
                    ).includes(
                        input.value
                    );

            });


        document.getElementById(
            "imagePreview"
        ).innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

        `;

    }


    productModal.classList.add(
        "show"
    );

}


/* =====================================================
ADD PRODUCT BUTTONS
===================================================== */

document
    .getElementById("addProductTop")
    .addEventListener(
        "click",
        () => openProductModal()
    );


document
    .getElementById("addProductButton")
    .addEventListener(
        "click",
        () => openProductModal()
    );


document
    .getElementById("quickProduct")
    .addEventListener(
        "click",
        () => {

            switchSection(
                "products"
            );

            openProductModal();

        }
    );


/* =====================================================
IMAGE PREVIEW
===================================================== */

document
    .getElementById("productImage")
    .addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];


            if (!file) return;


            const reader =
                new FileReader();


            reader.onload =
                e => {

                    document.getElementById(
                        "imagePreview"
                    ).innerHTML = `

                        <img
                            src="${e.target.result}"
                            alt="Preview"
                        >

                    `;

                };


            reader.readAsDataURL(file);

        }
    );


/* =====================================================
SAVE PRODUCT
===================================================== */

document
    .getElementById("productForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const id =
                document.getElementById(
                    "editProductId"
                ).value;


            const selectedColours =
                [
                    ...document.querySelectorAll(
                        "#colourOptions input:checked"
                    )
                ]
                .map(
                    input =>
                        input.value
                );


            const currentProduct =
                id
                    ? products.find(
                        product =>
                            product.id === id
                    )
                    : null;


            const previewImage =
                document.querySelector(
                    "#imagePreview img"
                );


            const product = {

                id:
                    id ||
                    "P" +
                    Date.now(),

                name:
                    document.getElementById(
                        "productName"
                    ).value.trim(),

                category:
                    document.getElementById(
                        "productCategory"
                    ).value,

                price:
                    Number(
                        document.getElementById(
                            "productPrice"
                        ).value
                    ),

                stock:
                    Number(
                        document.getElementById(
                            "productStock"
                        ).value
                    ),

                size:
                    document.getElementById(
                        "productSize"
                    ).value.trim(),

                description:
                    document.getElementById(
                        "productDescription"
                    ).value.trim(),

                image:
                    previewImage
                        ? previewImage.src
                        : (
                            currentProduct
                                ?.image ||
                            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80"
                        ),

                colours:
                    selectedColours,

                available:
                    document.getElementById(
                        "productAvailable"
                    ).checked

            };


            if (id) {

                const index =
                    products.findIndex(
                        item =>
                            item.id === id
                    );


                products[index] =
                    product;

                showToast(
                    "Product updated."
                );

            } else {

                products.push(
                    product
                );

                showToast(
                    "Product added."
                );

            }


            saveProducts();

            closeModals();

            renderEverything();

        }
    );


/* =====================================================
TOGGLE PRODUCT
===================================================== */

function toggleProduct(id) {

    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) return;


    product.available =
        !product.available;


    saveProducts();

    renderEverything();


    showToast(
        product.available
            ? "Product is now available."
            : "Product hidden from customers."
    );

}


/* =====================================================
INVENTORY
===================================================== */

function renderInventory() {

    const inStock =
        products.filter(
            product =>
                product.stock > 5
        ).length;


    const low =
        products.filter(
            product =>
                product.stock > 0 &&
                product.stock <= 5
        ).length;


    const out =
        products.filter(
            product =>
                product.stock <= 0
        ).length;


    document.getElementById(
        "inventoryInStock"
    ).textContent =
        inStock;


    document.getElementById(
        "inventoryLow"
    ).textContent =
        low;


    document.getElementById(
        "inventoryOut"
    ).textContent =
        out;


    const container =
        document.getElementById(
            "inventoryList"
        );


    container.innerHTML =
        products.map(product => {

            let status =
                "good";


            let text =
                "Healthy stock";


            if (product.stock <= 5) {

                status = "low";

                text = "Running low";

            }


            if (product.stock <= 0) {

                status = "out";

                text = "Out of stock";

            }


            return `

                <div class="inventory-item">

                    <div class="inventory-thumb">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >

                    </div>


                    <div class="inventory-name">

                        <strong>
                            ${product.name}
                        </strong>

                        <small>
                            ${capitalize(product.category)}
                        </small>

                    </div>


                    <div class="inventory-stock">
                        ${product.stock}
                    </div>


                    <div
                        class="inventory-status ${status}"
                    >
                        ${text}
                    </div>


                    <div class="stock-editor">

                        <button
                            data-stock-minus="${product.id}"
                        >
                            −
                        </button>

                        <input
                            type="number"
                            min="0"
                            value="${product.stock}"
                            data-stock-input="${product.id}"
                        >

                        <button
                            data-stock-plus="${product.id}"
                        >
                            +
                        </button>

                    </div>

                </div>

            `;

        }).join("");


    container
        .querySelectorAll(
            "[data-stock-minus]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    changeStock(
                        button.dataset.stockMinus,
                        -1
                    );

                }
            );

        });


    container
        .querySelectorAll(
            "[data-stock-plus]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    changeStock(
                        button.dataset.stockPlus,
                        1
                    );

                }
            );

        });


    container
        .querySelectorAll(
            "[data-stock-input]"
        )
        .forEach(input => {

            input.addEventListener(
                "change",
                () => {

                    setStock(
                        input.dataset.stockInput,
                        Number(input.value)
                    );

                }
            );

        });

}


/* =====================================================
STOCK FUNCTIONS
===================================================== */

function changeStock(
    id,
    amount
) {

    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) return;


    product.stock =
        Math.max(
            0,
            product.stock + amount
        );


    saveProducts();

    renderEverything();

}


function setStock(
    id,
    amount
) {

    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) return;


    product.stock =
        Math.max(
            0,
            amount || 0
        );


    saveProducts();

    renderEverything();

}


/* =====================================================
MODAL CLOSE
===================================================== */

document
    .querySelectorAll(
        "[data-close-modal]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            closeModals
        );

    });


document
    .querySelectorAll(
        ".modal-overlay"
    )
    .forEach(overlay => {

        overlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    overlay
                ) {

                    closeModals();

                }

            }
        );

    });


function closeModals() {

    document
        .querySelectorAll(
            ".modal-overlay"
        )
        .forEach(modal =>
            modal.classList.remove(
                "show"
            )
        );

}


/* =====================================================
TOAST
===================================================== */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =====================================================
NOTIFICATION
===================================================== */

document
    .getElementById(
        "notificationButton"
    )
    .addEventListener(
        "click",
        () => {

            switchSection(
                "orders"
            );

        }
    );


/* =====================================================
RENDER EVERYTHING
===================================================== */

function renderEverything() {

    renderOverview();

    renderOrders();

    renderProducts();

    renderInventory();

}


renderEverything();