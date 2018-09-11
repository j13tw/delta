var koa = require('koa');
var Router = require('koa-router');
var logger = require('koa-logger');
var bodyParser = require('koa-bodyparser');
var modbus = require('jsmodbus');
var co = require('co');
var Delta = require('./lib/delta.js');

// create a modbus client
var client = modbus.client.tcp.complete({
    'host': '10.0.0.177',
    'port': 502,
    'timeout': 3000,
    'unitId': 2
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

router.post('/click', function*() {
    var num = this.request.body.num;

    console.log("run project:" + num);
    console.log(typeof(num));
    yield co(function*() {
        if (!isNaN(num) && Number.isInteger(num) && (num == 4 || num == 5 || num == 6 || num == 7 || num == 8)) {
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
        } else if (!isNaN(num) && Number.isInteger(num) && num == 0) {
            client.connect();
            yield sleep(3000);
            yield delta.stopRL();
            yield sleep(1000);
            yield delta.servoStop();
        }
        return;
    }).then(function() {

    });

    if (num == 4) this.body = "A - Block"; 
    else if (num == 5) this.body = "B - Block";
    else if (num == 6) this.body = "C - Block";
    else if (num == 7) this.body = "D - Block";
    else if (num == 8) this.body = "E - Block";
    else if (num == 0) this.body = "停止";
    else this.body = "範圍錯誤";
});

client.on('connect', function() {
    console.log("modebus connect success");
});

client.on('error', function(err) {
    console.log('ERROR - ' + err);
});

app.use(router.middleware());
app.listen(3001, function() {
    console.log("listening port on 3001");
});