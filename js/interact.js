//SHOW CONTENT ON CREATE
var contentText = document.getElementById("content");
var inputPoster = document.getElementById("inputPoster");

contentText.onclick = function(){
    if(inputPoster.style.display!== "none") {
        inputPoster.style.display = "none";
    } else {
        inputPoster.style.display = "block";
    }
}


//SHOW EQUALIZER ON CREATE
var equalizerText = document.getElementById("equalizer");
var inputEq = document.getElementById("equalizerInputs");
equalizerText.onclick = function(){
    if(inputEq.style.display!== "none") {
        inputEq.style.display = "none";
    } else {
        inputEq.style.display = "block";
    }
}

//SHOW CONTENT ON RANDOMIZER
var randomizerText = document.getElementById("randomizer");
var inputButtons = document.getElementById("inputButtons");

randomizerText.onclick = function(){
    if(inputButtons.style.display!== "none") {
        inputButtons.style.display = "none";
    } else {
        inputButtons.style.display = "block";
    }
}

//SHOW CONTENT ON Export
var exportText = document.getElementById("exportTitle");
var exportButtons = document.getElementById("exportContent");

exportText.onclick = function(){
    if(exportButtons.style.display!== "none") {
        exportButtons.style.display = "none";
    } else {
        exportButtons.style.display = "flex";
    }
}


//PNG e PDF
var buttonSavePNG= document.getElementById("savePNG");
buttonSavePNG.addEventListener("click", savePNG);
function savePNG() {
    saveCanvas(poster, 'GraphicGround', 'png');
}

    //Style (Temporário)
var buttonStyle = document.getElementById("stylePoster");
buttonStyle.addEventListener("change", styleChange);
function styleChange(){
    if(this.value=="classic") {
        template=classic_template;
    }
    else if(this.value=="modern") {
        template=modern_template;
    }
    else if(this.value=="postmodern") {
        template=postModern_template;
    }
    loadPosterStyles();
    layoutChange();
}

//RANDOMIZE LAYOUT
var buttonLayout = document.getElementById("buttonLayout");
buttonLayout.addEventListener("click", layoutChange);
function layoutChange(){
    titleLayout(titleText);
    subtitleLayout(subtitleText);
    aditionalInfoLayout(aditionalInfoText);
}

var buttonImagePosition = document.getElementById("buttonImagePosition");
buttonImagePosition.addEventListener("click", imagePositionChange);
function imagePositionChange(){
    calcPosImage();
}