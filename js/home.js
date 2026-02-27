let userName = document.querySelector("#username");
let user = localStorage.getItem("firstName");

if (user && userName) {
    userName.value = user;
}


let cartIcon = document.querySelector("#cart-icon");
let cartDropdown = document.querySelector(".cart-dropdown");
let badge = document.querySelector(".badge");
let allCards = document.querySelector(".cards");

let cards = [
    {
        id: 1, img: "image/ring1.jpg",
        title: "Radiant",
        Price: "$1,200",
        Category: "Rings"
    },
    {
        id: 2, img: "image/Necklaces-2.jpg",
        title: "Vintage",
        Price: "$2,500",
        Category: "Necklaces"
    },
    {
        id: 3, img: "image/earring-3.jpg",
        title: "Royal",
        Price: "$1,800",
        Category: "Earrings"
    },
    {
        id: 4, img: "image/ring-4.jpg",
        title: "Eternal",
        Price: "$3,200",
        Category: "Rings"
    },
    {
        id: 5, img: "image/Necklaces-5.jpg",
        title: "Emerald",
        Price: "$4,500",
        Category: "Necklaces"
    },
    {
        id: 6, img: "image/earring-6.jpg",
        title: "Pearl",
        Price: "$950",
        Category: "Earrings"
    },
    {
        id: 7, img: "image/ring-7.jpg",
        title: "Gold",
        Price: "$2,100",
        Category: "Rings"
    },
    {
        id: 8, img: "image/Necklaces-8.jpg",
        title: "Mid Night",
        Price: "$1,550",
        Category: "Necklaces"
    },
    {
        id: 9, img: "image/earring-9.jpg",
        title: "Classic",
        Price: "$900",
        Category: "Earrings"
    },
];


function drawCards() {
    let productsInCart = localStorage.getItem("ProductsInCart")
        ? JSON.parse(localStorage.getItem("ProductsInCart"))
        : [];

    let favoritesItems = localStorage.getItem("productsFavorite")
        ? JSON.parse(localStorage.getItem("productsFavorite"))
        : [];

    let y = cards.map((item) => {
        let isProductAdded = productsInCart.some(p => Number(p.id) === Number(item.id));

        let isFavorite = favoritesItems.some(f => Number(f.id) === Number(item.id));

        return `
        <div class="col">
            <div class="card product-card p-2 h-100">
                <img src="${item.img}" class="card-img-top product-img" alt="${item.title}">
                <div class="card-body px-0 pb-0 text-start">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="text-muted mb-1">Price: <span class="text-dark">${item.Price}</span></p>
                    <p class="text-muted mb-3">Category: ${item.Category}</p>
                    <div class="heart-box">
                        <input type="checkbox" id="heart-${item.id}" class="heart-input" 
                            ${isFavorite ? 'checked' : ''} 
                            onclick="addToFavorite(${item.id})">
                        <label for="heart-${item.id}" class="heart-label">
                            <i class="far fa-heart empty"></i>
                            <i class="fas fa-heart filled"></i>
                        </label>
                        ${isProductAdded ?
                `<button class="btn btn-danger px-4" onclick="removeFromCart(${item.id})">Remove From Cart</button>` :
                `<button class="btn btn-primary px-4" onclick="addToCart(${item.id})">Add to Cart</button>`
            }
                    </div>
                </div>
            </div>
        </div>`;
    }).join("");

    allCards.innerHTML = y;

    let cartItemsContent = document.querySelector(".cart-items-content");
    badge.innerHTML = productsInCart.length;

    if (productsInCart.length > 0) {
        let uniqueItemsIds = [...new Set(productsInCart.map(p => p.id))];

        cartItemsContent.innerHTML = uniqueItemsIds.map(id => {
            let product = cards.find(p => p.id === id);
            let quantity = productsInCart.filter(p => p.id === id).length;

            let priceNum = Number(product.Price.replace(/[^0-9.-]+/g, ""));
            let total = priceNum * quantity;

            return `
            <div class="d-flex justify-content-between align-items-center mb-2 p-2 bg-light border rounded">
                <div style="color: black;">
                    <h6 class="mb-0 fw-bold small">${product.title}</h6>
                    <p class="mb-0 text-primary small fw-bold">$${total.toLocaleString()}</p> 
                </div>
                <div class="d-flex align-items-center bg-white border rounded">
                    <button class="btn btn-sm px-2 text-danger fw-bold" onclick="removeFromCart(${id})">-</button>
                    <span class="mx-2 fw-bold text-dark">${quantity}</span>
                    <button class="btn btn-sm px-2 text-success fw-bold" onclick="addToCart(${id})">+</button>
                </div>
            </div>`;
        }).join("");
    } else {
        cartItemsContent.innerHTML = "<p class='text-muted small'>Your cart is empty</p>";
    }
}
drawCards();


// ------------------------------------------------------------------------

function addToCart(id) {
    if (localStorage.getItem("firstName")) {
        let productsInCart = localStorage.getItem("ProductsInCart")
            ? JSON.parse(localStorage.getItem("ProductsInCart"))
            : [];

        let product = cards.find((item) => item.id === id);
        productsInCart.push(product);

        localStorage.setItem("ProductsInCart", JSON.stringify(productsInCart));

        drawCards();

    } else {
        window.location = "login.html";
    }
}

function removeFromCart(id) {
    let productsInCart = JSON.parse(localStorage.getItem("ProductsInCart")) || [];

    const index = productsInCart.findIndex(item => Number(item.id) === Number(id));

    if (index !== -1) {
        productsInCart.splice(index, 1);
        localStorage.setItem("ProductsInCart", JSON.stringify(productsInCart));

        drawCards();
    }
}

cartIcon.onclick = function (e) {
    e.preventDefault(); 

    cartDropdown.classList.toggle("d-none");

    if (!cartDropdown.classList.contains("d-none")) {
        drawCards();
    }
};
// ----------------------------------------------------

let logoutBtn = document.querySelector("#logout");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();

        localStorage.clear();

        window.location = "register.html";

    });
}
//---------------------------------------------------------

function addToFavorite(id) {
    if (localStorage.getItem("firstName")) {
        let favoritesItems = localStorage.getItem("productsFavorite")
            ? JSON.parse(localStorage.getItem("productsFavorite"))
            : [];

        let product = cards.find((item) => item.id === id);

        let productIndex = favoritesItems.findIndex(f => Number(f.id) === Number(id));

        if (productIndex === -1) {
            favoritesItems.push(product);
        } else {
            favoritesItems.splice(productIndex, 1);
        }

        localStorage.setItem("productsFavorite", JSON.stringify(favoritesItems));

    } else {
        window.location = "login.html";
    }
}

//-------------------------------------------------

let searchInput = document.querySelector("#searchInput");
let searchType = document.querySelector("#searchType");

searchInput.addEventListener("input", function (e) {
    searchProducts(e.target.value, searchType.value);
});

function searchProducts(searchValue, type) {
    let term = searchValue.toLowerCase().trim();

    if (term === "") {
        drawCards();
        return;
    }

    let filtered = cards.filter((item) => {
        let title = item.title.toLowerCase();
        let category = item.Category.toLowerCase();

        return title.includes(term) || category.includes(term);
    });

    drawFilteredCards(filtered);

    if (filtered.length === 0) {
        allCards.innerHTML = `
            <div class="text-center w-100 py-5">
                <h3 class="text-muted">No results found for "${searchValue}"</h3>
                <p>Try searching for "Rings" or "Radiant"</p>
            </div>`;
    }
}

function drawFilteredCards(filteredList) {
    let productsInCart = localStorage.getItem("ProductsInCart")
        ? JSON.parse(localStorage.getItem("ProductsInCart"))
        : [];
    let favoritesItems = localStorage.getItem("productsFavorite")
        ? JSON.parse(localStorage.getItem("productsFavorite"))
        : [];

    let y = filteredList.map((item) => {
        let isProductAdded = productsInCart.some(p => Number(p.id) === Number(item.id));
        let isFavorite = favoritesItems.some(f => Number(f.id) === Number(item.id));

        return `
        <div class="col">
            <div class="card product-card p-2 h-100">
                <img src="${item.img}" class="card-img-top product-img" alt="${item.title}">
                <div class="card-body px-0 pb-0 text-start">
                    <h6 class="card-title">${item.title}</h6>
                    <p class="text-muted mb-1">Price: <span class="text-dark">${item.Price}</span></p>
                    <p class="text-muted mb-3">Category: ${item.Category}</p>
                    <div class="heart-box">
                        <input type="checkbox" id="heart-${item.id}" class="heart-input" 
                            ${isFavorite ? 'checked' : ''} 
                            onclick="addToFavorite(${item.id})">
                        <label for="heart-${item.id}" class="heart-label">
                            <i class="far fa-heart empty"></i>
                            <i class="fas fa-heart filled"></i>
                        </label>
                        ${isProductAdded ?
                `<button class="btn btn-danger px-4" onclick="removeFromCart(${item.id})">Remove From Cart</button>` :
                `<button class="btn btn-primary px-4" onclick="addToCart(${item.id})">Add to Cart</button>`
            }
                    </div>
                </div>
            </div>
        </div>`;
    }).join("");

    allCards.innerHTML = y;
}


