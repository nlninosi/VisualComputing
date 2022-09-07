new p5((p) => {
    let img;
    let input;

    console.log("Niño 70 hp")

    p.setup = function () {
        p.createCanvas(700, 500);
        img = p.loadImage("/showcase/assets/1.jpg");
        img.resize(700, 500);
        /* [[0.00296902,    0.0133062,    0.0219382,    0.0133062,    0.00296902],    
        [0.0133062,    0.0596343,    0.0983203,    0.0596343,    0.0133062],    
        [0.0219382,    0.0983203,    0.162103,    0.0983203,    0.0219382],    
        [0.0133062,    0.0596343,    0.0983203,    0.0596343,    0.0133062],    
        [0.00296902,    0.0133062,    0.0219382,    0.0133062,    0.00296902]] */
    }

    p.draw = function () {
        p.image(img, 0, 0);
        img.resize(700, 500);
        img.filter(p.BLUR);
    }

}, "hardwareConvolution");