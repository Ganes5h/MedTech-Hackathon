const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const communicationLogController = require("../controllers/communicationLogController");
const auth = require("../middlewares/auth");

// @route   POST /api/communicationLogs
// @desc    Log a communication event
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("participantId", "Participant ID is required").not().isEmpty(),
      check("message", "Message is required").not().isEmpty(),
      check("sentAt", "Sent at date is required").isDate(),
    ],
  ],
  communicationLogController.createCommunicationLog
);

// @route   GET /api/communicationLogs/:id
// @desc    Get communication log by ID
// @access  Private
router.get("/:id", auth, communicationLogController.getCommunicationLogById);

// @route   GET /api/communicationLogs
// @desc    List all communication logs
// @access  Private
router.get("/", auth, communicationLogController.listCommunicationLogs);

module.exports = router;
