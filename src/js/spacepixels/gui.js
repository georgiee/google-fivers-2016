import * as data from './data';
import debug from './debug';
import preloader from './preloader';
import * as utils from './utils';
import AnimatedMesh from './core/animated-mesh';

import MeshDecorator from './decorators/mesh';
import TextDecorator from './decorators/text';
import MovingTargetDecorator from './decorators/moving-target';

const state = {
  selectedModel: null,
  selectedAnimation: null,
  currentText: null,
  moving: false
};

function create(spacepixels){
  addModelSelection(spacepixels);
  addAnimationSelection(spacepixels);
  addText(spacepixels);
  addMovingTarget(spacepixels);
}


function addMovingTarget(spacepixels){
  const decorator = new MovingTargetDecorator(spacepixels);
  let listener = debug.gui.add( state, 'moving')
  
  listener.onChange(value => {
    if(value){
      decorator.activate();
    }else{
      decorator.deactivate();
    }
  })
}

function addModelSelection(spacepixels){
  const decorator = new MeshDecorator(spacepixels);
  let listener = debug.gui.add( state, 'selectedModel', ['bear', 'wolf'])

  listener.onChange(modelID => {
    let mesh = createMesh(modelID)
    decorator.showMesh(mesh);
  })
}

function addAnimationSelection(spacepixels){
  const decorator = new MeshDecorator(spacepixels);
  let listener = debug.gui.add( state, 'selectedAnimation', ['bear', 'wolf'])

  listener.onChange(modelID => {
    let mesh = createAnimation(modelID)
    decorator.showMesh(mesh);
  })
}

function addText(spacepixels){
  const decorator = new TextDecorator(spacepixels);
  
  let listener = debug.gui.add( state, 'currentText', [null, 'hello'])

  listener.onChange(value => {
    if(value){
      decorator.setText(value);
    }else{
      decorator.deactivate();
    }
    
  })


  //Text
  /*
  
  debug.params.currentText = '';

  debug.gui.add(debug.params, 'currentText').onChange(newValue => {
    spacepixels.setText(newValue);
  })

  */
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

