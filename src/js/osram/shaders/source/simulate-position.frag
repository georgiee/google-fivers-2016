uniform float time;
uniform float delta;
uniform sampler2D texturePosition;
uniform sampler2D textureVelocity;
uniform sampler2D textureTargetPosition;

varying vec2 vUv;

import noise from './curl-noise';

void main() {

  vec4 tmpPos = texture2D( texturePosition, vUv );
  vec3 position = tmpPos.xyz;
  vec3 velocity = texture2D( textureVelocity, vUv ).xyz;

  //vec4 tmpPos2 = texture2D( textureTargetPosition, vUv );
  //gl_FragColor = vec4( tmpPos2.xyz , 1.0 );

  gl_FragColor = vec4( position + velocity * delta , 1.0 );

}
