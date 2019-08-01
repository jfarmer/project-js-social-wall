const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
