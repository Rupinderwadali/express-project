var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var cors = require('cors');
config = require('config');
var moment = require('moment');

// files to be require for apis's
var users = require('./routes/users.js');  // users
var supplier = require('./routes/supplier.js');

md5 = require('md5');
var app = express();


process.env.NODE_ENV = 'development';

dbconnection = require('./routes/connection.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({ limit: "50mb",extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static(__dirname + '/public'));

app.use(cors());



app.get('/', function (req, res) {
    res.render('local_test');
});

// users API

app.post('/sign_up',supplier.register);
app.post('/login',users.login_waterfall);
app.post('/supplier_add',supplier.supplier_authenticate);
app.post('/show',users.show);




var server = http.createServer(app).listen(config.get('PORT'), function () {
    console.log("Express server listening on port " + config.get('PORT'));
});



