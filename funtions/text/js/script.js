let hello = {

    string: "hello, world!",
    x:250,
    y:250,
    vx: 5,
    vy: 1,
};

function setup() {
    createCanvas(500,500);
}


function draw() {

    background(0);

    hello.x += hello.vx;
    hello.y += hello.vy;

    fill(200, 50, 200);
    stroke(50, 200, 50);
    strokeWeight(3);

    textAlign(CENTER,CENTER);
    textSize(64);
    textStyle(BOLD);

    text(hello.string, hello.x,hello.y);
}