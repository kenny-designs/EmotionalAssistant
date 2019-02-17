let express = require('express');
let app = express();
let path = require('path');
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let port = process.env.PORT || 3000;

/**
 * Start server
 **/
server.listen(port, () => {
    console.log('Server listening on port %d', port);
});

/**
 * Handle routes
 **/
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

/**
 * Chatroom functionality
 **/

let userCount = 0;

io.on('connection', (socket) => {
    let addedUser = false;

    console.log('a user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('new message', (data) => {
        io.sockets.emit('new message', {
            username: socket.username,
            message: data
        });
    });

    socket.on('add user', (username) => {
        if(addedUser) {
            return;
        }
        socket.username = username;
        ++userCount;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });
});
