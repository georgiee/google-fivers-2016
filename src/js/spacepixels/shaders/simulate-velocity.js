import THREE from 'three';

import hmr from 'three-hmr';
const cache = hmr.cache(__filename)
const glslify = require('glslify')

const vertexShader = glslify('./source/simulate-velocity.vert')
const fragmentShader = glslify('./source/simulate-velocity.frag')

const uniforms = {
  time: { type: "f", value: 1.0 },
  delta: { type: "f", value: 0.0 },
  "uInputPos": { type: "v3", value: new THREE.Vector3() },
  "uInputVelocity": { type: "v3", value: new THREE.Vector3(1,0,0) },
  texturePosition: { type: "t", value: null },
  textureTargetPosition: { type: "t", value: null },
  textureVelocity: { type: "t", value: null },
}

function create(){
  const material = new THREE.ShaderMaterial({
    vertexShader, fragmentShader,
    uniforms: THREE.UniformsUtils.clone(uniforms)
  })
  
  hmr.enable(cache, material)

  return material;
};

export default {
  create
}


if (module.hot) {
  module.hot.accept(err => {
    if (err) throw errr
  })
  hmr.update(cache, {
    vertexShader, fragmentShader
  })
}
