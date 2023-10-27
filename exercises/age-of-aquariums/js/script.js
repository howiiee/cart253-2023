let fishes = [];
let fishImg;
let shark;
let sharkImg;
let eatenCount = 0;
let gameState = "playing";
let offset = 10;
let enemyShark;
let sharkIsAlive = true;
let enemySharkImg;
let reefImg;
let bubblesImg;
let bubbles = [];

function preload() {
    fishImg1 = loadImage("assets/images/fish.png");
    fishImg2 = loadImage("assets/images/fish2.png");
    sharkImg = loadImage("assets/images/shark.gif");
    bgGif = loadImage("assets/images/water.png");
    enemySharkImg = loadImage("assets/images/enemyShark.gif");
    reefImg = loadImage("assets/images/reef.gif");
    bubblesImg = loadImage("assets/images/bubbles.gif");
}

function setup() {
    createCanvas(500, 500);

    shark = {
        img: sharkImg,
        x: width / 2,
        y: height / 2,
        size: 50
    };

    enemyShark = new EnemyShark();

    for (let i = 0; i < 20; i++) {
        fishes.push(new Fish());
    }

    for (let i = 0; i < 8; i++) {  // create 5 bubbles, adjust as needed
        bubbles.push(new Bubble());
    }
    
}

function draw() {
    let bgWidth = bgGif.width;
    let bgHeight = bgGif.height;
    imageMode(CENTER);

    // Adjusted nested loop to ensure the last column/row is displayed even if it's cut off
    for (let x = 0; x <= width + bgWidth; x += bgWidth) {
        for (let y = 0; y <= height + bgHeight; y += bgHeight) {
            image(bgGif, x, y, bgWidth, bgHeight);
        }
    }

    image(reefImg, 230, 467);

    for (let bubble of bubbles) {
        bubble.show();
    }

    for (let i = fishes.length - 1; i >= 0; i--) {
        fishes[i].show();
        fishes[i].move();

        if (collides(fishes[i])) {
            shark.size += 10;
            fishes.splice(i, 1);
            eatenCount++;

            if (eatenCount == 15) {
                gameState = "ending";
            }
        }
    }

    enemyShark.show();
    enemyShark.move();

    if (enemyShark.enemyCollides(shark)) {
        gameState = "enemyCollision";
        sharkIsAlive = false;
    }

    if (gameState == "enemyCollision") {
        background(255, 0, 0); // Make background red
        fill(0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("Game Over!", width / 2, height / 2);
        noLoop();
    }

    let clampedMouseX = constrain(mouseX, shark.size / 2, width - shark.size / 2);
    let clampedMouseY = constrain(mouseY, shark.size / 2, height - shark.size / 2);

    if (sharkIsAlive) {
        imageMode(CENTER);
        image(shark.img, clampedMouseX, clampedMouseY, shark.size, shark.size);
    }

    if (gameState == "ending") {
        fill(0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("Game Over!", width / 2, height / 2);
        noLoop();
    }
}

function collides(f) {
    let distance = dist(f.x, f.y, mouseX, mouseY);
    return distance < (f.size / 2 + shark.size / 2) - offset;
}

class Fish {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = 30;
        this.speedX = random(-2, 2);
        this.speedY = random(-2, 2);
        this.img = random([fishImg1, fishImg2]);
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > width || this.x < 0) this.speedX *= -1;
        if (this.y > height || this.y < 0) this.speedY *= -1;
    }

    show() {
        imageMode(CENTER);
        image(this.img, this.x, this.y, this.size, this.size);
    }
}

class EnemyShark {
    constructor() {
        this.img = enemySharkImg;
        this.x = random(width);
        this.y = random(height);
        this.offset = 50;
        this.width = 150;
        this.height = 50;
        this.size = 40;
        this.chaseSpeed = 0.04;
    }

    move() {
        // Lerp the enemy shark's position towards the mouse's position
        this.x = lerp(this.x, mouseX, this.chaseSpeed);
        this.y = lerp(this.y, mouseY, this.chaseSpeed);
    }

    show() {
        imageMode(CENTER);
        image(this.img, this.x, this.y, this.width, this.height);
    }

    enemyCollides() {
        let distance = dist(this.x, this.y, mouseX, mouseY);
        return (distance < (this.width / 2 + shark.size / 2) - this.offset) || (distance < (this.height / 2 + shark.size / 2) - this.offset);
    }
}

function resetGame() {
    // Reset game variables to their initial states
    fishes = [];
    bubbles = [];
    eatenCount = 0;
    gameState = "playing";
    sharkIsAlive = true;
    shark.size = 50;
    shark.x = width / 2;
    shark.y = height / 2;
    enemyShark = new EnemyShark();

    for (let i = 0; i < 20; i++) {
        fishes.push(new Fish());
    }

    for (let i = 0; i < 8; i++) {  // create 5 bubbles, adjust as needed
        bubbles.push(new Bubble());
    }

    loop();  // restart the game loop
}

function mousePressed() {
    if (gameState === "ending" || gameState === "enemyCollision") {
        resetGame();
    }
}

class Bubble {
    constructor() {
        this.x = random(width);
        this.y = random(height);
    }

    show() {
        imageMode(CENTER);
        image(bubblesImg, this.x, this.y);
    }
}



