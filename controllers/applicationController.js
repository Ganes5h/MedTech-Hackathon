// controllers/applicationController.js

const Application = require("../models/applicationModel");

// @desc Create a new application
// @route POST /api/applications
// @access Private (requires authentication)
exports.createApplication = async (req, res) => {
  try {
    const { participantId, trialId } = req.body;

    // Create a new application
    const newApplication = new Application({
      participantId,
      trialId,
    });

    await newApplication.save();

    res.status(201).json(newApplication);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Get applications by trial ID
// @route GET /api/applications/trial/:trialId
// @access Private (requires authentication)
exports.getApplicationsByTrial = async (req, res) => {
  try {
    const { trialId } = req.params;

    // Fetch applications for the specified trial
    const applications = await Application.find({ trialId });

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Update application status
// @route PUT /api/applications/:id
// @access Private (requires authentication)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, decisionAt } = req.body;

    // Find and update the application
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { status, decisionAt },
      { new: true, runValidators: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json(updatedApplication);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Delete an application
// @route DELETE /api/applications/:id
// @access Private (requires authentication)
exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the application
    const deletedApplication = await Application.findByIdAndDelete(id);

    if (!deletedApplication) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
