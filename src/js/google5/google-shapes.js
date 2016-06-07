import {filter, isUndefined} from "lodash";
import ShapeWrapper from './core/shape-wrapper';
import Keyframe from './core/keyframe2';

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

  get family(){
    if(!this._family){
      this._family = [this.biganton, this.lisa, this.squary, this.twin, this.eviltwin, this.tallboy, this.lonewolf]
    }
    
    return this._family;
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

function collectGoogleShapes(globalList){
  var results = filter(window.all.shapes, shape => !shape.duped);
  var list = globalList.findAndWrapShapes(results)
  console.log(list)
  return new GoogleFiveShapes(results);
}

export default {
  collect: collectGoogleShapes
}