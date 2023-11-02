function setup() {
    createCanvas(500,500);

    let hotCelsius = toCelsius(100);
    console.log(`100 degrees Fahrenheit is ${hotCelsius} degrees Celsius.`);

    let coldCelsius = toCelsius(10);
    console.log(`10 degrees Fahrenheit is ${coldCelsius} degrees Celsius.`);
}

function draw() {
    background(0);

}

function toCelsius(fahrenheit){
    let celsius = (fahrenheit -32) * 5/9;
    return celsius;
}