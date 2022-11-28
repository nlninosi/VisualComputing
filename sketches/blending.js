/*let colorShader;
let colorPicker;
let colorPicker2;

function preload() {
    // The vertex shader defines how vertices are projected onto clip space.
    // Most of the times a projection and modelview matrix are needed for it:
    // https://visualcomputing.github.io/docs/shaders/programming_paradigm/
    // Here, however, we are going to:
    // 1. Define the triangle vertices directly in clip space, thus bypassing
    // both of these matrices (matrices: Tree.NONE). The p5 mandelbrot vertex
    // shader does just the same: https://p5js.org/reference/#/p5/loadShader
    // 2. Interpolate vertex color data (varyings: Tree.color4). Note that
    // color data is defined in a per vertex basis with the p5 fill command.
    // Have a look at the generated vertex shader in the console!
    // readShader: https://github.com/VisualComputing/p5.treegl#handling
    colorShader = readShader('/showcase/sketches/shaders/color.frag',
                            { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
    // shaders require WEBGL mode to work
    createCanvas(380, 380, WEBGL);
    colorPicker = createColorPicker('#ed225d');
    colorPicker2 = createColorPicker('#1AAf18');
    colorPicker.position(0, 0);
    colorPicker2.position(150, 0);
    //shader(colorShader);
    // https://p5js.org/reference/#/p5/shader

}

function draw() {
    background(0);
    beginShape();
    vertex(-50, -50);
    vertex(50, -50);
    vertex(50, 50);
    vertex(-50, 50);
    endShape();
    // the fill command is used to define the colors
    //(to be interpolated) in a per-vertex basis
}

// vertices are given directly in clip-space,
// i.e., both x and y vertex coordinates ∈ [-1..1]
function keyPressed() {
  if (key == 'c') {
    // https://p5js.org/reference/#/p5.Shader/setUniform
    colorShader.setUniform('uMaterial1', colorPicker.color().levels);
    colorShader.setUniform('uMaterial2', colorPicker2.color().levels);
  }
}*/
let colorShader;
let vector;
let vector2;

function preload() {
  // The vertex shader defines how vertices are projected onto clip space.
  // Most of the times a projection and modelview matrix are needed for it:
  // https://visualcomputing.github.io/docs/shaders/programming_paradigm/
  // Here, however, we are going to:
  // 1. Define the triangle vertices directly in clip space, thus bypassing
  // both of these matrices (matrices: Tree.NONE). The p5 mandelbrot vertex
  // shader does just the same: https://p5js.org/reference/#/p5/loadShader
  // 2. Interpolate vertex color data (varyings: Tree.color4). Note that
  // color data is defined in a per vertex basis with the p5 fill command.
  // Have a look at the generated vertex shader in the console!
  // readShader: https://github.com/VisualComputing/p5.treegl#handling
  colorShader = readShader('/showcase/sketches/shaders/blending1.frag',
                          { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(300, 300, WEBGL);
  colorPicker = createColorPicker('#ed225d');
  colorPicker2 = createColorPicker('#1AAf18');
  colorPicker.position(0, 0);
  colorPicker2.position(150, 0);
  // https://p5js.org/reference/#/p5/shader
  //shader(colorShader);
}

function draw() {
  background(0);
  // the fill command is used to define the colors
  // (to be interpolated) in a per-vertex basis
  beginShape();
  fill("white");
  vertex(-0.5, 0.5);
  vertex(0, 0.5);
  vertex(0, -0.5);
  vertex(-0.5, -0.5);
  endShape();
  shader(colorShader);
  beginShape();
  vertex(0, 0.5);
  vertex(0.5, 0.5);
  vertex(0.5, -0.5);
  vertex(0, -0.5);
  endShape();
  //console.log(colorPicker.color().levels[3])
  let c1 = normalizar(colorPicker.color().levels,1);
  let c2 = normalizar(colorPicker2.color().levels,1);
  //console.log(c1);
  colorShader.setUniform('uMaterial1', c1);
  colorShader.setUniform('uMaterial2', c2);
}

function keyPressed() {
  if (key == 'c') {
    //normalizar(colorPicker.color().levels,1)
    let c1 = normalizar(colorPicker.color().levels,1);
    let c2 = normalizar(colorPicker2.color().levels,1);
    c1[3] = slider.value(); 
    c2[3] = slider.value(); 
    console.log(c1);
    colorShader.setUniform('uMaterial1', c1);
    colorShader.setUniform('uMaterial2', c2);
  }
}

function normalizar(arr, max) {
  // find the max value
  var m = 0;
  for(var x=0; x<arr.length; x++) {
    m = Math.max(m, arr[x]);
  }
  // find the ratio
  var r = max / m;
  // normalize the array
  for(var x=0; x<arr.length; x++) arr[x] = arr[x] * r;
  return arr;
}