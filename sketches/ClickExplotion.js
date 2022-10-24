let particles = []
let slider
let checkbox

function setup() {
    createCanvas(600,600, WEBGL)
    slider = createSlider(1, 255, 100);
    slider.position(10, 10);
    slider.style('width', '100px');
    checkbox = createCheckbox('Iluminacion', true);
    
}

function draw() {
    background(240,100,10)
    colorMode(HSL)
    if (checkbox.checked()) {
      directionalLight([255], createVector(0, 0, -1))
    }
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
        sphere(10)
        pop()
    }
}