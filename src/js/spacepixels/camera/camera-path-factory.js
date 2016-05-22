import THREE from 'three';
import CameraPath from './camera-path';

//http://threejs.org/examples/webgl_geometry_spline_editor.html

function defaultPath(){
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
  var matrix = createMatrix(0.1);


  for ( var i = 0, il = vertices.length; i < il; i ++ ) {

    var vertex = vertices[ i ];
    vertex.applyMatrix4( matrix );

  }
  return generatePath(vertices)
}

function createMatrix(scale = 1){
  var matrix = new THREE.Matrix4();
  matrix.multiplyScalar(0.01);
  return matrix;

  //var euler = new THREE.Euler( Math.PI, 0, 0, 'YXZ' );
  var q = new THREE.Quaternion();
  q.setFromEuler(euler) 

  var p = new THREE.Vector3(0,0,0),
    s = new THREE.Vector3(scale,scale,scale);

  matrix.compose(p, q, s)
}

function mirrorPath(){
  var matrix = createMatrix();

  var vertices = [
    new THREE.Vector3(599.4446995639825, -204.28065866420454, -0.22426862166743433),
    new THREE.Vector3(199.8765568639659, -193.15758919285776, -2.2083697667991102),
    new THREE.Vector3(29.99804202860742, -72.2108342233512, -163.31324175630647),
    new THREE.Vector3(-76.416232666872, -267.3145676788882, -34.670403560388635),
    new THREE.Vector3(-29.53591789704594, -235.71469771381877, 43.419815824873076),
    new THREE.Vector3(171.89071225990034, 16.74015020780562, -29.877951707003604),
    new THREE.Vector3(-42.528695597317835, 136.50439947289686, -165.30419976476233)
  ];

  for ( var i = 0, il = vertices.length; i < il; i ++ ) {

    var vertex = vertices[ i ];
    vertex.applyMatrix4( matrix );

  }
  return generatePath(vertices)
}

function createCatmull(vertices){
  return generatePath(vertices);
}

function create(){
  return defaultPath();

  /*switch(id){
    default: return defaultPath();
  }*/
}



function generatePath(list){
  var curve, cameraPath = new CameraPath();

  curve = new THREE.CatmullRomCurve3(list)
  cameraPath.add(curve)

  return cameraPath;
}


export default {
  create: create,
  createCatmull: createCatmull
};