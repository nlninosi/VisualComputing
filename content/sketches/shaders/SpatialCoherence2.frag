precision mediump float;


uniform sampler2D source;

uniform vec2 uScale;

varying vec2 texcoords2;

void main() {

  //vec2 uv = texcoords2*uScale;

  // This is the formula for pixellation of uvs
  //vec2 pixelUv = floor(uv * uScale) / uScale;
  
  // Plug it into texture2d
  //vec4 color = texture2D(source, pixelUv);
  
  // Send the color to the screen
  vec2 stepCoord = texcoords2 * uScale;
    // ii. remap stepCoord in [0.0, resolution] ∈ Z
    // see: https://thebookofshaders.com/glossary/?search=floor
    stepCoord = floor(stepCoord);
    stepCoord = stepCoord / uScale;
  gl_FragColor = texture2D(source, stepCoord);
}