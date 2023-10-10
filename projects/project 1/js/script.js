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
        } else {
            // Gradually dim the firefly
            this.brightness *= 0.95;  // Adjust this factor to control dimming speed
        }
    
        // Only move the fireflies if state is 1
        if (state === 1) {
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
let numFireflies = 260;
let couplingStrength = 0.1;
let tone;
let state = 0;
let font;
let fontPoints = [];
let fontSize = 90;


function preload() {
    tone = loadSound("assets/sounds/chime.mp3"); 
    font = loadFont("assets/fonts/Arial.ttf")
}

function setup() {

    createCanvas(500, 500);

    
    fontPoints = font.textToPoints("FIREFLIES", 23, 288, fontSize);

    for (let i = 0; i < numFireflies; i++){
        let x = fontPoints[i].x;
        let y = fontPoints[i].y;
        fireflies.push(new Firefly(x,y));
    }

    // Adjusting the fireflies' frequency post-creation to narrow the frequency range
    // for (let firefly of fireflies) {
    //     firefly.frequency = random(0.45, 0.55);  // Narrowed frequency range
    // }

}

function draw() {
    background(0);

    if (state === 0){

        textAlign(CENTER, CENTER);
        fill(255);
        textSize(fontSize);
        textFont(font);
        text("FIREFLIES", width/2, height/2);

        for(let i = 0; i < fontPoints.length; i++){
            ellipse(fontPoints[i].x, fontPoints[i].y, 10, 10);
            console.log(fontPoints);
        }

        for (let firefly of fireflies){
            firefly.update(fireflies, couplingStrength);
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