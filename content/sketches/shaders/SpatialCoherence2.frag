precision mediump float;


uniform sampler2D source;

uniform vec2 uScale;

varying vec2 texcoords2;

uniform bool original;

void main() {
  if (original) {
    gl_FragColor = texture2D(source, texcoords2);
  }
  else{
    vec2 stepCoord = texcoords2 * uScale;
    stepCoord = floor(stepCoord);
    stepCoord = stepCoord / uScale;
    gl_FragColor = texture2D(source, stepCoord);
  }
}