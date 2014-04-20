/**
 * @author Jos
 
var express = require("express"),
    app = express(),
    http = require("http"),
    server = http.createServer(app),
    io = require('socket.io').listen(server);
*/
var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(8888);

console.log('Server running');

app.get('/', function (req, res) {
    res.sendfile('./MultiPaint.html');
});

app.get('/Paint.css', function (req, res) {
    res.sendfile('./Paint.css');
});

app.get('/farbtastic.css', function (req, res) {
    res.sendfile('./farbtastic.css');
});

app.get('/jquery-1.11.0.min.js', function (req, res) {
    res.sendfile('./jquery-1.11.0.min.js');
});

app.get('/jquery-ui-1.10.4.min.js', function (req, res) {
    res.sendfile('./jquery-ui-1.10.4.min.js');
});

app.get('/farbtastic.js', function (req, res) {
    res.sendfile('./farbtastic.js');
});

app.get('/mask.png', function (req, res) {
    res.sendfile('./mask.png');
});

app.get('/marker.png', function (req, res) {
    res.sendfile('./marker.png');
});

app.get('/wheel.png', function (req, res) {
    res.sendfile('./wheel.png');
});



// 連線
io.sockets.on('connection', function (socket) {
    //var clientid = socket.id;
    //console.log( 'client:' + clientid);
    socket.emit('feedbackClientID', socket.id );

    socket.on('clear', function  (data) {
        console.log("invoke Clear");
        io.sockets.emit('clearCanvas', data);
    });

    socket.on('send', function (data) {
        io.sockets.emit('outerDraw', data );
    });
});