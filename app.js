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

function getOccurrence(array, value) {
    return array.filter((v) => (v === value)).length;
}

app.post('/games', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  //var gameIDs = ["123","456","789","101112","131415"];
  //var opponents = ["Clemens1","Clemens2","Clemens3","Clemens4","Clemens5"];
  //var yourturns = [true, true, false, true, false, false];
  //var points = ["1:1","2:2","3:3","4:4","5:5"];
  //var rounds = ["1","2","3","4","5"];
  var gameIDs = [];
  var opponents = [];
  var yourturns = [];
  var points = [];
  var rounds = [];

  const { exec } = require('child_process');
  exec("python scripts/games.py --username="+username+" --password="+password, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log("Ich kann die den Befehl python scripts/games.py --username="+username+" --password="+password+"nicht ausführen");
      console.log(err);
      return;
    }
    var gameList = JSON.parse(stdout);
    numberOfGames = gameList.user.games.length;
    console.log("Found "+numberOfGames+" Games");
    for (var i = 0; i < numberOfGames; i++) {
      gameIDs.push(gameList.user.games[i].game_id);
      opponents.push(gameList.user.games[i].opponent.name);
      yourturns.push(gameList.user.games[i].your_turn);

      var yourAnswers = gameList.user.games[i].your_answers;
      var opponentAnswers = gameList.user.games[i].opponent_answers;
      var yourPoints = getOccurrence(yourAnswers, 0);
      var opponentPoints = getOccurrence(opponentAnswers, 0);
      points.push(yourPoints+":"+opponentPoints);

      rounds.push(gameList.user.games[i].cat_choices.length);
    }
    //console.log(stdout);
    res.render('games', { username: username, password: password, numberOfGames: numberOfGames, gameIDs: gameIDs, opponents: opponents, points: points, rounds: rounds, yourturns: yourturns, password: password});
  });
});

app.get('/getAnswers', function(req,res,next) {
  var gameID = req.query.gameID;
  var username = req.query.username;
  var password = req.query.password;

  const { exec } = require('child_process');
  exec("python scripts/answers.py --gameID="+gameID+" --username="+username+" --password="+password, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log("Ich kann die den Befehl python scripts/answers.py --gameID="+gameID+" --username="+username+" --password="+password+" nicht ausführen");
      console.log(err);
      return;
    }
    res.send(stdout);
  });
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
