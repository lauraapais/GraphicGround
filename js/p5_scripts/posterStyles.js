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
            "type": "Classic",
        },

        "palettes": [{
            "text": [26, 26, 26],
            "additionalInformation": [26, 26, 26],
            "background": [232, 232, 230],
            "image": {
                "one": [160, 93, 160],
                "two": [135, 198, 98]
            }
        },{
            "text": [26, 26, 26],
            "additionalInformation": [26, 26, 26],
            "background": [255, 255, 255],
            "image": {
                "one": [160, 93, 160],
                "two": [135, 198, 98]
            }
        }
        ],

        "text": {
            "font": [{
                "fontTitle": "PlayfairDisplay-Bold",
                "fontOthers": "PlayfairDisplay-Regular"
            }, {
                "fontTitle": "BodoniModa_18pt-Bold",
                "fontOthers": "BodoniModa_18pt-Regular"
            }, {
                "fontTitle": "Oranienbaum-Regular",
                "fontOthers": "Oranienbaum-Regular"
            }, {
                "fontTitle": "Oranienbaum-Regular",
                "fontOthers": "Oranienbaum-Regular"
            }, {
                    "fontTitle": "Brygada1918-Bold",
                    "fontOthers": "Brygada1918-Regular"
            }, {
                    "fontTitle": "Melodrama-Bold",
                    "fontOthers": "Melodrama-Regular"
            }],

            "marginText": 0.8,

            "alignment": [1],
            "rotation": [0],

            "titleScale": 16,
            "subTitleScale": 10,
            "additionalScale": 6,

            "titleCollumns": [2],
            "subTitleCollumns": [2],
            "additionalCollumns": [2]
        },

        "image": [{
            "effect": "engraving",
            "texture": 0,
            "rotation": [0],
            "columnsMinMaxWidth": [2],
            "columnsMinMaxHeight": [2],
            "horizontalScale": [0.5],
            "verticalScale": [0.3],
            "alignment": 1,
            "shapes": 1,
            "overflow": false
        }]
    };

    modern_template = {
        "composition": {
            "columns": 6,
            "overlay": 0,
            "fillRows": [],
            "type": "Modern",
        },

        "palettes": [{
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [225, 223, 224],
            "image": {
                "one": [8, 8, 8],
                "two": [8, 8, 8]
            }
        }, {
            "text": [225, 223, 224],
            "additionalInformation": [225, 223, 224],
            "background": [0, 0, 0],
            "image": {
                "one": [225, 223, 224],
                "two": [225, 223, 224]
            }
        }, {
            "text": [225, 223, 224],
            "additionalInformation": [225, 223, 224],
            "background": [0, 0, 0],
            "image": {
                "one": [254, 240, 47],
                "two": [254, 240, 47]
            }
        }, {
            "text": [225, 223, 224],
            "additionalInformation": [225, 223, 224],
            "background": [0, 0, 0],
            "image": {
                "one": [221, 61, 73],
                "two": [221, 61, 73]
            }
        }, {
            "text": [225, 223, 224],
            "additionalInformation": [225, 223, 224],
            "background": [0, 0, 0],
            "image": {
                "one": [1, 152, 199],
                "two": [1, 152, 199]
            }
        }, {
            "text": [225, 223, 224],
            "additionalInformation": [225, 223, 224],
            "background": [0, 0, 0],
            "image": {
                "one": [203, 1, 113],
                "two": [203, 1, 113]
            }
        }, {
            "text": [225, 223, 224],
            "additionalInformation": [225, 223, 224],
            "background": [0, 0, 0],
            "image": {
                "one": [17, 7, 172],
                "two": [17, 7, 172]
            }
        }, {
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [225, 223, 224],
            "image": {
                "one": [254, 240, 47],
                "two": [254, 240, 47]
            }
        }, {
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [225, 223, 224],
            "image": {
                "one": [221, 61, 73],
                "two": [221, 61, 73]
            }
        }, {
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [225, 223, 224],
            "image": {
                "one": [1, 152, 199],
                "two": [1, 152, 199]
            }
        }, {
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [225, 223, 224],
            "image": {
                "one": [203, 1, 113],
                "two": [203, 1, 113]
            }
        }, {
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [225, 223, 224],
            "image": {
                "one": [17, 7, 172],
                "two": [17, 7, 172]
            }
        }, {
            "text": [221, 61, 73],
            "additionalInformation": [221, 61, 73],
            "background": [225, 223, 224],
            "image": {
                "one": [221, 61, 73],
                "two": [221, 61, 73]
            }
        }, {
            "text": [1, 152, 199],
            "additionalInformation": [1, 152, 199],
            "background": [225, 223, 224],
            "image": {
                "one": [1, 152, 199],
                "two": [1, 152, 199]
            }
        }, {
            "text": [203, 1, 113],
            "additionalInformation": [203, 1, 113],
            "background": [225, 223, 224],
            "image": {
                "one": [203, 1, 113],
                "two": [203, 1, 113]
            }
        }, {
            "text": [17, 7, 172],
            "additionalInformation": [17, 7, 172],
            "background": [225, 223, 224],
            "image": {
                "one": [17, 7, 172],
                "two": [17, 7, 172]
            }
        }, {
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [254, 240, 47],
            "image": {
                "one": [8, 8, 8],
                "two": [8, 8, 8]
            }
        }, {
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [221, 61, 73],
            "image": {
                "one": [8, 8, 8],
                "two": [8, 8, 8]
            }
        }, {
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [203, 1, 113],
            "image": {
                "one": [8, 8, 8],
                "two": [8, 8, 8]
            }
        }, {
            "text": [8, 8, 8],
            "additionalInformation": [8, 8, 8],
            "background": [1, 152, 199],
            "image": {
                "one": [8, 8, 8],
                "two": [8, 8, 8]
            }
        }, {
            "text": [255, 255, 255],
            "additionalInformation": [255, 255, 255],
            "background": [221, 61, 73],
            "image": {
                "one": [255, 255, 255],
                "two": [255, 255, 255]
            }
        }, {
            "text": [255, 255, 255],
            "additionalInformation": [255, 255, 255],
            "background": [203, 1, 113],
            "image": {
                "one": [255, 255, 255],
                "two": [255, 255, 255]
            }
        }, {
            "text": [255, 255, 255],
            "additionalInformation": [255, 255, 255],
            "background": [1, 152, 199],
            "image": {
                "one": [255, 255, 255],
                "two": [255, 255, 255]
            }
        }, {
            "text": [255, 255, 255],
            "additionalInformation": [255, 255, 255],
            "background": [17, 7, 172],
            "image": {
                "one": [255, 255, 255],
                "two": [255, 255, 255]
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
            }
            ],
            "marginText": 1,

            "alignment": [0],
            "rotation": [0],

            "titleScale": 12.3,
            "subTitleScale": 4.5,
            "additionalScale": 3.4,

            "titleCollumns": [4],
            "subTitleCollumns": [3],
            "additionalCollumns": [2]
        },

        "image": [{
            "effect": "blackWhite",
            "texture": 0,
            "rotation": [0],
            "columnsMinMaxWidth": [4],
            "columnsMinMaxHeight": [3],
            "horizontalScale": [1],
            "verticalScale": [1],
            "alignment": 0,
            "shapes": 2,
            "overflow": true
        }]
    };

    postModern_template = {
        "composition": {
            "columns": 1,
            "overlay": 1,
            "fillRows": [],
            "type": "PostModern",
        },

        "palettes": [{
            "text": [254, 89, 0],
            "additionalInformation": [254, 89, 0],
            "background": [102, 83, 149],
            "image": {
                "one": [77, 57, 142],
                "two": [254, 89, 0]
            }
        }, {
            "text": [32, 32, 32],
            "additionalInformation": [32, 32, 32],
            "background": [254, 89, 0],
            "image": {
                "one": [209, 59, 0],
                "two": [221, 217, 227]
            }
        }, {
            "text": [32, 32, 32],
            "additionalInformation": [32, 32, 32],
            "background": [146, 207, 107],
            "image": {
                "one": [113, 173, 3275],
                "two": [221, 217, 227]
            }
        }, {
            "text": [186, 164, 255],
            "additionalInformation": [186, 164, 255],
            "background": [32, 32, 32],
            "image": {
                "one": [186, 164, 255],
                "two": [255, 255, 255]
            }
        }, {
            "text": [254, 89, 0],
            "additionalInformation": [254, 89, 0],
            "background": [32, 32, 32],
            "image": {
                "one": [255, 255, 255],
                "two": [254, 89, 0]
            }
        }, {
            "text": [255, 255, 255],
            "additionalInformation": [255, 255, 255],
            "background": [32, 32, 32],
            "image": {
                "one": [255, 255, 255],
                "two": [32, 32, 32]
            }
        }, {
            "text": [159, 159, 159],
            "additionalInformation": [159, 159, 159],
            "background": [32, 32, 32],
            "image": {
                "one": [102, 83, 149],
                "two": [159, 159, 159]
            }
        }, {
            "text": [32, 32, 32],
            "additionalInformation": [32, 32, 32],
            "background": [186, 184, 178],
            "image": {
                "one": [254, 89, 0],
                "two": [32, 32, 32]
            }
        }, {
            "text": [32, 32, 32],
            "additionalInformation": [32, 32, 32],
            "background": [186, 184, 178],
            "image": {
                "one": [102, 83, 149],
                "two": [32, 32, 32]
            }
        }, {
            "text": [32, 32, 32],
            "additionalInformation": [32, 32, 32],
            "background": [186, 184, 178],
            "image": {
                "one": [146, 207, 107],
                "two": [32, 32, 32]
            }
        }, {
            "text": [146, 207, 107],
            "additionalInformation": [146, 207, 107],
            "background": [254, 89, 0],
            "image": {
                "one": [146, 207, 107],
                "two": [254, 89, 0]
            }
        }, {
            "text": [102, 83, 149],
            "additionalInformation": [102, 83, 149],
            "background": [146, 207, 107],
            "image": {
                "one": [186, 184, 178],
                "two": [102, 83, 149]
            }
        }, {
            "text": [146, 207, 107],
            "additionalInformation": [146, 207, 107],
            "background": [102, 83, 149],
            "image": {
                "one": [254, 89, 0],
                "two": [146, 207, 107]
            }
        }, {
            "text": [32,32,32],
            "additionalInformation": [32,32,32],
            "background": [186, 184, 178],
            "image": {
                "one": [32,32,32],
                "two": [146, 207, 107]
            }
        }
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
            }
            ],
            "marginText": 1,

            "alignment": [2],
            "rotation": [20, 45, 90, 0, -45, -90, 20],

            "titleScale": 50,
            "subTitleScale": 17,
            "additionalScale": 10,

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
            "columnsMinMaxWidth": [1],
            "columnsMinMaxHeight": [1],
            "horizontalScale": [1],
            "verticalScale": [1],
            "alignment": 2,
            "shapes": 3,
            "overflow": false
        }]
    };

    mix_template = {
        "composition": {
            "columns": null,
            "overlay": null,
            "fillRows": null,
            "type": null,
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
            "columnsMinMaxWidth": null,
            "columnsMinMaxHeight": null,
            "horizontalScale": null,
            "verticalScale": null,
            "alignment": null,
            "shapes": null,
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

function setTemplate(temp) {
    mix_template.composition.columns = temp.composition.columns;
    mix_template.composition.overlay = temp.composition.overlay;
    mix_template.composition.fillRows = temp.composition.fillRows;
    mix_template.composition.type = temp.composition.type;

    setTemplateColors(temp);

    setTemplateFont(temp);

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

    mix_template.image = temp.image;
    imageInfo.overflowBool = mix_template.image[0].overflow;
}

function setTemplateComposition(temp) {
    mix_template.composition.columns = temp.composition.columns;
    mix_template.composition.overlay = temp.composition.overlay;
    mix_template.composition.fillRows = temp.composition.fillRows;
    mix_template.composition.type = temp.composition.type;
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
    } else if(rand<values[0]+values[1]) { // CLASSICO
        return classic_template;
    } else { // POS-MODERNO
        return postModern_template;
    }
}

function setTemplateFigure(temp) {
    mix_template.image = temp.image;
    imageInfo.overflowBool = mix_template.image[0].overflow;
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
