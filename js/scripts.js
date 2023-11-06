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
