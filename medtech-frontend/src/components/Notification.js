import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Card, Typography } from "@mui/material";

const NotificationManager = () => {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [notificationId, setNotificationId] = useState("");
  const [singleNotification, setSingleNotification] = useState(null);

  useEffect(() => {
    // Fetch all notifications
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Create a notification
  const handleCreateNotification = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/notifications", {
        userId,
        message,
        date,
      });
      alert("Notification created successfully.");
      setNotifications([...notifications, response.data]);
    } catch (error) {
      console.error("Error creating notification:", error);
    }
  };

  // Get notification by ID
  const handleGetNotificationById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/notifications/${notificationId}`);
      setSingleNotification(response.data);
    } catch (error) {
      console.error("Error fetching notification by ID:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Notification Management
      </Typography>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">Create Notification</Typography>
        <TextField
          label="User ID"
          variant="outlined"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          variant="outlined"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateNotification}
        >
          Create Notification
        </Button>
      </Card>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">Get Notification by ID</Typography>
        <TextField
          label="Notification ID"
          variant="outlined"
          value={notificationId}
          onChange={(e) => setNotificationId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleGetNotificationById}
        >
          Get Notification
        </Button>
        {singleNotification && (
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h6">Notification Details:</Typography>
            <Typography>
              User: {singleNotification.userId.name} ({singleNotification.userId.email})
            </Typography>
            <Typography>Message: {singleNotification.message}</Typography>
            <Typography>Date: {singleNotification.date}</Typography>
          </div>
        )}
      </Card>

      <Card style={{ padding: "20px" }}>
        <Typography variant="h5">All Notifications</Typography>
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id}>
              {notification.userId.name} ({notification.userId.email}) - {notification.message} on {notification.date}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default NotificationManager;
