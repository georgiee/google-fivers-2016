import {filter, isUndefined} from "lodash";
import ShapeWrapper from './../core/shape-wrapper';
import Keyframe from './../core/keyframe2';

export class GoogleFiveShapes{
  constructor(shapes){
    this.shapes = shapes;
    this.setNames();
  }

  setNames(){
    var names = "biganton lisa squary twin eviltwin tallboy lonewolf searchbar luckyButton searchButton";
    names = names.split(" ")
    
    names.forEach(name => {
      this[name].__name = name;
    })
  }
  
  wrap(board){//wrap in a designated convenience class for the gshape
    this.shapes = this.shapes.map(shape => {
      return new ShapeWrapper(shape, board)
    });
  }

  get family(){
    if(!this._family){
      this._family = [this.biganton, this.lisa, this.squary, this.twin, this.eviltwin, this.tallboy, this.lonewolf]
    }
    
    return this._family;
  }
  
  keyframeAll(time){
    var frameTime = time
    if(isUndefined(time)){
      frameTime = window.board.timestamp
    }
    
    this.shapes.forEach(member => {
      member.saveAsKeyframe(frameTime);
    })
  }
  
  clearKeyframes(){
    this.shapes.forEach(member => {
      member.clearKeyframes();
    })
  }

  saveState(name){
    var keyframes = this.shapes.map(shape => {
      return {
        name: shape.name,
        data: shape.getKeyframeData()
      }
    });
    
    localStorage.setItem(name, JSON.stringify(keyframes));
  }
  
  restoreState(data){
    data.forEach( item => {
      var keyframe = Keyframe.parse(item.data);
      this[item.name].setStateFromKeyframe(keyframe)
    })
  }
  
  restoreLocalState(name){
    var data = localStorage.getItem(name);
    data = JSON.parse(data)

    console.log('restoreLocalState', data);
    
    this.restoreState(data)
  }

  get biganton(){
    return this.shapes[0];
  }

  get lisa(){
    return this.shapes[1];
  }

  get squary(){
    return this.shapes[2];
  }
  
  get twin(){
    return this.shapes[3];
  }

  get eviltwin(){
    return this.shapes[4];
  }
  
  get tallboy(){
    return this.shapes[5];
  }

  get lonewolf(){
    return this.shapes[6];
  }

  //others
  get searchbar(){
    return this.shapes[7];
  }
  get luckyButton(){
    return this.shapes[8];
  }
  get searchButton(){
    return this.shapes[9];
  }
}

function collectGoogleShapes(allShapes,){
  var results = filter(allShapes, shape => !shape.duped);
  return new GoogleFiveShapes(results);
}

export default {
  collect: collectGoogleShapes
}