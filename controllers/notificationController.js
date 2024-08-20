const Notification = require("../models/notificationModel");
const { validationResult } = require("express-validator");

// Create a notification
exports.createNotification = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, message, date } = req.body;

  try {
    const notification = new Notification({
      userId,
      message,
      date,
    });

    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get notification by ID
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id).populate(
      "userId",
      ["name", "email"]
    );
    if (!notification) {
      return res.status(404).json({ msg: "Notification not found" });
    }
    res.json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// List all notifications
exports.listNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate("userId", [
      "name",
      "email",
    ]);
    res.json(notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
