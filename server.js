const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const cors = require('cors')
// const proxy = require('http-proxy-middleware'); 
const server = express();

server.use(logger('dev'));
server.use(express.static('public'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

server.get('/', (req, res) => {
  res.send('hello world; you have connected');
});

server.get('/users/unique', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for only example.com.'})
})
 


server.use(cors({ origin: 'http://spot-server.herokuapp.com/db', credentials: true }))
server.use( (req, res, next)=> {
   
    res.setHeader('Access-Control-Allow-Origin', 'https://spot-server.herokuapp.com/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Pass to next layer of middleware
    next();
});
  
const cancelRoutes = require('./server/routes');
server.use('/db', cancelRoutes);

server.use('*', (req, res) => {
  res.status(400).json({
    message: 'Endpoint not found. But you can definitely find it; Keep trying!',
  });
});
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
server.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})