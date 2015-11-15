var express = require('express');
var app = express();
var path = require('path');

console.log(path.resolve(__dirname + '/../public'));
app.use(express.static(path.resolve(__dirname + '/../public')));

var port = process.env.PORT || 3000;
app.listen(port, console.log.bind(console, 'listening at http://localhost:' + port)); 