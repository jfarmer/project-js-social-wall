let Router = require('express-promise-router');
let { Message } = require('./models');
let { ValidationError } = require('objection');

let router = new Router();

router.get('/', async(request, response) => {
  // SELECT * FROM messages ORDER BY created_at DESC
  let messages = await Message.query().select('*').orderBy('created_at', 'DESC');

  // { messages } is short-hand for { 'messages': messages }
  // In general, { foo, bar } is short-hand for { 'foo': foo, 'bar': bar }
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
