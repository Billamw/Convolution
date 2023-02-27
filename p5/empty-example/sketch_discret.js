let xMin = -13;
let xMax = 13;
let yMin = -7;
let yMax = 13;

// let signal1 = [.3,.6,.7,.8,.9];
// let signal2 = [.9,.8,.7,.8];

let signal1 = [1,1.2,1.4,1.6,1,.5];
let signal2 = [1,1.2,1.4,1.6];

let t0 = 0;
let t02 = 0-signal2.length/2;


function setup() {
  createCanvas(600, 600);

  slidert0 = createSlider(xMin+1, xMax-signal1.length, -(signal1.length + signal2.length/2 + 1), 1);
  slidert0.style('width', '300px')

  stroke(0);
  noFill();
 
}

function draw() {
  background(255);
  
  t0 = slidert0.value();
  drawxt(signal1, t0);
  drawht(signal2, t02);
  drawDiscretConvolution(signal1, signal2, t02);

}

function drawxt(signal, t) {
  let y, x1;
  for (let x = 0; x < signal.length; x++) {
    if(signal[x] == 0) {
      continue;
    }
    x1 = map(x+t, xMin, xMax, 0, width);
    y = map(signal[x], yMin, yMax, height, 0)
    strokeWeight(5);
    point(x1,y);
    strokeWeight(2);
    line(x1, map(0, yMin, yMax, height, 0), x1, y);
  }
}
function drawht(signal, t) {
    let y, tmp;
    for (let x = 0; x < signal.length; x++) {
      if(signal[signal.length-1-x] == 0) {
        continue;
      }
      tmp = map(x+t, xMin, xMax, 0, width);
      y = map(signal[signal.length-1-x], yMin, yMax, height, 0)
      strokeWeight(5);
      point(tmp,y);
      strokeWeight(2);
      line(tmp, map(0, yMin, yMax, height, 0), tmp, y);
    }
}

function drawDiscretConvolution(signal1, signal2, t)  {
  stroke('red');
  drawxt(discreteConvolution(signal1, signal2), t)
  stroke('black')
}

function discreteConvolution(x, h, t) {
  const N = x.length;
  const M = h.length;
  const y = new Array(N + M - 1).fill(0);

  for (let n = - (1 + t02 + t0); n < N + M - 1; n++) {
    for (let k = 0; k < N; k++) {
      if (n - k < 0 || n - k >= M) continue;
      y[y.length-1-n] += x[k] * h[n - k];
    }
  }


  // for (let k = 0; k < N; k++) {
  //   if (t - k < 0 || t - k >= M) continue;
  //   y[t] += x[k] * h[t - k];
  // }

  return y;
}




