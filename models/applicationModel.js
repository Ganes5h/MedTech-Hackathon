const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ["applied", "accepted", "rejected"],
    default: "applied",
  },
  appliedAt: { type: Date, default: Date.now },
  decisionAt: { type: Date },
});

module.exports = mongoose.model("Application", applicationSchema);
