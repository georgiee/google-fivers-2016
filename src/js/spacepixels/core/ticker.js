import loop from 'raf-loop';
import Emitter from 'events';

const FIXED_TIME_STEP = 0.02;
const FIXED_TIME_STEP_MAX = 0.2;

export default class Ticker extends Emitter{
  constructor(){
    super();
    this._time = this._remainder = 0;
    this._engine = loop(this.update.bind(this));
  }
  
  start(){
    this._engine.start()

  }

  update(dt){
    var dt = dt/1000;
    this._time += dt;
    this._remainder += dt;

    // cap remainder
    if (this._remainder > FIXED_TIME_STEP_MAX) {
        this._remainder = FIXED_TIME_STEP_MAX;
    }

    // loop remainder
    while (this._remainder > FIXED_TIME_STEP) {
        this.fixedTick(FIXED_TIME_STEP, this._time);
        this._remainder -= FIXED_TIME_STEP;
    }

    this.tick(dt);
  }
  
  fixedTick(dt, time){
    this.emit('fixed-tick', dt, time)
  }

  tick(dt){
    this.emit('tick', dt)
  }
}