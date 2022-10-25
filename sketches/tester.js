const fireworks = [];
let gravity;
let sel;
let particles = [];
let slider;
let checkbox;
let mode = 'Explotions';

function setup() {
  createCanvas(600,600, WEBGL)
  angleMode(DEGREES)
  gravity = createVector(0, 0.2, 0);
  sel = createSelect();
  sel.position(10, 10);
  sel.option('Explotions');
  sel.option('Click');
  sel.option('Fireworks');
  sel.changed(mySelectEvent);
  
  
  slider = createSlider(1, 255, 100);
  slider.position(10, 30);
  slider.style('width', '100px');
  checkbox = createCheckbox('Iluminacion', true);
}

function mySelectEvent() {
  mode = sel.value();
}

function draw() {
    background(240,100,10)
    
    if (checkbox.checked()) {
      directionalLight([255], createVector(0, 0, -1))
    }
    if(mode === 'Click'){
      colorMode(HSL)
      if ((mouseIsPressed === true)&&(mouseButton === LEFT)) {
        var x = mouseX-width/2
        var y = mouseY-height/2
        var z = random(-100,100)
        var pos = createVector(x, y, z)
        var r = 20*random (0,18)
        var g = 100
        var b = 50
       
        for(var i = 0; i < slider.value(); i++) {
            r += random (-15,15)
            var c = color(r, g, b)
            var p = new Particle(pos,c)
            particles.push(p)
        }
    }

    for (var i = particles.length -1 ; i >= 0; i--) {
        if (dist(particles[i].pos.x,particles[i].pos.y,particles[i].pos.z,0,0,0) < 500) {
            particles[i].update()
            particles[i].show()
        } else {
            particles.splice(i,1)
        }        
    }
    }
  if(mode === 'Explotions'){
    colorMode(RGB)
    background(0,0,30)

    //rotateX(sin(frameCount / 6) * 360)
    //rotateY(cos(frameCount / 6) * 360)
    if (mouseIsPressed === true) {
      rotateX(mouseY)
      rotateY(mouseX)
    }
    
    translate(0, 0, sin(frameCount) * 100)

    if (checkbox.checked()) {
        directionalLight([255], createVector(0, 0, -1))
    }

    if (random(1) > 0.97) {

        var x = random(-100, 100)
        var y = random(-100, 100)
        var z = random(-100, 100)

        var pos = createVector(x, y, z)

        for(var i = 0; i < slider.value(); i++) {

            var r = map(sin(frameCount),-1,1,0,255) + random (-50,50)
            var g = map(sin(frameCount / 2),-1,1,255,0) + random(-50,50)
            var b = map(cos(frameCount / 4),-1,1,0,255) + random(-50,50)
            var c = color(r, g, b)
            var p = new Particle(pos,c)
            particles.push(p)
        }
    }
    for (var i = particles.length -1 ; i >= 0; i--) {
        if (dist(particles[i].pos.x,particles[i].pos.y,particles[i].pos.z,0,0,0) < 500) {
            particles[i].update()
            particles[i].show()
        } else {
            particles.splice(i,1)
        }        
    }
  }
  if(mode === 'Fireworks'){
    colorMode(HSL)
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
}
class Particle {
    constructor(pos,c) {
        this.pos = createVector(pos.x, pos.y, pos.z)
        this.vel = p5.Vector.random3D().normalize().mult(random(4,6))
        this.c = c
        this.w = random(4,10)
    }
    update() {
        this.pos.add(this.vel)
    }
    show() {
        push()
        noStroke()
        fill(this.c)
        translate(this.pos.x, this.pos.y, this.pos.z)
        sphere(9)
        pop()
    }
}

class ParticleF {
    constructor(pos, c, firework) {
        this.pos = createVector(pos.x, pos.y, pos.z)
        this.acc = createVector(0, 0, 0)
        this.c = c
        this.lifespan = 100
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
        if (!this.firework) {
          this.vel.mult(0.99);
          this.lifespan -= 1;
        }
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
        sphere(8)
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
    this.firework = new ParticleF(pos, this.c, true);
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
      const p = new ParticleF( pos, a, false);
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