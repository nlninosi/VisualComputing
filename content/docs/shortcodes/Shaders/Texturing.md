# Texturing

Texturing es la manera de cómo se sitúa una textura (Una imagen) sobre un objeto al momento de proyectarse sobre un objeto. De este modo, un objeto obtiene una textura superficial similar a la de una superficie bidimensional. Es el equivalente digital de empapelar, pintar o cubrir cualquier superficie y por lo general es aplicada a objetos 3D.

## Uv space

Los shaders que vamos a utilizar un el mapeado UV, donde se asigna una coordenada para cada vértice del objeto que más adelante se va a texturizar. En este caso el espacio donde se va a proyectar la textura esta normalizado por lo que en este ejmplo las figueras se mapean de 0 a 1. Como es un mapeo 1 a 1 entonces al cambiar las coordenadas del espacico a texutrizar tambien cambia el shader, en el ejemplo de abajo "giramos" la imagen de la izquierda al redefinir las coordenadas del objeto a texturizar.


{{< p5-iframe sketch="/showcase/sketches/shaders/Texturing_3.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="325" height="325" >}}

{{< p5-iframe sketch="/showcase/sketches/shaders/Texturing_1.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="325" height="325" >}}

Aqui podemos observar las coodernadas definidas para el primer y segundo ejemplo respectivamente.

{{< expand >}}
```js
beginShape()
  vertex(-1, -1, 0, 0, 0)
  vertex( 1, -1, 0, 1, 0)
  vertex( 1,  1, 0, 1, 1)
  vertex(-1,  1, 0, 0, 1)
endShape()
```
{{< /expand >}}

{{< expand >}}
```js
beginShape()
  vertex(1, 1, 0, 0, 0)
  vertex( -1, 1, 0, 1, 0)
  vertex( -1,  -1, 0, 1, 1)
  vertex(1,  -1, 0, 0, 1)
endShape()
```
{{< /expand >}}

El shader aplicado arriba colorea cada pixel de acuerdo a su posicion. Esto se puede ver aqui.

{{< expand >}}
```js
precision mediump float;

varying vec2 texcoords2;

void main() {
  gl_FragColor = vec4(texcoords2.xy, 0.0, 1.0);
}
```
{{< /expand >}}

El color que aplica el shader en gl_FragColor esta en RGBA, o Red, Green, Blue y Alfa (Opacidad). Podemos cambiar de tal manera que cambiemos de color facilmente cambiando el vector. Como podemos ver aqui. 

{{< expand >}}
```js
precision mediump float;

varying vec2 texcoords2;

void main() {
  gl_FragColor = vec4(0.0 ,texcoords2.xy,1.0);
}
```
{{< /expand >}}

{{< p5-iframe sketch="/showcase/sketches/shaders/Texturing_2.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="325" height="325" >}}

## Texture Sampling

El muestreo de texturas es el proceso de lectura de texturas a través de la GPU. El hardware gráfico incorpora un conjunto de unidades de textura que son capaces de leer los píxeles de la textura directamente o muestrear estas texturas utilizando diferentes algoritmos.Nosotros en este ejemplo trataremos de implementar los filtros de iluminacion HSL, HSV y promedio de luz para una imagen. 

La implementacion de estas herrmientas consistio en multiplicar los valores RGB del texel con otras constantes teniendo en cuenta que la formula para pasar de RGB a HSL es:

![IMAGEN](/showcase/assets/HSL.PNG)

Entonces podemos definir la formula en el shader asi:

{{< expand >}}
```js
  float max = 0.0;
  float min = 0.0;
  if ( texel.r > texel.g && texel.r > texel.b){
    max = texel.r;
  } else if (texel.g > texel.r && texel.g > texel.b){
    max = texel.g;
  } else if (texel.b > texel.r && texel.b > texel.g) {
    max = texel.b;
  }
  if ( texel.r < texel.g && texel.r < texel.b){
    min = texel.r;
  } else if (texel.g < texel.r && texel.g < texel.b){
    min = texel.g;
  } else if (texel.b < texel.r && texel.b < texel.g) {
    min = texel.b;
  }
  return max * 0.5 + min * 0.5 + 0.1;
```
{{< /expand >}}

Luego viendo que la formula para pasar de RGB a HSV es:

![IMAGEN](/showcase/assets/HSV.PNG)

Nuestra implementacion fue esta:

{{< expand >}}
```js
  if ( texel.r > texel.g && texel.r > texel.b){
    return texel.r * 1.0 + 0.1;
  } else if (texel.g > texel.r && texel.g > texel.b){
    return texel.g * 1.0 + 0.1;
  } else if (texel.b > texel.r && texel.b > texel.g) {
    return texel.b * 1.0 + 0.1;
  }
```
{{< /expand >}}

Donde solamente calculamos el componente "value" que corresponde al máximo entre los valores del RGB. La implementacion final es esta:

{{< expand >}}
```js
  let baseimg;
let lumaShader;
let greyimg;
let mode = 'Original';

function preload(){
    lumaShader = readShader("/showcase/sketches/shaders/Texturing_4.frag",{varyings: Tree.texcoords});
    baseimg = loadImage('/showcase/assets/texturing1.jpg');
}

function setup() {
    createCanvas(500, 500, WEBGL);
    noStroke();
    sel = createSelect();
    sel.position(10, 10);
    sel.option('Original');
    sel.option('HSL');
    sel.option('HSV');
    sel.changed(mySelectEvent);
    textureMode(NORMAL);
}

function mySelectEvent() {
    mode = sel.value();
    if(mode === 'Original'){
        reset();
    }
    if(mode === 'HSL'){
        HSLL();
    }
    if(mode === 'HSV'){
        HSVV();
    }
    console.log(mode)
}
  
function draw() {
    noLoop();
    shader(lumaShader);
    background(0);
    lumaShader.setUniform('greyscale',false);
    lumaShader.setUniform('val',false);
    lumaShader.setUniform('lum',false);
    lumaShader.setUniform('texture',baseimg);
    quad(-250,-250,250,-250,250,250,-250,250);
    loadPixels();
    image(baseimg,-250,-250);
    
    
    console.log(mode)
}


function reset(){
    background(0);
    lumaShader.setUniform('greyscale',false);
    lumaShader.setUniform('val',false);
    lumaShader.setUniform('lum',false);
    lumaShader.setUniform('texture',baseimg);
    quad(-250,-250,250,-250,250,250,-250,250);
    loadPixels();
}

function HSVV(){
    lumaShader.setUniform('greyscale',true);
    lumaShader.setUniform('val',true);
    lumaShader.setUniform('lum',false);
    lumaShader.setUniform('texture',baseimg);
    quad(-250,-250,250,-250,250,250,-250,250);
    loadPixels();
}

function HSLL(){
    lumaShader.setUniform('greyscale',true);
    lumaShader.setUniform('lum',true);
    lumaShader.setUniform('val',false);
    lumaShader.setUniform('texture',baseimg);
    quad(-250,-250,250,-250,250,250,-250,250);
    loadPixels();
}
```
{{< /expand >}}

{{< expand >}}
```
  precision mediump float;

// uniforms are defined and sent by the sketch
uniform sampler2D texture;
uniform bool lum;
uniform bool val;
uniform bool greyscale;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
float luma(vec3 texel) {
  if(lum){
    float max = 0.0;
    float min = 0.0;
    if ( texel.r > texel.g && texel.r > texel.b){
      max = texel.r;
    } else if (texel.g > texel.r && texel.g > texel.b){
      max = texel.g;
    } else if (texel.b > texel.r && texel.b > texel.g) {
      max = texel.b;
    }
    if ( texel.r < texel.g && texel.r < texel.b){
      min = texel.r;
    } else if (texel.g < texel.r && texel.g < texel.b){
      min = texel.g;
    } else if (texel.b < texel.r && texel.b < texel.g) {
      min = texel.b;
    }
    return max * 0.5 + min * 0.5 + 0.1;
  }
  if(val){
    if ( texel.r > texel.g && texel.r > texel.b){
      return texel.r * 1.0 + 0.1;
    } else if (texel.g > texel.r && texel.g > texel.b){
      return texel.g * 1.0 + 0.1;
    } else if (texel.b > texel.r && texel.b > texel.g) {
      return texel.b * 1.0 + 0.1;
    }
  }
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = greyscale ? vec4((vec3(luma(texel.rgb))), 1.0) : texel;
}
```
{{< /expand >}}


{{< p5-iframe ver="1.4.1" sketch="/showcase/sketches/shaders/Texturing_4.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.js" lib2="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="500" height="500" >}}

## Conclusiones

## Referencias

https://es.wikipedia.org/wiki/Mapeo_de_texturas
https://es.wikipedia.org/wiki/Filtrado_de_texturas
https://help.disguise.one/en/Content/3D-Workflow/UV-Mapping/How-does-disguise-sample-UV-maps.html#:~:text=Normalising%20UV%20maps,the%20U%20and%20V%20axes.
https://vfxdoc.readthedocs.io/en/latest/textures/sampling/#:~:text=Texture%20sampling%20is%20the%20process,these%20textures%20using%20different%20algorithms.
https://es.wikipedia.org/wiki/Modelo_de_color_HSV
https://es.wikipedia.org/wiki/Modelo_de_color_HSL

