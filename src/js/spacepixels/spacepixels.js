import debug from './debug';
import World from './core/world';
import MeshPlotter from './mesh-plotter';
import Simulator from './simulator';
import Particles from './particles';
import Emitter from 'events';
import * as utils from './utils';
import BufferPingPong from './core/buffer-ping-pong';

export default class Spacepixels extends Emitter{
  constructor(size){
    super();
    this._size = size;
    this.handleFixedStep = this.handleFixedStep.bind(this);
    this.init();
  }
  
  handleFixedStep(dt, time){
    this.simulator.step(dt, time );
    this.meshPlotter.update(dt);
    this.meshPlotter.render();
    this.particles.update(this.simulator.positionBuffer, time)
  }
  
  init(){
    this.initWorld();
    this.initSimulator();  
    this.initParticles();
    this.initMeshPlotter();
  }
  
  initWorld(){
    let world = World.create(debug.enable());
    world.camera.position.set(-1, 1, 4);
    world.camera.lookAt(world.scene.position);


    world.on('fixedstep', this.handleFixedStep);
    world.on('tick', dt => this.emit('tick'));

    this.world = world;
  }
  
  initSimulator(){
    this.simulator = Simulator.create(this.world.renderer, this._size);
  }
  
  initParticles(){
    let particles = new Particles(this._size);
    this.world.scene.add(particles)   

    this.particles = particles;
  }
  
  initMeshPlotter(){
    let meshPlotter = new MeshPlotter(this.world.renderer, this._size);
    this.meshPlotter = meshPlotter;
    this.simulator.setTargetPositions(meshPlotter.target)

    //this.world.scene.add(this.meshPlotter.debugPlane);
  }

  showMesh(mesh){
    this.simulator.velocityFlags.plotter = true;
    this.meshPlotter.setMesh(mesh);
  }

  clearText(){
    this.simulator.velocityFlags.text = false;
    this.simulator.clearTargetPositions();
  }
  
  setText(value){
    if(!value || value.length < 1){
      this.clearText();
      return;
    }

    let dtPositionTexture = utils.generateTextPoints(value, this._size, this._size*this._size);
    let buffer = new BufferPingPong(dtPositionTexture);
    
    this.simulator.setTargetPositions(buffer);
    this.simulator.velocityFlags.text = true;
  }
}