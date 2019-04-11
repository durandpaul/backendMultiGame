'use strict';
const UserController = require('../controller/userController');


exports.setNewScores = (touch, shipD, win) => {

  if (touch === true) {
    UserController.updateUserScores(user, 25);
  }

  if (shipD === true) {
    UserController.updateUserScores(user, 50);
  }

  if (win === true) {
    UserController.updateUserScores(user, 150);
  }
}
