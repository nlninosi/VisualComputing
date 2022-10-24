const fireworks = []
let gravity
let slider
let checkbox

function setup() {
    createCanvas(600,600, WEBGL)
    colorMode(HSL)

    gravity = createVector(0, 0.2, 0);

    slider = createSlider(1, 255, 100);
    slider.position(10, 10);
    slider.style('width', '100px');
    checkbox = createCheckbox('Iluminacion', true);
    //checkbox.changed(myCheckedEvent);
}

function draw() {
    background(240,100,10)
    orbitControl();
    if (checkbox.checked()) {
      directionalLight([255], createVector(0, 0, -1))
    }
    if (random(1) < 0.02) {
      fireworks.push(new Firework());
    }
    
  
    for (let i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].show();
    
      if (fireworks[i].done()) {
        fireworks.splice(i, 1);
      }
    }
}

class Particle {
    constructor(pos, c, firework) {
        this.pos = createVector(pos.x, pos.y, pos.z)
        this.acc = createVector(0, 0, 0)
        this.c = c
        this.w = random(4,10)
        this.firework = firework;
        if (this.firework) {
          this.vel = createVector(0, random(-14, -10),0);
        } else {
          this.vel = p5.Vector.random3D();
          this.vel.mult(random(2, 10));
        }
    }
    update() {
        this.pos.add(this.vel)
        this.vel.add(this.acc)
        this.acc.mult(0)
    }
    applyForce(force) {
      this.acc.add(force);
    }
    show() {
        push()
        noStroke()
        fill(this.c)
        translate(this.pos.x, this.pos.y, this.pos.z)
        sphere(7)
        pop()
    }
    done() {
      if (this.lifespan < 0) {
        return true;
      } else {
        return false;
      }
    }  
}


class Firework {
  constructor() {
    var h = 60
    var s = 100
    var l = 100
    this.c = color(h, s, l)
    var x = random(-150, 150)
    var y = 250
    var z = random(-100,100)
    var pos = createVector(x, y, z)
    this.firework = new Particle(pos, this.c, true);
    this.exploded = false;
    this.particles = [];
  }
  done() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();

      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();

      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    var h = 18*random (0,20)
    var s = 100
    var l = 50
    for (let i = 0; i < slider.value(); i++) {
      var pos = createVector(this.firework.pos.x, this.firework.pos.y,this.firework.pos.z)
      h += random (-15,15)
      var a = color(h, s, l)
      const p = new Particle( pos, a, false);
      this.particles.push(p);
    }
  }

  show() {
    if (!this.exploded) {
      this.firework.show();
    }

    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}