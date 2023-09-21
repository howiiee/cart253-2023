/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
*/
function setup() {

    createCanvas(400,400);
    background(0, 0, 0);
    angleMode(DEGREES);

}


/**
 * Description of draw()
*/
function draw() {
    noStroke();
    
    // head
    fill(255, 156, 213);
    rectMode(CENTER);
    ellipse(200, 170, 200, 170);

    // left cheek
    ellipse(165, 195, 100, 120);

    // right cheek
    ellipse(235, 195, 100, 120);

    //chin
    ellipse(200, 200, 120, 200);
    
    // right blush
    fill(235, 64, 52, 127);
    ellipse(255, 216, 35, 15);

    // left blush
    fill(235, 64, 52, 127);
    ellipse(145, 216, 35, 15);

    // left eye
    fill(0, 0, 0);
    ellipse(150, 180, 90, 70);

    // right eye
    fill(0, 0, 0);
    ellipse(250, 180, 90, 70);

    // left nostril
    fill(0, 0, 0);
    ellipse(190, 230, 6, 15);

    // right nostril
    fill(0, 0, 0);
    ellipse(210, 230, 6, 15);

    // mouth
    fill(0, 0, 0)
    rect(200, 260, 25, 5);

    // big left circle cute eyes
    fill(255, 255, 255);
    ellipse(165, 170, 25, 25);

    // med left circle cute eyes
    fill(255, 255, 255);
    ellipse(123, 192, 15, 15);

    // smoll left circle cute eyes
    fill(255, 255, 255);
    ellipse(135, 202, 8, 8);

    // big right circle cute eyes
    fill(255, 255, 255);
    ellipse(235, 170, 25, 25);

    // med right circle cute eyes
    fill(255, 255, 255);
    ellipse(277, 192, 15, 15);

    // smoll right circle cute eyes
    fill(255, 255, 255);
    ellipse(265, 202, 8, 8);

    //neck 
    fill(255, 156, 213);
    ellipse(200, 300, 25, 10);
    ellipse(200, 307, 25, 10);
    ellipse(200, 314, 25, 10);
    ellipse(200, 321, 25, 10);
    ellipse(200, 328, 25, 10);
    ellipse(200, 335, 25, 10);
    ellipse(200, 342, 25, 10);
    ellipse(200, 349, 25, 10);
    ellipse(200, 356, 25, 10);

    // neck lines
    fill(247, 114, 192);
    rect(200, 304, 15, 1);
    rect(200, 311, 15, 1);
    rect(200, 318, 15, 1);
    rect(200, 325, 15, 1);
    rect(200, 332, 15, 1);
    rect(200, 339, 15, 1);
    rect(200, 346, 15, 1);

    // shoulders
    fill(255, 156, 213);
    ellipse(200, 400, 250, 100);

    // ufo body
    fill(215, 215, 215);
    ellipse(325, 75, 55);

    //ufo windows
    //let m = map(0, 400, 0, 255);
    // fill(250-mouseY, 243-mouseY, 105-mouseY);
    fill(map(mouseY, 0, height, 255,0), map(mouseY, 0, height, 255,0), 0);
    ellipse(305, 70, 10, 18);
    ellipse(318, 70, 10, 18);
    ellipse(332, 70, 10, 18);
    ellipse(345, 70, 10, 18);

    // ufo rim
    fill(194, 194, 194);
    ellipse(325, 75, 100, 12);
}