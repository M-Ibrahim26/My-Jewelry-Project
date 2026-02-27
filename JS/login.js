let firstName = document.querySelector("#firstName");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#login");

loginBtn.addEventListener("click", function (e) {
    e.preventDefault();

    let getFirstName = localStorage.getItem("firstName");
    let getPassword = localStorage.getItem("password");

    // هذه الأسطر تعمل هنا لأنها "داخل" نطاق المتغيرات
    console.log("Input Name:", firstName.value.trim());
    console.log("Stored Name:", getFirstName);

    if (getFirstName && getFirstName.trim() === firstName.value.trim() &&
        getPassword && getPassword === password.value) {

        setTimeout(() => {
            window.location = "home.html";
        }, 100);
    } else {
        alert("Please try again.");
    }
});



