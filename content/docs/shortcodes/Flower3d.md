# Flower
Para este ejercicio es necesario usar las coordenadas polares en el plano cartesiano como se ve en la siguiente imagen:

{{< tabs "convolution" >}}

{{< tab "Imagen base" >}} 

# Coordenadas polares a coordenadas cartesianas


![IMAGEN](/showcase/assets/polares.PNG)
{{< /tab >}}

{{< /tabs >}}

Como estamos pasando de coordenadas polares a coordenadas cartesianas, sucede algo curioso, el phi que esta dentro del seno si esta valor es un numero par el numero de petalos de la flor sera la mitad de dicho numero, pero si el numero es impar el numero de petalos sera el mismo numero.

Esto sucede debido  a que estamos mapeando  la onda sinusoidal  en coordenadas cartesianas en el sistemas de coordenadas polares.

{{< tabs "convolution2" >}}

{{< tab "par" >}} 

# Frecuencia Par
![IMAGEN](/showcase/assets/par.PNG)
{{< /tab >}}
{{< tab "impar" >}} 
# Frecuencia Impar
![IMAGEN](/showcase/assets/impar.PNG)
{{< /tab >}}

{{< /tabs >}}

# Codigo
{{< expand >}}
```js
//array para almacenar todos los vertices de la flor
let v = [];
let rows = 60, cols = 120;

let canvas;

//pLenSlider, diameterSlider controlan los slider de la interfaz
let pNumSlider, pLenSlider, diameterSlider, pSharpSlider;
// numero de petalos, longitud diametro, forma
let petalNum, pLength, diameter, pSharpness;

//y asi con los demas los valores de los sliders y luego los valores para controlar la forma de la flor

let heightSlider, curvatureSlider1, curvatureSlider2;
let flowerHeight, curvature1, curvature2;

let bumpSlider, bumpNumSlider;
let bump, bumpNum;

let pNum, fD, pLen, pSharp;
let fHeight, curve1, curve2;
let b, bNum;

function setup(){
  canvas = createCanvas(700, 700, WEBGL);
  canvas.class("canvas");

  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);
  noStroke();

  //Aqui van todos los parametros que vamos a modificar para cambiar la forma de la flor
  petalNum = createDiv();
  //meueve los sliders a la parte derecha de la pantalla con css
  petalNum.class("valueDisplay");
  pNumSlider = createSlider(1, 20, 5, 1);
  pNumSlider.class("Slider");

  diameter = createDiv();
  diameter.class("valueDisplay");
  diameterSlider = createSlider(20, 250, 200, 10);
  diameterSlider.class("Slider");

  pLength = createDiv();
  pLength.class("valueDisplay");
  //los 4 parametros indican la media, max, el valor predeterminado y cuanto se incrementa
  pLenSlider = createSlider(0, 300, 60, 10);
  pLenSlider.class("Slider");

  pSharpness = createDiv();
  pSharpness.class("valueDisplay");
  pSharpSlider = createSlider(0.0, 10.0, 0.4, 0.1);
  pSharpSlider.class("Slider");

  flowerHeight = createDiv();
  flowerHeight.class("valueDisplay");
  heightSlider = createSlider(0, 600, 300, 10);
  heightSlider.class("Slider");

  curvature1 = createDiv();
  curvature1.class("valueDisplay");
  curvatureSlider1 = createSlider(0.0, 4.0, 0.8, 0.1);
  curvatureSlider1.class("Slider");

  curvature2 = createDiv();
  curvature2.class("valueDisplay");
  curvatureSlider2 = createSlider(0.0, 1.0, 0.2, 0.05);
  curvatureSlider2.class("Slider");

  bump = createDiv();
  bump.class("valueDisplay");
  bumpSlider = createSlider(0.0, 5.0, 2.5, 0.5);
  bumpSlider.class("Slider");

  bumpNum = createDiv();
  bumpNum.class("valueDisplay");
  bumpNumSlider = createSlider(0, 20, 10, 1);
  bumpNumSlider.class("Slider");
}

function draw(){
  clear();
  orbitControl(4, 4);

  rotateX(60);
  //asignamos los valores que vamos moviendo en el slider
  pNum = pNumSlider.value();
  fD = diameterSlider.value();
  pLen = pLenSlider.value();
  pSharp = pSharpSlider.value();

  fHeight = heightSlider.value();
  curve1 = curvatureSlider1.value();
  curve2 = curvatureSlider2.value();

  b = bumpSlider.value();
  bNum = bumpNumSlider.value();
  //el primer for dibuja el croquis de la flor
  for(theta = 0; theta < rows; theta += 1){
    v.push([]);
    //este segundo for duplica el croquis  que se creo con el primer for
    for(let phi = 0; phi < cols; phi += 1){
      //aplicamos las coordenadas polares
      //El valor absoluto duplica el numero de petalos de la flor
      //el pow aumenta la definicion de los bordes de los petalos de la flor
      //theta/rows dibuja una sola parte de la flor por lo tanto  multiplicamos phi * 360 en r, x, y, z para ir dibujando la flor entera en base a esa parte
      let r = (pLen*pow(abs(sin(pNum/2*phi*360/cols)),pSharp)+fD) * theta/rows;
      let x = r * cos(phi*360/cols);
      let y = r * sin(phi*360/cols);
      //nos permite crear la estructura espacial en 3d
      let z = vShape(fHeight, r/100, curve1, curve2, 1.5) - 200+
        bumpiness(b, r/100, bNum, phi*360/cols);

        //contenemos las coordenadas
        let pos = createVector(x, y, z);
        //guardamos todos esos vertices para ir dibujando la flor
        v[theta].push(pos);
    }
  }

  //guardados los vertices anteriormente para generar la malla de la flor
  for(let theta = 0; theta < v.length; theta++){
    //pintamos la malla
    fill(340, 100-theta, 100);
    for(let phi = 0; phi < v[theta].length; phi++){
      if(theta < v.length-1 && phi < v[theta].length-1){
        beginShape();
        vertex(v[theta][phi].x, v[theta][phi].y, v[theta][phi].z);
        vertex(v[theta+1][phi].x, v[theta+1][phi].y, v[theta+1][phi].z);
        vertex(v[theta+1][phi+1].x, v[theta+1][phi+1].y, v[theta+1][phi+1].z);
        vertex(v[theta][phi+1].x, v[theta][phi+1].y, v[theta][phi+1].z);
        endShape(CLOSE);
      }
      //conectamos los ultimos 3 vertices con el indice 0
      else if(theta < v.length-1 && phi == v[theta].length-1){
        beginShape();
        vertex(v[theta][phi].x, v[theta][phi].y, v[theta][phi].z);
        vertex(v[theta][0].x, v[theta][0].y, v[theta][0].z);
        vertex(v[theta+1][0].x, v[theta+1][0].y, v[theta+1][0].z);
        vertex(v[theta+1][phi].x, v[theta+1][phi].y, v[theta+1][phi].z);
        endShape(CLOSE);
      }
    }
  }

  //los valores de los sliders en un elemento div
  petalNum.html("Number of the petals: " + pNumSlider.value());
  diameter.html("Diameter: " + diameterSlider.value());
  pLength.html("Petal length: " + pLenSlider.value());
  pSharpness.html("Petal sharpness: " + pSharpSlider.value());

  flowerHeight.html("Flower height: " + heightSlider.value());
  curvature1.html("Curvature 1: " + curvatureSlider1.value());
  curvature2.html("Curvature 2: " + curvatureSlider2.value());

  bump.html("Bumpiness: " + bumpSlider.value());
  bumpNum.html("Bumpiness number: " + bumpNumSlider.value());

  v = [];
}
//nos permite crear la forma vertical de la flor
function vShape(A, r, a, b, c){
  return A*pow(Math.E, -b*pow(abs(r), c))*pow(abs(r), a);
}
//agrega una iregularidad a la forma de los petalos de la flor
function bumpiness(A, r, f, angle){
  //sin(f * angle); aunmentado la frecuencia genera esa onda en los petalos
  return 1 + A * pow(r, 2) * sin(f * angle);
}

```
{{< /expand >}}
{{< p5-iframe sketch="/showcase/sketches/flower.js">}}

# referencias:
Ecuaciones: https://demonstrations.wolfram.com/VirtualFlowersWithCrispatePetals/
Codigo: https://github.com/Creativeguru97/YouTube_tutorial/tree/master/Play_with_geometry/3DMathFlowers