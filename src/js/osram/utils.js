import THREE from 'three';
import GeometryUtils from 'imports?THREE=three!exports?THREE.GeometryUtils!./extra/GeometryUtils';
import fontDef from 'raw!three/examples/fonts/helvetiker_regular.typeface.js';

const defaultPointGenerator = function(wValue = 1){

  return (data, k, count) => {
    var bounds = 4.0;
    var x = Math.random() * bounds - bounds/2;
    var y = Math.random() * bounds - bounds/2;
    var z = Math.random() * bounds - bounds/2;

    data[ k + 0 ] = x;
    data[ k + 1 ] = y;
    data[ k + 2 ] = z;
    data[ k + 3 ] = wValue;
  }
}
const longRow = function(data, k, count){
  var bounds = 4.0;
  var x = k/count * 4;
  var y = k/count * 4;
  var z = Math.random() * bounds - bounds/2;

  data[ k + 0 ] = x;
  data[ k + 1 ] = y;
  data[ k + 2 ] = z;
  data[ k + 3 ] = 1;
}


function generateRandomPoints(count, generator){
 var data = new Float32Array( count * 4 );

  for ( var k = 0, kl = data.length; k < kl; k += 4 ) {
    
    generator(data, k, count)
  }

  return data;
}

export function generatePositionTexture(size) {
  var a = generateRandomPoints(size * size, defaultPointGenerator(1));
  //var a = generateRandomPoints(size * size, longRow);

  var texture = new THREE.DataTexture( a, size, size, THREE.RGBAFormat, THREE.FloatType );
  texture.needsUpdate = true;

  return texture;

}

export function generateTextPoints(text = 'hello', size, pointCount){
  if(!pointCount){
    pointCount = size * size / 2 // use half of all points per default
  }
  let font = new THREE.Font(JSON.parse(fontDef.substring(65, fontDef.length - 2)));

  var textGeo = new THREE.TextGeometry( text, {
    size: 1,
    height: 0.5,
    curveSegments: 0,

    font: font,
    weight: "bold",
    style: "normal",

    bevelThickness: 2,
    bevelSize: 5,
    bevelEnabled: false

  });

  textGeo.applyMatrix( new THREE.Matrix4().makeTranslation( -0.9, 0, 0.2 ) );
  //textGeo.applyMatrix( new THREE.Matrix4().makeTranslation( -0.9, 10, 0.2 ) );  

  var data = generateRandomPoints(size * size, defaultPointGenerator(0));//assign 0 to w so that the pass  through shader discard the position and uses the old one isntead

  var points = THREE.GeometryUtils.randomPointsInGeometry( textGeo, pointCount );

  for ( var i = 0, j = 0, l = Math.min(points.length, data.length ); j < l; i += 4, j += 1 ) {

    data[ i ] = points[ j ].x;
    data[ i + 1 ] = points[ j ].y;
    data[ i + 2 ] = points[ j ].z;
    data[ i + 3 ] = 1.0;

  }




  var texture = new THREE.DataTexture( data, size, size, THREE.RGBAFormat, THREE.FloatType ); // was RGB format. changed to RGBA format. see discussion in #8415 / #8450
  texture.needsUpdate = true;

  return texture;
}


export function generateGeometryPoints(geometry, size, pointCount){
  if(!pointCount){
    pointCount = size * size / 2 // use half of all points per default
  }


  //geometry.applyMatrix( new THREE.Matrix4().makeTranslation( -0.9, 0, 0.2 ) );

  var data = generateRandomPoints(size * size, defaultPointGenerator(0));//assign 0 to w so that the pass  through shader discard the position and uses the old one isntead

  var points = THREE.GeometryUtils.randomPointsInGeometry( geometry, pointCount );

  for ( var i = 0, j = 0, l = Math.min(points.length, data.length ); j < l; i += 4, j += 1 ) {

    data[ i ] = points[ j ].x;
    data[ i + 1 ] = points[ j ].y;
    data[ i + 2 ] = points[ j ].z;
    data[ i + 3 ] = 1.0;

  }




  var texture = new THREE.DataTexture( data, size, size, THREE.RGBAFormat, THREE.FloatType ); // was RGB format. changed to RGBA format. see discussion in #8415 / #8450
  texture.needsUpdate = true;

  return texture;
}

export function generateVelocityTexture(size) {

  var a = new Float32Array( size*size * 4 );

  for ( var k = 0, kl = a.length; k < kl; k += 4 ) {

    var x = 0.1 * (Math.random() - 0.5);
    var y = 0.1 * (Math.random() - 0.5);
    var z = 0.1 * (Math.random() - 0.5);
    
    a[ k + 0 ] = x;
    a[ k + 1 ] = y;
    a[ k + 2 ] = z;
    a[ k + 3 ] = 1;

  }

  var texture = new THREE.DataTexture( a, size, size, THREE.RGBAFormat, THREE.FloatType ); // was RGB format. changed to RGBA format. see discussion in #8415 / #8450
  texture.needsUpdate = true;

  return texture;

}

export function createRenderTarget(size, name ='particleTarget') {
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