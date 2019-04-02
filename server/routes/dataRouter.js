'use strict';
var express = require('express');
var router = express.Router();
const cors = require('cors');
const corsOptions = require('../corsOption');

const dataController = require('../controller/dataGameController');

router.post('/datafleet', cors(corsOptions), dataController.getFleetDrawPos);
router.post('/getdatafleetr', cors(corsOptions), dataController.getRandFleet);



module.exports = router;