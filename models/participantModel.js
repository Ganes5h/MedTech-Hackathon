const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  demographics: {
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    ethnicity: { type: String, required: true },
    location: { type: String, required: true }, // City/Region
  },
  medicalHistory: [{ type: String }], // List of medical conditions
  preferences: [{ type: String }], // Preferences for types of trials
  enrolledTrials: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trial" }], // Trials they are enrolled in
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Participant", participantSchema);
