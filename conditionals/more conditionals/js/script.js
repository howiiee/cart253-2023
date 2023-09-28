let backgroundShade = 0;
let circle = {
    x: 0,
    y: 250,
    size: 100,
    speed: 1
}


function preload() {
}


function setup() {

    createCanvas(500, 500);
}

function draw() {
    background (backgroundShade);

    circle.x += circle.speed;

    // if (mouseX < width/3){
    //     fill(255, 0, 0);
    // }
    // else if (mouseX < 2* width/3) {
    //     fill(0, 255, 0);
    // }
    // else{
    //     fill(0, 0, 255);
    // }

    fill(255);
    if (circle.x > width/3 && circle.x < 2 * width/3){
        fill(255, 0, 0);  
    }

    ellipse(circle.x, circle.y, circle.size);

}