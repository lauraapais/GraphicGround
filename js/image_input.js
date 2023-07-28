var imgInputHelper = document.getElementById("add-single-img");
var imgContainer = document.querySelector(".image_container");
var imgFiles = [];

var addImgHandler = async () => {
    var file = imgInputHelper.files[0];
    if (!file) return;

    // Generate img preview
    var reader = new FileReader();
    reader.readAsDataURL(file);
    await new Promise((resolve, reject) => {
        reader.onload = () => {
            var newImg = document.createElement("img");
            newImg.src = reader.result;

            originalImg = s1Sketch.loadImage(reader.result, originalImg => {
                effectImg = imageEffect(originalImg);
                layoutChange();
            }); // LOAD TO P5.JS VARIABLE


            var existingImg = imgContainer.querySelector("img");
            if (existingImg) {
                imgContainer.replaceChild(newImg, existingImg);
            } else {
                imgContainer.appendChild(newImg);
            }
            ;
        }
        reader.onerror = reject;
    });

    // Store img file
    imgFiles.push(file);

    // Reset image input
    imgInputHelper.value = "";
};
imgInputHelper.addEventListener("change", addImgHandler);

var imageContainerHandler = () => {
    imgInputHelper.click();
};

imgContainer.addEventListener("click", imageContainerHandler);

var addImage = document.getElementById("addImage");
addImage.addEventListener("click", () => {
    imgInputHelper.click();
});

var deleteImage = document.getElementById("deleteImage");
deleteImage.addEventListener("click", () => {
    var existingImg = imgContainer.querySelector("img");
    if (existingImg) {
        imgContainer.removeChild(existingImg);
        imgFiles.length = 0;
        imgInputHelper.value = "";
        originalImg = null;
        effectImg = null;
    }
    triangleTemplate(0);
});

