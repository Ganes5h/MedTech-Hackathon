const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const notificationController = require("../controllers/notificationController");
const auth = require("../middlewares/auth");

// @route   POST /api/notifications
// @desc    Create a notification
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("userId", "User ID is required").not().isEmpty(),
      check("message", "Message is required").not().isEmpty(),
      check("date", "Date is required").isDate(),
    ],
  ],
  notificationController.createNotification
);

// @route   GET /api/notifications/:id
// @desc    Get notification by ID
// @access  Private
router.get("/:id", auth, notificationController.getNotificationById);

// @route   GET /api/notifications
// @desc    List all notifications
// @access  Private
router.get("/", auth, notificationController.listNotifications);

module.exports = router;
