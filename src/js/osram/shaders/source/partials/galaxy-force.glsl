import rand from './rand';

#define SPEED     5.0
#define EPS     0.1
#define K_NOISE_ACCEL 0.1

#define M_PI    3.14159265358979323846264338327950
#define M_2PI   6.28318530717958647692528676655900
#define M_PI2   1.57079632679489661923132169163975


#define K_NUM_ARMS 7.0
#define K_HEIGHT 0.5
#define K_SPIN_SPEED 0.25

#define K_NOISE_ACCEL 0.1

import steerToArrive from './steer-arrive';
import steerToSeek from './steer-seek';


vec3 s_galaxy_force(vec2 coords, float time, vec3 currentPosition, vec3 currVelocity){
  // cylindrical coords
  float radius = coords.y;
  float theta = coords.x * M_2PI;

  float randVal = rand(vec2(theta, radius));

  // jitter coords
  radius += randVal * 0.5;
  theta += randVal * 0.5;

  float radialArms = sin(K_NUM_ARMS * theta);

  float taperComponent = cos(0.6*radius*M_PI/2.0);
  taperComponent *= taperComponent;
  float heightParam = K_HEIGHT                              // height constant
                    * (rand(vec2(radius, theta))-0.5)   // provide unit thickness with rand
                    * taperComponent;                 // taper along radius using cosine curve

  float spinParam = theta                   // angle parameter
                  + radius*radius           // twist at rate r^2
                  - K_SPIN_SPEED * time;   // spin at constant speed

  vec3 targetPos = vec3(
      radius * sin(spinParam),
      heightParam,
      radius * cos(spinParam)
  );
  targetPos *= 1.0;

  float ratio = randVal * (radialArms/2.0+0.5);
  vec3 steering_force = steerToArrive(targetPos, currentPosition, currVelocity);

  steering_force = steering_force * ratio;
  //steering_force = steering_force + noise(currentPosition) * K_NOISE_ACCEL;
  
  return steering_force;

  /*
  
  /vec3 toTarget = targetPos - currPos;
  float toTargetLength = length(toTarget);
  accel += uShapeAccel * toTarget/toTargetLength
      * (radialArms/2.0+0.5)  // gravity stronger in arms
      * randVal;    // randomize gravity prevents banding
  */
}


#pragma glslify: export(s_galaxy_force)