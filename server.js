const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override')

require('dotenv').config();

const app = express();

require('./config/database');
require('./config/passport');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const memberRouter = require('./routes/member');
const subsRouter = require('./routes/subscribers');

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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
app.use('/subs', subsRouter);

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