'use strict';
const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;

const UserSchema = new  mongoose.Schema({
    userId: ObjectId,
    email: String,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    score: {
        default: 0,
        type: Number
    },
    win: {
        default: 0,
        type: Number
    },
    loose: {
        default: 0,
        type: Number
    }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;