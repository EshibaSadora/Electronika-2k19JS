var express = require('express');

var path = "E:/GitHub/Electronika-2k19JS/Electronika2k20-nodejs";


var app = express();

var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended: false});



var serverport = 80;

module.exports = {
    Init: function () {
        app.get('/bootstrap.min.css', function(req, res) {
            res.sendFile(path  + "/lib/dist/css/bootstrap.min.css");
        });
        app.get('/jquery-3.4.1.min.js', function(req, res) {
            res.sendFile(path  + "/lib/dist/js/jquery-3.4.1.min.js");
        });
        app.get('/bootstrap.min.js', function(req, res) {
            res.sendFile(path  + "/lib/dist/js/bootstrap.min.js");
        });
    }
};

module.exports.path = path;
module.exports.app = app;
module.exports.serverport = serverport;
module.exports.bodyParser = bodyParser;
module.exports.urlencodedParser = urlencodedParser;