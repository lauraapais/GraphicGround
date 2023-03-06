var inputSpacer = document.getElementById("inputSpacer");
var inputBottom = document.getElementById("inputBottom");
var inputUpper = document.getElementById("inputUpper");




window.onload = (event) => {
    setInputSize();
};

function setInputSize() {
    var total = window.innerHeight*(100-8)/100;
    inputSpacer.style.height = Math.max(total - inputUpper.offsetHeight - inputBottom.offsetHeight, 0)+"px";
    return "RESIZED";
}


function scrollStop (callback, refresh = 66) {
    if (!callback || typeof callback !== 'function') return;

    // Setup scrolling variable
    let isScrolling;

    // Listen for scroll events
    window.addEventListener('scroll', function (event) {

        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(callback, refresh);
        document.documentElement.style.setProperty('--my-color', '#1D1D1D');
    }, false);

}

scrollStop(function () {
    document.documentElement.style.setProperty('--my-color', 'transparent');
});


