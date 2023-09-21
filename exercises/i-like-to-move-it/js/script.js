


let circles = [];
let attempts = 500;

function preload() {

}

function setup() {

    createCanvas(500, 500);
    noStroke();

}

function draw() {

  background(251, 54, 64); // Clears the canvas in each frame

  for (let i = 0; i < attempts; i++) {
      let size = random(1, 30);
      let x = constrain(random(width), size / 2, width - size / 2);
      let y = constrain(random(height), size / 2, height - size / 2);

      let circle = {
          size: size,
          x: x,
          y: y
      };

      let canAddCircle = true;

      for (let existingCircle of circles) {
          let distance = dist(circle.x, circle.y, existingCircle.x, existingCircle.y);
          let minDistance = circle.size / 2 + existingCircle.size / 2;

          if (distance < minDistance) {
              canAddCircle = false;
              break;
          }
      }

      if (canAddCircle) {
          circles.push(circle);
          break;
      }
  }

  // Loop through all existing circles and draw them with a color based on their distance to the cursor
  for (let circle of circles) {
      let d = dist(circle.x, circle.y, mouseX, mouseY); // This is the distance between a circle and the mouse
      // let circleColorMapR = map(d, 0, 500, 255, 0); 
      let r = map(d, 0, 500, 149, 15);
      let g = map(d, 0, 500, 195, 116);
      let b = map(d, 0, 500, 255, 247);
      fill(r, g, b); // Set the fill color based on the mapped value
      ellipse(circle.x, circle.y, circle.size);
  }

  // Check if any circle should be removed
  for (let i = 0; i < circles.length; i++) {
      let circle = circles[i];
      let d = dist(circle.x, circle.y, mouseX, mouseY);
      if (d < circle.size / 2 + 20) {
          circles.splice(i, 1);
          i--;
      }
  }

  // Draw the circle under the mouse
  fill(149,195,255); // This will make the circle under the mouse white
  ellipse(mouseX, mouseY, 40);
}

