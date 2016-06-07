import Paper from 'paper';
import Keyframe from './keyframe';

export default class DotOcean{
  constructor(board, width, height){
    this._board = board;
    this._width = width;
    this._height = height;
    this._time = 0;

    this.init();
  }
  
  init(){
    var targetGridSize = 5;
    
    var maxWidth = this._width/targetGridSize;
    var maxHeight = this._height/targetGridSize;
    var maxSize = Math.max(maxWidth, maxHeight);
    
    if(maxWidth > maxHeight){
      this._rows = Math.ceil(this._height/maxSize);
      this._columns = targetGridSize;
    }else{
      this._rows = targetGridSize
      this._columns = Math.ceil(this._width/maxSize);
    }
    
    this._maxSize = maxSize;
    this._totalCount = this._columns * this._rows;

  }

  create(){
    this.items = [];

    for(var i = 0; i < this._rows; i++){
      for(var j = 0; j < this._columns; j++){
        var index = i * this._columns + j;

        var dot = this.createSingleDot(i, j, index, this._maxSize);
        this.items.push(dot);
      }  
    }
  }
  
  set time(value){
    this._time = value;
    this.update();
  }

  get time(){
    return this._time;
  }

  update(overrideTime){
    var time = overrideTime || this._time;
    var amp = this._maxSize/4;

    for(var i = 0, l = this.items.length; i<l; i++){
      var shape = this.items[i]
      var path = shape.path;

      var dy = amp * Math.sin( 10*time * Math.PI/2 + Math.PI * shape.indexRatio)
      var py = shape.originalPosition.y + dy;

      path.position.y = py;
    }
  }

  createSingleDot(row, column, index, maxSize){
    var position = new Paper.Point();

    position.x = column * maxSize + maxSize/2
    position.y = row * maxSize + maxSize/2

    var ratio = index/this._totalCount;
    var n = noise.perlin2(row/this._rows, column/this._columns);
    var size = (1 + n) * maxSize;

    var color = chroma(360 * ratio, 1, 0.6, 'hsl').hex();
    var path = new Paper.Path.Circle(position, size);
    path.fillColor = color;
    
    var shape = this._board.addPath(path);
    shape.originalPosition = position.clone();
    shape.indexRatio = ratio;
    shape.path.sendToBack();
    return shape;
    //b.createDot(position, size, color);
  }
  
  toKeyframes(time, frame){
    this.update(time);
    console.log(frame|0)
    var keyframes = this.items.map( shape =>  Keyframe.createFromShape(shape, frame|0) );
    return keyframes;
  }
}