const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth");

// @route    POST api/auth/register
// @desc     Register user
// @access   Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 3,
    }),
    check("phone", "Phone number is required").not().isEmpty(),
    check("role", "Role is required").not().isEmpty(),
  ],
  authController.registerUser
);

// @route    POST api/auth/login
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  authController.loginUser
);

// @route    GET api/auth/user
// @desc     Get user data
// @access   Private
router.get("/user", authMiddleware, authController.getUser);

module.exports = router;
