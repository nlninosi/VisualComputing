/*new p5((p) => {
  let v = [];
  let rows = 60, cols = 120;

  let canvas;

  let pNumSlider, pLenSlider, diameterSlider, pSharpSlider;
  let petalNum, pLength, diameter, pSharpness;

  let heightSlider, curvatureSlider1, curvatureSlider2;
  let flowerHeight, curvature1, curvature2;

  let bumpSlider, bumpNumSlider;
  let bump, bumpNum;

  let pNum, fD, pLen, pSharp;
  let fHeight, curve1, curve2;
  let b, bNum;

  p.setup = function () {
    canvas = p.createCanvas(700, 700);
    canvas.class("canvas");

    colorMode(HSB, 360, 100, 100);
    angleMode(DEGREES);
    noStroke();

    petalNum = createDiv();
    petalNum.class("valueDisplay");
    pNumSlider = createSlider(1, 20, 5, 1);
    pNumSlider.class("Slider");

    diameter = createDiv();
    diameter.class("valueDisplay");
    diameterSlider = createSlider(20, 250, 200, 10);
    diameterSlider.class("Slider");

    pLength = createDiv();
    pLength.class("valueDisplay");
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

  p.draw = function () {
    clear();
    orbitControl(4, 4);

    rotateX(60);

    pNum = pNumSlider.value();
    fD = diameterSlider.value();
    pLen = pLenSlider.value();
    pSharp = pSharpSlider.value();

    fHeight = heightSlider.value();
    curve1 = curvatureSlider1.value();
    curve2 = curvatureSlider2.value();

    b = bumpSlider.value();
    bNum = bumpNumSlider.value();

    for(theta = 0; theta < rows; theta += 1){
      v.push([]);
      for(let phi = 0; phi < cols; phi += 1){
        let r = (pLen*pow(abs(sin(pNum/2*phi*360/cols)),pSharp)+fD) * theta/rows;
        let x = r * cos(phi*360/cols);
        let y = r * sin(phi*360/cols);
        let z = vShape(fHeight, r/100, curve1, curve2, 1.5) - 200+
          bumpiness(b, r/100, bNum, phi*360/cols);
  
          let pos = createVector(x, y, z);
          v[theta].push(pos);
      }
    }

    for(let theta = 0; theta < v.length; theta++){
      fill(340, 100-theta, 100);
      for(let phi = 0; phi < v[theta].length; phi++){
        if(theta < v.length-1 && phi < v[theta].length-1){
          beginShape();
          vertex(v[theta][phi].x, v[theta][phi].y, v[theta][phi].z);
          vertex(v[theta+1][phi].x, v[theta+1][phi].y, v[theta+1][phi].z);
          vertex(v[theta+1][phi+1].x, v[theta+1][phi+1].y, v[theta+1][phi+1].z);
          vertex(v[theta][phi+1].x, v[theta][phi+1].y, v[theta][phi+1].z);
          endShape(CLOSE);
        }else if(theta < v.length-1 && phi == v[theta].length-1){
          beginShape();
          vertex(v[theta][phi].x, v[theta][phi].y, v[theta][phi].z);
          vertex(v[theta][0].x, v[theta][0].y, v[theta][0].z);
          vertex(v[theta+1][0].x, v[theta+1][0].y, v[theta+1][0].z);
          vertex(v[theta+1][phi].x, v[theta+1][phi].y, v[theta+1][phi].z);
          endShape(CLOSE);
        }
      }
    }

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

  function vShape(A, r, a, b, c){
    return A*pow(Math.E, -b*pow(abs(r), c))*pow(abs(r), a);
  }
  
  function bumpiness(A, r, f, angle){
    return 1 + A * pow(r, 2) * sin(f * angle);
  }

}, "3D")*/

// se crea un arreglo don de estaran los puntos de la imagen

let v = [];
let rows = 60, cols = 120;

let canvas;

let pNumSlider, pLenSlider, diameterSlider, pSharpSlider; 
// seran las variables encargadas de mostrar los deslizadores para cambiar la grafica 
let petalNum, pLength, diameter, pSharpness;
// estos seran los valores dados a cada variable para modificar los petalos

let heightSlider, curvatureSlider1, curvatureSlider2;
// seran las variables encargadas de mostrar los deslizadores para cambiar la grafica
let flowerHeight, curvature1, curvature2;
// estos seran los valores dados a cada variable para modificar los petalos

let bumpSlider, bumpNumSlider;
// seran las variables encargadas de mostrar los deslizadores para cambiar la grafica
let bump, bumpNum;
// estos seran los valores dados a cada variable para modificar los petalos

let pNum, fD, pLen, pSharp;
let fHeight, curve1, curve2;
let b, bNum;

function setup(){
  canvas = createCanvas(700, 700, WEBGL);
  canvas.class("canvas");

  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);
  noStroke();

  petalNum = createDiv();
  petalNum.class("valueDisplay");
  pNumSlider = createSlider(1, 20, 5, 1); // los 4 valores indican la media, la maxima, predeterminada y el incremento
  pNumSlider.class("Slider");

  diameter = createDiv();
  diameter.class("valueDisplay");
  diameterSlider = createSlider(20, 250, 200, 10);// los 4 valores indican la media, la maxima, predeterminada y el incremento
  diameterSlider.class("Slider");

  pLength = createDiv();
  pLength.class("valueDisplay");
  pLenSlider = createSlider(0, 300, 60, 10);// los 4 valores indican la media, la maxima, predeterminada y el incremento
  pLenSlider.class("Slider");

  pSharpness = createDiv();
  pSharpness.class("valueDisplay");
  pSharpSlider = createSlider(0.0, 10.0, 0.4, 0.1);// los 4 valores indican la media, la maxima, predeterminada y el incremento
  pSharpSlider.class("Slider");

  flowerHeight = createDiv();
  flowerHeight.class("valueDisplay");
  heightSlider = createSlider(0, 600, 300, 10);// los 4 valores indican la media, la maxima, predeterminada y el incremento
  heightSlider.class("Slider");

  curvature1 = createDiv();
  curvature1.class("valueDisplay");
  curvatureSlider1 = createSlider(0.0, 4.0, 0.8, 0.1);// los 4 valores indican la media, la maxima, predeterminada y el incremento
  curvatureSlider1.class("Slider");

  curvature2 = createDiv();
  curvature2.class("valueDisplay");
  curvatureSlider2 = createSlider(0.0, 1.0, 0.2, 0.05);// los 4 valores indican la media, la maxima, predeterminada y el incremento
  curvatureSlider2.class("Slider");

  bump = createDiv();
  bump.class("valueDisplay");
  bumpSlider = createSlider(0.0, 5.0, 2.5, 0.5);// los 4 valores indican la media, la maxima, predeterminada y el incremento
  bumpSlider.class("Slider");

  bumpNum = createDiv();
  bumpNum.class("valueDisplay");
  bumpNumSlider = createSlider(0, 20, 10, 1);// los 4 valores indican la media, la maxima, predeterminada y el incremento
  bumpNumSlider.class("Slider");
}

function draw(){
  clear();
  orbitControl(4, 4);

  rotateX(60);

  pNum = pNumSlider.value();
  fD = diameterSlider.value();
  pLen = pLenSlider.value();
  pSharp = pSharpSlider.value();

  fHeight = heightSlider.value();
  curve1 = curvatureSlider1.value();
  curve2 = curvatureSlider2.value();

  b = bumpSlider.value();
  bNum = bumpNumSlider.value();

  for(theta = 0; theta < rows; theta += 1){
    v.push([]);
    // Este ciclo se encarga de dibujar los petalos de la flor en coordenadas polares
    for(let phi = 0; phi < cols; phi += 1){
      let r = (pLen*pow(abs(sin(pNum/2*phi*360/cols)),pSharp)+fD) * theta/rows;
      let x = r * cos(phi*360/cols);
      let y = r * sin(phi*360/cols);
      let z = vShape(fHeight, r/100, curve1, curve2, 1.5) - 200+
        bumpiness(b, r/100, bNum, phi*360/cols); // la coordenada z se encarga de graficar la altura de la flor

        let pos = createVector(x, y, z); // vector que contiene las coordenadas
        v[theta].push(pos);
    }
  }

  for(let theta = 0; theta < v.length; theta++){
    //se usa fill para dar color al petalo
    fill(340, 100-theta, 100);
    //el segundo ciclo for crea la misma flor pero cada vez menor para dar la sensacion de color
    //Los dos ciclos se encargan de llenar la matris de puntos 
    for(let phi = 0; phi < v[theta].length; phi++){
      //el primer if se encarga de acotar los puntos en la matris para que no haya problemas de outofbounding
      if(theta < v.length-1 && phi < v[theta].length-1){
        beginShape();
        vertex(v[theta][phi].x, v[theta][phi].y, v[theta][phi].z);
        vertex(v[theta+1][phi].x, v[theta+1][phi].y, v[theta+1][phi].z);
        vertex(v[theta+1][phi+1].x, v[theta+1][phi+1].y, v[theta+1][phi+1].z);
        vertex(v[theta][phi+1].x, v[theta][phi+1].y, v[theta][phi+1].z);
        endShape(CLOSE);
      }else if(theta < v.length-1 && phi == v[theta].length-1){
        //el else if se encarga de llenar los ultimos 3 vertices que no se acotan en la matriz y el indice 0
        beginShape();
        vertex(v[theta][phi].x, v[theta][phi].y, v[theta][phi].z);
        vertex(v[theta][0].x, v[theta][0].y, v[theta][0].z);
        vertex(v[theta+1][0].x, v[theta+1][0].y, v[theta+1][0].z);
        vertex(v[theta+1][phi].x, v[theta+1][phi].y, v[theta+1][phi].z);
        endShape(CLOSE);
      }
    }
  }

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

function vShape(A, r, a, b, c){
  return A*pow(Math.E, -b*pow(abs(r), c))*pow(abs(r), a);
}

function bumpiness(A, r, f, angle){
  return 1 + A * pow(r, 2) * sin(f * angle);
}

// Fuente teorica tomada de: https://www.youtube.com/watch?v=8fgJ6i96fTY