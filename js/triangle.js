var s2;
var s2Sketch;

var points = [];
var active_point = null;
var offset;
var hovered_point = null;

var triangle_points = [];
var triangle_size = 350; // Size of the equilateral triangle
var triangle_ratio;

s2 = function (sketch) {
    s2Sketch = sketch;

    s2Sketch.setup = function () {
        let trianglePanel = document.getElementById("canvasTriangle");

        poster = s2Sketch.createCanvas(400, 400);
        poster.parent(trianglePanel);

        definePoints();
        s2Sketch.noStroke();
    }

    s2Sketch.draw = function () {
        s2Sketch.background(211, 211, 211);

        s2Sketch.fill(211);
        s2Sketch.stroke(0);
        s2Sketch.triangle(triangle_points[0].x, triangle_points[0].y,
            triangle_points[1].x, triangle_points[1].y,
            triangle_points[2].x, triangle_points[2].y);
        s2Sketch.noStroke();

        s2Sketch.textFont('Sora');
        s2Sketch.textSize(18);
        s2Sketch.fill(29, 29, 29);
        s2Sketch.push();
        s2Sketch.translate(triangle_points[0].x + 10, triangle_points[0].y);
        s2Sketch.rotate(s2Sketch.atan2(triangle_points[1].y + triangle_points[0].y, triangle_points[1].x + triangle_points[0].x));
        s2Sketch.text('Pre-Modern'.toUpperCase(), 0, 0);
        s2Sketch.pop();

        s2Sketch.push();
        s2Sketch.translate(triangle_points[1].x - 10, triangle_points[1].y);
        s2Sketch.rotate(s2Sketch.atan2(triangle_points[0].y - triangle_points[1].y, triangle_points[0].x - triangle_points[1].x));
        s2Sketch.text('Post-Modern'.toUpperCase(), 0, 0);
        s2Sketch.pop();

        s2Sketch.push();
        s2Sketch.translate(triangle_points[2].x - s2Sketch.textWidth('MODERN'), triangle_points[2].y + 20);
        s2Sketch.rotate(s2Sketch.atan2(triangle_points[2].y - triangle_points[1].y, triangle_points[2].x - triangle_points[1].x));
        s2Sketch.text('Modern'.toUpperCase(), 0, 0);
        s2Sketch.pop();


        for (let i = 0; i < points.length; i++) {
            if (points[i].active || points[i].hover) {
                if(points[i].hover) {
                    points[i].opacity = s2Sketch.lerp(points[i].opacity, 255, 0.1);
                } else {
                    points[i].opacity = s2Sketch.lerp(points[i].opacity, 0, 0.1);
                }
                points[i].transition = s2Sketch.lerp(points[i].transition, 255, 0.1);
            } else {
                points[i].transition = s2Sketch.lerp(points[i].transition, 70, 0.1);
                points[i].opacity = s2Sketch.lerp(points[i].opacity, 0, 0.1);
            }
            s2Sketch.tint(255, points[i].transition);
            s2Sketch.image(points[i].image, points[i].position.x - 10, points[i].position.y - 10, 30, 30);
            s2Sketch.noTint();



            s2Sketch.fill(211, points[i].opacity);
            s2Sketch.stroke(29, points[i].opacity);
            s2Sketch.rect(points[i].position.x + 25, points[i].position.y - 10, s2Sketch.textWidth(points[i].text) + 20, 30);
            s2Sketch.fill(29, points[i].opacity);
            s2Sketch.noStroke();
            s2Sketch.text(points[i].text, points[i].position.x + 35, points[i].position.y + 10);
        }
    }

    s2Sketch.mousePressed = function () {
        // Check if the mouse is within the range of any point
        for (let i = points.length - 1; i >= 0; i--) {
            let d = s2Sketch.dist(s2Sketch.mouseX, s2Sketch.mouseY, points[i].position.x, points[i].position.y);
            if (d < 10) {
                // Reorder the points array based on the last clicked point
                let clickedPoint = points.splice(i, 1)[0];
                points.push(clickedPoint);

                active_point = points.length - 1;

                for (let j = points.length - 1; j >= 0; j--) {
                    if (j==active_point) {
                        points[j].active = true;
                        points[j].button.classList.add("active");
                    } else {
                        points[j].active = false;
                        points[j].button.classList.remove("active");
                    }
                }
                offset = s2Sketch.createVector(s2Sketch.mouseX - points[active_point].position.x, s2Sketch.mouseY - points[active_point].position.y);
                break;
            }
        }
    }

    s2Sketch.mouseDragged = function () {
        if (active_point !== null) {
            // Calculate the boundaries of the equilateral triangle
            let centerX = s2Sketch.width / 2;
            let centerY = s2Sketch.height / 2;
            let topY = centerY - triangle_ratio / 2;
            let bottomY = centerY + triangle_ratio / 2;

            // Calculate the X constraints based on the Y position within the triangle
            let yRatio = (s2Sketch.constrain(s2Sketch.mouseY, topY, bottomY) - topY) / triangle_ratio;
            let leftX = centerX - triangle_size / 2 * yRatio;
            let rightX = centerX + triangle_size / 2 * yRatio;

            // Update the position of the active point within the triangle bounds
            points[active_point].position.x = s2Sketch.constrain(s2Sketch.mouseX - offset.x, leftX, rightX);
            points[active_point].position.y = s2Sketch.constrain(s2Sketch.mouseY - offset.y, topY, bottomY);
        }
    }

    s2Sketch.mouseReleased = function () {
        if (active_point != null) {
            triangleTemplate(points[active_point]);
            active_point = null;
        }
    }

    s2Sketch.mouseMoved = function () {
        hovered_point = null;
        // Check if the mouse is within the range of any point
        for (let i = points.length - 1; i >= 0; i--) {
            let d = s2Sketch.dist(s2Sketch.mouseX, s2Sketch.mouseY, points[i].position.x, points[i].position.y);
            if (d < 10) {
                points[i].hover = true;
            } else {
                points[i].hover = false;
            }
        }
    }
}

new p5(s2);

function definePoints() {
    let centerX = s2Sketch.width / 2;
    let centerY = s2Sketch.height / 2;
    triangle_ratio = (s2Sketch.sqrt(3) / 2) * triangle_size;
    triangle_points.push(s2Sketch.createVector(centerX,
        centerY - triangle_ratio / 2));
    triangle_points.push(s2Sketch.createVector(centerX - triangle_size / 2,
        centerY + triangle_ratio / 2));
    triangle_points.push(s2Sketch.createVector(centerX + triangle_size / 2,
        centerY + triangle_ratio / 2));

    points.push({
        "id": 0,
        "position": s2Sketch.createVector(s2Sketch.width / 2, s2Sketch.height / 2),
        "distance": [0, 0, 0],
        "image": s2Sketch.loadImage("../data/triangle/2.png"),
        "opacity": 70,
        "button": document.getElementById("triangleFigure"),
        "active": false,
        "hover": false,
        "transition": 0,
        "opacity": 0,
        "text": "Figure"
    });
    points.push({
        "id": 1,
        "position": s2Sketch.createVector(s2Sketch.width / 2, s2Sketch.height / 2),
        "distance": [0, 0, 0],
        "image": s2Sketch.loadImage("../data/triangle/1.png"),
        "opacity": 70,
        "button": document.getElementById("triangleColor"),
        "active": false,
        "hover": false,
        "transition": 0,
        "opacity": 0,
        "text": "Color"
    });
    points.push({
        "id": 2,
        "position": s2Sketch.createVector(s2Sketch.width / 2, s2Sketch.height / 2),
        "distance": [0, 0, 0],
        "image": s2Sketch.loadImage("../data/triangle/3.png"),
        "opacity": 70,
        "button": document.getElementById("triangleTypography"),
        "active": false,
        "hover": false,
        "transition": 0,
        "opacity": 0,
        "text": "Typography"
    });
    points.push({
        "id": 3,
        "position": s2Sketch.createVector(s2Sketch.width / 2, s2Sketch.height / 2),
        "distance": [0, 0, 0],
        "image": s2Sketch.loadImage("../data/triangle/4.png"),
        "opacity": 70,
        "button": document.getElementById("triangleLayout"),
        "active": false,
        "hover": false,
        "transition": 0,
        "opacity": 0,
        "text": "Layout"
    });

    for (let i = 0; i < points.length; i++) {
        points[i].button.id = points[i].id
        points[i].button.addEventListener("click", setActive);
    }
}

function updateDistance() {
    for (let i = 0; i < points.length; i++) {
        points[i].distance[0] =
            parseFloat(s2Sketch.map(calculatePerpendicularDistance(triangle_points[0], triangle_points[1], points[i].position),
                0, triangle_ratio, 0, 1).toFixed(1));
        points[i].distance[1] =
            parseFloat(s2Sketch.map(calculatePerpendicularDistance(triangle_points[1], triangle_points[2], points[i].position),
                0, triangle_ratio, 0, 1).toFixed(1));
        points[i].distance[2] =
            parseFloat(s2Sketch.map(calculatePerpendicularDistance(triangle_points[2], triangle_points[0], points[i].position),
                0, triangle_ratio, 0, 1).toFixed(1));
    }
}

function setActive() {
    for (let i = 0; i < points.length; i++) {
        if(points[i].id==this.id) {
            points[i].active = true;
            points[i].button.classList.add("active");
        } else {
            points[i].active = false;
            points[i].button.classList.remove("active");
        }
    }
}

function calculatePerpendicularDistance(linePoint1, linePoint2, point) {
    var x1 = linePoint1.x;
    var y1 = linePoint1.y;
    var x2 = linePoint2.x;
    var y2 = linePoint2.y;
    var x3 = point.x;
    var y3 = point.y;

    var numerator = Math.abs((y2 - y1) * x3 - (x2 - x1) * y3 + x2 * y1 - y2 * x1);
    var denominator = Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));

    return numerator / denominator;
}

function getJsonObjectById(jsonArray, id) {
    let foundObject = jsonArray.find(obj => obj.id === id);
    return foundObject;
}