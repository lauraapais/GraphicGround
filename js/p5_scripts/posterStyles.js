/*
aligment 0:left; 1: center; 2:right; 3: random
rotation 0:none
*/

var classic_template, modern_template, postModern_template, mix_template;

function loadTemplates() {
    classic_template = {
        "composition": {
            "columns": 2,
            "overlay": 0,
            "fillRows": [1, 11, 10, 12],
            "columnsMinMaxWidthImage": [2],
            "columnsMinMaxHeightImage": [2],
            "columnsHorWidthImage": [2],
            "imageHorizontalScale": [0.5],
            "imageVerticalScale": [0.3],
            "imageAlignment": 1,
        },

        "palettes": [{
            "text": [26, 26, 26],
            "additionalInformation": [26, 26, 26],
            "background": [232, 232, 230],
            "image": {
                "one": [26, 26, 26],
                "two": [157, 0, 0]
            }
        },{
            "text": [26, 26, 26],
            "additionalInformation": [26, 26, 26],
            "background": [255, 255, 255],
            "image": {
                "one": [26, 26, 26],
                "two": [150, 150, 150]
            }
        }
        ],

        "text": {
            "font": [{
                "fontTitle": "BodoniModa_18pt-Bold",
                "fontOthers": "BodoniModa_18pt-Regular"
            }, {
                "fontTitle": "CormorantInfant-Bold",
                "fontOthers": "CormorantInfant-Regular"
            }, {
                "fontTitle": "EBGaramond-Bold",
                "fontOthers": "EBGaramond-Regular"
            }, {
                    "fontTitle": "Gloock-Regular",
                    "fontOthers": "Gloock-Regular"
            }, {
                    "fontTitle": "KaiseiHarunoUmi-Bold",
                    "fontOthers": "KaiseiHarunoUmi-Regular"
            }, {
                "fontTitle": "NanumMyeongjo-Bold",
                "fontOthers": "NanumMyeongjo-Regular"
            }, {
                "fontTitle": "NotoSerifDisplay-Bold",
                "fontOthers": "NotoSerifDisplay-Regular"
            }, {
                "fontTitle": "PlayfairDisplay-Bold",
                "fontOthers": "PlayfairDisplay-Regular"
            }, {
                "fontTitle": "Prata-Regular",
                "fontOthers": "Prata-Regular"
            }, {
                "fontTitle": "Rosarivo-Regular",
                "fontOthers": "Rosarivo-Regular"
            }],

            "marginText": 0.9,

            "alignment": [1],
            "rotation": [0],

            "titleScale": 0.142,
            "subTitleScale": 0.05,
            "additionalScale": 0.04,

            "titleCollumns": [2],
            "subTitleCollumns": [2],
            "additionalCollumns": [2]
        },

        "image": [{
            "effect": "engraving",
            "texture": 0,
            "rotation": [0],
            "shapes": 1,
            "frame":1,
            "overflow": false
        }]
    };

    modern_template = {
        "composition": {
            "columns": 6,
            "overlay": 0,
            "fillRows": [],
            "columnsMinMaxWidthImage": [4],
            "columnsMinMaxHeightImage": [3],
            "columnsHorWidthImage": [1],
            "imageHorizontalScale": [1],
            "imageVerticalScale": [1],
            "imageAlignment": 0,
        },

        "palettes": [{
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [225, 223, 224],
            "image": {
                "one": [8, 8, 8],
                "two": [48,52,146]
            }
        }, {
            "text": [225, 223, 224],
            "additionalInformation": [225, 223, 224],
            "background": [0, 0, 0],
            "image": {
                "one": [225, 223, 224],
                "two": [251,238,52]
            }
        }, {
            "text": [225, 223, 224],
            "additionalInformation": [225, 223, 224],
            "background": [0, 0, 0],
            "image": {
                "one": [254, 240, 47],
                "two": [203,1,113]
            }
        }, {
            "text": [225, 223, 224],
            "additionalInformation": [225, 223, 224],
            "background": [0, 0, 0],
            "image": {
                "one": [221, 61, 73],
                "two": [203,1,113]
            }
        }, {
            "text": [225, 223, 224],
            "additionalInformation": [225, 223, 224],
            "background": [0, 0, 0],
            "image": {
                "one": [1, 152, 199],
                "two": [221, 61, 73]
            }
        }, {
            "text": [225, 223, 224],
            "additionalInformation": [225, 223, 224],
            "background": [0, 0, 0],
            "image": {
                "one": [203, 1, 113],
                "two": [0, 1, 242]
            }
        }, {
            "text": [225, 223, 224],
            "additionalInformation": [225, 223, 224],
            "background": [0, 0, 0],
            "image": {
                "one": [0, 1, 242],
                "two": [1, 152, 199]
            }
        }, {
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [225, 223, 224],
            "image": {
                "one": [254, 240, 47],
                "two": [203, 1, 113]
            }
        }, {
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [225, 223, 224],
            "image": {
                "one": [221, 61, 73],
                "two": [203, 1, 113]
            }
        }, {
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [225, 223, 224],
            "image": {
                "one": [1, 152, 199],
                "two": [254, 240, 47]
            }
        }, {
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [225, 223, 224],
            "image": {
                "one": [203, 1, 113],
                "two": [0, 1, 242]
            }
        }, {
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [225, 223, 224],
            "image": {
                "one": [0, 1, 242],
                "two": [1, 152, 199]
            }
        }, {
            "text": [221, 61, 73],
            "additionalInformation": [221, 61, 73],
            "background": [225, 223, 224],
            "image": {
                "one": [221, 61, 73],
                "two": [203, 1, 113]
            }
        }, {
            "text": [1, 152, 199],
            "additionalInformation": [1, 152, 199],
            "background": [225, 223, 224],
            "image": {
                "one": [1, 152, 199],
                "two": [0, 1, 242]
            }
        }, {
            "text": [203, 1, 113],
            "additionalInformation": [203, 1, 113],
            "background": [225, 223, 224],
            "image": {
                "one": [203, 1, 113],
                "two": [0, 1, 242]
            }
        }, {
            "text": [0, 1, 242],
            "additionalInformation": [0, 1, 242],
            "background": [225, 223, 224],
            "image": {
                "one": [0, 1, 242],
                "two": [203, 1, 113]
            }
        }, {
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [254, 240, 47],
            "image": {
                "one": [8, 8, 8],
                "two": [203, 1, 113]
            }
        }, {
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [221, 61, 73],
            "image": {
                "one": [8, 8, 8],
                "two": [0, 1, 242]
            }
        }, {
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [203, 1, 113],
            "image": {
                "one": [8, 8, 8],
                "two": [254, 240, 47]
            }
        }, {
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [1, 152, 199],
            "image": {
                "one": [8, 8, 8],
                "two": [221, 61, 73]
            }
        }, {
            "text": [255, 255, 255],
            "additionalInformation": [255, 255, 255],
            "background": [221, 61, 73],
            "image": {
                "one": [255, 255, 255],
                "two": [0, 1, 242]
            }
        }, {
            "text": [255, 255, 255],
            "additionalInformation": [255, 255, 255],
            "background": [203, 1, 113],
            "image": {
                "one": [255, 255, 255],
                "two": [254, 240, 47]
            }
        }, {
            "text": [255, 255, 255],
            "additionalInformation": [255, 255, 255],
            "background": [1, 152, 199],
            "image": {
                "one": [255, 255, 255],
                "two": [221, 61, 73]
            }
        }, {
            "text": [255, 255, 255],
            "additionalInformation": [255, 255, 255],
            "background": [0, 1, 242],
            "image": {
                "one": [255, 255, 255],
                "two": [1, 152, 199]
            }
        }
        ],

        "text": {
            "font": [{
                "fontTitle": "Satoshi-Black",
                "fontOthers": "Satoshi-Medium"
            }, {
                "fontTitle": "GeneralSans-Bold",
                "fontOthers": "GeneralSans-Medium"
            }, {
                "fontTitle": "Inter-Bold",
                "fontOthers": "Inter-Medium"
            }, {
                "fontTitle": "Poppins-Bold",
                "fontOthers": "Poppins-Medium"
            }, {
                "fontTitle": "Switzer-Black",
                "fontOthers": "Switzer-Medium"
            }, {
                "fontTitle": "Alata-Regular",
                "fontOthers": "Alata-Regular"
            }, {
                "fontTitle": "CabinCondensed-Bold",
                "fontOthers": "CabinCondensed-Medium"
            }, {
                "fontTitle": "IBMPlexSans-Bold",
                "fontOthers": "IBMPlexSans-Regular"
            }, {
                "fontTitle": "KumbhSans-Bold",
                "fontOthers": "KumbhSans-Regular"
            }, {
                "fontTitle": "LexendDeca-Bold",
                "fontOthers": "LexendDeca-Medium"
            }, {
                "fontTitle": "LibreFranklin-Bold",
                "fontOthers": "LibreFranklin-Regular"
            }, {
                "fontTitle": "Manrope-Bold",
                "fontOthers": "Manrope-SemiBold"
            }, {
                "fontTitle": "Outfit-Bold",
                "fontOthers": "Outfit-SemiBold"
            }, {
                "fontTitle": "Poppins-Black",
                "fontOthers": "Poppins-Black"
            }, {
                "fontTitle": "Inconsolata",
                "fontOthers": "Inconsolata"
            }, {
                "fontTitle": "LeagueSpartan",
                "fontOthers": "LeagueSpartan"
            }
            ],
            "marginText": 1,

            "alignment": [0],
            "rotation": [0],

            "titleScale": 0.17,
            "subTitleScale": 0.06,
            "additionalScale": 0.034,

            "titleCollumns": [5],
            "subTitleCollumns": [3],
            "additionalCollumns": [2]
        },

        "image": [{
            "effect": "blackWhite",
            "texture": 0,
            "rotation": [0],
            "shapes": 2,
            "frame":0,
            "overflow": true
        }]
    };

    postModern_template = {
        "composition": {
            "columns": 1,
            "overlay": 1,
            "fillRows": [],
            "columnsMinMaxWidthImage": [1],
            "columnsMinMaxHeightImage": [1],
            "columnsHorWidthImage": [1],
            "imageHorizontalScale": [1],
            "imageVerticalScale": [1],
            "imageAlignment": 2,
        },

        "palettes": [{
            "text": [169, 232, 3],
            "additionalInformation": [169, 232, 3],
            "background": [152, 95, 245],
            "image": {
                "one": [169, 232, 3],
                "two": [224, 71, 37]
            }
        },{
            "text": [24, 217, 128],
            "additionalInformation": [24, 217, 128],
            "background": [152, 95, 245],
            "image": {
                "one": [24, 217, 128],
                "two": [53, 25, 142]
            }
        },{
            "text": [53, 25, 142],
            "additionalInformation": [53, 25, 142],
            "background": [152, 95, 245],
            "image": {
                "one": [53, 25, 142],
                "two": [24, 217, 128]
            }
        },{
            "text": [169, 232, 3],
            "additionalInformation": [169, 232, 3],
            "background": [152, 95, 245],
            "image": {
                "one": [169, 232, 3],
                "two": [183, 166, 246]
            }
        },{
            "text": [169, 232, 3],
            "additionalInformation": [169, 232, 3],
            "background": [183, 166, 246],
            "image": {
                "one": [169, 232, 3],
                "two": [224, 71, 37]
            }
        },{
            "text": [254, 89, 0],
            "additionalInformation": [254, 89, 0],
            "background": [183, 166, 246],
            "image": {
                "one": [254, 89, 0],
                "two": [169, 232, 3]
            }
        },{
            "text": [53, 25, 142],
            "additionalInformation": [53, 25, 142],
            "background": [183, 166, 246],
            "image": {
                "one": [152, 95, 245],
                "two": [254, 89, 0]
            }
        },{
            "text": [53, 25, 142],
            "additionalInformation": [53, 25, 142],
            "background": [254, 89, 0],
            "image": {
                "one": [53, 25, 142],
                "two": [169,  232, 3]
            }
        },{
            "text": [169,  232, 3],
            "additionalInformation": [169,  232, 3],
            "background": [254, 89, 0],
            "image": {
                "one": [169,  232, 3],
                "two": [53, 25, 142]
            }
        },{
            "text": [169,  232, 3],
            "additionalInformation": [169,  232, 3],
            "background": [86, 187, 169],
            "image": {
                "one": [152,  95, 245],
                "two": [53, 25, 142]
            }
        },{
            "text": [224, 71, 37],
            "additionalInformation": [224, 71, 37],
            "background": [24, 217, 128],
            "image": {
                "one": [152,  95, 245],
                "two": [53, 25, 142]
            }
        },{
            "text": [53, 25, 142],
            "additionalInformation": [53, 25, 142],
            "background": [24, 217, 128],
            "image": {
                "one": [53, 25, 142],
                "two": [152,  95, 245]
            }
        },{
            "text": [254, 89, 0],
            "additionalInformation": [254, 89, 0],
            "background": [197, 197, 197],
            "image": {
                "one": [254, 89, 0],
                "two": [152,  95, 245]
            }
        },{
            "text": [86, 187, 169],
            "additionalInformation": [86, 187, 169],
            "background": [197, 197, 197],
            "image": {
                "one": [86, 187, 169],
                "two": [183,  166, 246]
            }
        },{
            "text": [152, 95, 245],
            "additionalInformation": [152, 95, 245],
            "background": [197, 197, 197],
            "image": {
                "one": [24, 217, 128],
                "two": [169,  232, 3]
            }
        },{
            "text": [53, 25, 142],
            "additionalInformation": [53, 25, 142],
            "background": [197, 197, 197],
            "image": {
                "one": [216, 124, 73],
                "two": [254,  89, 0]
            }
        },{
            "text": [53, 25, 142],
            "additionalInformation": [53, 25, 142],
            "background": [197, 197, 197],
            "image": {
                "one": [169, 232, 3],
                "two": [24,  217, 128]
            }
        },{
            "text": [53, 25, 142],
            "additionalInformation": [53, 25, 142],
            "background": [197, 197, 197],
            "image": {
                "one": [24,  217, 128],
                "two": [169, 232, 3]
            }
        },
        ],

        "text": {
            "font": [{
                "fontTitle": "SyneMono-Regular",
                "fontOthers": "SyneMono-Regular"
            }, {
                "fontTitle": "Redacted-Regular",
                "fontOthers": "Redacted-Regular"
            }, {
                "fontTitle": "SyneMono-Regular",
                "fontOthers": "Redacted-Regular"
            }, {
                "fontTitle": "Jaan",
                "fontOthers": "Jaan"
            }, {
                "fontTitle": "esimene",
                "fontOthers": "esimene"
            }, {
                "fontTitle": "davidcarson-Regular",
                "fontOthers": "davidcarson-Regular"
            }, {
                "fontTitle": "Righteous-Regular",
                "fontOthers": "Righteous-Regular"
            }, {
                "fontTitle": "SpecialElite-Regular",
                "fontOthers": "SpecialElite-Regular"
            }, {
                "fontTitle": "Comfortaa-Bold",
                "fontOthers": "Comfortaa-Bold"
            }, {
                "fontTitle": "NovaCut-Regular",
                "fontOthers": "NovaCut-Regular"
            }, {
                "fontTitle": "BrunoAce-Regular",
                "fontOthers": "BrunoAce-Regular"
            }, {
                "fontTitle": "BrunoAceSC-Regular",
                "fontOthers": "BrunoAceSC-Regular"
            }, {
                "fontTitle": "UnicaOne-Regular",
                "fontOthers": "UnicaOne-Regular"
            }, {
                "fontTitle": "Lalezar-Regular",
                "fontOthers": "Lalezar-Regular"
            }, {
                "fontTitle": "BlackOpsOne-Regular",
                "fontOthers": "BlackOpsOne-Regular"
            }, {
                "fontTitle": "Wallpoet-Regular",
                "fontOthers": "Wallpoet-Regular"
            }, {
                "fontTitle": "Graduate-Regular",
                "fontOthers": "Graduate-Regular"
            }, {
                "fontTitle": "KellySlab-Regular",
                "fontOthers": "KellySlab-Regular"
            }, {
                "fontTitle": "Silkscreen-Regular",
                "fontOthers": "Silkscreen-Regular"
            }, {
                "fontTitle": "Goldman-Regular",
                "fontOthers": "Goldman-Regular"
            }, {
                "fontTitle": "Codystar-Regular",
                "fontOthers": "Codystar-Regular"
            }, {
                "fontTitle": "Iceland-Regular",
                "fontOthers": "Iceland-Regular"
            }, {
                "fontTitle": "ZillaSlabHighlight-Regular",
                "fontOthers": "ZillaSlabHighlight-Regular"
            }, {
                "fontTitle": "Plaster-Regular",
                "fontOthers": "Plaster-Regular"
            }, {
                "fontTitle": "ZenDots-Regular",
                "fontOthers": "ZenDots-Regular"
            }, {
                "fontTitle": "NovaSlim-Regular",
                "fontOthers": "NovaSlim-Regular"
            }, {
                "fontTitle": "BigShouldersInlineText-Black",
                "fontOthers": "BigShouldersInlineText-Black"
            }, {
                "fontTitle": "BigShouldersDisplay-Black",
                "fontOthers": "BigShouldersDisplay-Black"
            }, {
                "fontTitle": "LibreBarcode39-Regular",
                "fontOthers": "LibreBarcode39-Regular"
            }, {
                "fontTitle": "Pilowlava-Regular",
                "fontOthers": "Pilowlava-Regular"
            }, {
                "fontTitle": "le-murmure",
                "fontOthers": "le-murmure"
            }
            ],
            "marginText": 1,

            "alignment": [2],
            "rotation": [20, 45, 90, 0, -45, -90, 20],

            "titleScale": 0.16,
            "subTitleScale": 0.08,
            "additionalScale": 0.07,

            "titleCollumns": [1],
            "subTitleCollumns": [1],
            "additionalCollumns": [1],

            "titleRotation": 0,
            "subTitleRotation": 0,
            "additionalRotation": 0
        },

        "image": [{
            "effect": "duotone",
            "texture": 1,
            "rotation": [20, 45, 90, 0, -45, -90, 20],
            "shapes": 3,
            "frame":0,
            "overflow": false
        }]
    };

    mix_template = {
        "composition": {
            "columns": null,
            "overlay": null,
            "fillRows": null,
            "columnsMinMaxWidthImage": null,
            "columnsMinMaxHeightImage": null,
            "columnsHorWidthImage": null,
            "imageHorizontalScale": null,
            "imageVerticalScale": null,
            "imageAlignment": null,
        },

        "palettes": null,

        "text": {
            "fontTitle": null,
            "fontOthers": null,
            "marginText": null,

            "alignment": null,
            "rotation": null,

            "titleScale": null,
            "subTitleScale": null,
            "additionalScale": null,

            "titleCollumns": null,
            "subTitleCollumns": null,
            "additionalCollumns": null,
        },

        "image": {
            "effect": null,
            "texture": null,
            "rotation": null,
            "shapes": null,
            "frame":null,
            "overflow": null
        }
    };
}


var canvasValues = {
    "canvasWidth": null,
    "canvasHeight": null,
    "posterWidth": null,
    "posterHeight": null,
    "marginWidth": null,
    "marginHeight": null,
};

var gridValues = {
    "nColumns": null,
    "gapColumn": null,
    "sizeColumn": null,
    "nRows": null,
    "gapRow": null,
    "sizeRow": null,
};

function generateTemplate(figura, cor, tipografia, composicao) {
    // ---- COMPOSIÇÃO ----
    setTemplateComposition(randTemplate(composicao));
    // ---- COR ----
    setTemplateColors(randTemplate(cor));
    // --- TIPOGRAFIA ---
    setTemplateFont(randTemplate(tipografia));
    // --- FIGURA ---
    setTemplateFigure(randTemplate(figura));
}

function setTemplateComposition(temp) {
    mix_template.composition.columns = temp.composition.columns;
    mix_template.composition.overlay = temp.composition.overlay;
    mix_template.composition.fillRows = temp.composition.fillRows;
    mix_template.composition.columnsMinMaxHeightImage = temp.composition.columnsMinMaxHeightImage;
    mix_template.composition.columnsMinMaxWidthImage = temp.composition.columnsMinMaxWidthImage;
    mix_template.composition.columnsHorWidthImage = temp.composition.columnsHorWidthImage;
    mix_template.composition.imageHorizontalScale = temp.composition.imageHorizontalScale;
    mix_template.composition.imageVerticalScale = temp.composition.imageVerticalScale;
    mix_template.composition.imageAlignment = temp.composition.imageAlignment;
    mix_template.text.marginText = temp.text.marginText;
    mix_template.text.alignment = temp.text.alignment;
    mix_template.text.rotation = temp.text.rotation;
    mix_template.text.titleScale = temp.text.titleScale;
    mix_template.text.subTitleScale = temp.text.subTitleScale;
    mix_template.text.additionalScale = temp.text.additionalScale;
    mix_template.text.titleCollumns = temp.text.titleCollumns;
    mix_template.text.subTitleCollumns = temp.text.subTitleCollumns;
    mix_template.text.additionalCollumns = temp.text.additionalCollumns;
    mix_template.text.rotation = temp.text.rotation;
}

function randTemplate(values) {
    let rand = Math.random()
    if(rand<values[0]) { // MODERNO
        return modern_template;
    } else if(rand<(values[0]+values[1])) { // CLASSICO
        return classic_template;
    } else { // POS-MODERNO
        return postModern_template;
    }
}

function setTemplateFigure(temp) {
    mix_template.image = temp.image;
    imageInfo.overflowBool = mix_template.image[0].overflow;
    imageInfo.rotation = mix_template.text.rotation[randInt(0, mix_template.text.rotation.length)];

}

function setTemplateFont(temp) {
    var fontPalette;

    if (mix_template.text.fontTitle != null && mix_template.text.fontOthers != null && temp.text.font.length > 1) {
        do {
            fontPalette = randInt(0, temp.text.font.length);
        } while (mix_template.text.fontTitle == temp.text.font[fontPalette].fontTitle && mix_template.text.fontOthers == temp.text.font[fontPalette].fontOthers);
    } else {
        fontPalette = randInt(0, temp.text.font.length);
    }

    mix_template.text.fontTitle = temp.text.font[fontPalette].fontTitle;
    mix_template.text.fontOthers = temp.text.font[fontPalette].fontOthers;
}

function setTemplateColors(temp) {
    var colorPalette;
    colorPalette = randInt(0, temp.palettes.length);

    if (mix_template.palettes != null && temp.palettes.length > 1) {
        do {
            colorPalette = randInt(0, temp.palettes.length);
        } while (mix_template.palettes == temp.palettes[colorPalette]);
    } else {
        colorPalette = randInt(0, temp.palettes.length);
    }

    mix_template.palettes = temp.palettes[colorPalette];
}
