'use strict';

let image_src;
let video_src;
let mosaic;
// ui
let images_src;
let currentimage;

let resolution;
let video_on;
let mode;

function preload() {
  // paintings are stored locally in the /sketches/shaders/paintings dir
  // and named sequentially as: p1.jpg, p2.jpg, ... p30.jpg
  // so we pick up one randomly just for fun:
  images_src = [];
  for (let i = 1; i <= 5; i++) {
    images_src.push(loadImage(`/showcase/assets/Photomosaic/${i}.png`));
  }
  image_src = loadImage(`/showcase/assets/3.jpg`);
  mosaic = readShader('/showcase/sketches/shaders/SpatialCoherence1.frag',
           { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(700, 700, WEBGL);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  currentimage = 1;
  resolution = createSlider(1, 100, 30, 1);
  resolution.position(10, 35);
  resolution.style('width', '80px');
  resolution.input(() => mosaic.setUniform('resolution', resolution.value()));
  mosaic.setUniform('resolution', resolution.value());
  mosaic.setUniform('source', images_src[currentimage]);

  mode = createSelect();
  mode.position(10, 75);
  mode.option('original');
  mode.option('pixelator');
  mode.selected('pixelator');
  mode.changed(() => {
    mosaic.setUniform('original', mode.value() === 'original');
  });
}

function draw() {
  
  beginShape();
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}

function keyPressed () {
  if(keyCode === RIGHT_ARROW && currentimage<=10){
    currentimage = currentimage+1;
    mosaic.setUniform('source', images_src[currentimage]);  
  }
  if(keyCode === LEFT_ARROW && currentimage>=1){
    currentimage = currentimage-1;
    mosaic.setUniform('source', images_src[currentimage]);
  }
}