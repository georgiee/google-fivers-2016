import debug from './osram/debug';
import World from './osram/core/world';
import Simulator from './osram/simulator';
import Particles from './osram/particles';

const SIMULATION_SIZE = 200;

export default { 
  run: function(){
    const world = World.create(debug.enable());
    world.camera.position.set(-3,2,0);
    world.camera.lookAt(world.scene.position);

    const simulator = Simulator.create(world.renderer, SIMULATION_SIZE);

    let particles = new Particles(SIMULATION_SIZE);
    world.scene.add(particles)

    
    world.on('fixedstep', function(dt, time){
      simulator.step(dt, time );
    });

    simulator.on('step', function(positions, time){
      particles.update(positions, time)
    })
  }
}
