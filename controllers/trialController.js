const Trial = require("../models/trialModel");
const Participant = require("../models/participantModel");
// Create a trial
exports.createTrial = async (req, res) => {
  const {
    title,
    description,
    inclusionCriteria,
    exclusionCriteria,
    startDate,
    endDate,
    location,
  } = req.body;

  try {
    const trial = new Trial({
      title,
      description,
      inclusionCriteria,
      exclusionCriteria,
      startDate,
      endDate,
      location,
      researchers: [req.user.id],
    });

    await trial.save();
    res.status(201).json(trial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get trial by ID
exports.getTrialById = async (req, res) => {
  try {
    const trial = await Trial.findById(req.params.id).populate("researchers", [
      "name",
      "email",
    ]);
    if (!trial) {
      return res.status(404).json({ msg: "Trial not found" });
    }
    res.json(trial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update trial
exports.updateTrial = async (req, res) => {
  const {
    title,
    description,
    inclusionCriteria,
    exclusionCriteria,
    startDate,
    endDate,
    location,
  } = req.body;

  try {
    const trial = await Trial.findById(req.params.id);
    if (!trial) {
      return res.status(404).json({ msg: "Trial not found" });
    }

    trial.title = title || trial.title;
    trial.description = description || trial.description;
    trial.inclusionCriteria = inclusionCriteria || trial.inclusionCriteria;
    trial.exclusionCriteria = exclusionCriteria || trial.exclusionCriteria;
    trial.startDate = startDate || trial.startDate;
    trial.endDate = endDate || trial.endDate;
    trial.location = location || trial.location;

    await trial.save();
    res.json(trial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete trial
exports.deleteTrial = async (req, res) => {
  try {
    const trial = await Trial.findById(req.params.id);
    if (!trial) {
      return res.status(404).json({ msg: "Trial not found" });
    }

    await trial.remove();
    res.json({ msg: "Trial removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// List all trials
exports.listTrials = async (req, res) => {
  try {
    const trials = await Trial.find().populate("researchers", [
      "name",
      "email",
    ]);
    res.json(trials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
