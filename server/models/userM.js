'use strict';
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/multip');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
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
    }
});

const User = mongoose.model('User', UserSchema);

exports = User;