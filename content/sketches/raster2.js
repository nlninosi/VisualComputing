let img, 
    colorFG = '#111111',
    colorBG = '#f1f1f1';
let pos = 25;
function preload(){
	img = loadImage('/showcase/assets/3.jpg'); 			  			//add an image
}

function setup() {
	createCanvas(600, 600);
	background(colorBG);
  img.resize(600, 600);
}

function draw() {
 background(colorBG);
 fill(colorFG);
 noStroke();
  const ratio = 600/600;
  let coefZ = (pos/width)*200;
  const tilesX = map(coefZ, 0, 600, 10, 100);
  const tilesY = ratio * tilesX;
  const tileSize = width / tilesX;
  for (let y = 0; y < img.height; y += tileSize) {
    for (let x = 0; x < img.width; x += tileSize) {
      let c = img.get(x, y);
      let b = map(brightness(c), 0, 255, 1, 0);
      push();
      translate(x, y);
      rect(0, 0, b * tileSize, b * tileSize);
      pop();
    }
  }
}
function mouseWheel(event) {
  print(event.delta);
  //move the square according to the vertical scroll amount
  pos += event.delta;
  //uncomment to block page scrolling
  //return false;
}