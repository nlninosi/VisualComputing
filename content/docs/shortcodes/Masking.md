# Masking

## Definición del problema



## Sustento teórico

## Que es el Masking?

Uno de los procedimientos experimentales más destacados para manipular la conciencia es el enmascaramiento visual, en el que se disminuye la visibilidad de un estímulo objetivo presentándolo en estrecha proximidad espacial y temporal con una denominada "máscara". Por ejemplo, si se presenta una imagen objetivo solamente durante períodos breves, normalmente se puede percibir sin esfuerzo. Sin embargo, si la imagen objetivo breve es seguida inmediatamente por una segunda imagen consistente en una disposición de líneas y patrones aleatorios, su visibilidad se reduce considerablemente. Este fenómeno se conoce como enmascaramiento hacia atrás y la imagen de la máscara se conoce como máscara de patrón. El enmascaramiento visual se ha utilizado con frecuencia para estudiar los correlatos neurales de la conciencia. El enmascaramiento visual que implica tanto factores espaciales (patrones o formas) como temporales (duraciones de los patrones e intervalos entre estímulos) suele dividirse en dos tipos, en función de las relaciones espaciales que existen entre los contornos de los patrones objetivo y los de la máscara. El enmascaramiento que implica la superposición espacial de contornos (aunque estos contornos puedan estar separados en el tiempo) se denomina comúnmente enmascaramiento de patrones. 

### ¿Qué es una máscara de convolución?

Con el fin de realizar un procesamiento del color que poseen las imágenes digitales, se hace uso de la convolución. Esta se define como el proceso de añadir cada elemento de la imagen a sus vecinos locales, luego de ser operados por un kernel. Esta operación no es una operación corriente de multiplicación de matrices, sino que se define de la siguiente manera:

{{< katex display >}}
(\begin{bmatrix}
a & b & c\\
d & e & f\\
g & h & i\\
\end{bmatrix}
*
\begin{bmatrix}
1 & 2 & 3\\
4 & 5 & 6\\
7 & 8 & 9\\
\end{bmatrix})
[2, 2] = 
(i \cdot 1) +
(h \cdot 2) +
(g \cdot 3) +
(f \cdot 4) +
(e \cdot 5) +
(d \cdot 6) +
(c \cdot 7) +
(b \cdot 8) + 
(a \cdot 9)
{{< /katex >}}

Tenemos que la matriz de la derecha es nuestro kernel, la de la izquierda es una porción de la imagen, la operación seria invertir alguna de las dos matrices (normalmente suele ser el kernel). Arriba se hace un ejemplo rápido para las coordenadas {{< katex >}}[2, 2]{{< /katex >}}

Generalmente podríamos hablar que en términos de sumatorias, la convolución se describe como:

{{< katex display >}}
\begin{bmatrix}
x_{11} & x_{12} & \cdots & x_{1n}\\
x_{21} & x_{22} & \cdots & x_{21}\\
\vdots & \vdots & \ddots & \vdots\\
x_{n1} & x_{n3} & \cdots & x_{mn}\\
\end{bmatrix}
*
\begin{bmatrix}
y_{11} & y_{12} & \cdots & y_{1n}\\
y_{21} & y_{22} & \cdots & y_{21}\\
\vdots & \vdots & \ddots & \vdots\\
y_{n1} & y_{n3} & \cdots & y_{mn}\\
\end{bmatrix}
=
\sum_{i=0}^{m-1}\sum_{i=0}^{n-1}x_{(m-i)(n-j)} \cdot y_{(1-i)(1-j)}
{{< /katex >}}



## Implementación de la convolución

Vamos a explicar la implementacion con el filtro de difumindao gaussiano. Empezamos por revisar la función que genera el kernel, la cual recibe un tamaño del kernel, un sigma y una constante multiplicativa {{< katex >}}k{{< /katex >}}. En esta ocasión los valores serán de 11, 11 y 1 respectivamente. La función se basa en esta [implementación](https://www.geeksforgeeks.org/gaussian-filter-generation-c/).

{{< expand >}}
```js
function gaussKernel(size, sigma, k) {
    let value = 0.0;   
    let kernel = [...Array(size)].map(e => Array(size).fill(value));
    let sum = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let x = i - (size - 1) / 2.0;
            let y = j - (size - 1) / 2.0;
            kernel[i][j] = k * Math.exp(((Math.pow(x, 2) + Math.pow(y, 2)) / ((2 * Math.pow(sigma, 2)))) * (-1));
            sum += kernel[i][j];
        }
    }
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            kernel[i][j] /= sum;
        }
    }
    return kernel;
}
```
{{< /expand >}}

Ahora procedemos a cargar la imagen y preparar la para aplicarle el efecto.

{{< expand >}}
```js
let img;
p.preload = function () {
    img = p.loadImage('/showcase/assets/1.jpg');
}
p.setup = function () {
    p.createCanvas(700, 500);
    p.image(img, 0, 0);   
    gaussFilter();
}
p.draw = function () {
    p.image(img, 0, 0);
    img.resize(700, 500);
}
```
{{< /expand >}}

Ahora si, la implementación de la convolución plantea que se deban recorrer cada uno de los píxeles de los canales presentes en la imagen (en este caso, son cuatro: Red, Green, Blue, Alpha) y estos multiplicarlos con los valores que se encuentran en el kernel gaussiano que tengamos creado, para luego de haber hecho esto, se actualicen los valores de la imagen.

Para esto implementamos una función gaussFilter() que cargue el arreglo de pixeles y los envíe a la función convolution(), para luego poder modificar los valores en la imagen.

{{< expand >}}
```js
function gaussFilter() {
    img.loadPixels();
    let sigma = 11;
    let matrix = gaussKernel(11, sigma, 1);
    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
            let c = convolution(x, y, matrix, img);
            let loc = (y * img.width + x) * 4;
            img.pixels[loc] = p.red(c);
            img.pixels[loc + 1] = p.green(c);
            img.pixels[loc + 2] = p.blue(c);
            img.pixels[loc + 3] = 255; 
        }
    }
    img.updatePixels();
}
```
{{< /expand >}}

Ahora en la función convolution(), la cual recibe las posiciones de los arreglos de los pixeles a modificar, el kernel como una matriz y la imagen para poder obtener los valores a retornar de los pixeles ya con el efecto aplicado.

{{< expand >}}
```js
function convolution(x, y, matrix, img) {
    let rTotal = 0.0;
    let gTotal = 0.0;
    let bTotal = 0.0;
    let h = Math.floor(matrix.length / 2);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            let xloc = (x + i - h);
            let yloc = (y + j - h);
            let loc = (img.width * yloc + xloc) * 4;
            if (xloc > 0 && xloc < img.width && yloc > 0 && yloc < img.height) {
                rTotal += (img.pixels[loc]) * matrix[i][j];
                gTotal += (img.pixels[loc + 1]) * matrix[i][j];
                bTotal += (img.pixels[loc + 2]) * matrix[i][j];
            }
        }
    }
    return p.color(rTotal, gTotal, bTotal);
}
```
{{< /expand >}}


<!-- 
{{< p5-div sketch="../../../sketches/scintillating.js" >}} -->

{{< tabs "convolution" >}}

{{< tab "Imagen base" >}} 

# Imagen sin aplicar efecto
Esta es la imagen sin aplicar ningún efecto, tan solo se redimensionó para efectos de visualización. 

![IMAGEN](/showcase/assets/1.jpg)
{{< /tab >}}

{{< tab "Implementación de filtro blur" >}} 

{{< p5-div sketch="/showcase/sketches/softwareConvolution.js" >}}
{{< /tab >}}

{{< tab "Implementación de filtro gray" >}} 

{{< p5-div sketch="/showcase/sketches/hardwareConvolution.js" >}}
{{< /tab >}}

{{< tab "Implementación de filtro threshold" >}} 

{{< p5-div sketch="/showcase/sketches/THRESHOLD.js" >}}
{{< /tab >}}

{{< /tabs >}}

### Conclusiones y trabajo futuro

Como conclusión podemos ver la utilidad que tienen la herramienta de masking para la edición de imágenes y video, también pudimos ver la relevancia de los histogramas, pues estos son de gran utilidad. Tambien podemos concluir que la aplicación de una máscara a través de la implementación de una convolución sobre una imagen digital es realizable, fácil de comprender matemáticamente, pero que es posible que requiera de una implementación paralela para poder obtener valores de forma más rápida. También es importante recalcar que si la imagen posee una alta calidad, el efecto del difuminado no se aplica del todo bien, lo que nos deja con ventaja en la implementación manual de la convolución al poder graduar por medio de los valores del efecto

En futuros trabajos se puede indagar que tan factible es una implementación paralela de esta función mediante p5.js, sin necesidad de entrar directamente a codificar a bajo nivel con lenguajes como c++ y haciendo uso de CUDA.