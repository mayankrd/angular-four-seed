/**
 * Created by sesha on 6/2/17.
 */

// Get the dependencies

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Create HTTP server
// const server = http.createServer(app);

var serverSide = require("./server/test-mongodb/app");
serverSide(app);

const server = http.createServer(app);

const port = process.env.PORT || '3100';

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
  var result = 'App is running'
  response.send(result);
}).listen(app.get('port'), function() {
  console.log('App is running, server is listening on port ', app.get('port'));
});

//server.listen(port, () => console.log('Running'));


// // For Build: Catch all other routes and return the index file -- BUILDING
// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });


// server.listen(port, () => console.log('Running'));


