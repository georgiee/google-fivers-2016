import MeshPlotter from './../mesh-plotter';

export default class MeshDecorator{
  constructor(spacepixels){
    this.handleStep = this.handleStep.bind(this);
    this.spacepixels = spacepixels;
    this.init();
  }

  
  init(){
    let meshPlotter = new MeshPlotter(this.spacepixels.world.renderer, this.spacepixels.size);
    this.meshPlotter = meshPlotter;
  }
  
  activate(){
    this.spacepixels.on('step', this.handleStep );
    this.simulator.setTargetPositions(this.meshPlotter.target)
  }

  deactivate(){
    this.spacepixels.simulator.velocityFlags.plotter = false;
    this.spacepixels.removeListener('step', this.handleStep );
  }

  showMesh(mesh){
    this.spacepixels.simulator.velocityFlags.plotter = true;
    this.meshPlotter.setMesh(mesh);

    this.activate();
  }

  handleStep(dt, time){
    this.meshPlotter.update(dt);
    this.meshPlotter.render();
  }
  
  get simulator(){
    return this.spacepixels.simulator;
  }
}