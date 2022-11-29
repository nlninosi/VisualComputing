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
