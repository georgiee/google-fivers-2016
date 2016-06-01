export default class BoidDecorator{
  constructor(spacepixels){
    this.handleStep = this.handleStep.bind(this);
    this.spacepixels = spacepixels;
    this.init();
  }

  
  init(){
    
  }
  
  activate(){
    this.spacepixels.simulator.velocityFlags.boids = true;
    this.spacepixels.on('step', this.handleStep );
  }

  deactivate(){
    this.spacepixels.simulator.velocityFlags.boids = false;
    this.spacepixels.removeListener('step', this.handleStep );
  }
  
  handleStep(dt, time){
  }
  
  get simulator(){
    return this.spacepixels.simulator;
  }
}