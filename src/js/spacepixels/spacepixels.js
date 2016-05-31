import debug from './debug';
import World from './core/world';

import Simulator from './simulator';
import Particles from './particles';
import Emitter from 'events';

export default class Spacepixels extends Emitter{
  constructor(size){
    super();
    this._size = size;
    this.handleFixedStep = this.handleFixedStep.bind(this);
    this.init();
  }

  get size(){
    return this._size;
  }
  
  handleFixedStep(dt, time){
    this.simulator.step(dt, time );
    this.emit('step', dt, time);
    
    this.particles.update(this.simulator.positionBuffer, time)
  }
  
  init(){
    this.initWorld();
    this.initSimulator();  
    this.initParticles();
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
}