// models/trialModel.js
const mongoose = require('mongoose');

const TrialSchema = new mongoose.Schema({
  research: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Research',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stages: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    results: [{
      type: String
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  communications: [{
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  notifications: [{
    type: String,
    required: true
  }]
}, { timestamps: true });

module.exports = mongoose.model('Trial', TrialSchema);
