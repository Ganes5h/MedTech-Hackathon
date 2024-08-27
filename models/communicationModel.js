const mongoose = require('mongoose');

const CommunicationSchema = new mongoose.Schema({
  research: { type: mongoose.Schema.Types.ObjectId, ref: 'Research', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [  // Array to store multiple messages
    {
      message: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Communication', CommunicationSchema);
