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

let circle = {
    x: 250,
    y: 250,
    size: 200,
    speed: 2,
    fill: 0
};

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
    background(backgroundShade);
    
    circle.speed = random(-5, 5);
    circle.x += circle.speed;
    // circle.y = random(0, height);
    circle.size = random(10, 100);

    circle.fill = random(0, 255);
    fill(circle.fill);
    ellipse(circle.x, circle.y, circle.size);

    // let randomNumber = random();
    // console.log(randomNumber);
}