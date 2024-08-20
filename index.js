const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/configuration");
require("dotenv").config();

// const connectDB = require("./config/config"); // Import the connectDB function

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Establish database connection
connectDB(); // Call the function to connect to MongoDB

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Routes of Application
// app.use("/api/user/auth", require("./routes/authRoutes"));
app.use("/api/user/auth", require("./routes/authRoutes"));
app.use("/api/participants", require("./routes/participantRoutes"));
app.use("/api/trials", require("./routes/trialRoutes"));
app.use("/api/comminication", require("./routes/communicationLogRoutes"));
app.use("/api/matching", require("./routes/matchingLogRoutes"));
app.use("/api/outreach", require("./routes/outreachRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes")); 
app.use("/api/notifications", require("./routes/notificationRoutes"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
