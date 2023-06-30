var s2;
var s2Sketch;

var points = [];
var active_point = null;
var offset;

var triangle_points = [];
var triangle_size = 300; // Size of the equilateral triangle
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

        s2Sketch.fill(200);
        s2Sketch.triangle(triangle_points[0].x, triangle_points[0].y,
            triangle_points[1].x, triangle_points[1].y,
            triangle_points[2].x, triangle_points[2].y);

        for (let i = 0; i < points.length; i++) {
            s2Sketch.fill(points[i].color);
            s2Sketch.ellipse(points[i].position.x, points[i].position.y, 20);
        }

        drawDistance();
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
        if(active_point!=null) {
            // Reset the active_point to null when the mouse is released
            active_point = null;
            triangleTemplate();
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
        "color": s2Sketch.color(255, 0, 0),
        "position": s2Sketch.createVector(s2Sketch.width / 2, s2Sketch.height / 2),
        "distance1": 0,
        "distance2": 0,
        "distance3": 0
    });
    points.push({
        "id": 1,
        "color": s2Sketch.color(0, 255, 0),
        "position": s2Sketch.createVector(s2Sketch.width / 2, s2Sketch.height / 2),
        "distance1": 0,
        "distance2": 0,
        "distance3": 0
    });
    points.push({
        "id": 2,
        "color": s2Sketch.color(0, 0, 255),
        "position": s2Sketch.createVector(s2Sketch.width / 2, s2Sketch.height / 2),
        "distance1": 0,
        "distance2": 0,
        "distance3": 0
    });
    points.push({
        "id": 3,
        "color": s2Sketch.color(255, 255, 0),
        "position": s2Sketch.createVector(s2Sketch.width / 2, s2Sketch.height / 2),
        "distance1": 0,
        "distance2": 0,
        "distance3": 0
    });

    /*console.log(points[0].position);
    console.log(
        reversePerpendicularDistance(triangle_points[0], triangle_points[1], calculatePerpendicularDistance(triangle_points[0], triangle_points[1], points[0].position)
        ));*/
}

function updateDistance() {
    for (let i = 0; i < points.length; i++) {
        points[i].distance1 =
            s2Sketch.map(calculatePerpendicularDistance(triangle_points[0], triangle_points[1], points[i].position),
                0, triangle_ratio, 0, 1).toFixed(1);
        points[i].distance2 =
            s2Sketch.map(calculatePerpendicularDistance(triangle_points[1], triangle_points[2], points[i].position),
                0, triangle_ratio, 0, 1).toFixed(1);
        points[i].distance3 =
            s2Sketch.map(calculatePerpendicularDistance(triangle_points[2], triangle_points[0], points[i].position),
                0, triangle_ratio, 0, 1).toFixed(1);
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

function drawDistance() {
    updateDistance();
    for (let i = 0; i < points.length; i++) {
        s2Sketch.fill(points[i].color);
        s2Sketch.text(points[i].distance1 + ", " + points[i].distance2 + ", " + points[i].distance3, 10, 30 * (i + 1));
    }
}

function getJsonObjectById(jsonArray, id) {
    let foundObject = jsonArray.find(obj => obj.id === id);
    return foundObject;
}