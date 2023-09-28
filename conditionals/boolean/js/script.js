let displayCircle = false;

function setup() {

    createCanvas(500, 500);
}

function draw() {

        background(0);

        if (mouseIsPressed){
            displayCircle = true;
        }

        if (displayCircle){
            fill(255);
            ellipse(250,250,100,100);
        }
    

}