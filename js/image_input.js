const imgInputHelper = document.getElementById("add-single-img");
const imgInputHelperLabel = document.getElementById("add-img-label");
const imgContainer = document.querySelector(".image_container");
const imgFiles = [];

const addImgHandler = () => {
    const file = imgInputHelper.files[0];
    if (!file) return;

    // Generate img preview
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const newImg = document.createElement("img");
        newImg.src = reader.result;
        const existingImg = imgContainer.querySelector("img");
        if (existingImg) {
            imgContainer.replaceChild(newImg, existingImg);
        } else {
            imgContainer.appendChild(newImg);
        }
    };

    // Store img file
    imgFiles.push(file);

    // Reset image input
    imgInputHelper.value = "";
};
imgInputHelper.addEventListener("change", addImgHandler);

const imageContainerHandler = () => {
    imgInputHelper.click();
};
imgContainer.addEventListener("click", imageContainerHandler);

const addImage = document.getElementById("addImage");
addImage.addEventListener("click", () => {
    imgInputHelper.click();
});

const deleteImage = document.getElementById("deleteImage");
deleteImage.addEventListener("click", () => {
    const existingImg = imgContainer.querySelector("img");
    if (existingImg) {
        imgContainer.removeChild(existingImg);
        imgFiles.length = 0;
        imgInputHelper.value = "";
    }
});