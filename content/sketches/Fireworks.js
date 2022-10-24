let particlestest = []
const fireworks = []
let test=[]
let gravity;

function setup() {
    createCanvas(750,690, WEBGL)
    angleMode(DEGREES)
    gravity = createVector(0, 0.2, 0);
}

function draw() {
    background(0,0,30)
    directionalLight([255], createVector(0, 0, -1))
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
    var r = 255
    var g = 255
    var b = 255
    this.c = color(r, g, b)
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
    for (let i = 0; i < 100; i++) {
      var pos = createVector(this.firework.pos.x, this.firework.pos.y,this.firework.pos.z)
      var r = map(sin(frameCount),-1,1,0,255) + random (-50,50)
      var g = map(sin(frameCount / 2),-1,1,255,0) + random(-50,50)
      var b = map(cos(frameCount / 4),-1,1,0,255) + random(-50,50)
      var r = color(r, g, b)
      const p = new Particle( pos, r, false);
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