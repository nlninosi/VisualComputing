# Illusions

## Definición del problema

Estudiar, poner en práctica y discutir las posibles aplicaciones de algunos fenómenos visuales e ilusiones ópticas conocidos.

## Sustento teórico

Una ilusión óptica es cualquier ilusión del sentido de la visión que nos lleva a percibir la realidad de varias formas. Puede ser de carácter fisiológico, asociada a los efectos de una estimulación anómala o excesiva en los ojos o el cerebro o de carácter cognitivo, en las que interviene nuestro conocimiento del mundo. Y por último están las ilusiones de tipo físico donde las propiedades físicas del entorno alteran nuestra capacidad de percibirlo de manera correcta. 

Estas ilusiones son interesantes porque son relevantes para los debates sobre la modularidad, la penetración cognitiva y la naturaleza de la experiencia. Esto que quiere decir: según la hipótesis de que la mente es modular, un módulo mental es una especie de departamento semiindependiente de la mente que se ocupa de determinados tipos de entradas, y da determinados tipos de salidas, y cuyo funcionamiento interno no es accesible a la conciencia de la persona, todo lo que se puede acceder son los resultados producidos por el módulo. En el caso del café wall, una forma estándar de explicar por qué la experiencia de la ilusión persiste, aunque uno sepa que está experimentando una ilusión es que el módulo, o los módulos, que constituyen el sistema visual son "cognitivamente impenetrables" hasta cierto punto, es decir, que su funcionamiento interno y sus resultados no pueden ser influenciados por la conciencia.




Fuentes: [Optical illusion](https://en.wikipedia.org/wiki/Optical_illusion) , [Café Wall Illusion](https://www.illusionsindex.org/i/cafe-wall-illusion).


## Implementación y resultados

### Ilusion optica "Cafe wall"

Para esta demostración nos vamos a ocupar de la ilusión de “pared de la cafetería” o café wall. Esta es un tipo de ilusión óptico-geométrica, en la que líneas rectas paralelas  que dividien líneas entre filas formadas por baldosas blancas y negras alternas y escalonadas, aparentan estar inclinadas. Fue descrita por primera vez con el nombre de ilusión de la Guardería en 1898, y redescubierta en 1973 por Richard Gregory. La causa exacta que produce la ilusión no se conoce bien, aunque parece que se debe a interacciones entre las neuronas de la corteza visual que codifican la orientación. 

La explicacion del codigo como tal se puede ver [aqui](https://github.com/arthurfincham/optical_illusions/tree/master/cafe_wall) . El codigo en p5 para realizar el cafe wall se muestra a continuacion:

{{< expand >}}
```js
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
```
{{< /expand >}}


El resultado de este codigo se puede ver aqui abajo:


{{< p5-div sketch="/showcase/sketches/cafewall.js" >}}

## **Visual Phenomena**
### **Movimiento Iusorio, Ejemplo del Fenómeno Phi Inverso**
El movimiento ilusorio se produce debido a los efectos cognitivos de la interacción de los contrastes de color y la posición de la forma. Se basa en el hallazgo de que la corteza cerebral predice el movimiento visual para adaptar el comportamiento humano a los objetos circundantes que se mueven en tiempo real. Sin embargo, aún se desconocen los mecanismos subyacentes a estas ilusiones. Se ha sugerido que el movimiento percibido está causado por la diferencia en las señales neuronales y en la latencia de procesamiento de las señales de las distintas partes de una imagen. Supuestamente, las áreas de alto contraste se procesan más rápidamente que las de bajo contraste, donde el contraste se define globalmente en todo el campo receptivo de una neurona retiniana individual. El movimiento ilusorio se explica entonces como un ejemplo del fenómeno phi inverso, en el que si el patrón es cíclico, se creará una sensación de movimiento desde el estímulo oscuro hacia uno claro. De este modo, la diferente rotación y, por tanto, el posicionamiento del estímulo oscuro y del claro en la imagen conduce a la percepción de un movimiento diferente.

### **Descubrimiento del Fenómeno Phi**
Fue Max Wertheimer (1880-1943) quien describió por primera vez el llamado fenómeno phi en el campo de la ciencia. Lo hizo a través de un estudio titulado Experimental Studies on the Perception of Motion (1912) con el que asentar las bases de la psicología de la percepción.

Así, y como sucede en la mayor parte de los descubrimientos, la casualidad hizo que el doctor Wertheimer se encontrara un estroboscopio en una estación de tren. Tras ese curioso hallazgo se preguntó que creaba ese fascinante fenómeno. Sabía que aquel juego de figuras geométricas no estaba en movimiento. Sin embargo, sus ojos le decían que así era. Denominó a aquel hecho como fenómeno phi para diferenciarlo del fenómeno beta donde en este si existe un estímulo y capacidad real para moverse.

Max Wertheimer demostró que si mostramos una sucesión de imágenes estáticas a una velocidad concreta, nuestro cerebro lo interpreta como algo que está en movimiento, este fenómeno se relaciona a su vez con la persistencia retiniana. Este concepto se basa en la idea de que las imágenes se quedan ‘impresas’ en nuestra retina durante un pequeño fragmento de segundo. Si pasamos muchas imágenes ante el ojo humano de manera rápida, el cerebro no podrá diferenciar de manera aislada una figura de la otra, ello hace que acabe interpretando (de manera errónea) que se trata de un mismo objeto en movimiento.  
Cabe señalar que esta investigación de Max Wertheimer y su teoría del fenómeno phi contribuyó al desarrollo del cine, con los clásicos fotogramas sucediéndose uno tras otro.
Es importante destacar que el fenómeno Phi no fue una innovación de Max Wertheimer al mundo de la psicología científica. En realidad, dentro del campo de la fotografía ya se conocía este tipo de experiencia perceptiva. De hecho, uno de los exponentes más conocidos fue el fotógrafo británico Eadweard Muybridge (1830-1904), su trabajo fue innovador para su época. Estábamos en 1878 y Muybridge ya había inventado lo que denominó cronofotografía. Uno de sus trabajos más conocidos fue fotografiar los movimientos de un caballo y su jinete durante una carrera gracias al uso de 24 cámaras alineadas en la pista, tras obtener y revelar las imágenes, sabía que al exponerlas a una determinada velocidad generaba un movimiento real.

![Secuencia de fotos](/showcase/sketches/caballos.PNG)

### Ejemplo (puntos en movimiento)
He aqui un ejemplo del Fenómeno Phi Inverso
{{< details title="Código de Puntos en Movimiento" open=false >}}
{{< highlight html >}}
{{</* p5-global-iframe id="breath" width="625" height="625" >}}
    let angle = 0;
function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(50);
  for (let i = 50; i < width - 45; i += 50) {
    for (let j = 50; j < height - 45; j += 50) {

      push()
      fill(0, 168, 0);
      stroke(0, 0, 150);
      strokeWeight(3);
      ellipse(i, j, 25, 25);
      pop()

      push()
      translate(i, j);
      rotate(HALF_PI + i - angle * 3)
      stroke(0, 168, 168);
      strokeWeight(3);
      noFill();
      arc(0, 0, 30, 30, 0, PI)
      pop()

      push()
      translate(i, j);
      rotate(QUARTER_PI * j + angle * 4)
      stroke(0, 255, 255);
      strokeWeight(3);
      noFill();
      arc(0, 0, 25, 25, PI , 0)
      pop()

      angle += 0.0005

    }
  }
}
{{< /p5-global-iframe */>}}
{{< /highlight >}}
{{< /details >}}

Aqui se puede observar los resultados:

{{< p5-iframe sketch="/showcase/sketches/point_illusion.js" width="725" height="600" >}}

## Conclusiones y trabajo a futuro

Para concluir podemos ver la importancia de las ilusiones ópticas y de los fenómenos visuales como fenómenos útiles para cuestionar nuestros prejuicios de cómo es que percibimos la realidad y también para poder realizar nuevas preguntas en el campo de la filosofía de la mente, tambien sus aplicaciones practicas en la creacion de videos.
En un trabajo futuro se podría tratar de estudiar y recrear ilusiones ópticas a un nivel mas profundo. Como por ejemplo recrear una desde 0 o indagar acerca de los procesos mentales específicos que están ligados a una ilusión visual.  



