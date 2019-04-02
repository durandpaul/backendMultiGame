const Room = require('../models/roomM');

var startId = 1;

exports.NewRoom = (newUser, callback) => {
  Room.find({
    idroom: startId
  }).then((data) => {
    
    if (data.length === 0) {

      let newRoom = new Room();
      newRoom.idroom = startId;
      newRoom.user.username = newUser,
      newRoom.save();

      callback(startId, newUser, 1);

    } else if (data.length < 2) {

      let newRoom = new Room();
      newRoom.idroom = startId;
      newRoom.user.username = newUser;
      newRoom.save();
      users = [data[0].user.username, newUser];
      callback(startId, users, 2);

    } else {
      let incre = 1;
      startId += incre;
      // console.log('startId ', startId);
      let newRoom = new Room();
      newRoom.idroom = startId;
      newRoom.user.username = newUser;     
      newRoom.save();

      callback(startId, newUser, 1);
    }

  });
}

exports.DeleteRoom = function(idRoom, callback) {
  console.log('idRoom', idRoom);
  Room.deleteMany({idroom: idRoom}).then( (data) => {
    if(data.ok > 0){
      callback(idRoom);
    }
  })

}