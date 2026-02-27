let firstName = document.querySelector("#firstName");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#login");

let getFirstName = localStorage.getItem("firstName");
let getPassword = localStorage.getItem("password");

loginBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (getFirstName && getFirstName.trim() === firstName.value && getPassword && getPassword.trim() === password.value) {
        setTimeout(() => {
            window.location = "My home.html";
        }, 100);
    } else {
        alert("Please try again.");
    }
})





