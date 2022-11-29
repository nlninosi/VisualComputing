## Que es el Masking?

Uno de los procedimientos experimentales más destacados para manipular la conciencia es el enmascaramiento visual, en el que se disminuye la visibilidad de un estímulo objetivo presentándolo en estrecha proximidad espacial y temporal con una denominada "máscara". Por ejemplo, si se presenta una imagen objetivo solamente durante períodos breves, normalmente se puede percibir sin esfuerzo. Sin embargo, si la imagen objetivo breve es seguida inmediatamente por una segunda imagen consistente en una disposición de líneas y patrones aleatorios, su visibilidad se reduce considerablemente. Este fenómeno se conoce como enmascaramiento hacia atrás y la imagen de la máscara se conoce como máscara de patrón. El enmascaramiento visual se ha utilizado con frecuencia para estudiar los correlatos neurales de la conciencia. El enmascaramiento visual que implica tanto factores espaciales (patrones o formas) como temporales (duraciones de los patrones e intervalos entre estímulos) suele dividirse en dos tipos, en función de las relaciones espaciales que existen entre los contornos de los patrones objetivo y los de la máscara. El enmascaramiento que implica la superposición espacial de contornos (aunque estos contornos puedan estar separados en el tiempo) se denomina comúnmente enmascaramiento de patrones. 

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

# Imagen sin aplicar efecto
Esta es la imagen sin aplicar ningún efecto.

![IMAGEN](/showcase/assets/3.jpg)

<video width="320" height="240" controls>
  <source src="/showcase/assets/video.mp4" type="video/mp4">
</video>

## Image Processing

{{< p5-iframe sketch="/showcase/sketches/mask.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="470" height="310" >}}

{{< p5-iframe sketch="/showcase/sketches/maskv.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="470" height="310" >}}

## mask.frag

{{< expand >}}
```js
precision mediump float;

uniform sampler2D texture;
// see the emitTexOffset() treegl macro
// https://github.com/VisualComputing/p5.treegl#macros
uniform vec2 texOffset;
// holds the 3x3 kernel
uniform float mask[9];

// we need our interpolated tex coord
varying vec2 texcoords2;

void main() {
  // 1. Use offset to move along texture space.
  // In this case to find the texcoords of the texel neighbours.
  vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
  vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
  vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
  vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
  // origin (current fragment texcoords)
  vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
  vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
  vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
  vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
  vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

  // 2. Sample texel neighbours within the rgba array
  vec4 rgba[9];
  rgba[0] = texture2D(texture, tc0);
  rgba[1] = texture2D(texture, tc1);
  rgba[2] = texture2D(texture, tc2);
  rgba[3] = texture2D(texture, tc3);
  rgba[4] = texture2D(texture, tc4);
  rgba[5] = texture2D(texture, tc5);
  rgba[6] = texture2D(texture, tc6);
  rgba[7] = texture2D(texture, tc7);
  rgba[8] = texture2D(texture, tc8);

  // 3. Apply convolution kernel
  vec4 convolution;
  for (int i = 0; i < 9; i++) {
    convolution += rgba[i]*mask[i];
  }
  // convolution[0] = convolution[0];
  // convolution[1] = convolution[1];
  // convolution[2] = convolution[2];
  // 4. Set color from convolution
  gl_FragColor = vec4(convolution.rgb, 1.0); 
}
```
{{< /expand >}}

## image.js

{{< expand >}}
```js
'use strict';

let image_src;
let video_src;
let maskShader;
let video_on;
// ui

function preload() {
  // paintings are stored locally in the /sketches/shaders/paintings dir
  // and named sequentially as: p1.jpg, p2.jpg, ... p30.jpg
  // so we pick up one randomly just for fun:
  image_src = loadImage(`/showcase/assets/3.jpg`);
  video_src = createVideo(['/showcase/assets/video.webm'],onVideoLoad);
  video_src.hide();
  //video_src.resize(450,280);
  maskShader = readShader('/showcase/sketches/shaders/mask.frag',
           { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
    createCanvas(450, 284, WEBGL);
    textureMode(NORMAL);
    noStroke();
    shader(maskShader);
    //video_src.size(400,300)
    maskShader.setUniform("texture", image_src);
    maskShader.setUniform("texOffset", [1 / image_src.width, 1 / image_src.height])
    maskShader.setUniform("mask", [1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9]);
    video_src.size(450,280);
    /*if (video_on.checked()) {
        maskShader.setUniform('texture', video_src);
        maskShader.setUniform("texOffset", [1 / video_src.width, 1 / video_src.height])
        video_src.loop();
    } else {
        maskShader.setUniform('texture', image_src);
        maskShader.setUniform("texOffset", [1 / image_src.width, 1 / image_src.height])
        video_src.pause();
    }
}
  
function draw() {
    // which previous exercise does this code actually solve?
    /*
          y                  v
          |                  |
    (-1,1)|     (1,1)        (0,1)     (1,1)
    *_____|_____*            *__________*   
    |     |     |            |          |        
    |_____|_____|__x         | texture  |        
    |     |     |            |  space   |
    *_____|_____*            *__________*___ u
    (-1,-1)    (1,-1)       (0,0)    (1,0) 
    */
    //maskShader.setUniform("texture", image_src);
    //emitTexOffset(maskShader, image_src, [uniform = 'texOffset'])
    //maskShader.setUniform("mask", [-1,-1,-1,-1,8,-1,-1,-1,-1]);
    //maskShader.setUniform("mask", [1,1,1,1,1,1,1,1,1]);
    //maskShader.setUniform("mask", [1/16,1/8,1/16,1/8,1/4,1/8,1/16,1/8,1/16]);
    //maskShader.setUniform("mask", [1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9]);
    //video_src.loop();
    //video_src.play();
    beginShape();
    vertex(-1, -1, 0, 0, 1);
    vertex(1, -1, 0, 1, 1);
    vertex(1, 1, 0, 1, 0);
    vertex(-1, 1, 0, 0, 0);
    endShape();
}

function onVideoLoad() {
    // The media will play as soon as it is loaded.
    video_src.autoplay();
    video_src.volume(0);
    video_src.size(100, 100);
}
```
{{< /expand >}}

## video.js

{{< expand >}}
```js
'use strict';

let image_src;
let video_src;
let maskShader;
let video_on;
// ui

function preload() {
  // paintings are stored locally in the /sketches/shaders/paintings dir
  // and named sequentially as: p1.jpg, p2.jpg, ... p30.jpg
  // so we pick up one randomly just for fun:
  image_src = loadImage(`/showcase/assets/3.jpg`);
  video_src = createVideo('/showcase/assets/video.webm');
  video_src.hide();
  //video_src.resize(450,280);
  maskShader = readShader('/showcase/sketches/shaders/mask.frag',
           { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
    createCanvas(450, 284, WEBGL);
    shader(maskShader);
    //video_src.size(400,300)
    maskShader.setUniform("texture", video_src);
    maskShader.setUniform("texOffset", [1 / video_src.width, 1 / video_src.height])
    maskShader.setUniform("mask", [1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9]);
    video_src.size(450,280);
    /*if (video_on.checked()) {
        maskShader.setUniform('texture', video_src);
        maskShader.setUniform("texOffset", [1 / video_src.width, 1 / video_src.height])
        video_src.loop();
    } else {
        maskShader.setUniform('texture', image_src);
        maskShader.setUniform("texOffset", [1 / image_src.width, 1 / image_src.height])
        video_src.pause();
    }
}
  
function draw() {
    // which previous exercise does this code actually solve?
    /*
          y                  v
          |                  |
    (-1,1)|     (1,1)        (0,1)     (1,1)
    *_____|_____*            *__________*   
    |     |     |            |          |        
    |_____|_____|__x         | texture  |        
    |     |     |            |  space   |
    *_____|_____*            *__________*___ u
    (-1,-1)    (1,-1)       (0,0)    (1,0) 
    */
    //maskShader.setUniform("texture", image_src);
    //emitTexOffset(maskShader, image_src, [uniform = 'texOffset'])
    //maskShader.setUniform("mask", [-1,-1,-1,-1,8,-1,-1,-1,-1]);
    //maskShader.setUniform("mask", [1,1,1,1,1,1,1,1,1]);
    //maskShader.setUniform("mask", [1/16,1/8,1/16,1/8,1/4,1/8,1/16,1/8,1/16]);
    //maskShader.setUniform("mask", [1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9]);
    video_src.loop();
    //video_src.play();
    beginShape();
    vertex(-1, -1, 0, 0, 1);
    vertex(1, -1, 0, 1, 1);
    vertex(1, 1, 0, 1, 0);
    vertex(-1, 1, 0, 0, 0);
    endShape();
}
```
{{< /expand >}}

## Conclusiones

- La aplicacion de máscaras mediante el uso de shaders es notablemente más rapido gracias al uso de la tarjeta gráfica del computador. Esto se puede hacer tangible no solo en la velocidad del proceso, sino que tambien en el hecho de que podemos implementar el mismo shader para imagenes en video y poder realizar el proceso en tiempo real en lugar de tener que esperar aproximadamente 20 segundos +/- 1, a poder realizarlo varias veces por segundo.

- La cantidad de código escrito por nosotros es menor y mas eficiente gracias a las librerias y los shaders que se usaron