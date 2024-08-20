const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const trialController = require("../controllers/trialController");
const auth = require("../middlewares/auth");

// @route   POST /api/trials
// @desc    Create a trial
// @access  Private
router.post("/", auth(["researcher"]), trialController.createTrial);

// @route   GET /api/trials/:id
// @desc    Get trial by ID
// @access  Private
router.get("/:id", auth, trialController.getTrialById);

// @route   PUT /api/trials/:id
// @desc    Update trial
// @access  Private
router.put("/:id", auth, trialController.updateTrial);

// @route   DELETE /api/trials/:id
// @desc    Delete trial
// @access  Private
router.delete("/:id", auth, trialController.deleteTrial);

// @route   GET /api/trials
// @desc    List all trials
// @access  Private
router.get("/", auth, trialController.listTrials);

module.exports = router;
