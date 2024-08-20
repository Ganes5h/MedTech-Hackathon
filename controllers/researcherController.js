const Trial = require("../models/trialModel");
const Participant = require("../models/participantModel");

// Create a Trial
exports.createTrial = async (req, res) => {
  try {
    const newTrial = new Trial({
      ...req.body,
      researcher: req.user.id,
    });

    const trial = await newTrial.save();
    res.json(trial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update a Trial
exports.updateTrial = async (req, res) => {
  try {
    let trial = await Trial.findById(req.params.id);

    if (!trial) {
      return res.status(404).json({ msg: "Trial not found" });
    }

    if (trial.researcher.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    trial = await Trial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(trial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get All Trials
exports.getAllTrials = async (req, res) => {
  try {
    const trials = await Trial.find().populate("researcher", "name email");
    res.json(trials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get Trial by ID
exports.getTrialById = async (req, res) => {
  try {
    const trial = await Trial.findById(req.params.id).populate(
      "researcher",
      "name email"
    );
    if (!trial) {
      return res.status(404).json({ msg: "Trial not found" });
    }
    res.json(trial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get Participants of a Trial
exports.getParticipantsByTrial = async (req, res) => {
  try {
    const participants = await Participant.find({ trials: req.params.id });
    res.json(participants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
