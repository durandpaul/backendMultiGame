'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors') ;
const http = require('http').Server(app);
const port = process.env.PORT || '3000';
require('./db');


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

const userRouter = require('./routes/userRouter');
const dataRouter = require('./routes/dataRouter');
const socket = require('./lib/socket');

// require('./models/dataGameM');
// require('./models/roomM');
// require('./models/userM');

app.use(userRouter);
app.use(dataRouter);

socket.socketIo(http);

http.listen(port, () => {
    console.log(`listening on ${port}`);
});