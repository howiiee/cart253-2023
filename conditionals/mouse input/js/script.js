let circle = {
    x: 250,
    y: 250,
    size: 100
}

let bg = {
    r:0,
    g:0,
    b:0
}

function setup() {
    createCanvas(500, 500);
}



function draw() {
    background(bg.r, bg.g, bg.b);

    ellipse(circle.x,circle.y,circle.size);
}

function mouseMoved(){
    bg.r = random(0, 255);
    bg.g = random(0, 255);
    bg.b = random(0, 255);
}