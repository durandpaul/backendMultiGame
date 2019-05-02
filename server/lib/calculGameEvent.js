'use strict';
const UserController = require('../controller/userController');

// Reçoit les infos afin de mettre à jour les points des joueur en DB 

exports.setNewScores = (user, touch, shipD, win) => {
  
  if (touch === true) {
    console.log('setNewScores touch :', touch);
    UserController.updateUserScores(user, 25);
  }

  if (shipD === true) {
    console.log('setNewScores shipD :', shipD);
    UserController.updateUserScores(user, 50);
  }

  if (win === true) {
    console.log('setNewScores win :', win);
    UserController.updateUserScores(user, 150);
  }
}
