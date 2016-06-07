import Board from './google5/board';
noise.seed(0.52);

//setup is called when the board is mounting.
/*var originalSetup = window.paper.setup

window.paper.setup = function(){
  console.log('**** google board being mounted')
  originalSetup.call(window.paper);
  init();
}
*/


function init(){
  //HintRunner.init();
  //BoardTests.run();
  
}


function boardCallback(actions, popups){
  //window.isItemSelected = true;
  //actions.fadeInTimeline();

  //show timeline immediately
  //actions.onBoardContinue()
  actions.onBoardReset()
  
  Board.start(window.board);
}

window.__callBoardie = boardCallback;