const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  registerStaff,
  verifyStaffOtp,
  requestLoginOtp,
  verifyLoginOtp,
} = require("../controllers/authController");

const {
  registerLimiter,
  loginLimiter,
  verifyOtpLimiter,
} = require("../middleware/authRateLimiter");

// First-time staff registration
router.post("/register", registerLimiter, registerStaff);

// Verify registration OTP
router.post("/verify-otp", verifyOtpLimiter, verifyStaffOtp);

// Request OTP for staff login
router.post("/request-login-otp", loginLimiter, requestLoginOtp);

// Verify login OTP and receive JWT
router.post("/verify-login-otp", verifyOtpLimiter, verifyLoginOtp);

// Validate current staff session
router.get("/session", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Session is valid",
    staff: req.staff,
  });
});

module.exports = router;
