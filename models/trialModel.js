const mongoose = require("mongoose");
const User = require("./userModel");
const Participant = require("./participantModel");
const trialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  inclusionCriteria: [{ type: String }], // Criteria for participants
  exclusionCriteria: [{ type: String }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  researchers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of researchers managing the trial
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Participant" }], // Enrolled participants
  location: { type: String, required: true }, // Location where the trial is conducted
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Trial", trialSchema);
