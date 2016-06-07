import Paper from 'paper';

import GShapeFactory from './gshape-factory';
import DotOcean from './core/dot-ocean';
import Keyframe from './core/keyframe';

const maxTime = 540;//9 seconds

class Boardie{
  constructor(oldBoard){
    this._oldBoard = oldBoard;
  }
  
  deleteAll(){
    this._oldBoard.deleteAll();
  }

  setStage(){
    console.log('***** setStage called')
  }

  addPath(path){
    var shape = GShapeFactory.create(path, true, path.fillColor.toCSS(true), 'black', false);
    return this.add(shape);
  }

  createDot(position, size = 10, fillColor = 'red'){
    var path = new Paper.Path.Circle(position, size);
    var shape = GShapeFactory.create(path, true, fillColor, 'black', false);

    this.add(shape);
    return shape;
  }

  addKeyframe(shape, ratio){
    var time = ratio * maxTime;

    //shape.path.scale(2)
    //shape.path.position.x = shape.path.position.x + 100;

    var keyframe = new Keyframe(false, time, shape.getPositionCopy(), shape.fillColor, shape.strokeC, shape.strokeW)
    shape.addKey(keyframe);

    this._oldBoard.pushHistory(shape.id, time, keyframe);
    this._oldBoard.saveState()
  }
  
  saveKeyframes(keyframes){
    keyframes.forEach( keyframe => {
      keyframe.addToShape()
      //this._oldBoard.pushHistory(keyframe.shape.id, keyframe.time, keyframe);
    })

    this._oldBoard.saveState()
  }

  add(shape){
    this._oldBoard.addShape(shape)
    shape.addKeysFromConsole()

    return shape;
  }
}

function writeTween(board, shape){
  var proxyObject = new Paper.Path.Circle(Paper.view.bounds.center, 30);
  proxyObject.fillColor = 'blue';
  
  var tween = TweenMax.to(proxyObject.position, 1, {x: '+=300', onUpdate: function(){
    writeProgress();    
  }});

  var writeProgress = function(){
    shape.path.position.x = proxyObject.position.x;
    board.addKeyframe(shape, tween.ratio);
  }
}




export default {
  start: function(board){
    GShapeFactory.setBlueprint(window.all.shapes[0]);

    var b = new Boardie(board);
    var google = window.all.shapes.slice(0, 5);
    google.forEach( shape => {
      //shape.path.bringToFront();
    })
    //b.deleteAll();

    var shape = b.createDot(Paper.view.bounds.center, 20);
    //shape.fill(color);
    //writeTween(b, shape)
    
    window.bb = b;

    var ocean = new DotOcean(b, Paper.view.bounds.width, Paper.view.bounds.height);
    ocean.create();
    
    for(var i = 0; i < 60; i++){
      b.saveKeyframes(ocean.toKeyframes(i/60, 540*i/60))
    }
    
    
    //TweenMax.fromTo(ocean, 10, {time: 0}, {time: 1})
    
  }
}