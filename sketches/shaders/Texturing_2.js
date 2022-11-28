let easycam;
let uvShader;

function preload() {
  // Define geometry in world space (i.e., matrices: Tree.pmvMatrix).
  // The projection and modelview matrices may be emitted separately
  // (i.e., matrices: Tree.pMatrix | Tree.mvMatrix), which actually
  // leads to the same gl_Position result.
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/showcase/sketches/shaders/Texturing_2.frag',
                  { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(300, 300, WEBGL);
  textureMode(NORMAL);
  // use custom shader
  shader(uvShader);
}

function draw() {
  background(200);
  orbitControl();
  push();
  noStroke();
  // world-space quad
  // (i.e., p5 world space definition: https://t.ly/GeYP)
  quad(-width / 2, -height / 2, width / 2, -height / 2,
        width / 2, height / 2, -width / 2, height / 2);
  pop();
}

function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}