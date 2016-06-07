import GShapeFactory from './core/gshape-factory';

var board = window.board;

function addPath(path, smooth = true){
  var color;

  if(path.fillColor){
    color = path.fillColor.toCanvasStyle()
  }
  var shape = GShapeFactory.create(path, smooth, color, path.strokeColor, false);
  return add(shape);
}

function add(shape){
  board.addShape(shape)
  return shape
}

export default {
  addPath, add
}