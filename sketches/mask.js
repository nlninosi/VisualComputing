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