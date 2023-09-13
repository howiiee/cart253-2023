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
    noStroke();
    
    // head
    fill(150, 173, 147);
    rectMode(CENTER);
    ellipse(200, 170, 200, 170);
    // left cheek
    ellipse(165, 195, 100, 120);
    // right cheek
    ellipse(235, 195, 100, 120);
    //chin
    ellipse(200, 200, 120, 200);

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
    

}


/**
 * Description of draw()
*/
function draw() {

}