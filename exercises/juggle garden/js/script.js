let flowerImages = [];
let flowers = [];
let pests = [];
let gardener;
const numFlowers = 10;
const numPests = 3;
let currentState;

function preload() {
    for (let i = 0; i < 16; i++) {
        flowerImages[i] = loadImage("assets/images/flower" + nf(i, 2) + ".png");
    }
}


function setup() {
    createCanvas(800, 600);
    gardener = new Gardener();
    for (let i = 0; i < numFlowers; i++) {
        flowers.push(new Flower(random(50, width - 50), random(50, height - 50)));
    }
    for (let i = 0; i < numPests; i++) {
        pests.push(new Pest());
    }
    currentState = new TitleState();
}

function draw() {
    currentState.display();
}

function keyPressed() {
    currentState.keyPressed();
}

function mouseClicked() {
    currentState.mouseClicked();
}

class TitleState {
    display() {
        background(200);
        textSize(32);
        textAlign(CENTER);
        fill(0);
        text("Garden Simulation", width / 2, height / 2 - 40);
        textSize(16);
        text("Click to start", width / 2, height / 2);
    }

    mouseClicked() {
        currentState = new SimulationState();
    }

    keyPressed() { }
}

class SimulationState {
    display() {
        background(255);
        gardener.move();
        gardener.display();

        for (let pest of pests) {
            pest.move();
            pest.display();
            for (let flower of flowers) {
                pest.attack(flower);
            }
        }

        let allBloomed = true;
        let allDamaged = true;
        for (let flower of flowers) {
            flower.update();
            flower.display();
            if (flower.bloomState !== flowerImages.length - 1) allBloomed = false;
            if (flower.bloomState !== 0) allDamaged = false;
        }

        if (allBloomed) {
            currentState = new WinState();
        } else if (allDamaged) {
            currentState = new LoseState();
        }
    }

    keyPressed() {
        if (keyCode === 70) { // 'F' key
            gardener.toggleMode();
        } else if (keyCode === 32) { // Spacebar
            if (gardener.mode === 'watering') {
                flowers.forEach(flower => {
                    if (dist(flower.x, flower.y, gardener.x, gardener.y) < 50) {
                        flower.water();
                    }
                });
            } else if (gardener.mode === 'pest control') {
                // Check for pests close to the gardener and "kill" them
                pests = pests.filter(pest => {
                    if (dist(pest.x, pest.y, gardener.x, gardener.y) < 50) {
                        return false; // Remove the pest from the array
                    }
                    return true;
                });
            }
        }
    }

    mouseClicked() { }
}

class WinState {
    display() {
        background(0, 255, 0);
        textSize(32);
        textAlign(CENTER);
        fill(0);
        text("Congratulations! All flowers have bloomed!", width / 2, height / 2);
    }

    keyPressed() { }
    mouseClicked() { }
}

class LoseState {
    display() {
        background(255, 0, 0);
        textSize(32);
        textAlign(CENTER);
        fill(255);
        text("Oh no! All flowers have been damaged!", width / 2, height / 2);
    }

    keyPressed() { }
    mouseClicked() { }
}

class Flower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bloomState = 1;
        this.lastBloomUpdate = millis();
    }

    water() {
        this.bloomState = min(this.bloomState + 2, flowerImages.length - 1);
    }

    update() {
        // Only update bloomState if it's not already showing the last frame
        if (this.bloomState < flowerImages.length - 1) {
            if (millis() - this.lastBloomUpdate > 4000) {
                this.bloomState++;
                this.lastBloomUpdate = millis();
            }
        }
    }


    display() {
        image(flowerImages[this.bloomState], this.x, this.y, 50, 50);
    }
}

class Gardener {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.size = 50;
        this.mode = 'watering'; // Start in 'watering' mode
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) this.x -= 5;
        if (keyIsDown(RIGHT_ARROW)) this.x += 5;
        if (keyIsDown(UP_ARROW)) this.y -= 5;
        if (keyIsDown(DOWN_ARROW)) this.y += 5;

        // Keep the gardener within the canvas
        this.x = constrain(this.x, this.size / 2, width - this.size / 2);
        this.y = constrain(this.y, this.size / 2, height - this.size / 2);
    }

    display() {
        // Draw the gardener
        fill(0, 128, 0);
        ellipse(this.x, this.y, this.size);

        // If in 'pest control' mode, draw a red circle around the gardener
        if (this.mode === 'pest control') {
            noFill(); // No fill for the circle
            stroke(255, 0, 0); // Red color
            strokeWeight(2); // Set the stroke weight to make the circle visible
            ellipse(this.x, this.y, this.size + 20); // Draw the circle slightly larger than the gardener
            noStroke(); // Reset stroke so it doesn't affect other drawings
        }
    }

    toggleMode() {
        // Toggle between 'watering' and 'pest control' modes
        this.mode = this.mode === 'watering' ? 'pest control' : 'watering';
    }
}


class Pest {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.speed = .5;
        this.size = 20;
        this.attackEnabled = false;
        this.targetFlower = null; // New property to keep track of the current target

        // Set a timeout for enabling attacks to give the game some lead time
        setTimeout(() => this.attackEnabled = true, 5000); // Enables attacks after 5 seconds
    }

    // Function to select the closest flower that is not at bloomState 0
    selectTarget() {
        let closestFlower = null;
        let recordDistance = Infinity;
        flowers.forEach(flower => {
            let d = dist(this.x, this.y, flower.x, flower.y);
            if (d < recordDistance && flower.bloomState > 0) {
                recordDistance = d;
                closestFlower = flower;
            }
        });
        this.targetFlower = closestFlower;
    }

    move() {
        // If there is no target or the current target is fully damaged, find a new one
        if (!this.targetFlower || this.targetFlower.bloomState === 0) {
            this.selectTarget();
        }

        // Seek the target
        if (this.targetFlower) {
            let desired = createVector(this.targetFlower.x - this.x, this.targetFlower.y - this.y);
            desired.setMag(this.speed);
            this.x += desired.x;
            this.y += desired.y;
        }

        // Keep the pest within the bounds of the canvas
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
    }

    display() {
        fill(150, 75, 0);
        ellipse(this.x, this.y, this.size);
    }

    attack(flower) {
        if (this.attackEnabled && flower === this.targetFlower && dist(this.x, this.y, flower.x, flower.y) < this.size / 2) {
            flower.bloomState = max(flower.bloomState - 1, 0);
            // If the flower is fully damaged, select a new target
            if (flower.bloomState === 0) {
                this.selectTarget();
            }
        }
    }
}


