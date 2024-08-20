const mongoose = require("mongoose");

const matchingLogSchema = new mongoose.Schema({
  participantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Participant",
    required: true,
  },
  trialId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trial",
    required: true,
  },
  matchScore: { type: Number, required: true }, // AI-calculated score
  matchedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MatchingLog", matchingLogSchema);
