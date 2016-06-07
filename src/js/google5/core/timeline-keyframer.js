import {uniqBy} from "lodash";

export default class TimelineKeyframer{
  constructor(scanSpeed = 1){
    this._scanCounter = 0;
    this._scanSpeed = scanSpeed;
    this._startFrame = 0;

    this._timeline = new TimelineMax({
      useFrames: true,
      onUpdate: this.handleFrameUpdate.bind(this),
      onComplete: this.handleCompleted.bind(this)
    });

    this._timeline.pause();
  }
  
  setRange(fromFrame, toFrame){
    var df = toFrame - fromFrame;

    this._startFrame = fromFrame;
    this._timeline.duration = df;
  }
  
  handleCompleted(){
    this.allShapes.forEach(member => {
      member.animated = true
      member.reset();
    })
  }
  
  get timeline(){
    return this._timeline;
  }
  
  playAndScan(){
    this.allShapes.forEach(member => {
      member.animated = false
    })
    this._timeline.gotoAndPlay(0);
  }
  
  reset(){
    this._scanCounter = 0;
    this._shapes = null;
  }

  get allShapes(){
    var tweens = this._timeline.getChildren();
    var result = [];
    
    tweens.forEach(tween => {
      if(tween.vars.member){
        result.push(tween.vars.member)
      }
    })
    
    var shapes = uniqBy(result, function (shape) {
      return shape.gshape.id;
    });

    return shapes;
  }

  get activeShapes(){
    var tweens = this._timeline.getChildren();
    
    var result = [];
    tweens.forEach(tween => {
      if(tween.vars.member){
        var endTime = tween._startTime + tween._totalDuration;
        
        console.log(endTime);

        if(this.time >= tween._startTime && this.time <= endTime ){
          result.push(tween.vars.member)
        }
      }
    })

    var shapes = uniqBy(result, function (shape) {
      return shape.gshape.id;
    });

    return shapes;
  }

  get time(){
    return this._timeline.time();
  }

  handleFrameUpdate(){
    this._scanCounter++;
    if(this._scanCounter >= this._scanSpeed){
      this._scanCounter = 0;
      this.saveKeyframes();
    }
  }
  
  saveKeyframes(){
    console.log('its', this.time, this.activeShapes.length);

    this.activeShapes.forEach(shape => {
      shape.saveAsKeyframe(this._startFrame + this._timeline.time())
    })
  }
}