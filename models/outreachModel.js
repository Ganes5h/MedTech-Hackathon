const mongoose = require("mongoose");

const outreachSchema = new mongoose.Schema({
  campaignName: { type: String, required: true },
  targetDemographics: {
    ageRange: { type: [Number], required: true }, // e.g., [30, 50]
    gender: { type: String, required: true },
    ethnicity: { type: String, required: true },
    location: { type: String, required: true },
  },
  reach: { type: Number, default: 0 }, // Number of people reached
  responseRate: { type: Number, default: 0 }, // Percentage of people who responded
  coordinator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Outreach coordinator
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Outreach", outreachSchema);
