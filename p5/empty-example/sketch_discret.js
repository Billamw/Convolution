let xMin = -4;
let xMax = 4;
let yMin = -3;
let yMax = 5;

let t0 = 0;
let t02 = 0;

let signal1 = [1,1,1,1];
let signal2 = [1,1,1,1];

function setup() {
  createCanvas(600, 600);

  slidert0 = createSlider(xMin, xMax, -2, 1);
  slidert0.style('width', '300px')

  stroke(0);
  noFill();
}

function draw() {
  background(255);
  
  t0 = slidert0.value();

}
function drawSignal(signal) {
    let x,y;
    for (let value in signal) {
        
        y = map(map(value, yMin, yMax, height, 0))

    }
}




