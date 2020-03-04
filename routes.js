let Router = require('express-promise-router');
let { Message } = require('./models');
let { ValidationError } = require('objection');

let router = new Router();

// Route for: GET /
router.get('/', async(request, response) => {
  let messages = await Message.query().select('*').orderBy('created_at', 'DESC');

  response.render('index', { messages });
});

// Route for: POST /messages
router.post('/messages', async(request, response) => {
  let messageBody = request.body.body;
  let messageTime = new Date();

  try {
    await Message.query().insert({
      body: messageBody,
      createdAt: messageTime,
    });

    response.redirect('/');
  } catch(error) {
    if (error instanceof ValidationError) {
      let messages = await Message.query().select('*').orderBy('created_at', 'DESC');
      let errors = error.data;

      response.render('index', { messages, errors });
    } else {
      throw error;
    }
  }
});

module.exports = router;
