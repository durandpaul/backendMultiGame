'use strict';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors') ;
const http = require('http').Server(app);
const port = process.env.PORT || '3000';
require('./server/db');


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use(express.static(__dirname +  '/dist'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

const userRouter = require('./server/routes/userRouter');
const dataRouter = require('./server/routes/dataRouter');
const socket = require('./server/lib/socket');

// require('./models/dataGameM');
// require('./models/roomM');
// require('./models/userM');

app.use(userRouter);
app.use(dataRouter);

socket.socketIo(http);

http.listen(port, () => {
    console.log(`listening on ${port}`);
});