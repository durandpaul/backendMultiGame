'use strict';
const express = require('express');
const router = express.Router();
const cors = require('cors');
const corsOptions = require('../corsOption');

const userController = require('../controller/userController');

router.post('/newuser', cors(corsOptions), userController.createUser);
router.post('/login', cors(corsOptions), userController.loginUser);
router.post('/getuser', cors(corsOptions), userController.findUser);


module.exports = router;