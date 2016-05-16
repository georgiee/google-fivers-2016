uniform float time;
uniform sampler2D texture;
uniform sampler2D oldTexture;

varying vec2 vUv;

void main() {
  vec4 color = texture2D( texture, vUv );
  
  if(color.w == 0.0){
    //discard;
    //color = texture2D( oldTexture, vUv ); //dont update then
  }

  gl_FragColor = vec4( color.xyz, 1.0 );
}