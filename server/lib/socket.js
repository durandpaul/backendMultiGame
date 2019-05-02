'use strict';
const RoomInstance = require('./createRoom');
const CalculClickPos = require('./calculClickPos');
const DataG = require('../controller/dataGameController');

exports.socketIo = (http) => {
  const io = require('socket.io')(http);

  // l'utilisateur se connecte à une partie.

  io.on('connection', (socket) => {
    socket.setMaxListeners(20);

    socket.on('joinparty', function (username) {

      console.log('new user join: ', username);
      socket.username = username;

      // Création d'une nouvelle Room 
      RoomInstance.NewRoom(socket.username, function (roomId, users, roomUserNb) {

        socket.join('room-' + roomId);
        socket.roomid = roomId;
        if (roomUserNb === 1) {
          io.sockets.in('room-' + socket.roomid).emit('waiting-adverser', {
            wait: 'en attente d\'un autre joueur'
          });
        }

        if (roomUserNb === 2) {

          io.sockets.in('room-' + socket.roomid).emit('newparty', {
            start: 'La partie peux commencer',
            users: users
          });
        }

      });

    });

    // Reception données nouvelle flotte random

    socket.on('sendRandFleet', (randFleet) => {
      // Ajout en DB

      DataG.addRandomFleet(randFleet, socket.roomid, socket.username);
    })

    //  Reception du click sur le canvas

    socket.on('sendClickPos', (clickPos) => {
      // les positions reçu du click sont envoyées sur le middleware et retourne l'utilisateur touché (ou pas) et si c'est la fin du jeu

      CalculClickPos.touchOrnot(clickPos, socket.username, socket.roomid, function (bool, userT, gameEnd, pos) {
        console.log(pos);
        io.sockets.in('room-' + socket.roomid).emit('returnClickPos', {
          bool: bool,
          userT: userT,
          gameEnd: gameEnd,
          posxy: pos
        })
      });
    });

    // lors de la déconnexion du joueur différentes informations en base de données sont supprimé.

    socket.on('leave', function () {
      console.log(`leave ${socket.username} from Room ${socket.roomid}`);
      if (socket.roomid !== undefined) {
        DataG.deleteRoomFleet(socket.roomid);
        RoomInstance.DeleteRoom(socket.roomid, function (idRoom) {

          socket.leave('room-' + idRoom);
          socket.on('disconnect', function () {
            console.log('disconnected !');
          });
        });
      }
    });
  });
}
