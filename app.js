var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
require('./app_api/models/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var travelRouter = require('./app_server/routes/travel')
var apiRouter = require('./app_api/routes/index');

var app = express();
var cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:4200',
  allowHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
//app.use('/contact', contactRouter);
//app.use('/rooms', roomRouter);
//app.use('/meals', mealsRouter);
//app.use('/news', newsRouter);
//app.use('/about', aboutRouter);
app.use('/api', apiRouter);
app.use('/api', cors(corsOptions), apiRouter);

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
