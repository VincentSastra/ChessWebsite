const createError = require('http-errors');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const bodyParser = require("body-parser");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

/**
 * Sessions and bodyParser for user authentication
 */
const sessionSecret = require("./config/cookies")

app.use(session({
  secret: sessionSecret.secret,
  cookie: {secure:true}
}));

app.use(bodyParser.urlencoded({extended: false}));

/**
 * Configure Database
 * I am currently using AtlasDB which I will access through Mongoose
 */
const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;

mongoose.connect(db, {useNewUrlParser: true})
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err))

/**
 * Configure Passport
 * Passport is used for user login and authentication
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

const Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
