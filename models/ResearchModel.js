const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResearchSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  participantRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],  
  trials: [{ type: Schema.Types.ObjectId, ref: 'Trial' }],
  mediaPaths: [{ type: String }],  // Paths to media
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Research', ResearchSchema);
