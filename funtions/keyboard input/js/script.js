let bg = 0;

function setup() {
    createCanvas(500, 500);
}

function draw() {

    background(bg);

    if (keyIsDown(65)){
        rectMode(CENTER);
        rect(width/2, height/2, 100,100 );

    }
    // textAlign(CENTER, CENTER);
    // textSize(64);
    // fill(255);
    // text(keyCode, width/2, height/2);
}


// function keyPressed(){
//     if (keyCode === UP_ARROW){
//         bg += 10;
//         bg = constrain(bg, 0, 255)
//     }
//     else if (keyCode === DOWN_ARROW){
//         bg += -10;
//         bg = constrain(bg, 0, 255)
//     }
// }