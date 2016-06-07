import HintRunner from './google5/hint-runner';
import BoardTests from './google5/board-tests';
import Board from './google5/board';


//setup is called when the board is mounting.
var originalSetup = window.paper.setup.bind(window.paper);

window.paper.setup = function(){
  console.log('**** google board being mounted')
  originalSetup();
  init();
}


function init(){
  //HintRunner.init();
  //BoardTests.run();
  Board.start();
}


