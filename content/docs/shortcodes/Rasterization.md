# z-depth
## Definición del problema
## Sustento teórico
## Implementación
{{< expand >}}
```js
let img, 
    colorFG = '#111111',
    colorBG = '#f1f1f1';
let pos = 25;
function preload(){
	img = loadImage('https://images.unsplash.com/photo-1620122303020-87ec826cf70d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'); 			  			//add an image
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
```
{{< /expand >}}

{{< tabs "Rasterisation" >}}

{{< tab "Primera Imagen base" >}} 

# Imagen sin aplicar efecto
Esta es la primera imagen sin aplicar ningún efecto, tan solo se redimensionó para efectos de visualización. 

![IMAGEN](/showcase/assets/2.jpg)

{{< /tab >}}

{{< tab "Implementación de la rasterizacion" >}} 

{{< p5-div sketch="/showcase/sketches/raster1.js" >}}

{{< /tab >}}

{{< tab "Segunda imagen base" >}} 

# Imagen sin aplicar efecto
Esta es la segunda imagen imagen sin aplicar ningún efecto, tan solo se redimensionó para efectos de visualización.

![IMAGEN](/showcase/assets/4.jpg)

{{< /tab >}}

{{< tab "Implementación de la rasterizacion" >}} 

{{< p5-div sketch="/showcase/sketches/raster2.js" >}}

{{< /tab >}}

{{< /tabs >}}


## Conclusiones y trabajo futuro