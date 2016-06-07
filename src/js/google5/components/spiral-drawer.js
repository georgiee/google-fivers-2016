import Paper from "paper";
import BoardUtils from './../board-utils';
import GlobalShapeList from './../global-shape-list';

class SpiralImageDrawer{
  constructor(board, resolution = 140){
    this.resolution = resolution
    this.board = board;
    this.scaleValue = 1.35

    //this.drawSpiralBackground()
  }
  
  draw(id){
    return this.load(id)
    .then(this.redrawSpiral.bind(this))
  }

  drawSpiralBackground(){
    var path = new Paper.Path.Circle(Paper.view.center, 270);
    path.fillColor = "rgba(0,0,0,1)"
    
    var spiralShape = BoardUtils.addPath(path, false)
    spiralShape.__name = 'spiral';
    
    GlobalShapeList.retrieve(spiralShape);

    return spiralShape;
  }

  redrawSpiral(){
    this.reset();    
    this.generatedShape = this.generatePath(Paper.view.center);
    this.generatedShape.__name = 'spiralImage';

    GlobalShapeList.retrieve(this.generatedShape);
  }

  get shape(){
    return this.generatedShape
  }

  reset(){
    this.count = 0;
  }
  
  generatePath2(center){
    //replacement circle during dev
    var path = new Paper.Path.Circle(center, 270);
    path.fillColor = "rgba(255,220,0,0.5)"
    //path.__name = 'spiral';
    
    var spiralShape = BoardUtils.addPath(path, false)
    
    //spiralShape.fillColor = "rgba(255,220,0,0.5)"
    //spiralShape.addKeysFromConsole();
    
    return spiralShape;
  }

  generatePath(center){
    this.centerPosition = center.clone();

    this.path = new Paper.Path({
      fillColor: 'white',
      closed: true
    });

    for(var i = 0; i < this.resolution; i++){
      this.renderStep();  
    }
    
    this.path.smooth();
    this.spiralShape = BoardUtils.addPath(this.path, false)
    
    return this.spiralShape;
  }
  
  renderStep(){
    for (var i = 0, l = this.count / 36 + 1; i < l; i++) {
      this.step();
    }
  }
  
  step(){
    this.count++;

    var position = this.centerPosition;
    var path = this.path;

    var vector = new Paper.Point({
      angle: this.count * 5,
      length: this.count / this.resolution * this.scaleValue
    });
    
    var rot = vector.rotate(90);
    var color = this.raster.getAverageColor(position.add(vector.divide(2)));
    var value = color ? (1 - color.gray) * 3.7 : 0;
    rot.length = Math.max(value, 0.4);

    path.add(position.add(vector).subtract(rot) );
    path.insert(0, position.add(vector).add(rot));
    
    this.centerPosition = position.add(vector);
  }

  
  load(id){
    var self = this;
    var promise = new Promise(function(resolve, reject){
      
      var raster = new Paper.Raster(id).on('load', function(){
        raster.fitBounds(Paper.view.bounds)
        raster.scale(0.45)
        //raster.position.y = 50;
        raster.remove();

        self.raster = raster;
        
        resolve(raster);
      });  
    
    })

    return promise;
  }

}

export default {
  create: function(board){
    var drawer = new SpiralImageDrawer(board);
    return drawer;
  }
}