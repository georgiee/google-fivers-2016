import THREE from "three";
import UVMapperShader from './shaders/uvmapper'
import BufferPingPong from './core/buffer-ping-pong';

import * as util from './utils';
import {createRenderTarget} from './utils';

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

    this.material = UVMapperShader.create();

    this._scene  = new THREE.Scene();
    this._scene.overrideMaterial = this.material;
    this._camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );
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
    this._renderer.render(this._scene, this._camera, this._target.write, true);
    this._target.swap();
  }

  static create(mesh, renderer, size){
    var mapper = new MeshMapper(renderer, size);
    mapper.setMesh(mesh);
  }
}
