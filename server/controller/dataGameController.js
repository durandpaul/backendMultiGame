'use strict';
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('../corsOption');
mongoose.connect('mongodb://localhost/multip', {useNewUrlParser: true});