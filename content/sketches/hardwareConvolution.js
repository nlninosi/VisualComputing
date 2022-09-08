new p5((p) => {
    let img;
    let input;

    p.setup = function () {
        p.createCanvas(700, 500);
        img = p.loadImage("/showcase/assets/1.jpg");
        img.resize(700, 500);
    }

    p.draw = function () {
        p.image(img, 0, 0);
        img.resize(700, 500);
        img.filter(p.GRAY);
    }

}, "hardwareConvolution");