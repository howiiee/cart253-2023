let caterpillar = {
    x: 100,
    y: 250,
    segmentSize: 50
}
function setup() {
    createCanvas(500, 500);
}

function draw() {
    background(0);
    noStroke();
    fill(100, 200, 100);


    let x = caterpillar.x;
    let numSegments = 1;
    let segmentsDrawn = 0;

    while (segmentsDrawn < numSegments){
        ellipse(x, caterpillar.y, caterpillar.segmentSize);
        x += 40;
        segmentsDrawn++;
    }


    // for loop
    // for (let i = 0; i < 5; i++){
    //     ellipse(x, caterpillar.y, caterpillar.segmentSize);
    //     x += 40;
    // }
    
}