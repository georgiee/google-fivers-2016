export class Keyframe{
  constructor(shape, handlesMoved, time, state, fillColor, strokeColor, strokeWidth){
    this.shape = shape;

    this.ease = "easeInOutExpo";
    this.time = time;
    this.state = state;
    this.handlesMoved = handlesMoved;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
  }
  
  addToShape(){
    this.shape.addKey(this);
  }
  
  serialize(){

    return {
      ease : "linear",
      time : this.time,
      state : this.state,
      handlesMoved : this.handlesMoved,
      fillColor : this.fillColor,
      strokeColor : this.strokeColor,
      strokeWidth : this.strokeWidth
    }
  }
} 
export default {
  createFromPath: function(path, time){
    var fillColor = path.fillColor.toCSS(true);
    var strokeColor = 'black';

    return new Keyframe(null, false, time, serializePath(path), fillColor, strokeColor, path.strokeWidth)
  },

  createFromShape: function(shape, time){
    var path = shape.path;
    var fillColor = path.fillColor.toCSS(true);
    var strokeColor = 'black';
    return new Keyframe(shape, false, time, serializePath(path), fillColor, strokeColor, path.strokeWidth)
  }
}

function serializePath(path){
  var results = {
    point: [],
    handleIn: [],
    handleOut: []
  }

  var points = path.segments.forEach( segment => {
    results.point.push(segment.point.clone());
    results.handleIn.push(segment.handleIn.clone());
    results.handleOut.push(segment.handleOut.clone());
  });
  
  return results;
}