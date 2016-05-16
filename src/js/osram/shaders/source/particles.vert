#define M_PI    3.14159265358979323846264338327950
#define M_2PI   6.28318530717958647692528676655900
#define M_PI2   1.57079632679489661923132169163975

#define EPS     0.0001

#define EQUALS(A,B) ( abs((A)-(B)) < EPS )
#define EQUALSZERO(A) ( ((A)<EPS) && ((A)>-EPS) )


#define PS_CAM_MAX_DIST 12.0

varying vec3 vColor;

uniform sampler2D tPos;
uniform float uTime;
uniform float uPointSize;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uColorFreq;
uniform float uColorSpeed;

//varying float vPointSize;

void main() {
    vColor = mix(uColor1, uColor2, sin(uColorSpeed*uTime + uColorFreq*position.z*M_2PI)/2.0+0.5);
    vec3 pos = texture2D(tPos, position.xy).rgb;
    
    vec3 camToPos = pos - cameraPosition;
    float camDist = length(camToPos);

    gl_PointSize = max(uPointSize * PS_CAM_MAX_DIST/camDist, 1.0);
    //vPointSize = max(uPointSize * PS_CAM_MAX_DIST/camDist, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}


/*



void main() {
    vColor = mix(uColor1, uColor2, sin(uColorSpeed*uTime + uColorFreq*position.z*M_2PI)/2.0+0.5);
    float ratio = 1.0 - pow(abs(position.z), 1.0);
    vColor = mix(uColor1, uColor2, ratio);

    vec3 pos = texture2D(tPos, position.xy).rgb;
    pos.y = -2.5 + (1.0 - pow(abs(position.z - 0.5), 1.0)) * 5.0;

    vec3 camToPos = pos - cameraPosition;
    float camDist = length(camToPos);

    gl_PointSize = max(uPointSize * PS_CAM_MAX_DIST/camDist, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

*/