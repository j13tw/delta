// var modbus = require("modbus-stream");
//
// modbus.tcp.connect(502, "60.249.15.90", { debug: "automaton-2454" }, (err, connection) => {
//     // do something with connection
//     // if (err) throw err;
//
//     connection.readCoils({ address:0, quantity: 0 }, (err, info) => {
//         console.log("response", info.response.data);
//     });
//
//     // connection.writeSingleCoil({ address: 6, value: 257 }, (err, res) => {
//     //     if (err) throw err;
//     //
//     //     console.log(res); // response
//     // })
// });

var ab2str = require('arraybuffer-to-string');
var modbus = require("modbus-stream");
modbus.tcp.connect(502, "60.249.15.90", { debug: "automaton-2454" }, (err, connection) => {
  if(err) throw err;
  //IP
  connection.readHoldingRegisters({ address:0x032A, quantity: 2 }, (err, res) => {
    console.log(res.response.data); // response
  });
  // connection.writeSingleCoil({ address:0x0000, quantity: 257 }, (err, res) => {
  //   // console.log(res.response.data); // response
  // });
});
