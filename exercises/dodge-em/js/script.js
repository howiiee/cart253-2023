
let bgGif;
let sun;

let uranus = {
    x: 250,
    y:95,
    img: undefined,
    width: 75,
    height: 75,
    dragging: false
}

let planet = {
    x: 375,
    y:125,
    img: undefined,
    width: 75,
    height: 75,
    dragging: false
}

let planet2 = {
    x: 405,
    y:250,
    img: undefined,
    width: 75,
    height: 75,
    dragging: false
}

let mars = {
    x: 375,
    y:375,
    img: undefined,
    width: 75,
    height: 75,
    dragging: false
}

let moon = {
    x: 125,
    y: 375,
    img: undefined,
    width: 75,
    height: 75,
    dragging: false
}

let saturn = {
    x: 125,
    y:125,
    img: undefined,
    width: 120,
    height: 75,
    dragging: false
}

let alien = {
    x: 95,
    y:250,
    img: undefined,
    width: 75,
    height: 75,
    dragging: false
}

let earth = {
    x: 250,
    y:405,
    img: undefined,
    width: 75,
    height: 75,
    dragging: false
}

let planets = [uranus, saturn, alien, planet, planet2, moon, mars, earth];

function preload() {

bgGif = loadImage("assets/images/space.gif");
sun = loadImage("assets/images/sun.gif");
earth.img = loadImage("assets/images/earth.gif");
uranus.img = loadImage("assets/images/uranus.png");
planet.img = loadImage("assets/images/planet.png");
planet2.img = loadImage("assets/images/planet2.gif");
mars.img = loadImage("assets/images/mars.png");
saturn.img = loadImage("assets/images/saturn.png");
alien.img = loadImage("assets/images/alien.png");
moon.img = loadImage("assets/images/moon.png");

}

function setup() {
    createCanvas(500, 500);
    imageMode(CENTER);
}


function draw() {

    image(bgGif, 250, 250, width, height);
    image(sun, 250, 250, 200, 200);

    for (let i = 0; i < planets.length; i++){
        if (planets[i].dragging){
            image(planets[i].img, mouseX, mouseY, planets[i].width, planets[i].height);
        }
        else{
            image(planets[i].img, planets[i].x, planets[i].y, planets[i].width, planets[i].height);
        }
    }

}

function mousePressed(){

    for (let i = 0; i < planets.length; i++){
      if (mouseX < planets[i].x + planets[i].width/2 && mouseX > planets[i].x - planets[i].width/2 && mouseY > planets[i].y - planets[i].height/2 && mouseY < planets[i].y + planets[i].height/2){
        planets[i].dragging = true;
        }  
    }
    

}

function mouseReleased(){
    
    for (let i = 0; i < planets.length; i++){
        planets[i].dragging = false;
    }

}