const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const outreachController = require("../controllers/outreachController");
const auth = require("../middlewares/auth");

// @route   POST /api/outreach
// @desc    Create an outreach campaign
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("campaignName", "Campaign name is required").not().isEmpty(),
      check("targetDemographics", "Target demographics are required")
        .not()
        .isEmpty(),
    ],
  ],
  outreachController.createOutreach
);

// @route   GET /api/outreach/:id
// @desc    Get outreach by ID
// @access  Private
router.get("/:id", auth, outreachController.getOutreachById);

// @route   PUT /api/outreach/:id
// @desc    Update outreach
// @access  Private
router.put(
  "/:id",
  [
    auth,
    [
      check("campaignName", "Campaign name is required").not().isEmpty(),
      check("targetDemographics", "Target demographics are required")
        .not()
        .isEmpty(),
    ],
  ],
  outreachController.updateOutreach
);

// @route   DELETE /api/outreach/:id
// @desc    Delete outreach
// @access  Private
router.delete("/:id", auth, outreachController.deleteOutreach);

// @route   GET /api/outreach
// @desc    List all outreach campaigns
// @access  Private
router.get("/", auth, outreachController.listOutreach);

module.exports = router;
