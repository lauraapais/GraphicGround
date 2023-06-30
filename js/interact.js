//SHOW CONTENT ON CREATE
var contentText = document.getElementById("content");
var inputPoster = document.getElementById("inputPoster");
var currentFontRandom;

contentText.onclick = function () {
    if (inputPoster.classList.contains("hide")) {
        inputPoster.classList.remove("hide");
    } else {
        inputPoster.classList.add("hide");
    }
}


//SHOW EQUALIZER ON CREATE
var equalizerText = document.getElementById("equalizer");
var inputEq = document.getElementById("equalizerInputs");

equalizerText.onclick = function () {
    if (inputEq.classList.contains("hide")) {
        inputEq.classList.remove("hide");
    } else {
        inputEq.classList.add("hide");
    }
}

//SHOW CONTENT ON RANDOMIZER
var randomizerText = document.getElementById("randomizer");
var inputButtons = document.getElementById("inputButtons");

randomizerText.onclick = function () {
    if (inputButtons.classList.contains("hide")) {
        inputButtons.classList.remove("hide");
    } else {
        inputButtons.classList.add("hide");
    }
}

//SHOW CONTENT ON Export
var exportText = document.getElementById("exportTitle");
var exportButtons = document.getElementById("exportContent");

exportText.onclick = function () {
    if (exportButtons.classList.contains("hide")) {
        exportButtons.classList.remove("hide");
    } else {
        exportButtons.classList.add("hide");
    }
}


//PNG e PDF
var buttonSavePNG = document.getElementById("savePNG");
buttonSavePNG.addEventListener("click", savePNG);

function savePNG() {
    saveCanvas(poster, 'GraphicGround', 'png');
}

//Style (Temporário)
var buttonStyle = document.getElementById("stylePoster");
buttonStyle.addEventListener("change", styleChange);

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
    imageInfo.rotation = mix_template.image[0].rotation[randInt(0, mix_template.image[0].rotation.length)];

    if (effectImg) {
        let pOverflow = imageInfo.overflow;
        calcPosImage();
        if (imageInfo.overflow != pOverflow) {
            if(effectImg instanceof p5.Image) effectImg = imageEffect(originalImg);
            else if(effectImg instanceof p5.Graphics) effectImg = createShape();
        }
        setGridAvailability(imageInfo);
    }
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


//RANDOMIZE FONT
var buttonFont = document.getElementById("buttonFont");
buttonFont.addEventListener("click", fontChange);

function fontChange() {
    /*if (buttonStyle.value == "classic") {
        //template=classic_template;
        setTemplate(classic_template);
    } else if (buttonStyle.value == "modern") {
        //template=modern_template;
        setTemplate(modern_template);
    } else if (buttonStyle.value == "postmodern") {
        //template=postModern_template;
        setTemplate(postModern_template);
    }*/
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
    shapeChange();
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

function shapeChange() {
    let sketch = s1.sketch;
    if (effectImg instanceof p5.Graphics) effectImg = createShape(sketch);
}