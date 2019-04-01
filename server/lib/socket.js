'use strict';

exports.socketIo = function(http){
    const io = require('socket.io')(http);

    io.on('connection', (socket)=> {
        console.log('new user');
    
        socket.emit('hello', {
            greeting: 'hello'
        });
    
    });
}
