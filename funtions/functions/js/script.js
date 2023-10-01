let circle = {
    x:0,
    y: 250,
    size: 100,
    vx:1,
    vy: 0
};

function setup() {
    createCanvas(500, 500);
}


function draw() {
    background(0);

    move();
    wrap();
    display();

}

function reset(){
    circle.x =0;
    circle.vx += 2;
    circle.size += 5;
    circle.vy += -0.25;
}


function mousePressed(){
    reset();
}

function move(){
    circle.x = circle.x + circle.vx;
    circle.y = circle.y + circle.vy;
}

function wrap(){
    if (circle.x > width){
        reset();

    }
}

function display(){
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(circle.x, circle.y, circle.size);
}


