let xMin = -5;
let xMax = 5;
let yMin = -4;
let yMax = 6;

let t0 = 0;
let t02 = 0;
let T = 1;
let T2 = 1;

let a1 = t02 - T2/2;
let b1 = t0 + T/2;
let a2 = t0 - T/2;
let b2 = t02 + T2/2; 

let impuls1 = rectImpuls;
let impuls2 = rectImpuls;

function setup() {
  createCanvas(600, 600);

  slidert0 = createSlider(xMin, xMax, 0, 0.1);
  slidert0.style('width', '300px')
  sliderT = createSlider(0.1, 4, 1, 0.1);
  stroke(0);
  noFill();

}

function draw() {
  background(255);
  t0 = slidert0.value();
  b1 = t0 + T/2;
  a2 = t0 - T/2;
  T = sliderT.value();

  text(integral(impuls2, a1, b1), 10, 10);

  drawImpuls(impuls1, t0, T);

  drawImpuls(impuls2, t02, T2);

 //Test
  beginShape();
  for (let x = xMin; x <= xMax; x += 0.01) {
    let y = 0;
    //y = borders();
    y = convolution(impuls1, impuls2, x);
    //point(t0, y);

    vertex(map(x, xMin, xMax, 0, width), map(y, yMin, yMax, height, 0));
  }
  endShape();
  
}


function rectImpuls(t) {
  if(abs(t)<=0.5){
    return 1;
  }
  return 0;
}

function triangularImpuls(t) {
  if(abs(t) <= 1) {
    return (1-abs(t));
  }
  else {
    return 0;
  }
}

function drawImpuls(impuls, t0, T) {
  beginShape();
  for (let x = xMin; x <= xMax; x += 0.01) {
    let y = impuls((x-t0)/T);
    vertex(map(x, xMin, xMax, 0, width), map(y, yMin, yMax, height, 0));
  }
  endShape();
}

function convolution(signal1, signal2, time) {
  let result = 0;
  for (let tau = -time; tau <= time; tau += 0.01) {
    result += signal1(tau) * signal2(time - tau);
  }
  return result;
}

function borders() {
  let y = 0;
  if(a1 > b1) {
   y = 0 
  } else if(a1 > b2) {
    y = integral(impuls1, a1, b1) * integral(impuls2, a1, b1);
  } else if(b2 > b1) {
    y = integral(impuls1, a2, b1) * integral(impuls2, a2, b1);
  } else if(b2 > a2) {
    y = integral(impuls1, a2, b2) * integral(impuls2, a2, b2);
  }  else if(a2 > b2) {
    y = 0;
  }
  return y;
}



// calculating the integral of a function f in range of [a; b]
function integral(f, a, b) {
  
  let x1, x2, y1, y2;
  let dx = 0.001;
  let sum = 0;

  x1 = a;
  x2 = a + dx;

  for (let i = a; i < b; i+= dx) {
    y1 = f(x1);
    y2 = f(x2);
    sum += (x2 - x1) * (y1 + y2) / 2;
    x1 = x2;
    x2 = x1 + dx;
  }

  return sum;
}