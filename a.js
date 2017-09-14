var modbus = require("modbus-tcp");
var client = new modbus.Client();

client.reader('http://60.249.15.90:502');

client.readCoils(1, 6, 6, function (err, coils) {
    // coils = [ 1, 0, 1, 1 ]
    console.log(coils);
    console.log(123);
});

setTimeout(function(){},10000)
