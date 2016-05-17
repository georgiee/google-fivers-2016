import Timer from './timer';
import Emitter from 'events';

const contextAttributes = {
  depth: true,
  alpha: false,
  depth: true,
  stencil: false,
  antialias: false,
  premultipliedAlpha: true,
  preserveDrawingBuffer: false,
  logarithmicDepthBuffer: false,
  autoClear: false,
  clearColor: 0x0,
  clearAlpha: 0,
  sortObjects: true,
  shadowMapEnabled: false,
  shadowMapType: THREE.PCFShadowMap,
  shadowMapCullFace: THREE.CullFaceFront,
  shadowMapDebug: false
}

const createOrbitViewer = require('three-orbit-viewer')(THREE)

class World extends Emitter{
  constructor(debugTool){
    super();
    this._debug = debugTool;

    this.init();
  }
  
  get scene(){
    return this._scene;
  }
  
  get canvas(){
    return this._canvas;
  }
  
  get renderer(){
    return this._renderer;
  }

  get camera(){
    return this._camera;
  }
  
  get controls(){
    return this._controls;
  }
  
  init(){
    this.viewer = createOrbitViewer({
      contextAttributes,
      fov: 45,
      position: new THREE.Vector3(0, 0, -9)
    });

    this._scene = this.viewer.scene;
    this._renderer = this.viewer.renderer;
    this._camera = this.viewer.camera;
    this._canvas = this.viewer.renderer.domElement;
    this._controls = this.viewer.controls;
    //this._controls.enabled = false;
    

    this.viewer.on('tick', this.tick.bind(this));
    this.viewer.on('render', this.render.bind(this));


    let axisHelper = new THREE.AxisHelper( 2 );
    this.scene.add( axisHelper );

    this._timer = new Timer();
    this._timer.fixedCallback = (dt, time) => this.emit('fixedstep', dt, time);


  }

  start(){
    this._timer.start();
  }
  
  tick(dt){
    this._debug.stats.begin();
    this.emit('tick', dt);
  }
  
  render(dt){
    this._debug.stats.end()
    this.emit('render', dt);
  }
}

export default {
  create(debugTool){
    let world = new World(debugTool);
    world.start();
    
    return world;
  }
}