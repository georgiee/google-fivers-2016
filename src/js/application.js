//import Board from './google5/board';
//import Me from './google5/me';
//import Fivers from './google5/components/fivers';
import Automator from './google5/automator';

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

//moneky patched creativelab5 sourcefile will call us when ready :)
function boardCallback(actions, popups){
  //window.isItemSelected = true;
  //actions.fadeInTimeline();
  
  Automator.start(window.board);
  //show timeline immediately, dont do this without data to continie (use reset then)
  //actions.onBoardContinue()

  //reset.
  actions.onBoardReset()
  
  //Board.start(window.board);
  //Me.start(window.board);
}

window.__callBoardie = boardCallback;