import THREE from 'three';

import hmr from 'three-hmr';
const cache = hmr.cache(__filename)

const glslify = require('glslify')

const vertexShader = glslify('./source/particles.vert')
const fragmentShader = glslify('./source/particles.frag')

const uniforms = {
  "tPos": { type: "t", value: null },
  "uTime" : { type: "f", value: 0.0 },
  "uPointSize": { type: "f", value: 2.5 },
  "uAlpha": { type: "f", value: 0.2 },
  //"uColor1": { type: "v3", value: new THREE.Vector3(1.0, 0, 0) },//ff6600
  //"uColor2": { type: "v3", value: new THREE.Vector3(0, 0, 1.0) },//6666ff
  "uColor1": { type: "v3", value: new THREE.Vector3(1.0, 0.4, 0.0) },//ff6600
  "uColor2": { type: "v3", value: new THREE.Vector3(0.4, 0.4, 1.0) },//6666ff
  "uColor3": { type: "v3", value: new THREE.Vector3(0, 1, 0) },
  "uColorFreq": { type: "f", value: 1.0 },
  "uColorSpeed": { type: "f", value: 2.0 }
}



export default {
  create: function(){
    const material = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(uniforms),
      vertexShader, fragmentShader
    })
    
    material.blending = THREE.AdditiveBlending;
    material.transparent = true;
    material.depthTest = false;
    material.depthWrite = false;
    
    hmr.enable(cache, material)

    return material;
  }
};


if (module.hot) {
  module.hot.accept(err => {
    if (err) throw errr
  })
  hmr.update(cache, {
    vertexShader, fragmentShader
  })
}
