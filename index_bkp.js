var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var users = new Array(10000000);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});




io.on('connection', function (socket) {


    //var cookie_string = socket.request.headers.cookie;

    console.log(socket.id);

    console.log('connected '+socket.handshake.query.username);






    if(users[socket.handshake.query.username][0]!=undefined){




        users[socket.handshake.query.username][0] = socket;
    }

















    socket.on('disconnect', function() {
        console.log('disconnected '+socket.handshake.query.username);
    });



    socket.on('send message event', function (msg_data) {
        users[msg_data['to']].emit('incoming message', msg_data);
    });
});




http.listen(port, function () {
    console.log('listening on *:' + port);
});


