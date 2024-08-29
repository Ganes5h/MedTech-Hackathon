// controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    "Niraj@1234",
    { expiresIn: '1h' }
  );
};

// Signup
exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();
    const token = generateToken(user);

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const token = generateToken(user);
    res.json({ token,user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.user.id;  // Assume `req.user` is set by authentication middleware

  try {
    let updateFields = { name, email };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    if (req.file) {  // Assume file upload middleware is used
      updateFields.profilePhoto = req.file.path;
    }

    const user = await User.findByIdAndUpdate(userId, updateFields, { new: true });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getParticipants = async (req, res) => {
    try {
        console.log("Querying participants...");
        const users = await User.find({ role: 'participant' });
        if (!users || users.length === 0) {
            return res.status(400).json("Participants not found");
        }
        res.status(200).json(users);
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json("Server Error");
    }
};
