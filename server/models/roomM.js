'use strict';
const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    idroom: {
      type: Number,
      default: 0,
      required: true
    },
    user: {
      username: String,
      score: {
        type: Number,
        default: 0
      }
    },
    winner: {
      username: {
        type: String,
        default: ''
      },
      score: {
        type: Number,
        default: 0
      }
    }
  });
  
 const RoomModel = mongoose.model('Room', RoomSchema);

 module.exports = RoomModel; 