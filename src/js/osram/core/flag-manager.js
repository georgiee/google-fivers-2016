function* entries(obj) {
   for (let key of Object.keys(obj)) {
     yield [key, obj[key]];
   }
}

class FlagManager{
  constructor(material, prefix){
    this._flags = []
    this._prefix = prefix;
    this._material = material;

    var proxy = new Proxy(this, this)
    return proxy;
  }
  
  generateKeyName(key){
    return this._prefix + key.toUpperCase();
  }

  write(){
    var targetObj = this._material.defines;
    
    for (let [key, value] of entries(this._flags)) {
      var keyname = this.generateKeyName(key);
      
      if(value){
        targetObj[keyname] = ''
      }else{
        delete targetObj[keyname];
      }
    }
    
    this._material.needsUpdate = true;
  }
  
  set (target, key, value) {
    this._flags[key] = value;
    this.write();
    return true;
  }

  get (target, key) {
    return this._flags[key];
  }
  
  static create(material, prefix){
    return new FlagManager(material, prefix);
  }
}

export default FlagManager;