vec3 s_spiral(vec2 coord, float time){
   // cylindrical coords
    float radius = coord.y;
    float theta = coord.x * M_2PI;

    // outward spiral function
    radius *= M_PI;

    vec3 targetPos = vec3(
        radius * sin(theta),
        radius*radius * sin(4.0*theta + sin(3.0*M_PI*radius+time/2.0)) / 10.0,
        radius * cos(theta)
    );

    return targetPos;
}



#pragma glslify: export(s_spiral)