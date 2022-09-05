new p5((p) => {
    p.setup = function () {
      p.createCanvas(800, 700);
      p.strokeWeight(3); // medium weight lines
      p.smooth(); // antialias lines
      p.noLoop();
    };
  
    p.draw = function () {
        p.background(255);
        x_jump = 55;
        y_jump = 55;
        p.stroke('grey');
        p.strokeWeight(3.3);

        for (var j = 0 ; j < 30; j++) {
            for (var i = 0; i < 30; i++) {
                if (j % 2 == 0) {
                    p.fill(0);
                } else {
                    p.fill(255);
                };if (i % 2 == 0) {
                    p.fill(0);
                } else {
                    p.fill(255);
                };
                if (j % 3 == 0){
                    p.rect(i * x_jump - 10, j * y_jump, 80, 90);
                } else if (j % 2 == 0){
                    p.rect(i * x_jump - 30, j * y_jump, 100, 60);
                } else {
                    p.rect(i * x_jump - 50, j * y_jump, 90, 60);
                }
            }
        }
    };
  }, "cafewall");