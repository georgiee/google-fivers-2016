#define M_PI    3.14159265358979323846264338327950
#define M_2PI   6.28318530717958647692528676655900
#define M_PI2   1.57079632679489661923132169163975

#define EPS     0.0001

#define EQUALS(A,B) ( abs((A)-(B)) < EPS )
#define EQUALSZERO(A) ( ((A)<EPS) && ((A)>-EPS) )

varying vec3 vColor;
varying vec3 vPos;

uniform float uTime;
uniform float uAlpha;


vec3 tunnel(vec2 coord, float time){
    float i0=1.0;
    float i1=1.0;
    float i2=1.0;
    float i4=0.0;
    
    for(int s=0;s<7;s++)
    {
      vec2 r;
      r=vec2(cos(coord.y*i0-i4+time/i1),sin(coord.x*i0-i4+time/i1))/i2;
          r+=vec2(-r.y,r.x)*0.3;
      coord.xy+=r;
          
      i0*=1.93;
      i1*=1.15;
      i2*=1.7;
      i4+=0.05+0.1*time*i1;
    }
    
    float r=sin(coord.x-time)*0.5+0.5;
    float b=sin(coord.y+time)*0.5+0.5;
    float g=sin((coord.x+coord.y+sin(time*0.5))*0.5)*0.5+0.5;
  
    return vec3(r,g,b);
}

void main() {

    //draw a round point derived from the default recatangle shape of the point
    float dist = distance( vec2(0.5,0.5), gl_PointCoord );
    
    if(dist > 0.5){
      discard;
    }

    float alpha = 1.0 - dist/0.5; //normalize to 1
    alpha = 1.0 - dist;

    //vec2 tmpCoord = vec2(0.5 * cos(M_2PI*gl_PointCoord.x+M_PI) + 0.5, 0.5 * cos(M_2PI*gl_PointCoord.y+M_PI) + 0.5);
    
    // calc alpha for shape
    vec2 tmpCoord = 0.5 * cos(M_2PI*gl_PointCoord+M_PI) + 0.5;
    alpha = tmpCoord.x * tmpCoord.y;

    //vec3 color = tunnel(uv, uTime);
    gl_FragColor = vec4(vColor, uAlpha * alpha);
}