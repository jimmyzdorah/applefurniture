/* =====================================================
   MIREMBE CHECKOUT
===================================================== */

const cart =
    JSON.parse(
        localStorage.getItem("mirembeCart")
    ) || [];


/* =====================================================
   ELEMENTS
===================================================== */

const checkoutItems =
    document.getElementById(
        "checkoutItems"
    );

const subtotalElement =
    document.getElementById(
        "subtotal"
    );

const grandTotalElement =
    document.getElementById(
        "grandTotal"
    );

const summaryCount =
    document.getElementById(
        "summaryCount"
    );

const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );

const mobileMoneyInfo =
    document.getElementById(
        "mobileMoneyInfo"
    );

const successOverlay =
    document.getElementById(
        "successOverlay"
    );


/* =====================================================
   FORMAT PRICE
===================================================== */

function formatPrice(value) {

    return (
        "UGX " +
        Number(value)
            .toLocaleString("en-UG")
    );

}


/* =====================================================
   RENDER ORDER
===================================================== */

function renderOrder() {

    if (!cart.length) {

        window.location.href =
            "cart.html";

        return;

    }


    checkoutItems.innerHTML = "";


    let itemCount = 0;

    let total = 0;


    cart.forEach(item => {

        itemCount +=
            item.quantity;

        total +=
            item.price *
            item.quantity;


        const element =
            document.createElement(
                "div"
            );

        element.className =
            "checkout-item";


        element.innerHTML = `

            <div class="checkout-item-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

            </div>


            <div class="checkout-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>

                    ${
                        item.color
                            ? "Colour: " +
                              capitalize(item.color)
                            : ""
                    }

                    ${
                        item.size
                            ? "<br>Size: " +
                              item.size
                            : ""
                    }

                    <br>

                    Qty: ${item.quantity}

                </p>

            </div>


            <div class="checkout-item-price">

                ${formatPrice(
                    item.price *
                    item.quantity
                )}

            </div>

        `;


        checkoutItems.appendChild(
            element
        );

    });


    summaryCount.textContent =
        `${itemCount} ${
            itemCount === 1
                ? "ITEM"
                : "ITEMS"
        }`;


    subtotalElement.textContent =
        formatPrice(total);

    grandTotalElement.textContent =
        formatPrice(total);

}


function capitalize(value) {

    return value
        .replace(/-/g, " ")
        .replace(/\b\w/g, char =>
            char.toUpperCase()
        );

}


/* =====================================================
PAYMENT SWITCH
===================================================== */

document
    .querySelectorAll(
        'input[name="payment"]'
    )
    .forEach(input => {

        input.addEventListener(
            "change",
            () => {

                if (
                    input.value ===
                    "mobile-money"
                ) {

                    mobileMoneyInfo.style.display =
                        "block";

                } else {

                    mobileMoneyInfo.style.display =
                        "none";

                }

            }
        );

    });


/* =====================================================
VALIDATION
===================================================== */

function validateField(id) {

    const field =
        document.getElementById(id);

    const wrapper =
        field.closest(".field");

    const error =
        wrapper.querySelector(".error");


    if (!field.value.trim()) {

        wrapper.classList.add(
            "invalid"
        );

        error.textContent =
            "This field is required.";

        return false;

    }


    wrapper.classList.remove(
        "invalid"
    );

    error.textContent = "";

    return true;

}


function validatePhone() {

    const field =
        document.getElementById(
            "phone"
        );

    const wrapper =
        field.closest(".field");

    const error =
        wrapper.querySelector(".error");


    const digits =
        field.value.replace(
            /\D/g,
            ""
        );


    if (
        digits.length < 9 ||
        digits.length > 12
    ) {

        wrapper.classList.add(
            "invalid"
        );

        error.textContent =
            "Enter a valid phone number.";

        return false;

    }


    wrapper.classList.remove(
        "invalid"
    );

    error.textContent = "";

    return true;

}


/* =====================================================
SUBMIT
===================================================== */

checkoutForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const validName =
            validateField(
                "fullName"
            );

        const validPhone =
            validatePhone();

        const validDistrict =
            validateField(
                "district"
            );

        const validArea =
            validateField(
                "area"
            );

        const validAddress =
            validateField(
                "address"
            );


        if (
            !validName ||
            !validPhone ||
            !validDistrict ||
            !validArea ||
            !validAddress
        ) {

            const firstInvalid =
                document.querySelector(
                    ".field.invalid"
                );

            if (firstInvalid) {

                firstInvalid.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

            return;

        }


        createOrder();

    }
);


/* =====================================================
CREATE ORDER
===================================================== */

function createOrder() {

    const orderNumber =
        "MRB-" +
        Date.now()
            .toString()
            .slice(-6);


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    const order = {

        orderNumber,

        createdAt:
            new Date().toISOString(),

        status:
            "new",

        customer: {

            name:
                document.getElementById(
                    "fullName"
                ).value.trim(),

            phone:
                document.getElementById(
                    "phone"
                ).value.trim(),

            whatsapp:
                document.getElementById(
                    "whatsapp"
                ).value.trim(),

            email:
                document.getElementById(
                    "email"
                ).value.trim()

        },

        delivery: {

            district:
                document.getElementById(
                    "district"
                ).value,

            area:
                document.getElementById(
                    "area"
                ).value.trim(),

            address:
                document.getElementById(
                    "address"
                ).value.trim(),

            notes:
                document.getElementById(
                    "deliveryNotes"
                ).value.trim()

        },

        payment,

        items: cart,

        subtotal:
            cart.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    (
                        item.price *
                        item.quantity
                    ),
                0
            ),

        deliveryFee:
            null

    };


    /*
       TEMPORARY STORAGE

       Later this will be replaced
       by the Mirembe backend/database.
    */

    const orders =
        JSON.parse(
            localStorage.getItem(
                "mirembeOrders"
            )
        ) || [];


    orders.push(order);


    localStorage.setItem(
        "mirembeOrders",
        JSON.stringify(orders)
    );


    /* Save current order */

    localStorage.setItem(
        "mirembeLastOrder",
        JSON.stringify(order)
    );


    /* Clear cart */

    localStorage.removeItem(
        "mirembeCart"
    );


    /* Show success */

    document.getElementById(
        "customerName"
    ).textContent =
        order.customer.name
            .split(" ")[0] + ".";


    document.getElementById(
        "orderNumber"
    ).textContent =
        orderNumber;


    successOverlay.classList.add(
        "show"
    );

    document.body.classList.add(
        "locked"
    );

}


/* =====================================================
SUCCESS CLOSE
===================================================== */

function closeSuccess() {

    successOverlay.classList.remove(
        "show"
    );

    document.body.classList.remove(
        "locked"
    );

    window.location.href =
        "index.html";

}


document
    .getElementById(
        "closeSuccess"
    )
    .addEventListener(
        "click",
        closeSuccess
    );


document
    .getElementById(
        "successClose"
    )
    .addEventListener(
        "click",
        closeSuccess
    );


/* =====================================================
INIT
===================================================== */

renderOrder();