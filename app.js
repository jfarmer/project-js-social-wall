let path = require('path');
let createError = require('http-errors');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let express = require('express');

let app = express();

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = app.get('env');
}

app.root = (...args) => path.join(__dirname, ...args);

app.set('views', app.root('views'));
app.set('view engine', 'hbs');

app.use(express.static(app.root('public')));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let routes = require('./routes');
app.use('/', routes);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('server-error');
});

module.exports = app;
