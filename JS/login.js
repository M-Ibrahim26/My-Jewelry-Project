// let firstName = document.querySelector("#firstName");
// let password = document.querySelector("#password");
// let loginBtn = document.querySelector("#login");

// let getFirstName = localStorage.getItem("firstName");
// let getPassword = localStorage.getItem("password");

// loginBtn.addEventListener("click", function (e) {
//     e.preventDefault();

//     if (getFirstName && getFirstName.trim() === firstName.value && getPassword && getPassword.trim() === password.value) {
//         setTimeout(() => {
//             window.location = "My Home.html";
//         }, 100);
//     } else {
//         alert("Please try again.");
//     }
// })

// المتغيرات الخاصة بالعناصر تبقى بالخارج
let firstName = document.querySelector("#firstName");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#login");

loginBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // ✅ انقل هذه الأسطر لهنا ليتم قراءة البيانات لحظة الضغط على الزر
    let getFirstName = localStorage.getItem("firstName");
    let getPassword = localStorage.getItem("password");

    // التحقق من المطابقة
    if (getFirstName && getFirstName.trim() === firstName.value.trim() &&
        getPassword && getPassword === password.value) {

        setTimeout(() => {
            // تأكد أن اسم الملف مطابق تماماً (حالة الأحرف والمسافات)
            window.location = "My Home.html";
        }, 100);
    } else {
        alert("Please try again.");
    }
});




