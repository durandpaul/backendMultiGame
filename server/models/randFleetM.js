'use strict';
const mongoose = require('mongoose');


const DataRandFleetSchema = new mongoose.Schema({
    roomid: {
      type: Number,
    },
    user: String,
    shipalive: {
      type: Number,
      default: 4
    },
    x: Array,
    y: Array,
    // width: Array,
    height: Array,
    ycanvasoccup: Array
  });
  
  const DataRFleet = mongoose.model('DataRandFleet', DataRandFleetSchema);
  module.exports = DataRFleet;