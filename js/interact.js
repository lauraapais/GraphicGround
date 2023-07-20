// SHOW CONTENT ON CREATE
var mainPoster = document.getElementById("mainPoster");
var contentText = document.getElementById("content");
var currentFontRandom;

contentText.onclick = function () {
    if (mainPoster.classList.contains("hide")) {
        mainPoster.classList.remove("hide");
        mainEqualize.classList.add("hide");
        mainRandomizer.classList.add("hide");
    } else {
        mainPoster.classList.add("hide");
    }
}

// SHOW EQUALIZER ON CREATE
var mainEqualize = document.getElementById("mainEqualizer");
var equalizerText = document.getElementById("equalizer");

equalizerText.onclick = function () {
    if (mainEqualize.classList.contains("hide")) {
        mainEqualize.classList.remove("hide");
        mainPoster.classList.add("hide");
        mainRandomizer.classList.add("hide");
    } else {
        mainEqualize.classList.add("hide");
    }
}

// SHOW RANDOMIZER ON RANDOMIZER
var mainRandomizer = document.getElementById("mainRandomizer");
var randomizerText = document.getElementById("randomizer");

randomizerText.onclick = function () {
    if (mainRandomizer.classList.contains("hide")) {
        mainRandomizer.classList.remove("hide");
        mainPoster.classList.add("hide"); // Hide the content
        mainEqualize.classList.add("hide"); // Hide the equalizer
    } else {
        mainRandomizer.classList.add("hide");
    }
}

//SHOW CONTENT ON Export
var exportText = document.getElementById("exportTitle");
var mainExport = document.getElementById("mainExport");

exportText.onclick = function () {
    if (mainExport.classList.contains("hide")) {
        mainExport.classList.remove("hide");
    } else {
        mainExport.classList.add("hide");
    }
}


//PNG e PDF
var buttonSavePNG = document.getElementById("savePNG");
buttonSavePNG.addEventListener("click", savePNG);

function savePNG() {
    s1Sketch.saveCanvas(poster, 'GraphicGround', 'png');
}

//Style (Temporário)
//var buttonStyle = document.getElementById("stylePoster");
//buttonStyle.addEventListener("change", styleChange);

function styleChange() {
    /*if (this.value == "classic") {
        //template=classic_template;
        setTemplate(classic_template);
    } else if (this.value == "modern") {
        //template=modern_template;
        setTemplate(modern_template);
    } else if (this.value == "postmodern") {
        //template=postModern_template;
        setTemplate(postModern_template);
    }*/
    generateTemplate(
        att_template.figura,
        att_template.cor,
        att_template.tipografia,
        att_template.composicao
    );
    loadPosterStyles();
    layoutChange();
}

//RANDOMIZE LAYOUT
var buttonLayout = document.getElementById("buttonLayout");
buttonLayout.addEventListener("click", function () {
    layoutChange();
});

var gridArray;
var layoutError = false;

function layoutChange(calls = 0) {
    layoutError = false;
    gridArray = create2Darr(12, mix_template.composition.columns);
    randomTexture = randInt(0, texturePosModern.length);
    randomFrame = s1Sketch.int(s1Sketch.random(0, 2));

    for (let i = 0; i < mix_template.composition.fillRows.length; i++) {
        for (let x = 0; x < mix_template.composition.columns; x++) {
            gridArray[mix_template.composition.fillRows[i] - 1][x] = 1;
        }
    }
    //imageInfo.rotation = mix_template.image[0].rotation[randInt(0, mix_template.image[0].rotation.length)];

    imageChange();

    let error = false;
    if (calls < maxCalls) {
        error = titleLayout(0);
        if (!error)
            error = subtitleLayout(0);
        if (!error)
            error = aditionalInfoLayout(0);
        if (error) layoutChange(calls + 1);
    }
}

function imageChange(recreate = false) {
    if (effectImg) {
        let pOverflow = imageInfo.overflow;
        calcPosImage();
        if (imageInfo.overflow != pOverflow) {
            if(effectImg instanceof p5.Image) effectImg = imageEffect(originalImg);
            else if(effectImg instanceof p5.Graphics) effectImg = createShape(recreate);
        }
        setGridAvailability(imageInfo);
    }
}


//RANDOMIZE FONT
var buttonFont = document.getElementById("buttonFont");
buttonFont.addEventListener("click", fontChange);

function fontChange() {
    setTemplateFont(randTemplate(att_template.tipografia));

    textInputs.title.content = formatText(titleText.value, mix_template.text.titleCollumns[0] * gridValues.sizeColumn + (mix_template.text.titleCollumns[0] - 1) * gridValues.gapColumn, textInputs.title.size, mix_template.text.titleCollumns[0], mix_template.text.fontTitle);
    textInputs.subtitle.content = formatText(subtitleText.value, mix_template.text.titleCollumns[0] * gridValues.sizeColumn + (mix_template.text.titleCollumns[0] - 1) * gridValues.gapColumn, textInputs.subtitle.size, mix_template.text.titleCollumns[0], mix_template.text.fontOthers);
    textInputs.aditionalInfo.content = formatText(aditionalInfoText.value, mix_template.text.titleCollumns[0] * gridValues.sizeColumn + (mix_template.text.titleCollumns[0] - 1) * gridValues.gapColumn, textInputs.aditionalInfo.size, mix_template.text.titleCollumns[0], mix_template.text.fontOthers);
}

//RANDOMIZE COLOR
var buttonColors = document.getElementById("buttonColors");
buttonColors.addEventListener("click", colorsChange);

function colorsChange() {
    setTemplateColors(randTemplate(att_template.cor));
    shapeChange(true);
    if (effectImg instanceof p5.Image) {
        if (mix_template.image[0].effect == "duotone") {
            effectImg = originalImg;
            effectImg.resize(imageInfo.width, 0);
            effectImg = getDuotoneVersion(effectImg, mix_template.palettes.image.one, mix_template.palettes.image.two);
        }
    }
}


//RANDOMIZE SHAPE
var buttonShape = document.getElementById("buttonShape");
buttonShape.addEventListener("click", shapeChange);

function shapeChange(recreate = false) {
    if (effectImg instanceof p5.Graphics) effectImg = createShape(recreate);
}