'use strict';
const UserController = require('../controller/userController');

exports.setNewScores = (user, touch, shipD, win) => {
  console.log('setNewScores');
  
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
