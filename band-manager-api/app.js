var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bandsRouter = require('./routes/bands');
var eventsRouter = require('./routes/events');
var mediaHandlerRouter = require('./routes/mediaHandler');
var metadataHandlerRouter = require('./routes/metadataHandler');
var awsMediaHandler = require('./routes/awsMediaHandler');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bands', bandsRouter);
app.use('/events', eventsRouter);
app.use('/mediaHandler', mediaHandlerRouter);
app.use('/metadataHandler', metadataHandlerRouter);
app.use('/awsMediaHandler', awsMediaHandler);

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
