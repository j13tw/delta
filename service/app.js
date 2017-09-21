var koa = require('koa');
var Router = require('koa-router');
var logger = require('koa-logger');
var bodyParser = require('koa-bodyparser');
var modbus = require('jsmodbus');
var co = require('co');
var Delta = require('./lib/delta.js');

// create a modbus client
var client = modbus.client.tcp.complete({
        'host'              : '60.249.15.90',
        'port'              : 502,
        'timeout'           : 3000,
        'unitId'            : 2
    });

var delta = new Delta(client);

var app = koa();
var router = new Router();

app.use(logger());
app.use(bodyParser());

function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

router.post('/piano',function * (){
  var num = this.request.body.num;
  console.log("run project:" + num );
  yield co(function *(a){
    if(!isNaN(num) && Number.isInteger(num)){
      client.connect();
      yield sleep(3000);
      yield delta.movStop();
      yield sleep(1000);
      yield delta.stopRL();
      yield sleep(1000);
      yield delta.alarmReset();
      yield sleep(1000);
      yield delta.servoStart();
      yield sleep(1000);
      yield delta.runRL(num);
    }
    return;
  }).then(function () {

  });
  this.body = "ok"

});

client.on('connect', function () {
  console.log("modebus connect success");
});

client.on('error', function(err){
    console.log('ERROR - ' + err);
});

app.use(router.middleware());
app.listen(3000,function(){
  console.log("listening port on 6000");
});
