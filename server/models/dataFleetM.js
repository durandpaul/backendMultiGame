'use strict';
const mongoose = require('mongoose');

const DataFleetSchema = new mongoose.Schema({
  x: Array,
  y: Array,
  width: Array,
  height: Array,
  ycanvasoccup: Array
});

const DataFleet = mongoose.model('DataFleet', DataFleetSchema);
module.exports = DataFleet;
