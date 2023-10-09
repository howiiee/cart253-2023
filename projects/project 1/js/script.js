class Firefly {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.phase = random(TWO_PI);  // Start with a random phase between 0 and 2π
      this.frequency = random(0.45, 0.55); // Random natural frequency, adjust range as needed
      this.neighbors = []; // Store recent phases of neighboring fireflies
      this.litDuration = 0;
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.noiseOffsetX = random(0, 1000);  // For Perlin noise
      this.noiseOffsetY = random(1000, 2000);  // For Perlin noise
    }
  
    // Display the firefly
    display() {
      push(); // Isolate the styles and transformations for this firefly
  
      // Check if the firefly should flash (e.g., when phase crosses 2π)
      if (this.litDuration > 0) {
        fill(255); // Bright color for flash
        this.litDuration--;
      } else {
        fill(25); // Dim color when not flashing
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

        // Movement using Perlin noise
        this.acceleration.x = map(noise(this.noiseOffsetX), 0, 1, -0.05, 0.05);
        this.acceleration.y = map(noise(this.noiseOffsetY), 0, 1, -0.05, 0.05);
        this.velocity.add(this.acceleration);
        this.velocity.limit(2);  // Limit speed
        this.position.add(this.velocity);
    
        // Increment noise offsets for the next frame
        this.noiseOffsetX += 0.01;
        this.noiseOffsetY += 0.01;

        // Boundary check to wrap fireflies around canvas
        if (this.position.x > width) this.position.x = 0;
        if (this.position.x < 0) this.position.x = width;
        if (this.position.y > height) this.position.y = 0;
        if (this.position.y < 0) this.position.y = height;
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