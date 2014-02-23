var app = require('http').createServer(),
    io = require('socket.io').listen(app, {
        log: false
    }),
    gpio = require('rpi-gpio');
util = require('util');
var PORT = 8004;
var pins = [7, 11, 13];

//start the server
app.listen(PORT);

gpioSetup(pins);


//constants for car actions
var MOVE_FORWARD = 'forward',
    MOVE_BACKWARD = 'backward',
    STOP = 'stop';


io.sockets.on('connection', function(socket) {
    socket.on('action', function(command) {
        //the action executed by the car when the move commmand is received.
        util.log("Received " + command.direction);
        takeAction(command.direction);
    })
})

var takeAction = function(direction) {
    //check if the received direction is forward
    //if forward set pin 11 to false and pin 13 to true 	
    var forward = (direction == MOVE_FORWARD);

    switch (direction) {
        case MOVE_BACKWARD:
        case MOVE_FORWARD:
            gpio.write(7, 1);
            gpio.write(11, !forward);
            gpio.write(13, forward);
            break;
        case STOP:
            gpio.write(7, 0);
            break;
    }
}

//set all the pins for output
    function gpioSetup(pins) {
        pins.forEach(function(pin) {
            gpio.setup(pin, gpio.DIR_OUT);
            util.log("pin " + pin + " set for output");
        })
    }
