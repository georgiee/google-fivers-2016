import debug from './debug';
import World from './core/world';
import MeshPlotter from './mesh-plotter';
import Simulator from './simulator';
import Particles from './particles';

const SIMULATION_SIZE = 200;

export default class Spacepixels{
  constructor(){
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
    world.camera.position.set(-3,2,0);
    world.camera.lookAt(world.scene.position);


    world.on('fixedstep', this.handleFixedStep)

    this.world = world;
  }
  
  initSimulator(){
    this.simulator = Simulator.create(this.world.renderer, SIMULATION_SIZE);
  }
  
  initParticles(){
    let particles = new Particles(SIMULATION_SIZE);
    this.world.scene.add(particles)   

    this.particles = particles;
  }
  
  initMeshPlotter(){
    let meshPlotter = new MeshPlotter(this.world.renderer, SIMULATION_SIZE);
    this.meshPlotter = meshPlotter;
    this.simulator.setTargetPositions(meshPlotter.target)
  }
}