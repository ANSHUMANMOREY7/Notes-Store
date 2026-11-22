const express = require("express");
const router = express.Router();

const {
  registerStaff,
  verifyStaffOtp,
} = require("../controllers/authController");

const {
  registerLimiter,
  verifyOtpLimiter,
} = require("../middleware/authRateLimiter");

// Register approved staff and send OTP
router.post("/register", registerLimiter, registerStaff);

// Verify OTP and activate staff account
router.post("/verify-otp", verifyOtpLimiter, verifyStaffOtp);

module.exports = router;
