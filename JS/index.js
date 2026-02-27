let AddCardBtn = document.querySelectorAll(".btn-primary");
let AddHeart = document.querySelectorAll(".fa-heart");

function goToLogin() {
    window.location = "login.html";
}

AddCardBtn.forEach(function (btn) {
    btn.onclick = goToLogin;
});

AddHeart.forEach(function (heart) {
    heart.onclick = goToLogin;
});
//--------------------------------------------------------------------------


const searchInput = document.querySelector("#searchInput");
const searchType = document.querySelector("#searchType");
const allCardsContainer = document.querySelector(".cards");
const allProductCards = document.querySelectorAll(".cards .col"); 

searchInput.addEventListener("input", function (e) {
    let term = e.target.value.toLowerCase().trim();
    let type = searchType.value; 
    let foundAny = false;

    allProductCards.forEach(card => {
        let title = card.querySelector(".card-title").textContent.toLowerCase();
        let category = card.querySelector(".text-muted.small").textContent.toLowerCase();

        let targetText = (type === "name") ? title : category;

        if (targetText.includes(term)) {
            card.style.display = "block";
            foundAny = true;
        } else {
            card.style.display = "none";
        }
    });
});