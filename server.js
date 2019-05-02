'use strict';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors') ;
const http = require('http').Server(app);
const port = process.env.PORT || 3000;
require('./server/db');


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

// A utilisé pour déploiement sur Heroku

app.use(express.static(__dirname +  '/dist'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Utilisation des routes

const userRouter = require('./server/routes/userRouter');
const dataRouter = require('./server/routes/dataRouter');
const socket = require('./server/lib/socket');

app.use(userRouter);
app.use(dataRouter);

// Activation du middleware avec Socket IO 

socket.socketIo(http);

http.listen(port, () => {
  console.log(`listening on ${port}`);
});