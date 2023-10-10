class Firefly {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.phase = random(TWO_PI);  // Start with a random phase between 0 and 2π
      this.frequency = random(0.45, 0.55); // Random natural frequency, adjust range as needed
      this.neighbors = []; // Store recent phases of neighboring fireflies
      this.brightness = 0;
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.noiseOffsetX = random(0, 1000);  // For Perlin noise
      this.noiseOffsetY = random(1000, 2000);  // For Perlin noise
    }
  
    // Display the firefly
    display() {
    push(); // Isolate the styles and transformations for this firefly
  
    //let glowColor = color(237, 230, 165, this.brightness); // RGB with alpha based on brightness
    fill(this.brightness);
  
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
    
        // Check if the firefly should adjust brightness
        if (this.phase > TWO_PI) {
        this.phase -= TWO_PI;
        this.brightness = 255;  // Set max brightness
        } 
        else {
        // Gradually dim the firefly
        this.brightness *= 0.95;  // Adjust this factor to control dimming speed
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

        // Tone settings
        if (this.phase > TWO_PI) {
            this.phase -= TWO_PI;
            if (this.brightness != 255) { // To prevent replaying the sound in consecutive frames
                tone.play();
            }
            this.brightness = 255;  // Set max brightness
        }
        }

        
  }

let fireflies = [];
let numFireflies = 100;
let couplingStrength = 0.1;
let tone;
let state = 0;
let points = [];
let fontSize = 192;  // Adjust as needed
let sampleFactor = 0.3;  // Adjust to increase/decrease point density
let font;

function preload() {
    tone = loadSound("assets/sounds/chime.mp3");
    font = loadFont('assets/fonts/Arial Rounded Bold.ttf');  // Use any font you prefer
}


function setup() {
    createCanvas(500, 500);
    
    // Get points from font
    points = font.textToPoints('fireflies', 20, 250, fontSize, {
        sampleFactor: sampleFactor
    });
    
    // Create fireflies at these points
    for (let pt of points) {
        fireflies.push(new Firefly(pt.x, pt.y));
    }

    // If you have more fireflies than points, place the remaining fireflies randomly
    while (fireflies.length < numFireflies) {
        let x = random(0, width);
        let y = random(0, height);
        fireflies.push(new Firefly(x,y));
    }
}

function draw() {
    background(0);

    if (state === 0){
        // Just display the fireflies
        for (let firefly of fireflies) {
            firefly.display();
        }
    }
    else if (state === 1){
        for (let firefly of fireflies){
            firefly.update(fireflies, couplingStrength);
            firefly.display();
        }
    }
}


function mousePressed() {
    if (state === 0) {
        state = 1;
    } else if (state === 1) {
        fireflies.push(new Firefly(mouseX, mouseY));  
    }
}


function mouseDragged() {

    if (state === 1){
       for (let firefly of fireflies) {
        let distance = dist(mouseX, mouseY, firefly.position.x, firefly.position.y);
        if (distance < 50) {
            firefly.phase = random(TWO_PI);
            firefly.brightness = 0;  // Reset brightness
        }
        } 
    }
    
}


