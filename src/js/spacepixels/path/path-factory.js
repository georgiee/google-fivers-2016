import THREE from 'three';
import PathDrawer from './path-drawer';

//http://threejs.org/examples/webgl_geometry_spline_editor.html

function defaultPath(scale){
  var vertices = [
    new THREE.Vector3(183.82773679913026, -5.490634820449451, 101.63940256499984),
    new THREE.Vector3(63.52612748516373, 0.11977136878908823, -2.2083697667991102),
    new THREE.Vector3(9.981421434893676, 51.60363481643016, -64.05138024426003),
    new THREE.Vector3(-58.50084839100885, -14.577238607049125, -34.670403560388635),
    new THREE.Vector3(-11.810860140309892, -1.888728748187404, 28.14611990486584),
    new THREE.Vector3(28.25378476181088, 30.498463879751707, -26.52757074518796),
    new THREE.Vector3(-112.52454145144266, 36.4381108142651, 49.9097904148296),
    new THREE.Vector3(0, 0, 152.71152905138982)
  ]
  var matrix = createMatrix(scale);


  for ( var i = 0, il = vertices.length; i < il; i ++ ) {

    var vertex = vertices[ i ];
    vertex.applyMatrix4( matrix );

  }
  return generatePath(vertices)
}

function createMatrix(scale = 1){
  var matrix = new THREE.Matrix4();
  matrix.multiplyScalar(scale);
  return matrix;

  //var euler = new THREE.Euler( Math.PI, 0, 0, 'YXZ' );
  var q = new THREE.Quaternion();
  q.setFromEuler(euler) 

  var p = new THREE.Vector3(0,0,0),
    s = new THREE.Vector3(scale,scale,scale);

  matrix.compose(p, q, s)
}


function createCatmull(vertices){
  return generatePath(vertices);
}



function generatePath(list){
  var curve = new THREE.CatmullRomCurve3(list)
  return curve;
}

function getDefaultPath(scale = 1){
  return defaultPath(scale);
}

export default {
  getDefaultPath, createCatmull
};