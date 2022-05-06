let openBasketEl = document.querySelector('.header__link-basket');
let basketEl = document.querySelector('.header__basket')
let basketCounterEl = document.querySelector('.header__link-basket-value');
let basketTotalEl = document.querySelector('.header__basket-total');
let basketTotalValueEl = document.querySelector('.header__basket-value');


openBasketEl.addEventListener('click', function () {
    basketEl.classList.toggle('visually-hidden');
})

let basket = {};

function increaseProductsCount() {
    basketCounterEl.textContent++;
}

function addProductToObject(productId) {
    if (!(productId in basket)) {
        basket[productId] = 1;
    }
    else {
        basket[productId]++;
    }
}

function renderProductInBasket(productId) {
    let productExist = document.querySelector(`.productCount[data-productId="${productId}"]`);
    if (productExist) {
        increaseProductCount(productId);
        recalculateSumForProduct(productId);
    }
    else {
        renderNewProductInBasket(productId);
    }
}

function renderNewProductInBasket(productId) {
    let productRow = `
        <div class="basketRow">
            <div class="basketRow__item">${products[productId].name}</div>
            <div class="basketRow__item">
                <span class="productCount" data-productId="${productId}">1</span> шт.
            </div>
            <div class="basketRow__item">${products[productId].price}</div>
            <div class="basketRow__item">
                <span class="productTotalRow" data-productId="${productId}">${products[productId].price}</span>
            </div>
        </div>
    `
    basketTotalEl.insertAdjacentHTML('beforebegin', productRow);
}

function increaseProductCount(productId) {
    const productCountEl = document.querySelector(`.productCount[data-productId="${productId}"]`)
    productCountEl.textContent++;
}

function recalculateSumForProduct(productId) {
    const productTotalRowEl = document.querySelector(`.productTotalRow[data-productId="${productId}"]`);
    let totalPriceForRow = (basket[productId] * products[productId].price).toFixed(2);
    productTotalRowEl.textContent = totalPriceForRow;
}

function calculateAndRenderTotalBasketSum() {
    let totalSum = 0;
    for (let productId in basket) {
        totalSum += basket[productId] * products[productId].price;
    }
    basketTotalValueEl.textContent = totalSum.toFixed(2);
}

function addProductToBasket(productId) {
    increaseProductsCount();
    addProductToObject(productId);
    renderProductInBasket(productId);
    calculateAndRenderTotalBasketSum();
}