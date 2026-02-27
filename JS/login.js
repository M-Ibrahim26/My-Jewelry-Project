let firstName = document.querySelector("#firstName");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#login");

loginBtn.addEventListener("click", function (e) {
    e.preventDefault();

    let getFirstName = localStorage.getItem("firstName");
    let getPassword = localStorage.getItem("password");

    if (getFirstName && getFirstName.trim() === firstName.value.trim() &&
        getPassword && getPassword === password.value) {

        setTimeout(() => {
            window.location = "My Home.html";
        }, 100);
    } else {
        alert("Please try again.");
    }
});




