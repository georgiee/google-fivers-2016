vec3 s_plane_point(vec2 vUv, vec3 currPos, float size){
  vec2 coords = vUv * 2.0 - 1.0;
  vec3 targetPos = vec3(coords.x, 0.0, coords.y);
  targetPos *= size;
  return targetPos;
}

#pragma glslify: export(s_plane_point)
