'use strict';

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

app.inProduction = () => app.get('env') === 'production';
app.inDevelopment = () => app.get('env') === 'development';

app.set('views', app.root('views'));
app.set('view engine', 'hbs');

app.use(express.static(app.root('public')));

// Use a different log format for development vs. production
if (app.inDevelopment()) {
  app.use(logger('dev'));
} else {
  app.use(logger('combined'));
}

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let Knex = require('knex');
let { Model } = require('objection');

let dbConfig = require(app.root('config', 'database'));
let knex = Knex(dbConfig[process.env.NODE_ENV]);
Model.knex(knex);

let routes = require('./routes');
app.use('/', routes);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.inDevelopment() ? err : {};

  res.status(err.statusCode || 500);
  res.render('server-error');
});

module.exports = app;
