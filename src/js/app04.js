import SpacePixels from './spacepixels/spacepixels';
import cameraPathFactory from './spacepixels/camera/camera-path-factory';
import * as utils from './spacepixels/utils';
import BufferPingPong from './spacepixels/core/buffer-ping-pong';
import debug from './spacepixels/debug';
import preloader from './spacepixels/preloader';

import * as data from './spacepixels/data';
import gui from './spacepixels/gui';

let spacepixels, world, camera;

const SIMULATION_SIZE = 200;

debug.enable();

function create(){
  spacepixels =  new SpacePixels(SIMULATION_SIZE);
  world = spacepixels.world;
  camera= world.camera;

  gui.create(spacepixels);
  general();
}




function general(){
  //Random Movement
  spacepixels.simulator.velocityFlags.random = true;
  debug.gui.add(spacepixels.simulator.velocityFlags, 'random'); 

  //Reset function
  debug.params.reset = function(){
    spacepixels.simulator.reset();
  }

  debug.gui.add(debug.params, 'reset'); 
  
  //other debugging
  spacepixels.simulator.positionFlags.immediate = false;
  debug.gui.add(spacepixels.simulator.positionFlags, 'immediate');
}


let cameraPath;


export default { 
  run: function(){
    preloader.load(create)
  }
}