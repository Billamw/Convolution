let xMin = -10;
let xMax = 10;
let yMin = -10;
let yMax = 10;

let t0 = 0;
let t02 = 0;

let signal1 = [1,1,1,1];
let signal2 = [1,1,1,1];

function setup() {
  createCanvas(600, 600);

  slidert0 = createSlider(xMin+1, xMax-4, 0, 1);
  slidert0.style('width', '300px')

  stroke(0);
  noFill();
 
}

function draw() {
  background(255);
  
  t0 = slidert0.value();
  drawSignal(signal1, t0);
  drawDiscretConvolution(signal1, signal2, t0);
  text(t0, 100, 100);


}
function drawSignal(signal, t) {
    let y, tmp;
    for (let x = 0; x < signal.length; x++) {
      tmp = map(x+t, xMin, xMax, 0, width);
      y = map(signal[x], yMin, yMax, height, 0)
      // tmp = x * 100;
      //y = signal[x] * 50;
      strokeWeight(5);
      point(tmp,y);
      strokeWeight(2);
      line(tmp, map(0, yMin, yMax, height, 0), tmp, y);
    }
}

function drawDiscretConvolution(signal1, signal2, t)  {
  drawSignal(discreteConvolution(signal1, signal2), t)
}

function discreteConvolution(x, h, t) {
  const N = x.length;
  const M = h.length;
  const y = new Array(N + M - 1).fill(0);

  // for (let n = 0; n < N + M - 1; n++) {
  //   for (let k = 0; k < N; k++) {
  //     if (n - k < 0 || n - k >= M) continue;
  //     y[n] += x[k] * h[n - k];
  //   }
  // }


  for (let k = 0; k < N; k++) {
    if (t - k < 0 || t - k >= M) continue;
    y[t] += x[k] * h[t - k];
  }

  return y;
}




