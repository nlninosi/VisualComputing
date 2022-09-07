# Illusions

## Definición del problema

Estudiar, poner en práctica y discutir las posibles aplicaciones de algunos fenómenos visuales e ilusiones ópticas conocidos.

## Sustento teórico

Una ilusión óptica es cualquier ilusión del sentido de la visión que nos lleva a percibir la realidad de varias formas. Puede ser de carácter fisiológico, asociada a los efectos de una estimulación anómala o excesiva en los ojos o el cerebro o de carácter cognitivo, en las que interviene nuestro conocimiento del mundo. Y por último están las ilusiones de tipo físico donde las propiedades físicas del entorno alteran nuestra capacidad de percibirlo de manera correcta. 

Para esta demostración nos vamos a ocupar de la ilusión de “pared de la cafetería” o café wall. Esta es un tipo de ilusión óptico-geométrica, en la que líneas rectas paralelas  que dividien líneas entre filas formadas por baldosas blancas y negras alternas y escalonadas, aparentan estar inclinadas. Fue descrita por primera vez con el nombre de ilusión de la Guardería en 1898, y redescubierta en 1973 por Richard Gregory. La causa exacta que produce la ilusión no se conoce bien, aunque parece que se debe a interacciones entre las neuronas de la corteza visual que codifican la orientación. 
Esta ilusión es interesante porque es relevante para los debates sobre la modularidad, la penetración cognitiva y la naturaleza de la experiencia. Esto que quiere decir: según la hipótesis de que la mente es modular, un módulo mental es una especie de departamento semiindependiente de la mente que se ocupa de determinados tipos de entradas, y da determinados tipos de salidas, y cuyo funcionamiento interno no es accesible a la conciencia de la persona, todo lo que se puede acceder son los resultados producidos por el módulo. En el caso del café wall, una forma estándar de explicar por qué la experiencia de la ilusión persiste, aunque uno sepa que está experimentando una ilusión es que el módulo, o los módulos, que constituyen el sistema visual son "cognitivamente impenetrables" hasta cierto punto, es decir, que su funcionamiento interno y sus resultados no pueden ser influenciados por la conciencia.

Fuentes: [Optical illusion](https://en.wikipedia.org/wiki/Optical_illusion) , [Café Wall Illusion](https://www.illusionsindex.org/i/cafe-wall-illusion).


## Implementación y resultados

### Ilusion optica "Cafe wall"

La explicacion del coidgo como tal se puede ver [aqui](https://github.com/arthurfincham/optical_illusions/tree/master/cafe_wall) . El codigo en p5 para realizar el cafe wall se muestra a continuacion:

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


## Conclusiones y trabajo a futuro

Para concluir podemos ver la importancia de las ilusiones ópticas y de los fenómenos visuales como fenómenos útiles para cuestionar nuestros prejuicios de cómo es que percibimos la realidad y también para poder realizar nuevas preguntas en el campo de la filosofía de la mente.
En un trabajo futuro se podría tratar de estudiar y recrear ilusiones ópticas a un nivel mas profundo. Como por ejemplo recrear una desde 0 o indagar acerca de los procesos mentales específicos que están ligados a una ilusión visual.  

