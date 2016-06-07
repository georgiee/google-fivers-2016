let __classDefinition;


function create(path, smooth, strokeColor, fillColor, isLine){
  console.log('creating path');
  return new __classDefinition(path, smooth, strokeColor, fillColor, isLine)
}

function setBlueprint(blueprintGShape){
  //derive our own class constructor so we can create our own ghsapes
  var GKShape = blueprintGShape.constructor;
  GKShape.prototype = Object.create(blueprintGShape.constructor.prototype)
  
  __classDefinition = GKShape;
}


export default {
  create, setBlueprint
}