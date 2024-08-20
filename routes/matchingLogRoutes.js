const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const matchingLogController = require("../controllers/matchingLogController");
const auth = require("../middlewares/auth");

// @route   POST /api/matchingLogs
// @desc    Log a matching event
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("participantId", "Participant ID is required").not().isEmpty(),
      check("trialId", "Trial ID is required").not().isEmpty(),
      check("matchDate", "Match date is required").isDate(),
    ],
  ],
  matchingLogController.createMatchingLog
);

// @route   GET /api/matchingLogs/:id
// @desc    Get matching log by ID
// @access  Private
router.get("/:id", auth, matchingLogController.getMatchingLogById);

// @route   GET /api/matchingLogs
// @desc    List all matching logs
// @access  Private
router.get("/", auth, matchingLogController.listMatchingLogs);

module.exports = router;
