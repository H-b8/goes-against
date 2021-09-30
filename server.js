var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override')

require('dotenv').config();

var app = express();

require('./config/database');
require('./config/passport');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var memberRouter = require('./routes/member');

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(session({
  secret: 'SHHHHH!',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/member', memberRouter);

// CATCH ERROR AND PASS TO HANDLER
app.use(function(req, res, next) {
  next(createError(404));
});

// HANDLE ERROR
app.use(function(err, req, res, next) {
  // SET LOCALS, PROVIDE ERRORS IN DEV ONLY
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // RENDER ERROR MESSAGE
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;