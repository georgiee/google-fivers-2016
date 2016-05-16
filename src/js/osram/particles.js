import THREE from 'three'
import ParticleShader from './shaders/particles';

const particleShader = ParticleShader.create();
//particleShader.uniforms.uAlpha.value = 1.0;
particleShader.uniforms.uPointSize.value = 2.5;

export default class Particles extends THREE.Points{
  constructor(size){
    super(new ParticlesGeometry(size), particleShader);
  }

  update(positions, time){
    var uniforms = this.material.uniforms;

    uniforms.tPos.value = positions;
    uniforms.uTime.value = time;
  }
}


class ParticlesGeometry extends THREE.BufferGeometry{
  constructor(size){
    super();
    this.generate(size);
  }
  
  generate(size){
    var ATTR_WIDTH = 3;

    var geo = new THREE.BufferGeometry();
    var pos = new Float32Array(size*size*ATTR_WIDTH);
    
    for (var x=0; x < size; x++){
      for (var y=0; y < size; y++) {
        var idx = x + y*size;

        pos[ATTR_WIDTH * idx]   = (x + 0.5) / size;       // +0.5 to be at center of texel
        pos[ATTR_WIDTH * idx+1] = (y + 0.5) / size;
        pos[ATTR_WIDTH * idx+2] = idx / ( size*size );    // extra: normalized id
      }  
    }
    
    this.addAttribute("position", new THREE.BufferAttribute(pos, ATTR_WIDTH));
    return geo;
  }
}
