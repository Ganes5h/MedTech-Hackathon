// routes/authRoutes.js

const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/auth");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes with role-based access
router.get("/profile", authMiddleware(), getUserProfile); // Default to any authenticated user
router.put("/profile", authMiddleware(), updateUserProfile); // Default to any authenticated user

// Example of protected route with role-based access
router.get("/admin-only", authMiddleware(["admin"]), (req, res) => {
  res.json({ msg: "Welcome Admin" });
});

module.exports = router;
