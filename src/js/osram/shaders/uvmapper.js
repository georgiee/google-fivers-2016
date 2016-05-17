import THREE from 'three';
import hmr from 'three-hmr';

const cache = hmr.cache(__filename)
const glslify = require('glslify')

const vertexShader = glslify('./source/uvmap.vert')
const fragmentShader = glslify('./source/uvmap.frag')

const uniforms = {
  scale: { type: "f", value: 1.0 }
}


function create(){
  const material = new THREE.ShaderMaterial({
    vertexShader, fragmentShader,
    uniforms: THREE.UniformsUtils.clone(uniforms)
  })

  material.side = THREE.DoubleSide;
  material.blending = THREE.NoBlending;
  material.depthTest = false;
  material.depthWrite = false;
  material.morphTargets = true;
  
  hmr.enable(cache, material)
  return material;
};

export default  { create }

if (module.hot) {
  module.hot.accept(err => {
    if (err) throw errr
  })
  hmr.update(cache, {
    vertexShader, fragmentShader
  })
}
