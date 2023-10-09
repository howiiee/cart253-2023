class Firefly {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.phase = random(TWO_PI);  // Start with a random phase between 0 and 2π
      this.frequency = random(0.35, 0.55); // Random natural frequency, adjust range as needed
      this.neighbors = []; // Store recent phases of neighboring fireflies
      this.litDuration = 0;
    }
  
    // Display the firefly
    display() {
      push(); // Isolate the styles and transformations for this firefly
  
      // Check if the firefly should flash (e.g., when phase crosses 2π)
      if (this.litDuration > 0) {
        fill(255); // Bright color for flash
        this.litDuration--;
      } else {
        fill(10); // Dim color when not flashing
      }
      
      noStroke();
      ellipse(this.position.x, this.position.y, 10, 10); // Display the firefly as a small circle
  
      pop(); // Reset styles and transformations
    }
  
    // Update the firefly's phase based on the Kuramoto model
    update(fireflies, couplingStrength) {
        // Kuramoto model equation
        let sumSinDifferences = 0;
        for (let other of fireflies) {
            if (other !== this) {
                let difference = other.phase - this.phase;
                sumSinDifferences += sin(difference);
            }
        }
    
        let deltaTime = 0.05;  // Small time step; adjust as necessary
        this.phase += (this.frequency + (couplingStrength / fireflies.length) * sumSinDifferences) * deltaTime;
    
        // Check if the firefly should flash
        if (this.phase > TWO_PI) {
            this.phase -= TWO_PI;
            this.litDuration = 10;  // Set duration for flashing
        }
    }
  }

let fireflies = [];
let numFireflies = 100;
let couplingStrength = 0.25;


function preload() {

}

function setup() {

    createCanvas(500, 500);
    for (let i = 0; i < numFireflies; i++){
        let x = random(0, width);
        let y = random(0, height);
        fireflies.push(new Firefly(x,y));
    }

    // Adjusting the fireflies' frequency post-creation to narrow the frequency range
    // for (let firefly of fireflies) {
    //     firefly.frequency = random(0.45, 0.55);  // Narrowed frequency range
    // }

}

function draw() {
    background(0);

    for (let firefly of fireflies){
        firefly.update(fireflies, couplingStrength);
        firefly.display();
    }

}