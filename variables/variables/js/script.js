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

let backgroundShade = 0;
// this is replaced by the object
let circleSize = 200;
let circleX = 0;
let circleY = 250;
let circleSpeed = 2;
// let circleAcceleration = .25;

// cicle.something gives us the propertie 
// let circle = {
//     x: 0,
//     y: 250,
//     size: 200,
//     speed: 2
// };

function preload() {

}


/**
 * Description of setup
*/
function setup() {
    createCanvas(500, 500);
}


/**
 * Description of draw()
*/
function draw() {

    // backgroundShade = backgroundShade +1;
    background(backgroundShade);
    circleX += circleSpeed;
    // circleSpeed += circleAcceleration;
    // circleSize = circleSize * 1.01;
    // circleY = circleY / 1.01;
    ellipse(circleX, circleY, circleSize);

    // how to see what is going in a variable
    // console.log(circleX);
    console.log(`circleX: ${circleX}, circleY: ${circleY}, circleSize: ${circleSize}, circleSpeed: ${circleSpeed}`);
    // console.log("circleY: " + circleY);
}