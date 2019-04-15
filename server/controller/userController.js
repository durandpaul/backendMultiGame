'use strict';
const sha512 = require('js-sha512');
const User = require('../models/userM');

exports.createUser = (req, res) => {
  User.findOne({
    'username': req.body.newUsername
  }).then((user) => {
    if ((req.body.newUsername != undefined) && (!user)) {
      let newUser = new User();
      newUser.username = req.body.newUsername;
      newUser.password = sha512(req.body.newPassword);
      newUser.mail = req.body.newEmail;
      newUser.save();
      res.json({
        status: 200,
        message: 'User added'
      })
    } else {
      res.json({
        status: 404,
      });
    }
  });
};

exports.loginUser = (req, res, next) => {
  let pwd = sha512(req.body.password);
  User.findOne({
    'username': req.body.username,
    'password': pwd
  }).then((user) => {
    if (!user) {
      res.sendStatus(404);
    } else {
      res.json({
        status: 200,
        user: user
      });
    }
  }).catch(next);
}

exports.findUser = (req, res) => {
  User.findOne({
    'username': req.body.username
  }).then((user) => {
    if (!user) {
      res.sendStatus(404);
    } else {
      res.json({
        status: 200,
        user: user
      });
    }
  });
}

exports.updateUserScores = (user, newScore) => {
  // console.log(newScore);
  User.findOneAndUpdate({
    'username': user
  }, { $inc: {score: newScore} }).then((user) => {
    // console.log(user);
    if (!user) {
      console.log('error in Update Score');      
    } 
  });

}
