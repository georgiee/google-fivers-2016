//require('touch-emulator')();
import Hammer from 'hammerjs';

export default class SpaceMouse{
  constructor(world){
    this._world = world;
    this._domElement = world.canvas;
    this.init();
  }
  
  normalizeCoordinate(coordinate){
    return {
      x: coordinate.x / this._domElement.clientWidth * 2 - 1,
      y: coordinate.y / this._domElement.clientHeight * -2 + 1
    }
  }
  
  init(){
    this._raycaster = new THREE.Raycaster();


    this._hammertime = new Hammer(this._domElement);
    //this._hammertime.on('pan', this.handlePan.bind(this));
    this._hammertime.on('tap', this.handleTap.bind(this));

    this._domElement.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this._domElement.addEventListener('touchend', this.handleTouchEnd.bind(this));
  }
  
  handleTouchStart(){
    console.log('start')
  }
  
  handleTouchEnd(){
    console.log('end')
  }
  
  handlePan(ev){
    console.log('handlePan')
  }
  
  handleTap(ev){
    
    let screenPosition = this.normalizeCoordinate(ev.center);
    this._raycaster.setFromCamera( screenPosition, this._world.camera ); 

    let point = this.calculatePointOnViewPlane();
    //this.uniforms.uInputPosAccel.value.x = 
    //this.uniforms.uInputPosAccel.value.y = 
    this.uniforms.uInputPos.value.copy(point);
    this.sphere.position.copy(point);
  }

  calculatePointOnViewPlane(){
    let pos = this._world.controls.target;
    let nor = pos.clone().sub(this._world.camera.position).normalize();

    let plane = new THREE.Plane(
        nor, -nor.x*pos.x - nor.y*pos.y - nor.z*pos.z
    );
    let point = this._raycaster.ray.intersectPlane(plane);
    return point;  
  }

  static create(world, uniforms){
    var mouse = new SpaceMouse(world)

    var geometry = new THREE.BoxGeometry( 1,1,1,2,2,2);
    var sphere = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
    sphere.scale.setScalar(0.1);
    world.scene.add(sphere);
    
    var plane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 15, 15 ),
        new THREE.MeshNormalMaterial({side: THREE.DoubleSide}) );
    plane.rotation.x = Math.PI/2;

    //world.scene.add(plane);

    mouse.plane = plane;
    mouse.sphere = sphere;
    mouse.uniforms = uniforms;
  }
}