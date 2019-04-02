'use strict';
const RoomInstance = require('./createRoom');
const CalculClickPos = require('./calculClickPos');
const DataG = require('../controller/dataGameController');

exports.socketIo = (http) => {
  const io = require('socket.io')(http);

  io.on('connection', (socket) => {
    socket.setMaxListeners(20);

    socket.on('joinparty', function (username) {

      console.log('new user join: ', username);
      socket.username = username;

      RoomInstance.NewRoom(socket.username, function (roomId, users, roomUserNb) {

        socket.join('room-' + roomId);
        socket.roomid = roomId;
        if (roomUserNb === 1) {
          io.sockets.in('room-' + socket.roomid).emit('waiting-adverser', {
            wait: 'en attente d\'un autre joueur'
          });
        }

        if (roomUserNb === 2) {
          // console.log('users', users);
          
          io.sockets.in('room-' + socket.roomid).emit('newparty', {
            start: 'La partie peux commencer',
            users: users
          });
        }

      });

    });

    socket.on('sendRandFleet', (randFleet) => {
      DataG.addRandomFleet(randFleet, socket.roomid, socket.username);
    })

    socket.on('sendClickPos', (clickPos) => {
      console.log('sendClickPos', clickPos);
      CalculClickPos.touchOrnot(clickPos , socket.username, socket.roomid, function (bool) {
        console.log('bool', bool);
        
        io.sockets.in(socket.roomid).emit('returnClickPos', {
          touch: 'touché'
          
        })
      });

      // console.log('socket: ', socket)
    });

    socket.on('leave', function () {
      console.log(`leave ${socket.username} from Room ${socket.roomid}`);
      if (socket.roomid !== undefined) {
        DataG.deleteRoomFleet(socket.roomid);
        RoomInstance.DeleteRoom(socket.roomid, function (idRoom) {
          // console.log('DeleteRoom ', idRoom);

          socket.leave('room-' + idRoom);
          socket.on('disconnect', function () {
            console.log('disconnected !');
          });
        });
      }
    });
  });
}
