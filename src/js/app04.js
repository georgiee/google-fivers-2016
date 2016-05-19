import SpacePixels from './spacepixels/spacepixels';
import Loader from 'resource-loader';
import cameraPathFactory from './spacepixels/camera/camera-path-factory';

import debug from './spacepixels/debug';
debug.enable();

let spacepixels, world, camera;

function preload(cb){
  var loader = new Loader();
  loader
    .add('bear', 'assets/bear.json')
    .add('wolf', 'assets/wolf.json')
    .add('tree', 'assets/tree.obj')
    .load( (loader, resources) => cb(resources))
}

function create(){
  console.log('run 04');
  spacepixels =  new SpacePixels();
  world = spacepixels.world;
  camera= world.camera;

  //createCameraPath();
  createDebugging();
}

function createDebugging(){
  
}

let cameraPath;
function createCameraPath(){
  cameraPath = cameraPathFactory.create();
  var cameraPathDrawing = cameraPath.getDebugView();
  
  world.scene.add(cameraPathDrawing);
  cameraPath.showCameraAt(camera, 0);


  debug.params.progress = 0.0;
  let progressChanged = debug.gui.add(debug.params, 'progress', 0.0, 1.0).step(0.01).name('Progress');
  progressChanged.onChange(progress =>  cameraPath.showCameraAt(camera, progress) )
}

export default { 
  run: function(){
    preload(create)
  }
}