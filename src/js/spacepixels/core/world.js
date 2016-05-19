import Emitter from 'events';
import createContext from 'webgl-context';
import observerCamera from './observer-camera';
import debounce from 'lodash/function/debounce';
import Ticker from './ticker';

const contextAttributes = {
  depth: true,
  alpha: false,
  depth: true,
  stencil: false,
  antialias: false,
  premultipliedAlpha: true,
  preserveDrawingBuffer: false,
  logarithmicDepthBuffer: false,
  autoClear: true,
  clearColor: 0x0,
  clearAlpha: 1,
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
    this.render = this.render.bind(this);
    this._debug = debugTool;

    this.init();
  }

  run(){
    this.timer.start();
  }
  
  init(){
    let gl = createContext();
    document.body.appendChild(gl.canvas)
    
    this.timer = new Ticker();
    this.timer.on("tick", this.render);
    this.timer.on("fixed-tick", (dt, time) => this.emit('fixedstep', dt, time));

    this.setup(gl, window.innerWidth, window.innerHeight);
    this.handleResize(window.innerWidth, window.innerHeight);
  }

  handleResize(width, height){
    if (!this._renderer) return

    this.renderer.setSize(width, height);
    this.camera.aspect = width/height;
    this.camera.updateProjectionMatrix();

    this.emit('resize', width, height);
  }


  setup(gl, width, height){
    this._camera = observerCamera.create(gl.canvas);

    this._scene = new THREE.Scene();
    this._renderer = new THREE.WebGLRenderer({
      ...contextAttributes,
      canvas: gl.canvas        
    })
    
    this._renderer.setClearColor( 0 );
    this._canvas = gl.canvas;
    this._canvas.width = width;
    this._canvas.height = height;

    let axisHelper = new THREE.AxisHelper( 2 );
    this.scene.add( axisHelper );
    

    window.addEventListener('resize', debounce(() => {
      this.handleResize(window.innerWidth, window.innerHeight);
    }));
  }

  render(dt){
    if(this._debug){
      this._debug.stats.begin();
    }

    this.emit('tick', dt);

    this._renderer.render(this._scene, this._camera)
    
    if(this._debug){
      this._debug.stats.end()
    }

    this.emit('render', dt);
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
  
}

export default {
  create(debugTool){
    let world = new World(debugTool);
    world.run();
    
    return world;
  }
}