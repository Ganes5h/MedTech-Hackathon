const Outreach = require("../models/outreachModel");
const { validationResult } = require("express-validator");

// Create an outreach campaign
exports.createOutreach = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { campaignName, targetDemographics } = req.body;

  try {
    const outreach = new Outreach({
      campaignName,
      targetDemographics,
      coordinator: req.user.id,
    });

    await outreach.save();
    res.status(201).json(outreach);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get outreach by ID
exports.getOutreachById = async (req, res) => {
  try {
    const outreach = await Outreach.findById(req.params.id).populate(
      "coordinator",
      ["name", "email"]
    );
    if (!outreach) {
      return res.status(404).json({ msg: "Outreach not found" });
    }
    res.json(outreach);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update outreach
exports.updateOutreach = async (req, res) => {
  const { campaignName, targetDemographics } = req.body;

  try {
    const outreach = await Outreach.findById(req.params.id);
    if (!outreach) {
      return res.status(404).json({ msg: "Outreach not found" });
    }

    outreach.campaignName = campaignName || outreach.campaignName;
    outreach.targetDemographics =
      targetDemographics || outreach.targetDemographics;

    await outreach.save();
    res.json(outreach);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete outreach
exports.deleteOutreach = async (req, res) => {
  try {
    const outreach = await Outreach.findById(req.params.id);
    if (!outreach) {
      return res.status(404).json({ msg: "Outreach not found" });
    }

    await outreach.remove();
    res.json({ msg: "Outreach removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// List all outreach campaigns
exports.listOutreach = async (req, res) => {
  try {
    const outreachCampaigns = await Outreach.find().populate("coordinator", [
      "name",
      "email",
    ]);
    res.json(outreachCampaigns);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
