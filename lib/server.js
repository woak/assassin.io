// express esrver
var express = require('express');
var assert = require('assert');
var path = require('path');

// Required to use HTTP query or post parameters
var bodyParser = require('body-parser');

var app = express();

app.set('port', 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/build/')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(app.get('port'), function() {
  console.log('Server running on ' + app.get('port'));
});