let userName = document.querySelector("#username");
let user = localStorage.getItem("firstName");
let cartWrapper = document.querySelector("#cart-products-wrapper");
let favWrapper = document.querySelector("#favorite-products-wrapper");
let totalPriceDom = document.querySelector("#total-price-amount");
let badge = document.querySelector(".badge");

let productsInCart = JSON.parse(localStorage.getItem("ProductsInCart")) || [];
let favoritesItems = JSON.parse(localStorage.getItem("productsFavorite")) || [];

if (user && userName) { userName.value = user; }

function drawCartItems() {
    if (!cartWrapper) return;

    let groupedProducts = productsInCart.reduce((acc, current) => {
        let found = acc.find(item => item.id === current.id);
        if (found) { found.qty += 1; }
        else { acc.push({ ...current, qty: 1 }); }
        return acc;
    }, []).sort((a, b) => a.id - b.id);

    if (groupedProducts.length === 0) {
        cartWrapper.innerHTML = "<h3 class='text-center w-100 py-5'>Your cart is empty!</h3>";
        if (totalPriceDom) totalPriceDom.innerHTML = "$0.00";
        updateBadge();
        return;
    }

    cartWrapper.innerHTML = groupedProducts.map((item) => {
        let unitPrice = Number(item.Price.replace(/[^0-9.-]+/g, ""));
        let cardTotal = unitPrice * item.qty;

        return `
            <div class="col-md-4 mb-4">
                <div class="card h-100 border shadow-sm p-3" style="border-radius: 12px;">
                    <div class="text-center mb-3">
                        <img src="${item.img}" class="img-fluid rounded" 
                             style="height: 180px; width: 100%; object-fit: cover;" 
                             onerror="this.src='../project-4/image/logo 2.jpg'">
                    </div>
                    <div class="card-body p-0 d-flex flex-column text-center">
                        <h5 class="fw-bold mb-1 text-uppercase">${item.title}</h5>
                        <p class="text-muted mb-1" style="font-size: 1.1rem;">Category: ${item.Category || item.category}</p>
                        <p class="fw-bold mb-3 text-primary fs-5">Total: $${cardTotal.toLocaleString()}</p>
                        
                        <div class="d-flex align-items-center justify-content-between mt-auto px-2">
                            <div class="d-flex align-items-center border rounded bg-light">
                                <button class="btn btn-sm px-2 fw-bold" onclick="changeQty(${item.id}, 1)">+</button>
                                <span class="px-3 fw-bold text-dark">${item.qty}</span>
                                <button class="btn btn-sm px-2 fw-bold" onclick="changeQty(${item.id}, -1)">-</button>
                            </div>
                            <button class="btn btn-danger btn-sm px-2" style="font-size: .8rem;" onclick="removeItem(${item.id})">
                                Remove from Card
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
    }).join("");

    updateTotalCartPrice(groupedProducts);
    updateBadge();
}

function drawFavoriteItems() {
    if (!favWrapper) return;

    if (favoritesItems.length === 0) {
        favWrapper.innerHTML = "<p class='text-muted text-center w-100 py-3'>No favorite items yet.</p>";
        favWrapper.classList.remove("d-flex", "flex-nowrap", "overflow-auto");
        return;
    }

    favWrapper.classList.add("d-flex", "flex-nowrap", "overflow-auto", "pb-3");
    favWrapper.style.gap = "20px";

    favWrapper.innerHTML = favoritesItems.map((item) => {
        return `
            <div class="col-md-3 flex-shrink-0" style="width: 250px;">
                <div class="card h-100 border shadow-sm p-3" style="border-radius: 12px; transition: transform 0.3s;">
                    
                    <img src="${item.img}" class="img-fluid rounded mb-3" style="height: 160px; width: 100%; object-fit: cover;">
                    
                    <div class="card-body p-0 text-center">
                        <h6 class="fw-bold mb-1" style="font-size: 1rem;">${item.title}</h6>
                        <p class="text-muted small mb-1">Category: ${item.Category}</p>
                        <p class="fw-bold text-primary mb-2">${item.Price}</p>
                        
                        <div class="favorite-action mt-2">
                            <i class="fas fa-heart" 
                               style="color: red; cursor: pointer; font-size: 1.4rem;" 
                               onclick="removeFromFav(${item.id})"
                               title="Remove from favorites">
                            </i>
                        </div>
                    </div>
                </div>
            </div>`;
    }).join("");
}

function changeQty(id, num) {
    if (num === 1) {
        let product = productsInCart.find(item => item.id === id);
        productsInCart.push({ ...product });
    } else {
        let index = -1;
        for (let i = productsInCart.length - 1; i >= 0; i--) {
            if (productsInCart[i].id === id) { index = i; break; }
        }
        if (index !== -1) productsInCart.splice(index, 1);
    }
    saveAndRefresh();
}

function removeItem(id) {
    productsInCart = productsInCart.filter(item => item.id !== id);
    saveAndRefresh();
}

function removeFromFav(id) {
    favoritesItems = favoritesItems.filter(item => item.id !== id);
    localStorage.setItem("productsFavorite", JSON.stringify(favoritesItems));
    drawFavoriteItems();
}

function saveAndRefresh() {
    localStorage.setItem("ProductsInCart", JSON.stringify(productsInCart));
    drawCartItems();
}

function updateTotalCartPrice(items) {
    if (!totalPriceDom) return;
    let total = items.reduce((sum, item) => {
        let priceValue = Number(item.Price.replace(/[^0-9.-]+/g, ""));
        return sum + (priceValue * item.qty);
    }, 0);
    totalPriceDom.innerHTML = "$" + total.toLocaleString();
}

function updateBadge() {
    if (badge) {
        badge.style.display = productsInCart.length > 0 ? "block" : "none";
        badge.innerHTML = productsInCart.length;
    }
}

window.onload = function () {
    drawCartItems();
    drawFavoriteItems();
};