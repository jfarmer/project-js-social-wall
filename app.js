/**
 * Welcome!
 *
 * This file is structured into four main parts:
 *   1. Requiring the necessary libraries / modules
 *   2. Configuring those modules as we need
 *   3. Specifying the routes for our Express web app
 *   4. Connecting to our database and telling the web app
 *      to listen for incoming connections.
 */

// Node's standard path module
// See https://nodejs.org/api/path.html
const path = require('path');

// The Express web application framework
// See http://expressjs.com/
const express = require('express');

// The Mongoose library for interacting with MongoDB
// See https://mongoosejs.com/
const mongoose = require('mongoose');

// Convenience library for creating objects that represent HTTP error states
// See https://github.com/jshttp/http-errors
const createError = require('http-errors');

// Convenience library for reading/writing browser cookies
// See https://github.com/expressjs/cookie-parser
const cookieParser = require('cookie-parser');

// Library for nicer logging of HTTP requests
// See https://github.com/expressjs/morgan
const logger = require('morgan');

// Our own Message model
const Message = require('./models/message');

// Our Express app
const app = express();

// Tell Express where our views/templates live and that we're using handlebars for templates
// See https://handlebarsjs.com/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Tell Express to load static files from the public/ directory
app.use(express.static(path.join(__dirname, 'public')));

// Tell Express to log HTTP requests in the 'dev' format
// See the Morgan documentation for what that looks like
app.use(logger('dev'));

// Tell Express to parse form submission data for us
app.use(express.urlencoded({ extended: false }));

// Tell Express to use our cookie-parsing library
app.use(cookieParser());

/**
 * OUR APP!
 *
 * We accept two requests:
 *   (1) a GET request to the root URL '/'
 *   (2) a POST request to the '/messages' URL
 *
 * Look at the form element in views/index.hbs to see how we
 * trigger POST requests to '/messages'.
 */

// Route for: GET /
app.get('/', (request, response) => {
  Message.find({}).sort({ createdAt: 'descending' }).exec((err, records) => {
    const viewData = {
      messages: records,
    };

    response.render('index', viewData);
  });
});

// Route for: POST /messages
app.post('/messages', (request, response) => {
  const messageBody = request.body.body;
  const messageTime = new Date();

  const message = new Message({
    body: messageBody,
    createdAt: messageTime,
  });

  message.save((err) => {
    if (err) {
      console.log(err);
      response.render('error');
    } else {
      response.redirect('/');
    }
  });
});

// If no routes match, we have a 404 Not Found.
// Use our default error handler to deal with it.
app.use((req, res, next) => {
  next(createError(404));
});

// Default error handler.
// See views/server-error.hbs for the view template.
app.use((err, req, res, next) => {
  // set locals, only providing error in development so that we don't
  // leak sensitive information in production.
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('server-error');
});

module.exports = app;

/**
 * The code below is required to set up the necessary connections
 * and start our web app. We first connect to MongoDB. Once we
 * are connected to MongoDB, we start the web app.
 *
 * The app.get(...) and app.post(...) code above tells our web app
 * how to respond to incoming requests whenever they arrivce. The web
 * app will continue to run indefinitely, listening for incoming requests
 * and running the appropriate code.
 */

// const port = process.env.PORT || '3000';
// const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/social_wall_development';

// mongoose.set('useNewUrlParser', true);

// mongoose.connect(mongoURI, (error) => {
//   if (error) {
//     throw error;
//   }

//   app.listen(port, () => {
//     console.log(`Listening on port ${port}.`);

//     if (app.get('env') === 'development') {
//       console.log(`Visit http://localhost:${port} to see the web app.`);
//     }
//   });
// });
