var canvas_parent = document.getElementById("canvas_parent");
var showGridsButton = document.getElementById("checkboxGrid");
var poster;
var texturePosModern;

//var canvasValues;
//var gridValues;
var nColunastmp=12, nLinhastmp=12;
var fonts={};

var template;

var textInputs = {"title": {"content": {"text": null, "nBreaks": null}, "rowStart": null, "columnStart": null, "rowEnd": null, "columnEnd": null, "size": null},
    "subtitle": {"content": {"text": null, "nBreaks": null}, "rowStart": null, "columnStart": null, "rowEnd": null, "columnEnd": null, "size": null},
    "aditionalInfo": {"content": {"text": null, "nBreaks": null}, "rowStart": null, "columnStart": null, "rowEnd": null, "columnEnd": null, "size": null},
    "pattern": {"rowStart": null, "columnStart": null, "nRows": null, "nColumns": null}}

/* INPUT TEXT */
var titleText = document.getElementById("title");
titleText.addEventListener("change", titleLayout);

var subtitleText = document.getElementById("subtitle");
subtitleText.addEventListener("change", subtitleLayout);

var aditionalInfoText = document.getElementById("aditionalInfo");
aditionalInfoText.addEventListener("change", aditionalInfoLayout);

var originalImg = null, effectImg = null;
var imageInfo = {"width": 0, "height": 0, "posX": 0, "posY": 0, "originalWidth": 0, "orientation": 0};

function preload() {
    loadTemplates();
    fonts["Gambetta-Regular"] = loadFont('data/fonts/Gambetta-Regular.otf');
    fonts["Gambetta-Semibold"] = loadFont('data/fonts/Gambetta-Semibold.otf');
    fonts["Switzer-Bold"] = loadFont('data/fonts/Switzer-Bold.otf');
    fonts["Switzer-Black"] = loadFont('data/fonts/Switzer-Black.otf');
    fonts["Redacted-Regular"] = loadFont('data/fonts/Redacted-Regular.ttf');
    fonts["Melodrama-Bold"] = loadFont('data/fonts/Melodrama-Bold.otf');
    fonts["Panchang-Regular"] = loadFont('data/fonts/Panchang-Regular.otf');

    texturePosModern = loadImage('data/texture.jpg');
}

function setup() {
    //template = generate(classic_template, 0.2, modern_template, 0.3, pos_modern_template, 0.5);
    template = classic_template;

    let panel = document.getElementById("canvas_poster");

    poster = createCanvas(0,0);
    poster.parent(panel);

    onResize();
    layoutChange();
}

function draw() {
    background(template.palettes[0].background[0]);

    if(template.image[0].texture){
        blendMode(LIGHTEST);
        image(texturePosModern, 0,0, canvasValues.canvasWidth, canvasValues.canvasHeight);
        blendMode(BLEND);
    }

    push();
    translate(canvasValues.marginWidth, canvasValues.marginHeight);

    //image
    if (effectImg) {
        if (effectImg instanceof p5.Image) {
            image(effectImg, imageInfo.posX, imageInfo.posY, imageInfo.width, imageInfo.height);
        } else {
            push();
            translate(imageInfo.posX, imageInfo.posY);
            drawEngravingVersion(effectImg);
            pop();
        }
    }

    //text

    drawText(textInputs, gridValues);

    //show grids
    if(showGridsButton.checked == true) {
        drawGrid();
    }

    pop();
}

function drawGrid() {
    noFill();
    stroke(0, 0, 90);
    rect(0,0, canvasValues.posterWidth, canvasValues.posterHeight);

    for(var i=1; i<=(gridValues.nColumns-1); i++) {
        line(gridValues.sizeColumn*i + gridValues.gapColumn*(i-1), 0, gridValues.sizeColumn*i + gridValues.gapColumn*(i-1), canvasValues.posterHeight);
        line(gridValues.sizeColumn*i + gridValues.gapColumn*i, 0, gridValues.sizeColumn*i + gridValues.gapColumn*i, canvasValues.posterHeight);
    }
    for(var i=1; i<=(gridValues.nRows-1); i++) {
        line(0, gridValues.sizeRow*i + gridValues.gapRow*(i-1), canvasValues.posterWidth, gridValues.sizeRow*i + gridValues.gapRow*(i-1));
        line(0, gridValues.sizeRow*i + gridValues.gapRow*i, canvasValues.posterWidth, gridValues.sizeRow*i + gridValues.gapRow*i);
    }
}

function calcGrid(nColumns, columnGapScale, gridWidth, nRows, rowGapScale, gridHeight) {
    var gapColumn = min(gridWidth/(nColumns-1), gridWidth) * columnGapScale;

    var sizeColumn = (gridWidth-(gapColumn*(nColumns-1)))/nColumns;

    var gapRow = gridHeight/(nRows-1) * rowGapScale;
    var sizeRow = (gridHeight-(gapRow*(nRows-1)))/nRows;

    return {"nColumns": nColumns, "gapColumn": gapColumn, "sizeColumn": sizeColumn,
        "nRows": nRows, "gapRow": gapRow, "sizeRow": sizeRow};
}

function calcPoster(canvasWidth, canvasHeight, marginXScale, marginYScale) {
    var marginWidth = canvasWidth/2 * marginXScale;
    var marginHeight = canvasHeight/2 * marginYScale;

    return {"canvasWidth": canvasWidth, "canvasHeight": canvasHeight,
        "posterWidth": (canvasWidth-marginWidth*2), "posterHeight": (canvasHeight-marginHeight*2),
        "marginWidth": marginWidth, "marginHeight": marginHeight}
}

function onResize() {
    var v = windowSize();

    resizeCanvas(v.x, v.y);

    loadPosterStyles();
}

function loadPosterStyles() {
    canvasValues = calcPoster(width, height, 0.1, 0.1);
    gridValues = calcGrid(template.composition.columns, 0.05, canvasValues.posterWidth, nLinhastmp, 0.1, canvasValues.posterHeight);
    // LOAD IMAGE EFFECT
    if (originalImg) {
        effectImg = imageEffect(originalImg);
    }
}

function windowSize() {
    var scale = 0.35;
    var wDiv = canvas_parent.clientWidth;
    var wPoster = 297;
    var hPoster = 420;

    return createVector(wDiv * scale, hPoster * wDiv * scale / wPoster);
}

function formatText(txt, boxWidth, txtSize, nCollumns, currentFont) {
    textFont(fonts[currentFont]);
    textSize(txtSize);
    textLeading(txtSize*1.02);

    var outputText = "";
    var currentText = "";
    var words = split(txt, ' ');
    var nBreaks = 0;
    for(var i = 0; i<words.length; i++) { // Roda todas as palavras
        if(textWidth(currentText+words[i])>boxWidth*template.text.marginText) { // Verifica se o tamanho da linha atual + a palavra atual superou o tamanho da caixa
            if(textWidth(words[i]) > boxWidth * .8) {
                for(var j = 0; j < words[i].length; j++) { // Roda todas as letras
                    if(textWidth(currentText + words[i].charAt(j) + "-")>boxWidth) {
                        if(j>0) {
                            outputText += "-\n"+words[i].charAt(j);
                        } else {
                            outputText += "\n"+words[i].charAt(j);
                        }
                        currentText = words[i].charAt(j);
                        nBreaks++;
                    } else {
                        if(i!=0 && j==0) {
                            outputText+=" ";
                            currentText+=" ";
                        }
                        outputText+=words[i].charAt(j);
                        currentText+=words[i].charAt(j);
                    }
                }
            } else {
                outputText += "\n"+words[i];
                currentText = words[i];
                nBreaks++;
            }
        } else {
            if(currentText != "") {
                outputText += " ";
                currentText += " ";
            }
            outputText += words[i];
            currentText += words[i];
        }
    }
    return {"text": outputText, "nBreaks": nBreaks, "leading": textLeading(), "boxWidth": boxWidth};
}

function drawText(textInputs, gridValues) {
    fill(template.palettes[0].text[0]);
    noStroke();

        //push();
        //rotate(45);
    textFont(fonts[template.text.fontTitle[0]]);
    textSetup(textInputs.title, gridValues);
        //pop();


    textFont(fonts[template.text.fontOthers[0]]);
    textSetup(textInputs.subtitle, gridValues);
    textSetup(textInputs.aditionalInfo, gridValues);


}

function textSetup(textInput, gridValues) {
    push();
    if(template.text.alignment[0] == 0) {
        textAlign(LEFT, TOP);
    } else if(template.text.alignment[0] == 1) {
        textAlign(CENTER, TOP);
        translate(textInput.content.boxWidth/2,0);
    }
    if(textInput.content.text != null && textInput.content.text != "") {
        textSize(textInput.size);
        textLeading(textInput.content.leading);
        text(textInput.content.text,
            gridValues.sizeColumn * (textInput.columnStart) + gridValues.gapColumn * Math.max(0, textInput.columnStart),
            gridValues.sizeRow * (textInput.rowStart) + gridValues.gapRow * Math.max(0, textInput.rowStart)  - textInput.size/5);
    }
    pop();
}

function titleLayout() {
    var text = titleText.value;

    var nColumns = template.text.titleCollumns[0];
    textInputs.title.size = nColumns * template.text.titleScale;
    textInputs.title.columnStart = randInt(0, template.composition.columns-nColumns+1);
    textInputs.title.columnEnd = textInputs.title.columnStart + nColumns;


    textInputs.title.content = formatText(text, nColumns*gridValues.sizeColumn+(nColumns-1)*gridValues.gapColumn, textInputs.title.size, nColumns, template.text.fontTitle[0]);

    var textHeight = (textInputs.title.content.nBreaks+1)*textInputs.title.size + textInputs.title.content.nBreaks*(1-textInputs.title.content.leading);
    var nRows = Math.round(textHeight/gridValues.sizeRow);

    textInputs.title.rowStart = randInt(0, nLinhastmp-nRows);
    textInputs.title.rowEnd = textInputs.title.rowStart + nRows;

}

function subtitleLayout() {
    var text = subtitleText.value;

    var nColumns = template.text.subTitleCollumns[0];
    textInputs.subtitle.size = nColumns * template.text.subTitleScale;
    textInputs.subtitle.columnStart = randInt(0, template.composition.columns-nColumns+1);
    textInputs.subtitle.columnEnd = textInputs.subtitle.columnStart + nColumns;

    textInputs.subtitle.content = formatText(text, nColumns*gridValues.sizeColumn+(nColumns-1)*gridValues.gapColumn, textInputs.subtitle.size, nColumns, template.text.fontOthers[0]);

    var textHeight = (textInputs.subtitle.content.nBreaks+1)*textInputs.subtitle.size + textInputs.subtitle.content.nBreaks*(1-textInputs.subtitle.content.leading);

    var nRows = Math.round(textHeight/gridValues.sizeRow);

    textInputs.subtitle.rowStart = randInt(0, nLinhastmp-nRows);
    textInputs.subtitle.rowEnd = textInputs.subtitle.rowStart + nRows;
}

function aditionalInfoLayout() {
    var text = aditionalInfoText.value;

    var nColumns = template.text.additionalCollumns[0];
    textInputs.aditionalInfo.size = nColumns * template.text.additionalScale;
    textInputs.aditionalInfo.columnStart = randInt(0, template.composition.columns-nColumns+1);
    textInputs.aditionalInfo.columnEnd = textInputs.aditionalInfo.columnStart + nColumns;

    textInputs.aditionalInfo.content = formatText(text, nColumns*gridValues.sizeColumn+(nColumns-1)*gridValues.gapColumn, textInputs.aditionalInfo.size, nColumns,  template.text.fontOthers[0]);

    var textHeight = (textInputs.aditionalInfo.content.nBreaks+1)*textInputs.aditionalInfo.size + textInputs.aditionalInfo.content.nBreaks*(1-textInputs.aditionalInfo.content.leading);
    var nRows = Math.round(textHeight/gridValues.sizeRow);

    textInputs.aditionalInfo.rowStart = randInt(0, nLinhastmp-nRows);
    textInputs.aditionalInfo.rowEnd = textInputs.aditionalInfo.rowStart + nRows;
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function imageEffect(original) {
    let resizedImg = original;
    let original_size_w;

    if(original.height > original.width) {
        imageInfo.orientation = 1;
        original_size_w = template.image[0].columnsMinMaxHeight[0] * gridValues.sizeColumn + (template.image[0].columnsMinMaxHeight[0] - 1) * gridValues.gapColumn;
        let original_size_h = original_size_w*original.height/original.width

        let image_size = original_size_h * template.image[0].verticalScale[0];
        resizedImg.resize(0, image_size);
    } else {
        imageInfo.orientation = 0;
        original_size_w = template.image[0].columnsMinMaxWidth[0] * gridValues.sizeColumn + (template.image[0].columnsMinMaxWidth[0] - 1) * gridValues.gapColumn;

        let image_size = original_size_w * template.image[0].horizontalScale[0];
        resizedImg.resize(image_size, 0);
    }

    imageInfo.originalWidth = original_size_w;
    imageInfo.width = resizedImg.width;
    imageInfo.height = resizedImg.height;

    calcPosImage();

    if (template.image[0].effect == "duotone") {
        return getDuotoneVersion(resizedImg, template.palettes[0].image.one, template.palettes[0].image.two);
    } else if (template.image[0].effect == "blackWhite") {
        return getBlackWhiteVersion(resizedImg, 90);
    } else if (template.image[0].effect == "engraving") {
        return getEngravingVersion(resizedImg, 4);
    } else {
        return resizedImg;
    }
}

function calcPosImage(){
    if (template.image[0].alignment == 1) { // CENTER
        imageInfo.posX = imageInfo.originalWidth / 2 - imageInfo.width / 2;
    } else if(template.image[0].alignment == 0){
        let columnStart;
        if(imageInfo.orientation == 1)
            columnStart = randInt(0, template.composition.columns-template.image[0].columnsMinMaxHeight[0]+1);
        else if(imageInfo.orientation == 0)
            columnStart = randInt(0, template.composition.columns-template.image[0].columnsMinMaxWidth[0]+1);

        imageInfo.posX = gridValues.sizeColumn * (columnStart) + gridValues.gapColumn * Math.max(0, columnStart);
    }
    else if(template.image[0].alignment == 2){
        imageInfo.posX = Math.random()*(canvasValues.posterWidth - imageInfo.width);
    }

    imageInfo.posY = Math.random()*(canvasValues.posterHeight - imageInfo.height);
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
                    avgBrightness += (r + g + b) / 3 / 255;
                    count++;
                }
            }
            avgBrightness /= count;

            let rotation = null;
            if (avgBrightness < 0.2) {
                rotation = radians(135);
            } else if (avgBrightness < 0.4) {
                rotation = radians(45);
            } else {
                // no line
            }

            info.quads[info.quads.length - 1].push(rotation);
        }
    }

    return info;
}


function drawEngravingVersion(info) {
    strokeWeight(info.quadSize*0.05);
    for (let x = 0; x < info.quads.length; x++) {
        for (let y = 0; y < info.quads[x].length; y++) {
            if (info.quads[x][y] < 255/2) {
                push();
                translate(x * info.quadSize, y * info.quadSize);
                if(info.quads[x][y]!=null) {
                    rotate(info.quads[x][y]);
                    stroke(0);
                    line(-info.quadSize / 2, 0, info.quadSize / 2, 0);
                }
                pop();
            }
        }
    }
}
