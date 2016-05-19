export default class BufferPingPong{
  constructor(buffer1, buffer2){
    this._bufferSource = this._buffer1 = buffer1;
    this._bufferWrite = this._buffer2 = buffer2;
  }
  
  get source(){
    return this._bufferSource;
  }
  
  get write(){
    return this._bufferWrite;
  }

  swap(){
    this._swapped = !this._swapped;

    if(this._swapped){

      this._bufferSource = this._buffer2;
      this._bufferWrite = this._buffer1; 
    
    }else{

      this._bufferSource = this._buffer1;
      this._bufferWrite = this._buffer2;
    }
  }
}
