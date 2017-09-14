var stampit = require('stampit'),
        modbus = require('jsmodbus');

    var customServer = stampit()
        .refs({
            'logEnabled'        : true,
            'port'              : 8888,
            'responseDelay'     : 10, // so we do not fry anything when someone is polling this server
            'whiteListIPs'      : null, // filter connection only from these IPs (ex. ['127.0.0.1', '192.168.0.1'])

            // specify coils, holding and input register here as buffer or leave it for them to be new Buffer(1024)
            coils               : Buffer.alloc(1024, 0),
            holding             : Buffer.alloc(1024, 0),
            input               : Buffer.alloc(1024, 0)
        })
        .compose(modbus.server.tcp.complete)
        .init(function () {

            var init = function () {

                // get the coils with this.getCoils() [ Buffer(1024) ]
                // get the holding register with this.getHolding() [ Buffer(1024) ]
                // get the input register with this.getInput() [ Buffer(1024) ]

                // listen to requests

                this.on('readCoilsRequest', function (start, quantity) {

                    // do something, this will be executed in sync before the
                    // read coils request is executed

                });

                // the write request have pre and post listener
                this.on('[pre][post]WriteSingleCoilRequest', function (address, value) {


                });

            }.bind(this);


            init();

        });

    customServer();

    // you can of course always use a standard server like so

    var server = modbus.server.tcp.complete({ port : 8888 });

    // and interact with the register via the getCoils(), getHolding() and getInput() calls

    server.getHolding().writeUInt16BE(123, 1);

    // you can filter only certain IP addresses to connect

    var server = modbus.server.tcp.complete({ port : 8888, whiteListIPs: ['127.0.0.1', '192.168.0.1'] });
