import * as data from './data';
import debug from './debug';
import preloader from './preloader';
import * as utils from './utils';
import AnimatedMesh from './core/animated-mesh';

import MeshDecorator from './decorators/mesh';
import TextDecorator from './decorators/text';
import BoidDecorator from './decorators/boid';
import MovingTargetDecorator from './decorators/moving-target';

import {debounce} from "lodash";

const state = {
  selectedModel: null,
  selectedAnimation: null,
  currentText: null,
  moving: false
};

function create(spacepixels){
  addModelSelection(spacepixels);
  addText(spacepixels);
  addMovingTarget(spacepixels);
  addBoid(spacepixels);

  addMiscOptions(spacepixels);
  addResetFunction();
}

function syncParams(listener, targetObject, property){
  listener.onChange( newValue => {
    targetObject[property] = newValue;
  })
}

/////////
//Misc //
/////////
function addMiscOptions(spacepixels){
  var miscFolder = debug.gui.addFolder('Miscellaneous');
  var listener;

  state.other = {
    basicNoise: true,
    immediatePosition: false
  };


  listener = miscFolder.add(state.other, 'basicNoise');
  syncParams(listener, spacepixels.simulator.velocityFlags, 'random');

  listener = miscFolder.add(state.other, 'immediatePosition');
  syncParams(listener, spacepixels.simulator.positionFlags, 'immediate');

  //show axis
  //global velocity/speed
  //coloring?
}

/////////////////
//Global Reset //
/////////////////
function addResetFunction(){

  //Reset function
  state.reset = function(){
    console.log('reset all');
  }

  debug.gui.add(state, 'reset').name("Reset"); 
}


///////////////
//Boid Magic //
///////////////
function addBoid(spacepixels){
  const decorator = new BoidDecorator(spacepixels);
  let folder = debug.gui.addFolder('Flocking Boid');
  
  state.boids = {
    enabled: false
  };
  
  let listener = folder.add( state.movingTarget, 'enabled').name('Enabled')

  listener.onChange(value => {
    if(value){
      decorator.activate();
    }else{
      decorator.deactivate();
    }
  })
}


//////////////////
//Moving Target //
//////////////////
function addMovingTarget(spacepixels){
  const decorator = new MovingTargetDecorator(spacepixels);

  state.movingTarget = {
    enabled: false
  };
  
  let folder = debug.gui.addFolder('Path');
  let listener = folder.add( state.movingTarget, 'enabled').name('Enabled')
  
  listener.onChange(value => {
    if(value){
      decorator.activate();
    }else{
      decorator.deactivate();
    }
  })
}

/////////////////
//Mesh Targets //
/////////////////
function addModelSelection(spacepixels){
  let meshDecoratorInstance = new MeshDecorator(spacepixels);
  
  const selection = {
    "None": JSON.stringify(false), 
    "Bear": JSON.stringify({ id: 'bear', type: 'static'}), 
    "Bear (animated)": JSON.stringify({ id: 'bear', type: 'animated'}),
    "Wolf": JSON.stringify({ id: 'wolf', type: 'static'}),
    "Wolf (animated)": JSON.stringify({ id: 'wolf', type: 'animated'})
  }

  state.selectedModel = selection["None"];
  let mesh, listener = debug.gui.add( state, 'selectedModel', selection).name('Models')
  
  listener.onChange(data => {
    let parsedData = JSON.parse(data);
    
    if(parsedData === false){
      
      meshDecoratorInstance.deactivate();
    
    }else{
      
      if(parsedData.type == 'static'){
        mesh = createMesh(parsedData.id);
      }else{
        mesh = createAnimation(parsedData.id);
      }  
      
      meshDecoratorInstance.showMesh(mesh);
    }
  })
}

/////////
//Text //
/////////
function addText(spacepixels){
  var textFolder = debug.gui.addFolder('Text');

  let textDecoratorInstance = new TextDecorator(spacepixels);
  state.text = {};
  state.text.currentText = "";
  state.text.selectedText = "";
  
  const predefinedTextValues = [
    'yOO :)',
    'hello',
    'oH BOY!!!11!'
  ]
    
  let selectTextListener = textFolder.add( state.text, 'selectedText', predefinedTextValues)
  selectTextListener.onChange( newText => {
    state.text.currentText = newText;
    handleTextChange(newText);
  })
  
  let textChangedListener = textFolder.add( state.text, 'currentText').name("Enter Text:").listen();

  let handleTextChange = function(newText){
    if(newText.length == 0){
      textDecoratorInstance.deactivate();
    }else{
      textDecoratorInstance.setText(newText);
    }
  }
  
  handleTextChange = debounce(handleTextChange, 500);
  textChangedListener.onChange(handleTextChange)
}

export default {
  create
}




////////////
//helpers //
////////////

function createMesh(id){
  let resources = preloader.getResources();
  let modelData = resources[id].data;
  let modelInfo = data.getModel(id);
  let mesh = utils.createMeshFromJson(modelData, modelInfo.scale);

  return mesh;
}

function createAnimation(id){
  let resources = preloader.getResources();
  let modelInfo = data.getModel(id);
  let modelData = resources[id].data;

  let animatedMesh = new AnimatedMesh(utils.parseGeometryJson(modelData), 1);
  animatedMesh.scale.setScalar(modelInfo.scale);

  return animatedMesh;
}

