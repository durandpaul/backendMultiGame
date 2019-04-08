'use strict';

var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://paul:p@ul92@cluster0-ad5t2.gcp.mongodb.net/multidb?retryWrites=true';
mongoose.connect(mongoDB, {
  useNewUrlParser: true
});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("Connected to MongoDB database");
});

exports = db;