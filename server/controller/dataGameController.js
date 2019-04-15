'use strict';
const DataFleet = require('../models/dataFleetM');
const RandFleet = require('../models/randFleetM');


exports.getFleetDrawPos = (req, res) => {
  DataFleet.find({}).then((data) => {
    // console.log('data ', data);
    return res.json({
      Status: 200,
      fleet: data
    });
  });
}

exports.getRandFleet = (req, res) => {
  RandFleet.findOne({
    user: req.body.user
  }).then((data) => {
    // console.log('getRandFleet ', data);

    return res.json({
      Status: 200,
      fleet: data
    });
  });
}

exports.addRandomFleet = (randFleet, roomId, user) => {

  let newrandFleet = new RandFleet();
  newrandFleet.roomid = roomId;
  newrandFleet.user = user;
  newrandFleet.x = randFleet.canvasXpos;
  newrandFleet.y = randFleet.canvasYpos;
  newrandFleet.height = randFleet.height;
  newrandFleet.ycanvasoccup = randFleet.numbSquare;
  newrandFleet.save();
}


exports.deleteRoomFleet = (roomId) => {
  // console.log('deleteRoomFleet ', roomId);
  RandFleet.deleteMany({
    roomid: roomId
  }).then((data) => {
    // console.log('deleteMany', data);
  });
}
