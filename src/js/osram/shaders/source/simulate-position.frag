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

  //gl_FragColor = vec4( tmpPos2.xyz , 1.0 );




  vec3 newPosition =  position + velocity * delta;

  #ifdef MODE_FLAG_IMMEDIATE
    vec4 targetPosition = texture2D( textureTargetPosition, vUv );
    
    if(targetPosition.a > 0.0){
      newPosition = targetPosition.xyz;
    }
  #endif  
  
  gl_FragColor = vec4( newPosition , 1.0 );

}
