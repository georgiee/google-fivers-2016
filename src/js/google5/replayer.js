class Replayer{
  constructor(stateManager){
    this._stateManager = stateManager;
    this.states = [];
  }
  
  propagate(){
    this.states.forEach(state => {
      this._stateManager.restoreAndSetKeyframe(state.data, state.atFrame)
    })
  }

  addState(filename, atFrame){
    var file = require("raw!./states/temp1/" + filename)
    var data = JSON.parse(file);

    this.states.push({ data, atFrame })
  }
}

export default {
  prepare: function(stateManager){
    var replayer = new Replayer(stateManager);
    replayer.addState('0', 0);//google base state
    
    //replayer.addState('s-0', 0)
    replayer.addState('pink-1', 0);
    replayer.addState('pink0', 80);
    replayer.addState('pink1', 100);
    replayer.addState('0', 150);
    replayer.addState('yellow-eyes', 160)
    
    /*replayer.addState('men01', 180);
    replayer.addState('0', 190);
    
    replayer.addState('men0', 250);
    replayer.addState('men1', 290);
    replayer.addState('men0', 310);
    replayer.addState('pink1', 310);
    replayer.addState('pink2', 320);*/

    var offset = 200
    replayer.addState('1-neutral-top-right', 10 + offset)
    replayer.addState('2-angry-top-right', 90 + offset)
    replayer.addState('3-angry-top-left', 150 + offset)
    replayer.addState('4-very-angry-top-left', 180 + offset)
    replayer.addState('3-angry-top-left', 210 + offset)
    
    replayer.addState('pink1', 250 + offset)
    replayer.addState('pinkblack2', 260 + offset)
    replayer.addState('3-angry-top-left', 500)
    replayer.addState('end', 540)

    return replayer;
    
    var offset = 180

    replayer.addState('0', offset);//google base state
    replayer.addState('yellow-eyes', 10 + offset)
    replayer.addState('1-neutral-top-right', 60 + offset)
    replayer.addState('2-angry-top-right', 90 + offset)
    replayer.addState('3-angry-top-left', 150 + offset)
    replayer.addState('4-very-angry-top-left', 180 + offset)
    replayer.addState('3-angry-top-left', 210 + offset)
    replayer.addState('5', 230 + offset)
    replayer.addState('3-angry-top-left', 240 + offset)


    
    //replayer.addState('s-0', 240)
    //replayer.addState('s-1', 360)
    
    return replayer;
  }
}