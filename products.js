/* =====================================================
   MIREMBE PRODUCT ENGINE
===================================================== */


/* =====================================================
   PRODUCT DATA
===================================================== */

const products = [

    {
        id: 1,

        name: "Signature Comfort Set",

        category: "beddings",

        price: 180000,

        oldPrice: null,

        colors: ["cream", "grey", "brown"],

        sizes: ["5x6", "6x6"],

        stock: 12,

        featured: true,

        newest: true,

        description:
            "Beautifully made for everyday comfort, with a soft finish that makes your bedroom feel instantly more inviting.",

        badge: "NEW",

        images: [

            "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1600&q=90",

            "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=90",

            "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=90",

            "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1600&q=90"

        ]

    },


    {
        id: 2,

        name: "Mirembe Luxe Collection",

        category: "beddings",

        price: 220000,

        oldPrice: null,

        colors: ["charcoal", "cream"],

        sizes: ["5x6", "6x6"],

        stock: 8,

        featured: true,

        newest: false,

        description:
            "A refined bedding collection designed for calm, luxurious bedrooms and effortless everyday living.",

        badge: "FEATURED",

        images: [

            "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=90",

            "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1600&q=90",

            "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=90"

        ]

    },


    {
        id: 3,

        name: "Soft Drapery Collection",

        category: "curtains",

        price: 150000,

        oldPrice: 180000,

        colors: ["cream", "brown", "grey"],

        sizes: ["Standard", "Large"],

        stock: 5,

        featured: true,

        newest: true,

        description:
            "Elegant curtains with a soft drape designed to bring warmth, privacy and understated character into your space.",

        badge: "SALE",

        images: [

            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90",

            "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=90",

            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=90"

        ]

    },


    {
        id: 4,

        name: "Everyday Luxury Set",

        category: "beddings",

        price: 195000,

        oldPrice: null,

        colors: ["rose", "cream"],

        sizes: ["5x6"],

        stock: 4,

        featured: false,

        newest: true,

        description:
            "A soft, elegant bedding set that adds warmth and a subtle touch of luxury to everyday bedrooms.",

        badge: "NEW",

        images: [

            "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=90",

            "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1600&q=90"

        ]

    },


    {
        id: 5,

        name: "Classic Linen Curtains",

        category: "curtains",

        price: 120000,

        oldPrice: null,

        colors: ["cream", "brown"],

        sizes: ["Standard", "Large"],

        stock: 15,

        featured: true,

        newest: false,

        description:
            "Classic curtains with a relaxed linen-inspired finish that works beautifully across modern and timeless interiors.",

        badge: "BESTSELLER",

        images: [

            "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=90",

            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90"

        ]

    },


    {
        id: 6,

        name: "Royal Comfort Bedding",

        category: "beddings",

        price: 260000,

        oldPrice: null,

        colors: ["charcoal", "grey"],

        sizes: ["6x6"],

        stock: 0,

        featured: false,

        newest: false,

        description:
            "A rich, sophisticated bedding option for customers looking to create a deeper, more luxurious bedroom aesthetic.",

        badge: "SOLD OUT",

        images: [

            "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1600&q=90",

            "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=90"

        ]

    },


    {
        id: 7,

        name: "Warm Earth Curtain Set",

        category: "curtains",

        price: 165000,

        oldPrice: null,

        colors: ["brown", "rose"],

        sizes: ["Standard"],

        stock: 9,

        featured: false,

        newest: true,

        description:
            "Warm earthy tones and a graceful fall make this curtain set ideal for cosy, welcoming interiors.",

        badge: "NEW",

        images: [

            "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=90",

            "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=90"

        ]

    },


    {
        id: 8,

        name: "Soft Touch Duvet Set",

        category: "beddings",

        price: 145000,

        oldPrice: null,

        colors: ["cream", "rose"],

        sizes: ["5x6", "6x6"],

        stock: 18,

        featured: true,

        newest: false,

        description:
            "Soft-touch bedding designed for comfort, simplicity and an effortlessly polished bedroom.",

        badge: null,

        images: [

            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=90",

            "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1600&q=90"

        ]

    }

];


/* =====================================================
   URL
===================================================== */

const params =
    new URLSearchParams(
        window.location.search
    );

const productId =
    Number(params.get("id")) || 1;


/* =====================================================
   CURRENT PRODUCT
===================================================== */

const product =
    products.find(
        item => item.id === productId
    ) || products[0];


/* =====================================================
   STATE
===================================================== */

let selectedColor =
    product.colors[0];

let selectedSize =
    product.sizes[0];

let quantity = 1;

let currentImage = 0;


/* =====================================================
   ELEMENTS
===================================================== */

const mainImage =
    document.getElementById(
        "mainProductImage"
    );

const thumbnails =
    document.getElementById(
        "galleryThumbnails"
    );

const productName =
    document.getElementById(
        "productName"
    );

const productCategory =
    document.getElementById(
        "productCategory"
    );

const productPrice =
    document.getElementById(
        "productPrice"
    );

const productDescription =
    document.getElementById(
        "productDescription"
    );

const productBadge =
    document.getElementById(
        "productBadge"
    );

const stockText =
    document.getElementById(
        "stockText"
    );

const stockStatus =
    document.querySelector(
        ".stock-status"
    );

const colorOptions =
    document.getElementById(
        "colorOptions"
    );

const sizeOptions =
    document.getElementById(
        "sizeOptions"
    );

const selectedColorText =
    document.getElementById(
        "selectedColor"
    );

const selectedSizeText =
    document.getElementById(
        "selectedSize"
    );

const quantityText =
    document.getElementById(
        "quantity"
    );

const cartCount =
    document.querySelector(
        ".cart-count"
    );

const toast =
    document.querySelector(".toast");


/* =====================================================
   PRICE
===================================================== */

function formatPrice(price) {

    return (
        "UGX " +
        price.toLocaleString("en-UG")
    );

}


/* =====================================================
   CAPITALIZE
===================================================== */

function titleCase(text) {

    return text
        .replace(/-/g, " ")
        .replace(/\b\w/g, char =>
            char.toUpperCase()
        );

}


/* =====================================================
   LOAD PRODUCT
===================================================== */

function loadProduct() {

    productName.textContent =
        product.name;

    productCategory.textContent =
        product.category.toUpperCase();

    productDescription.textContent =
        product.description;

    document.title =
        `${product.name} | Mirembe`;

    document.getElementById(
        "breadcrumbName"
    ).textContent =
        product.name;


    /* PRICE */

    if (product.oldPrice) {

        productPrice.innerHTML = `

            <span class="old-price">
                ${formatPrice(product.oldPrice)}
            </span>

            ${formatPrice(product.price)}

        `;

    } else {

        productPrice.textContent =
            formatPrice(product.price);

    }


    /* BADGE */

    if (product.badge) {

        productBadge.textContent =
            product.badge;

    } else {

        productBadge.classList.add(
            "hidden"
        );

    }


    /* STOCK */

    if (product.stock <= 0) {

        stockText.textContent =
            "Currently unavailable";

        stockStatus.classList.add(
            "sold"
        );

    } else {

        stockText.textContent =
            product.stock <= 3
            ? `Only ${product.stock} left`
            : "In stock";

    }


    renderGallery();

    renderColors();

    renderSizes();

    renderRelated();

}


/* =====================================================
   GALLERY
===================================================== */

function renderGallery() {

    mainImage.src =
        product.images[0];

    mainImage.alt =
        product.name;


    thumbnails.innerHTML = "";


    product.images.forEach(
        (image, index) => {

            const thumbnail =
                document.createElement("button");

            thumbnail.className =
                "thumbnail";

            if (index === 0) {

                thumbnail.classList.add(
                    "active"
                );

            }


            thumbnail.innerHTML = `

                <img
                    src="${image}"
                    alt="${product.name}"
                >

            `;


            thumbnail.addEventListener(
                "click",
                () => {

                    changeImage(index);

                }
            );


            thumbnails.appendChild(
                thumbnail
            );

        }
    );

}


function changeImage(index) {

    if (
        index < 0 ||
        index >= product.images.length
    ) return;


    currentImage = index;


    const gallery =
        document.querySelector(
            ".gallery-main"
        );

    gallery.classList.add(
        "changing"
    );


    setTimeout(() => {

        mainImage.src =
            product.images[index];

        gallery.classList.remove(
            "changing"
        );

    }, 180);


    document
        .querySelectorAll(".thumbnail")
        .forEach(
            (thumbnail, thumbnailIndex) => {

                thumbnail.classList.toggle(
                    "active",
                    thumbnailIndex === index
                );

            }
        );

}


/* =====================================================
   GALLERY BUTTONS
===================================================== */

document
    .querySelector(".gallery-prev")
    .addEventListener(
        "click",
        () => {

            const nextIndex =
                currentImage === 0
                ? product.images.length - 1
                : currentImage - 1;

            changeImage(nextIndex);

        }
    );


document
    .querySelector(".gallery-next")
    .addEventListener(
        "click",
        () => {

            const nextIndex =
                currentImage ===
                product.images.length - 1
                ? 0
                : currentImage + 1;

            changeImage(nextIndex);

        }
    );


/* =====================================================
   COLORS
===================================================== */

const colorMap = {

    cream: "#ded3c2",

    grey: "#999892",

    charcoal: "#30302d",

    rose: "#b98d89",

    brown: "#725845"

};


function renderColors() {

    colorOptions.innerHTML = "";


    product.colors.forEach(
        color => {

            const button =
                document.createElement("button");

            button.className =
                "color-choice";


            if (color === selectedColor) {

                button.classList.add(
                    "active"
                );

            }


            button.style.background =
                colorMap[color] ||
                "#ccc";


            button.title =
                titleCase(color);


            button.addEventListener(
                "click",
                () => {

                    selectedColor =
                        color;

                    selectedColorText.textContent =
                        titleCase(color);

                    renderColors();

                }
            );


            colorOptions.appendChild(
                button
            );

        }
    );


    selectedColorText.textContent =
        titleCase(selectedColor);

}


/* =====================================================
   SIZES
===================================================== */

function renderSizes() {

    sizeOptions.innerHTML = "";


    product.sizes.forEach(
        size => {

            const button =
                document.createElement("button");

            button.className =
                "size-choice";


            if (size === selectedSize) {

                button.classList.add(
                    "active"
                );

            }


            button.textContent =
                size;


            button.addEventListener(
                "click",
                () => {

                    selectedSize =
                        size;

                    selectedSizeText.textContent =
                        size;

                    renderSizes();

                }
            );


            sizeOptions.appendChild(
                button
            );

        }
    );


    selectedSizeText.textContent =
        selectedSize;

}


/* =====================================================
   QUANTITY
===================================================== */

document
    .getElementById("increaseQuantity")
    .addEventListener(
        "click",
        () => {

            if (
                quantity <
                product.stock
            ) {

                quantity++;

                quantityText.textContent =
                    quantity;

            }

        }
    );


document
    .getElementById("decreaseQuantity")
    .addEventListener(
        "click",
        () => {

            if (quantity > 1) {

                quantity--;

                quantityText.textContent =
                    quantity;

            }

        }
    );


/* =====================================================
   CART
===================================================== */

let cart =
    JSON.parse(
        localStorage.getItem(
            "mirembeCart"
        )
    ) || [];


function updateCartCount() {

    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

    cartCount.textContent =
        total;

}


function addProductToCart() {

    if (product.stock <= 0) {

        showToast(
            "This product is currently unavailable."
        );

        return false;

    }


    const cartItem =
        cart.find(
            item =>
                item.id === product.id &&
                item.color === selectedColor &&
                item.size === selectedSize
        );


    if (cartItem) {

        cartItem.quantity += quantity;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.images[0],

            color: selectedColor,

            size: selectedSize,

            quantity: quantity

        });

    }


    localStorage.setItem(
        "mirembeCart",
        JSON.stringify(cart)
    );


    updateCartCount();


    showToast(
        `${product.name} added to your cart`
    );


    return true;

}


/* =====================================================
   ADD TO CART
===================================================== */

document
    .getElementById("addCart")
    .addEventListener(
        "click",
        () => {

            addProductToCart();

        }
    );


/* =====================================================
   BUY NOW
===================================================== */

document
    .getElementById("buyNow")
    .addEventListener(
        "click",
        () => {

            const added =
                addProductToCart();

            if (added) {

                setTimeout(() => {

                    window.location.href =
                        "cart.html";

                }, 400);

            }

        }
    );


/* =====================================================
   WISHLIST
===================================================== */

document
    .getElementById("wishlist")
    .addEventListener(
        "click",
        event => {

            event.currentTarget.classList.toggle(
                "active"
            );


            event.currentTarget.textContent =
                event.currentTarget.classList.contains(
                    "active"
                )
                ? "♥"
                : "♡";

        }
    );


/* =====================================================
   RELATED PRODUCTS
===================================================== */

function renderRelated() {

    const container =
        document.getElementById(
            "relatedProducts"
        );


    const related =
        products
            .filter(
                item =>
                    item.id !== product.id &&
                    item.category === product.category
            )
            .slice(0,4);


    container.innerHTML = "";


    related.forEach(
        item => {

            const card =
                document.createElement("a");

            card.href =
                `product.html?id=${item.id}`;

            card.className =
                "related-card";


            card.innerHTML = `

                <div class="related-image">

                    <img
                        src="${item.images[0]}"
                        alt="${item.name}"
                        loading="lazy"
                    >

                </div>


                <div class="related-info">

                    <div>

                        <small>
                            ${item.category.toUpperCase()}
                        </small>

                        <h3>
                            ${item.name}
                        </h3>

                    </div>


                    <span class="related-price">
                        ${formatPrice(item.price)}
                    </span>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   ACCORDIONS
===================================================== */

document
    .querySelectorAll(".info-trigger")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const item =
                    button.closest(
                        ".info-item"
                    );


                const alreadyOpen =
                    item.classList.contains(
                        "open"
                    );


                document
                    .querySelectorAll(
                        ".info-item"
                    )
                    .forEach(
                        other =>
                            other.classList.remove(
                                "open"
                            )
                    );


                if (!alreadyOpen) {

                    item.classList.add(
                        "open"
                    );

                }

            }
        );

    });


/* =====================================================
   LIGHTBOX
===================================================== */

const lightbox =
    document.querySelector(
        ".lightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );


document
    .querySelector(".image-expand")
    .addEventListener(
        "click",
        () => {

            lightboxImage.src =
                mainImage.src;

            lightbox.classList.add(
                "open"
            );

            document.body.classList.add(
                "locked"
            );

        }
    );


document
    .querySelector(".close-lightbox")
    .addEventListener(
        "click",
        closeLightbox
    );


lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


function closeLightbox() {

    lightbox.classList.remove(
        "open"
    );

    document.body.classList.remove(
        "locked"
    );

}


/* =====================================================
   SEARCH
===================================================== */

const searchOverlay =
    document.querySelector(
        ".search-overlay"
    );

const searchButton =
    document.querySelector(
        ".search-button"
    );

const closeSearch =
    document.querySelector(
        ".close-search"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );


searchButton.addEventListener(
    "click",
    () => {

        searchOverlay.classList.add(
            "open"
        );

        setTimeout(
            () =>
                searchInput.focus(),
            300
        );

    }
);


closeSearch.addEventListener(
    "click",
    () => {

        searchOverlay.classList.remove(
            "open"
        );

    }
);


searchInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            searchInput.value.trim()
        ) {

            window.location.href =
                `shop.html?search=${encodeURIComponent(
                    searchInput.value.trim()
                )}`;

        }

        if (
            event.key === "Escape"
        ) {

            searchOverlay.classList.remove(
                "open"
            );

        }

    }
);


/* =====================================================
   MOBILE MENU
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
   TOAST
===================================================== */

let toastTimer;


function showToast(message) {

    toast.querySelector("p").textContent =
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
            2800
        );

}


/* =====================================================
   KEYBOARD GALLERY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            lightbox.classList.contains(
                "open"
            )
        ) {

            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }

            return;

        }


        if (
            event.key === "ArrowLeft"
        ) {

            document
                .querySelector(
                    ".gallery-prev"
                )
                .click();

        }


        if (
            event.key === "ArrowRight"
        ) {

            document
                .querySelector(
                    ".gallery-next"
                )
                .click();

        }

    }
);


/* =====================================================
   INIT
===================================================== */

loadProduct();

updateCartCount();