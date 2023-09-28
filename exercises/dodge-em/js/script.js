
let bgGif;
let sun;

function preload() {

bgGif = loadImage("assets/images/space.gif");
sun = loadImage("assets/images/sun.gif")

}

function setup() {
    createCanvas(500, 500);
    imageMode(CENTER);
}


function draw() {

    image(bgGif, 250, 250, width, height);
    image(sun, 250, 250, 200, 200);

}