
var menuMobileIcon = document.getElementById("openMenu");
var closeMobileIcon = document.getElementById("closeMenu");
var menuMobile = document.getElementById("menu");
menuMobileIcon.addEventListener("click", function(){
    if(menuMobile.style.top!== "-100vh") {
        menuMobile.style.top = "-100vh";
    } else {
        menuMobile.style.top = "0";
    }
})

closeMobileIcon.addEventListener("click", function(){
    if(menuMobile.style.top!== "-100vh") {
        menuMobile.style.top = "-100vh";
    } else {
        menuMobile.style.top = "0";
    }
})