import THREE from "three";

export default class ShaderPass{
  constructor(shader){
    if (shader instanceof THREE.Material){
      this.material = shader;
    }else{
      this.material = this.createShaderMaterial(shader);
    }
        
    this.init();
  }

  init(){
    this.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );
    this.scene  = new THREE.Scene();
    
    this.quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), null );
    this.quad.material = this.material;
    this.scene.add( this.quad );
    this.clear = false;
  }
  
  createShaderMaterial(shader) {
    return new THREE.ShaderMaterial({
      defines: cloneDefines(shader.defines),
      uniforms: THREE.UniformsUtils.clone(shader.uniforms),
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader
    });
  }

  
  render(renderer, writeBuffer){
    //console.log('render')
    renderer.render(this.scene, this.camera, writeBuffer, this.clear);
  }
}