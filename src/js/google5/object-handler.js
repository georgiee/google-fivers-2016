import globalShapeList from './global-shape-list';
import Paper from "paper";
import keyboardJS from 'keyboardjs';

import ShapeStateManager from './shape-state-manager';
import GoogleShapes from './google-shapes';
import Replayer from './replayer';

const scratchSpaceName = 'scratcher';

class ObjectHandler{
  constructor(){
    this.googleShapes = GoogleShapes.collect(globalShapeList);
    this.shapeStateManager = new ShapeStateManager(globalShapeList);

    this.replayer = Replayer.prepare(this.shapeStateManager);

    this.bindKeys();
  }
  
  bindKeys(){
    keyboardJS.bind('j', () => this.shapeStateManager.saveSelectionLocal(scratchSpaceName));
    
    keyboardJS.bind('l + c', () => this.shapeStateManager.loadFromConsole());
    keyboardJS.bind('l', () => this.shapeStateManager.loadLocal(scratchSpaceName));
  }

  //set states on keyframes
  replayStates(){
    console.log('replay States')
    this.replayer.propagate();
  }

}

var handler;

export default {
  create: function(){
    if(handler){
      return handler;
    }
    
    globalShapeList.registerExisting(window.all.shapes)
    handler = new ObjectHandler();

    return handler;   
  } 
}