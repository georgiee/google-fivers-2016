import Keyframe from './core/keyframe2';
import {filter, isUndefined} from "lodash";

export default class ShapeStateManager{
  constructor(shapelist){
    this._shapelist = shapelist;
  }


  saveSelectionLocal(scratchid){
    console.info('saveSelected', '---', window.itemSelection.length);

    var shapes = this._shapelist.findAndWrapPaths(window.itemSelection);//findAndWrapPaths holds paths not gshapes
    this.saveLocal(shapes, scratchid)
  }
  
  loadFromConsole(scratchid){
    console.info('load from console via $_');
    //nope doesnt work
    //this.restoreState(console.$_)
  }

  loadLocal(scratchid){
    console.info('local local state from', scratchid);

    var data = localStorage.getItem(scratchid);
    data = JSON.parse(data)
    this.restoreState(data)
  }
  
  //save
  saveLocal(shapes, storeID){
    console.info('save local state in', storeID);

    var keyframes = shapes.map(shape => {
      return {
        name: shape.name,
        data: shape.getKeyframeData()
      }
    });
    
    localStorage.setItem(storeID, JSON.stringify(keyframes));
  }

  keyframeAll(data, time){
    var frameTime = time;
    if(isUndefined(time) && time != 0){
      frameTime = window.board.timestamp
    }

    var shapes =  data.map( item => {
      return this._shapelist.findShapeByName(item.name)
    })

    shapes.forEach(shape => {
      shape.saveAsKeyframe(frameTime, true);
    })
  }
  
  restoreAndSetKeyframe(data, frame){
    //console.log('restoreAndSetKeyframe', data, frame)
    this.restoreState(data);
    this.keyframeAll(data, frame)
  }

  //restore
  restoreState(data){
    var keyframe
     data.forEach( item => {
      this._shapelist.restoreState(item.name, Keyframe.parse(item.data))
    })
  }
}