export default class CameraDebugPath extends THREE.Object3D{
  constructor(path){
    super();
    this.path = path;
    
    this.createArrow();
  }
  
  createArrow(){
    var dir = new THREE.Vector3( 1, 0, 0 );
    var origin = new THREE.Vector3( 0, 0, -1 );
    var length = 10;
    var hex = 0xff0000;
    var headWidth = 5;
    var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex, headWidth );
    arrowHelper.scale.set(10,10,10)
    arrowHelper.up = new THREE.Vector3( 1, 0, 0 );
    this.arrowHelper = arrowHelper;
    this.add(this.arrowHelper)
  }

  addCurve(curve){
    this.createLine(curve);
  }

  createLine(curve){
    var geometry = new THREE.Geometry();
    geometry.vertices = this.path._internalPath.getPoints(50);
    geometry.verticesNeedUpdate = true;
    var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
  
    var geometry = new THREE.Geometry();
    geometry.vertices = curve.getPoints(50);
    geometry.verticesNeedUpdate = true;
    var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xffff00, linewidth: 3 } ) );
    this.add(line)
  }
  
  update(p1, p2){
    var direction = p1.clone().sub(p2).normalize();
    this.arrowHelper.setDirection(direction);

    this.arrowHelper.position.copy(p1);
  }
}