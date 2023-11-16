// Define variables for the audio, amplitude, FFT, and spheres
let audio, amp, fft;
let myShader;

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
}

function draw() {
    background(0);

    // Analyze the frequency spectrum
    fft.analyze();

    let volume = amp.getLevel();
    let bass = fft.getEnergy("bass");
    let mid = fft.getEnergy("mid");
    let treble = fft.getEnergy("treble");
    let freq = fft.getCentroid();

    freq *= 0.001;

    // Update shader uniforms
    myShader.setUniform('uTime', frameCount);
    myShader.setUniform('uBass', map(bass, 0, 255, 0, 1));
    myShader.setUniform('uMid', map(mid, 0, 255, 0, 1));
    myShader.setUniform('uTreble', map(treble, 0, 255, 0, 1));
    myShader.setUniform('uVolume', map(volume, 0, 1, 0, 1));
    myShader.setUniform('uFreq', map(freq, 0, 1, 0, 20));

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
    let bassSphereSize = 50; // Size for the bass sphere
    let midSphereSize = 50;  // Size for the mid sphere
    let trebleSphereSize = 50; // Size for the treble sphere
    let volumeSphereSize = 50; // Size for the volume sphere

    // Draw Bass Sphere
    myShader.setUniform('sphereType', 0);
    push();
    translate(-width / 4, 150, 0); // Position the bass sphere
    sphere(bassSphereSize);
    pop();

    // Draw Mid Sphere
    myShader.setUniform('sphereType', 1);
    push();
    translate(width / 4, 150, 0); // Position the mid sphere
    sphere(midSphereSize);
    pop();

    // Draw Treble Sphere
    myShader.setUniform('sphereType', 2);
    push();
    translate(0, -300, 0); // Position the treble sphere
    sphere(trebleSphereSize);
    pop();

    // Draw Volume Sphere
    myShader.setUniform('sphereType', 3); // Assuming 3 is the identifier for the volume sphere
    push();
    translate(0, 0, 0); // Position the volume sphere at the center
    sphere(volumeSphereSize);
    pop();

}

