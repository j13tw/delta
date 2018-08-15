var modbus = require('jsmodbus');
var co = require('co');
var Delta = require('./lib/delta.js');

// create a modbus client
var client = modbus.client.tcp.complete({
    'host': '10.0.0.177',
    'port': 502,
    'autoReconnect': true,
    'reconnectTimeout': 10000,
    'timeout': 3000,
    'unitId': 2
});

client.connect();

var delta = new Delta(client);

client.on('connect', function() {
    console.log(123);

    //servo
    // servoStart(); //開啟4軸馬達
    // servoStop();  //關閉4軸馬達

    //mov
    // delta.mov(601); //移動方向 X+601 X-602 Y+603 Y-604 Z+605 Z-606
    // delta.movSpeed(60); //移動速度 1~100 %
    // delta.movStop(); //移動停止

    //Reset
    // delta.alarmReset(); //reset

    //RL
    // delta.startRL(); //開始執行
    // delta.pauseRL(); //暫停
    // delta.stopRL();  //停止
    // delta.runRL(num); num=>第幾個腳本

    co(function*() {
        // yield delta.runRL(9);
        // yield delta.alarmReset();
        // yield delta.servoStop();
        // yield delta.servoStart();
        // yield delta.movSpeed(60);
        // yield delta.mov(601);
        // yield function(done){
        //   setTimeout(function (){
        //     done();
        //   },600)
        // };
        // yield delta.movStop();
        // yield delta.pauseRL();
        // yield delta.startRL();
        // yield delta.stopRL();
        return;
    }).then(function() {
        // servoStop();
    });
});

client.on('error', function(err) {
    console.log('ERROR - ' + err);
});