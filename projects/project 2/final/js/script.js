// Define variables for the audio, amplitude, FFT, and spheres
let audio, amp, fft, freq, volume;
let myShader;
let gradientTexture;
let bassAngle = 0.0, midAngle = 0.0, trebleAngle = 0.0, volumeAngle = 0.0;
let jitter = 0.0;

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
    shader(myShader);

    // Sizes for each sphere, replace these with your own logic
    let bassSphereSize = 75; // Size for the bass sphere
    let midSphereSize = 75;  // Size for the mid sphere
    let trebleSphereSize = 75; // Size for the treble sphere
    let volumeSphereSize = 100; // Size for the volume sphere

    // Calculate jitter and update angles
    if (second() % 2 == 0) {
        jitter = random(0, 0.1);
        jitter += jitter
    }

    // Use a time-based function like sin or cos for smoother rotation
    let time = millis() / 1000; // Get the current time in seconds

    // Update each angle using time
    bassAngle = sin(time * 0.2) * TWO_PI;
    midAngle = cos(time * 0.2) * TWO_PI;
    trebleAngle = sin(time * 0.2 + PI / 2) * TWO_PI;
    volumeAngle = cos(time * 0.02 + PI / 2) * TWO_PI;

    // Draw Bass Sphere with rotation
    myShader.setUniform('sphereType', 0);
    push();
    translate(-width / 4, 150, 0);
    rotateX(bassAngle);
    rotateY(bassAngle);
    sphere(bassSphereSize, 400, 400);
    pop();

    // Draw Mid Sphere with rotation
    myShader.setUniform('sphereType', 1);
    push();
    translate(width / 4, 150, 0);
    rotateX(midAngle);
    rotateY(midAngle);
    sphere(midSphereSize, 400, 400);
    pop();

    // Draw Treble Sphere with rotation
    myShader.setUniform('sphereType', 2);
    push();
    translate(0, -300, 0);
    rotateX(trebleAngle);
    rotateY(trebleAngle);
    sphere(trebleSphereSize, 400, 400);
    pop();

    // Draw Volume Sphere with rotation
    myShader.setUniform('sphereType', 3);
    push();
    translate(0, 0, 0);
    rotateX(volumeAngle);
    rotateY(volumeAngle);
    sphere(volumeSphereSize, 400, 400);
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
