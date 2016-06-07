import Paper from "paper";
import keyboardJS from 'keyboardjs';
import Keyframe from './core/keyframe2'
import shapelist from './global-shape-list'

export default class BuildingTool{
  constructor(){
    keyboardJS.bind('b > p', this.togglePen.bind(this) ) //b for build - pen
    keyboardJS.bind('s', this.generateStateOfSelection.bind(this) ) //b for build - pen
    keyboardJS.bind('r', this.restoreLocalState.bind(this) ) //b for build - pen
    keyboardJS.bind('r > c', this.restoreStateFromLastConsoleInput.bind(this) ) //b for build - pen
    shapelist.registerExisting();
  }
  
  generateStateOfSelection(){
    (window.itemSelection.map(item => item.id ))

    var shapes = shapelist.findOrCreate(window.itemSelection);
    this.saveStateOf(shapes, 'scratchpad')
  }

  saveStateOf(shapes, storeID){
    var keyframes = shapes.map(shape => {
      return {
        name: shape.name,
        data: shape.getKeyframeData()
      }
    });
    
    localStorage.setItem(storeID, JSON.stringify(keyframes));
  }
  
  restoreLocalState(){
    console.log('restore local state');
    var data = localStorage.getItem('scratchpad');
    data = JSON.parse(data)
    this.restoreState(data)
  }


  restoreStateFromLastConsoleInput(){
    //use $_ to do so
    this.restoreState($_);
  }

  restoreState(data){
    data.forEach( item => {
      var keyframe = Keyframe.parse(item.data);
      shapelist.restoreState(item.name, keyframe)
    })
  }
  
  togglePen(){
    window.penToolActivated = !window.penToolActivated;
    if(window.penToolActivated){
      console.info('pen active')
    }else{
      console.info('pen disabled')
    }
  }
}