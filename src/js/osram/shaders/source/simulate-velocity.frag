#define M_PI    3.14159265358979323846264338327950
#define M_2PI   6.28318530717958647692528676655900
#define M_PI2   1.57079632679489661923132169163975

#define EQUALS(A,B) ( abs((A)-(B)) < EPS )
#define EQUALSZERO(A) ( ((A)<EPS) && ((A)>-EPS) )

#define SPEED     5.0
#define EPS     0.1
#define K_NOISE_ACCEL 0.1

uniform float time;
uniform float delta;
uniform sampler2D textureVelocity;
uniform sampler2D texturePosition;
uniform sampler2D textureTargetPosition;
varying vec2 vUv;



import noise from './curl-noise';


vec3 s_sphere(vec2 vUv, vec3 currPos, float size) {
  vec3 accel = vec3(0.0);
  float uShapeAccel = 5.0;
  vec2 coords  =  vUv;
  coords.x = coords.x * M_2PI - M_PI;
  coords.y = coords.y * M_PI;

  vec3 sphereCoords = vec3(
      sin(coords.y) * cos(coords.x),
      cos(coords.y),
      sin(coords.y) * sin(coords.x)
  );
  vec3 targetPos = sphereCoords;// * rand(vUv);
  targetPos *= size;
  //targetPos = targetPos + vec3(21.0,0.0,0.0);
  vec3 toTarget = targetPos - currPos;
  float toTargetLength = length(toTarget);
  if (!EQUALSZERO(toTargetLength))
      accel += uShapeAccel * toTarget/toTargetLength;

  return accel;
}

vec3 s_plane(vec2 vUv, vec3 currPos, float size){
  float uShapeAccel = 5.0;
  vec3 accel = vec3(0.0);

   vec2 coords = vUv * 2.0 - 1.0;
    vec3 targetPos = vec3(coords.x, 0.0, coords.y);
    targetPos *= size;

    
    vec3 toTarget = targetPos - currPos;
    float toTargetLength = length(toTarget);
    if (!EQUALSZERO(toTargetLength))
        accel += uShapeAccel * toTarget/toTargetLength;
    
    //noise
    //accel += 0.2 * uShapeAccel * noise(currPos);

    return accel;
}


vec3 steerToSeek(vec3 target, vec3 position, vec3 velocity){
  float maxSpeed = 1.0;
  float maxForce = 1.0;

  vec3 desiredVelocity = normalize(target - position) * maxSpeed; //desired velocity
  vec3 seekForce = normalize(desiredVelocity - velocity) * maxForce; //resulting steering force
  
  return seekForce;
}

highp float random(vec2 co)
{
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

vec3 wandering(vec3 position, vec3 velocity){
  vec3 randomPoint = noise(position);
  vec3 target = randomPoint * 5.0;
  
  vec3 force = steerToSeek(target, position, velocity);

  return force;
}

vec3 moveto(vec3 targetCol, vec3 currPos){
  vec3 toTarget = targetCol.rgb - currPos;
  float toTargetLength = length(toTarget);
  
  vec3 force = vec3(0.0);
  
  if (!EQUALSZERO(toTargetLength))
    force = toTarget/toTargetLength;
  
  return force;
}

void main() {
  float decay = 0.99;

  vec3 currPos = texture2D( texturePosition, vUv ).xyz;
  vec3 currVelocity = texture2D( textureVelocity, vUv ).xyz;
  vec4 targetPosition2 = texture2D( textureTargetPosition, vUv );
  vec3 targetPosition = targetPosition2.xyz;

  vec3 accel = vec3(0.0);

  //accel += decay * delta * s_sphere(vUv, currPos, 2.0);
  //accel = decay * delta * s_plane(vUv, currPos, 2.0);
  
  

  //accel += K_NOISE_ACCEL * noise(currPos) * delta;

    accel += K_NOISE_ACCEL * noise(currPos) * delta;
 

  //accel += steerToSeek(targetPosition, currPos, currVelocity) * delta;
  
  vec3 velocity = decay * currVelocity + accel;

  //velocity = currVelocity + accel;

  //velocity = vec3(0.0);
  if(length(velocity) > 0.5){
    //velocity = normalize(velocity) * 0.5;
  }
  
  gl_FragColor = vec4(velocity, 1.0 );
}
//https://github.com/pkmital/CEMA/blob/master/020-3d-boids/src/boid.cpp
