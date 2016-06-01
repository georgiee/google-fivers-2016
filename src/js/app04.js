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
}

export default { 
  run: function(){
    preloader.load(create)
  }
}