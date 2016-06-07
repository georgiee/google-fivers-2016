import * as paths from './paths/index';

var P = window.paper, Paper = window.paper;
var B = window.board, Board = window.board;

var blueprintGShape = window.all.shapes[0];
var GKShape = blueprintGShape.constructor;

GKShape.prototype = Object.create(blueprintGShape.constructor.prototype)

function createShape(path, smooth, strokeColor, fillColor, isLine){
  return new GKShape(path, smooth, strokeColor, fillColor, isLine)
}


function createDrawing(shape,fill, stroke){
  var path = new Paper.Path(shape);
  var shape = createShape(path, true,  fill, stroke, false)
  shape.duped = true;
  window.board.addShape(shape)

  return shape;
}
function testExternal(data){
  var path = new Paper.Path(data)
   
  var shape = createShape( path, true,  window.gradient.cookie, 'red', false)
  shape.duped = false;
  window.board.addShape(shape)

  return new Paper.Path(shape);
}

function testGradient(){
  var path = new Paper.Path.Circle(P.view.bounds.center, 50);
   
   var fillGradient = {
      gradient: {
          stops: [['yellow', 0.05], ['red', 0.2], ['black', 1]],
          radial: true
      },
      origin: path.bounds.center,
      destination: path.bounds.rightCenter
  };
  

  var pathData = "M514.69629,624.70313c-7.10205,-27.02441 -17.2373,-52.39453 -30.40576,-76.10059c-13.17383,-23.70703 -38.65137,-60.52246 -76.44434,-110.45801c-27.71631,-36.64355 -44.78174,-59.89355 -51.19189,-69.74414c-10.5376,-16.02979 -18.15527,-30.74951 -22.84717,-44.14893c-4.69727,-13.39893 -7.04297,-26.97021 -7.04297,-40.71289c0,-25.42432 8.47119,-46.72559 25.42383,-63.90381c16.94775,-17.17871 37.90527,-25.76758 62.87354,-25.76758c25.19287,0 47.06885,8.93262 65.62158,26.79834c13.96826,13.28662 25.30615,33.10059 34.01318,59.4375c7.55859,-25.88037 18.20898,-45.57666 31.95215,-59.09424c19.00879,-18.32178 40.99707,-27.48535 65.96484,-27.48535c24.7373,0 45.69531,8.53564 62.87305,25.5957c17.17871,17.06592 25.76855,37.39551 25.76855,60.98389c0,20.61377 -5.04102,42.08691 -15.11719,64.41895c-10.08203,22.33203 -29.54687,51.59521 -58.40723,87.78271c-37.56738,47.41211 -64.93457,86.35352 -82.11328,116.8125c-13.51758,24.0498 -23.82422,49.24902 -30.9209,75.58594z"
  // var path = new Paper.Path(pathData)
  
  var shape = createShape( path, true,  fillGradient, 'blue', false)
  shape.duped = true;
  window.board.addShape(shape)

  return new Paper.Path(shape);
}

function test(){
  console.log('hello test 😈')
  //clearStore();
  //board.resetBoard();
  //var shape1 = createDrawing(paths.me1, window.gradient.ocean,  window.gradient.storm);
  //shape1.strokeWidth(0)
  
  var shape2 = createDrawing(paths.twovc, 'blue', 'yellow');
  shape2.strokeWidth(2)
  shape2.fill('black')
  //shape2.brake();
}
function test2(){
  var path = new Paper.Path.Circle(new Paper.Point(100, 70), 50);
  path.strokeColor = 'red';
  // Fill the path with a radial gradient color with three stops:
  // yellow from 0% to 5%, mix between red from 5% to 20%,
  // mix between red and black from 20% to 100%:
  var fillGradient = {
      gradient: {
          stops: [['yellow', 0.05], ['red', 0.2], ['black', 1]],
          radial: true
      },
      origin: path.position,
      destination: path.bounds.rightCenter
  };
  
  var shape2 = createDrawing(path, 'yellow', 'yellow');
  console.log('shape2', shape2)
}


function createCirclePath2(){
  var myCircle = new Paper.Path.Circle(new Paper.Point(100, 70), 50);
  myCircle.strokeColor = 'black';
  myCircle.removeSegment(0);

  return myCircle;
}


function createCirclePath(){

  var path = new Paper.Path();
  path.strokeColor = 'black';
  path.add(new Paper.Point(130, 175)); 
  path.add(new Paper.Point(130, 125)); 
  path.add(new Paper.Point(180, 125));
  path.add(new Paper.Point(180, 175));
  path.closed = true;

  return path;
}

export default {
  run: function(){
    console.log('board maker')
    //setTimeout(test, 1000)
    //test2();
  }
}