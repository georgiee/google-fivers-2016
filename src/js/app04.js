import SpacePixels from './spacepixels/spacepixels';
import Loader from 'resource-loader';
import cameraPathFactory from './spacepixels/camera/camera-path-factory';
import * as utils from './spacepixels/utils';
import BufferPingPong from './spacepixels/core/buffer-ping-pong';
import debug from './spacepixels/debug';
debug.enable();

let spacepixels, world, camera;

const SIMULATION_SIZE = 200;
let preloader = new Loader();

function preload(cb){
  preloader
    .add('bear', 'assets/bear.json')
    .add('wolf', 'assets/wolf.json')
    .add('tree', 'assets/tree.obj')
    .load( (loader, resources) => cb(resources))
}


function create(){
  spacepixels =  new SpacePixels(SIMULATION_SIZE);
  world = spacepixels.world;
  camera= world.camera;

  general();
  testModel();
  testTargetDrawer();

  //createCameraPath();
  //testPointFollowing();
}

function testTargetDrawer(){
  
}

function general(){
  //Random Movement
  spacepixels.simulator.velocityFlags.random = false;
  debug.gui.add(spacepixels.simulator.velocityFlags, 'random'); 

  //Reset function
  debug.params.reset = function(){
    spacepixels.simulator.reset();
  }

  debug.gui.add(debug.params, 'reset'); 

  //Text
  debug.params.currentText = '';

  debug.gui.add(debug.params, 'currentText').onChange(newValue => {
    spacepixels.setText(newValue);
  })

  //other debug ging
  spacepixels.simulator.positionFlags.immediate = false;
  debug.gui.add(spacepixels.simulator.positionFlags, 'immediate');
}


function testModel(){
  let mesh = utils.createMeshFromJson(preloader.resources.bear.data, 0.02);
  spacepixels.showMesh(mesh);

  //spacepixels.world.scene.add(mesh)
  
  //debug.gui.add( debug.params, 'modelDetails', 0.1, 1.0).onChange(function(value){
   // meshPlotter.setDetails(value)
  //})

}

function testPointFollowing(){
  spacepixels.simulator.velocityFlags.followPoint = false;
  debug.gui.add(spacepixels.simulator.velocityFlags, 'followPoint').name('Follow Point');
  let targetPosition = new THREE.Vector3();
  
  var q = new THREE.Quaternion();

  var baseTransforms = new THREE.Matrix4();
  baseTransforms.makeTranslation(0.1,0,0);

  var rotations = new THREE.Matrix4();
  
  var object = new THREE.Object3D();
  

  var position = new THREE.Vector3();

  var mesh = new THREE.Mesh(new THREE.SphereGeometry(0.1, 32, 32), new THREE.MeshNormalMaterial);
  mesh.position.copy(targetPosition)
  spacepixels.world.scene.add(mesh);

  var vector = new THREE.Vector3( 2, 0, 0 );
  var axis = new THREE.Vector3( 1, 1, 1 );
  var angle = Math.PI / 2 * 1/60;

  spacepixels.on('tick', () => {


    vector.applyAxisAngle( axis, angle );
    mesh.position.copy(vector);
    spacepixels.simulator.velocityUniforms.uTargetPosition.value.copy(vector);
  })
  
  spacepixels.simulator.velocityUniforms.uTargetPosition.value.copy(targetPosition);
  
  
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