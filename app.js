var modbus = require('jsmodbus');
var co = require('co');

// create a modbus client
var client = modbus.client.tcp.complete({
        'host'              : '60.249.15.90',
        'port'              : 502,
        'autoReconnect'     : true,
        'reconnectTimeout'  : 1000,
        'timeout'           : 10000,
        'unitId'            : 2      //slave:1 => IP
    });

client.connect();

client.on('connect', function () {
  console.log(123);
  //IP
  // client.readHoldingRegisters(152, 2).then(function (resp) {
  //
  //       // resp will look like { fc: 3, byteCount: 20, register: [ values 0 - 10 ], payload: <Buffer> }
  //       console.log(resp);
  //
  //   }, console.error);

  //servo
  // servoStart(); //開啟4軸馬達
  // servoStop();  //關閉4軸馬達

  //mov
  //mov function X+601 X-602 Y+603 Y-604 Z+605 Z-606
  //movSpeed function 1~100 %
  //movStop function

  function *foo(){
    var movSpeedFun = yield movSpeed(60);
    var movFun = yield mov(601);
    var movStopFun = yield function(){
      setTimeout(function (){
        movStop();
      },600);
    }
    // return [movSpeedFun,movFun,movStopFun];
  }

  co(function *(){
    yield *foo();
    yield servoStop;
    return;
  }).then(function () {
    console.log(123456);
    servoStop();
  })
  // runRL(9);

});

client.on('error', function(err){
    console.log('ERROR - ' + err);
});

function writeRegister(addresses,value){
  return client.writeSingleRegister(addresses, value).then(function (resp) {
        console.log(resp);
  }, console.error);
}

function servoStart(){
  client.writeSingleRegister(6, Buffer.from([0x01, 0x01])).then(function (resp) {

        // resp will look like { fc: 2, byteCount: 20, coils: [ values 0 - 13 ], payload: <Buffer> }
        console.log(resp);

    }, console.error);

  client.writeSingleRegister(7, Buffer.from([0x01, 0x01])).then(function (resp) {
        // resp will look like { fc: 2, byteCount: 20, coils: [ values 0 - 13 ], payload: <Buffer> }
        console.log(resp)
    }, console.error);
}

function servoStop(){
  writeRegister(6,Buffer.from([0x00, 0x00]));
  writeRegister(7,Buffer.from([0x00, 0x00]));
}

function movStop(){
  return writeRegister(768,1000);
}

function mov(value){
  return writeRegister(768,value);
}

function movSpeed(value){
  return writeRegister(804,value);
}

function runRL(value){
  writeRegister(544,value);
  writeRegister(552,6);
}
