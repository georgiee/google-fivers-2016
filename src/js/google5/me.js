import Paper from 'paper';
import GShapeFactory from './gshape-factory';
import Keyframe from './core/keyframe';

var maxFrames = 540;

class Me{
  constructor(board){
    this._oldBoard = board;
    this.count = 0;
  }
  
  handleRasterReady(){
    console.log('ready', this.raster);
    
    var shape = this.generatePath();
    this.makeKeyframe(shape, 0, 0.75, 0)
    shape.positionRevert();

    shape.path.sendToBack();

    this.generateBackgroundRect();

    //this.makeKeyframe(shape, 0.25, 2, 35)
    //this.makeKeyframe(shape, 0.5, 0.6, -70)  
    //this.makeKeyframe(shape, 0.75, 4, 35, 'red')
    //this.makeKeyframe(shape, 1, 0.25, 0)
  }
  
  load(rasterID){
    this.raster = new Paper.Raster(rasterID).on('load', this.handleRasterReady.bind(this));
    this.raster.fitBounds(Paper.view.bounds)
    this.raster.remove();
    //this.raster.position.x = this.raster.bounds.width/2;
    //this.raster.position.y = this.raster.bounds.height/2;
    
  }

  makeKeyframe(shape, progress, scale = 1, rotate = 0, color = 'white'){
    var frame = progress * maxFrames;
    shape.path.scale(scale)
    shape.path.rotate(rotate);
    shape.fill(color);

    var keyframe = Keyframe.createFromShape(shape, frame)
    shape.addKey(keyframe)
    this._oldBoard.saveState()
  }

  makeKeyframe2(shape, progress){
    var frame = progress * maxFrames;
    var keyframe = Keyframe.createFromShape(shape, frame)
    shape.addKey(keyframe)

    this._oldBoard.saveState()
  }

  generateBackgroundRect(){
    var rect = new Paper.Path.Rectangle(0,0,Paper.view.bounds.width,Paper.view.bounds.height);
    rect.fillColor = 'black';
    //rect.fitBounds(Paper.view.bounds)
    rect.sendToBack();
    var bgShape = this.addPath(rect, false)
    
    var path = bgShape.path.clone();

    bgShape.path.scale(0)
    this.makeKeyframe2(bgShape, 0)
    
    bgShape.path = path

    this.makeKeyframe2(bgShape, 1)
    bgShape.positionRevert();
    
  }

  generatePath(){
    this.position = Paper.view.center;

    this.path = new Paper.Path({
      fillColor: 'white',
      closed: true
    });

    for(var i = 0; i < 150; i++){
      this.renderStep();  
    }
    
    this.path.smooth();
    this.spiralShape = this.addPath(this.path)

    return this.spiralShape;
  }
  
  renderStep(){
    for (var i = 0, l = this.count / 36 + 1; i < l; i++) {
      this.step();
    }

  }
  
  step(){
    this.count++;

    var position = this.position;
    var path = this.path;

    var vector = new Paper.Point({
      angle: this.count * 5,
      length: this.count / 100
    });
    
    var rot = vector.rotate(90);
    var color = this.raster.getAverageColor(position.add(vector.divide(2)));
    var value = color ? (1 - color.gray) * 3.7 : 0;
    rot.length = Math.max(value, 0.4);

    path.add(position.add(vector).subtract(rot) );
    path.insert(0, position.add(vector).add(rot));
    
    this.position = position.add(vector);
  }

  run(){

  }

  add(shape){
    this._oldBoard.addShape(shape)
    //shape.addKeysFromConsole()

    return shape;
  }
  
  addPath(path, smooth = true){
    var shape = GShapeFactory.create(path, smooth, path.fillColor.toCSS(true), 'black', false);
    return this.add(shape);
  }
}

export default {
  start: function(board){
    GShapeFactory.setBlueprint(window.all.shapes[0]);

    var me = new Me(board);
    me.load('mimimi')
  }
}