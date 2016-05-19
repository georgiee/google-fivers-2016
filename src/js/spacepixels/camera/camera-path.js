import THREE from 'three';
import CameraPathDrawer from './camera-path-drawer';

class CameraPath{
  constructor(){
    this._internalPath = new THREE.CurvePath();
    this._debugView = new CameraPathDrawer(this);
  }
  
  add(curve){
    this._internalPath.add(curve);
    this._debugView.addCurve(curve);
  }
  
  getDebugView(){
    return this._debugView;
  }
  
  showCameraAt(camera, t){
    if(t < 0.001){
      t = 0.001
    }

    var pos = this._internalPath.getPoint(t);
    var pos2 = this._internalPath.getPoint(t - 0.001);//look forward
    var direction = pos.clone().sub(pos2).normalize();

    camera.position.copy(pos2);
    //camera.lookAt( pos);
    
    if(this._debugView){
      this._debugView.update(pos, pos2)
    }
  }
}


export default CameraPath;