vec3 steerToSeek(vec3 target, vec3 position, vec3 velocity, float maxSpeed, float maxForce){
  vec3 desiredVelocity = normalize(target - position) * maxSpeed; //desired velocity
  vec3 steering = normalize(desiredVelocity - velocity) * maxForce; //resulting steering force
  
  return steering;
}

#pragma glslify: export(steerToSeek)