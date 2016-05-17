import THREE from "three";


export default class AnimatedMesh extends THREE.Mesh {
  constructor(geometry, fps){
    super(geometry, new THREE.MeshNormalMaterial( {  morphTargets: true }))
    this._fps = fps;
    this.init();
  }
  
  
  init(){
    var mixer = new THREE.AnimationMixer( this );
    mixer.timeScale = 1/4;

    var clip = THREE.AnimationClip.CreateFromMorphTargetSequence( 'gallop', this.geometry.morphTargets, 6 );
    mixer.clipAction( clip ).play();
    
    this._mixer = mixer;
  }

  update(dt){
    this._mixer.update( dt );
  }
}