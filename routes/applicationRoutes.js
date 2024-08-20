// routes/applicationRoutes.js

const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const authMiddleware = require("../middlewares/auth");

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Route to create a new application
router.post("/", applicationController.createApplication);

// Route to get applications by trial ID
router.get("/trial/:trialId", applicationController.getApplicationsByTrial);

// Route to update application status
router.put("/:id", applicationController.updateApplicationStatus);

// Route to delete an application
router.delete("/:id", applicationController.deleteApplication);

module.exports = router;
