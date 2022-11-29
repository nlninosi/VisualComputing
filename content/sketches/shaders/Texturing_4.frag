precision mediump float;

// uniforms are defined and sent by the sketch
uniform sampler2D texture;
uniform bool lum;
uniform bool val;
uniform bool greyscale;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
float luma(vec3 texel) {
  if(lum){
    float max = 0.0;
    float min = 0.0;
    if ( texel.r > texel.g && texel.r > texel.b){
      max = texel.r;
    } else if (texel.g > texel.r && texel.g > texel.b){
      max = texel.g;
    } else if (texel.b > texel.r && texel.b > texel.g) {
      max = texel.b;
    }
    if ( texel.r < texel.g && texel.r < texel.b){
      min = texel.r;
    } else if (texel.g < texel.r && texel.g < texel.b){
      min = texel.g;
    } else if (texel.b < texel.r && texel.b < texel.g) {
      min = texel.b;
    }
    return max * 0.5 + min * 0.5 + 0.1;
  }
  if(val){
    if ( texel.r > texel.g && texel.r > texel.b){
      return texel.r * 1.0 + 0.1;
    } else if (texel.g > texel.r && texel.g > texel.b){
      return texel.g * 1.0 + 0.1;
    } else if (texel.b > texel.r && texel.b > texel.g) {
      return texel.b * 1.0 + 0.1;
    }
  }
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = greyscale ? vec4((vec3(luma(texel.rgb))), 1.0) : texel;
}