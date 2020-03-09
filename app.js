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

// A helper to generate directory paths relative to the
// project root directory,
app.root = (...args) => path.join(__dirname, ...args);

// Helper functions to check whether we're in the production
// or development environment.
app.inProduction = () => app.get('env') === 'production';
app.inDevelopment = () => app.get('env') === 'development';

// Tell Express to look in views/ to find our view templates
// and to use the Handlebars (hbs) to render them.
app.set('views', app.root('views'));
app.set('view engine', 'hbs');

// Put static files like stylesheets in public/
app.use(express.static(app.root('public')));

// Use a different log format for development vs. production
if (app.inDevelopment()) {
  app.use(logger('dev'));
} else {
  app.use(logger('combined'));
}

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Knex is a module used to generate SQL queries
// See http://knexjs.org/
let Knex = require('knex');

// Objection is a module used to represent and manipuldate
// data from a SQL database using JavaScript. It uses connect
// to generate the appropriate SQL queries.
// See https://vincit.github.io/objection.js/
let { Model } = require('objection');

// Tell Knex how to connect to our database
// See config/database.js
let dbConfig = require(app.root('knexfile'));
let knex = Knex(dbConfig[process.env.NODE_ENV]);
Model.knex(knex);

// See routes.js — this is where our main app code lives.
let routes = require('./routes');
app.use('/', routes);

// If no route handled the request then generate an
// HTTP 404 Not Found error
app.use((req, res, next) => {
  next(createError(404));
});

// A catch-all error handler.
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.inDevelopment() ? err : {};

  res.status(err.statusCode || 500);
  res.render('server-error');
});

module.exports = app;
