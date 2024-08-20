const CommunicationLog = require("../models/communicationLogModel");
const { validationResult } = require("express-validator");

// Log a communication event
exports.createCommunicationLog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { participantId, message, sentAt } = req.body;

  try {
    const communicationLog = new CommunicationLog({
      participantId,
      message,
      sentAt,
    });

    await communicationLog.save();
    res.status(201).json(communicationLog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get communication log by ID
exports.getCommunicationLogById = async (req, res) => {
  try {
    const communicationLog = await CommunicationLog.findById(
      req.params.id
    ).populate("participantId", ["name"]);
    if (!communicationLog) {
      return res.status(404).json({ msg: "Communication Log not found" });
    }
    res.json(communicationLog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// List all communication logs
exports.listCommunicationLogs = async (req, res) => {
  try {
    const communicationLogs = await CommunicationLog.find().populate(
      "participantId",
      ["name"]
    );
    res.json(communicationLogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
