import THREE from "three";
import UVMapperShader from './shaders/uvmapper'
import BufferPingPong from './core/buffer-ping-pong';

import * as util from './utils';
import {createRenderTarget} from './utils';


import ShaderPass from './core/shader-pass';
import PassThroughMaterial from './shaders/pass-through';
const passThroughMaterial = PassThroughMaterial.create();

//Plots surface points to a render target so that they can be used in simulations
//this works also for animated meshes

export default class MeshPlotter{
  constructor(renderer, size){
    this._renderer = renderer;
    this._size = size;
    
    this.init();
  }
  
  init(){
    let target1 = util.createRenderTarget(this._size, 'uvmapper1');
    let target2 = util.createRenderTarget(this._size, 'uvmapper2');
    this._target = new BufferPingPong(target1, target2);
    

    this._passThroughPass = new ShaderPass(passThroughMaterial);
    this._passThroughPass.material.uniforms.texture.value = util.getClearTexture(this._size);
    this._passThroughPass.render(this._renderer, this._target.write) //clear manually with our own data
    this._passThroughPass.render(this._renderer, this._target.source) //clear manually with our own data
    
    this.material = UVMapperShader.create();

    this._scene  = new THREE.Scene();
    this._scene.overrideMaterial = this.material;
    this._camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );

    
    this.generateDebugPlane();
    this.setDetails(0.75)
  }

  generateDebugPlane(){
    //allows to look at the involved data
    var texture = new THREE.MeshBasicMaterial( { transparent: true, map: this._target.source} );
    var plane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 5, 5 ), texture );
    plane.rotation.x = -Math.PI/2;
    this.debugPlane = plane; //to look into the uv texture
  }
  
  setDetails(value){
    this.material.uniforms.scale.value = value;
  }

  setMesh(mesh){
    this._mesh = mesh;
    this._scene.add(this._mesh);

    this.render();
  }
  
  get target(){
    return this._target;
  }
  
  update(dt){
    if(this._mesh && this._mesh.update){
      this._mesh.update(dt)
    }
  }

  render(){
    var saveClearColor = this._renderer.getClearColor();
    var saveClearAlpha = this._renderer.getClearAlpha();
    
    this._renderer.setClearColor ( 0, 0 ) //todo: clear the buffer with a color with alpha = 0, global clear color is  alpha = 1
    this._renderer.render(this._scene, this._camera, this._target.write, false); 
    this._renderer.setClearColor ( saveClearColor, saveClearAlpha )
    
    this._target.swap();
  }

  static create(mesh, renderer, size){
    var mapper = new MeshMapper(renderer, size);
    mapper.setMesh(mesh);
  }
}
