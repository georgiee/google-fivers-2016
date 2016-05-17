vec3 steerToArrive(vec3 target, vec3 position, vec3 velocity, float max_speed){
  float slowing_distance = 2.0;

  vec3 target_offset = target - position;
  float distance = length (target_offset);
  float ramped_speed = max_speed * (distance / slowing_distance);
  float clipped_speed = min (ramped_speed, max_speed);
  
  vec3 desired_velocity = (clipped_speed / distance) * target_offset;
  vec3 steering = desired_velocity - velocity;

  return steering;
}

#pragma glslify: export(steerToArrive)