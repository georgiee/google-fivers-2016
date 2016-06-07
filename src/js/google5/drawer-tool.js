import Paper from "paper";

import GlobalShapeList from './global-shape-list';
import BoardUtils from './board-utils';
import GShapeFactory from './core/gshape-factory';
import Keyframe from './core/keyframe2';

function drawFromState(stateData, name){

  var stateData2 = require('./paths/temp').default;
  
  var keyframe = Keyframe.parse(stateData2[0].data)
  console.log('after parse', keyframe);

  var path = new Paper.Path();
  var shape = GShapeFactory.create(path, false, 'red', 'black', false);

  var shapeWrapped = GlobalShapeList.retrieve(shape);
  shapeWrapped.setStateFromKeyframe(keyframe);
  
  BoardUtils.add(shapeWrapped.gshape);
}

//oh boy what a mess between board utils and this
function drawSVG(data, name){
  var path = new Paper.Path(data);
  path.strokeColor = "rgba(0,0,0,1)"
  
  var shape = BoardUtils.addPath(path, false)
  shape.__name = name;
  
  GlobalShapeList.retrieve(shape);

  return shape;
}

function drawCircle(name){
 var path = new Paper.Path.Circle(Paper.view.center, 270);
  path.fillColor = "rgba(0,0,0,1)"
  
  var shape = BoardUtils.addPath(path, false)
  shape.__name = name;
  
  GlobalShapeList.retrieve(shape);

  return shape;
}

function createShapeFromPath(path, name){
  var shape = BoardUtils.addPath(path, false)
  shape.__name = name;
  
  var wrappedShape = GlobalShapeList.retrieve(shape);
  console.log('wrappedShape', wrappedShape)
  return wrappedShape;
}

function drawHeart(name){
  return createShapeFromPath(require('./paths/heart').default, name)
}

export default {
  drawCircle, drawSVG, drawHeart, drawFromState
}