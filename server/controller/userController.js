'use strict';
const sha512 = require('js-sha512');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('../corsOption');
mongoose.connect('mongodb://localhost/multip', {useNewUrlParser: true});

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

var User = mongoose.model('User', UserSchema);


exports.createUser = (req, res) => {    
    console.log('req.body.newUsername', req.body.newUsername);
    User.findOne({'username': req.body.newUsername}).then( (user) => {
        if( (req.body.newUsername != undefined) && (!user) ){
            let newUser = new User();
            newUser.username = req.body.newUsername;
            newUser.password = sha512(req.body.newPassword);
            newUser.mail = req.body.newEmail;
            newUser.save() ;
            res.json({
                status: 200,
                message: 'User added'
            })
        } else {
            res.json({
                status:404,
            })
        }
    }) ;
};


exports.findUser = (req, res, next) => {
    let pwd = sha512(req.body.password);
    console.log(pwd);
    User.findOne({'username': req.body.username, 'password': pwd}).then( (user) => {
        console.log(user) ;
        if(!user) {
            res.sendStatus(404) ;
        }
        res.json({
            status: 200,
            user: user
        })
    }).catch(next) ;

}