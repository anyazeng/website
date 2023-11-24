/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
var totalShoppingNumber = 0;
var totalPrice = 0;
var totalItems = [];
//add button event listener
var shoppingCartButtons = document.getElementsByClassName('btnAddToShoppingCart')

for (let i = 0; i < shoppingCartButtons.length; i++) {
    shoppingCartButtons[i].addEventListener('click', function(e) {
        //get item price
        let price = e.target.getAttribute('data-price');
        
        totalPrice = totalPrice + parseInt(price);
        totalShoppingNumber ++;

        itemNames = e.target.getAttribute('data-name');
        totalItems.push(itemNames);


        document.getElementById('shopping-cart-number').innerHTML = totalShoppingNumber;
        document.getElementById('totalPrice').innerHTML = totalPrice;
        document.getElementById('itemList').innerHTML = renderItems(totalItems);
      
    
    });
}


function renderItems(items) {
    let results = "";
    items.forEach(element => {
    results += element + "<br/>"    
    }); 
    return results;
}

document.getElementById('btn-checkout')?.addEventListener('click', function() {
    window.location = `/checkout.html?items=${totalItems}&amount=${totalPrice}`
});
//open modal event listener
const checkoutModal = document.getElementById('checkoutModal')
checkoutModal.addEventListener('show.bs.modal', event => {
  // do something...
  initialize()
  checkStatus()
})

//checkout 
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = Stripe("pk_test_51O9gWHG3wP0vwK7rXgZeHyXW6Dk80Uvt9w9fHe8AA7r3tLZAntCYHln4bu34sVBuP1etAV9N83rbucjY9ABmiGEw00kStCaIQ1");

let elements;

document
  .querySelector("#payment-form")
  .addEventListener("submit", handleSubmit);

// Fetches a payment intent and captures the client secret
async function initialize() {
  const response = await fetch("http://localhost:4242/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: totalItems, amount: totalPrice}),
  });
  const { clientSecret } = await response.json();

  const appearance = {
    theme: 'stripe',
  };
  elements = stripe.elements({ appearance, clientSecret });

  const paymentElementOptions = {
    layout: "tabs",
  };

  const paymentElement = elements.create("payment", paymentElementOptions);
  paymentElement.mount("#payment-element");
}

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  let emailAddress = document.getElementById('customerEmail').value;
  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: "http://localhost:5500/confirmation.html",
      receipt_email: emailAddress,
    },
  });

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occurred.");
  }

  setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent.status) {
    case "succeeded":
      showMessage("Payment succeeded!");
      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageContainer.textContent = "";
  }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}

//Contentful
var client = contentful.createClient({
    accessToken: '8c5Xf5iTeNDwSXNZTlTLFER4FuwvhyAhQaCQpY-YuAY',
    space: 'ybkvnl96zwpj'
  })
  // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token
  client
    .getEntry('5aCQoPlgjap7Tij4f6HytB')
    .getEntry('3aD8BObK2dVyeRI7u5gmr')
    .then((entry) => console.log(entry))
    .catch((err) => console.log(err))