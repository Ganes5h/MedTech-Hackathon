const Trial = require("../models/trialModel");
const Participant = require("../models/participantModel");

// Get All Trials to Oversee
exports.getAllTrials = async (req, res) => {
  try {
    const trials = await Trial.find();
    res.json(trials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update Participant Status
exports.updateParticipantStatus = async (req, res) => {
  try {
    const { participantId, status } = req.body;
    let participant = await Participant.findById(participantId);

    if (!participant) {
      return res.status(404).json({ msg: "Participant not found" });
    }

    participant.status = status;
    await participant.save();

    res.json(participant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Generate Reports
exports.generateReport = async (req, res) => {
  try {
    // Implementation of report generation logic goes here.
    res.json({ msg: "Report generated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
