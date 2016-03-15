// require all library dependencies
var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

// require my other modules
var indexRouter = require('./routes/index.js');

// create an express application
var app = express();

// determine which port to listen on, checking the env first
const port = process.env.PORT || 3000;

// parse the body on requests with a content-type of
// application/json and application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// dynamic routes
app.use('/', indexRouter);

app.listen(port, function() {console.log("Listening for requests on port:", port)});
