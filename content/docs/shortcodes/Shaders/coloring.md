## Coloring

## Blending

Color blending is a way to mix two colors together to produce to third color. These colors are called source and destination and they are in form [R,G,B,A] where R, G, B, A ∈ [0...1]. Usually we use blending to represent semi transparent objects like glass. However we can also create interesting effects by changing some parameters in the blend function.

Alpha

So far we know that the color value is a vector space element that consists of R, G and B channels and sometimes has also an alpha channel. At the fundamental level, alpha has no special meaning therefore we can use it however we need, for example alpha value could be used to store shininess, collision material or whatever we need in particular case. Most often it is used to represent transparency but there are still two different ways to do it.

Conventional (Straight) Alpha

Majority of programs and file formats consider transparency as:

RGB specifies the color of the object
Alpha specifies how solid it is
When we consider blending two colors, we can call the color already in place the destination and the new color we want to blend with it the source.

In math the equation for the conventional alpha blending is quite straight forward:

blend(source, destination) = (source⋅sourcealpha) + (destination⋅(1−sourcealpha))

This way the transparency is fully independent of the color values. For example we can have fully transparent color that is either red or blue. One of the main problem with this is that if we sample the texture by floating point precision (for example by using bi-linear filtering) we could encounter color bleeding issue shown in this video.

If we decrease the value of alpha, then the current color is taken less into account when blending.

![IMAGEN](/showcase/assets/bbb.png)

## Ejemplo del profesor

{{< p5-iframe sketch="/showcase/sketches/coloring.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="325" height="325" >}}

## Blending con suma 

{{< p5-iframe sketch="/showcase/sketches/blending.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="325" height="325" >}}

## Blending con maximo

{{< p5-iframe sketch="/showcase/sketches/blending2.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="325" height="325" >}}

{{< p5-iframe sketch="/showcase/sketches/blending3.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="325" height="325" >}}

## Blending con minimo

{{< p5-iframe sketch="/showcase/sketches/blending4.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="325" height="325" >}}

## Blending.js

{{< expand >}}
```js
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
  colorShader = readShader('/showcase/sketches/shaders/color.frag',
                          { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(300, 300, WEBGL);
  colorPicker = createColorPicker('#ed225d');
  colorPicker2 = createColorPicker('#1AAf18');
  colorPicker.position(0, 0);
  colorPicker2.position(150, 0);
  slider = createSlider(0, 1, 0.5, 0.01);
  slider.position(10, 270);
  // https://p5js.org/reference/#/p5/shader
  shader(colorShader);
}

function draw() {
  background(0);
  // the fill command is used to define the colors
  // (to be interpolated) in a per-vertex basis
  beginShape();
  vertex(-0.5, 0.5);
  vertex(0.5, 0.5);
  vertex(0.5, -0.5);
  vertex(-0.5, -0.5);
  endShape();
  //console.log(colorPicker.color().levels[3])
  let c1 = normalizar(colorPicker.color().levels,1);
  let c2 = normalizar(colorPicker2.color().levels,1);
  b = slider.value(); 
  //console.log(c1);
  colorShader.setUniform('uMaterial1', c1);
  colorShader.setUniform('uMaterial2', c2);
  colorShader.setUniform('b', b);
  
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
```
{{< /expand >}}

## Color.frag

{{< expand >}}
```js
precision mediump float;

// uniforms are emitted from the sketch
// https://p5js.org/reference/#/p5.Shader/setUniform
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;
uniform float b;

void main() {
  gl_FragColor = (uMaterial1 * uMaterial2) * b ;
}
```
{{< /expand >}}

## Conclusiones

- La aplicacion de blending mediante el uso de shaders es notablemente más facil de codificar
- La cantidad de código escrito por nosotros es menor y mas eficiente gracias a las librerias y los shaders que se usaron.