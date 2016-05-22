import Emitter from 'events';

import THREE from 'three';
import ShaderPass from './core/shader-pass';
import BufferPingPong from './core/buffer-ping-pong';

import * as utils from './utils';

import PositionMaterial from './shaders/simulate-position';
import VelocityMaterial from './shaders/simulate-velocity';
import PassThroughMaterial from './shaders/pass-through';
import FlagManager from './core/flag-manager';

const positionMaterial = PositionMaterial.create();
const velocityMaterial = VelocityMaterial.create();
const passThroughMaterial = PassThroughMaterial.create();

function create(renderer, size){
  const simulator = new Simulator(renderer, size);
  simulator.reset();
  
  return simulator;
}

export default {
  create
}

export class Simulator extends Emitter{
  constructor(renderer, size){
    super();
    this._renderer = renderer;
    this._size = size;
    
    this.init();
    this._velocityFlags = FlagManager.create(this._velocityPass.material, 'MODE_FLAG_');
    this._positionFlags = FlagManager.create(this._positionPass.material, 'MODE_FLAG_');
  }
  
  get velocityFlags(){
    return this._velocityFlags;
  }

  get positionFlags(){
    return this._positionFlags;
  }

  get size(){
    return this._size;
  }
  
  get positionBuffer(){
    return this._position.source;
  }

  stepPosition(dt, time){
    var positionUniforms = this._positionPass.material.uniforms;

    positionUniforms.texturePosition.value = this._position.source;
    positionUniforms.textureVelocity.value = this._velocity.source;
    
    if(this._currentDestination){
      positionUniforms.textureTargetPosition.value = this._currentDestination.source;  
    }
    

    positionUniforms.delta.value = dt;
    positionUniforms.time.value = time;
    this._positionPass.render(this._renderer, this._position.write)
  }
  
  get velocityUniforms(){
    return this._velocityPass.material.uniforms;
  }

  stepVelocity(dt, time){
    var velocityUniforms = this._velocityPass.material.uniforms;

    velocityUniforms.texturePosition.value = this._position.source;
    velocityUniforms.textureVelocity.value = this._velocity.source;
    
    if(this._currentDestination){
      velocityUniforms.textureTargetPosition.value = this._currentDestination.source;
    }

    velocityUniforms.delta.value = dt;
    velocityUniforms.time.value = time;

    this._velocityPass.render(this._renderer, this._velocity.write)
  }

  step(dt, time){
    this.stepPosition(dt, time);
    this.stepVelocity(dt, time);

    this.emit('step', this._position.write, time);
    
    this._position.swap();
    this._velocity.swap();
  }
  
  clearTargetPositions(){
    delete this._currentDestination;
  }

  setTargetPositions(value){//pinpong
    this._currentDestination = value;
  }

  reset(){
    var dtPositionTexture = utils.generatePositionTexture(this._size);
    var dtVelocityTexture = utils.generateVelocityTexture(this._size);

    this.setPosition(this._renderer, dtPositionTexture)
    this.setVelocity(this._renderer,dtVelocityTexture)

    

    this._velocityPass.material.uniforms.textureTargetPosition.value = this._position.source;
    this._positionPass.material.uniforms.textureTargetPosition.value = this._position.source
  }
  
  test(){
    var dtPositionTexture = utils.generateTextPoints('hello', this._size, this._size*this._size/4);
    var dtVelocityTexture = utils.generateVelocityTexture(this._size);

    this.setPosition(this._renderer, dtPositionTexture)
    this.setVelocity(this._renderer, dtVelocityTexture)
  }

  setPosition(renderer, dataTexture){
    this._passThroughPass.material.uniforms.oldTexture.value = this._position.write;
    this._passThroughPass.material.uniforms.texture.value = dataTexture;
    this._passThroughPass.render(renderer, this._position.source)
  }

  setVelocity(renderer, dataTexture){
    var dtVelocityTexture = utils.generateVelocityTexture(this._size);
    this._passThroughPass.material.uniforms.texture.value = dataTexture;
    this._passThroughPass.render(renderer, this._velocity.source)
  }

  init(){
    let target1, target2;


    target1 = this.createRenderTarget(this._size, 'positionTarget1');
    target2 = this.createRenderTarget(this._size, 'positionTarget2');
    this._position = new BufferPingPong(target1, target2);

    target1 = this.createRenderTarget(this._size, 'velocityTarget1');
    target2 = this.createRenderTarget(this._size, 'velocityTarget2');
    this._velocity = new BufferPingPong(target1, target2);
    
    this._passThroughPass = new ShaderPass(passThroughMaterial);
    this._positionPass = new ShaderPass(positionMaterial);
    this._velocityPass = new ShaderPass(velocityMaterial);

  }

  createRenderTarget(size, name) {
    var target = new THREE.WebGLRenderTarget(size, size, {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
        depthBuffer: false,
        stencilBuffer: false
    });
    
    target.texture.generateMipmaps = false;
    target.name = name;

    return target;
  }
}



