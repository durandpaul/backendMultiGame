'use strict';
const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.post('/newuser', userController.createUser);
router.post('/login', userController.findUser);


module.exports = router;