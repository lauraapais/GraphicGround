/*
aligment 0:left; 1: center; 2:right; 3: random
rotation 0:none
*/

var classic_template, modern_template, postModern_template, mix_template;

function  loadTemplates() {
    classic_template = {
        "composition": {
            "columns": 2,
            "overlay": 0
        },

        "palettes": [{
            "text": [color(26,26,26)],
            "additionalInformation": [color(26,26,26)],
            "background":  [color(232, 232, 230)],
            "image": {
                "one": [160, 93, 160],
                "two": [135, 198, 98]
            }
        }],

        "text": {
            "fontTitle": ["Gambetta-Regular"],
            "fontOthers": ["Gambetta-Regular"],
            "marginText": 0.8,

            "alignment": [1],
            "rotation":  [0],

            "titleScale": 15,
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
            "columnsMinMaxWidth":  [2],
            "columnsMinMaxHeight": [2],
            "horizontalScale": [0.5],
            "verticalScale": [0.3],
            "alignment": 1,
            "shapes": null
        }]
    };

    modern_template = {
        "composition": {
            "columns": 3,
            "overlay": 0
        },

        "palettes": [{
            "text": [color(57,54,51)],
            "aditionalInformation": [color(57,54,51)],
            "background":  [color(232,228,226)],
            "image": {
                "one": [160, 93, 160],
                "two": [135, 198, 98]
            }
        }],

        "text": {
            "fontTitle": ["Switzer-Bold"],
            "fontOthers": ["Switzer-Bold"],
            "marginText": 1,

            "alignment": [0],
            "rotation":  [0],

            "titleScale": 20,
            "subTitleScale": 12,
            "additionalScale": 9,

            "titleCollumns": [2],
            "subTitleCollumns": [2, 1],
            "additionalCollumns": [1]
        },

        "image": [{
            "effect": "blackWhite",
            "texture":0,
            "rotation": [0],
            "columnsMinMaxWidth": [2],
            "columnsMinMaxHeight": [1],
            "horizontalScale": [1],
            "verticalScale": [1],
            "alignment": 0,
            "shapes": null
        }]
    };

    postModern_template = {
        "composition": {
            "columns": 1,
            "overlay": 1
        },

        "palettes": [{
            "text": [color(138, 198, 98)],
            "aditionalInformation": [color(138, 198, 98)],
            "background":  [color(125,99,171)],
            "image": {
                "one": [125,99,171],
                "two": [246, 134, 42]
            }
        }],

        "text": {
            "fontTitle": ["Melodrama-Bold"],
            "fontOthers": ["Panchang-Light"],
            "marginText": 1,

            "alignment": [0, 2],
            "rotation":  [45],

            "titleScale": 75,
            "subTitleScale": 17,
            "additionalScale": 10,

            "titleCollumns": [1],
            "subTitleCollumns": [1],
            "additionalCollumns": [1]
        },

        "image": [{
            "effect": "duotone",
            "texture": 1,
            "rotation": [45],
            "columnsMinMaxWidth": [1],
            "columnsMinMaxHeight": [1],
            "horizontalScale": [0.7],
            "verticalScale": [0.6],
            "alignment": 2,
            "shapes": null
        }]
    };

    mix_template = {
        "composition": {
            "columns": null,
            "overlay": null
        },

        "palettes": {
            "text": null,
            "additionalInformation": null,
            "background":  null,
            "image": {
                "one": null,
                "two": null
            }
        },

        "text": {
            "fonts": null,
            "marginText": null,

            "alignment": null,
            "rotation":  null,

            "titleScale": null,
            "subTitleScale": null,
            "additionalScale": null,

            "titleCollumns": null,
            "subTitleCollumns": null,
            "additionalCollumns": null
        },

        "image": {
            "effect": null,
            "rotation": null,
            "columnsMinMax":  null,
            "horizontalScale": null,
            "shapes": null
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

function generateTemplate(forma, cor, tipografia, imagem, composicao) {
    // classic_template => 0
    // modern_template => 0.5
    // postModern_template => 1



    if(cor>= 0 && cor <= 0.5) { // COR CLASSIC - MODERN
        var classicID = randInt(0, classic_template.palettes.length-1);
        var classicTextID = randInt(0, classic_template.palettes[classicID].text.length);
        var classicAdditionalInformationID = randInt(0, classic_template.palettes[classicID].additionalInformation.length);
        var classicBackgroundID = randInt(0, classic_template.palettes[classicID].background.length);
        var classicImageID = randInt(0, classic_template.palettes[classicID].image.length);

        var modernID = randInt(0, modern_template.palettes.length-1);
        var modernTextID = randInt(0, modern_template.palettes[modernID].text.length);
        var modernAdditionalInformationID = randInt(0, modern_template.palettes[modernID].additionalInformation.length);
        var modernBackgroundID = randInt(0, modern_template.palettes[modernID].background.length);
        var modernImageID = randInt(0, modern_template.palettes[modernID].image.length);

        mix_template.palettes.text = mergeColor(classic_template.palettes[classicID].text[classicTextID],
            modern_template.palettes[modernID].text[modernTextID],
            map(cor, 0, 0.5, 0, 1));
        mix_template.palettes.additionalInformation = mergeColor(classic_template.palettes[classicID].additionalInformation[classicAdditionalInformationID],
            modern_template.palettes[modernID].additionalInformation[modernAdditionalInformationID],
            map(cor, 0, 0.5, 0, 1));
        mix_template.palettes.background = mergeColor(classic_template.palettes[classicID].background[classicBackgroundID],
            modern_template.palettes[modernID].background[modernBackgroundID],
            map(cor, 0, 0.5, 0, 1));
        mix_template.palettes.image = mergeColor(classic_template.palettes[classicID].image[classicImageID],
            modern_template.palettes[modernID].image[modernImageID],
            map(cor, 0, 0.5, 0, 1));
    } else { // COR MODERN - POS-MODERN
        var modernID = randInt(0, modern_template.palettes.length-1);
        var modernTextID = randInt(0, modern_template.palettes[modernID].text.length);
        var modernAdditionalInformationID = randInt(0, modern_template.palettes[modernID].additionalInformation.length);
        var modernBackgroundID = randInt(0, modern_template.palettes[modernID].background.length);
        var modernImageID = randInt(0, modern_template.palettes[modernID].image.length);

        var postModernID = randInt(0, postModern_template.palettes.length-1);
        var postModernTextID = randInt(0, postModern_template.palettes[postModernID].text.length);
        var postModernAdditionalInformationID = randInt(0, postModern_template.palettes[postModernID].additionalInformation.length);
        var postModernBackgroundID = randInt(0, postModern_template.palettes[postModernID].background.length);
        var postModernImageID = randInt(0, postModern_template.palettes[postModernID].image.length);

        mix_template.palettes.text = mergeColor(classic_template.palettes[modernID].text[modernTextID],
            modern_template.palettes[postModernID].text[postModernTextID],
            map(cor, 0.5, 1, 0, 1));
        mix_template.palettes.additionalInformation = mergeColor(classic_template.palettes[modernID].additionalInformation[modernAdditionalInformationID],
            modern_template.palettes[postModernID].additionalInformation[postModernAdditionalInformationID],
            map(cor, 0.5, 1, 0, 1));
        mix_template.palettes.background = mergeColor(classic_template.palettes[modernID].background[modernBackgroundID],
            modern_template.palettes[postModernID].background[postModernBackgroundID],
            map(cor, 0.5, 1, 0, 1));
        mix_template.palettes.image = mergeColor(classic_template.palettes[modernID].image[modernImageID],
            modern_template.palettes[postModernID].image[postModernImageID],
            map(cor, 0.5, 1, 0, 1));
    }
}

function mergeColor(cor1, cor2, percentage) {
    return color(red(cor1) * percentage + red(cor2) * (1-percentage),
        green(cor1) * percentage + green(cor2) * (1-percentage),
        blue(cor1) * percentage + blue(cor2) * (1-percentage));
}