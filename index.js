var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var users = new Array(100);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});




io.on('connection', function (socket) {

    console.log(socket.handshake.query.email);

    socket.on('send message event', function (msg_data) {
        io.emit('incoming message', msg_data);
    });
});


http.listen(port, function () {
    console.log('listening on *:' + port);
});


