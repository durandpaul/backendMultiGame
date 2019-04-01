'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors') ;
const http = require('http').Server(app);
const port = '3000';

app.use(cors()) ;

const userRouter = require('./routes/userRouter');
const dataRouter = require('./routes/dataRouter');
const socket = require('./lib/socket');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use(userRouter);
app.use(dataRouter);

socket.socketIo(http);

http.listen(port, () => {
    console.log(`listening on ${port}`);
});