// DEBUG=quizduell-cheat-web:* node ./bin/www

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var testRouter = require('./routes/test');
//var gamesRouter = require('./routes/games');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
//app.use('/games', gamesRouter);

app.post('/games', function(req, res, next) {
  var username=req.body.username;
  var password=req.body.password;
  var gameIDs = ["123","456","789","101112","131415"];
  var opponents = ["Clemens1","Clemens2","Clemens3","Clemens4","Clemens5"];
  var yourturns = [true, true, false, true, false, false];
  var points = ["1:1","2:2","3:3","4:4","5:5"];
  var rounds = ["1","2","3","4","5"];
  res.render('games', { username: username, password: password, numberOfGames: 5, gameIDs: gameIDs, opponents: opponents, points: points, rounds: rounds, yourturns: yourturns });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
