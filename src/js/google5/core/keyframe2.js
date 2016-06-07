import Paper from 'paper';

export class Keyframe{
  constructor(handlesMoved, time, state, fillColor, strokeColor, strokeWidth){
    this.ease = "easeInOutExpo";
    this.time = time;
    this.state = state;
    this.handlesMoved = handlesMoved;
    this.fillColor = fillColor;
    this.strokeColor = "";
    this.strokeWidth = 0;
  }

  toJSON(){
    return {
      ease : this.ease,
      time : this.time,
      state : this.state,
      handlesMoved : this.handlesMoved,
      fillColor : serializeColor(this.fillColor),
      strokeColor : this.strokeColor,
      strokeWidth : this.strokeWidth
    }
  }
} 

function serializeColor(fillColor){
  if(fillColor && fillColor.gradient){

    var x = {
      gradient: {
        stops: fillColor.gradient.stops
      },
      origin: [0,0],
      destination: [0,0]
    }
    return x

  }else{
    return fillColor;
  }

  
}
function parseState(data){
  var results = {
    point: [],
    handleIn: [],
    handleOut: []
  }

  for(var i = 0,l = data.point.length; i<l;i++){
    var point = data.point[i];
    results.point.push(new Paper.Point(point[1], point[2]));

    var handleIn = data.handleIn[i];
    results.handleIn.push(new Paper.Point(handleIn[1], handleIn[2]));

    var handleOut = data.handleOut[i];
    results.handleOut.push(new Paper.Point(handleOut[1], handleOut[2]));
  }

  return results;
}

export default {
  parse: function(data){
    var keyframe = new Keyframe();
    keyframe.ease = data.ease;
    keyframe.time = data.time;
    keyframe.state = parseState(data.state)
    keyframe.handlesMoved = data.handlesMoved;
    
    keyframe.fillColor = data.fillColor;
    keyframe.strokeColor = data.strokeColor;
    keyframe.strokeWidth = data.strokeWidth;

    return keyframe;
  },

  createFromShape: function(shape, time){
    var path = shape.path;
    var fillColor, strokeColor;

    return new Keyframe(false, time, serializePath(path), shape.fillColor, shape.strokeC, shape.strokeW)
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