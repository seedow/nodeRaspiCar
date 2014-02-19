var app = require('http').createServer(handler),
    io = require('socket.io').listen(app, {
        log: false
    })
    util = require('util')
    var PORT = 8004;

app.listen(PORT);

function handler(req, res) {
    console.log('connected');
}

io.sockets.on('connection', function(socket) {
    socket.on('move', function(command) {
        util.log("The car will move " + command.direction)
    })
})