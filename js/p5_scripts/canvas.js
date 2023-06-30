var s1;
var s1Sketch;

var att_template = {"figura": [1, 0, 0], "cor": [1, 0, 0], "tipografia": [1, 0, 0], "composicao": [1, 0, 0]}


var canvas_parent = document.getElementById("canvas_parent");
var showGridsButton = document.getElementById("checkboxGrid");
var poster;
var randomTexture, randomFrame;
var texturePosModern = [];

//var canvasValues;
//var gridValues;
var nLinhastmp = 12;
var fonts = {};

var textInputs = {
    "title": {
        "content": {"text": null, "nBreaks": null},
        "rowStart": null,
        "columnStart": null,
        "rowEnd": null,
        "columnEnd": null,
        "size": null,
        "rotation": null
    },
    "subtitle": {
        "content": {"text": null, "nBreaks": null},
        "rowStart": null,
        "columnStart": null,
        "rowEnd": null,
        "columnEnd": null,
        "size": null,
        "rotation": null
    },
    "aditionalInfo": {
        "content": {"text": null, "nBreaks": null},
        "rowStart": null,
        "columnStart": null,
        "rowEnd": null,
        "columnEnd": null,
        "size": null,
        "rotation": null
    },
    "pattern": {"rowStart": null, "columnStart": null, "nRows": null, "nColumns": null}
}

/* INPUT TEXT */
var titleText = document.getElementById("title");
titleText.addEventListener("change", titleLayout);

var subtitleText = document.getElementById("subtitle");
subtitleText.addEventListener("change", subtitleLayout);

var aditionalInfoText = document.getElementById("aditionalInfo");
aditionalInfoText.addEventListener("change", aditionalInfoLayout);

var originalImg = null, effectImg = null;
var imageInfo = {
    "width": 0,
    "height": 0,
    "posX": 0,
    "posY": 0,
    "originalWidth": 0,
    "orientation": 0,
    "rotation": 0,
    "overflow": 0
};

var maxCalls = 20;

s1 = function (sketch) {
    s1Sketch = sketch;
    
    s1Sketch.preload = function () {
        loadTemplates();
        //Clássico
        fonts["PlayfairDisplay-Bold"] = s1Sketch.loadFont('data/fonts/classic/PlayfairDisplay-Bold.ttf');
        fonts["PlayfairDisplay-Regular"] = s1Sketch.loadFont('data/fonts/classic/PlayfairDisplay-Regular.ttf');
        fonts["BodoniModa_18pt-Bold"] = s1Sketch.loadFont('data/fonts/classic/BodoniModa_18pt-Bold.ttf');
        fonts["BodoniModa_18pt-Regular"] = s1Sketch.loadFont('data/fonts/classic/BodoniModa_18pt-Regular.ttf');
        fonts["Oranienbaum-Regular"] = s1Sketch.loadFont('data/fonts/classic/Oranienbaum-Regular.ttf');
        fonts["Brygada1918-Bold"] = s1Sketch.loadFont('data/fonts/classic/Brygada1918-Bold.ttf');
        fonts["Brygada1918-Regular"] = s1Sketch.loadFont('data/fonts/classic/Brygada1918-Regular.ttf');
        fonts["Melodrama-Bold"] = s1Sketch.loadFont('data/fonts/classic/Melodrama-Bold.otf');
        fonts["Melodrama-Regular"] = s1Sketch.loadFont('data/fonts/classic/Melodrama-Regular.otf');

        //Modern
        fonts["Satoshi-Black"] = s1Sketch.loadFont('data/fonts/modern/Satoshi-Black.otf');
        fonts["Satoshi-Medium"] = s1Sketch.loadFont('data/fonts/modern/Satoshi-Medium.otf');
        fonts["GeneralSans-Bold"] = s1Sketch.loadFont('data/fonts/modern/GeneralSans-Bold.woff');
        fonts["GeneralSans-Medium"] = s1Sketch.loadFont('data/fonts/modern/GeneralSans-Medium.woff');
        fonts["Inter-Bold"] = s1Sketch.loadFont('data/fonts/modern/Inter-Bold.ttf');
        fonts["Inter-Medium"] = s1Sketch.loadFont('data/fonts/modern/Inter-Medium.ttf');
        fonts["Poppins-Bold"] = s1Sketch.loadFont('data/fonts/modern/Poppins-Bold.ttf');
        fonts["Poppins-Medium"] = s1Sketch.loadFont('data/fonts/modern/Poppins-Medium.ttf');
        fonts["Switzer-Black"] = s1Sketch.loadFont('data/fonts/modern/Switzer-Black.otf');
        fonts["Switzer-Medium"] = s1Sketch.loadFont('data/fonts/modern/Switzer-Medium.otf');

        //Pós Moderno
        fonts["SyneMono-Regular"] = s1Sketch.loadFont('data/fonts/postModern/SyneMono-Regular.ttf');
        fonts["Redacted-Regular"] = s1Sketch.loadFont('data/fonts/postModern/Redacted-Regular.ttf');
        fonts["esimene"] = s1Sketch.loadFont('data/fonts/postModern/esimene.otf');
        fonts["Jaan"] = s1Sketch.loadFont('data/fonts/postModern/Jaan.ttf');
        fonts["davidcarson-Regular"] = s1Sketch.loadFont('data/fonts/postModern/davidcarson-Regular.otf');


        texturePosModern.push(s1Sketch.loadImage('data/textures/texture1.png'));
        texturePosModern.push(s1Sketch.loadImage('data/textures/texture2.png'));
    }

    s1Sketch.setup = function () {
        triangleTemplate();

        let panel = document.getElementById("canvas_poster");

        poster = s1Sketch.createCanvas(0, 0);
        poster.parent(panel);

        onResize(sketch);
        layoutChange();
    }

    s1Sketch.draw = function () {
        s1Sketch.background(mix_template.palettes.background[0], mix_template.palettes.background[1], mix_template.palettes.background[2]);

        s1Sketch.push();
        s1Sketch.translate(canvasValues.marginWidth, canvasValues.marginHeight);

        //frame
        if (mix_template.composition.type == "Classic" && randomFrame == 0) {
            s1Sketch.noFill();
            s1Sketch.rect(0, 0, canvasValues.posterWidth, canvasValues.posterHeight);
        }

        //image
        if (effectImg) {
            s1Sketch.push();
            if (imageInfo.overflow == -1) {
                s1Sketch.translate(-canvasValues.marginWidth, 0)
            }

            if (effectImg instanceof p5.Image || effectImg instanceof p5.Graphics) {
                s1Sketch.push();
                s1Sketch.translate(imageInfo.posX, imageInfo.posY);
                s1Sketch.translate(imageInfo.width / 2, imageInfo.height / 2);
                if (effectImg instanceof p5.Image) {
                    s1Sketch.rotate(imageInfo.rotation);
                }
                s1Sketch.translate(-imageInfo.width / 2, -imageInfo.height / 2);
                s1Sketch.image(effectImg, 0, 0, imageInfo.width, imageInfo.height);
                s1Sketch.pop();
            } else {
                s1Sketch.push();
                s1Sketch.translate(imageInfo.posX - canvasValues.posterWidth / 2, imageInfo.posY);
                s1Sketch.drawEngravingVersion(effectImg);
                s1Sketch.pop();
            }
            s1Sketch.pop();
        }

        //text

        drawText(textInputs, gridValues, sketch);

        //show grids
        if (showGridsButton.checked == true) {
            drawGrid(sketch);
        }

        s1Sketch.pop();

        if (mix_template.image[0].texture) {
            s1Sketch.blendMode(s1Sketch.LIGHTEST);
            s1Sketch.image(texturePosModern[randomTexture], 0, 0, canvasValues.canvasWidth, canvasValues.canvasHeight);
            s1Sketch.blendMode(s1Sketch.BLEND);
        }
    }
}

new p5(s1);

function triangleTemplate() {
    generateTemplate(
        getJsonObjectById(points, 0),
        getJsonObjectById(points, 1),
        getJsonObjectById(points, 2),
        getJsonObjectById(points, 3),
    );
}

function drawGrid(sketch) {
    s1Sketch.noFill();
    s1Sketch.stroke(0);
    s1Sketch.rect(0, 0, canvasValues.posterWidth, canvasValues.posterHeight);

    for (var i = 1; i <= (gridValues.nColumns - 1); i++) {
        s1Sketch.line(gridValues.sizeColumn * i + gridValues.gapColumn * (i - 1), 0, gridValues.sizeColumn * i + gridValues.gapColumn * (i - 1), canvasValues.posterHeight);
        s1Sketch.line(gridValues.sizeColumn * i + gridValues.gapColumn * i, 0, gridValues.sizeColumn * i + gridValues.gapColumn * i, canvasValues.posterHeight);
    }

    for (var i = 1; i <= (gridValues.nRows - 1); i++) {
        s1Sketch.line(0, gridValues.sizeRow * i + gridValues.gapRow * (i - 1), canvasValues.posterWidth, gridValues.sizeRow * i + gridValues.gapRow * (i - 1));
        s1Sketch.line(0, gridValues.sizeRow * i + gridValues.gapRow * i, canvasValues.posterWidth, gridValues.sizeRow * i + gridValues.gapRow * i);
    }
}

function calcGrid(nColumns, columnGapScale, gridWidth, nRows, rowGapScale, gridHeight, sketch) {
    var gapColumn = s1Sketch.min(gridWidth / (nColumns - 1), gridWidth) * columnGapScale;

    var sizeColumn = (gridWidth - (gapColumn * (nColumns - 1))) / nColumns;

    var gapRow = gridHeight / (nRows - 1) * rowGapScale;
    var sizeRow = (gridHeight - (gapRow * (nRows - 1))) / nRows;

    return {
        "nColumns": nColumns, "gapColumn": gapColumn, "sizeColumn": sizeColumn,
        "nRows": nRows, "gapRow": gapRow, "sizeRow": sizeRow
    };
}

function calcPoster(canvasWidth, canvasHeight, marginXScale, marginYScale) {
    var marginWidth = canvasWidth / 2 * marginXScale;
    var marginHeight = canvasHeight / 2 * marginYScale;

    return {
        "canvasWidth": canvasWidth, "canvasHeight": canvasHeight,
        "posterWidth": (canvasWidth - marginWidth * 2), "posterHeight": (canvasHeight - marginHeight * 2),
        "marginWidth": marginWidth, "marginHeight": marginHeight
    }
}

function onResize(sketch) {
    var v = windowSize(sketch);

    s1Sketch.resizeCanvas(v.x, v.y);

    loadPosterStyles(sketch);
}

function loadPosterStyles(sketch) {
    canvasValues = calcPoster(s1Sketch.width, s1Sketch.height, 0.12, 0.12);
    gridValues = calcGrid(mix_template.composition.columns, 0.12, canvasValues.posterWidth, nLinhastmp, 0.17, canvasValues.posterHeight, sketch);
    // LOAD IMAGE EFFECT
    if (originalImg) {
        effectImg = imageEffect(originalImg);
    } else {
        effectImg = createShape();
    }
}

function windowSize(sketch) {
    var scale = 0.45;
    var wDiv = canvas_parent.clientWidth;
    var wPoster = 297;
    var hPoster = 420;

    return s1Sketch.createVector(wDiv * scale, hPoster * wDiv * scale / wPoster);
}

function formatText(txt, boxWidth, txtSize, nCollumns, currentFont, rot) {
    s1Sketch.textFont(fonts[currentFont]);
    s1Sketch.textSize(txtSize);
    s1Sketch.textLeading(txtSize * 1);

    var outputText = "";
    var currentText = "";
    var words = s1Sketch.split(txt, ' ');
    var nBreaks = 0;
    for (var i = 0; i < words.length; i++) { // Roda todas as palavras
        if (fonts[currentFont].textBounds(currentText + words[i], 0, 0, txtSize).w > boxWidth * mix_template.text.marginText) { // Verifica se o tamanho da linha atual + a palavra atual superou o tamanho da caixa
            if (fonts[currentFont].textBounds(words[i], 0, 0, txtSize).w > boxWidth * .8) {
                for (var j = 0; j < words[i].length; j++) { // Roda todas as letras
                    if (fonts[currentFont].textBounds(currentText + words[i].charAt(j) + "-", 0, 0, txtSize).w > boxWidth) {
                        if (j > 0) {
                            outputText += "-\n" + words[i].charAt(j);
                        } else {
                            outputText += "\n" + words[i].charAt(j);
                        }
                        currentText = words[i].charAt(j);
                        nBreaks++;
                    } else {
                        if (i != 0 && j == 0) {
                            outputText += " ";
                            currentText += " ";
                        }
                        outputText += words[i].charAt(j);
                        currentText += words[i].charAt(j);
                    }
                }
            } else {
                outputText += "\n" + words[i];
                currentText = words[i];
                nBreaks++;
            }
        } else {
            if (currentText != "") {
                outputText += " ";
                currentText += " ";
            }
            outputText += words[i];
            currentText += words[i];
        }
    }
    let boundingBox = fonts[currentFont].textBounds(outputText, 0, 0, txtSize);

    return {
        "text": outputText, "nBreaks": nBreaks, "leading": txtSize * 1, "boxWidth": boxWidth,
        "boundingRotateBox": calculateBoundingBox(boundingBox.w, boundingBox.h, s1Sketch.radians(rot)),
        "boundingBox": {w: boundingBox.w, h: boundingBox.h}
    };
}

function drawText(textInputs, gridValues, sketch) {
    s1Sketch.fill(mix_template.palettes.text[0], mix_template.palettes.text[1], mix_template.palettes.text[2]);
    s1Sketch.noStroke();

    s1Sketch.textFont(fonts[mix_template.text.fontTitle]);
    textSetup(textInputs.title, gridValues, sketch);

    s1Sketch.textFont(fonts[mix_template.text.fontOthers]);
    textSetup(textInputs.subtitle, gridValues, sketch);

    s1Sketch.fill(mix_template.palettes.additionalInformation[0], mix_template.palettes.additionalInformation[1], mix_template.palettes.additionalInformation[2]);
    textSetup(textInputs.aditionalInfo, gridValues, sketch);
}

function textSetup(textInput, gridValues, sketch) {
    s1Sketch.push();
    let xValue = gridValues.sizeColumn * (textInput.columnStart) + gridValues.gapColumn * Math.max(0, textInput.columnStart);
    let yValue = gridValues.sizeRow * (textInput.rowStart) + gridValues.gapRow * Math.max(0, textInput.rowStart) - textInput.size / 5;
    if (mix_template.text.alignment[0] == 0) {
        s1Sketch.textAlign(s1Sketch.LEFT, s1Sketch.TOP);
    } else if (mix_template.text.alignment[0] == 1) {
        s1Sketch.textAlign(s1Sketch.CENTER, s1Sketch.TOP);
        s1Sketch.translate(textInput.content.boxWidth / 2, 0);
    } else if (mix_template.text.alignment[0] == 2) {
        s1Sketch.textAlign(s1Sketch.LEFT, s1Sketch.TOP);
        s1Sketch.translate(textInput.xRotate, textInput.yRotate);
        s1Sketch.translate(textInput.content.boundingRotateBox.w / 2, textInput.content.boundingRotateBox.h / 2);
        s1Sketch.rotate(s1Sketch.radians(textInput.rotation));
        s1Sketch.translate(-textInput.content.boundingBox.w / 2 - xValue, -textInput.content.boundingBox.h / 2 - yValue);
    }

    if (textInput.content.text != null && textInput.content.text != "") {
        s1Sketch.textSize(textInput.size);
        s1Sketch.textLeading(textInput.content.leading);
        s1Sketch.text(textInput.content.text, xValue, yValue);
    }
    s1Sketch.pop();
}

function gridAvailability(inputInfo) {
    for (let y = inputInfo.columnStart; y <= inputInfo.columnEnd; y++) {
        for (let x = inputInfo.rowStart; x <= inputInfo.rowEnd; x++) {
            if (gridArray[x][y] == 1) {
                return false;
            }
        }
    }
    return true;
}

function setGridAvailability(inputInfo) {
    for (let y = inputInfo.columnStart; y <= inputInfo.columnEnd; y++) {
        for (let x = inputInfo.rowStart; x <= inputInfo.rowEnd; x++) {
            gridArray[x][y] = 1;
        }
    }
}

function titleLayout(calls = 0) {
    var text = titleText.value;

    var nColumns = mix_template.text.titleCollumns[0];
    textInputs.title.size = nColumns * mix_template.text.titleScale;
    textInputs.title.columnStart = randInt(0, mix_template.composition.columns - nColumns + 1);
    textInputs.title.columnEnd = textInputs.title.columnStart + nColumns;

    textInputs.title.rotation = mix_template.text.rotation[randInt(0, mix_template.text.rotation.length)];

    textInputs.title.content = formatText(text, nColumns * gridValues.sizeColumn + (nColumns - 1) * gridValues.gapColumn,
        textInputs.title.size, nColumns, mix_template.text.fontTitle, textInputs.title.rotation);

    var textHeight = (textInputs.title.content.nBreaks + 1) * textInputs.title.size + textInputs.title.content.nBreaks * (1 - textInputs.title.content.leading);
    var nRows = Math.round(textHeight / gridValues.sizeRow);

    textInputs.title.rowStart = randInt(0, nLinhastmp - nRows);
    textInputs.title.rowEnd = textInputs.title.rowStart + nRows;

    if (mix_template.composition.overlay == 0) {
        if (!gridAvailability(textInputs.title) && calls <= maxCalls) {
            return titleLayout(calls + 1);
        } else {
            setGridAvailability(textInputs.title);
        }
    }

    textInputs.title.xRotate = Math.random() * (canvasValues.posterWidth - textInputs.title.content.boundingRotateBox.w);
    textInputs.title.yRotate = Math.random() * (canvasValues.posterHeight - textInputs.title.content.boundingRotateBox.h);

    if (calls == maxCalls) return true
    else return false
}

function subtitleLayout(calls = 1) {
    var text = subtitleText.value;

    var nColumns = mix_template.text.subTitleCollumns[0];
    textInputs.subtitle.size = nColumns * mix_template.text.subTitleScale;
    textInputs.subtitle.columnStart = randInt(0, mix_template.composition.columns - nColumns + 1);
    textInputs.subtitle.columnEnd = textInputs.subtitle.columnStart + nColumns;

    textInputs.subtitle.rotation = mix_template.text.rotation[randInt(0, mix_template.text.rotation.length)];

    textInputs.subtitle.content = formatText(text, nColumns * gridValues.sizeColumn + (nColumns - 1) * gridValues.gapColumn,
        textInputs.subtitle.size, nColumns, mix_template.text.fontOthers, textInputs.subtitle.rotation);

    var textHeight = (textInputs.subtitle.content.nBreaks + 1) * textInputs.subtitle.size + textInputs.subtitle.content.nBreaks * (1 - textInputs.subtitle.content.leading);

    var nRows = Math.round(textHeight / gridValues.sizeRow);

    textInputs.subtitle.rowStart = randInt(0, nLinhastmp - nRows);
    textInputs.subtitle.rowEnd = textInputs.subtitle.rowStart + nRows;

    if (mix_template.composition.overlay == 0) {
        if (!gridAvailability(textInputs.subtitle) && calls <= maxCalls) {
            return subtitleLayout(calls + 1);
        } else {
            setGridAvailability(textInputs.subtitle);
        }
    }

    textInputs.subtitle.xRotate = Math.random() * (canvasValues.posterWidth - textInputs.subtitle.content.boundingRotateBox.w);
    textInputs.subtitle.yRotate = Math.random() * (canvasValues.posterHeight - textInputs.subtitle.content.boundingRotateBox.h);

    if (calls == maxCalls) return true
    else return false
}

function aditionalInfoLayout(calls = 0) {
    var text = aditionalInfoText.value;

    var nColumns = mix_template.text.additionalCollumns[0];
    textInputs.aditionalInfo.size = nColumns * mix_template.text.additionalScale;
    textInputs.aditionalInfo.columnStart = randInt(0, mix_template.composition.columns - nColumns + 1);
    textInputs.aditionalInfo.columnEnd = textInputs.aditionalInfo.columnStart + nColumns;

    textInputs.aditionalInfo.rotation = mix_template.text.rotation[randInt(0, mix_template.text.rotation.length)];

    textInputs.aditionalInfo.content = formatText(text, nColumns * gridValues.sizeColumn + (nColumns - 1) * gridValues.gapColumn,
        textInputs.aditionalInfo.size, nColumns, mix_template.text.fontOthers, textInputs.aditionalInfo.rotation);

    var textHeight = (textInputs.aditionalInfo.content.nBreaks + 1) * textInputs.aditionalInfo.size + textInputs.aditionalInfo.content.nBreaks * (1 - textInputs.aditionalInfo.content.leading);
    var nRows = Math.round(textHeight / gridValues.sizeRow);

    textInputs.aditionalInfo.rowStart = randInt(0, nLinhastmp - nRows);
    textInputs.aditionalInfo.rowEnd = textInputs.aditionalInfo.rowStart + nRows;

    if (mix_template.composition.overlay == 0) {
        if (!gridAvailability(textInputs.aditionalInfo) && calls <= maxCalls) {
            return aditionalInfoLayout(calls + 1);
        } else {
            setGridAvailability(textInputs.aditionalInfo);
        }
    }

    textInputs.aditionalInfo.xRotate = Math.random() * (canvasValues.posterWidth - textInputs.aditionalInfo.content.boundingRotateBox.w);
    textInputs.aditionalInfo.yRotate = Math.random() * (canvasValues.posterHeight - textInputs.aditionalInfo.content.boundingRotateBox.h);

    if (calls == maxCalls) return true
    else return false
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function imageEffect(original) {
    let resizedImg = original;
    let original_size_w;

    if (original.height > original.width) {
        imageInfo.nCollumns = mix_template.image[0].columnsMinMaxHeight[0];

        imageInfo.orientation = 1;
        original_size_w = imageInfo.nCollumns * gridValues.sizeColumn + (imageInfo.nCollumns - 1) * gridValues.gapColumn;
        // OVERFLOW
        if (imageInfo.overflow != 0) {
            original_size_w += canvasValues.marginWidth;
        }
        // ---
        let original_size_h = original_size_w * original.height / original.width

        let image_size = original_size_h * mix_template.image[0].verticalScale[0];
        resizedImg.resize(0, image_size);
    } else {
        imageInfo.nCollumns = mix_template.image[0].columnsMinMaxWidth[0];

        imageInfo.orientation = 0;
        original_size_w = imageInfo.nCollumns * gridValues.sizeColumn + (imageInfo.nCollumns - 1) * gridValues.gapColumn;
        // OVERFLOW
        if (imageInfo.overflow != 0) {
            original_size_w += canvasValues.marginWidth;
        }
        // ---
        let image_size = original_size_w * mix_template.image[0].horizontalScale[0];
        resizedImg.resize(image_size, 0);
    }

    imageInfo.originalWidth = original_size_w;

    imageInfo.width = resizedImg.width;
    imageInfo.height = resizedImg.height;

    imageInfo.nRows = Math.round(imageInfo.height / (gridValues.sizeRow + gridValues.gapRow));

    effectImg = 1;

    if (mix_template.image[0].effect == "duotone") {
        return getDuotoneVersion(resizedImg, mix_template.palettes.image.one, mix_template.palettes.image.two);
    } else if (mix_template.image[0].effect == "blackWhite") {
        return getBlackWhiteVersion(resizedImg, 90);
    } else if (mix_template.image[0].effect == "engraving") {
        return getEngravingVersion(resizedImg, 2);
    } else {
        return resizedImg;
    }
}

async function calcPosImage() {
    if (mix_template.image[0].alignment == 1) { // CENTER
        imageInfo.posX = imageInfo.originalWidth / 2 - imageInfo.width / 2 + canvasValues.posterWidth / 2;
        imageInfo.columnStart = 0;
        imageInfo.columnEnd = gridValues.nColumns - 1;
        imageInfo.overflow = 0;

    } else if (mix_template.image[0].alignment == 0) { // IN GRID
        if (imageInfo.orientation == 1) {
            imageInfo.columnStart = randInt(0, mix_template.composition.columns - mix_template.image[0].columnsMinMaxHeight[0] + 1);
        } else if (imageInfo.orientation == 0) {
            imageInfo.columnStart = randInt(0, mix_template.composition.columns - mix_template.image[0].columnsMinMaxWidth[0] + 1);
        }

        // OVERFLOW
        if (imageInfo.columnStart == 0) {
            imageInfo.overflow = -1;
        } else if (imageInfo.columnStart == mix_template.composition.columns - mix_template.image[0].columnsMinMaxWidth[0]) {
            imageInfo.overflow = 1;
        } else {
            imageInfo.overflow = 0;
        }
        // ----

        imageInfo.posX = gridValues.sizeColumn * (imageInfo.columnStart) + gridValues.gapColumn * Math.max(0, imageInfo.columnStart);

        imageInfo.columnEnd = imageInfo.columnStart + imageInfo.nCollumns - 1;
    } else if (mix_template.image[0].alignment == 2) { // RANDOM
        imageInfo.posX = Math.random() * (canvasValues.posterWidth - imageInfo.width);
        imageInfo.posY = Math.random() * (canvasValues.posterHeight - imageInfo.height);
    }

    if (mix_template.image[0].alignment == 0 || mix_template.image[0].alignment == 1) {
        imageInfo.rowStart = randInt(0, gridValues.nRows - imageInfo.nRows);
        imageInfo.posY = imageInfo.rowStart * gridValues.sizeRow + imageInfo.rowStart * gridValues.gapRow;
        imageInfo.rowEnd = imageInfo.rowStart + imageInfo.nRows;
    }

    if (mix_template.overflow) imageInfo.overflow = 0;
}

function getDuotoneVersion(baseImg, cDark, cBright) {
    let newImg = createImage(baseImg.width, baseImg.height);
    for (var y = 0; y < baseImg.height; y++) {
        for (var x = 0; x < baseImg.width; x++) {
            let p = baseImg.get(x, y);
            let bright = 0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2];
            //let newP = color(bright);
            let r = map(bright, 0, 255, cDark[0], cBright[0]);
            let g = map(bright, 0, 255, cDark[1], cBright[1]);
            let b = map(bright, 0, 255, cDark[2], cBright[2]);
            let newP = color(r, g, b);
            newImg.set(x, y, newP);
        }
    }
    newImg.updatePixels();
    return newImg;
}

function getBlackWhiteVersion(baseImg, contrast) {
    let newImg = createImage(baseImg.width, baseImg.height);
    for (let y = 0; y < baseImg.height; y++) {
        for (let x = 0; x < baseImg.width; x++) {
            let p = baseImg.get(x, y);
            let l = (p[0] + p[1] + p[2]) / 3;
            let d = (l - 128) * (contrast / 100) + 128;
            let newP = color(d);
            newImg.set(x, y, newP);
        }
    }
    newImg.updatePixels();
    return newImg;
}

function getEngravingVersion(baseImg, quadSize) {
    let info = {"quads": [], "quadSize": quadSize};

    baseImg.loadPixels();
    for (let x = 0; x < baseImg.width; x += quadSize) {
        info.quads.push([]);
        for (let y = 0; y < baseImg.height; y += quadSize) {
            let avgBrightness = 0;
            let count = 0;
            for (let i = x; i < x + quadSize; i++) {
                for (let j = y; j < y + quadSize; j++) {
                    let index = (i + j * baseImg.width) * 4;
                    let r = baseImg.pixels[index];
                    let g = baseImg.pixels[index + 1];
                    let b = baseImg.pixels[index + 2];
                    avgBrightness += (r + g + b) / 3;
                    count++;
                }
            }
            avgBrightness /= count;

            let weight = null;
            if (avgBrightness < 255 / 2) {
                weight = map(avgBrightness, 0, 255, 0.01, 2);
            }

            info.quads[info.quads.length - 1].push(weight);
        }
    }

    return info;
}

function drawEngravingVersion(info) {
    strokeCap(SQUARE);
    stroke(0);
    for (let x = 0; x < info.quads.length; x++) {
        for (let y = 0; y < info.quads[x].length; y++) {
            if (info.quads[x][y] != null) {
                push();
                translate(x * info.quadSize, y * info.quadSize);
                rotate(radians(45));
                strokeWeight(info.quads[x][y]);
                line(-info.quadSize, 0, info.quadSize, 0);
                pop();
            }
        }
    }
}

const create2Darr = (rows, columns) => {
    let arr = [];
    for (let i = 0; i < rows; i++) {
        arr[i] = [];
        for (let j = 0; j < columns; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
};

function createShape(sketch) {
    if (mix_template.image[0].shapes == 1) {
        return classicShape(sketch);
    } else if (mix_template.image[0].shapes == 2) {
        return modernShape(sketch);
    } else if (mix_template.image[0].shapes == 3) {
        return postModernShape(sketch);
    }
}

function classicShape() {

    imageInfo.nCollumns = mix_template.image[0].columnsMinMaxHeight[0];

    let original_size_w = imageInfo.nCollumns * gridValues.sizeColumn + (imageInfo.nCollumns - 1) * gridValues.gapColumn;
    // OVERFLOW
    if (imageInfo.overflow != 0 && imageInfo.overflowBool) {
        original_size_w += canvasValues.marginWidth;
    }
    // ---

    let image_size = original_size_w * mix_template.image[0].horizontalScale[0];

    imageInfo.width = image_size;
    imageInfo.height = image_size / 4;

    imageInfo.nRows = Math.round(imageInfo.height / (gridValues.sizeRow + gridValues.gapRow));

    effectImg = 0;

    let type = 2;
    let shapeCanvasWidth = imageInfo.width;
    let shapeCanvasHeight = imageInfo.height;

    let TypeWidth, Type2Height, Type1Stroke, Type2_1Stroke, Type2_2Stroke;

    let pg;

    pg = createGraphics(shapeCanvasWidth, shapeCanvasHeight);
    pg.strokeCap(SQUARE);
    pg.stroke(0);

    type = int(random(1, 3));
    if (type == 1) {
        TypeWidth = int(random(20, shapeCanvasWidth));
        Type1Stroke = int(random(1, 2));
        pg.strokeWeight(Type1Stroke);
        pg.line(shapeCanvasWidth / 2 - TypeWidth, shapeCanvasHeight / 2, shapeCanvasWidth / 2 + TypeWidth, shapeCanvasHeight / 2);
    } else if (type == 2) {
        TypeWidth = int(random(20, 60));
        Type2Height = int(random(3, 6));
        Type2_1Stroke = int(random(1, 3));
        Type2_2Stroke = int(random(4, 6));
        pg.strokeWeight(Type2_1Stroke);
        pg.line(shapeCanvasWidth / 2 - TypeWidth, shapeCanvasHeight / 2 + Type2Height, shapeCanvasWidth / 2 + TypeWidth, shapeCanvasHeight / 2 + Type2Height);
        pg.strokeWeight(Type2_2Stroke);
        pg.line(shapeCanvasWidth / 2 - TypeWidth, shapeCanvasHeight / 2 - Type2Height, shapeCanvasWidth / 2 + TypeWidth, shapeCanvasHeight / 2 - Type2Height);
    }
    return pg;
}

function modernShape() {
    imageInfo.nCollumns = mix_template.image[0].columnsMinMaxHeight[0];

    let original_size_w = imageInfo.nCollumns * gridValues.sizeColumn + (imageInfo.nCollumns - 1) * gridValues.gapColumn;
    // OVERFLOW
    if (imageInfo.overflow != 0 && imageInfo.overflowBool) {
        original_size_w += canvasValues.marginWidth;
    }
    // ---
    let image_size = original_size_w * mix_template.image[0].horizontalScale[0];

    imageInfo.width = image_size;
    imageInfo.height = image_size;

    imageInfo.nRows = Math.round(imageInfo.height / (gridValues.sizeRow + gridValues.gapRow));


    effectImg = 1;

    let type = 8;
    let shapeCanvasWidth = imageInfo.width;
    let shapeCanvasHeight = imageInfo.height;
    let Type1EllipseN, Type3RectN, Type4RectN, Type5RectN;
    let Type4lineCoordinates = [];
    let pg = s1Sketch.createGraphics(shapeCanvasWidth, shapeCanvasHeight);

    pg.fill(mix_template.palettes.image.one);
    pg.strokeCap(s1Sketch.SQUARE);
    pg.noStroke();

    type = s1Sketch.int(s1Sketch.random(1, 8));
    if (type == 1) {
        Type1EllipseN = s1Sketch.int(s1Sketch.random(3, 10));
        let wEllipse1 = shapeCanvasWidth / Type1EllipseN;
        for (let i = 0; i < Type1EllipseN; i++) {
            pg.ellipse(
                wEllipse1 / 2 + wEllipse1 * i,
                shapeCanvasHeight / 2,
                wEllipse1,
                shapeCanvasHeight
            );
        }
    } else if (type == 2) {
        Type1EllipseN = s1Sketch.int(s1Sketch.random(3, 10));
        let hEllipse2 = shapeCanvasHeight / Type1EllipseN;
        for (let i = 0; i < Type1EllipseN; i++) {
            pg.ellipse(
                shapeCanvasWidth / 2,
                hEllipse2 / 2 + hEllipse2 * i,
                shapeCanvasWidth,
                hEllipse2
            );
        }
    } else if (type == 3) {
        Type3RectN = s1Sketch.int(s1Sketch.random(6, 20));
        let space = 0.5;

        let wRect3 = shapeCanvasWidth / (Type3RectN - 1 + space);

        for (let i = 0; i < Type3RectN; i++) {
            pg.rect(
                wRect3 * (1 - space) * i + wRect3 * space * i,
                0,
                wRect3 * (1 - space),
                shapeCanvasHeight
            );
        }
    } else if (type == 4) {
        Type4RectN = s1Sketch.int(s1Sketch.random(3, 5));
        for (let i = 0; i < Type4RectN; i++) {
            Type4X1 = s1Sketch.random(shapeCanvasWidth);
            Type4X2 = s1Sketch.random(shapeCanvasHeight);
            Type4Y1 = s1Sketch.random(shapeCanvasWidth);
            Type4Y2 = s1Sketch.random(shapeCanvasHeight);
            Type4Stroke = s1Sketch.int(s1Sketch.random(3, 60));
            Type4lineCoordinates.push([
                Type4X1,
                Type4Y1,
                Type4X2,
                Type4Y2,
                Type4Stroke,
            ]);
        }

        pg.stroke(mix_template.palettes.image.one);

        for (let i = 0; i < Type4RectN; i++) {
            pg.strokeWeight(Type4lineCoordinates[i][4]);

            pg.line(
                Type4lineCoordinates[i][0],
                Type4lineCoordinates[i][1],
                Type4lineCoordinates[i][2],
                Type4lineCoordinates[i][3]
            );
        }
    } else if (type == 5) {
        Type5RectN = s1Sketch.int(s1Sketch.random(3, 10));
        Type5Rot = 30;
        Type5X1 = s1Sketch.random(shapeCanvasWidth);
        Type5Y2 = s1Sketch.random(shapeCanvasHeight);
        Type5X3 = s1Sketch.random(shapeCanvasWidth);
        Type5_2X1 = s1Sketch.random(shapeCanvasWidth);
        Type5_2Y2 = s1Sketch.random(shapeCanvasHeight);
        Type5_2X3 = s1Sketch.random(shapeCanvasWidth);

        let spacing = 10;
        let rectCount = Type5RectN;
        let rectSize = s1Sketch.min(
            (shapeCanvasWidth - spacing * (rectCount - 1)) / rectCount,
            (shapeCanvasHeight - spacing * (rectCount - 1)) / rectCount
        );
        let offsetX =
            (shapeCanvasWidth - (rectCount * rectSize + (rectCount - 1) * spacing)) /
            2;
        let offsetY =
            (shapeCanvasHeight - (rectCount * rectSize + (rectCount - 1) * spacing)) /
            2;
        let rotationAngle = s1Sketch.radians(Type5Rot); // Convert the rotation value to radians

        for (let i = 0; i < rectCount; i++) {
            for (let j = 0; j < rectCount; j++) {
                let x = offsetX + j * (rectSize + spacing);
                let y = offsetY + i * (rectSize + spacing);

                pg.push();
                pg.translate(x + rectSize / 2, y + rectSize / 2);
                pg.rect(-rectSize / 2, -rectSize / 2, rectSize, rectSize);
                pg.pop();
            }
        }
    } else if (type == 6) {
        Type5RectN = s1Sketch.int(s1Sketch.random(3, 10));
        Type5Rot = 30;
        Type5X1 = s1Sketch.random(shapeCanvasWidth);
        Type5Y2 = s1Sketch.random(shapeCanvasHeight);
        Type5X3 = s1Sketch.random(shapeCanvasWidth);
        Type5_2X1 = s1Sketch.random(shapeCanvasWidth);
        Type5_2Y2 = s1Sketch.random(shapeCanvasHeight);
        Type5_2X3 = s1Sketch.random(shapeCanvasWidth);

        let vertex1 = s1Sketch.createVector(Type5X1, 0);
        let vertex2 = s1Sketch.createVector(shapeCanvasWidth, Type5Y2);
        let vertex3 = s1Sketch.createVector(Type5X3, shapeCanvasHeight);

        let vertex1_2 = s1Sketch.createVector(Type5_2X1, 0);
        let vertex2_2 = s1Sketch.createVector(shapeCanvasWidth, Type5_2Y2);
        let vertex3_2 = s1Sketch.createVector(Type5_2X3, shapeCanvasHeight);

        pg.blendMode(s1Sketch.HARD_LIGHT);
        pg.triangle(
            vertex1.x,
            vertex1.y,
            vertex2.x,
            vertex2.y,
            vertex3.x,
            vertex3.y
        );
        pg.fill(mix_template.palettes.image.two);
        pg.triangle(
            vertex1_2.x,
            vertex1_2.y,
            vertex2_2.x,
            vertex2_2.y,
            vertex3_2.x,
            vertex3_2.y
        );
    } else if (type == 7) {
        let spacing = 10;
        let rectCount = s1Sketch.int(s1Sketch.random(3, 10));
        let rectSize = s1Sketch.min(
            (shapeCanvasWidth - spacing * (rectCount - 1)) / rectCount,
            (shapeCanvasHeight - spacing * (rectCount - 1)) / rectCount
        );
        let offsetX =
            (shapeCanvasWidth - (rectCount * rectSize + (rectCount - 1) * spacing)) /
            2;
        let offsetY =
            (shapeCanvasHeight - (rectCount * rectSize + (rectCount - 1) * spacing)) /
            2;
        for (let i = 0; i < rectCount; i++) {
            for (let j = 0; j < rectCount; j++) {
                let x = offsetX + j * (rectSize + spacing);
                let y = offsetY + i * (rectSize + spacing);

                pg.push();
                pg.translate(x + rectSize / 2, y + rectSize / 2);
                pg.ellipse(0, 0, rectSize, rectSize);
                pg.pop();
            }
        }
    }

    return pg;
}

function postModernShape() {
    let type = 2;
    let shapeCanvasWidth = canvasValues.posterWidth;
    let shapeCanvasHeight = canvasValues.posterHeight;

    let imageSize = calculateBoundingBox(shapeCanvasWidth, shapeCanvasHeight, 0)

    imageInfo.width = imageSize.w;
    imageInfo.height = imageSize.h;

    let Type1NSides, Type1NShapes;
    let Type2NPoints, Type2NShapes;

    let pg;

    pg = s1Sketch.createGraphics(shapeCanvasWidth, shapeCanvasHeight);
    pg.fill(mix_template.palettes.image.one);
    pg.noStroke();

    type = s1Sketch.int(s1Sketch.random(1, 3));
    if (type == 1) {
        Type1NSides = s1Sketch.int(s1Sketch.random(3, 5));
        Type1NShapes = s1Sketch.int(s1Sketch.random(1, 3));

        for (let shape = 0; shape < Type1NShapes; shape++) {
            pg.blendMode(s1Sketch.MULTIPLY);
            pg.beginShape();
            for (let i = 0; i < Type1NSides; i++) {
                let x = s1Sketch.random(shapeCanvasWidth);
                let y = s1Sketch.random(shapeCanvasHeight);
                pg.vertex(x, y);
            }
            pg.endShape(s1Sketch.CLOSE);
            pg.blendMode(s1Sketch.BLEND);
        }
    } else if (type == 2) {
        Type2NPoints = s1Sketch.int(s1Sketch.random(3, 5));
        Type2NShapes = s1Sketch.int(s1Sketch.random(1, 3));

        for (let shape = 0; shape < Type2NShapes; shape++) {
            pg.blendMode(s1Sketch.MULTIPLY);
            pg.beginShape();
            let x = s1Sketch.random(shapeCanvasWidth);
            let y = s1Sketch.random(shapeCanvasHeight);
            pg.vertex(x, y); // Initial vertex for the curve
            for (let i = 0; i < Type2NPoints; i++) {
                let cx1 = s1Sketch.random(shapeCanvasWidth);
                let cy1 = s1Sketch.random(shapeCanvasHeight);
                let cx2 = s1Sketch.random(shapeCanvasWidth);
                let cy2 = s1Sketch.random(shapeCanvasHeight);
                x = s1Sketch.random(shapeCanvasWidth);
                y = s1Sketch.random(shapeCanvasHeight);
                pg.bezierVertex(cx1, cy1, cx2, cy2, x, y);
            }
            pg.endShape(s1Sketch.CLOSE);
            pg.blendMode(s1Sketch.BLEND);
        }
    }
    return pg;
}

function calculateBoundingBox(w, h, rotation) {
    let center = s1Sketch.createVector(w / 2, h / 2);

    let cornerPoints = [];

    // Top-left corner
    cornerPoints.push(s1Sketch.createVector(0, 0));

    // Top-right corner
    let topRight = s1Sketch.createVector(w, 0);
    topRight.rotate(rotation);
    cornerPoints.push(topRight);

    // Bottom-left corner
    let bottomLeft = s1Sketch.createVector(0, h);
    bottomLeft.rotate(rotation);
    cornerPoints.push(bottomLeft);

    // Bottom-right corner
    let bottomRight = s1Sketch.createVector(w, h);
    bottomRight.rotate(rotation);
    cornerPoints.push(bottomRight);

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (let i = 0; i < cornerPoints.length; i++) {
        let corner = cornerPoints[i];
        minX = s1Sketch.min(minX, corner.x);
        minY = s1Sketch.min(minY, corner.y);
        maxX = s1Sketch.max(maxX, corner.x);
        maxY = s1Sketch.max(maxY, corner.y);
    }

    let newWidth = maxX - minX;
    let newHeight = maxY - minY;

    return {
        w: newWidth,
        h: newHeight,
    };
}
