var s1;
var s1Sketch;

var att_template = {"figura": [1, 0, 0], "cor": [1, 0, 0], "tipografia": [1, 0, 0], "composicao": [1, 0, 0]}

var canvas_parent = document.getElementById("canvas_parent");
var showGridsButton = document.getElementById("checkboxGrid");
var poster;
var randomTexture, randomFrame;
var texturePosModern = [];
var pdf, pdfSave = false;

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
        fonts["BodoniModa_18pt-Bold"] = s1Sketch.loadFont('data/fonts/classic/BodoniModa_18pt-Bold.ttf');
        fonts["BodoniModa_18pt-Regular"] = s1Sketch.loadFont('data/fonts/classic/BodoniModa_18pt-Regular.ttf');
        fonts["CormorantInfant-Bold"] = s1Sketch.loadFont('data/fonts/classic/CormorantInfant-Bold.ttf');
        fonts["CormorantInfant-Regular"] = s1Sketch.loadFont('data/fonts/classic/CormorantInfant-Regular.ttf');
        fonts["EBGaramond-Bold"] = s1Sketch.loadFont('data/fonts/classic/EBGaramond-Bold.ttf');
        fonts["EBGaramond-Regular"] = s1Sketch.loadFont('data/fonts/classic/EBGaramond-Regular.ttf');
        fonts["Gloock-Regular"] = s1Sketch.loadFont('data/fonts/classic/Gloock-Regular.ttf');
        fonts["KaiseiHarunoUmi-Bold"] = s1Sketch.loadFont('data/fonts/classic/KaiseiHarunoUmi-Bold.ttf');
        fonts["KaiseiHarunoUmi-Regular"] = s1Sketch.loadFont('data/fonts/classic/KaiseiHarunoUmi-Regular.ttf');
        fonts["NanumMyeongjo-Bold"] = s1Sketch.loadFont('data/fonts/classic/NanumMyeongjo-Bold.ttf');
        fonts["NanumMyeongjo-Regular"] = s1Sketch.loadFont('data/fonts/classic/NanumMyeongjo-Regular.ttf');
        fonts["NotoSerifDisplay-Bold"] = s1Sketch.loadFont('data/fonts/classic/NotoSerifDisplay-Bold.ttf');
        fonts["NotoSerifDisplay-Regular"] = s1Sketch.loadFont('data/fonts/classic/NotoSerifDisplay-Regular.ttf');
        fonts["PlayfairDisplay-Bold"] = s1Sketch.loadFont('data/fonts/classic/PlayfairDisplay-Bold.ttf');
        fonts["PlayfairDisplay-Regular"] = s1Sketch.loadFont('data/fonts/classic/PlayfairDisplay-Regular.ttf');
        fonts["Prata-Regular"] = s1Sketch.loadFont('data/fonts/classic/Prata-Regular.ttf');
        fonts["Rosarivo-Regular"] = s1Sketch.loadFont('data/fonts/classic/Rosarivo-Regular.ttf');

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

        fonts["Alata-Regular"] = s1Sketch.loadFont('data/fonts/modern/Alata-Regular.ttf');
        fonts["CabinCondensed-Bold"] = s1Sketch.loadFont('data/fonts/modern/CabinCondensed-Bold.ttf');
        fonts["CabinCondensed-Medium"] = s1Sketch.loadFont('data/fonts/modern/CabinCondensed-Medium.ttf');
        fonts["IBMPlexSans-Bold"] = s1Sketch.loadFont('data/fonts/modern/IBMPlexSans-Bold.ttf');
        fonts["IBMPlexSans-Regular"] = s1Sketch.loadFont('data/fonts/modern/IBMPlexSans-Regular.ttf');
        fonts["KumbhSans-Bold"] = s1Sketch.loadFont('data/fonts/modern/KumbhSans-Bold.ttf');
        fonts["KumbhSans-Regular"] = s1Sketch.loadFont('data/fonts/modern/KumbhSans-Regular.ttf');
        fonts["LexendDeca-Bold"] = s1Sketch.loadFont('data/fonts/modern/LexendDeca-Bold.ttf');
        fonts["LexendDeca-Medium"] = s1Sketch.loadFont('data/fonts/modern/LexendDeca-Medium.ttf');
        fonts["LibreFranklin-Bold"] = s1Sketch.loadFont('data/fonts/modern/LibreFranklin-Bold.ttf');
        fonts["LibreFranklin-Regular"] = s1Sketch.loadFont('data/fonts/modern/LibreFranklin-Regular.ttf');
        fonts["Manrope-Bold"] = s1Sketch.loadFont('data/fonts/modern/Manrope-Bold.ttf');
        fonts["Manrope-SemiBold"] = s1Sketch.loadFont('data/fonts/modern/Manrope-SemiBold.ttf');
        fonts["Outfit-Bold"] = s1Sketch.loadFont('data/fonts/modern/Outfit-Bold.ttf');
        fonts["Outfit-SemiBold"] = s1Sketch.loadFont('data/fonts/modern/Outfit-SemiBold.ttf');
        fonts["Poppins-Black"] = s1Sketch.loadFont('data/fonts/modern/Poppins-Black.ttf');
        fonts["Inconsolata"] = s1Sketch.loadFont('data/fonts/modern/Inconsolata.otf');
        fonts["LeagueSpartan"] = s1Sketch.loadFont('data/fonts/modern/LeagueSpartan-Bold.ttf');


        //Pós Moderno
        fonts["Righteous-Regular"] = s1Sketch.loadFont('data/fonts/postModern/Righteous-Regular.ttf');
        fonts["Redacted-Regular"] = s1Sketch.loadFont('data/fonts/postModern/Redacted-Regular.ttf');
        fonts["SpecialElite-Regular"] = s1Sketch.loadFont('data/fonts/postModern/SpecialElite-Regular.ttf');
        fonts["SyneMono-Regular"] = s1Sketch.loadFont('data/fonts/postModern/SyneMono-Regular.ttf');
        fonts["Jaan"] = s1Sketch.loadFont('data/fonts/postModern/Jaan.ttf');
        fonts["esimene"] = s1Sketch.loadFont('data/fonts/postModern/esimene.otf');
        fonts["davidcarson-Regular"] = s1Sketch.loadFont('data/fonts/postModern/davidcarson-Regular.otf');
        fonts["Comfortaa-Bold"] = s1Sketch.loadFont('data/fonts/postModern/Comfortaa-Bold.ttf');
        fonts["NovaCut-Regular"] = s1Sketch.loadFont('data/fonts/postModern/NovaCut-Regular.ttf');
        fonts["BrunoAce-Regular"] = s1Sketch.loadFont('data/fonts/postModern/BrunoAce-Regular.ttf');
        fonts["BrunoAceSC-Regular"] = s1Sketch.loadFont('data/fonts/postModern/BrunoAceSC-Regular.ttf');
        fonts["UnicaOne-Regular"] = s1Sketch.loadFont('data/fonts/postModern/UnicaOne-Regular.ttf');
        fonts["Lalezar-Regular"] = s1Sketch.loadFont('data/fonts/postModern/Lalezar-Regular.ttf');
        fonts["BlackOpsOne-Regular"] = s1Sketch.loadFont('data/fonts/postModern/BlackOpsOne-Regular.ttf');
        fonts["Wallpoet-Regular"] = s1Sketch.loadFont('data/fonts/postModern/Wallpoet-Regular.ttf');
        fonts["Graduate-Regular"] = s1Sketch.loadFont('data/fonts/postModern/Graduate-Regular.ttf');
        fonts["KellySlab-Regular"] = s1Sketch.loadFont('data/fonts/postModern/KellySlab-Regular.ttf');
        fonts["Silkscreen-Regular"] = s1Sketch.loadFont('data/fonts/postModern/Silkscreen-Regular.ttf');
        fonts["Goldman-Regular"] = s1Sketch.loadFont('data/fonts/postModern/Goldman-Regular.ttf');
        fonts["Codystar-Regular"] = s1Sketch.loadFont('data/fonts/postModern/Codystar-Regular.ttf');
        fonts["Iceland-Regular"] = s1Sketch.loadFont('data/fonts/postModern/Iceland-Regular.ttf');
        fonts["ZillaSlabHighlight-Regular"] = s1Sketch.loadFont('data/fonts/postModern/ZillaSlabHighlight-Regular.ttf');
        fonts["Plaster-Regular"] = s1Sketch.loadFont('data/fonts/postModern/Plaster-Regular.ttf');
        fonts["ZenDots-Regular"] = s1Sketch.loadFont('data/fonts/postModern/ZenDots-Regular.ttf');
        fonts["NovaSlim-Regular"] = s1Sketch.loadFont('data/fonts/postModern/NovaSlim-Regular.ttf');
        fonts["BigShouldersInlineText-Black"] = s1Sketch.loadFont('data/fonts/postModern/BigShouldersInlineText-Black.ttf');
        fonts["BigShouldersDisplay-Black"] = s1Sketch.loadFont('data/fonts/postModern/BigShouldersDisplay-Black.ttf');
        fonts["LibreBarcode39-Regular"] = s1Sketch.loadFont('data/fonts/postModern/LibreBarcode39-Regular.ttf');
        fonts["Pilowlava-Regular"] = s1Sketch.loadFont('data/fonts/postModern/Pilowlava-Regular.ttf');
        fonts["le-murmure"] = s1Sketch.loadFont('data/fonts/postModern/le-murmure.ttf');

        texturePosModern.push(s1Sketch.loadImage('data/textures/texture1.png'));
        texturePosModern.push(s1Sketch.loadImage('data/textures/texture2.png'));
    }

    s1Sketch.setup = async function () {
        await triangleTemplate(-1);

        let panel = document.getElementById("canvas_poster");

        poster = s1Sketch.createCanvas(0, 0);
        poster.parent(panel);

        await setURLFormat();

        pdf = s1Sketch.createPDF();

        loadComplete();
    }

    s1Sketch.draw = function () {
        if (loaded) {
            s1Sketch.background(mix_template.palettes.background[0], mix_template.palettes.background[1], mix_template.palettes.background[2]);

            s1Sketch.push();
            s1Sketch.translate(canvasValues.marginWidth, canvasValues.marginHeight);

            //frame
            if (mix_template.image.frame == 1 && randomFrame == 0) {
                s1Sketch.noFill();
                s1Sketch.rect(0, 0, canvasValues.posterWidth, canvasValues.posterHeight);
            }

            //image
            if (effectImg) {
                s1Sketch.push();
                if (imageInfo.overflow == -1) {
                    s1Sketch.translate(-canvasValues.marginWidth, 0)
                }
                s1Sketch.push();
                s1Sketch.translate(imageInfo.posX, imageInfo.posY);
                s1Sketch.translate(imageInfo.width / 2, imageInfo.height / 2);
                s1Sketch.rotate(imageInfo.rotation);
                s1Sketch.translate(-imageInfo.width / 2, -imageInfo.height / 2);

                if (effectImg instanceof p5.Image || effectImg instanceof p5.Graphics) s1Sketch.image(effectImg, 0, 0, imageInfo.width, imageInfo.height);
                else drawEngravingVersion(effectImg);

                s1Sketch.pop();
                s1Sketch.pop();
            }

            //text

            drawText(textInputs, gridValues, sketch);

            //show grids
            if (showGridsButton.checked == true) {
                drawGrid(sketch);
            }

            s1Sketch.pop();

            /* if (mix_template.image[0].texture) {
                 s1Sketch.blendMode(s1Sketch.LIGHTEST);
                 s1Sketch.image(texturePosModern[randomTexture], 0, 0, canvasValues.canvasWidth, canvasValues.canvasHeight);
                 s1Sketch.blendMode(s1Sketch.BLEND);
             }*/

            if (pdfSave) {
                pdfSave = false;
                console.log(s1Sketch.width, s1Sketch.height)
                pdf.endRecord();
                pdf.save();
                toLocalScale();
            }
        }
    }
}

new p5(s1);

async function triangleTemplate(changed) {
    updateDistance();
    att_template.figura = getJsonObjectById(points, 0).distance;
    att_template.cor = getJsonObjectById(points, 1).distance;
    att_template.tipografia = getJsonObjectById(points, 2).distance;
    att_template.composicao = getJsonObjectById(points, 3).distance;
    if (changed == -1) {
        generateTemplate(
            att_template.figura,
            att_template.cor,
            att_template.tipografia,
            att_template.composicao
        );
        await layoutChange();
    } else if (changed == 0) {
        // --- FIGURA ---
        setTemplateFigure(randTemplate(att_template.figura));
        clearAvailability();
        await setTextAvailability();
        shapeChange();
        await imageChange();
        await calcPosImage(false)
    } else if (changed == 1) {
        // ---- COR ----
        setTemplateColors(randTemplate(att_template.cor));
        shapeChange(true);
    } else if (changed == 2) {
        // --- TIPOGRAFIA ---
        setTemplateFont(randTemplate(att_template.tipografia));
    } else if (changed == 3) {
        // ---- COMPOSIÇÃO ----
        setTemplateComposition(randTemplate(att_template.composicao));

        await loadPosterStyles(false);
        await layoutChange();
    }
}

function drawGrid() {
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

function calcGrid(nColumns, columnGapScale, gridWidth, nRows, rowGapScale, gridHeight) {
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

async function onResize(scaling = true) {
    var v = windowSize(scaling);

    await s1Sketch.resizeCanvas(v.x, v.y);
    await loadPosterStyles();
}

async function loadPosterStyles(newImage = true) {
    canvasValues = calcPoster(s1Sketch.width, s1Sketch.height, 0.12, 0.12);
    gridValues = calcGrid(mix_template.composition.columns, 0.12, canvasValues.posterWidth, nLinhastmp, 0.17, canvasValues.posterHeight);
    // LOAD IMAGE EFFECT
    if (newImage) {
        if (originalImg) {
            effectImg = imageEffect(originalImg);
        } else {
            effectImg = createShape()
        }
    }


    setTitleSize();
    setSubtitleSize();
    setAditionalInfoSize();
}

var wPoster;
var hPoster;

async function setURLFormat() {
    let urlParams = new URLSearchParams(window.location.search);
    let value = urlParams.get("format");
    await setFormat(value);
    formatPoster.value = value;
    await layoutChange();
}

let posterOrientation = 0;

let currentFormat = 0;
let posterFormats = {
    "A4": {"w": 595, "h": 842},
    "Postcard": {"w": 420, "h": 297},
    "Instagram": {"w": 500, "h": 500},
};

async function setFormat(format) {
    if (format == 2) {
        wPoster = posterFormats.Postcard.w;
        hPoster = posterFormats.Postcard.h;
    } else if (format == 3) {
        wPoster = posterFormats.Instagram.w;
        hPoster = posterFormats.Instagram.w;
    } else {
        wPoster = posterFormats.A4.w;
        hPoster = posterFormats.A4.h;
    }

    if (posterOrientation == 0 && wPoster > hPoster) {
        posterOrientation = 1;
        setActiveOrientationButton(posterOrientation);
    }
    if (posterOrientation == 1 && hPoster > wPoster) {
        posterOrientation = 0;
        setActiveOrientationButton(posterOrientation);
    }

    await onResize();
    await layoutChange();
}

async function changeOrientation(value) {
    posterOrientation = value;
    const temp = wPoster;
    wPoster = hPoster;
    hPoster = temp;

    await onResize();
    await layoutChange();
}

function windowSize(scaling = true) {
    let scale;
    if (scaling) scale = 0.45;
    else scale = 1;

    var wDiv = canvas_parent.clientWidth;

    let vector;
    if (posterOrientation == 0) {
        vector = s1Sketch.createVector(wDiv * scale, hPoster * wDiv * scale / wPoster);
    } else if (posterOrientation == 1) {
        vector = s1Sketch.createVector(wPoster * wDiv * scale / hPoster, wDiv * scale);
    }

    return vector;
}


function formatText(txt, boxWidth, txtSize, nCollumns, currentFont, rot) {
    s1Sketch.textFont(fonts[currentFont]);

    // SCALE IF EXCEED CHARACTERS
    if (txt.length > 20 && txt.length < 40) {
        txtSize *= 0.90;
    }
    else if (txt.length > 40) {
        txtSize *= 0.80;
    }
    // ----
    s1Sketch.textSize(txtSize);
    s1Sketch.textLeading(txtSize);

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

function textSetup(textInput, gridValues) {
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
        // SCALE IF EXCEED CHARACTERS
        if(textInput.content.text.length < 20) {
            s1Sketch.textSize(textInput.size);
        }
        else if(textInput.content.text.length > 20 && textInput.content.text.length < 30) {
            s1Sketch.textSize(textInput.size * 0.85);
        }
        else if (textInput.content.text.length > 30 && textInput.content.text.length < 40) {
            s1Sketch.textSize(textInput.size * 0.7);
        }
        else if (textInput.content.text.length > 40) {
            s1Sketch.textSize(textInput.size * 0.6);
        }

        // ---
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

async function setGridAvailability(inputInfo) {
    for (let y = inputInfo.columnStart; y <= inputInfo.columnEnd; y++) {
        for (let x = inputInfo.rowStart; x <= inputInfo.rowEnd; x++) {
            gridArray[x][y] = 1;
        }
    }
}

async function titleLayout(calls = 0) {
    var text = titleText.value;

    var nColumns = mix_template.text.titleCollumns[0];
    setTitleSize();

    textInputs.title.columnStart = randInt(0, mix_template.composition.columns - nColumns + 1);
    textInputs.title.columnEnd = textInputs.title.columnStart + nColumns;

    textInputs.title.rotation = mix_template.text.rotation[randInt(0, mix_template.text.rotation.length)];

    textInputs.title.content = formatText(text, nColumns * gridValues.sizeColumn + (nColumns - 1) * gridValues.gapColumn,
        textInputs.title.size, nColumns, mix_template.text.fontTitle, textInputs.title.rotation);

    var textHeight = (textInputs.title.content.nBreaks + 1) * textInputs.title.size + textInputs.title.content.nBreaks * (1 - textInputs.title.content.leading);
    var nRows = Math.round(textHeight / gridValues.sizeRow);

    textInputs.title.rowStart = randInt(0, nLinhastmp - nRows);
    textInputs.title.rowEnd = textInputs.title.rowStart + nRows;

    textInputs.title.xRotate = Math.random() * (canvasValues.posterWidth - textInputs.title.content.boundingRotateBox.w);
    textInputs.title.yRotate = Math.random() * (canvasValues.posterHeight - textInputs.title.content.boundingRotateBox.h);

    if (mix_template.composition.overlay == 0) {
        if (calls > maxCalls) {
            return true;
        } else if (!gridAvailability(textInputs.title)) {
            return await titleLayout(calls + 1);
        } else {
            await setGridAvailability(textInputs.title);
            return false;
        }
    } else {
        return false;
    }
}

async function subtitleLayout(calls = 1) {
    var text = subtitleText.value;

    var nColumns = mix_template.text.subTitleCollumns[0];

    setSubtitleSize();

    textInputs.subtitle.columnStart = randInt(0, mix_template.composition.columns - nColumns + 1);
    textInputs.subtitle.columnEnd = textInputs.subtitle.columnStart + nColumns;

    textInputs.subtitle.rotation = mix_template.text.rotation[randInt(0, mix_template.text.rotation.length)];

    textInputs.subtitle.content = formatText(text, nColumns * gridValues.sizeColumn + (nColumns - 1) * gridValues.gapColumn,
        textInputs.subtitle.size, nColumns, mix_template.text.fontOthers, textInputs.subtitle.rotation);

    var textHeight = (textInputs.subtitle.content.nBreaks + 1) * textInputs.subtitle.size + textInputs.subtitle.content.nBreaks * (1 - textInputs.subtitle.content.leading);

    var nRows = Math.round(textHeight / gridValues.sizeRow);

    textInputs.subtitle.rowStart = randInt(0, nLinhastmp - nRows);
    textInputs.subtitle.rowEnd = textInputs.subtitle.rowStart + nRows;

    textInputs.subtitle.xRotate = Math.random() * (canvasValues.posterWidth - textInputs.subtitle.content.boundingRotateBox.w);
    textInputs.subtitle.yRotate = Math.random() * (canvasValues.posterHeight - textInputs.subtitle.content.boundingRotateBox.h);

    if (mix_template.composition.overlay == 0) {
        if (calls > maxCalls) {
            return true;
        } else if (!gridAvailability(textInputs.subtitle)) {
            return await subtitleLayout(calls + 1);
        } else {
            await setGridAvailability(textInputs.subtitle);
            return false;
        }
    } else {
        return false;
    }
}

async function aditionalInfoLayout(calls = 0) {
    var text = aditionalInfoText.value;

    var nColumns = mix_template.text.additionalCollumns[0];

    setAditionalInfoSize();

    textInputs.aditionalInfo.columnStart = randInt(0, mix_template.composition.columns - nColumns + 1);
    textInputs.aditionalInfo.columnEnd = textInputs.aditionalInfo.columnStart + nColumns;

    textInputs.aditionalInfo.rotation = mix_template.text.rotation[randInt(0, mix_template.text.rotation.length)];

    textInputs.aditionalInfo.content = formatText(text, nColumns * gridValues.sizeColumn + (nColumns - 1) * gridValues.gapColumn,
        textInputs.aditionalInfo.size, nColumns, mix_template.text.fontOthers, textInputs.aditionalInfo.rotation);

    var textHeight = (textInputs.aditionalInfo.content.nBreaks + 1) * textInputs.aditionalInfo.size + textInputs.aditionalInfo.content.nBreaks * (1 - textInputs.aditionalInfo.content.leading);
    var nRows = Math.round(textHeight / gridValues.sizeRow);

    textInputs.aditionalInfo.rowStart = randInt(0, nLinhastmp - nRows);
    textInputs.aditionalInfo.rowEnd = textInputs.aditionalInfo.rowStart + nRows;

    textInputs.aditionalInfo.xRotate = Math.random() * (canvasValues.posterWidth - textInputs.aditionalInfo.content.boundingRotateBox.w);
    textInputs.aditionalInfo.yRotate = Math.random() * (canvasValues.posterHeight - textInputs.aditionalInfo.content.boundingRotateBox.h);

    if (mix_template.composition.overlay == 0) {
        if (calls > maxCalls) {
            return true;
        } else if (!gridAvailability(textInputs.aditionalInfo)) {
            return await aditionalInfoLayout(calls + 1);
        } else {
            await setGridAvailability(textInputs.aditionalInfo);
            return false;
        }
    } else {
        return false;
    }
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function imageEffect(original) {
    let resizedImg = original;
    let original_size_w;

    if (original.height > original.width) {
        imageInfo.nCollumns = mix_template.composition.columnsMinMaxHeightImage[0];

        imageInfo.orientation = 1;
        original_size_w = imageInfo.nCollumns * gridValues.sizeColumn + (imageInfo.nCollumns - 1) * gridValues.gapColumn;
        // OVERFLOW
        if (imageInfo.overflow != 0) {
            original_size_w += canvasValues.marginWidth;
        }
        // ---
        let original_size_h = original_size_w * original.height / original.width

        let image_size = original_size_h * mix_template.composition.imageVerticalScale[0];
        resizedImg.resize(0, image_size);
    } else {
        imageInfo.nCollumns = mix_template.composition.columnsMinMaxWidthImage[0];

        imageInfo.orientation = 0;
        original_size_w = imageInfo.nCollumns * gridValues.sizeColumn + (imageInfo.nCollumns - 1) * gridValues.gapColumn;
        // OVERFLOW
        if (imageInfo.overflow != 0) {
            original_size_w += canvasValues.marginWidth;
        }
        // ---

        let image_size;
        if (effectImg instanceof p5.Graphics) {
            if (mix_template.composition.columns == 2 && mix_template.image[0].shapes == 2) {
                image_size = original_size_w * 0.2;
            } else if (mix_template.composition.columns == 2 && mix_template.image[0].shapes == 3) {
                image_size = original_size_w * 0.05;
            } else {
                image_size = original_size_w * mix_template.composition.imageHorizontalScale[0]
            }
        } else {
            image_size = original_size_w * mix_template.composition.imageHorizontalScale[0]
        }

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

async function calcPosImage(recreate = true) {
    if (mix_template.composition.imageAlignment == 1) { // CENTER
        imageInfo.posX = canvasValues.posterWidth / 2 - imageInfo.width / 2;

        imageInfo.columnStart = 0;
        imageInfo.columnEnd = gridValues.nColumns - 1;
        imageInfo.overflow = 0;

    } else if (mix_template.composition.imageAlignment == 0) { // IN GRID
        if (imageInfo.orientation == 1) {
            imageInfo.columnStart = randInt(0, mix_template.composition.columns - mix_template.composition.columnsMinMaxHeightImage[0] + 1);
        } else if (imageInfo.orientation == 0) {
            imageInfo.columnStart = randInt(0, mix_template.composition.columns - mix_template.composition.columnsMinMaxWidthImage[0] + 1);
        }

        // OVERFLOW
        if (mix_template.composition.columns == 1) {
            imageInfo.overflow = 0;
        } else if (imageInfo.columnStart == 0) {
            imageInfo.overflow = -1;
        } else if (imageInfo.columnStart == mix_template.composition.columns - mix_template.composition.columnsMinMaxWidthImage[0]) {
            imageInfo.overflow = 1;
        } else {
            imageInfo.overflow = 0;
        }

        // ----
        imageInfo.posX = gridValues.sizeColumn * (imageInfo.columnStart) + gridValues.gapColumn * Math.max(0, imageInfo.columnStart);


        imageInfo.columnEnd = imageInfo.columnStart + imageInfo.nCollumns - 1;
    } else if (mix_template.composition.imageAlignment == 2) { // RANDOM
        imageInfo.posX = Math.random() * (canvasValues.posterWidth - imageInfo.width);
        imageInfo.posY = Math.random() * (canvasValues.posterHeight - imageInfo.height);
    }

    if (recreate) {
        if (mix_template.composition.imageAlignment == 0 || mix_template.composition.imageAlignment == 1) {
            imageInfo.rowStart = randInt(0, gridValues.nRows - imageInfo.nRows);
            imageInfo.posY = imageInfo.rowStart * gridValues.sizeRow + imageInfo.rowStart * gridValues.gapRow;
            imageInfo.rowEnd = imageInfo.rowStart + imageInfo.nRows;
        }

        if (mix_template.composition.columns == 2 && (mix_template.image[0].shapes == 2 || mix_template.image[0].shapes == 3)) {
            imageInfo.posX = imageInfo.originalWidth / 2 - imageInfo.width / 2 + canvasValues.posterWidth / 2;
            imageInfo.columnStart = 0;
            imageInfo.columnEnd = gridValues.nColumns - 1;
            imageInfo.overflow = 0;
        } else if (mix_template.composition.columns == 6 && mix_template.image[0].shapes == 3) {
            if (imageInfo.orientation == 1) {
                imageInfo.columnStart = randInt(0, mix_template.composition.columns - mix_template.composition.columnsMinMaxHeightImage[0] + 1);
            } else if (imageInfo.orientation == 0) {
                imageInfo.columnStart = randInt(0, mix_template.composition.columns - mix_template.composition.columnsMinMaxWidthImage[0] + 1);
            }
        }

        if (mix_template.overflow) {
            imageInfo.overflow = 0;
        }
    }
}

function getDuotoneVersion(baseImg, cDark, cBright) {
    let newImg = s1Sketch.createImage(baseImg.width, baseImg.height);
    for (var y = 0; y < baseImg.height; y++) {
        for (var x = 0; x < baseImg.width; x++) {
            let p = baseImg.get(x, y);
            let bright = 0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2];
            //let newP = color(bright);
            let r = s1Sketch.map(bright, 0, 255, cDark[0], cBright[0]);
            let g = s1Sketch.map(bright, 0, 255, cDark[1], cBright[1]);
            let b = s1Sketch.map(bright, 0, 255, cDark[2], cBright[2]);
            let newP = s1Sketch.color(r, g, b);
            newImg.set(x, y, newP);
        }
    }
    newImg.updatePixels();
    return newImg;
}

function getBlackWhiteVersion(baseImg, contrast) {
    let newImg = s1Sketch.createImage(baseImg.width, baseImg.height);
    for (let y = 0; y < baseImg.height; y++) {
        for (let x = 0; x < baseImg.width; x++) {
            let p = baseImg.get(x, y);
            let l = (p[0] + p[1] + p[2]) / 3;
            let d = (l - 128) * (contrast / 100) + 128;
            let newP = s1Sketch.color(d);
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
                weight = s1Sketch.map(avgBrightness, 0, 255, 0.01, 2);
            }

            info.quads[info.quads.length - 1].push(weight);
        }
    }

    return info;
}

function drawEngravingVersion(info) {
    s1Sketch.strokeCap(s1Sketch.SQUARE);
    s1Sketch.stroke(mix_template.palettes.image.one);
    s1Sketch.push();
    for (let x = 0; x < info.quads.length; x++) {
        for (let y = 0; y < info.quads[x].length; y++) {
            if (info.quads[x][y] != null) {
                s1Sketch.push();
                s1Sketch.translate(x * info.quadSize, y * info.quadSize);
                s1Sketch.rotate(s1Sketch.radians(45));
                s1Sketch.strokeWeight(info.quads[x][y]);
                s1Sketch.line(-info.quadSize, 0, info.quadSize, 0);
                s1Sketch.pop();
            }
        }
    }
    s1Sketch.pop();
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

function createShape(recreate = false) {
    if (mix_template.image[0].shapes == 1) {
        return classicShape(recreate);
    } else if (mix_template.image[0].shapes == 2) {
        return modernShape(recreate);
    } else if (mix_template.image[0].shapes == 3) {
        return postModernShape(recreate);
    }
}

let p_classic = {
    "shapeCanvasWidth": null,
    "shapeCanvasHeight": null,
    "type": null,
    "TypeWidth": null,
    "Type1Stroke": null,
    "Type2Height": null,
    "Type2_1Stroke": null,
    "Type2_2Stroke": null
};

function classicShape(recreate = false) {
    let TypeWidth, Type2Height, Type1Stroke, Type2_1Stroke, Type2_2Stroke, type;
    let shapeCanvasWidth, shapeCanvasHeight;

    if (recreate) {
        shapeCanvasWidth = p_classic.shapeCanvasWidth;
        shapeCanvasHeight = p_classic.shapeCanvasHeight;
        type = p_classic.type;
    } else {
        imageInfo.nCollumns = mix_template.composition.columnsMinMaxHeightImage[0];

        let original_size_w = imageInfo.nCollumns * gridValues.sizeColumn + (imageInfo.nCollumns - 1) * gridValues.gapColumn;
        // OVERFLOW
        if (imageInfo.overflow != 0 && imageInfo.overflowBool) {
            original_size_w += canvasValues.marginWidth;
        }
        // ---

        let image_size = original_size_w * mix_template.composition.imageHorizontalScale[0]

        imageInfo.width = image_size;
        imageInfo.height = image_size / 4;
        imageInfo.nRows = Math.round(imageInfo.height / (gridValues.sizeRow + gridValues.gapRow));
        effectImg = 0;
        shapeCanvasWidth = imageInfo.width;
        shapeCanvasHeight = imageInfo.height;
        type = s1Sketch.int(s1Sketch.random(1, 3));
    }

    let pg;
    pg = s1Sketch.createGraphics(shapeCanvasWidth, shapeCanvasHeight);
    pg.strokeCap(s1Sketch.SQUARE);
    if (mix_template.composition.columns == 1) {
        pg.stroke(mix_template.palettes.image.two);
    } else {
        pg.stroke(mix_template.palettes.image.one);
    }

    if (type == 1) {
        if (recreate) {
            pg.strokeWeight(p_classic.Type1Stroke);
            pg.line(p_classic.shapeCanvasWidth / 2 - p_classic.TypeWidth,
                p_classic.shapeCanvasHeight / 2,
                p_classic.shapeCanvasWidth / 2 + p_classic.TypeWidth,
                p_classic.shapeCanvasHeight / 2);
        } else {
            TypeWidth = s1Sketch.int(s1Sketch.random(20, shapeCanvasWidth));
            Type1Stroke = s1Sketch.int(s1Sketch.random(1, 2));
            pg.strokeWeight(Type1Stroke);
            pg.line(shapeCanvasWidth / 2 - TypeWidth, shapeCanvasHeight / 2, shapeCanvasWidth / 2 + TypeWidth, shapeCanvasHeight / 2);
        }
    } else if (type == 2) {
        if (recreate) {
            pg.strokeWeight(p_classic.Type2_1Stroke);
            pg.line(p_classic.shapeCanvasWidth / 2 - p_classic.TypeWidth,
                p_classic.shapeCanvasHeight / 2 + p_classic.Type2Height,
                p_classic.shapeCanvasWidth / 2 + p_classic.TypeWidth,
                p_classic.shapeCanvasHeight / 2 + p_classic.Type2Height);
            pg.strokeWeight(p_classic.Type2_2Stroke);
            pg.line(p_classic.shapeCanvasWidth / 2 - p_classic.TypeWidth,
                p_classic.shapeCanvasHeight / 2 - p_classic.Type2Height,
                p_classic.shapeCanvasWidth / 2 + p_classic.TypeWidth,
                p_classic.shapeCanvasHeight / 2 - p_classic.Type2Height);
        } else {
            TypeWidth = s1Sketch.int(s1Sketch.random(20, 60));
            Type2Height = s1Sketch.int(s1Sketch.random(3, 6));
            Type2_1Stroke = s1Sketch.int(s1Sketch.random(1, 3));
            Type2_2Stroke = s1Sketch.int(s1Sketch.random(4, 6));
            pg.strokeWeight(Type2_1Stroke);
            pg.line(shapeCanvasWidth / 2 - TypeWidth, shapeCanvasHeight / 2 + Type2Height, shapeCanvasWidth / 2 + TypeWidth, shapeCanvasHeight / 2 + Type2Height);
            pg.strokeWeight(Type2_2Stroke);
            pg.line(shapeCanvasWidth / 2 - TypeWidth, shapeCanvasHeight / 2 - Type2Height, shapeCanvasWidth / 2 + TypeWidth, shapeCanvasHeight / 2 - Type2Height);
        }
    }

    if (!recreate) {
        p_classic.shapeCanvasWidth = shapeCanvasWidth;
        p_classic.shapeCanvasHeight = shapeCanvasHeight;
        p_classic.type = type;
        p_classic.TypeWidth = TypeWidth;
        p_classic.Type1Stroke = Type1Stroke;
        p_classic.Type2Height = Type2Height;
        p_classic.Type2_1Stroke = Type2_1Stroke;
        p_classic.Type2_2Stroke = Type2_2Stroke;
    }

    return pg;
}

let p_modern = {
    "shapeCanvasWidth": null,
    "shapeCanvasHeight": null,
    "type": null,
    "Type1EllipseN": null,
    "wEllipse1": null,
    "hEllipse2": null,
    "Type3RectN": null,
    "space": null,
    "wRect3": null,
    "Type4RectN": null,
    "Type4X1": null,
    "Type4X2": null,
    "Type4Y1": null,
    "Type4Y2": null,
    "Type4Stroke": null,
    "Type4lineCoordinates": null,
    "Type5RectN": null,
    "spacing": null,
    "rectCount": null,
    "rectSize": null,
    "offsetX": null,
    "offsetY": null,
    "vertex1": null,
    "vertex2": null,
    "vertex3": null,
    "vertex1_2": null,
    "vertex2_2": null,
    "vertex3_2": null,
};

function modernShape(recreate = false) {
    let shapeCanvasWidth;
    let shapeCanvasHeight;
    let type = 8;
    let Type1EllipseN, Type3RectN, Type4RectN, Type5RectN;
    let Type4lineCoordinates = [];
    let wEllipse1, hEllipse2, space, wRect3, spacing, rectCount, rectSize, offsetX, offsetY, vertex1, vertex2, vertex3,
        vertex1_2, vertex2_2, vertex3_2;

    if (recreate) {
        shapeCanvasWidth = p_modern.shapeCanvasWidth;
        shapeCanvasHeight = p_modern.shapeCanvasHeight;
        type = p_modern.type;
    } else {
        imageInfo.nCollumns = mix_template.composition.columnsMinMaxHeightImage[0];

        let original_size_w = imageInfo.nCollumns * gridValues.sizeColumn + (imageInfo.nCollumns - 1) * gridValues.gapColumn;
        // OVERFLOW
        if (imageInfo.overflow != 0 && imageInfo.overflowBool) {
            original_size_w += canvasValues.marginWidth;
        }
        // ---

        let image_size;

        if (mix_template.composition.columns == 2) {
            image_size = original_size_w * 0.2;
        } else {
            image_size = original_size_w * mix_template.composition.imageHorizontalScale[0]
        }

        imageInfo.width = image_size;
        imageInfo.height = image_size;

        imageInfo.nRows = Math.round(imageInfo.height / (gridValues.sizeRow + gridValues.gapRow));

        effectImg = 1;
        shapeCanvasWidth = imageInfo.width;
        shapeCanvasHeight = imageInfo.height;
        type = s1Sketch.int(s1Sketch.random(1, 8));
    }
    let pg = s1Sketch.createGraphics(shapeCanvasWidth, shapeCanvasHeight);
    if (mix_template.composition.columns == 1) {
        pg.fill(mix_template.palettes.image.two);
    } else {
        pg.fill(mix_template.palettes.image.one);
    }
    pg.strokeCap(s1Sketch.SQUARE);
    pg.noStroke();

    if (type == 1) {
        if (recreate) {
            Type1EllipseN = p_modern.Type1EllipseN;
            wEllipse1 = p_modern.wEllipse1;
        } else {
            Type1EllipseN = s1Sketch.int(s1Sketch.random(3, 10));
            wEllipse1 = shapeCanvasWidth / Type1EllipseN;
        }
        for (let i = 0; i < Type1EllipseN; i++) {
            pg.ellipse(
                wEllipse1 / 2 + wEllipse1 * i,
                shapeCanvasHeight / 2,
                wEllipse1,
                shapeCanvasHeight
            );
        }
    } else if (type == 2) {
        if (recreate) {
            Type1EllipseN = p_modern.Type1EllipseN;
            hEllipse2 = p_modern.hEllipse2;
        } else {
            Type1EllipseN = s1Sketch.int(s1Sketch.random(3, 10));
            hEllipse2 = shapeCanvasHeight / Type1EllipseN;
        }
        for (let i = 0; i < Type1EllipseN; i++) {
            pg.ellipse(
                shapeCanvasWidth / 2,
                hEllipse2 / 2 + hEllipse2 * i,
                shapeCanvasWidth,
                hEllipse2
            );
        }
    } else if (type == 3) {
        if (recreate) {
            Type3RectN = p_modern.Type3RectN;
            space = p_modern.space;
            wRect3 = p_modern.wRect3;
        } else {
            Type3RectN = s1Sketch.int(s1Sketch.random(6, 20));
            space = 0.5;
            wRect3 = shapeCanvasWidth / (Type3RectN - 1 + space);
        }

        for (let i = 0; i < Type3RectN; i++) {
            pg.rect(
                wRect3 * (1 - space) * i + wRect3 * space * i,
                0,
                wRect3 * (1 - space),
                shapeCanvasHeight
            );
        }
    } else if (type == 4) {
        if (recreate) {
            Type4RectN = p_modern.Type4RectN;
            Type4lineCoordinates = p_modern.Type4lineCoordinates;
        } else {
            Type4RectN = s1Sketch.int(s1Sketch.random(3, 5));
        }
        for (let i = 0; i < Type4RectN; i++) {
            let Type4X1 = s1Sketch.random(shapeCanvasWidth);
            let Type4X2 = s1Sketch.random(shapeCanvasHeight);
            let Type4Y1 = s1Sketch.random(shapeCanvasWidth);
            let Type4Y2 = s1Sketch.random(shapeCanvasHeight);
            let Type4Stroke = s1Sketch.int(s1Sketch.random(3, 60));

            Type4lineCoordinates.push([
                Type4X1,
                Type4Y1,
                Type4X2,
                Type4Y2,
                Type4Stroke,
            ]);
        }

        if (mix_template.composition.columns == 1) {
            pg.stroke(mix_template.palettes.image.two);
        } else {
            pg.stroke(mix_template.palettes.image.one);
        }

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
        if (recreate) {
            Type5RectN = p_modern.Type5RectN;
            spacing = p_modern.spacing;
            rectCount = p_modern.rectCount;
            rectSize = p_modern.rectSize;
            offsetX = p_modern.offsetX;
            offsetY = p_modern.offsetY;
        } else {
            Type5RectN = s1Sketch.int(s1Sketch.random(3, 10));
            spacing = 10;
            rectCount = Type5RectN;
            rectSize = s1Sketch.min(
                (shapeCanvasWidth - spacing * (rectCount - 1)) / rectCount,
                (shapeCanvasHeight - spacing * (rectCount - 1)) / rectCount
            );
            offsetX =
                (shapeCanvasWidth - (rectCount * rectSize + (rectCount - 1) * spacing)) /
                2;
            offsetY =
                (shapeCanvasHeight - (rectCount * rectSize + (rectCount - 1) * spacing)) /
                2;
        }
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
        if (recreate) {
            vertex1 = p_modern.vertex1;
            vertex2 = p_modern.vertex2;
            vertex3 = p_modern.vertex3;

            vertex1_2 = p_modern.vertex1_2;
            vertex2_2 = p_modern.vertex2_2;
            vertex3_2 = p_modern.vertex3_2;
        } else {
            let Type6X1 = s1Sketch.random(shapeCanvasWidth);
            let Type6Y2 = s1Sketch.random(shapeCanvasHeight);
            let Type6X3 = s1Sketch.random(shapeCanvasWidth);
            let Type6_2X1 = s1Sketch.random(shapeCanvasWidth);
            let Type6_2Y2 = s1Sketch.random(shapeCanvasHeight);
            let Type6_2X3 = s1Sketch.random(shapeCanvasWidth);

            vertex1 = s1Sketch.createVector(Type6X1, 0);
            vertex2 = s1Sketch.createVector(shapeCanvasWidth, Type6Y2);
            vertex3 = s1Sketch.createVector(Type6X3, shapeCanvasHeight);

            vertex1_2 = s1Sketch.createVector(Type6_2X1, 0);
            vertex2_2 = s1Sketch.createVector(shapeCanvasWidth, Type6_2Y2);
            vertex3_2 = s1Sketch.createVector(Type6_2X3, shapeCanvasHeight);
        }
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
        if (recreate) {
            spacing = p_modern.spacing;
            rectCount = p_modern.rectCount;
            rectSize = p_modern.rectSize;
            offsetX = p_modern.offsetX;
            offsetY = p_modern.offsetY;
        } else {
            spacing = 10;
            rectCount = s1Sketch.int(s1Sketch.random(3, 10));
            rectSize = s1Sketch.min(
                (shapeCanvasWidth - spacing * (rectCount - 1)) / rectCount,
                (shapeCanvasHeight - spacing * (rectCount - 1)) / rectCount
            );
            offsetX =
                (shapeCanvasWidth - (rectCount * rectSize + (rectCount - 1) * spacing)) /
                2;
            offsetY =
                (shapeCanvasHeight - (rectCount * rectSize + (rectCount - 1) * spacing)) /
                2;
        }
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

    if (!recreate) {
        p_modern.shapeCanvasWidth = shapeCanvasWidth;
        p_modern.shapeCanvasHeight = shapeCanvasHeight;
        p_modern.type = type;
        p_modern.Type1EllipseN = Type1EllipseN;
        p_modern.wEllipse1 = wEllipse1;
        p_modern.hEllipse2 = hEllipse2;
        p_modern.Type3RectN = Type3RectN;
        p_modern.space = space;
        p_modern.wRect3 = wRect3;
        p_modern.Type4RectN = Type4RectN;
        p_modern.Type4lineCoordinates = Type4lineCoordinates;
        p_modern.Type5RectN = Type5RectN;
        p_modern.spacing = spacing;
        p_modern.rectCount = rectCount;
        p_modern.rectSize = rectSize;
        p_modern.offsetX = offsetX;
        p_modern.offsetY = offsetY;
        p_modern.vertex1 = vertex1;
        p_modern.vertex2 = vertex2;
        p_modern.vertex3 = vertex3;
        p_modern.vertex1_2 = vertex1_2;
        p_modern.vertex2_2 = vertex2_2;
        p_modern.vertex3_2 = vertex3_2;
    }

    return pg;
}

let p_post_modern = {
    "type": null,
    "shapeCanvasWidth": null,
    "shapeCanvasHeight": null,
    "Type1Vertex": null,
    "Type1NSides": null,
    "Type1NShapes": null,
    "Type2Vertex": null,
    "Type2NPoints": null,
    "Type2NShapes": null
};

function postModernShape(recreate = false) {
    let type;
    let shapeCanvasWidth;
    let shapeCanvasHeight;
    if (recreate) {
        type = p_post_modern.type;
        shapeCanvasWidth = p_post_modern.shapeCanvasWidth;
        shapeCanvasHeight = p_post_modern.shapeCanvasHeight;
    } else {
        type = s1Sketch.int(s1Sketch.random(1, 3));
        shapeCanvasWidth = canvasValues.posterWidth;
        shapeCanvasHeight = canvasValues.posterHeight;

        let imageSize = calculateBoundingBox(shapeCanvasWidth, shapeCanvasHeight, 0)

        if (mix_template.composition.columns == 2) {
            imageSize = calculateBoundingBox(shapeCanvasWidth * .2, shapeCanvasHeight * .2, 0)
        } else if (mix_template.composition.columns == 6) {
            imageSize = calculateBoundingBox(shapeCanvasWidth * .4, shapeCanvasHeight * .4, 0)
        }

        imageInfo.width = imageSize.w;
        imageInfo.height = imageSize.h;
    }

    let Type1Vertex, Type1NSides, Type1NShapes;
    let Type2Vertex, Type2NPoints, Type2NShapes;
    let x, y, cx1, cy1, cx2, cy2;

    let pg;

    pg = s1Sketch.createGraphics(shapeCanvasWidth, shapeCanvasHeight);


    if (mix_template.composition.columns == 1) {
        pg.fill(mix_template.palettes.image.two);
    } else {
        pg.fill(mix_template.palettes.image.one);
    }

    pg.noStroke();

    if (type == 1) {
        if (recreate) {
            Type1NSides = p_post_modern.Type1NSides;
            Type1NShapes = p_post_modern.Type1NShapes;
            Type1Vertex = p_post_modern.Type1Vertex;
        } else {
            Type1NSides = s1Sketch.int(s1Sketch.random(3, 5));
            Type1NShapes = s1Sketch.int(s1Sketch.random(1, 3));
            Type1Vertex = [];
        }

        for (let shape = 0; shape < Type1NShapes; shape++) {
            pg.blendMode(s1Sketch.MULTIPLY);
            pg.beginShape();
            if (recreate) {
                for (let i = 0; i < Type1NSides; i++) {
                    pg.vertex(Type1Vertex[shape][i].x, Type1Vertex[shape][i].y);
                }
            } else {
                Type1Vertex[shape] = [];
                for (let i = 0; i < Type1NSides; i++) {
                    x = s1Sketch.random(shapeCanvasWidth);
                    y = s1Sketch.random(shapeCanvasHeight);
                    Type1Vertex[shape].push({'x': x, 'y': y});
                    pg.vertex(x, y);
                }
            }
            pg.endShape(s1Sketch.CLOSE);
            pg.blendMode(s1Sketch.BLEND);
        }
    } else if (type == 2) {
        if (recreate) {
            Type2NPoints = p_post_modern.Type2NPoints;
            Type2NShapes = p_post_modern.Type2NShapes;
            Type2Vertex = p_post_modern.Type2Vertex;
        } else {
            Type2NPoints = s1Sketch.int(s1Sketch.random(3, 5));
            Type2NShapes = s1Sketch.int(s1Sketch.random(1, 3));
            Type2Vertex = [];
        }

        for (let shape = 0; shape < Type2NShapes; shape++) {
            pg.blendMode(s1Sketch.MULTIPLY);
            pg.beginShape();
            if (recreate) {
                x = Type2Vertex[shape][0].x;
                y = Type2Vertex[shape][0].y;
                pg.vertex(x, y); // Initial vertex for the curve
                for (let i = 0; i < Type2NPoints; i++) {
                    pg.bezierVertex(Type2Vertex[shape][i].cx1, Type2Vertex[shape][i].cy1, Type2Vertex[shape][i].cx2, Type2Vertex[shape][i].cy2, Type2Vertex[shape][i].x, Type2Vertex[shape][i].y);
                }
            } else {
                x = s1Sketch.random(shapeCanvasWidth);
                y = s1Sketch.random(shapeCanvasHeight);
                pg.vertex(x, y); // Initial vertex for the curve
                Type2Vertex[shape] = [];
                for (let i = 0; i < Type2NPoints; i++) {
                    cx1 = s1Sketch.random(shapeCanvasWidth);
                    cy1 = s1Sketch.random(shapeCanvasHeight);
                    cx2 = s1Sketch.random(shapeCanvasWidth);
                    cy2 = s1Sketch.random(shapeCanvasHeight);
                    x = s1Sketch.random(shapeCanvasWidth);
                    y = s1Sketch.random(shapeCanvasHeight);
                    Type2Vertex[shape].push({'x': x, 'y': y, 'cx1': cx1, 'cy1': cy1, 'cx2': cx2, 'cy2': cy2});
                    pg.bezierVertex(cx1, cy1, cx2, cy2, x, y);
                }
            }
            pg.endShape(s1Sketch.CLOSE);
            pg.blendMode(s1Sketch.BLEND);
        }
    }
    if (!recreate) {
        p_post_modern.type = type;
        p_post_modern.shapeCanvasWidth = shapeCanvasWidth;
        p_post_modern.shapeCanvasHeight = shapeCanvasHeight;
        p_post_modern.Type1Vertex = Type1Vertex;
        p_post_modern.Type1NSides = Type1NSides;
        p_post_modern.Type1NShapes = Type1NShapes;
        p_post_modern.Type2Vertex = Type2Vertex;
        p_post_modern.Type2NPoints = Type2NPoints;
        p_post_modern.Type2NShapes = Type2NShapes;
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

var buttonSavePDF = document.getElementById("savePDF");
buttonSavePDF.addEventListener("click", savePDF);

async function savePDF() {
    s1Sketch.noLoop();
    await toGlobalScale();
    pdfSave = true;
    pdf.beginRecord();
    s1Sketch.loop()
}

async function toGlobalScale() {
    await onResize(false);
}

async function toLocalScale() {
    await onResize(true);
}

function setTitleSize() {
    if (wPoster < hPoster) {
        textInputs.title.size = canvasValues.posterWidth * mix_template.text.titleScale;
    } else {
        textInputs.title.size = canvasValues.posterHeight * mix_template.text.titleScale;
    }
}

function setSubtitleSize() {
    if (wPoster < hPoster) {
        textInputs.subtitle.size = canvasValues.posterWidth * mix_template.text.subTitleScale;
    } else {
        textInputs.subtitle.size = canvasValues.posterHeight * mix_template.text.subTitleScale;
    }
}

function setAditionalInfoSize() {
    if (wPoster < hPoster) {
        textInputs.aditionalInfo.size = canvasValues.posterWidth * mix_template.text.additionalScale;
    } else {
        textInputs.aditionalInfo.size = canvasValues.posterHeight * mix_template.text.additionalScale;
    }
}