// middlewares/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Ensure this is included

module.exports = (roles = []) => {
  return (req, res, next) => {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // Check if token is present
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      console.log("Token decoded:", decoded); // Log decoded token

      // Check user roles if provided
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ msg: "Access denied" });
      }

      next();
    } catch (err) {
      console.error("Token verification error:", err); // Log error details
      res.status(401).json({ msg: "Token is not valid" });
    }
  };
};
