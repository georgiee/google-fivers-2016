import THREE from 'three';
import createControls from 'three-orbit-controls';
import Emitter from 'events';

const OrbitControls = createControls(THREE)

let controls;

let camera = new THREE.PerspectiveCamera( 70, 1, 0.1, 10000 );
//camera.position.z = 150;

let obj = {
  enabled: false,
  camera, controls,

  create: function(domElement){
    if(obj.controls) return;
    
    controls = new OrbitControls( camera, domElement );
    controls.enableDamping = true;
    //controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    obj.controls = controls;

    return camera;
  },

  resize: function(width, height){
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
  },

  update: function(){
    controls.update();
  }
}

export default obj
