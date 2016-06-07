import Paper from "paper";
import FiverShapes from'./fiver-shapes';

import ShapeWrapper from'./../core/shape-wrapper';
import TimelineKeyframer from './../core/timeline-keyframer';

import keyboardJS from 'keyboardjs';

class Fivers{
  constructor(fiverShapes){
    this._fiverShapes = fiverShapes;
    this._board = board;
  }

  test(){
    this.buildTweens();
  }

  buildTweens(){
    this.moveOutside();
  }

  moveOutside(){
    var keyframer = new TimelineKeyframer(1);
    var timeline = keyframer.timeline;

    var family = this._fiverShapes.family;
    //family = [this._fiverShapes.biganton];
    var center = Paper.view.center;

    var cursor = 0;
    
    var offset = 0;
    var tween;

    family.forEach(member => {
      member.animated = false;
      
      var targetPos = this.getPositionOnOutsideCircle(cursor/family.length * 180 - 135);
      tween = TweenMax.to(member.position, 60, {x:targetPos.x, y:targetPos.y, member: member});
      timeline.add(tween, cursor * 5);

      tween = TweenMax.fromTo(member.position, 20, {x:-200, y:center.y}, {x:center.x, y:center.y, member: member});
      timeline.add(tween, 60 + cursor * 2);

      //timeline.add(member.position, 60, {x: center.x, y: center.y, member: member});
      cursor++;
    })
    
    

    //timeline.call(function(){}, null, null, '0')
    
    var offset = 0;
    family.forEach(member => {
    })

    keyframer.playAndScan();
  }

  getPositionOnOutsideCircle(angle){
    var center = Paper.view.center;
    var length = Math.max(Paper.view.bounds.width, Paper.view.bounds.height);

    var point = new Paper.Point({ length, angle });
    var destination = center.add(point)
    return destination;
  }

  testCircle(){
    for(var i = 0; i < 360;i+=1){
      var delta = i/360;

      var x = Math.sin(delta * 2 * Math.PI) * 200;
      var y = Math.cos(delta * 2 * Math.PI) * 200;

      shape.position.x = Paper.view.center.x + x;
      shape.position.y = Paper.view.center.y + y;
      shape.saveAsKeyframe(540 * delta);

    }
  }

  test2(){
    var timeline = new TimelineMax();
    console.log(timeline);

  }

  parseState(){
    var family = this._fiverShapes.family;

    family.forEach(member => {
    })
  }
}



function run(originalBoard){
  var fiverShapes = FiverShapes.collect(originalBoard.shapes);
  fiverShapes.wrap(originalBoard)

  var fivers = new Fivers(fiverShapes, originalBoard);

  //fivers.test()
  //fivers.test()

  window.fivers = fivers
  window.fivers.parseState();

  keyboardJS.bind('x', function(e) {
    fiverShapes.saveState('temp')
  });
  
  keyboardJS.bind('l', function(e) {
    fiverShapes.restoreState(require('./../states/smiley2').default)
    fiverShapes.keyframeAll();
  });
  
  keyboardJS.bind('c', function(e) {
    fiverShapes.restoreLocalState("temp")
    fiverShapes.keyframeAll();
  });

  //default
  keyboardJS.bind('d', function(e) {
    fiverShapes.restoreState(require('./../states/init').default)
    fiverShapes.keyframeAll();
  });

  keyboardJS.bind('p + 1', function(e) {
    fiverShapes.restoreState(require('./../states/make-twins-yellow').default)
    fiverShapes.keyframeAll(0);
  });
  
  keyboardJS.bind('f + 1', function(e) {
    fiverShapes.restoreState(require('./../states/face01').default)
    fiverShapes.keyframeAll(window.customTime);
  });
  keyboardJS.bind('f + 2', function(e) {
    fiverShapes.restoreState(require('./../states/face02').default)
    fiverShapes.keyframeAll();
  });

  function replay(){
    
    runState('init', 0)
    runState('face03', 30);
    
    /*runState('face03', 30)
    runState('face03-blink', 60)
    runState('face03-blink-2', 65)
    runState('face04', 80)
    */
  }

  //replay()

  function runState(statefile, frame){
    fiverShapes.restoreState(require('./../states/' + statefile).default)
    fiverShapes.keyframeAll(frame);
  }
  
  return fivers;
}

export default {
  run
}


/* probing

googleShapes.biganton.fill('yellow');
googleShapes.lisa.fill('yellow');
googleShapes.squary.fill('yellow');
googleShapes.twin.fill('yellow');
googleShapes.eviltwin.fill('yellow');
googleShapes.tallboy.fill('yellow');
googleShapes.lonewolf.fill('yellow');

googleShapes.searchbar.fill('yellow');
googleShapes.luckyButton.fill('yellow');
googleShapes.searchButton.fill('yellow');

*/