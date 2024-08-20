const MatchingLog = require("../models/matchingLogModel");
const { validationResult } = require("express-validator");

// Log a matching event
exports.createMatchingLog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { participantId, trialId, matchDate } = req.body;

  try {
    const matchingLog = new MatchingLog({
      participantId,
      trialId,
      matchDate,
    });

    await matchingLog.save();
    res.status(201).json(matchingLog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get matching log by ID
exports.getMatchingLogById = async (req, res) => {
  try {
    const matchingLog = await MatchingLog.findById(req.params.id)
      .populate("participantId", ["name"])
      .populate("trialId", ["title"]);
    if (!matchingLog) {
      return res.status(404).json({ msg: "Matching Log not found" });
    }
    res.json(matchingLog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// List all matching logs
exports.listMatchingLogs = async (req, res) => {
  try {
    const matchingLogs = await MatchingLog.find()
      .populate("participantId", ["name"])
      .populate("trialId", ["title"]);
    res.json(matchingLogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
