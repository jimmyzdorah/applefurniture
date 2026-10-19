/* =====================================================
   MIREMBE ABOUT ENGINE
===================================================== */


/* =====================================================
   CART
===================================================== */

let cart =
    JSON.parse(
        localStorage.getItem("mirembeCart")
    ) || [];


const cartCount =
    document.querySelector(".cart-count");


function updateCartCount() {

    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    cartCount.textContent = total;

}


updateCartCount();



/* =====================================================
   SEARCH
===================================================== */

const searchOverlay =
    document.querySelector(".search-overlay");


const searchButton =
    document.querySelector(".search-button");


const closeSearch =
    document.querySelector(".close-search");


const searchInput =
    document.getElementById("searchInput");


function openSearch() {

    searchOverlay.classList.add("open");

    document.body.classList.add(
        "search-open"
    );


    setTimeout(() => {

        searchInput.focus();

    }, 300);

}


function closeSearchOverlay() {

    searchOverlay.classList.remove("open");

    document.body.classList.remove(
        "search-open"
    );

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
   MOBILE NAV
===================================================== */

const mobileMenuButton =
    document.querySelector(
        ".mobile-menu-button"
    );


const mobileNav =
    document.querySelector(
        ".mobile-nav"
    );


const closeMobile =
    document.querySelector(
        ".close-mobile"
    );


function openMobileMenu() {

    mobileNav.classList.add("open");

    document.body.classList.add(
        "menu-open"
    );

}


function closeMobileMenu() {

    mobileNav.classList.remove("open");

    document.body.classList.remove(
        "menu-open"
    );

}


mobileMenuButton.addEventListener(
    "click",
    openMobileMenu
);


closeMobile.addEventListener(
    "click",
    closeMobileMenu
);



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".story-intro, .story-image-section, .service-card, .location-row, .why-point, .about-cta"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;


                entry.target.classList.add(
                    "revealed"
                );


                revealObserver.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(element => {

    element.classList.add(
        "reveal-element"
    );


    revealObserver.observe(element);

});



/* =====================================================
   LOCATION INTERACTION
===================================================== */

document
    .querySelectorAll(".location-row")
    .forEach(row => {

        row.addEventListener(
            "mouseenter",
            () => {

                row.classList.add(
                    "location-hover"
                );

            }
        );


        row.addEventListener(
            "mouseleave",
            () => {

                row.classList.remove(
                    "location-hover"
                );

            }
        );

    });



/* =====================================================
   PARALLAX HERO
===================================================== */

const heroImage =
    document.querySelector(
        ".about-hero-image img"
    );


window.addEventListener(
    "scroll",
    () => {

        const scroll =
            window.scrollY;


        if (scroll < window.innerHeight) {

            heroImage.style.transform =
                `scale(1.04) translateY(${scroll * .08}px)`;

        }

    },
    {
        passive: true
    }
);



/* =====================================================
   KEYBOARD ESCAPE
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape")
            return;


        closeSearchOverlay();

        closeMobileMenu();

    }
);