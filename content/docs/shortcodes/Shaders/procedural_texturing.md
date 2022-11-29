# Procedural Texturing


El objetivo de la texturización procesal es generar una textura mediante un algoritmo de tal manera que el resultado se pueda asignar a una forma como textura. La textura de procedimiento requiere el uso de un objeto de búfer de cuadro que en p5.js se implementa como un objeto p5.Graphics.


## Offset patterns:

Un ejemplo de un patron compensado (offset patterns) es un muro de ladrillos, donde por cada fila alterna tenemos un ladrillo desplazado en el eje x.

Para simular esto lo que hacemos es saber en que fila desplazamos el ladrillo, esto lo logramos verificando si estamos en una fila par o una fila impar con la función mod() of 2.0:  y = mod(x,2.0).

oprima cualquier tecla para reiniciar:

{{< p5-iframe ver="1.4.1" sketch="/showcase/sketches/procedural1/sketch.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.js" lib2="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="440" height="440" >}}


### **Implementación**

Le damos a cada celda un numero indice:
   

    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |

Aplicamos el color intercalado, sea en indices pares o en indices impares. y luego rotamos o asignamos celdas 
segun queramos.


En la línea 15 del  código del fragment es donde estamos usando la función para "detectar" filas impares y darles un desplazamiento de media unidad en x.

En la línea 33 se amplía la relación de aspecto del sistema de coordenadas para imitar el aspecto de un "ladrillo moderno".

# Codigo
{{< expand >}}
```js
let pg;
let truchetShader;
let frames=0;
let frames2=0.5;

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  truchetShader = readShader('/showcase/sketches/procedural1/truchet.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  // use truchetShader to render onto pg
  pg.shader(truchetShader);
  // emitResolution, see:
  // https://github.com/VisualComputing/p5.treegl#macros
  pg.emitResolution(truchetShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', 3);
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // set pg as texture
  texture(pg);
}

function draw() {
  background(33);
  
  orbitControl();
  rotateZ(frames * 0.005);
  rotateX(frames * 0.005);
  rotateY(frames * 0.005);

  truchetShader.setUniform('u_zoom', int(map(frames2, 0, width, 1, 30)));
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  frames++;
  frames2 = frames2 + 0.5;
  
  box(150,200);
}

function keyPressed() {
  if (key) {
    frames2=0.5}
}

```
{{< /expand >}}

### Segundo ejemplo:
# Codigo
{{< expand >}}
```js

let pg;
let truchetShader;
let frames=0;
let frames2=0.5;

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  truchetShader = readShader('/showcase/sketches/procedural2/truchet.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  // use truchetShader to render onto pg
  pg.shader(truchetShader);
  // emitResolution, see:
  // https://github.com/VisualComputing/p5.treegl#macros
  pg.emitResolution(truchetShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', 3);
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // set pg as texture
  texture(pg);
}

function draw() {
  background(33);
  
  orbitControl();
  rotateZ(frames * 0.005);
  rotateX(frames * 0.005);
  rotateY(frames * 0.005);

  truchetShader.setUniform('u_zoom', int(map(frames2, 0, width, 1, 30)));
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  frames++;
  frames2 = frames2 + 0.5;
  
  sphere(150,200);
}

function keyPressed() {
  if (key) {
    frames2=0.5}
}

```
{{< /expand >}}
{{< p5-iframe ver="1.4.1" sketch="/showcase/sketches/procedural2/sketch.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.js" lib2="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="440" height="440" >}}


### **Conclusiones:**

- Como podemos ver en la animación cuando pasa el tiempo la textura pasa a ser mas detallada ya que las celdas son cada vez mas pequeñas, sin embargo sigue siendo fluida debido a que Procedural Texturing requiere poca memoria, no hay ninguna memoria que almacenar en la RAM o en la memoria de la GPU.

- Las texturas sirven en cualquier escala.

- Se puede crear una gran variedad de patrones con pequeños cambios o retoques en sus calculos.

- El mapeo de las texturas se  calcula en tiempo real para cada fragmento individual, si los calculos son complejos la velocidad del renderizado se vuelve mas lenta.
