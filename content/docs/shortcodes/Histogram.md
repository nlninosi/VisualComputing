<!-- # Convolution

## Definition of convolution

## Implementation of convolution
Dado un archivo de imagen, se le debe realizar un enmascaramiento visual, que resulte en la aplicación de un efecto mediante el uso de máscaras de convolución.

## Sustento teórico

## Procesamiento de imágenes
Debemos empezar definiendo una imagen digital como una función bidimensional donde se tiene un número finito de elementos llamados píxeles, cada uno de ellos teniendo una localización y valor definidos.

Con esto en mente podemos definir el procesamiento de imágenes como el reconocimiento de imágenes 2D, 3D y secuencias de imágenes, análisis, manipulación, transmisión y otras áreas relacionadas, todas ellas haciendo uso de un algoritmo preestablecido. Dentro de las áreas que abarca esta área nos interesa la del procesamiento del color.

Fuente: [Procesamiento de imágenes digitales](http://alojamientos.us.es/gtocoma/pid/introduccion.html)

### ¿Qué es una máscara de convolución?

Con el fin de realizar un procesamiento del color que poseen las imágenes digitales, se hace uso de la convolución. Esta se define como el proceso de añadir cada elemento de la imagen a sus vecinos locales, luego de ser operados por un kernel. Esta operación no es una operación corriente de multiplicación de matrices, sino que se define de la siguiente manera:

{{< katex display >}}
(\begin{bmatrix}
a & b & c\\
d & e & f\\
g & h & i\\
\end{bmatrix}
*
\begin{bmatrix}
1 & 2 & 3\\
4 & 5 & 6\\
7 & 8 & 9\\
\end{bmatrix})
[2, 2] = 
(i \cdot 1) +
(h \cdot 2) +
(g \cdot 3) +
(f \cdot 4) +
(e \cdot 5) +
(d \cdot 6) +
(c \cdot 7) +
(b \cdot 8) + 
(a \cdot 9)
{{< /katex >}}

Tenemos que la matriz de la derecha es nuestro kernel, la de la izquierda es una porción de la imagen, la operación seria invertir alguna de las dos matrices (normalmente suele ser el kernel). Arriba se hace un ejemplo rápido para las coordenadas {{< katex >}}[2, 2]{{< /katex >}}

Generalmente podríamos hablar que en términos de sumatorias, la convolución se describe como:

{{< katex display >}}
\begin{bmatrix}
x_{11} & x_{12} & \cdots & x_{1n}\\
x_{21} & x_{22} & \cdots & x_{21}\\
\vdots & \vdots & \ddots & \vdots\\
x_{n1} & x_{n3} & \cdots & x_{mn}\\
\end{bmatrix}
*
\begin{bmatrix}
y_{11} & y_{12} & \cdots & y_{1n}\\
y_{21} & y_{22} & \cdots & y_{21}\\
\vdots & \vdots & \ddots & \vdots\\
y_{n1} & y_{n3} & \cdots & y_{mn}\\
\end{bmatrix}
=
\sum_{i=0}^{m-1}\sum_{i=0}^{n-1}x_{(m-i)(n-j)} \cdot y_{(1-i)(1-j)}
{{< /katex >}}

### Difuminado gaussiano

Mediante la implementación de la convolución podemos aplicar efectos a la imagen digital objetivo, en esta ocasión hemos decidido aplicar el difuminado gaussiano. En esta caso, como manejamos dos dimensiones en las operaciones, la formula se describe de la siguiente forma:

{{< katex display >}}
G(x, y) = \dfrac{1}{\sqrt{2 \pi \sigma}}\exp(-\dfrac{x^2 + y^2}{2 \sigma^2})
{{< /katex >}}

Esto nos permite generar un kernel que aplica de forma más eficiente el efecto a causa de los valores más exactos. Por ejemplo:

{{< katex display >}}
\begin{bmatrix}
0.00296902 & 0.0133062 & 0.0219382 & 0.0133062 & 0.00296902 \\
0.0133062 & 0.0596343 & 0.0983203  & 0.0596343 & 0.0133062 \\        
0.0219382 & 0.0983203  & 0.162103  & 0.0983203 & 0.0219382 \\ 
0.0133062 & 0.0596343  & 0.0983203 & 0.0596343 & 0.0133062 \\   
0.00296902 & 0.0133062 & 0.0219382 & 0.0133062 & 0.00296902 \\
\end{bmatrix}
{{< /katex >}}

Fuente: [Gaussian blur](https://en.wikipedia.org/wiki/Gaussian_blur)

## Implementación de la convolución

Empezamos por revisar la función que genera el kernel gaussiano, la cual recibe un tamaño del kernel, un sigma y una constante multiplicativa {{< katex >}}k{{< /katex >}}. En esta ocasión los valores serán de 11, 11 y 1 respectivamente. La función se basa en esta [implementación](https://www.geeksforgeeks.org/gaussian-filter-generation-c/).

{{< expand >}}
```js
function gaussKernel(size, sigma, k) {
    let value = 0.0;   
    let kernel = [...Array(size)].map(e => Array(size).fill(value));
    let sum = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let x = i - (size - 1) / 2.0;
            let y = j - (size - 1) / 2.0;
            kernel[i][j] = k * Math.exp(((Math.pow(x, 2) + Math.pow(y, 2)) / ((2 * Math.pow(sigma, 2)))) * (-1));
            sum += kernel[i][j];
        }
    }
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            kernel[i][j] /= sum;
        }
    }
    return kernel;
}
```
{{< /expand >}}

Ahora procedemos a cargar la imagen y preparar la para aplicarle el efecto.

{{< expand >}}
```js
let img;
p.preload = function () {
    img = p.loadImage('/showcase/assets/1.jpg');
}
p.setup = function () {
    p.createCanvas(700, 500);
    p.image(img, 0, 0);   
    gaussFilter();
}
p.draw = function () {
    p.image(img, 0, 0);
    img.resize(700, 500);
}
```
{{< /expand >}}

Ahora si, la implementación de la convolución plantea que se deban recorrer cada uno de los píxeles de los canales presentes en la imagen (en este caso, son cuatro: Red, Green, Blue, Alpha) y estos multiplicarlos con los valores que se encuentran en el kernel gaussiano que tengamos creado, para luego de haber hecho esto, se actualicen los valores de la imagen.

Para esto implementamos una función gaussFilter() que cargue el arreglo de pixeles y los envíe a la función convolution(), para luego poder modificar los valores en la imagen.

{{< expand >}}
```js
function gaussFilter() {
    img.loadPixels();
    let sigma = 11;
    let matrix = gaussKernel(11, sigma, 1);
    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
            let c = convolution(x, y, matrix, img);
            let loc = (y * img.width + x) * 4;
            img.pixels[loc] = p.red(c);
            img.pixels[loc + 1] = p.green(c);
            img.pixels[loc + 2] = p.blue(c);
            img.pixels[loc + 3] = 255; 
        }
    }
    img.updatePixels();
}
```
{{< /expand >}}

Ahora en la función convolution(), la cual recibe las posiciones de los arreglos de los pixeles a modificar, el kernel como una matriz y la imagen para poder obtener los valores a retornar de los pixeles ya con el efecto aplicado.

{{< expand >}}
```js
function convolution(x, y, matrix, img) {
    let rTotal = 0.0;
    let gTotal = 0.0;
    let bTotal = 0.0;
    let h = Math.floor(matrix.length / 2);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            let xloc = (x + i - h);
            let yloc = (y + j - h);
            let loc = (img.width * yloc + xloc) * 4;
            if (xloc > 0 && xloc < img.width && yloc > 0 && yloc < img.height) {
                rTotal += (img.pixels[loc]) * matrix[i][j];
                gTotal += (img.pixels[loc + 1]) * matrix[i][j];
                bTotal += (img.pixels[loc + 2]) * matrix[i][j];
            }
        }
    }
    return p.color(rTotal, gTotal, bTotal);
}
```
{{< /expand >}}

### Conclusiones y trabajo futuro

Podemos concluir que la aplicación de una máscara a través de la implementación de una convolución sobre una imagen digital es realizable, fácil de comprender matemáticamente, pero que es posible que requiera de una implementación paralela para poder obtener valores de forma más rápida. También es importante recalcar que si la imagen posee una alta calidad, el efecto del difuminado no se aplica del todo bien, lo que nos deja con ventaja en la implementación manual de la convolución al poder graduar por medio de los valores del efecto

En futuros trabajos se puede indagar que tan factible es una implementación paralela de esta función mediante p5.js, sin necesidad de entrar directamente a codificar a bajo nivel con lenguajes como c++ y haciendo uso de CUDA.
<!-- 
{{< p5-div sketch="../../../sketches/scintillating.js" >}} 

Texto previo descriptivo muy tramador de convolución.

{{< tabs "convolution" >}}

{{< tab "Imagen base" >}} 

# Imagen sin aplicar efecto
Esta es la imagen sin aplicar ningún efecto, tan solo se redimensionó para efectos de visualización.

![IMAGEN](/showcase/assets/1.jpg)
{{< /tab >}}

{{< tab "Implementación de filtro blur" >}} 
# Uso de función creada por el estudiante
Esta implementación de convolución la realizamos de forma secuencial, acá podemos apreciar que con los valores ingresados, el efecto es mucho más notorio, y por lo tanto, es más versátil para permitir graduar acorde el contexto que tan intenso es el efecto.

{{< p5-div sketch="/showcase/sketches/softwareConvolution.js" >}}
{{< /tab >}}

{{< tab "Histograma" >}} 
# Uso de función creada por el estudiante
Esta implementación de convolución la realizamos de forma secuencial, acá podemos apreciar que con los valores ingresados, el efecto es mucho más notorio, y por lo tanto, es más versátil para permitir graduar acorde el contexto que tan intenso es el efecto. xxx



{{< /tab >}}
{{< /tabs >}} -->
# Histograma

Un histograma de imagen es un tipo de histograma que actúa como una representación gráfica de la distribución tonal en una imagen digital. Representa el número de píxeles de cada valor tonal. Al observar el histograma de una imagen concreta, el espectador podrá juzgar toda la distribución tonal de un vistazo.

Nuestra implementacion del histograma se hizo de la manera siguiente:

{{< expand >}}
```js
var stateR;
var stateG;
var stateB;
var red_arr = new Array(256);
var green_arr = new Array(256);
var blue_arr = new Array(256);
var showFilter = false;
const filter = [
  [-2, -1, 0],
  [-1, 1, 1],
  [0, 1, 2],
];
const filter2 = [
  [-1, 0, 1],
  [-1, 0, 1],
  [-1, 0, 1],
];
var colors = new Array(3);

var leftM = 30;
var upM = 15;


function preload() {
  img = loadImage("/showcase/assets/1.jpg");
}

function getIndex(x, y) {
  return (x + y * img.width) * 4;
}
function setup() {
  createCanvas(img.width + 2 * leftM, img.height * 2 + 2 * upM);
  stateR = color('rgba(255,0,0,0.1)')
  stateG = color('rgba(0,255,0,0.1)')
  stateB = color('rgba(0,0,255,0.1)')

  for (let i = 0; i < 256; i++) {
    red_arr[i] = green_arr[i] = blue_arr[i] = 0;
  }

  // img.filter(GRAY);
  loadPixels();
  img.loadPixels();
  filtered = createImage(img.width, img.height);
  filtered.loadPixels();


  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let idx = getIndex(i, j);
      let r = img.pixels[idx + 0];
      let g = img.pixels[idx + 1];
      let b = img.pixels[idx + 2];
      let a = img.pixels[idx + 3];
      red_arr[r]++;
      green_arr[g]++;
      blue_arr[b]++;
      //kernel
      let filteredPixel = convolute(i, j);
      filtered.pixels[idx + 0] = red(filteredPixel);
      filtered.pixels[idx + 1] = green(filteredPixel);
      filtered.pixels[idx + 2] = blue(filteredPixel);
      filtered.pixels[idx + 3] = alpha(filteredPixel);
    }
  }

  colors[0] = red_arr;
  colors[1] = green_arr;
  colors[2] = blue_arr;

  img.updatePixels();
  filtered.updatePixels();
  updatePixels();
  strokeWeight(4);

}
function calculateHistogram(imagen) {
  stateR = color('rgba(255,0,0,0.1)')
  stateG = color('rgba(0,255,0,0.1)')
  stateB = color('rgba(0,0,255,0.1)')

  for (let i = 0; i < 256; i++) {
    red_arr[i] = green_arr[i] = blue_arr[i] = 0;
  }

  // img.filter(GRAY);
  loadPixels();
  imagen.loadPixels();
  filtered.loadPixels();


  for (let i = 0; i < imagen.width; i++) {
    for (let j = 0; j < imagen.height; j++) {
      let idx = getIndex(i, j);
      let r = imagen.pixels[idx + 0];
      let g = imagen.pixels[idx + 1];
      let b = imagen.pixels[idx + 2];
      let a = imagen.pixels[idx + 3];
      red_arr[r]++;
      green_arr[g]++;
      blue_arr[b]++;
    }
  }

  colors[0] = red_arr;
  colors[1] = green_arr;
  colors[2] = blue_arr;

  imagen.updatePixels();
  updatePixels();
  strokeWeight(4);
}
function mousePressed() {
  if (mouseX < leftM || mouseX > leftM + 70) return
  stateR = color('rgba(255,0,0,0.1)')
  stateG = color('rgba(0,255,0,0.1)')
  stateB = color('rgba(0,0,255,0.1)')
  if (mouseY >= 2 * upM + img.height && mouseY <= 2 * upM + img.height + 40) {
    stateR = color('rgba(255,0,0,1)')
  } else if (mouseY >= 2 * upM + img.height + 50 && mouseY <= 2 * upM + img.height + 40 + 50) {
    stateG = color('rgba(0,255,0,1)')
  } else if (mouseY >= 2 * upM + img.height + 100 && mouseY <= 2 * upM + img.height + 40 + 100) {
    stateB = color('rgba(0,0,255,1)')
  }
}


function draw() {
  background(255);
  //image(img, leftM, upM);
  if (showFilter)
    image(filtered, 0, 0);
  else
    image(img, 0, 0);
  stroke(0);
  push();
  fill(255, 0, 0);
  rect(leftM + 10, 2 * upM + img.height, 70, 40);
  fill(0, 255, 0);
  rect(leftM + 10, 2 * upM + img.height + 50, 70, 40);
  fill(0, 0, 255);
  rect(leftM + 10, 2 * upM + img.height + 100, 70, 40);
  pop();

  push();

  if (stateR.toString() == color('rgba(255,0,0,1)').toString()) {
    paint(stateG, colors[1]);
    paint(stateB, colors[2]);
    paint(stateR, colors[0]);
  } else if (stateG.toString() == color('rgba(0,255,0,1)').toString()) {
    paint(stateR, colors[0]);
    paint(stateB, colors[2]);
    paint(stateG, colors[1]);
  } else {
    paint(stateR, colors[0]);
    paint(stateG, colors[1]);
    paint(stateB, colors[2]);
  }
  pop();
  graph();
}

function graph() {
  push();
  stroke(0);
  strokeWeight(1);
  fill(0);
  drawArrow(createVector(leftM, 2 * img.height), createVector(leftM + img.width, 2 * img.height), 'x');
  drawArrow(createVector(leftM, 2 * img.height), createVector(leftM, img.height + upM), 'y');
  textAlign(CENTER);
  textSize(20);

  text('Valores del color (0 - 255) ', leftM + img.width / 2, 2 * img.height + 2 * upM);
  let angle2 = radians(270);
  translate(leftM / 2, (3 / 2) * img.height);
  rotate(angle2);
  // Draw the letter to the screen
  text("Frecuencias", 0, 0);
  pop();
}

function paint(state, array) {
  push();
  stroke(state);
  for (let i = 1; i < 256; i++) {
    xPos = map(i, 0, 256, leftM, leftM + img.width)
    xPrev = map(i - 1, 0, 256, leftM, leftM + img.width)
    yPos = map(array[i], 0, max(array), 2 * img.height, img.height + 25)
    yPrev = map(array[i - 1], 0, max(array), 2 * img.height, img.height + 25)
    line(xPrev, yPrev, xPos, yPos)
    line(xPos, 2 * img.height, xPos, yPos)
  }
  pop();
}

function drawArrow(base, vec, axis) {
  push();
  stroke(0);
  strokeWeight(3);
  fill(0);

  line(base.x, base.y, vec.x, vec.y);

  let arrowSize = 7;
  if (axis == 'x') {
    vec.x -= 7;
    triangle(vec.x, vec.y + arrowSize / 2, vec.x, vec.y - arrowSize / 2, vec.x + arrowSize, vec.y);
  } else {
    vec.y += 7;
    triangle(vec.x + arrowSize / 2, vec.y, vec.x - arrowSize / 2, vec.y, vec.x, vec.y - arrowSize);
  }

  pop();
}
function convolute(x, y) {
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let pix = getIndex(x + i, y + j);
      let factor = filter[j + 1][i + 1];

      sumR += img.pixels[pix + 0] * factor;
      sumG += img.pixels[pix + 1] * factor;
      sumB += img.pixels[pix + 2] * factor;
    }
  }
  return color(
    sumR, sumG, sumB
  );
}


function keyPressed() {
  if (keyCode === 84) {
    showFilter = !showFilter
    if (showFilter)
      calculateHistogram(filtered);
    else
      calculateHistogram(img);
  }

}
```
{{< /expand >}}

{{< p5-iframe sketch="/showcase/sketches/histograma.js" width="1000" height="1300" >}}