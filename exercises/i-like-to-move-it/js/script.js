// Initializes an empty array to store circle objects and sets the number of attempts to create new circles to 500.
let circles = [];
let attempts = 500;

function preload() { }

function setup() {
    createCanvas(500, 500); // Creates a canvas of 500x500 pixels.
    noStroke(); // Disables drawing the outline (stroke) of shapes.
}

function draw() {
    background(251, 54, 64); // Sets the background color of the canvas to a specific red color at the beginning of each frame.

    // Attempts to create and add new circles
    for (let i = 0; i < attempts; i++) {
        // Define the new circle's properties: size, x and y coordinates.
        let size = random(1, 30);
        let x = constrain(random(width), size / 2, width - size / 2);
        let y = constrain(random(height), size / 2, height - size / 2);

        let circle = { size: size, x: x, y: y };

        // Check if the new circle intersects with any existing circles in the 'circles' array.
        let canAddCircle = true;
        for (let existingCircle of circles) {
            let distance = dist(circle.x, circle.y, existingCircle.x, existingCircle.y);
            if (distance < (circle.size / 2 + existingCircle.size / 2)) {
                canAddCircle = false;
                break;
            }
        }

        // If the new circle doesn’t intersect with existing circles, it is added to the 'circles' array.
        if (canAddCircle) {
            circles.push(circle);
            break;
        }
    }

    // Loop through all circles and draw them with a color based on their distance to the mouse cursor.
    for (let circle of circles) {
        let d = dist(circle.x, circle.y, mouseX, mouseY);
        let r = map(d, 0, 500, 149, 15);
        let g = map(d, 0, 500, 195, 116);
        let b = map(d, 0, 500, 255, 247);
        fill(r, g, b);
        ellipse(circle.x, circle.y, circle.size);
    }

    // Remove circles that are too close to the mouse cursor.
    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        let d = dist(circle.x, circle.y, mouseX, mouseY);
        if (d < circle.size / 2 + 20) {
            circles.splice(i, 1);
            i--;
        }
    }

    // Draws a circle under the mouse cursor with a specific color.
    fill(149,195,255);
    ellipse(mouseX, mouseY, 40);
}
