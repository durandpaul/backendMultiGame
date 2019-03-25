const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = '3000';


io.on('connection', (socket)=> {
    console.log('new user');

    socket.emit('hello', {
        greeting: 'hello'
    });

});


http.listen(port, () => {
    console.log(`listening on ${port}`);
});