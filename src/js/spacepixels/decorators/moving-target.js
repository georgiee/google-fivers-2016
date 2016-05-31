import pathFactory from '../path/path-factory';
import PathPlotter from '../path/path-plotter';

const duration = 40;

export default class MovingTarget{
  constructor(spacepixels){
    this.handleStep = this.handleStep.bind(this);
    this.spacepixels = spacepixels;
    
    this.init();
  }

  
  init(){
    this.pathPlotter = new PathPlotter();
    this.pathPlotter.add(pathFactory.getDefaultPath(0.05));
  }
  
  handleStep(dt, time){
    let ratio = (time%duration)/duration;

    this.pathPlotter.step(ratio);

    this.simulator.velocityUniforms.uTargetPosition.value.copy(this.pathPlotter.currentPosition);
  }

  activate(){
    this.simulator.velocityFlags.followPoint = true;
    this.spacepixels.world.scene.add(this.pathPlotter.drawer);
    this.spacepixels.on('step', this.handleStep );
  }

  deactivate(){
    this.simulator.velocityFlags.followPoint = false;

    this.spacepixels.world.scene.remove(this.pathPlotter.drawer);
    this.spacepixels.removeListener('step', this.handleStep );
  }

  get simulator(){
    return this.spacepixels.simulator;
  }
}