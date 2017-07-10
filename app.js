var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandlers = require('./handlers/err_handler');
var compression = require('compression');
var index = require('./routes/index');
var users = require('./routes/users');
var role = require('./routes/roles');
var employee = require('./routes/employee');

var mongoose = require('mongoose');
var DB = require('./config/dbconfig');
mongoose.Promise = global.Promise;
mongoose.connect(DB.GET_URL);

var app = express();
// compress all requests
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', users);
app.use('/api',role);
app.use('/api',employee);

app.use(function (req, res, next) {

    var err = new Error('Not Found');
    err.name = "NotFoundError";
    err.status = 404;
    next(err, req, res, next);

});

app.use(function (err, req, res, next) {

    errorHandlers.processError(err, function (status, response) {

        res.status(status).json(response);

    });
});
module.exports = app;
