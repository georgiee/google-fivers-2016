#define SPEED     5.0
#define EPS     0.1
#define K_NOISE_ACCEL 0.1

#define M_PI    3.14159265358979323846264338327950
#define M_2PI   6.28318530717958647692528676655900
#define M_PI2   1.57079632679489661923132169163975

#define EQUALS(A,B) ( abs((A)-(B)) < EPS )
#define EQUALSZERO(A) ( ((A)<EPS) && ((A)>-EPS) )

uniform float time;
uniform float delta;
uniform sampler2D textureVelocity;
uniform sampler2D texturePosition;
uniform sampler2D textureTargetPosition;
varying vec2 vUv;



import noise from './curl-noise';
import s_plane_point from './partials/plane';

import s_galaxy_force from './partials/galaxy-force';

import rand from './partials/rand';
import steerToArrive from './partials/steer-arrive';
import steerToSeek from './partials/steer-seek';




#define Z_SCALE 0.01
#define SPEED_IN 0.5
#define SPEED_ROTATE 0.25
#define ROTATE_MAGNITUDE 0.5

// http://xona.com/colorlist/
#define FADE_COLOR vec3(0.125, 0.25, 0.5)
#define FADE_POWER 1.0




#define MAX_SPEED 2.0

void main() {
  float decay = 0.99;
  float mass = 1.0;

  vec3 currentPosition = texture2D( texturePosition, vUv ).xyz;
  vec3 currVelocity = texture2D( textureVelocity, vUv ).xyz;
  vec4 targetPosition = texture2D( textureTargetPosition, vUv );

  vec3 accel = vec3(0.0);
  
  vec3 targetPoint;
  vec3 steering_force;

  #ifdef MODE_FLAG_NOISE
    accel += 0.1 * noise(currentPosition);
  #endif

  #ifdef MODE_FLAG_RANDOM
    accel += noise(currentPosition + vec3(vUv, 1.0)) * 0.2;
  #endif

  
  //targetPoint = tunnel(vUv, time);
  //steering_force = steerToSeek(targetPoint, currentPosition, currVelocity, 12.3, 1.5);
  //accel += steering_force / mass;

  #ifdef MODE_FLAG_TARGET
    
    if(targetPosition.a > 0.0){

      targetPoint = targetPosition.xyz;
      steering_force = steerToSeek(targetPoint, currentPosition, currVelocity, 2.3, 1.5);
      steering_force += 0.1 * noise(currentPosition);
    
    }else{
      targetPoint = s_plane_point(vUv, currentPosition, 2.0);//a plane
      steering_force = steerToArrive(targetPoint, currentPosition, currVelocity);
    }

    accel += steering_force / mass;

  #endif

  #ifdef MODE_FLAG_GALAXY
    steering_force = s_galaxy_force(vUv, time, currentPosition, currVelocity);
    accel += steering_force / mass;
  #endif
  
  

  vec3 velocity = decay * currVelocity + accel * delta;
  
  if(length(velocity) > MAX_SPEED){
    velocity = normalize(velocity) * MAX_SPEED;
  }
  
  
  gl_FragColor = vec4(velocity, 1.0 );
}