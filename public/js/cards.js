'use strict';

const featuredItemsEl = document.querySelector('.featuredItems');

function getProductMarkup(product) {
    return `
    <div class="featuredItem">

    <div class="featuredImgWrap">
        <img class="featuredImg" src="${product.image}" alt="${product.name}">
        <div class="featuredImgDark">
            <button data-productid="${product.id}">
                <img src="./img/cart.svg" alt="">
                Add to Cart
            </button>
        </div>
    </div>

    <div class="featuredData">
        <div class="featuredName">
            ${product.name}
        </div>
        <div class="featuredText">
            ${product.description}
        </div>
        <div class="featuredPrice">
            ${product.price}
        </div>
    </div>

</div>
`
}

function insertProductsIntoPage(products, featuredItemsEl) {
    let productsMarkup = "";
    for (let product of products) {
        productsMarkup += getProductMarkup(product);
    }
    featuredItemsEl.insertAdjacentHTML('afterbegin', productsMarkup);
}

insertProductsIntoPage(products, featuredItemsEl);


function addEventListeners() {
    const addToCartBtns = document.querySelectorAll('button[data-productId]');
    addToCartBtns.forEach(function (button) {
        button.addEventListener('click', addedProductHandler)
    });
}

function addedProductHandler(event) {
    const productId = event.currentTarget.getAttribute('data-productId');
    addProductToBasket(productId);
}

addEventListeners();