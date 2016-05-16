import THREE from 'three';

import hmr from 'three-hmr';
const cache = hmr.cache(__filename)

const glslify = require('glslify')
const vertexShader = glslify('./source/pass-through.vert')
const fragmentShader = glslify('./source/pass-through.frag')

const uniforms = {
  time: { type: "f", value: 1.0 },
  texture: { type: "t", value: null },
  oldTexture: { type: "t", value: null }
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
