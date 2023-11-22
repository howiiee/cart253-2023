// Define variables for the audio, amplitude, FFT, and spheres
let audio, amp, fft, freq, volume;
let myShader;
let gradientTexture;
let bassAngle = 0.0, midAngle = 0.0, trebleAngle = 0.0, volumeAngle = 0.0;
let jitter = 0.0;
let bassPos, midPos, treblePos;
let bassVel, midVel, trebleVel;
let volumePos, volumeSphereSize = 100;

function preload() {
    // Load an audio file
    audio = loadSound("assets/sounds/princess going digital.mp3");
    myShader = loadShader("shaders/vertex.vert", "shaders/fragment.frag");
    frameRate(60);
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();

    // Start the audio playback
    audio.loop();

    // Create a new Amplitude analyzer
    amp = new p5.Amplitude();

    // Create a new FFT analyzer
    fft = new p5.FFT();

    shader(myShader);
    gradientTexture = createGradientTexture(['#F8C9DE', '#C0C9E6', '#F084B5','#E64297']);

    // Initialize positions and velocities
    bassPos = createVector(random(windowWidth), random(windowHeight));
    midPos = createVector(random(windowWidth), random(windowHeight));
    treblePos = createVector(random(windowWidth), random(windowHeight));
    volumePos = createVector(windowWidth / 2, windowHeight / 2); // Centered

    bassVel = p5.Vector.random2D();
    midVel = p5.Vector.random2D();
    trebleVel = p5.Vector.random2D();
}

function draw() {
    background(200, 200, 234, 200);

    // Analyze the frequency spectrum
    fft.analyze();

    volume = amp.getLevel();
    let bass = fft.getEnergy("bass");
    let mid = fft.getEnergy("mid");
    let treble = fft.getEnergy("treble");
    freq = fft.getCentroid();
    freq *= 0.001;

    // Update shader uniforms
    myShader.setUniform('uFrameCount', frameCount);
    myShader.setUniform('uTime', millis() / 1000.0);
    myShader.setUniform('uBass', map(bass, 0, 255, 0, 1));
    myShader.setUniform('uMid', map(mid, 0, 255, 0, 1));
    myShader.setUniform('uTreble', map(treble, 0, 255, 0, 1));
    myShader.setUniform('uVolume', map(volume, 0, 1, 0, 1));
    myShader.setUniform('uFreq', map(freq, 0, 1, 0, 20));
    myShader.setUniform('uGradient', gradientTexture);

    // Update positions based on velocity
    updateSpheres();

    // Draw spheres at updated positions
    drawSpheres();
}

// If you click the canvas, the audio will pause/play
function mousePressed() {
    if (audio.isPlaying()) {
        audio.pause();
    } else {
        audio.loop();
    }
}

function drawSpheres() {
    // Assuming you have a function to set shader and draw a sphere, for example: drawSphere(pos, size, type)
    
    // Draw Bass Sphere with rotation
    myShader.setUniform('sphereType', 0); // Type for Bass
    push();
    translate(bassPos.x - width / 2, bassPos.y - height / 2, 0); // Adjust for WEBGL coordinate system
    rotateX(bassAngle);
    rotateY(bassAngle);
    sphere(75, 400, 400); // Assuming the size is 75 for bass
    pop();

    // Draw Mid Sphere with rotation
    myShader.setUniform('sphereType', 1); // Type for Mid
    push();
    translate(midPos.x - width / 2, midPos.y - height / 2, 0);
    rotateX(midAngle);
    rotateY(midAngle);
    sphere(75, 400, 400); // Assuming the size is 75 for mid
    pop();

    // Draw Treble Sphere with rotation
    myShader.setUniform('sphereType', 2); // Type for Treble
    push();
    translate(treblePos.x - width / 2, treblePos.y - height / 2, 0);
    rotateX(trebleAngle);
    rotateY(trebleAngle);
    sphere(75, 400, 400); // Assuming the size is 75 for treble
    pop();

    // Draw Volume Sphere (Stationary)
    myShader.setUniform('sphereType', 3); // Type for Volume
    push();
    translate(volumePos.x - width / 2, volumePos.y - height / 2, 0);
    rotateX(volumeAngle);
    rotateY(volumeAngle);
    sphere(volumeSphereSize, 400, 400); // Assuming the size for the volume sphere
    pop();
}
// Function to create gradient texture
function createGradientTexture(colorArray) {
    let gradTexture = createGraphics(256, 1);
    gradTexture.noStroke();
    for (let i = 0; i < gradTexture.width; i++) {
        let inter = map(i, 0, gradTexture.width, 0, 1);
        let c = lerpColorArray(colorArray, inter); // Use your existing function
        gradTexture.stroke(c);
        gradTexture.line(i, 0, i, gradTexture.height);
    }
    gradTexture.updatePixels();
    return gradTexture;
}

// Helper function to interpolate between an array of colors
function lerpColorArray(colors, amt) {
    let sections = colors.length - 1;
    let i = int(amt * sections);
    let inter = (amt * sections) - i;
    return lerpColor(color(colors[i]), color(colors[i + 1]), inter);
}

function updateSpheres() {
    bassPos.add(bassVel);
    midPos.add(midVel);
    treblePos.add(trebleVel);

    // Collision detection and response
    checkCollisions(bassPos, bassVel, 75); // assuming bass sphere size is 75
    checkCollisions(midPos, midVel, 75);   // assuming mid sphere size is 75
    checkCollisions(treblePos, trebleVel, 75); // assuming treble sphere size is 75
}

function checkCollisions(pos, vel, size) {
    // Boundary collisions
    if (pos.x < size / 2 || pos.x > windowWidth - size / 2) {
        vel.x *= -1;
    }
    if (pos.y < size / 2 || pos.y > windowHeight - size / 2) {
        vel.y *= -1;
    }

    // Collision with volume sphere
    if (p5.Vector.dist(pos, volumePos) < size / 2 + volumeSphereSize / 2) {
        // Simple collision response: reverse velocity
        vel.mult(-1);
    }

    // Mouse interaction
    if (p5.Vector.dist(pos, createVector(mouseX, mouseY)) < 100) {
        vel.mult(-1);
    }
}
