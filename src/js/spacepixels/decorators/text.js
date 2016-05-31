import MeshPlotter from './../mesh-plotter';
import * as utils from '../utils';
import BufferPingPong from '../core/buffer-ping-pong';

export default class TextDecorator{
  constructor(spacepixels){
    this.spacepixels = spacepixels;
  }
  
  get simulator(){
    return this.spacepixels.simulator;
  }
  
  activate(){
    this.simulator.velocityFlags.text = true;
  }
  
  deactivate(){
    this.simulator.velocityFlags.text = false;
    this.simulator.clearTargetPositions();
  }

  setText(value){
    if(!value || value.length < 1){
      this.deactivate();
      return;
    }

    this.activate();

    var size = this.spacepixels.size;
    
    let dtPositionTexture = utils.generateTextPoints(value, size, size * size/2);
    let buffer = new BufferPingPong(dtPositionTexture);
    
    this.simulator.setTargetPositions(buffer);
    this.activate();
  }
}