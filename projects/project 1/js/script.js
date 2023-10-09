class Firefly {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.phase = random(TWO_PI);  // Start with a random phase between 0 and 2π
      this.frequency = random(0.1, 1.0); // Random natural frequency, adjust range as needed
      this.neighbors = []; // Store recent phases of neighboring fireflies
    }
  
    // Display the firefly
    display() {
      push(); // Isolate the styles and transformations for this firefly
  
      // Check if the firefly should flash (e.g., when phase crosses 2π)
      if (this.phase > TWO_PI) {
        fill(255); // Bright color for flash
      } else {
        fill(150); // Dim color when not flashing
      }
      
      noStroke();
      ellipse(this.position.x, this.position.y, 10, 10); // Display the firefly as a small circle
  
      pop(); // Reset styles and transformations
    }
  
    // Update the firefly's phase based on the Kuramoto model
    update(fireflies, couplingStrength) {
      let sum = 0;
      this.neighbors = []; // Clear neighbors
  
      // Calculate the sum of sin differences with other fireflies
      for (let other of fireflies) {
        if (other !== this) { // Avoid comparing with itself
          let difference = other.phase - this.phase;
          sum += sin(difference);
          this.neighbors.push(other.phase); // Store the phase of the neighbor
        }
      }
  
      // Kuramoto model equation
      let deltaPhase = this.frequency + (couplingStrength / this.neighbors.length) * sum;
      
      this.phase += deltaPhase; // Update the phase
  
      // Reset phase after it completes a cycle
      if (this.phase > TWO_PI) {
        this.phase -= TWO_PI;
      }
    }
  }
  



function preload() {

}

function setup() {

}

function draw() {

}