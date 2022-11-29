let paintings;

function preload() {
  /*
  paintings = [];
  for (let i = 1; i <= 5; i++) {
    paintings.push(loadImage(`/showcase/assets/Photomosaic/${i}.png`));
  }
  */
  image_1 = loadImage(`/showcase/assets/Photomosaic/3.png`);
  image_src = loadImage(`/showcase/assets/3.jpg`);
  mosaic = readShader('/showcase/sketches/shaders/Photomosaic.frag',
           { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(700, 700, WEBGL);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  resolution = createSlider(1, 100, 30, 1);
  resolution.position(10, 35);
  resolution.style('width', '80px');
  resolution.input(() => mosaic.setUniform('resolution', resolution.value()));
  mosaic.setUniform('resolution', resolution.value());
  mosaic.setUniform('source', image_src);
  mosaic.setUniform('tile', image_1);
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