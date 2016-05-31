import PathDrawer from './path-drawer';

export default class PathPlotter{
  constructor(){
    this._currentPosition = new THREE.Vector3();
    this._internalPath = new THREE.CurvePath();
    this._drawer = new PathDrawer(this);
  }
  
  add(curve){
    this._internalPath.add(curve);
    this._drawer.addCurve(curve);
  }
  
  get drawer(){
    return this._drawer;
  }
  
  get currentPosition(){
    return this._currentPosition;
  }
  
  step(t){
    if(t < 0.001){
      t = 0.001
    }


    var pos = this._internalPath.getPoint(t);
    this._currentPosition.copy(pos);

    var plottedPosition = this._internalPath.getPoint(t - 0.001);//look forward
    var direction = pos.clone().sub(plottedPosition).normalize();

    //camera.position.copy(pos2);
    //camera.lookAt( pos);
    
    if(this._drawer){
      this._drawer.step(pos, plottedPosition)
    }
  }
}


export default PathPlotter;