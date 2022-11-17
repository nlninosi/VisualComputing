let colorShader;

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
    //background(0);
    shader(colorShader);
    // https://p5js.org/reference/#/p5/shader

}

let v = 'rgba(255,165,71,0.65)'
let v2 = 'rgba(238,130,238,0.65)'

function draw() {
    //shader(colorShader);
    //rect(0,0,50, 50);
    background(0);
    colorShader.setUniform('uMaterial1', '(255,165,71,0.75)');
    colorShader.setUniform('uMaterial2', '(238,130,238,0.75)');
    // the fill command is used to define the colors
    //(to be interpolated) in a per-vertex basis
    beginShape();
    fill(255,165,71);
    vertex(-180, -180);
    vertex(-30, -180);
    vertex(-30, -30);
    vertex(-180, -30);
    endShape(CLOSE);
    /*beginShape();
    fill(238,130,238);
    vertex(0, -180);
    vertex(150, -180);
    vertex(150, -30);
    vertex(0, -30);
    endShape(CLOSE);
    beginShape();
    fill("white")
    //shader(colorShader);
    vertex(-80, 0);
    vertex(70, 0);
    vertex(70, 150);
    vertex(-80, 150);
    endShape(CLOSE);*/
}

// vertices are given directly in clip-space,
// i.e., both x and y vertex coordinates ∈ [-1..1]
function keyPressed() {
  if (key == 'c') {
    // https://p5js.org/reference/#/p5.Shader/setUniform
    colorShader.setUniform();
  }
}