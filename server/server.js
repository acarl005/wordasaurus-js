var express = require('express');
var app = express();
var path = require('path');

var userCtrl = require('./controllers/users');
var seshCtrl = require('./controllers/sessions');

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/', express.static(path.resolve(__dirname + '/../public')));

app.post('/users', userCtrl.create, seshCtrl.create);
app.post('/sessions', userCtrl.find, seshCtrl.create);

var port = process.env.PORT || 3000;
app.listen(port, console.log.bind(console, 'listening at http://localhost:' + port)); 