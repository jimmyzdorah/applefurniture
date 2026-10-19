/* =====================================================
   MIREMBE COLLECTIONS ENGINE
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const searchOverlay =
    document.querySelector(".search-overlay");

const searchButton =
    document.querySelector(".search-button");

const closeSearch =
    document.querySelector(".close-search");

const searchInput =
    document.getElementById("searchInput");

const mobileMenuButton =
    document.querySelector(".mobile-menu-button");

const mobileNav =
    document.querySelector(".mobile-nav");

const closeMobile =
    document.querySelector(".close-mobile");

const cartCount =
    document.querySelector(".cart-count");


/* =====================================================
   CART COUNT
===================================================== */

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("mirembeCart")
        ) || [];

    const total =
        cart.reduce(
            (sum, item) =>
                sum + Number(item.quantity || 0),
            0
        );

    if (cartCount) {

        cartCount.textContent = total;

    }

}


/* =====================================================
   SEARCH
===================================================== */

function openSearch() {

    searchOverlay.classList.add("open");

    document.body.classList.add("search-open");

    setTimeout(() => {

        searchInput.focus();

    }, 300);

}


function closeSearchOverlay() {

    searchOverlay.classList.remove("open");

    document.body.classList.remove("search-open");

}


searchButton.addEventListener(
    "click",
    openSearch
);


closeSearch.addEventListener(
    "click",
    closeSearchOverlay
);


searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeSearchOverlay();

        }


        if (event.key === "Enter") {

            const query =
                searchInput.value.trim();

            if (!query)
                return;

            window.location.href =
                `shop.html?search=${encodeURIComponent(query)}`;

        }

    }
);


/* =====================================================
   MOBILE MENU
===================================================== */

mobileMenuButton.addEventListener(
    "click",
    () => {

        mobileNav.classList.add("open");

        document.body.classList.add("menu-open");

    }
);


closeMobile.addEventListener(
    "click",
    () => {

        mobileNav.classList.remove("open");

        document.body.classList.remove("menu-open");

    }
);


/* =====================================================
   CLOSE MOBILE MENU WHEN LINK IS CLICKED
===================================================== */

document
    .querySelectorAll(".mobile-nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileNav.classList.remove("open");

                document.body.classList.remove(
                    "menu-open"
                );

            }
        );

    });


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll("[data-reveal]");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "revealed"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: .12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   PARALLAX HERO
===================================================== */

const heroImage =
    document.querySelector(".hero-image img");


window.addEventListener(
    "scroll",
    () => {

        const scroll =
            window.scrollY;

        if (
            heroImage &&
            scroll < window.innerHeight
        ) {

            heroImage.style.transform =
                `scale(1.02) translateY(${scroll * .08}px)`;

        }

    },
    { passive: true }
);


/* =====================================================
   IMAGE HOVER MICRO INTERACTION
===================================================== */

document
    .querySelectorAll(".colour-card")
    .forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.transition =
                    "transform .5s cubic-bezier(.22,1,.36,1)";

            }
        );

    });


/* =====================================================
   HEADER SCROLL STATE
===================================================== */

let previousScroll = 0;

const header =
    document.querySelector(".site-header");


window.addEventListener(
    "scroll",
    () => {

        const currentScroll =
            window.scrollY;


        if (currentScroll > 30) {

            header.style.boxShadow =
                "0 10px 35px rgba(0,0,0,.04)";

        } else {

            header.style.boxShadow =
                "none";

        }


        previousScroll =
            currentScroll;

    },
    { passive: true }
);


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape")
            return;


        closeSearchOverlay();

        mobileNav.classList.remove("open");

        document.body.classList.remove(
            "menu-open"
        );

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

updateCartCount();