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
let circleSize = 200;
let backgroundShade = 0;
let circleX = 250;
let circleY = 250;

function preload() {

}


/**
 * Description of setup
*/
function setup() {
    createCanvas(500, 500);
    circleSize = 100;
}


/**
 * Description of draw()
*/
function draw() {

    background(backgroundShade);
    ellipse(circleX, circleY, circleSize+200);
    ellipse(250, 250, 300, 300);
    ellipse(250, 250, 200, 200);
    ellipse(250, 250, 100, 100);
}