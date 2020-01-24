const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db/config')

const server = express();

server.use(logger('dev'));
server.use(express.static('public'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

server.get('/', (req, res) => {
  res.send('hello world; you have connected');
});

const cancelRoutes = require('./server/routes');
server.use('/db', cancelRoutes);

server.use('*', (req, res) => {
  res.status(400).json({
    message: 'Endpoint not found. But you can definitely find it; Keep trying!',
  });
});

// app.use(cors({ origin: 'http://localhost3001/db:3030', credentials: true }))
// server.use( (req, res, next)=> {
//     /*var err = new Error('Not Found');
//      err.status = 404;
//      next(err);*/

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'localhost:3001/db');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

//   //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

//     // Pass to next layer of middleware
//     next();
//   });
