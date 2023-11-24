var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var moviesRouter = require('./routes/movies');
var watchlistRouter = require('./routes/watchlist');
const knex  = require('./domain/db/db_repository');

const { AuthService } = require('./domain/auth/auth_service');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const middleware = (req, res, next) => {
  if (!req.header('Authorization') || !AuthService.verify_token(req.header('Authorization'))) {
    return res.status(401).json({"error": "Unauthorized"});
  };
  next();
};

app.use('/users', middleware, usersRouter);
app.use('/', authRouter);
app.use('/watchlist', middleware, watchlistRouter);
app.use('/movies', middleware, moviesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const connectToDB = async () => {
  try {
    // await pool.connect();
    // knex.select('SELECT 1').then(result => console.log(result));
    // pool.
    knex('users').first();
    console.log('App working');
  } catch (err) {
    console.log(err);
  }
};
connectToDB();

module.exports = app;
