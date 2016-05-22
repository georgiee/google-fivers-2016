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
uniform vec3 uInputPos;
uniform vec3 uInputVelocity;
varying vec2 vUv;
uniform vec3 uTargetPosition;


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

#define EQUALS(A,B) ( abs((A)-(B)) < EPS )
#define EQUALSZERO(A) ( ((A)<EPS) && ((A)>-EPS) )

#define MAX_SPEED 200.0

void main() {
  float decay = 0.99;
  float mass = 1.0;

  vec3 currentPosition = texture2D( texturePosition, vUv ).xyz;
  vec3 currVelocity = texture2D( textureVelocity, vUv ).xyz;
  vec4 targetPosition = texture2D( textureTargetPosition, vUv );

  vec3 accel = vec3(0.0);
  
  vec3 targetPoint;
  vec3 steering_force = vec3(0.0);

  #ifdef MODE_FLAG_NOISE
    accel += 0.1 * noise(currentPosition);
  #endif

  #ifdef MODE_FLAG_RANDOM
    accel += noise(currentPosition + vec3(vUv, 1.0)) * 0.2;
  #endif

  
  

  //targetPoint = tunnel(vUv, time);
  //steering_force = steerToSeek(targetPoint, currentPosition, currVelocity, 12.3, 1.5);
  //accel += steering_force / mass;
  #ifdef MODE_FLAG_INPUT
    if(length(uInputVelocity) > 0.0 ){
      steering_force = -1.0 * steerToSeek(uInputPos, currentPosition, currVelocity, 5.0, 3.0);
      accel += steering_force / mass;  
    }
    
  #endif

  #ifdef MODE_FLAG_FOLLOWPOINT
    float distance = length(uTargetPosition - currentPosition );
    
    steering_force = 1.0 * steerToSeek(uTargetPosition, currentPosition, currVelocity, 5.0, 0.5);
      accel += steering_force / mass;   
      accel += noise(currentPosition + vec3(vUv, 1.0)) * 0.5;
    
    
  #endif

  #ifdef MODE_FLAG_TEXT
    
    if(targetPosition.a > 0.0){
      targetPoint = targetPosition.xyz;
      steering_force = steerToSeek(targetPoint, currentPosition, currVelocity, 1.0, 1.0);
    }else{
      steering_force = s_galaxy_force(vUv, time, currentPosition, currVelocity);
    }

    accel += steering_force / mass;

  #endif

  #ifdef MODE_FLAG_PLOTTER
    targetPoint = targetPosition.xyz;
    float distanceTo = length(targetPoint - currentPosition);
    if(targetPosition.a == 1.0 && !EQUALSZERO(distanceTo)){//only points with a=1 are 'activated' and part of the current model

      steering_force = steerToSeek(targetPoint, currentPosition, currVelocity, 5.0, 1.0);
      //steering_force = vec3(0.0);
    }else{
      //non involved points get some noise
      steering_force = noise(currentPosition + vec3(vUv, 1.0)) * 0.5;
      //steering_force = steerToSeek(targetPoint, currentPosition, currVelocity, 1.0, 1.0);
    }
    //steering_force = noise( vec3(vUv, 1.0)) * 0.5;
    accel += steering_force / mass;

  #endif


  #ifdef MODE_FLAG_GALAXY
    steering_force = s_galaxy_force(vUv, time, currentPosition, currVelocity);
    accel += steering_force / mass;
  #endif
  
  

  vec3 velocity = decay * currVelocity + accel * delta;
  if(length(velocity) > MAX_SPEED){
    //velocity = normalize(velocity) * MAX_SPEED;
  }
  //velocity = vec3(0.0);
  
  
  gl_FragColor = vec4(velocity, 1.0 );
}