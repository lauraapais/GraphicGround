var menuMobileIcon = document.getElementById("openMenu");
var closeMobileIcon = document.getElementById("closeMenu");
var menuMobile = document.getElementById("menu");

menuMobileIcon.addEventListener("click", function(){
    menuMobile.style.left = "0";
})

closeMobileIcon.addEventListener("click", function(){
    menuMobile.style.left = "100vw";
})