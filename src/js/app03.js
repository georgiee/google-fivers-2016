import debug from './osram/debug';
import World from './osram/core/world';
import Simulator from './osram/simulator';
import Particles from './osram/particles';
import * as Utils from './osram/utils';
import Loader from 'resource-loader';
import AnimatedMesh from './osram/core/animated-mesh';

const SIMULATION_SIZE = 200;

import MeshPlotter from './osram/mesh-plotter';
import SpaceMouse from './osram/space-mouse';

function preload(cb){
  var loader = new Loader();
  loader
    .add('bear', 'assets/bear.json')
    .add('wolf', 'assets/wolf.json')
    .add('tree', 'assets/tree.obj')
    .load( (loader, resources) => cb(resources))
}


function createMesh(json, scale = 1.0){
  var mesh = new THREE.Mesh( Utils.parseGeometryJson(json), new THREE.MeshNormalMaterial() );

  mesh.geometry.center();
  mesh.scale.setScalar(scale);
  return mesh;
}


function create(loadedObjects){
  

  const world = World.create(debug.enable());
  world.camera.position.set(-3,2,0);
  world.camera.lookAt(world.scene.position);


  const simulator = Simulator.create(world.renderer, SIMULATION_SIZE);
  SpaceMouse.create(world, simulator.velocityUniforms);

  let particles = new Particles(SIMULATION_SIZE);
  world.scene.add(particles)
  
  let meshPlotter = new MeshPlotter(world.renderer, SIMULATION_SIZE);
  simulator.setTargetPositions(meshPlotter.target)


  world.on('fixedstep', function(dt, time){
    simulator.step(dt, time );
    meshPlotter.update(dt);
    meshPlotter.render();
  });

  simulator.on('step', function(positions, time){
    particles.update(positions, time)
  })

  simulator.velocityFlags.random = false;
  simulator.velocityFlags.target = false;
  simulator.velocityFlags.noise = false;
  simulator.velocityFlags.galaxy = false;
  simulator.velocityFlags.input = false;

  debug.gui.add(simulator.velocityFlags, 'random');
  debug.gui.add(simulator.velocityFlags, 'target').listen();
  debug.gui.add(simulator.velocityFlags, 'noise');
  debug.gui.add(simulator.velocityFlags, 'galaxy');
  debug.gui.add(simulator.velocityFlags, 'input');
  
  simulator.positionFlags.immediate = false;
  debug.gui.add(simulator.positionFlags, 'immediate');

  debug.params.animation = '';
  
  debug.gui.add( debug.params, 'animation', ['bear', 'wolf'])
    .name('Animation').onChange(function(modelName){
      var json = loadedObjects[modelName].data;
      var animatedMesh = new AnimatedMesh(Utils.parseGeometryJson(json), 1);
      animatedMesh.scale.setScalar(0.01);
      meshPlotter.setMesh(animatedMesh)
      simulator.velocityFlags.target = true;
    });

  debug.params.modelDetails = 1.0;
  meshPlotter.setDetails(debug.params.modelDetails);
  debug.gui.add( debug.params, 'modelDetails', 0.1, 1.0).onChange(function(value){
    console.log('value');
    meshPlotter.setDetails(value)
  })
}

export default { 
  run: function(){
    preload(create)
  }
}
