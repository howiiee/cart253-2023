
let sun = {
    x: undefined,
    y: undefined,
    img: undefined,
    speed: undefined,
    vx: undefined,
    vy: undefined,
    width: undefined,
    height: undefined
};

let cloud = {
    x: undefined,
    y: undefined,
    img: undefined,
    speed: undefined,
    vx: undefined,
    vy: undefined,
    width: undefined,
    height: undefined
};
let grass = {
    x: undefined,
    y: undefined,
    img: undefined,
    speed: undefined,
    vx: undefined,
    vy: undefined,
    width: undefined,
    height: undefined
};

let bush = {
    x: undefined,
    y: undefined,
    img: undefined,
    speed: undefined,
    vx: undefined,
    vy: undefined,
    width: undefined,
    height: undefined
};

let flowers = {
    x: undefined,
    y: undefined,
    img: undefined,
    speed: undefined,
    vx: undefined,
    vy: undefined,
    width: undefined,
    height: undefined
};

let whiteFlowers = {
    x: undefined,
    y: undefined,
    img: undefined,
    speed: undefined,
    vx: undefined,
    vy: undefined,
    width: undefined,
    height: undefined
};

let bgImg;
let objects = [grass, sun, bush, flowers, whiteFlowers, grass];

function preload() {

    bgImg = loadImage("assets/images/xp.jpg");


}


function setup() {

    createCanvas(500, 500);
    imageMode(CENTER);
}


function draw() {

    image(bgImg, 250, 250, width, height);

}