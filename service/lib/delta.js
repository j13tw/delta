var co = require('co');

module.exports = function(client){
  this.client = client;

  function writeRegister(addresses,value){
    return client.writeSingleRegister(addresses, value).then(function (resp) {
          console.log(resp);
    }, console.error);
  }

  this.alarmReset = co.wrap(function * () {
      yield writeRegister(32, Buffer.from([0x01, 0x01]));
      yield writeRegister(33, Buffer.from([0x01, 0x01]));
      yield writeRegister(34, Buffer.from([0x01, 0x01]));
      yield writeRegister(38, Buffer.from([0x01, 0x01]));
      yield writeRegister(39, Buffer.from([0x01, 0x01]));
      yield writeRegister(384, Buffer.from([0x01, 0x01]));
  });

  this.runRL = co.wrap(function * (value){
    yield writeRegister(544,value);
    yield writeRegister(552,6);
  });

  this.startpRL = function (){
    return writeRegister(552,2);
  };

  this.pauseRL = function (){
    return writeRegister(552,4);
  };

  this.stopRL = function (){
    return writeRegister(552,3);
  };

  this.servoStart = co.wrap(function * (){
    yield writeRegister(6,Buffer.from([0x01, 0x01]));
    yield writeRegister(7,Buffer.from([0x01, 0x01]));
  });

  this.servoStop = co.wrap(function * (){
    yield writeRegister(6,Buffer.from([0x00, 0x00]));
    yield writeRegister(7,Buffer.from([0x00, 0x00]));
  });

  this.movSpeed = function (value){
    return writeRegister(804,value);
  }

  this.mov = function (value){
    return writeRegister(768,value);
  }

  this.movStop = function (){
    return writeRegister(768,1000);
  }

  this.readIp = function(){
    return client.readHoldingRegisters(152, 2).then(function (resp) {
          // resp will look like { fc: 3, byteCount: 20, register: [ values 0 - 10 ], payload: <Buffer> }
          console.log(resp);
    }, console.error);
  }

}
