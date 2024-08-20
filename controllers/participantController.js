const Participant = require("../models/participantModel");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");

// Create a participant
exports.createParticipant = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  const { demographics, medicalHistory, preferences } = req.body;

  try {
    const participant = new Participant({
      userId: req.user.id,
      demographics,
      medicalHistory,
      preferences,
    });

    await participant.save();
    res.status(201).json(participant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get participant by ID
exports.getParticipantById = async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id).populate(
      "userId",
      ["name", "email"]
    );
    if (!participant) {
      return res.status(404).json({ msg: "Participant not found" });
    }
    res.json(participant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update participant
exports.updateParticipant = async (req, res) => {
  const { demographics, medicalHistory, preferences } = req.body;

  try {
    const participant = await Participant.findById(req.params.id);
    if (!participant) {
      return res.status(404).json({ msg: "Participant not found" });
    }

    participant.demographics = demographics || participant.demographics;
    participant.medicalHistory = medicalHistory || participant.medicalHistory;
    participant.preferences = preferences || participant.preferences;

    await participant.save();
    res.json(participant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete participant
exports.deleteParticipant = async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id);
    if (!participant) {
      return res.status(404).json({ msg: "Participant not found" });
    }

    await participant.remove();
    res.json({ msg: "Participant removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// List all participants
exports.listParticipants = async (req, res) => {
  try {
    const participants = await Participant.find().populate("userId", [
      "name",
      "email",
    ]);
    res.json(participants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
