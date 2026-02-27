let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let registerBtn = document.querySelector("#register");

registerBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (firstName.value === "" || lastName.value === "" || email.value === "" || password.value === "") {
        alert("Please fill in all fields.");
    } else {
        localStorage.setItem("firstName", firstName.value);
        localStorage.setItem("lastName", lastName.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);
        alert("Registration successful!");

        setTimeout(() => {
            window.location.href = "login.html";
        }, 100);
    }
});

