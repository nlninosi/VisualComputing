new p5((p) => {
    let img;
    let img2;

    p.preload = function () {
        img = p.loadImage("/showcase/assets/2D.png");
        img2 = p.loadImage("/showcase/assets/3D.png");
    }

    p.setup = function () {
        p.createCanvas(800, 400);
        p.image(img, 0, 0);
        p.image(img2, img.width, 0);
    }   
    p.draw = function () {
        // img.loadPixels();
        // for(let i = 0; i < img.width * img.height * 4; i+=4){
        //     for(let j = 0; j < 4; j++){
        //         if(j != 3)
        //             img.pixels[i + j] = (img.pixels[i + j]+j) % 255
        //     }
        // }
        // img.updatePixels();
        p.image(img);
        p.image(img2);
        img.resize(700, 500);
    }
}, "softwareConvolution");