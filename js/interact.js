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

async function layoutChange(calls = 0) {
    clearAvailability();

    randomTexture = randInt(0, texturePosModern.length);
    randomFrame = s1Sketch.int(s1Sketch.random(0, 2));

    for (let i = 0; i < mix_template.composition.fillRows.length; i++) {
        for (let x = 0; x < mix_template.composition.columns; x++) {
            gridArray[mix_template.composition.fillRows[i] - 1][x] = 1;
        }
    }
    imageInfo.rotation = mix_template.image[0].rotation[randInt(0, mix_template.image[0].rotation.length)];
    if (effectImg) {
        await imageChange(true);
        await imagePosition();
    }

    let error = false;
    if (calls < maxCalls) {
        error = await titleLayout(0);
        if (!error)
            error = await subtitleLayout(0);
        if (!error)
            error = await aditionalInfoLayout(0);
        if (error) await layoutChange(calls + 1);
    }
}

function clearAvailability() {
    gridArray = create2Darr(12, mix_template.composition.columns);
}

async function setTextAvailability() {
    await setGridAvailability(textInputs.title);
    await setGridAvailability(textInputs.subtitle);
    await setGridAvailability(textInputs.aditionalInfo);
}

async function imagePosition() {
    await calcPosImage();
    await setGridAvailability(imageInfo);
}

async function imageChange(recreate = false) {
    if (effectImg) {
        let pOverflow = imageInfo.overflow;

        if (originalImg) {
            effectImg = imageEffect(originalImg);
        } else {
            effectImg = createShape(recreate);
        }
        /*if (imageInfo.overflow != pOverflow) {
            if(effectImg instanceof p5.Image || effectImg instanceof Object) effectImg = imageEffect(originalImg);
            else if(effectImg instanceof p5.Graphics) effectImg = createShape(recreate);
        }*/
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

var formatPoster = document.getElementById("formatPoster");
formatPoster.addEventListener("change", changeFormat);

async function changeFormat(){
    await setFormat(this.value);
}

// Function to handle the radio button change event
async function orientationChange(event) {
    await changeOrientation(event.target.value);
}

// Add event listeners to the radio buttons
const orientationButtons = document.querySelectorAll('input[type="radio"][name="orientation"]');
orientationButtons.forEach(orientationButton => {
    orientationButton.addEventListener('change', orientationChange);
});

function setActiveOrientationButton(value) {
    orientationButtons.forEach(orientationButton => {
        if (orientationButton.value == value) {
            orientationButton.checked = true;
        }
    });
}

var loadCanvas = document.getElementById("loadCanvas");
var loaded = false;
function loadComplete() {
    loaded = true;
    loadCanvas.classList.add("hide");
}