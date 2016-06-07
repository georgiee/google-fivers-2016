import ShapeWrapper from './core/shape-wrapper';
import Keyframe from './core/keyframe2';
import {find} from "lodash";

var board = window.board;
var wrappedShapes = [];
var wrappedShapesMap = new Map();


function retrieve(shape){
  var id = shape.id;

  if(!wrappedShapesMap[id] && shape){
    var shape = new ShapeWrapper(shape, board);
    wrappedShapes.push(shape)

    wrappedShapesMap[id] = shape
    
  }
  
  return wrappedShapesMap[id];
}

function findAndWrapShapes(originalShapes){
  var results = [];

  for(var i = 0; i< originalShapes.length; i++){
    var gshape = originalShapes[i];
    var shape = retrieve(gshape);
    if(shape){
      results.push(shape);
    }else{
      console.warn('could not find shape for gshape', gshape)
    }
  }

  return results;
}

function findAndWrapPaths(paths){
  var results = [];

  for(var i = 0; i< paths.length; i++){
    var pathid = paths[i].id
    var gshape = _.find(window.all.shapes, _.matchesProperty('id', pathid));
    var shape = retrieve(gshape);
    if(shape){
      results.push(shape);
    }else{
      console.warn('could not find shape for path', pathid)
    }
  }

  return results;
}

function findShapeByName(name){
  return _.find(wrappedShapes, _.matchesProperty('name', name));
}

function restoreState(name, data){
  //console.log('info restoring ' + name)
  var shape = findShapeByName(name);
  
  if(shape){
    shape.setStateFromKeyframe(data);
  }else{
    console.warn('Could not find shape with name', name)
  }
}


function registerExisting(){
  window.all.shapes.map(gshape => retrieve(gshape))
}

function getAll(){
  return wrappedShapes
}

export default {
  registerExisting, findAndWrapPaths, findAndWrapShapes, restoreState, getAll, findShapeByName, retrieve
}

