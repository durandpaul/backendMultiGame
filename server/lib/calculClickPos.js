'use strict';
const DataRFleet = require('../models/randFleetM');
const CalculGameE = require('../lib/calculGameEvent');

var userShipInfo1 = {
  incre1: 0,
  incre2: 0,
  incre3: 0,
  incre4: 0,
  incre5: 0,
  shipD: []
}

var userShipInfo2 = {
  incre1: 0,
  incre2: 0,
  incre3: 0,
  incre4: 0,
  incre5: 0,
  shipD: []
}

var gameEnd = false;


exports.touchOrnot = (posXY, user, id, callback) => {
  DataRFleet.find({
    roomid: id
  }).then((data) => {
    let touch;
    if (data[0].user != user) {
      for (let i = 0; i < data[0].x.length; i++) {
        if (posXY.posx >= data[0].x[i] && posXY.posx <= (data[0].x[i] + 75) && posXY.posy >= data[0].y[i] && posXY.posy <= data[0].y[i] + (75 * data[0].ycanvasoccup[i])) {
          touch = true;

          if (data[0].ycanvasoccup[i] === 4) {
            userShipInfo1.incre1 += 1;
            if (userShipInfo1.incre1 === data[0].ycanvasoccup[i]) {
              userShipInfo1.shipD.push(data[0].ycanvasoccup[i]);
              CalculGameE.setNewScores(user, false, true, false);
            } else if (userShipInfo1.incre1 < data[0].ycanvasoccup[i]) {
              CalculGameE.setNewScores(user, true, false, false);
            }
          }

          if (data[0].ycanvasoccup[i] === 3) {
            userShipInfo1.incre2 += 1;
            if (userShipInfo1.incre2 === data[0].ycanvasoccup[i]) {
              userShipInfo1.shipD.push(data[0].ycanvasoccup[i]);
              CalculGameE.setNewScores(user, false, true, false);
            } else if (userShipInfo1.incre2 < data[0].ycanvasoccup[i]) {
              CalculGameE.setNewScores(user, true, false, false);
            }
          }

          if (data[0].ycanvasoccup[i] === 2) {
            userShipInfo1.incre3 += 1;
            if (userShipInfo1.incre3 === data[0].ycanvasoccup[i]) {
              userShipInfo1.shipD.push(data[0].ycanvasoccup[i]);
              CalculGameE.setNewScores(user, false, true, false);
            } else if (userShipInfo1.incre3 < data[0].ycanvasoccup[i]) {
              CalculGameE.setNewScores(user, true, false, false);
            }
          }

          if (data[0].ycanvasoccup[i] === 1) {
            if (i === 3) {
              userShipInfo1.incre4 += 1;
              if (userShipInfo1.incre4 === 1) {
                userShipInfo1.shipD.push(data[0].ycanvasoccup[i]);
                CalculGameE.setNewScores(user, true, true, false);
              }
            }

            if (i === 4) {
              userShipInfo1.incre5 += 1;
              if (userShipInfo1.incre5 === 1) {
                userShipInfo1.shipD.push(data[0].ycanvasoccup[i]);
                CalculGameE.setNewScores(user, true, true, false);
              }
            }
          }

        }
      }
      if (userShipInfo1.shipD.length < 5 && gameEnd === false) {
        var pos = {
          x: posXY.posx,
          y: posXY.posy
        }
        callback(touch, data[0].user, gameEnd, pos);
      } else {
        gameEnd = true;
        var pos = {
          x: posXY.posx,
          y: posXY.posy
        }
        CalculGameE.setNewScores(user, false, false, gameEnd);
        callback(touch, data[0].user, gameEnd, pos);
        console.log('Game Over');
      }
    }
    if (data[1].user != user) {
      for (let i = 0; i < data[1].x.length; i++) {
        if (posXY.posx >= data[1].x[i] && posXY.posx <= (data[1].x[i] + 75) && posXY.posy >= data[1].y[i] && posXY.posy <= data[1].y[i] + (75 * data[1].ycanvasoccup[i])) {
          touch = true;

          if (data[0].ycanvasoccup[i] === 4) {
            userShipInfo2.incre1 += 1;
            if (userShipInfo2.incre1 === data[0].ycanvasoccup[i]) {
              userShipInfo2.shipD.push(data[0].ycanvasoccup[i]);
              CalculGameE.setNewScores(user, false, true, false);
            } else if (userShipInfo2.incre1 < data[0].ycanvasoccup[i]) {
              CalculGameE.setNewScores(user, true, false, false);
            }
          }

          if (data[0].ycanvasoccup[i] === 3) {
            userShipInfo2.incre2 += 1;
            if (userShipInfo2.incre2 === data[0].ycanvasoccup[i]) {
              userShipInfo2.shipD.push(data[0].ycanvasoccup[i]);
              CalculGameE.setNewScores(user, false, true, false);
            } else if (userShipInfo2.incre2 < data[0].ycanvasoccup[i]) {
              CalculGameE.setNewScores(user, true, false, false);
            }
          }

          if (data[0].ycanvasoccup[i] === 2) {
            userShipInfo2.incre3 += 1;
            if (userShipInfo2.incre3 === data[0].ycanvasoccup[i]) {
              userShipInfo2.shipD.push(data[0].ycanvasoccup[i]);
              CalculGameE.setNewScores(user, false, true, false);
            } else if (userShipInfo2.incre3 < data[0].ycanvasoccup[i]) {
              CalculGameE.setNewScores(user, true, false, false);
            }
          }

          if (data[0].ycanvasoccup[i] === 1) {
            if (i === 3) {
              userShipInfo2.incre4 += 1;
              if (userShipInfo2.incre4 === 1) {
                userShipInfo2.shipD.push(data[0].ycanvasoccup[i]);
                CalculGameE.setNewScores(user, true, true, false);
              }
            }
            if (i === 4) {
              userShipInfo2.incre5 += 1;
              if (userShipInfo2.incre5 === 1) {
                userShipInfo2.shipD.push(data[0].ycanvasoccup[i]);
                CalculGameE.setNewScores(user, true, true, false);
              }
            }
          }
        }
      }
      if (userShipInfo2.shipD.length < 5 && gameEnd === false) {
        var pos = {
          x: posXY.posx,
          y: posXY.posy
        }
        callback(touch, data[1].user, gameEnd, pos);
      } else {
        gameEnd = true;
        var pos = {
          x: posXY.posx,
          y: posXY.posy
        }
        CalculGameE.setNewScores(user, false, false, gameEnd);
        callback(touch, data[1].user, gameEnd, pos);
        console.log('Game Over');
      }
    }
  });

}
