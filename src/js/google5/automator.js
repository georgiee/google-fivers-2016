import GShapeFactory from './core/gshape-factory';
import keyboardJS from 'keyboardjs';

import Fivers from './components/fivers';
import hintRunner from './components/hint-runner';
import BuildingTool from './building-tool'
import ObjectHandler from './object-handler'
import SpiralImageDrawer from './components/spiral-drawer';
import DrawerTool  from './drawer-tool';

class Automator{
  constructor(board){
    this._board = board;

    //a utility classe for our default set of shapes
    //this.fivers = Fivers.run(window.board);
    //this.buildingTool = new BuildingTool();

    this.objectHandler = ObjectHandler.create();

    this.spiralDrawer = SpiralImageDrawer.create(this._board);
    var self = this;
    //DrawerTool.drawFromState('heart')
    //DrawerTool.drawHeart('heart')
    DrawerTool.drawCircle('spiralCircle')
    //DrawerTool.drawSVG(require('./paths/hello-george').default, 'sayhello');

    this.spiralDrawer.draw('mimimi').then(function(){
      self.objectHandler.replayStates();
    });
    
    //this.objectHandler.replayStates();
    this.bindKeys();
  }

  bindKeys(){
    //press h then i to run the hints
    keyboardJS.bind('h > i', this.startHintRunner);
    keyboardJS.bind('s > p', this.drawSpiral.bind(this));
  }
  
  drawSpiral(){
    this.spiralDrawer.draw('mimimi');
  }

  startHintRunner(){
    hintRunner.start();
  }
}

function prepare(){
  //1. copy the prototype from an existing class, and make your own GShapes with GShapeFactory.create
  GShapeFactory.setBlueprint(window.all.shapes[0]);
}

export default {
  start(board){
    prepare();

    var automator = new Automator(board);
  }
}