var app = require('http').createServer(),
    io = require('socket.io').listen(app, {
        log: false
    })
    util = require('util')
    var PORT = 8004;

app.listen(PORT);


io.sockets.on('connection', function(socket) {
    socket.on('action', function(command) {
        //the action executed by the car when the move commmand is received.
        util.log(command.direction);

    })
})