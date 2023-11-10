// Define variables for the audio, amplitude, FFT, and spheres
let audio, amp, fft;
let bassSphere, midSphere, trebleSphere, volumeSphere;

function preload() {
    // Load an audio file
    audio = loadSound("assets/sounds/princess going digital.mp3");
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

    // Initialize the sphere data
    bassSphere = { size: 50, color: [255, 0, 0] }; // Red sphere for bass
    midSphere = { size: 50, color: [0, 255, 0] }; // Green sphere for mid frequencies
    trebleSphere = { size: 50, color: [0, 0, 255] }; // Blue sphere for treble frequencies
    volumeSphere = { size: 50, color: [255, 255, 255] }; // White sphere for volume
}

function draw() {
    background(0);

    // Analyze the frequency spectrum
    fft.analyze();

    let volume = amp.getLevel();
    let bass = fft.getEnergy("bass");
    let mid = fft.getEnergy("mid");
    let treble = fft.getEnergy("treble");

    // Map the energy to sphere sizes
    bassSphere.size = map(bass, 0, 255, 30, 200);
    midSphere.size = map(mid, 0, 255, 30, 200);
    trebleSphere.size = map(treble, 0, 255, 30, 200);
    volumeSphere.size = map(volume, 0, 1, 30, 200); // Use the actual volume level

    // Position the spheres in a triangular formation
    // Draw the volume sphere in the center
    fill(volumeSphere.color);
    push();
    translate(0, 0, 0);
    sphere(volumeSphere.size);
    pop();

    // Draw the bass sphere
    fill(bassSphere.color);
    push();
    translate(-width / 4, 150, 0); // Position to the left and down
    sphere(bassSphere.size);
    pop();

    // Draw the mid frequencies sphere
    fill(midSphere.color);
    push();
    translate(width / 4, 150, 0); // Position to the right and down
    sphere(midSphere.size);
    pop();

    // Draw the treble sphere
    fill(trebleSphere.color);
    push();
    translate(0, -300, 0); // Position above the center sphere
    sphere(trebleSphere.size);
    pop();
}

// If you click the canvas, the audio will pause/play
function mousePressed() {
    if (audio.isPlaying()) {
        audio.pause();
    } else {
        audio.loop();
    }
}
