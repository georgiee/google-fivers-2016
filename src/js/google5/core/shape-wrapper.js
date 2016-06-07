import Keyframe2 from'./keyframe2';
const noop = function(){};

export default class ShapeWrapper{
  constructor(gshape, board){
    this._gshape = gshape;
    this._gshapeAnimationMethod = this.gshape.animate.bind(this.gshape);

    this._board = board;
  }
  
  setName(value){
    this._gshape.__name = value;
  }
  
  get name(){
    return this._gshape.__name || 'unique_'+this._gshape.id;
  }
  
  get gshape(){//return original shape for some quick actions
    return this._gshape;
  }
  
  get path(){
    return this.gshape.path;
  }

  get position(){
    return this.path.position;
  }

  //alow to decouple from animation loop
  //so we can tween/gsap the values without interference of the animation step
  set animated(value){
    this._animated = value;
    
    if(this._animated){
      this.gshape.animate = this._gshapeAnimationMethod;
    }else{
      this.gshape.animate = noop;
    }
  }
  
  get animated(){
    return this._animated;
  }
  
  clearKeyframes(){
    this.gshape.keyframes.length = 1;//always keep the first frame
  }
  
  setStateFromKeyframe(keyframe){
    this.gshape.initState = keyframe.state;
    this.gshape.fillColor = keyframe.fillColor;
    //this.gshape.strokeColor(keyframe.strokeColor)
    //this.gshape.strokeWidth(keyframe.strokeWidth)
    this.reset();
  }

  getKeyframeData(){
    var keyframe = Keyframe2.createFromShape(this.gshape, -1);
    return keyframe;
  }

  saveAsKeyframe(time, reset = false){
    //console.log('save keyframe', this.name);
    
    var keyframe = Keyframe2.createFromShape(this.gshape, time);
    this.gshape.addKey(keyframe, time);
    this._board.saveState()

    if(reset){
      this.reset();
    }
  }

  resetWith(state){
    for(var i = 0, l = this.path.segments.length; i<l;i++){
      this.path.segments[i].point = state.point[i];
      this.path.segments[i].handleIn = state.handleIn[i];
      this.path.segments[i].handleOut = state.handleOut[i];
    }
  }
  
  reset(){
    this.resetWith(this.gshape.initState)
  }
}