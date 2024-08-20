const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const participantController = require("../controllers/participantController");
const auth = require("../middlewares/auth");

// @route   POST /api/participants
// @desc    Create a participant
// @access  Private
router.post(
  "/",
  auth(["participant"]),
  participantController.createParticipant
);

// @route   GET /api/participants/:id
// @desc    Get participant by ID
// @access  Private
router.get("/:id", auth, participantController.getParticipantById);

// @route   PUT /api/participants/:id
// @desc    Update participant
// @access  Private
router.put(
  "/:id",
  [
    auth,
    [
      check("demographics", "Demographics are required").not().isEmpty(),
      check("medicalHistory", "Medical history is required").not().isEmpty(),
      check("preferences", "Preferences are required").not().isEmpty(),
    ],
  ],
  participantController.updateParticipant
);

// @route   DELETE /api/participants/:id
// @desc    Delete participant
// @access  Private
router.delete("/:id", auth, participantController.deleteParticipant);

// @route   GET /api/participants
// @desc    List all participants
// @access  Private
router.get("/", auth, participantController.listParticipants);

module.exports = router;
